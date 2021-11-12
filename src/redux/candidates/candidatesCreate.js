// import { createSlice } from "@reduxjs/toolkit";
// import {api} from "../../utils/api";
// import { success } from '../../utils/message';
// import {COMPLAINTS_CREATE} from "../../utils/constants";


// // Slice

// const initialState = {
//     complaint: {},
//     isLoading: false,
//     error: undefined,
// };


// const complaintsCreateSlice = createSlice({
//     name: "complaintCreate",
//     initialState,
//     reducers: {
//         startLoading: state => {
//             state.isLoading = true;
//         },
//         hasError: (state, action) => {
//             state.error = action.payload;
//             state.isLoading = false;
//         },
//         setComplaint: (state, action) => {
//             state.complaint = action.payload;
//             state.isLoading = false
//         },
//     },
// });


// export default complaintsCreateSlice.reducer;


// // Actions


// const { startLoading, hasError, setComplaint } = complaintsCreateSlice.actions;


// export const createComplaint = (payload) => async dispatch => {
//     dispatch(startLoading());
//     try{
//         await api
//             .post(COMPLAINTS_CREATE, JSON.stringify(payload))
//             .then( response => {
//                 if (response.data.statusCode === 200){
//                     dispatch(setComplaint(response.data.data))
//                     success(response.data.message)
//                 }
//             });
//     }   catch (e){
//             console.error(e.message);
//             dispatch(hasError(e.message))
//     }

// }


// export const cleanComplaint = () => async dispatch => {
//     dispatch(setComplaint({}))
// }