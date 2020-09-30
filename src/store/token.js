const SET_TOKEN = 'SET_TOKEN';

export const setToken = token => ({ type: SET_TOKEN, token });

export const getToken = state => state.token;

const initialState = {
  token: '',
};

const tokenReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}

export default tokenReducer;