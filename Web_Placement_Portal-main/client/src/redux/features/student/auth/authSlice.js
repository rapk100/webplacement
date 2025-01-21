import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  isLoggedIn: false,
  student: null,
  students: [],
  isSuccess: false,
  isLoading: false,
  message: "",
  isError : ""
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      return  await authService.signup(userData);   
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
          // console.log("message" , message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin' , 
  async (userData , thunkAPI) => {
    try {
      return await authService.signin(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
          // console.log("message" , message);
      return thunkAPI.rejectWithValue(message);
    }
  }
)



export const signout = createAsyncThunk(
  'auth/signout' , 
  async (_ , thunkAPI) => {
    try {
      return await authService.signout()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
          // console.log("message" , message);
      return thunkAPI.rejectWithValue(message);
    }
  }
)
export const updateProfileDetail = createAsyncThunk(
  'auth/updateProfileDetail' , 
  async (userData , thunkAPI) => {
    try {
      return await authService.updateProfileDetail(userData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getUserData = createAsyncThunk(
  'auth/getUserData' , 
  async (_ , thunkAPI) => {
    try {
      return await authService.getUserData()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: "studentAuth",
  initialState,
  reducers: {
    RESET(state) {
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.students = []
      state.student = null
      state.isError = "" 
    },
    // SET()
  },
  extraReducers : (builder) => {
    builder
    .addCase(signup.pending , (state , action) => {
        state.isLoading = true;
    })
    .addCase(signup.fulfilled , (state , action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true ; 
        // state.student = action.payload
        // state.students.push(action.payload)
        state.message = action.payload.message;
        // console.log("signup fullfilled student" , action.payload);

        
    })
    .addCase(signup.rejected , (state , action) => {
        state.isLoading = false;
        state.isError =true;
        // state.student = null;
        // console.log("rejected" , action);
        state.message = action.payload;
    })

    // signin
    .addCase(signin.pending , (state , action )=> {
      state.isLoading = true;
    })
    .addCase(signin.fulfilled , (state , action) => {
      state.isLoading = false;
      // state.student = action.payload
      // state.students.push({...action.payload})
      state.isLoggedIn = true;
      state.isSuccess = true
      state.message = action.payload.message;
    })
    .addCase(signin.rejected , (state , action) => {
      state.isLoading = false;
      state.isError =true;
      state.message = action.payload
      // console.log("rejected" , action.payload);
    })

    // signout
    .addCase(signout.pending , (state , action )=> {
      state.isLoading = true;
    })
    .addCase(signout.fulfilled , (state , action) => {
      state.isLoading = false;
      // state.student = action.payload
      // state.students.push({...action.payload})
      state.isLoggedIn = false;
      state.isSuccess = true
      // console.log(action.payload);
      // state.message = action.payload;
    })
    .addCase(signout.rejected , (state , action) => {
      state.isLoading = false;
      state.isError =true;
      state.student = null;
      // console.log("rejected" , action); 
      state.message = action.payload.response.data.message;
      
    })
    
    // updateProfileDetail
    .addCase(updateProfileDetail.pending , (state , action )=> {
      state.isLoading = true;
    })
    .addCase(updateProfileDetail.fulfilled , (state , action) => {
      state.isLoading = false;
      // state.student = action.payload
      // state.students.push({...action.payload})
      state.isLoggedIn = true;
      state.isSuccess = true
      // console.log("update from authslice" , action.payload);
      state.message = action.payload.message;
    })
    .addCase(updateProfileDetail.rejected , (state , action) => {
      state.isLoading = false;
      state.isError =true;
      state.student = null;
      // console.log("rejected" , action);
      state.message = action.payload.message;
      state.statusCode = action.payload.response.status
    })

    // getUserData
    .addCase(getUserData.pending , (state , action )=> {
      state.isLoading = true;
    })
    .addCase(getUserData.fulfilled , (state , action) => {
      state.isLoading = false;
      state.student = action.payload.message
      // state.students.push(action.payload.message) // don't mutate state directly
      state.students = [...state.students , action.payload.message]
      state.isLoggedIn = true;
      state.isSuccess = true
      // console.log("action.payload" , action.payload);
      state.message = "Data Fetched Successfully";
    })
    .addCase(getUserData.rejected , (state , action) => {
      state.isLoading = false;
      state.isError =true;
      state.student = null;
      // console.log("rejected" , action);
      state.message = action.payload.response?.data.message;
      state.statusCode = action.payload.response.status
    })
  }
});

export const { RESET } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;