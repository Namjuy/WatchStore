import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../middlewares/userLoginSlice";
import { useEffect } from "react";
interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  full_name: string;
  address: string;
  phone_number: string;
  date_of_birth: string;
  gender: boolean;
  is_active: boolean;
  is_admin: boolean;
  profile_picture: string;
  cart: [];
}
export const AddToCardButton = ({ product }: { product: any }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);

  // async function addProductToCart(productItem: any) {
  //   try {
  //     const newUserCart = JSON.parse(userLogin.cart);
  //     newUserCart.push(productItem);
  //     const cloneUser = { ...userLogin, cart: newUserCart };
  //     console.log(cloneUser);

  //     dispatch(addToCart(cloneUser));
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // }
  async function addProductToCart(productItem: any) {
    try {
      const newUserCart = [...userLogin.cart, productItem];
      const cloneUser = { ...userLogin, cart: newUserCart };
      console.log(cloneUser);

      dispatch(addToCart(cloneUser));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  useEffect(() => {}, [dispatch]);
  return (
    <>
      <button
        onClick={() => addProductToCart(product)}
        className="w-full rounded-[15px] border-solid my-[1rem] bg-[#ff2e2e] flex justify-center align-center hover:scale-[1.075] transition ease-in-out"
      >
        <div className="py-[0.5rem] my-[0.25rem]">
          {" "}
          <h3 className="py-[0.25rem] text-white">Đặt nhanh </h3>
          <span className="text-white">Giao tận nơi</span>
        </div>
        <ShoppingCartOutlined
          style={{
            fontSize: "30px",
            marginTop: "1.5rem",
            paddingLeft: "0.5rem",
          }}
        />
      </button>
    </>
  );
};
