import { useState, useEffect } from "react";
import "./index.css";

import { DetailButton } from "../../button/detail-button";
import Pagination from "../../pagination";

interface Watch {
  id: number;
  brand: string;
  model_name: string;
  price: number;
  movement_type: string;
  case_material: string;
  case_diameter: number;
  water_resistance: number;
  strap_material: string;
  dial_color: string;
  date_added: string;
  stock_quantity: number;
  is_available: boolean;
  sale: number;
  description: string;
  image: string;
}

const WatchList = ({
  listProduct,
  getWatchsList,
}: {
  listProduct: Array<Watch>;
  getWatchsList: () => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listProduct.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getWatchsList();
  }, []);

  return (
    <>
      <div className="product__list">
        {currentItems.length > 0 ? (
          currentItems.map((product, index) => (
            <div className="product__item" key={product.id}>
              <div className="product__sale">
                <h4>{product.sale}%</h4>
              </div>
              <div className="product__img">
                <a href="#">
                  <img src={product.image} alt="Product Image" />
                </a>
              </div>
              <div className="product__title">{product.model_name}</div>
              <p className="product__brand">Hãng: {product.brand}</p>
              <p className="product__structure">
                Cấu trúc : {product.case_material}
              </p>
              <p className="product__price">Giá : {product.price}</p>
              <div className="product__detail-button">
                <DetailButton item="watch" itemId={product.id}/>
              </div>
            </div>
          ))
        ) : (
          <p>Hiện chưa có sản phẩm nào</p>
        )}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={listProduct.length}
        paginate={paginate}
      />
    </>
  );
};

export default WatchList;
