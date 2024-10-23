import calendarApi from '../../src/api/calendarApi';

describe('Tests calendar api', () => {
  const testBaseURL = process.env.VITE_API_URL;

  test('BaseUrl should exist and be string', () => {
    expect(calendarApi.defaults.baseURL).toBe(testBaseURL);
    expect(typeof calendarApi.defaults.baseURL).toBe('string');
  });

  test('Request should have x-token header', async () => {
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    localStorage.setItem('token', testToken);

    const res = await calendarApi.post(`/auth/login`, {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASS,
    });

    // console.log(res);

    expect(res.config.headers['x-token']).toBe(testToken);
  });
});
