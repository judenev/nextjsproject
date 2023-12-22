 "use client"


 import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 type UserData = string | null;
 const data: UserData = typeof window !== 'undefined' ? localStorage.getItem('user') ?? '' : '';
 const parseData = data ? JSON.parse(data) : null;
 
 type AuthType = {
   username: string;
   token: string;
   verified: boolean;
   data: string | { token: null };
 };
 
 const initialState: AuthType = {
   username: 'empty',
   token: '',
   verified: false,
   data: parseData ?? { token: null },
 };
 
 const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
     setToken: (state, action: PayloadAction<string>) => {
       state.token = action.payload;
      
       localStorage.setItem('user', JSON.stringify(state.token));
     },
     removeToken: (state) => {
       state.token = '';
       state.verified = false;
      
       localStorage.removeItem('user');
     },
   },
 });
 
 export const { setToken, removeToken } = userSlice.actions;
 export default userSlice.reducer;
 





// import {createSlice,PayloadAction} from "@reduxjs/toolkit"
// // @ts-ignore
// type UserData = string | null; 
// const data:UserData =localStorage.getItem('user')??'';
// const parseData =data ?JSON.parse(data):null
// type initialState={
//     value :authType;
// }
// type authType={
//     username :String,
//     token:String,
//     verified:Boolean
//     data:String
// }

//  const initialState ={
//     username:'empty',
//     token:'',
//     verified:false,
//     data:parseData??{
//         token:null
//     }
    
//  }

// const User =createSlice({
//     name:'user',
//     initialState,
//     reducers:{
//         setToken:(sate,action:PayloadAction<string>)=>{
//             localStorage.setItem(
//                 'userData',
//                 JSON.stringify({
//                     token:action.payload
//                 })
//             )
         
//         },
//         removeToken:(state)=>{
//             state.data={
//                 token:''
//             },
//             state.verified=false
//         }

//     }

// })
// export const {setToken,removeToken}=User.actions
// export default User.reducer
