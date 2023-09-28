import axios from 'src/configs/axios-config'

export const getCitiesDropdownAPI = async () => axios.get(`/branches/citiesDropdown`)
