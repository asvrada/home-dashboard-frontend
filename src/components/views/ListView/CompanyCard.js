import React from "react";

function CompanyCard({ node }) {
  const componentCompany = node.company ? (
    <div className="row align-items-center m-0">
      <img className="other-icon"
           src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
           alt="icon for company"/>
      <span>{node.company.name}</span>
    </div>
  ) : null;
  const componentCard = node.card ? (
    <div className="row align-items-center m-0">
      <img className="other-icon"
           src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
           alt="icon for card"/>
      <span>{node.card.name}</span>
    </div>
  ) : null;
  const componentSeparatorCompanyCard = (componentCard && componentCompany) ? (
    <div className="h-separator"/>
  ) : null;

  return (<div className="col-5 p-0">
    {componentCompany}
    {componentSeparatorCompanyCard}
    {componentCard}
  </div>);
}

export default CompanyCard;