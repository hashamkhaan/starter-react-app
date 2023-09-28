// import Cookies from 'js-cookie'

// const ClearCookies = async () => {
//   Cookies.remove('userToken')
//   Cookies.remove('name')
//   Cookies.remove('role_name')
//   Cookies.remove('role_id')

//   localStorage.removeItem('userData')
//   localStorage.removeItem('refreshToken')
//   localStorage.removeItem('accessToken')
// }
// export default ClearCookies

import { useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'

function ClearCookieComponent() {
  // const auth = useAuth()
  const { logout } = useAuth()

  useEffect(() => {
    console.log('ClearCookieComponent', auth)

    // Function to clear the 'user_token' cookie
    const clearCookie = () => {
      logout()
      localStorage.removeItem('userData')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')

      document.cookie = 'user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'NestJs_SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

      console.log('ClearCookieComponent', auth)
    }

    // Call the clearCookie function to remove the cookie when the component mounts
    clearCookie()
  }, [logout])

  return null
}

export default ClearCookieComponent
