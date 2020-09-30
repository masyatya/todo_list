const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_HAS_ERROR = 'SET_HAS_ERROR';

export const setIsLoading = value => ({ type: SET_IS_LOADING, value });
export const setHasError = value => ({ type: SET_HAS_ERROR, value });

export const getIsLoading = state => state.isLoading;
export const getHasError = state => state.hasError;

const initialState = {
  isLoading: false,
  hasError: false,
}

const loadingReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case SET_HAS_ERROR:
      return {
        ...state,
        hasError: action.value,
      };
    default:
      return state;
  }
}

export default loadingReducer;