import axios from 'axios';
import {API_ENDPOINT} from '../config'

class LoginService {
  login(data) {
    return axios.post(API_ENDPOINT + '/api/user/login', data)
  } 
}

const loginService = new LoginService()
export default loginService