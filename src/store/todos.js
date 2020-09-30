import axios from 'axios';
import { setIsLoading, setHasError } from './loading';
import { prefix, URL } from '../api';

const SET_TODOS = 'SET_TOODS';
const SET_TOTAL_ITEMS = 'SET_TOTAL_ITEMS';
const SET_UPDATE_TODOS = 'SET_UPDATE_TODOS';
const SET_QUERY_STORE = 'SET_QUERY_STORE';

export const setTodos = todos => ({ type: SET_TODOS, todos });
export const setTotalItems = value => ({ type: SET_TOTAL_ITEMS, value });
export const setUpdateTodos = updated_at => ({ type: SET_UPDATE_TODOS, updated_at });
export const setQueryStore = query => ({ type: SET_QUERY_STORE, query });

export const fetchTodos = (page, token) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const res = await axios({ 
        method: 'GET',
        url: `${prefix}/${URL}/todo/?page=${page}`,
        headers: {
          'Authorization': 'Token ' + token,
        },
      });
      dispatch(setTodos(res.data.results));
      dispatch(setTotalItems(res.data.count));
    } catch(error) {
      dispatch(setHasError(true));
    }

    dispatch(setIsLoading(false));
  }
}

export const searchTodos = (query, token) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const res = await axios({ 
        method: 'GET',
        url: `${prefix}/${URL}/todo/?search=${query}`,
        headers: {
          'Authorization': 'Token ' + token,
        },
      });
      dispatch(setTodos(res.data.results));
      dispatch(setTotalItems(res.data.count));
    } catch(error) {
      dispatch(setHasError(true));
    }

    dispatch(setIsLoading(false));
  }
}

export const getTodos = state => state.todos;
export const getTotalItems = state => state.totalItems;
export const getUpdateTodos = state => state.updateTodos;
export const getQueryStore = state => state.query;

const initialState = {
  todos: [],
  query: '',
  totalItems: 0,
  updateTodos: 0,
}

const todosReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.value,
      };
    case SET_UPDATE_TODOS:
      return {
        ...state,
        updateTodos: action.updated_at,
      };
    case SET_QUERY_STORE:
      return {
        ...state,
        query: action.query, 
      };
    default:
      return state;
  }
}

export default todosReducer;