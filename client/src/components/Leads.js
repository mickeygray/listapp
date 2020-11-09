import React, { useContext, useEffect } from "react";
import LeadItem from "./LeadItem";
import LeadContext from "../../context/lead/leadContext";

const Leads = () => {
  const leadContext = useContext(LeadContext);

  const { leads, searchLeads } = leadContext;

  useEffect(() => {}, [leadContext, searchLeads]);

  console.log(leads);

  return (
    <div className='sidebar'>
      {leads != null
        ? leads.map((lead) => <LeadItem key={lead._id} lead={lead} />)
        : ""}
    </div>
  );
};

export default Leads;
