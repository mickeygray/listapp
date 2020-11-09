import React, { useContext, useState, useEffect } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import { Link } from "react-router-dom";
import refund from "../../images/refund.png";

const TodaysProspectItem = ({ prospect }) => {
  const {
    fullName,
    amount,
    phone,
    email,
    _id,
    quote,
    pinCode,
    status,
  } = prospect;

  const match = prospect;
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { getProspect } = leadContext;
  const { setRecent } = userContext;

  const onClick = (e) => {
    getProspect(_id);
    setRecent(match);
  };

  const [colorStyle, setColorStyle] = useState({
    backgroundColor: "yellow",
    color: "black",
    fontWeight: "bold",
    height: "66px",
  });

  useEffect(() => {
    if (status === "client") {
      setColorStyle({
        backgroundColor: "#00FF00",
        color: "black",
        fontWeight: "bold",
        height: "66px",
      });
    } else if (status === "upsellable") {
      setColorStyle({
        backgroundColor: "#3CB371",
        color: "black",
        fontWeight: "bold",
        height: "66px",
      });
    } else if (status === "highdollar") {
      setColorStyle({
        backgroundColor: "#6B8E23",
        color: "white",
        fontWeight: "bold",
        height: "66px",
      });
    } else if (status === "prospect") {
      setColorStyle({
        backgroundColor: "yellow",
        color: "black",
        height: "66px",
      });
    } else if (status === "redline") {
      setColorStyle({
        backgroundColor: "red",
        color: "black",
        fontWeight: "bold",
        height: "66px",
      });
    } else if (status === "refunded") {
      setColorStyle({
        backgroundColor: "red",
        backgroundSize: "cover",
        height: "66px",
      });
    }
  }, [status]);
  return (
    <Link to={`/prospects/${_id}`} onClick={onClick} style={colorStyle}>
      <nav className='navbar'>
        {status === "refunded" ? "REFUNDED" : ""}
        <ul>
          <li className='px-2'>
            {" "}
            <strong>Full Name </strong> <br /> {fullName}
          </li>
          <li className='px-2'>
            {" "}
            <strong>Phone </strong> <br /> {phone}
          </li>
          <li className='px-2'>
            {" "}
            <strong>Email </strong> <br /> {email}
          </li>
          <li className='px-2'>
            {" "}
            <strong>Amount </strong> <br /> {amount}
          </li>
          <li className='px-2'>
            {" "}
            <strong>Quote </strong> <br /> {quote}
          </li>
          <li className='px-2'>
            <strong>Pin Code </strong> <br /> {pinCode}
          </li>
        </ul>
      </nav>
    </Link>
  );
};

export default TodaysProspectItem;
