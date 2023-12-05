import { useEffect, useState } from "react";
import "./index.css";
import { DefaultButton1 } from "../button/defaul-button";
import { updateWatchList } from "../../middlewares/watchListSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserCart,
} from "../../middlewares/userLoginSlice";
import { ChangeNumberButton } from "../button/changeNumber-button";
import { Link } from "react-router-dom";
export const CartItem = ({
  cartList,
  checkPayment,
  setCheckPayment,
}: {
  cartList: any;
  checkPayment: boolean;
  setCheckPayment: (item: any) => void;
}) => {
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState();
  const user = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  

  function getCartList() {
    const uniqueItems = [];

    cartList.forEach((item) => {
      const existingItem = uniqueItems.find(
        (uniqueItem) => uniqueItem.id === item.id
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        uniqueItems.push({ ...item, count: 1 });
      }
    });

    return uniqueItems;
  }

  function getTotal(list: any) {
    let total = 0;
    for (const uniqueItem of list) {
      total += uniqueItem.price * uniqueItem.count;
    }
    return total;
  }

  useEffect(() => {
    setProductList(getCartList());
  }, [cartList]);

  useEffect(() => {
    setTotal(getTotal(productList));
  }, [total]);

  function doPayment() {
    const cloneResultArray = [...productList];

    cloneResultArray.map((item) => {
      console.log(item);

      updatedCart(item);
    });
    localStorage.setItem("cart", JSON.stringify([]));
    const cloneUser = { ...user, cart: [] };
    updateUserStore(cloneUser);
    setCheckPayment(true);
  }

  async function updateUserStore(user: any) {
    try {
      await dispatch(updateUserCart(user));
    } catch (error) {}
  }

  async function updatedCart(item: any) {
    try {
      await dispatch(updateWatchList(item)).unwrap();
    } catch (error) {
      alert("Something went wrong");
    }
  }
  // async function removeCartItem(user: any, list: any) {
  //   console.log(1);

  //   try {
  //     await dispatch(updateRemovedUserCart(user, list)).unwrap();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function incrementQuantity(product: any) {
    const updatedProductList = [...productList];
    const index = updatedProductList.findIndex(
      (cartItem) => cartItem.id == product.id
    );
    console.log(product.count, product.stock_quantity);

    if (index !== -1 && product.count < product.stock_quantity) {
      updatedProductList[index].count += 1;
      setProductList(updatedProductList);
    } else {
      alert(
        "Cart item quantity must be equal or less than remaining product quantity"
      );
    }
  }

  function decrementQuantity(product: any) {
    const updatedProductList = [...productList];
    const index = updatedProductList.findIndex(
      (cartItem) => cartItem.id === product.id
    );

    if (index !== -1) {
      updatedProductList[index].count -= 1;

      if (updatedProductList[index].count === 0) {
        // Remove the item if its quantity becomes 0

        updatedProductList.splice(index, 1);
        const cloneCart = cartList.filter((item) => item.id !== product.id);
        const cloneUser = { ...user, cart: cloneCart };

        updateUserStore(cloneUser);
      }

      setProductList(updatedProductList);

      // Update local storage
      localStorage.setItem("cart", JSON.stringify(updatedProductList));
    }
  }

  return (
    <>
      <div className="cart-list-container">
        {checkPayment && (
          <div className="container mx-auto mt-4">
            <div className="bg-green-200 border border-green-600 text-green-600 px-4 py-2 rounded-md">
              Thanh toán thành công
            </div>
          </div>
        )}
        {productList.map((product) => (
          <>
            {" "}
            <ul className="cart-list">
              <li className="cart-item__img">
                <img src={product.image} alt="" />
              </li>
              <li className="cart-item__name">{product.model_name}</li>
              <li className="cart-item__price">{product.price}</li>
              <li className="cart-item__quantity">
                {" "}
                <ChangeNumberButton
                  func={() => decrementQuantity(product)}
                  content="-"
                />
                {product.count}{" "}
                <ChangeNumberButton
                  func={() => incrementQuantity(product)}
                  content="+"
                />
              </li>
              <li className="cart-item__total">
                {product.count * product.price}
              </li>
            </ul>
          </>
        ))}
      </div>
      <div className="cart-footer">
        <ul>
          <li className="cart-footer__button">
            {" "}
            <Link to={`/watch`}> <DefaultButton1 content="Quay trở lại mua sắm" /></Link>
           
          </li>
          <li className="cart-footer__space">Total: {total}</li>
          <li className="cart-footer__total">
            {" "}
            <div onClick={doPayment}>
              {" "}
              <DefaultButton1 content="Thanh toán" />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
