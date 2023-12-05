import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../layouts/navbar";
import "./index.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCheckLogin } from "../../utils/helper";
import { DefaultButton1 } from "../../components/button/defaul-button";
import { updateUser } from "../../middlewares/userLoginSlice";

const AccountPage = () => {
  useCheckLogin();
  const user = useSelector((state) => state.userLogin);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  
  
  let userSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    full_name: yup.string().required(),
    phone_number: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required(),
    address: yup.string().required(),
    date_of_birth: yup.string().required(),
    gender: yup.string().required(),
    profile_picture: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  function changeForm() {
    setEdit(false);
  }

  function handleOk(data: any) {
    if (!isValid) {
      console.log("Form is not valid");
      return;
    }


    editProfile(data);
  }

  async function editProfile(data: any) {
    try {
      const cloneUser = {
        id: user.id,
        is_active: user.is_active,
        is_admin: user.is_admin,
        cart: JSON.parse(user.cart),
        ...data,
      };

      await dispatch(updateUser(cloneUser)).unwrap();
      setEdit(false);
    } catch (e) {
      console.log(e);
    }
    changeForm();
  }

  // console.log(user.gender=='true');

  useEffect(() => {}, [user]);

  return (
    <>
      <NavBar />
      <div id="account">
        <div className="account__profile">
          <form onSubmit={handleSubmit(handleOk)}>
            <div className="account__image">
              <img src={user.profile_picture} alt="" />
            </div>

            <div className="form__container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                {...register("username")}
                id="username"
                readOnly={!edit}
                placeholder={user.name}
                defaultValue={user.username}
              />
              {errors.username && (
                <p className="error" id="user-error">
                  Username is required
                </p>
              )}
            </div>

            <div className="form__container">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                {...register("password")}
                id="password"
                readOnly={!edit}
                placeholder={user.password}
                defaultValue={user.password}
              />
              {errors.password && (
                <p className="error" id="password-error">
                  Password is required
                </p>
              )}
            </div>

            <div className="form__container">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                {...register("email")}
                id="email"
                readOnly={!edit}
                placeholder={user.email}
                defaultValue={user.email}
              />
              {errors.email && (
                <p className="error" id="email-error">
                  Email is required
                </p>
              )}
            </div>

            <div className="form__container">
              <label htmlFor="full-name">Full name</label>

              <input
                type="text"
                {...register("full_name")}
                placeholder={user.full_name}
                defaultValue={user.full_name}
                id="full-name"
                readOnly={!edit}
              />
              {errors.full_name && (
                <p className="error" id="name-error">
                  Name is required
                </p>
              )}
            </div>

            <div className="form__container">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                {...register("phone_number")}
                placeholder={user.phone_number}
                defaultValue={user.phone_number}
                id="phone"
                readOnly={!edit}
              />
              {errors.phone_number && (
                <p className="error" id="phone-error">
                  Phone is required and contain 10 digit number
                </p>
              )}
            </div>

            <div className="form__container">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                {...register("address")}
                placeholder={user.address}
                defaultValue={user.address}
                id="address"
                readOnly={!edit}
              />
              {errors.address && (
                <p className="error" id="address-error">
                  Address is required
                </p>
              )}
            </div>

            <div className="form__container">
              <label htmlFor="date-of-birth">Date Added</label>
              <input
                type="date"
                {...register("date_of_birth")}
                defaultValue={user.date_of_birth}
                id="date-of-birth"
                readOnly={!edit}
              />
              {errors.date_of_birth && (
                <p className="error" id="date-error">
                  Date is required
                </p>
              )}
            </div>

            <div className="form__container">
              <label>Gender</label>
              <div className="gender__form">
                <input
                  type="radio"
                  {...register("gender", { required: true })}
                  value="true"
                  id="male"
                  defaultChecked={user.gender == "true"}
                  checked
                  
                />
                <label className="gender__male" htmlFor="male">
                  Male
                </label>

                <input
                  type="radio"
                  {...register("gender", { required: true })}
                  value="false"
                  id="female"
                  defaultChecked={user.gender == "false"}
                  checked
                />
                <label className="gender__female" htmlFor="female">
                  Female
                </label>
              </div>
              {errors.gender && (
                <p className="error" id="gender-error">
                  Gender is required
                </p>
              )}
            </div>

            <div className="form__container">
              <label htmlFor="avatar">Avatar</label>
              <input
                type="text"
                {...register("profile_picture")}
                placeholder={user.profile_picture}
                defaultValue={user.profile_picture}
                id="avatar"
                readOnly={!edit}
              />
              {errors.profile_picture && (
                <p className="error" id="profile-error">
                  Profile picture is required
                </p>
              )}
            </div>

            {edit ? (
              <div className="account__update">
                <button
                  className="bg-sky-400 px-4 mr-4 py-2 rounded-lg"
                  type="submit"
                >
                  Update
                </button>
                <button
                  onClick={changeForm}
                  className="bg-sky-400 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="account__edit" onClick={() => setEdit(true)}>
                <DefaultButton1 content="Edit" />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
