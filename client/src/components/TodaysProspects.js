import React, { useContext, useEffect } from "react";
import TodaysProspectItem from "./TodaysProspectItem";
import LeadContext from "../../context/lead/leadContext";

const TodaysProspects = () => {
  const leadContext = useContext(LeadContext);
  const { todaysLeads, getTodaysProspects } = leadContext;

  useEffect(() => {
    getTodaysProspects();
  }, []);

  console.log(todaysLeads);

  return (
    <div style={leadStyle}>
      {todaysLeads.length > 0
        ? todaysLeads.map((prospect) => (
            <TodaysProspectItem key={prospect._id} prospect={prospect} />
          ))
        : ""}
    </div>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
  gridGap: ".1rem",
};

export default TodaysProspects;
