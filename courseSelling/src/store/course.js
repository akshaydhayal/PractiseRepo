import { atom } from "recoil";

export const courseState=atom({
    key:"courseState",
    default:{
        course:null,
        isLoading:true,
    }
});