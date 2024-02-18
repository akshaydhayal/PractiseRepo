import { selector } from "recoil";
import { courseState } from "../course.js";

export const courseLoading = selector({
  key: "courseLoading",
  get: (getter) => {
    const state = getter.get(courseState);
    return state.isLoading;
  },
});

export const courseDetails = selector({
  key: "courseDetails",
  get: ({ get }) => {
    const state = get(courseState);
    return state.course;
  },
});

export const courseTitle = selector({
  key: "courseTitle",
  get: (getter) => {
    const coursestate = getter.get(courseState);
    if (coursestate.course) {
      return coursestate.course.title;
    }
    return "";
  },
});

export const coursePrice=selector({
  key:"coursePrice",
  get:(getter)=>{
    const state=getter.get(courseState);
    if(state.course){
      return state.course.price;
    }
    return 0;
  }
});

export const courseImageLink=selector({
  key:"courseImageLink",
  get:({get})=>{
    const state=get(courseState);
    if(state.course){
      return state.course.imageLink;
    }
    return "";
  }
})