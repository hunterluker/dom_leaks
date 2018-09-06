const initialState = {
  post: {}
};

const ADD_POST = 'ADD_POST';

export function addPost(post) {
  return {
    type: ADD_POST,
    payload: post
  };
}

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return Object.assign({}, state, { user: action.payload });

    default:
      return state;
  }
}
