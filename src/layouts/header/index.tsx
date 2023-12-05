import background from "../../assets/image/hero-image.jpg";
import { memo } from "react";
import { DefaultButton } from "../../components/button/defaul-button";
import "./index.css";
import { useDispatch } from "react-redux";
import { logout } from "../../middlewares/userLoginSlice";
import { Link } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("username");

  function logoutUser() {
    dispatch(logout());
  }

  return (
    <header className="header">
      <img className="hero-img" src={background} alt="Background" />
      <nav className="nav-container">
        <ul className="navbar">
          <li className="nav__item">
            {" "}
           <Link to={'/'}>Home</Link>
          </li>

          <li className="nav__item">
            {" "}
            {!user ? (
              <Link to={"/login"}>Profile</Link>
            ) : (
              <Link to={"/account"}>Profile</Link>
            )}
          </li>
          <li className="nav__item">
            {!user ? (
              <Link to={"/login"}>My Cart</Link>
            ) : (
              <Link to={"/cart"}>My Cart</Link>
            )}
          </li>
          <li className="nav__item">
            {!user ? (
              <Link to={"/login"}>Login</Link>
            ) : (
              <Link to={"/login"} onClick={() => logoutUser()}>
                Logout
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="hero-container">
        <h2 className="hero-heading">E-COMMERCE</h2>
        <DefaultButton content="Get Started" />
      </div>
    </header>
  );
};

export default memo(Header);
