import { useEffect, useState } from "react";
import { useCheckLogin } from "../../utils/helper";
import "./index.css";
import Search from "antd/es/input/Search";
import CartEmpty from "../../assets/image/empty-cart.png";
import { DefaultButton1 } from "../../components/button/defaul-button";
import { CartItem } from "../../components/cart-component";
import { Link } from "react-router-dom";
import NavBar from "../../layouts/navbar";

export const CartPage = () => {
  useCheckLogin();

  const [cartList, setCartList] = useState([]);
  
  const cartStore = localStorage.getItem("cart");
  const [checkPayment, setCheckPayment] = useState(false);

  async function getCartList() {
     try {
      const parsedCart = JSON.parse(cartStore);
      setCartList(parsedCart);
    } catch (error) {
      console.error("Error parsing cart:", error);
    }
  }
  useEffect(() => {
   getCartList();
    return () => {};
  }, [cartStore]);

  function onSearch(value: string) {
    if (value.trim() !== "") {
      const findProduct = cartList.filter((product) =>
        product.model_name.toLowerCase().includes(value.toLowerCase())
      );

      setCartList(findProduct);
    } else {
      getCartListF();
    }
  }

  return (
    <>
      <NavBar />
      <div className="search">
        <Search
          className="w-1/2 mx-auto my-4"
          onSearch={onSearch}
          placeholder="Nhập tên sản phẩm"
        />
      </div>
      <div id="cart">
        <h3 className="cart__heading">Giỏ hàng </h3>
        <div className="cart__line"></div>
        <div className="cart-container">
          {cartList.length == 0 && checkPayment === false ? (
            <div className="cart__empty">
              <img className="cart__empty__img" src={CartEmpty} alt="" />
              <h3 className="cart__empty__heading">
                Không tồn tại sản phẩm nào
              </h3>
              <Link to={`/watch`}>  <DefaultButton1 content="Quay lại mua sắm" /></Link>
            
            </div>
          ) : (
            <div className="cart__item">
              <ul className="cart__title">
                <li className="cart__title__image">Image</li>
                <li className="cart__title__name">Product Name</li>
                <li className="cart__title__price">Price</li>
                <li className="cart__title__quantity">Quantity</li>
                <li className="cart__title__total">Total</li>
              </ul>
              <CartItem cartList={cartList} checkPayment={checkPayment} setCheckPayment={setCheckPayment} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
