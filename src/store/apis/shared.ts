import axios from 'src/configs/axios-config'

export const logoutMeAPI = async () => axios.post(`/auth/logout`)
