import axios from 'axios';

export const BASE_URL = 'http://ec2-18-219-246-237.us-east-2.compute.amazonaws.com:7778';
export const URL = 'http://ec2-18-219-246-237.us-east-2.compute.amazonaws.com:7778/api/v1';
export const prefix = 'https://cors-anywhere.herokuapp.com';

export const fetchEditTodo = (newTodo, id, token) => {
  const res = axios({ 
    method: 'PATCH',
    url: `${prefix}/${URL}/todo/${id}/`,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: newTodo,
  });

  return res;
};

export const fetchAddTodo = (todo, token) => {
  const res = axios({ 
    method: 'POST',
    url: `${prefix}/${URL}/todo/`,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: todo,
  });

  return res;
}

export const fetchToken = (username, password) => {
  const res = axios({ 
    method: 'POST',
    url: `${prefix}/${BASE_URL}/api-token-auth/`,
    data: { username, password }
  });

  return res;
}

export const fetchRegister = (user) => {
  const res = axios({
    method: 'POST',
    url: `${prefix}/${URL}/users/`,
    data: user,
  });

  return res;
}