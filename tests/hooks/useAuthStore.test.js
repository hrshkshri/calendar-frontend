import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store';
import { defaultState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';

const getMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe('Tests on useAuthStore custom hook', () => {
  beforeEach(() => localStorage.clear());

  test('should return default props and functions', () => {
    const mockedStore = getMockStore(defaultState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockedStore}>{children}</Provider>,
    });

    expect(result.current).toEqual({
      ...defaultState,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test('should start login with startLogin', async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: {
        name: 'Test User',
        uid: expect.any(String),
      },
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token').length).toBeGreaterThan(1);
    expect(localStorage.getItem('token-init-time')).toEqual(expect.any(String));
  });

  test('startLogin should fail the authentication', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startLogin({ email: 'somebaduser@gmail.com', password: '9897654A' });
    });

    const { errorMessage, status, user } = result.current;

    expect(localStorage.getItem('token')).toBeNull();

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: 'not-authenticated',
      user: {},
    });

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });
});
