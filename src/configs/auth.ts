export default {
  meEndpoint: 'users/me',
  loginEndpoint: 'auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  meEndpoint2: '/auth/me',
  loginEndpoint2: 'http://localhost:5000/api/auth/login',
  registerEndpoint2: '/jwt/register',
  storageTokenKeyName2: 'accessToken',
  onTokenExpiration2: 'refreshToken' // logout | refreshToken
}
