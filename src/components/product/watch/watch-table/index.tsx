import "../index.css";
import { DefaultButton2 } from "../../../button/defaul-button";
import { useEffect, useState } from "react";
import Pagination from "../../../pagination";
import { useDispatch } from "react-redux";
import { updateWatchStatus } from "../../../../middlewares/watchListSlice";
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
export const WatchTable = ({ watchList ,editWatch }: { watchList: Array<Watch>, editWatch:(item:any)=>void }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = watchList.slice(indexOfFirstItem, indexOfLastItem);
  const dispatch = useDispatch();
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  async function disableWatch(watch: Watch) {
    try {
      const cloneWatch = { ...watch, is_available: false };
      await dispatch(updateWatchStatus(cloneWatch)).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  async function activeWatch(watch: Watch) {
    try {
      const cloneWatch = { ...watch, is_available: true };
      await dispatch(updateWatchStatus(cloneWatch)).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    <>
      <table id="product-table">
        <tr>
          <th>ID</th>
          <th>Brand</th>
          <th>Model Name</th>
          <th>Price</th>
          <th>Movement Type</th>
          <th>Case Material</th>
          <th>Case Diameter</th>
          <th>Water Resistance</th>
          <th>Strap Material</th>
          <th>Dial Color</th>
          <th>Date Added</th>
          <th>Stock Quantity</th>
          <th>Availability</th>
          <th>Sale</th>
          <th>Description</th>
          <th>Image</th>
          <th colSpan={2}>Action</th>
        </tr>
        <tbody>
          {currentItems.map((product: Watch) => (
            <tr>
              <td>{product.id}</td>
              <td>{product.brand}</td>
              <td>{product.model_name}</td>
              <td>{product.price}</td>
              <td>{product.movement_type}</td>
              <td>{product.case_material}</td>
              <td>{product.case_diameter}</td>
              <td>{product.water_resistance}</td>
              <td>{product.strap_material}</td>
              <td>{product.dial_color}</td>
              <td>{product.date_added}</td>
              <td>{product.stock_quantity}</td>
              <td>{product.is_available ? "Yes" : "No"}</td>
              <td>{product.sale}</td>
              <td>{product.description}</td>
              <td>{product.image}</td>
              <td>
                <DefaultButton2 content="Edit" handleOk={()=>editWatch(product)} />
              </td>
              <td>
                {product.is_available ? (
                  <DefaultButton2
                    content="Disable"
                    handleOk={() => disableWatch(product)}
                  />
                ) : (
                  <DefaultButton2
                    content="Active"
                    handleOk={() => activeWatch(product)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={watchList.length}
        paginate={paginate}
      />
    </>
  );
};
