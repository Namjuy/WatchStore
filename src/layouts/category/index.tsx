// Original React component file

import { memo } from "react";
import CatImage1 from "../../assets/image/category-cavat.jpg";
import CatImage2 from "../../assets/image/category-watch.jpg";
import CatImage3 from "../../assets/image/category-shoes.jpg";
import { ShoppingOutlined } from "@ant-design/icons";
import './index.css'; // Import the CSS file

function CategoryComponent() {
  return (
    <>
      <div className="category-container">
        <h2 className="category-title">
          Category <ShoppingOutlined/>
        </h2>
        <div className="category-content">
          <a href="/cravat" className="category-item group">
            <img src={CatImage1} alt="" />
            <h3 className="category-item-title">Cravat</h3>
          </a>
          <a href="/watch" className="category-item group">
            <img src={CatImage2} alt="" />
            <h3 className="category-item-title">Watch</h3>
          </a>
          <a href="/shoes" className="category-item group">
            <img src={CatImage3} alt="" />
            <h3 className="category-item-title">Shoes</h3>
          </a>
        </div>
      </div>
    </>
  );
}

export default memo(CategoryComponent);
