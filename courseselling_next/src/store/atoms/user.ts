import {atom} from "recoil";

export const userState=atom({
    key:"courseState",
    default:{
        userLoading:true,
        username:null
    }
})