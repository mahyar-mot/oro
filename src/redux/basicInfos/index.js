import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {BASIC_INFORMATION} from '../../utils/constants';


// Slice


const initialState = {
    userType: [],
    gender: [],
    education: [],
    status: [],
    assignmentPlace: [],
    assignmentTitle: [],
    countryDivisionLevel: [],
    apiHasCalled: false,
    candidateStatus: [],
    complaintStatus: [],
    stateList: [],
    protestStatus: [],
    marriage: [],
    branchReligion: [],
    violationState:[],
    sortUserProfile: [],
    ticketStateType: [],
    fileStateType: [],
    inspectorAssignmentTitle: [],
    supervisorPostType: [],
    roleDisplayNameType: [],
    branchType: [],
    nazerType: [],
    havingBranchType: [],
    havingSupervisorType: [],
    havingHeadSupervisorType: [],
    proceedingType: [],
};


const basicInfoSlice = createSlice({
    name: "basicInfo",
    initialState,
    reducers: {
        setBasicInfo: (state, action) => {
            state.userType = action.payload.userType
            state.gender = action.payload.gender
            state.education = action.payload.education
            state.status = action.payload.status
            state.assignmentPlace = action.payload.assignmentPlace
            state.assignmentTitle = action.payload.assignmentTitle
            state.countryDivisionLevel = action.payload.countryDivisionLevel
            state.complaintStatus = action.payload.complaintStatus
            state.candidateStatus = action.payload.candidateStatus
            state.stateList = action.payload.state
            state.protestStatus = action.payload.protestStatus
            state.marriage = action.payload.marriage
            state.branchReligion = action.payload.branchReligion
            state.violationState = action.payload.violationState
            state.sortUserProfile = action.payload.sortUserProfile
            state.ticketStateType = action.payload.ticketStateType
            state.fileStateType = action.payload.fileStateType
            state.inspectorAssignmentTitle = action.payload.inspectorAssignmentTitle
            state.supervisorPostType = action.payload.supervisorPostType
            state.roleDisplayNameType = action.payload.roleDisplayNameType
            state.branchType = action.payload.branchType
            state.nazerType = action.payload.nazerType
            state.havingBranchType = action.payload.havingBranchType
            state.havingSupervisorType = action.payload.havingSupervisorType
            state.havingHeadSupervisorType = action.payload.havingHeadSupervisorType
            state.proceedingType = action.payload.proceedingType
            state.apiHasCalled = true
        }
    },
});


export default basicInfoSlice.reducer;


// Actions

const { setBasicInfo } = basicInfoSlice.actions;



export const getBasicInfo = () => async dispatch => {
    try{
        await api
            .get(BASIC_INFORMATION)
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setBasicInfo(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            // dispatch(hasError(e.message))
    }
}
