const initialState = {
  date: '',
  image: '',
  title: '',
  description: ''
};

const UPDATE_LEAK = 'UPDATE_LEAK';

export function updateLeak(leak) {
  return {
    type: UPDATE_LEAK,
    payload: leak
  };
}

export default function leaksReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LEAK:
      return Object.assign({}, state, { leak: action.payload });

    default:
      return state;
  }
}
