import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductList } from "../../middlewares/productListSlice";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { useCheckLogin } from "../../utils/helper";

export const Home = () => {
  useCheckLogin();
  const ImageUrl = `../assets/image`
  const [loading, setLoading] = useState(false);
  const paginationStyle: string =
    "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";

  const [productsList, setProductsList] = useState([]);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // You can change this to the desired number of items per page

  // Calculate the range of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsList.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPage = Math.ceil(productsList.length / itemsPerPage);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //   get product from api
  async function loadProductList() {
    setLoading(true);
    try {
      const response = await dispatch(getProductList()).unwrap();

      setProductsList(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  // get list of products

  useEffect(() => {
    loadProductList();
  }, []);

   
    
  
  return (
    <>
      
      
      <Spin spinning={loading} tip="Loading....">
        <div className="container mx-auto my-0">
          <div id="products">
            <div className="text-2xl text-center font-semibold">
              Clothes
            </div>

            <div className="products__list" id="products__list">
              {currentItems.map((item) => (
                <div className="products__item">
                  <small className="absolute top-0 left-0 bg-red-500 text-white inline-block py-1 px-2 rounded-br-lg">
                    Sale {item.sale}%
                  </small>
                  <p className="flex h-279 items-center hover:scale-115 transform transition-transform duration-400">
                    <a href="#" className="mb-30 block text-center h-224">
                      <img
                        className="max-w-[80%] inline-block"
                        src={item.productImage}
                        alt=""
                      />
                    </a>
                  </p>
                  <p>
                    <a href="#" className="products__title">
                      {item?.productName}
                    </a>
                  </p>
                  <p className="text-red-500 text-base">
                    <span>Cost: {item.price} đ</span>
                  </p>
                  <div className="text-orange-500 font-roboto-medium text-[13.5px]">
                    <span className="text-orange-500 font-roboto-medium text-[13.5px]">
                      Remain: {item.quantity}{" "}
                    </span>
                    <br />
                    <span className="inline-block ">
                      {" "}
                     Made from: {item.origin}{" "}
                    </span>
                  </div>
                  <br />
                  <Link to={`/products/${item.id}`}>
                    <button className="bg-sky-400 px-4 py-2 rounded-lg">
                      Detail
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Pagination */}
        <ul className="flex items-center -space-x-px h-8 text-smination justify-center">
          {Array.from({ length: totalPage }).map((_, index) => (
            <li
              style={{ marginRight: "10px" }}
              key={index}
              onClick={() => changePage(index + 1)}
              className={
                currentPage === index + 1
                  ? "active bg-blue-50 " + paginationStyle
                  : paginationStyle
              }
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </Spin>

     
    </>
  );
};
