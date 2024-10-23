import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { checking, clearErrorMessage, login, logout } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(checking());

    try {
      const resp = await calendarApi.post('/auth/login', { email, password });
      const data = resp.data;

      localStorage.setItem('token', data.token);
      // time when token was generated:
      localStorage.setItem('token-init-time', new Date().getTime());

      dispatch(login({ name: data.name, uid: data.uid }));
      //
    } catch (error) {
      dispatch(logout('Incorrect credentials'));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(checking());

    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password });

      localStorage.setItem('token', data.token);
      // time when token was generated:
      localStorage.setItem('token-init-time', new Date().getTime());

      dispatch(login({ name: data.name, uid: data.uid }));
      //
    } catch (error) {
      const { data } = error.response;

      if (data.msg) {
        dispatch(logout(data.msg));
      } else {
        const { msg } = Object.values(data.errors)[0];
        // console.log(Object.values(data.errors));
        dispatch(logout(msg));
      }

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Functions
    startLogin,
    startRegister,
  };
};
