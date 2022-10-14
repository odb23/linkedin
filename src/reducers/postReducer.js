import { SET_LOADING_STATUS, SET_POSTS } from "../actions/actionType";

const initialState = {
  loading: false,
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    case SET_POSTS: {
        console.log(action.posts)
      return {
        ...state,
        posts: action.posts,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
