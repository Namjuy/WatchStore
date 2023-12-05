import Search from "antd/es/input/Search";
import { WatchTable } from "../../components/product/watch/watch-table";
import  NavBar  from "../../layouts/navbar";
import { useCheckLogin } from "../../utils/helper";
import { useEffect, useState } from "react";
import { api } from "../../axios-instance";
import ModalComponent from "../../components/antd-component/modal";
import './index.css'
export const AdminPage = () => {
  useCheckLogin();
  const [listProduct, setListProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    removeWatchChoosing();
    setOpen(false);
  };

  async function getWatchsList() {
    try {
      const response = await api.get(`watches`);
      setListProduct(response.data);
    } catch (error) {
      console.error("Error fetching watch list:", error);
    }
  }

  useEffect(() => {
    getWatchsList();
  }, []);

  function searchWatch(value: string) {
    if (value.trim() !== "") {
      const findProduct = listProduct.filter((product) =>
        product.model_name.toLowerCase().includes(value.toLowerCase())
      );

      setListProduct(findProduct);
    } else {
      getWatchsList();
    }
  }

  function editWatch(item: any) {
    setSelectedProduct(item);
    setOpen(true);
  }

  function removeWatchChoosing() {
    setSelectedProduct(undefined);
  }
  return (
    <>
      {" "}
      <NavBar />
      <h2 className="admin__heading">Watch Management</h2>
      <div className="search">
        <Search
          className="w-1/2 mx-auto my-4"
          onSearch={searchWatch}
          placeholder="Search Model Name"
        />
      </div>
      <ModalComponent
        open={open}
        showModal={showModal}
        handleCancel={handleCancel}
        getWatchsList={getWatchsList}
        selectedProduct={selectedProduct}
        removeWatchChoosing={removeWatchChoosing}
      />
      <WatchTable watchList={listProduct} editWatch={editWatch} />
    </>
  );
};
