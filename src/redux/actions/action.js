// Action
// useDispatch to make them reality
// const LOG_IN = 'LOG_IN';
// const LOG_OUT = 'LOG_IN';
export const login = (email, uid) => {
  return {
    type: 'LOG_IN',
    email: email,
    uid: uid,
  };
};
export const logout = () => {
  return {
    type: 'LOG_OUT',
  };
};
