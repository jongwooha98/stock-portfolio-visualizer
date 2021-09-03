// Reducer
const initialState = {
  isLoggedIn: false,
  email: '',
  uid: '',
};
const authStatus = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {
        isLoggedIn: true,
        email: action.email,
        uid: action.uid,
      });
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};

export default authStatus;

// useSelector to access the state
