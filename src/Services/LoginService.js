import axios from 'axios';
import { API_ENDPOINT } from '../config'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

class LoginService {
  login(data) {
    return axios.post(API_ENDPOINT + '/api/user/login', data)
  }
  getProfile(config) {
    return axios.get(API_ENDPOINT + '/api/user/' + cookies.get("userId"), config)
  }
}

const loginService = new LoginService()
export default loginService