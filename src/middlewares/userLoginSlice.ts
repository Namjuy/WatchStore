import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUser } from "../axios-instance";
import { v4 as uuidv4 } from "uuid";
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
export const login = createAsyncThunk("login", async (data: User) => {
  const response = await apiUser.get(
    `/users?username=${data.username}&&password=${data.password}`
  );
  console.log(response);

  return response.data;
});

export const addToCart = createAsyncThunk("addToCart", async (data: User) => {
  const response = await apiUser.put(`/users/${data.id}`, {
    username: data.username,
    password: data.password,
    email: data.email,
    full_name: data.full_name,
    address: data.address,
    phone_number: data.phone_number,
    date_of_birth: data.date_of_birth,
    gender: data.gender,
    is_active: data.is_active,
    is_admin: data.is_admin,
    profile_picture: data.profile_picture,
    cart: data.cart,
  });
  console.log(response);

  return response.data;
});
export const updateUserCart = createAsyncThunk(
  "users/addUserCart",
  async (data: User) => {
    const response = await apiUser.put(`/users/${data.id}`, {
      username: data.username,
      password: data.password,
      email: data.email,
      full_name: data.full_name,
      address: data.address,
      phone_number: data.phone_number,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      is_active: data.is_active,
      is_admin: data.is_admin,
      profile_picture: data.profile_picture,
      cart: data.cart,
    });
    return response.data;
  }
);

// export const updateRemovedUserCart = createAsyncThunk("users/addUser", async (data: User) => {

//   const response = await apiUser.put(`/users/${data.id}`, {
//     username: data.username,
//     password: data.password,
//     email: data.email,
//     full_name: data.full_name,
//     address: data.address,
//     phone_number: data.phone_number,
//     date_of_birth: data.date_of_birth,
//     gender: data.gender,
//     is_active: data.is_active,
//     is_admin: data.is_admin,
//     profile_picture: data.profile_picture,
//     cart: [],
//   });
//   return response.data;
// });

export const signUp = createAsyncThunk("users/addUser", async (data: User) => {
  const userId = uuidv4();
  const response = await apiUser.post("/users", {
    id: userId,
    username: data.username,
    password: data.password,
    email: data.email,
    full_name: data.full_name,
    address: data.address,
    phone_number: data.phone_number,
    date_of_birth: data.date_of_birth,
    gender: data.gender,
    is_active: data.is_active,
    is_admin: data.is_admin,
    profile_picture: data.profile_picture,
    cart: [],
  });
  return response.data;
});

export const updateUser = createAsyncThunk(
  "user/update",
  async (data: User) => {
    const response = await apiUser.put(`/users/${data.id}`, {
      username: data.username,
      password: data.password,
      email: data.email,
      full_name: data.full_name,
      address: data.address,
      phone_number: data.phone_number,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      is_active: data.is_active,
      is_admin: data.is_admin,
      profile_picture: data.profile_picture,
      cart: data.cart,
    });
    return response.data;
  }
);

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    id: "",
    username: "",
    password: "",
    email: "",
    full_name: "",
    address: "",
    phone_number: "",
    date_of_birth: "",
    gender: null,
    is_active: null,
    is_admin: null,
    profile_picture: "",
    cart: [],
    isLoginSuccess: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.email = action.payload.email;
      state.full_name = action.payload.full_name;
      state.address = action.payload.address;
      state.phone_number = action.payload.phone_number;
      state.date_of_birth = action.payload.date_of_birth;
      state.gender = action.payload.gender;
      state.is_active = action.payload.is_active;
      state.is_admin = action.payload.is_admin;
      state.profile_picture = action.payload.profile_picture;
      state.cart = action.payload.cart;
      state.isLoginSuccess = true;
    },
    logout: (state) => {
      state.isLoginSuccess = false;
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("email");
      localStorage.removeItem("full_name");
      localStorage.removeItem("address");
      localStorage.removeItem("phone_number");
      localStorage.removeItem("date_of_birth");
      localStorage.removeItem("gender");
      localStorage.removeItem("is_active");
      localStorage.removeItem("is_admin");
      localStorage.removeItem("profile_picture");
      localStorage.removeItem("cart");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.id = action.payload[0].id;
          state.username = action.payload[0].username;
          state.password = action.payload[0].password;
          state.email = action.payload[0].email;
          state.full_name = action.payload[0].full_name;
          state.address = action.payload[0].address;
          state.phone_number = action.payload[0].phone_number;
          state.date_of_birth = action.payload[0].date_of_birth;
          state.gender = action.payload[0].gender;
          state.is_active = action.payload[0].is_active;
          state.is_admin = action.payload[0].is_admin;
          state.profile_picture = action.payload[0].profile_picture;
          state.cart = action.payload[0].cart;
          state.isLoginSuccess = true;

          localStorage.setItem("id", action.payload[0].id);
          localStorage.setItem("username", action.payload[0].username);
          localStorage.setItem("password", action.payload[0].password);
          localStorage.setItem("email", action.payload[0].email);
          localStorage.setItem("full_name", action.payload[0].full_name);
          localStorage.setItem("address", action.payload[0].address);
          localStorage.setItem("phone_number", action.payload[0].phone_number);
          localStorage.setItem(
            "date_of_birth",
            action.payload[0].date_of_birth
          );
          localStorage.setItem("gender", action.payload[0].gender);
          localStorage.setItem("is_active", action.payload[0].is_active);
          localStorage.setItem("is_admin", action.payload[0].is_admin);
          localStorage.setItem(
            "profile_picture",
            action.payload[0].profile_picture
          );
          localStorage.setItem("cart", JSON.stringify(action.payload[0].cart));
        } else {
          state.isLoginSuccess = false;
        }
      })
      .addCase(signUp.fulfilled, (state, action) => {})
      .addCase(updateUserCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        localStorage.setItem("cart", JSON.stringify(action.payload.cart));
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.password = action.payload.password;
        state.email = action.payload.email;
        state.full_name = action.payload.full_name;
        state.address = action.payload.address;
        state.phone_number = action.payload.phone_number;
        state.date_of_birth = action.payload.date_of_birth;
        state.gender = action.payload.gender;
        state.is_active = action.payload.is_active;
        state.is_admin = action.payload.is_admin;
        state.profile_picture = action.payload.profile_picture;
        state.cart = action.payload.cart;
        state.isLoginSuccess = true;

        localStorage.setItem("id", action.payload.id);
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("password", action.payload.password);
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("full_name", action.payload.full_name);
        localStorage.setItem("address", action.payload.address);
        localStorage.setItem("phone_number", action.payload.phone_number);
        localStorage.setItem("date_of_birth", action.payload.date_of_birth);
        localStorage.setItem("gender", action.payload.gender);
        localStorage.setItem("is_active", action.payload.is_active);
        localStorage.setItem("is_admin", action.payload.is_admin);
        localStorage.setItem("profile_picture", action.payload.profile_picture);
        localStorage.setItem("cart", JSON.stringify(action.payload.cart));
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        localStorage.setItem("cart", JSON.stringify(action.payload.cart));
      });
  },
});

export const { loginSuccess, logout } = userLoginSlice.actions;
export default userLoginSlice.reducer;
