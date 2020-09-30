import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-js-pagination';
import TodoList from '../todos';
import Loader from '../loader';
import { ProfileSearch } from './ProfileSearch';
import { ProfileAdd } from './ProfileAdd';
import { ProfileError } from './ProfileError';
import { ProfileHeader } from './ProfileHeader';
import { fetchTodos, searchTodos } from '../../store/todos';
import { setHasError } from '../../store/loading';
import * as selectors from '../../store';

export const Profile = ({ history }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectors.getToken);
  const hasError = useSelector(selectors.getHasError);
  const isLoading = useSelector(selectors.getIsLoading);
  const totalItems = useSelector(selectors.getTotalItems);
  const updateTodos = useSelector(selectors.getUpdateTodos);
  const queryStore = useSelector(selectors.getQueryStore);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if(queryStore) {
      dispatch(searchTodos(queryStore, token));
    } else if(token) {
      dispatch(fetchTodos(currentPage, token));
    } else {
      dispatch(setHasError(true));
    }
  }, [currentPage, updateTodos, token, queryStore]);

  if(hasError) {
    return (
      <ProfileError />
    )
  }

  return (
    <div className="container">
      {isLoading && <Loader />}
      <div className="profile">
        <ProfileHeader 
          history={history}
        />
        <ProfileAdd />
        <hr className='profile__hr'/>
        <ProfileSearch />
        {totalItems ? (
          <>
            <TodoList />
            <div>
              <Pagination
                activePage={currentPage}
                totalItemsCount={totalItems}
                itemsCountPerPage={10}
                onChange={(pageNumber) => setCurrentPage(pageNumber)}
                innerClass="pages"
                linkClass="pages__link"
                activeLinkClass="pages__link--active"
                prevPageText="&#8249;"
                nextPageText="&#8250;"
              />
            </div>
          </>
        ) : (
          <p className='profile__notodos'>No todos found</p>
        )}
      </div>
    </div>
  )
}