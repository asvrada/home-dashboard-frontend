import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CompanyCard({ node }) {
  const componentCompany = node.company ? (
    <Row className="align-items-center m-0">
      <img className="other-icon"
           src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
           alt="icon for company"/>
      <span>{node.company.name}</span>
    </Row>
  ) : null;
  const componentCard = node.card ? (
    <Row className="align-items-center m-0">
      <img className="other-icon"
           src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
           alt="icon for card"/>
      <span>{node.card.name}</span>
    </Row>
  ) : null;
  const componentSeparatorCompanyCard = (componentCard && componentCompany) ? (
    <div className="h-separator"/>
  ) : null;

  return (
    <Col className="p-0" xs={5}>
      {componentCompany}
      {componentSeparatorCompanyCard}
      {componentCard}
    </Col>
  );
}

export default CompanyCard;