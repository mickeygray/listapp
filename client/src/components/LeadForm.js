import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  useCallback,
} from "react";
import LeadContext from "../../context/lead/leadContext";
import LexisModal from "./LexisModal";
import { v4 as uuidv4 } from "uuid";
import FileUpload from "./FileUpload";
const LeadForm = () => {
  const leadContext = useContext(LeadContext);

  const {
    clearLiens,
    setCurrent,
    letCall,
    callIn,
    clearNumber,
    addLead,
    submitLead,
    postLogics,
    current,
    addLexis,
  } = leadContext;

  useEffect(() => {
    setForm({
      pinCode: "",
    });
  }, []);
  useEffect(() => {
    if (current !== null) {
      setRecord(current);
    } else {
      setRecord({
        fullName: "",
        deliveryAddress: "",
        city: "",
        state: "",
        zip4: "",
        plaintiff: "",
        amount: "",
        fileType: "",
        real: {},
        bankruptcy: {},
        ssn: "",
        dob: "",
        age: "",
        pinCode: "",
        emailAddress: "",
        emailAddresses: [],
        phones: [],
      });
    }
  }, [current, leadContext]);

  useEffect(() => {
    if (callIn !== null) {
      setCall({
        phone: callIn.formatted_customer_phone_number,
        callid: callIn.callid,
        source: callIn.source_name,
        tracking: callIn.tracking_phone_number,
      });
    } else {
      setCall({
        phone: "",
        callid: "",
        source: "",
        tracking: "",
      });
    }
  }, [callIn, leadContext]);

  const [record, setRecord] = useState({
    fullName: "",
    deliveryAddress: "",
    city: "",
    state: "",
    zip4: "",
    plaintiff: "",
    dob: "",
    age: "",
    fileType: "",
    real: {},
    bankruptcy: {},
    amount: "",
    pinCode: "",
    emailAddress: "",
    emailAddresses: [],
    phones: [],
    ssn: "",
  });

  const [call, setCall] = useState({
    phone: "",
    callid: "",
    tracking: "",
    source: "",
  });

  const [open, setOpen] = useState({
    compliant: "filed",
    filingStatus: "married",
    cpa: "cpa",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    if (Object.keys(record).includes(name)) {
      setRecord((prev) => ({ ...prev, [name]: value }));
    }
    if (Object.keys(call).includes(name)) {
      setCall((prev) => ({ ...prev, [name]: value }));
    }
    if (Object.keys(open).includes(name)) {
      setOpen((prev) => ({ ...prev, [name]: value }));
    }
  };

  /*
  const onChange = e => {
    setRecord({...name, address, city, state, zip, plaintiff, amount, [e.target.name]: e.target.value });
    setCall({...phone, [e.target.name]: e.target.value });
    setOpen({...email, lexId, compliant, filingStatus, cpa, ssn, noteText, [e.target.name]: e.target.value});
  }
*/
  const {
    fullName,
    emailAddress,
    emailAddresses,
    phones,
    deliveryAddress,
    city,
    state,
    real,
    bankruptcy,
    dob,
    age,
    zip4,
    plaintiff,
    ssn,
    amount,
    fileType,
    pinCode,
  } = record;
  const { phone, callid, tracking, source } = call;
  const { compliant, filingStatus, cpa } = open;

  let lienid;

  if (current != null) {
    lienid = current._id;
  }

  const [form, setForm] = useState({
    pinCode: "",
  });

  const [code, setCode] = useState(false);

  const onClick2 = (e) => {
    setForm({
      pinCode: uuidv4(),
    });
  };

  useEffect(() => {
    if (form.pinCode.length > 0) {
      submitLead(form);
      setCode(true);
    }
  }, [form]);

  const prospect = {
    phone,
    phones,
    emailAddresses,
    dob,
    age,
    fullName,
    deliveryAddress,
    city,
    state,
    zip4,
    plaintiff,
    amount,
    lienid,
    real,
    bankruptcy,
    emailAddress,
    pinCode,
    compliant,
    filingStatus,
    cpa,
    ssn,
    callid,
    tracking,
    source,
  };
  console.log(prospect);
  const clearLead = () => {
    clearNumber();
    setCurrent(null);
    setRecord({
      fullName: "",
      deliveryAddress: "",
      city: "",
      state: "",
      emailAddresses: [],
      fileType: "",
      bankruptcy: {},
      real: {},
      phones: [],
      zip4: "",
      emailAddress: "",
      plaintiff: "",
      taxAmount: "",
      ssn: "",
    });
    setCall({
      phone: "",
      callid: "",
      tracking: "",
      source: "",
    });
    setFile("");
    setOpen({
      compliant: "filed",
      filingStatus: "m",
      cpa: "cpa",
    });
  };

  const toggleVisibility = useCallback(() => {
    setModalState((prevState) => !prevState);
  }, []);

  const [showModal, setModalState] = useState(false);

  const onSubmit = (e) => {
    addLead(prospect);
    clearAll();
  };

  const clearAll = () => {
    clearLiens();
    clearLead();
    setCode(false);
    setFile("");
  };

  const [file, setFile] = useState("");

  const onUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const onClick = async (e) => {
    e.preventDefault();
    addLexis(file, current);
  };

  return (
    <Fragment>
      <div>
        {showModal && <LexisModal toggleVisibility={toggleVisibility} />}
      </div>
      <div>
        <button className='btn btn-danger' onClick={onSubmit}>
          Ship Em
        </button>
        <button onClick={() => clearAll()} className='btn btn-light'>
          Clear
        </button>
        <button
          onClick={() => setModalState((prevState) => !prevState)}
          className='btn btn-dark'>
          {showModal ? "Close Lexis" : "Open Lexis"}
        </button>
        <button className='btn btn-primary' onClick={onClick}>
          Enrich Lead
        </button>
        <button className='btn btn-success' onClick={onClick2}>
          Generate Blank
        </button>
        {code ? <p>Please Search The Database for {form.pinCode}</p> : ""}
      </div>
      <form onSubmit={onSubmit}>
        <div className='container grid-2'>
          <div className='card'>
            <input
              type='text'
              placeholder='Full Name'
              name='fullName'
              value={fullName}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='Address'
              name='deliveryAddress'
              value={deliveryAddress}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='City'
              name='city'
              value={city}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='State'
              name='state'
              value={state}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='Zip Code'
              name='zip4'
              value={zip4}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='Plaintiff'
              name='plaintiff'
              value={plaintiff}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='Tax Debt'
              name='amount'
              value={amount}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Social Security Number'
              name='ssn'
              value={ssn}
              onChange={onChange}
            />
          </div>
          <div className='card'>
            <input
              type='text'
              placeholder='Phone Number'
              name='phone'
              value={phone}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='E-Mail'
              name='email'
              value={
                emailAddresses && emailAddresses.length > 0
                  ? emailAddresses[0]
                  : emailAddress
              }
              onChange={onChange}
            />
            {emailAddresses && emailAddresses[1] ? (
              <input
                type='text'
                placeholder='E-Mail'
                name='email'
                value={emailAddresses[1]}
                onChange={onChange}
              />
            ) : (
              ""
            )}
            {emailAddresses && emailAddresses[2] ? (
              <input
                type='text'
                placeholder='E-Mail'
                name='email'
                value={emailAddresses[2]}
                onChange={onChange}
              />
            ) : (
              ""
            )}
            {emailAddresses[3] ? (
              <input
                type='text'
                placeholder='E-Mail'
                name='email'
                value={emailAddresses[3]}
                onChange={onChange}
              />
            ) : (
              ""
            )}
            {emailAddresses[4] ? (
              <input
                type='text'
                placeholder='E-Mail'
                name='email'
                value={emailAddresses[4]}
                onChange={onChange}
              />
            ) : (
              ""
            )}
            {emailAddresses[5] ? (
              <input
                type='text'
                placeholder='E-Mail'
                name='email'
                value={emailAddresses[5]}
                onChange={onChange}
              />
            ) : (
              ""
            )}
            <input
              type='text'
              placeholder='Pin Code'
              name='pinCode'
              value={pinCode}
              onChange={onChange}
            />
            <div>
              <h5 className='text-center'>Compliance Status</h5>
              <input
                type='radio'
                name='compliant'
                value='filed'
                checked={compliant === "filed"}
                onChange={onChange}
              />{" "}
              Filed{" "}
              <input
                type='radio'
                name='compliant'
                value='unfiled'
                checked={compliant === "unfiled"}
                onChange={onChange}
              />{" "}
              Unfiled
            </div>
            <div>
              <h5 className='text-center'>Marital Status</h5>
              <input
                className=''
                type='radio'
                name='filingStatus'
                value='married'
                checked={filingStatus === "married"}
                onChange={onChange}
              />{" "}
              Married{"   "}
              <input
                type='radio'
                name='filingStatus'
                value='single'
                checked={filingStatus === "single"}
                onChange={onChange}
              />{" "}
              Single{"   "}
            </div>
            <h5 className='text-center'>Tax Representation</h5>
            <input
              type='radio'
              name='cpa'
              value='cpa'
              checked={cpa === "cpa"}
              onChange={onChange}
            />{" "}
            CPA{" "}
            <input
              type='radio'
              name='cpa'
              value='nocpa'
              checked={cpa === "nocpa"}
              onChange={onChange}
            />
            NO CPA
            <br />
            <input type='file' onChange={onUpload} style={{ width: "200px" }} />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default LeadForm;
