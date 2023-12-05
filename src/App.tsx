import { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { CartPage } from "./pages/cart";
import { loginSuccess } from "./middlewares/userLoginSlice";

import LandingPage from "./pages/landing-page";
import { LoginForm } from "./pages/log";
import { WatchDetail } from "./pages/products/watch-page/watch-detail";
import WatchPage from "./pages/products/watch-page";
import { AdminPage } from "./pages/admin";
import AccountPage from "./pages/user";

export const UserContext = createContext(null);
export const ProductContext = createContext(null);
export const inputStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/watch",
    element: <WatchPage />,
  },
  {
    path: "/watch/:watchId",
    element: <WatchDetail />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
]);

function App() {
  const [productCart, setProductCart] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const email = localStorage.getItem("email");
    const fullname = localStorage.getItem("full_name");
    const address = localStorage.getItem("address");
    const phone = localStorage.getItem("phone_number");
    const dob = localStorage.getItem("date_of_birth");
    const gender = localStorage.getItem("gender");
    const isActive = localStorage.getItem("is_active");
    const isAdmin = localStorage.getItem("is_admin");
    const profile = localStorage.getItem("profile_picture");
    const cartLocalStorage = localStorage.getItem("cart");

    if (username) {
      const cartArray = cartLocalStorage || [];
      // set user from localstorage into reducer
      store.dispatch(
        loginSuccess({
          id: id,
          username: username,
          password: password,
          email: email,
          full_name: fullname,
          address: address,
          phone_number: phone,
          date_of_birth: dob,
          gender: gender,
          is_active: isActive,
          is_admin: isAdmin,
          profile_picture: profile,
          cart: cartLocalStorage,
        })
      );
      if (cartArray === null) {
        setProductCart([]);
      }
    }
  }, []);
  return (
    <ProductContext.Provider value={{ productCart, setProductCart }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ProductContext.Provider>
  );
}

export default App;
