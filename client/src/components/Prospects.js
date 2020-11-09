import React, { useContext, useEffect, useState, Fragment } from "react";
import ProspectItem from "./ProspectItem";
import LeadContext from "../../context/lead/leadContext";
import CsvDownload from "react-json-to-csv";
import Pagination from "./Pagination";

const Prospects = ({ prosp, currentPosts }) => {
  const leadContext = useContext(LeadContext);

  const {
    getLeads,
    prospectsRes,
    prospect,
    workers,
    filters,
    getProspects,
  } = leadContext;

  const result = [];
  function arraysFilters(key) {
    switch (key) {
      case "showFullName":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].fullName = prospect.fullName)
            : (result[i] = {
                fullName: prospect.fullName,
              })
        );
        break;

      case "showCreateDate":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].createDate = prospect.createDate)
            : (result[i] = {
                createDate: Intl.DateTimeFormat(
                  "en-US",
                  {
                    timeZone: "America/Los_Angeles",
                  },
                  {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }
                ).format(new Date(prospect.createDate)),
              })
        );
        break;
      case "showAmount":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].amount = prospect.amount)
            : (result[i] = {
                amount: prospect.amount,
              })
        );
        break;
      case "showName2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].name2 = prospect.name2)
            : (result[i] = {
                name2: prospect.name2,
              })
        );
        break;
      case "showAddress2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].address2 = prospect.address2)
            : (result[i] = {
                address2: prospect.address2,
              })
        );
        break;
      case "showCity2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].city2 = prospect.city2)
            : (result[i] = {
                city2: prospect.city2,
              })
        );
        break;
      case "showState2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].state2 = prospect.state2)
            : (result[i] = {
                amount: prospect.amount,
              })
        );
        break;
      case "showZip2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].zip2 = prospect.zip2)
            : (result[i] = {
                zip2: prospect.zip2,
              })
        );
        break;
      case "showEmployerTime":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].employerTime = prospect.employerTime)
            : (result[i] = {
                employerTime: prospect.employerTime,
              })
        );
        break;
      case "showSsn2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].ssn2 = prospect.ssn2)
            : (result[i] = {
                ssn2: prospect.ssn2,
              })
        );
        break;
      case "showLexId":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].lexId = prospect.lexId)
            : (result[i] = {
                lexId: prospect.lexId,
              })
        );
        break;
      case "showPhone2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].phone2 = prospect.phone2)
            : (result[i] = {
                phone2: prospect.phone2,
              })
        );
        break;
      case "showPhone3":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].phone3 = prospect.phone3)
            : (result[i] = {
                phone3: prospect.phone3,
              })
        );
        break;
      case "showBankruptcyType" && prospect.bankruptcy:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].bankrupctyType = prospect.bankruptcy.filingType)
            : (result[i] = {
                bankrupctyType: prospect.bankruptcy.filingType,
              })
        );
        break;
      case "showAge":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].age = prospect.age)
            : (result[i] = {
                age: prospect.age,
              })
        );
        break;
      case "showEmail2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].email2 = prospect.email2)
            : (result[i] = {
                email2: prospect.email2,
              })
        );
        break;
      case "showEmail3":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].email3 = prospect.email3)
            : (result[i] = {
                email3: prospect.email3,
              })
        );
        break;
      case "showProblem1":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].problem1 = prospect.problem1)
            : (result[i] = {
                problem1: prospect.problem1,
              })
        );
        break;
      case "showProblem2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].problem2 = prospect.problem2)
            : (result[i] = {
                problem2: prospect.problem2,
              })
        );
        break;
      case "showProblem3":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].problem3 = prospect.problem3)
            : (result[i] = {
                problem3: prospect.problem3,
              })
        );
        break;
      case "showResSold":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].resSold = prospect.resSold)
            : (result[i] = {
                resSold: prospect.resSold,
              })
        );
        break;

      case "showResSold2":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].resSold2 = prospect.resSold2)
            : (result[i] = {
                resSold2: prospect.resSold2,
              })
        );
        break;

      case "showHome":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].homePay = prospect.homePay)
            : (result[i] = {
                homePay: prospect.homePay,
              })
        );
        break;

      case "showHomePay" && prospect.real:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].homeLoan = prospect.real.amount)
            : (result[i] = {
                homeLoan: prospect.real.amount,
              })
        );
        break;
      case "showWages":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].wages = prospect.wages)
            : (result[i] = {
                wages: prospect.wages,
              })
        );
        break;
      case "showIncome1Type":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].income1Type = prospect.income1Type)
            : (result[i] = {
                income1Type: prospect.income1Type,
              })
        );
        break;
      case "showIncome1Value":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].income1Value = prospect.income1Value)
            : (result[i] = {
                income1Value: prospect.income1Value,
              })
        );
        break;
      case "showIncome2Type":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].income2Type = prospect.income2Type)
            : (result[i] = {
                income2Type: prospect.income2Type,
              })
        );
        break;
      case "showIncome2Value":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].income2Value = prospect.income2Value)
            : (result[i] = {
                income2Value: prospect.income2Value,
              })
        );
        break;
      case "showIncome3Type":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].showIncome3Type = prospect.income3Type)
            : (result[i] = {
                income3Type: prospect.income3Type,
              })
        );
        break;
      case "showPlaintiff":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].plaintiff = prospect.plaintiff)
            : (result[i] = {
                plaintiff: prospect.plaintiff,
              })
        );
        break;
      case "showIncome3Value":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].income3Value = prospect.income3Value)
            : (result[i] = {
                amount: prospect.income3Value,
              })
        );
        break;
      case "showOtherIncomeType":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].otherIncomeType = prospect.otherIncomeType)
            : (result[i] = {
                otherIncomeType: prospect.otherIncomeType,
              })
        );
        break;
      case "showOtherIncomeValue":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].otherIncomeValue = prospect.otherIncomeValue)
            : (result[i] = {
                otherIncomeValue: prospect.otherIncomeValue,
              })
        );
        break;
      case "showAvailableCredit":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].availableCredit = prospect.availableCredit)
            : (result[i] = {
                availableCredit: prospect.availableCredit,
              })
        );
        break;

      case "showCreditScore":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].creditScore = prospect.creditScore)
            : (result[i] = {
                creditScore: prospect.creditScore,
              })
        );
        break;

      case "showBankruptcyType" && prospect.bankruptcy:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].bankruptcyType = prospect.bankruptcy.filingType)
            : (result[i] = {
                bankruptcyType: prospect.bankruptcy.filingType,
              })
        );
        break;
      case "showEmail":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].email = prospect.email)
            : (result[i] = {
                email: prospect.email,
              })
        );
        break;
      case "showTotalCredit":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].totalCredit = prospect.totalCredit)
            : (result[i] = {
                totalCredit: prospect.totalCredit,
              })
        );
        break;
      case "showEmployerName":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].employerName = prospect.employerName)
            : (result[i] = {
                employerName: prospect.employerName,
              })
        );
        break;
      case "showEmployerPhone":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].employerPhone = prospect.employerPhone)
            : (result[i] = {
                employerPhone: prospect.employerPhone,
              })
        );
        break;

      case "showPhone":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].phone = prospect.phone)
            : (result[i] = {
                phone: prospect.phone,
              })
        );
        break;
      case "showPinCode":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].pinCode = prospect.pinCode)
            : (result[i] = {
                pinCode: prospect.pinCode,
              })
        );
        break;
      case "showStatus":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].status = prospect.status)
            : (result[i] = {
                status: prospect.status,
              })
        );
        break;
      case "showCompliant":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].compliant = prospect.compliant)
            : (result[i] = {
                compliant: prospect.compliant,
              })
        );
        break;
      case "showFilingStatus":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].filingStatus = prospect.filingStatus)
            : (result[i] = {
                filingStatus: prospect.filingStatus,
              })
        );
        break;
      case "showCpa":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].cpa = prospect.cpa)
            : (result[i] = {
                cpa: prospect.cpa,
              })
        );
        break;
      case "showSsn":
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].ssn = prospect.ssn)
            : (result[i] = {
                ssn: prospect.ssn,
              })
        );
        break;
      case "showGross" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].gross = prospect.paymentStatus.gross)
            : (result[i] = {
                amount: prospect.paymentStatus.gross,
              })
        );
        break;
      case "showQuote" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].quote = prospect.paymentStatus.quote)
            : (result[i] = {
                quote: prospect.paymentStatus.quote,
              })
        );
        break;
      case "showInitial" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].initial = prospect.paymentStatus.initial)
            : (result[i] = {
                initial: prospect.paymentStatus.initial,
              })
        );
        break;
      case "showTotal" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].total = prospect.paymentStatus.total)
            : (result[i] = {
                total: prospect.paymentStatus.total,
              })
        );
        break;
      case "showPayments" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].paymentsRemaining =
                prospect.paymentStatus.paymentsRemaining)
            : (result[i] = {
                paymentsRemaining: prospect.paymentStatus.paymentsRemaining,
              })
        );
        break;
      case "showPercent" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].percentPaid = prospect.paymentStatus.percentPaid)
            : (result[i] = {
                percentPaid: prospect.paymentStatus.percentPaid,
              })
        );
        break;

      case "showRedline" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].redLine = prospect.paymentStatus.redLine)
            : (result[i] = {
                redLine: prospect.paymentStatus.redLine,
              })
        );
        break;

      case "showRefund" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].refunded = prospect.paymentStatus.refunded)
            : (result[i] = {
                refunded: prospect.paymentStatus.refunded,
              })
        );
        break;

      case "showInitialPaymentDate" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].initialPaymentDate =
                prospect.paymentStatus.initialPaymentDate)
            : (result[i] = {
                initialPaymentDate: Intl.DateTimeFormat(
                  "en-US",
                  {
                    timeZone: "America/Los_Angeles",
                  },
                  {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }
                ).format(prospect.paymentStatus.initialPaymentDate),
              })
        );
        break;

      case "showLastPaymentDate" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].lastPaymentDate =
                prospect.paymentStatus.lastPaymentDate)
            : (result[i] = {
                lastPaymentDate: Intl.DateTimeFormat(
                  "en-US",
                  {
                    timeZone: "America/Los_Angeles",
                  },
                  {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }
                ).format(prospect.paymentStatus.lastPaymentDate),
              })
        );
        break;

      case "showBalance" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].balance = prospect.paymentStatus.balance)
            : (result[i] = {
                balance: prospect.paymentStatus.balance,
              })
        );
        break;
      case "showLoan" && prospect.paymentStatus:
        prospectsRes.map((prospect, i) =>
          result[i]
            ? (result[i].loans = prospect.paymentStatus.loans)
            : (result[i] = {
                loans: prospect.paymentStatus.loans,
              })
        );
        break;
    }
  }

  Object.keys(prosp).map((key) => {
    prosp[key] ? arraysFilters(key) : console.log("");
  });

  const statusArray = filters
    .filter((a) => a.includes("is"))
    .map((x) => x.replace(/is/g, ""))
    .map((x) => x.toLowerCase());

  return (
    <Fragment>
      <div>
        <CsvDownload data={result} />
      </div>
      <div style={leadStyle}>
        {currentPosts.length > 0 && statusArray.length > 0
          ? currentPosts

              .filter((o) =>
                Object.values(o).some((r) => statusArray.indexOf(r) >= 0)
              )
              .map((filtered) => (
                <ProspectItem
                  key={filtered._id}
                  filtered={filtered}
                  prosp={prosp}
                />
              ))
          : currentPosts.map((filtered) => (
              <ProspectItem
                key={filtered._id}
                filtered={filtered}
                prosp={prosp}
              />
            ))}
      </div>
    </Fragment>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
  gridGap: ".15rem",
};

export default Prospects;
