import React from "react";
import Col from "react-bootstrap/Col";

function Category({ node }) {
  let componentCategory = null;
  if (node.category !== null) {
    componentCategory = (
      <span>
        <img className="category-icon"
             src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
             alt="icon for category"/>
        <div className="category-name">
          {node.category.name}
        </div>
      </span>
    );
  }

  return (
    <Col className="p-0 text-center word-break" xs={3}>
      {componentCategory}
    </Col>
  );
}

export default Category;