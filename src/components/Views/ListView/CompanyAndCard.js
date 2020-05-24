import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CompanyAndCard({ node }) {
  const componentCompany = node.company ? (
    <Row className="align-items-center mb-2">
      <img className="other-icon"
           src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
           alt="icon for company" />
      <span>{node.company.name}</span>
    </Row>
  ) : null;
  const componentCard = node.card ? (
    <Row className="align-items-center">
      <img className="other-icon"
           src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
           alt="icon for card" />
      <span>{node.card.name}</span>
    </Row>
  ) : null;

  return (
    <Col xs={4}>
      {componentCompany}
      {componentCard}
    </Col>
  );
}

export default CompanyAndCard;