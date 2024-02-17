import { createSlice } from "@reduxjs/toolkit";

// const name = JSON.parse(localStorage.getItem("name"));
// const storedName = localStorage.getItem("name");
// console.log("Stored name from localStorage:", storedName)
// const name = storedName ? JSON.parse(storedName) : "";
const storedName = localStorage.getItem("name");
// console.log("Stored name from localStorage:", storedName);

let name = "";
if (storedName !== null) {
  try {
    name = JSON.parse(storedName);
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
  }
}


const initialState = {
  isLoggedIn: false,
  // name: name ? name : "",
  name: name,
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// // Retrieve name from localStorage
// const storedName = localStorage.getItem("name");
// console.log("Stored name from localStorage:", storedName);
// const name = storedName ? JSON.parse(storedName) : "";

// const initialState = {
//   isLoggedIn: false,
//   name: name,
//   user: {
//     name: "",
//     email: "",
//     phone: "",
//     bio: "",
//     photo: "",
//   },
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     SET_LOGIN(state, action) {
//       state.isLoggedIn = action.payload;
//     },
//     SET_NAME(state, action) {
//       localStorage.setItem("name", JSON.stringify(action.payload));
//       state.name = action.payload;
//     },
//     SET_USER(state, action) {
//       const profile = action.payload;
//       state.user.name = profile.name;
//       state.user.email = profile.email;
//       state.user.phone = profile.phone;
//       state.user.bio = profile.bio;
//       state.user.photo = profile.photo;
//     },
//   },
// });

// export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

// export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
// export const selectName = (state) => state.auth.name;
// export const selectUser = (state) => state.auth.user;

// export default authSlice.reducer;
