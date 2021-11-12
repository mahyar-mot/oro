// import { createSlice } from "@reduxjs/toolkit";
// import {api} from "../../utils/api";
// import { success } from '../../utils/message';
// import {CATEGORIES_LIST, CATEGORIES_DETAIL} from "../../utils/constants";


// // Slice

// const initialState = {
//     category: {},
//     isLoading: false,
//     error: undefined,
// };


// const categoryUpdateSlice = createSlice({
//     name: "categoryUpdate",
//     initialState,
//     reducers: {
//         startLoading: state => {
//             state.isLoading = true;
//         },
//         hasError: (state, action) => {
//             state.error = action.payload;
//             state.isLoading = false;
//         },
//         updateCategory: (state, action) => {
//             state.category = action.payload;
//             state.isLoading = false
//         }
//     },
// });


// export default categoryUpdateSlice.reducer;


// // Actions


// const { startLoading, hasError, updateCategory } = categoryUpdateSlice.actions;


// export const categoryUpdate = (payload) => async dispatch => {
//     dispatch(startLoading());
//     try{
//         await api
//             .put(CATEGORIES_LIST, JSON.stringify(payload))
//             .then( response => {
//                 if (response.data.statusCode === 200){
//                     dispatch(updateCategory(response.data.data))
//                     success(response.data.message)
//                 }
//             });
//     }   catch (e){
//             console.error(e.message);
//             dispatch(hasError(e.message))
//     }
// }


// export const categoryDelete = (id) => async dispatch => {
//     dispatch(startLoading());
//     try{
//         await api
//             .delete(CATEGORIES_DETAIL(id))
//             .then( response => {
//                 if (response.data.statusCode === 200){
//                     dispatch(updateCategory({}))
//                     success(response.data.message)
//                 }
//             });
//     }   catch (e){
//             console.error(e.message);
//             dispatch(hasError(e.message))
//     }
// }
