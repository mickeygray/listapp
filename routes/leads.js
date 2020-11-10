const express = require("express");
const router = express.Router();
const Lead = require('../models/Lead')
const moment = require('moment')
const { Parser } = require("json2csv");
const nodemailer = require("nodemailer");


router.put("/", async (req, res) => {
  
   const string = Object.keys(req.body).toString()

  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S* /g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  let reg1 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gis; // Get emails
  let reg2 = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/gim;
  let liens = string.match(/(?<=Debtor Information\s*).*?(?=\s*Number)/gs);
  let emails = [string.match(reg1)].flat()
  let phone1 = [string.match(reg2)].flat()
  


  if (phone1.length > 0)
    phone1 = phone1.toString()
    .replace(/[\n\r]/g, "")
    .split(",").map((phone) => phone.trim()).filter(distinct);

  let bankruptcy1 = string.match(
    /(?<=Petitioner Information\s*).*?(?=\s*Meeting Date)/gs
  );
  let real1 = string.match(/(?<=Deed Record for\s*).*?(?=\s*Loan Type)/gs);
 

  const formattedLiens = []
  liens.forEach(leadString =>{  
    
  leadString.replace(leadString.substring(leadString.indexOf("Debtor 2")), "");

  const S =
    leadString.substring(0, leadString.indexOf("Debtor 2")) +
    leadString.substring(leadString.indexOf("Creditor Information"));

  let leadBody;

  if (leadString.includes("Debtor 2")) {
    leadBody =
      "{" +
      S.replace(/[\s,]+/g, " ")
        .trim()
        .replace("Debtor 1", "")
        .replace("Debtor 2", "")
        .replace("Filing 1", "")
        .replace("Name:", '"fullName":"')
        .replace("SSN:", '", "ssn":"')
        .replace("Address:", '", "deliveryAddress":"')
        .replace("Creditor Information Name:", '", "plaintiff":"')
        .replace("Jurisdiction", '", "state":"')
        .replace("Filing Information", "")
        .replace("Amount", '", "amount":"')
        .replace("Filing Date", '", "filingDate":"')
        + '"}';
  } else {
    leadBody =
      "{" +
      leadString
        .replace(/[\s,]+/g, " ")
        .trim()
        .replace("Debtor 1", "")
        .replace("DebtorÂ 1",'')
        .replace("Debtor 2", "")
        .replace("Filing 1", "")
        .replace("Name:", '"fullName":"')
        .replace("SSN:", '", "ssn":"')
        .replace("Address:", '", "deliveryAddress":"')
        .replace("Creditor Information Name:", '", "plaintiff":"')
        .replace("Jurisdiction", '", "state":"')
        .replace("Filing Information", "")
        .replace("Amount", '", "amount":"')
        .replace("Filing Date", '", "filingDate":"')
      +'"}';
  }

  console.log(leadBody)

  let lead = JSON.parse(leadBody);

 formattedLiens.push(lead)
})

console.log(formattedLiens)


let lead = formattedLiens[0]
  
  lead.county = lead.deliveryAddress
    .match(/(?<=(\d+)(?!.*\d)\s*).*?(?=\s*COUNTY)/gs)
    .toString();
  if (phone1) {
    lead.phones = phone1.filter((str) => str.includes("("));
  }

  if (lead.amount != null) {
    lead.amount = lead.amount.replace(":", "");
  }

 if(lead.filingDate) { lead.filingDate = lead.filingDate.replace(": ", "")}
  lead.state = lead.state.replace(":", "").replace(": ", "");

  if (lead.plaintiff != null) {
    lead.plaintiff = lead.plaintiff
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString()
      .replace(",", " ")
      .replace(",", " ")
      .toProperCase();
  }

  if (lead.deliveryAddress)
    lead.zip4 = lead.deliveryAddress
      .substring(
        lead.deliveryAddress.lastIndexOf(lead.state),
        lead.deliveryAddress.lastIndexOf(lead.county)
      )
      .split(" ")
      .splice(-1)
      .toString();

  if (lead.deliveryAddress != null) {
    lead.city = lead.deliveryAddress
      .substring(0, lead.deliveryAddress.indexOf(lead.state))
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .splice(-1)
      .toString();
  }

  if (lead.amount != null) {
    lead.amount = lead.amount
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString();
  }

  if (lead.deliveryAddress != null) {
    lead.deliveryAddress = lead.deliveryAddress
      .substring(0, lead.deliveryAddress.indexOf(lead.city))
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString()
      .replace(",", " ")
      .replace(",", " ")
      .replace(",", " ")
      .toProperCase();
  }

  if (lead.city != null) {
    lead.city = lead.city.toProperCase();
  }

  if (lead.county != null) {
    lead.county = lead.county
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString()
      .toProperCase();
  }

  if (lead.state != null) {
    lead.state = lead.state
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString();
  }

  if (lead.fullName != null) {
    lead.firstName = lead.fullName
      .split(" ")
      .filter(function (el) {
        return el != "";
      })[1]
      .toString()
      .toProperCase();
  }

  if (lead.fullName != null) {
    lead.lastName = lead.fullName
      .split(" ")
      .filter(function (el) {
        return el != "";
      })[0]
      .toString()
      .toProperCase();
  }
  if (lead.fullName != null) {
    lead.fullName = lead.fullName.replace(
      lead.fullName,
      lead.firstName + " " + lead.lastName
    );
  }

  if (real1 != null) {
    let realIndex1 = real1.toString().search(/Name/);
    let realIndex2 = real1.toString().search(/Address/);
    let realIndex3 = real1.toString().search(/County\/FIPS/);
    let realIndex4 = real1.toString().search(/Mortgage Information/);

    const realField1 = real1.toString().slice(realIndex1, realIndex2);
    const realField2 = real1.toString().slice(realIndex2, realIndex3);
    const realField3 = real1
      .toString()
      .slice(realIndex4, real1.toString().length);

    const colon1 = realField1.search(":");
    const colon2 = realField2.search(":");

    const name =
      '"' +
      realField1.slice(0, colon1).toLowerCase() +
      '"' +
      ':"' +
      realField1.slice(colon1 + 1, realField1.length) +
      '",';

    const address =
      '"' +
      realField2.slice(0, colon2).toLowerCase() +
      '"' +
      ':"' +
      realField2.slice(colon2 + 1, realField2.length) +
      '",';

    const loan =
      '"' + realField3.slice(realField3.length - 16, realField3.length) + '"';

    const colon3 = loan.search(":");

    const bone =
      loan.slice(0, colon3) + '"' + ':"' + loan.slice(colon3 + 1, loan.length);

    const stone = bone.toLowerCase().trim();

    const realBody = "{" + name + address + stone + "}";

  //  lead.real = JSON.parse(realBody.replace(/\s{2,10}/g, " "));
  } else {
    lead.real = {
      name: "",
      address: "",
      amount: "",
    };
  }

  if (bankruptcy1) {
    let bankIndex1 = bankruptcy1.toString().search(/Bankruptcy Information/);
    let bankIndex2 = bankruptcy1.toString().search(/Court/);
    let bankIndex3 = bankruptcy1.toString().search(/Filing Date/);
    let bankIndex4 = bankruptcy1.toString().search(/Filing Type/);

    const bankField1 = bankruptcy1.toString().slice(bankIndex1, bankIndex2);
    const bankField2 = bankruptcy1.toString().slice(bankIndex2, bankIndex3);
    const bankField3 = bankruptcy1
      .toString()
      .slice(bankIndex4, bankruptcy1.toString().length);

    const colon4 = bankField1.search(":");
    const colon5 = bankField2.search(":");
    const colon6 = bankField3.search(":");

    const loc =
      '"' +
      bankField2.slice(0, colon5).toLowerCase().trim() +
      '"' +
      ':"' +
      bankField2.slice(colon5 + 1, bankField2.length - 1).trim() +
      '",';

    const gock = loc.replace(/\r?\n|\r/g, "");

    const negro =
      '"' +
      bankField3.slice(0, colon6).toLowerCase().trim() +
      '"' +
      ':"' +
      bankField3.slice(colon6 + 1, bankField3.length).trim() +
      '"';

    const begro = negro.replace(" type", "Type");

    const bankBody = "{" + gock + begro + "}";

    //lead.bankruptcy = JSON.parse(bankBody);
  }
  lead.age = string.match(/(?<=[(]Age:\s*).*?(?=\s*[)])/gs)
  
  if (lead.age) {
    lead.age = lead.age[0].toString()
  }
  
    lead.dob = string
    .match(/(?<=[-]XXXX\s*).*?(?=\s*[(]Age:)/gs)

    if(lead.dob){
      lead.dob = lead.dob[0].toString().trim().substring(0, 7);
    }

if(lead.filingDate){
  lead.filingDate = lead.filingDate.replace(":", "").trim();
}
  

  lead.ssn = string.slice(string.lastIndexOf('SSN')).toString().match(/.+?(?=XXXX)/)

  if(lead.ssn){
   lead.ssn = lead.ssn[0].slice(4)
  }

  const regex = new RegExp("/((^[A-Z][,][A-Z]))/", "g");

  lead.emailAddresses = emails.filter(distinct);

  lead.otherliens = formattedLiens

  const {
 fullName,
    ssn,
    deliveryAddress,
    plaintiff,
    state,
    amount,
    filingDate,
    emailAddresses,
    county,
    phones,
    zip4,
    city,
    firstName,
    lastName,
    real,
    bankruptcy,
    age,
    dob,
    otherliens
  } = lead;

const scrapeDate = new Date(Date.now())

const newLead = new Lead({
    fullName,
    ssn,
    deliveryAddress,
    plaintiff,
    state,
    amount,
    filingDate,
    emailAddresses,
    county,
    phones,
    zip4,
    city,
    scrapeDate,
    firstName,
    lastName,
    real,
    bankruptcy,
    age,
    dob,
    otherliens
  });

  const leada = await newLead.save();

   res.json(leada)
});
router.get("/", async (req, res) => {
  // console.log(req);

  const today = moment().startOf("day");

  const prospects = await Lead.find({
    scrapeDate: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  });

  console.log(prospects)
const filterUnwanted = (arr) => {
   const required = arr.filter(el => {
      return el.otherliens;
   });
   return required;
};


  const result = prospects.map(({fullName, firstName, lastName, deliveryAddress, city, state,zip4, county, plaintiff, amount, age, dob, ssn, otherliens, phones, emailAddresses}) => {
  let obj = {
    fullName: fullName,
    First_Name: firstName,
    Last_Name: lastName,
    Delivery_Address: deliveryAddress,
    City: city,
    State: state,
    Zip_4: zip4,
    County: county,
    plaintiff: plaintiff,
    Amount: amount,
    age: age,
    dob: dob,
    ssn: ssn
  };
  otherliens.forEach(({plaintiff, amount}, i) => {
    obj[`plaintiff${i+1}`] = plaintiff;
    obj[`amount${i+1}`] = amount;
  });
  phones.forEach((phone, i) => obj[`phone${i+1}`] = phone);
  emailAddresses.forEach((addr, i) => obj[`emailAddress${i+1}`] = addr);
  return obj;
})

console.log(result)
 const json2csvParser = new Parser();
 const csv = json2csvParser.parse(result);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'blackballedproductions@gmail.com',
    pass: 'Pay@ttention35!' // naturally, replace both with your real credentials or an application-specific password
  }
});

   const attachment2 = {
          filename: `lexisScrape${new Date(Date.now())}.csv`,
          content: csv,
        };
  const mailer2 = {
    title: "list",
    from: "mickey",
    to: "mickeygray85@hotmail.com",
    subject: `Lead Scrape ${new Date(Date.now())}`,
    text: `hurry up fat fuck`,
    attachments:[attachment2]
  };

  transporter.sendMail(mailer2);

});
router.post("/lexis", async (req, res) => {
  const string = Object.keys(req.body).toString();

  let reg = /LexID\(sm\):([\S]+)/gim; // Get hashtags.

  let matches = (string.match(reg) || []).map((e) => e.replace(reg, "$1"));
  console.log(matches);
});



module.exports = router;
