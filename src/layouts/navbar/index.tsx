import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import "./index.css";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../middlewares/userLoginSlice";
const NavBar = () => {
  
  function logoutUser() {
    const dispatch = useDispatch();
    dispatch(logout());
  }

  const items = [
    {
      key: "1",
      label: <a href="/account">Profile</a>,
    },
    {
      key: "2",
      label: (
        <Link to={"/login"} onClick={() => logoutUser()}>
          Logout
        </Link>
      ),
    },
  ];
  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div className="product__heading">
        <a className="home__link" href={`/`}>
          Home
        </a>
        <ul className="product__nav">
          <li>Carvat</li>
          <li>Watch</li>
          <li>Shoes</li>
        </ul>
        <div className="setting">
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            {/* You can customize this button */}
            <UserOutlined style={{ fontSize: "1.5rem" }} />
          </Dropdown>
          <Link className="shopping-outlined" to="/Cart">
            <ShoppingOutlined style={{ fontSize: "1.5rem" }} />
          </Link>
        </div>
      </div>
    </>
  );
};
export default NavBar;
