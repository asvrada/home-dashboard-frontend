import React from "react";

function Category({ node }) {
  return (
    <div className="col-3 p-0 text-center word-break">
      <img className="category-icon"
           src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
           alt="icon for category"/>
      <div className="category-name">
        {node.category.name}
      </div>
    </div>
  );
}

export default Category;