import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tokenReducer from './token';
import loadingReducer from './loading';
import todosReducer from './todos';
import * as selectorsToken from './token';
import * as selectorsLoading from './loading';
import * as selectorsTodos from './todos';

export const getToken = state => selectorsToken.getToken(state.token);
export const getIsLoading = state => selectorsLoading.getIsLoading(state.loading);
export const getHasError = state => selectorsLoading.getHasError(state.loading);
export const getTodos = state => selectorsTodos.getTodos(state.todos);
export const getTotalItems = state => selectorsTodos.getTotalItems(state.todos);
export const getUpdateTodos = state => selectorsTodos.getUpdateTodos(state.todos);
export const getQueryStore = state => selectorsTodos.getQueryStore(state.todos);

const rootReducer = combineReducers({
  token: tokenReducer,
  loading: loadingReducer,
  todos: todosReducer,
});

const persistedState = JSON.parse(localStorage.getItem('reduxState')) || {};

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)
)

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store;