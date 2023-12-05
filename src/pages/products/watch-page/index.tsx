import { ShoppingOutlined } from "@ant-design/icons";
import WatchList from "../../../components/product/watch";
import "./index.css";
import Search from "antd/es/input/Search";
import { WatchFilter } from "../../../layouts/product-filter/watch-filter";
import { api } from "../../../axios-instance";
import { useEffect, useState } from "react";
import { useCheckLogin } from "../../../utils/helper";
import  NavBar  from "../../../layouts/navbar";
import { DefaultButton1 } from "../../../components/button/defaul-button";

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

const WatchPage = () => {
  useCheckLogin();

  const [listProduct, setListProduct] = useState<Watch[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  async function getWatchsList() {
    try {
      const response = await api.get(`watches`);
      setListProduct(response.data);
    } catch (error) {
      console.error("Error fetching watch list:", error);
    }
  }

  function onSearch(value: string) {
    if (value.trim() !== "") {
      const findProduct = listProduct.filter((product) =>
        product.model_name.toLowerCase().includes(value.toLowerCase())
      );

      setListProduct(findProduct);
    } else {
      getWatchsList();
    }
  }

  function filtWatch() {
    // let filteredList = [...listProduct];
    // if (selectedBrand) {
    //   filteredList = filteredList.filter(
    //     (product) => product.brand === selectedBrand
    //   );
    // }
    // if (selectedColor) {
    //   filteredList = filteredList.filter(
    //     (product) => product.dial_color === selectedColor
    //   );
    // }
    // if (selectedType) {
    //   filteredList = filteredList.filter(
    //     (product) => product.movement_type === selectedType
    //   );
    // }
    // if (selectedMaterial) {
    //   filteredList = filteredList.filter(
    //     (product) => product.case_material === selectedMaterial
    //   );
    // }
    // if (selectedBrand || selectedColor || selectedMaterial || selectedType) {
    //   setListProduct(filteredList);
    // } else getWatchsList();
  }

  // console.log(listProduct);
  useEffect(() => {
    getWatchsList();
  }, []);

  return (
    <div id="product">
      {/* Category bar */}
      <NavBar />

      {/* Product Component */}
      <div className="search">
        <Search
          className="w-1/2 mx-auto my-4"
          onSearch={onSearch}
          placeholder="Nhập tên sản phẩm"
        />
      </div>
      
      <div className="main">
        {" "}
        <div className="left-main">
          <WatchFilter
            selectedBrand={selectedBrand}
            selectedColor={selectedColor}
            selectedMaterial={selectedMaterial}
            selectedType={selectedType}
            setSelectedBrand={setSelectedBrand}
            setSelectedColor={setSelectedColor}
            setSelectedMaterial={setSelectedMaterial}
            setSelectedType={setSelectedType}
            filtWatch={filtWatch}
          />
        </div>
        <div className="product__content">
          <WatchList listProduct={listProduct} getWatchsList={getWatchsList} />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
