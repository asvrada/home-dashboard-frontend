import React from "react";

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
    <div className="col-3 p-0 text-center word-break">
      {componentCategory}
    </div>
  );
}

export default Category;