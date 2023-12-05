import "./css/util.css";
import "./css/main.css";
import image from "../../assets/img-01.png";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../middlewares/userLoginSlice";
import { useNavigate } from "react-router-dom";
export const LoginForm = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { isLoginSuccess } = useSelector((state) => state.userLogin);
  const isAdmin = localStorage.getItem("is_admin") === "true" ? true : false;
  async function loginClick() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const res = await dispatch(login({ username, password })).unwrap();
      if (res.length == 0) {
        console.log("login failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isLoginSuccess) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [isLoginSuccess, isAdmin]);
  return (
    <>
      {" "}
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={image} alt="IMG" />
            </div>

            <form className="login100-form validate-form">
              <span className="login100-form-title">E-commerce</span>

              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  ref={usernameRef}
                />

                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  ref={passwordRef}
                />

                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={loginClick}>
                  Login
                </button>
              </div>

              <div className="text-center p-t-12">
                <span className="txt1">Forgot </span>
                <a className="txt2" href="#">
                  Username / Password?
                </a>
              </div>

              <div className="text-center p-t-136">
                <a className="txt2" href="#">
                  Create your Account
                  <i
                    className="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
