import className from "classnames";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";

import { formatCurrency } from "../../../helpers/utils";
import Category from "./Category";
import CompanyAndCard from "./CompanyAndCard";

function NaturalCurrency({ amount }) {
  amount = Math.abs(amount);
  const strAmount = formatCurrency(amount);

  return (
    <div className="amount">
      <span className="dollar-sign">$</span>
      <span>{strAmount[0]}</span>
      <span>.</span>
      <span className="amount-decimal">{strAmount[1]}</span>
    </div>
  );
}

/**
 * Display a single entry of log
 */
function Entry({ isIncome, node }) {
  const history = useHistory();
  const componentCurrency = <NaturalCurrency amount={node.amount} />;

  const componentCategory = <Category node={node} />;
  const componentCompanyCard = <CompanyAndCard node={node} />;
  const componentNote = node.note
    ? (
      <>
        <div className="h-separator" />
        <div className="word-break">{isIncome ? "+" : "-"} {node.note}</div>
      </>
    )
    : null;

  let classname = className("Entry", "align-items-center", {
    "EntryIn": isIncome,
    "EntryOut": !isIncome,
  });

  return (
    <Row className={classname}
         onClick={() => history.push(`/detail/${node.id}/`)}>
      {componentCategory}

      {/* Amount Note */}
      <Col>
        {componentCurrency}
        {componentNote}
      </Col>

      {/* Company Card */}
      {componentCompanyCard}
    </Row>
  );
}

export default Entry;
