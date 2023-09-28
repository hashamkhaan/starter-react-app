import axios from 'axios'

// import ClearCookies from './clearCookies'
// import { store } from 'src/store'
// import { logoutMe2 } from 'src/store/apps/users'

// import { useAuth } from 'src/hooks/useAuth'
// import { AuthContext } from 'src/context/AuthContext'

// const auth = useAuth()

// Set the base URL for all Axios requests
axios.defaults.baseURL = 'http://localhost:5000/api/'

// Enable sending cookies and other credentials in cross-origin requests
axios.defaults.withCredentials = true

axios.defaults.timeout = 120000

// axios.defaults.timeout = 12000000000

// Add a response interceptor to check for unauthorized status
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     const { response } = error
//     console.log('axios.interceptors Error', response)

//     if (error.response && error.response.status === 401) {
//       console.log('handleLogout Called')
//       console.log('handleLogout 2')

//       // console.log('AuthContext ', AuthContext)
//       store.dispatch(logoutMe2())

//       // console.log('useAuth ', useAuth())

//       // const { logout } = useAuth()

//       // console.log('useAuth ', useAuth())
//       // console.log('handleLogout ', handleLogout())

//       // logout()

//       // store.dispatch(setError('Unauthorized')); // Dispatch the error action for unauthorized requests
//     }
//     if (response && response.data.statusCode === 401) {
//       // window.location.href = '/login'
//       console.log('Inside 401', localStorage.getItem('accessToken'))
//       localStorage.removeItem('userData')
//       localStorage.removeItem('refreshToken')
//       localStorage.removeItem('accessToken')
//       document.cookie = 'user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
//       document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
//       document.cookie = 'NestJs_SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

//       // Unauthorized status received, log the user out or take appropriate action
//       // Example: Dispatch a logout action in Redux to clear user data
//       // auth.logout()
//       // ClearCookies()

//       // Redirect to the login page or perform any other action
//       // history.push('/login'); // Replace with your desired route
//     }

//     return Promise.reject(error)
//   }
// )
export default axios
