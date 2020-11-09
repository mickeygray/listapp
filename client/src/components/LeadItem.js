import React, { useContext } from "react";
import LeadContext from "../../context/lead/leadContext";

const LeadItem = ({ lead }) => {
  const leadContext = useContext(LeadContext);
  const {
    _id,
    fullName,
    deliveryAddress,
    city,
    state,
    zip4,
    pinCode,
    tracking,
    callid,
    source,
    emailAddress,
    plaintiff,
    fileType,
    amount,
    phone,
    bankruptcy,
    real,
    emailAddresses,
    phones,
    age,
    dob,
  } = lead;

  const lienid = _id.toString();
  const current = {
    fileType,
    fullName,
    lienid,
    deliveryAddress,
    city,
    state,
    zip4,
    phone,
    emailAddress,
    pinCode,
    plaintiff,
    amount,
    bankruptcy,
    real,
    emailAddresses,
    phones,
    age,
    tracking,
    callid,
    source,
    dob,
  };

  console.log(current, "1111111gbgfhfghgfhfh111");

  const { setCurrent, makeDNC } = leadContext;

  return (
    <div className='card bg-light'>
      <h5 className='text-danger text-left'>{fullName}</h5>{" "}
      <ul className='list grid-4' style={{ fontSize: ".8rem" }}>
        <li>
          Address:
          <br />
          {deliveryAddress}
        </li>
        <li>
          Lien Amount:
          <br /> {amount}
        </li>
        <li>
          Plaintiff:
          <br /> {plaintiff}
        </li>
        <li>
          Pin Code:
          <br /> {pinCode}
        </li>
      </ul>
      <button
        className='btn btn-dark btn-sm my-1'
        onClick={() => setCurrent(current)}>
        Set Lead
      </button>
      <button className='btn btn-danger btn-sm' onClick={() => makeDNC(lead)}>
        Do Not Contact
      </button>
    </div>
  );
};

export default LeadItem;
