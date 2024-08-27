import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

interface AuthCredentials {
  username: string;
  password: string;
}

export const signin = async (credentials: AuthCredentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/signin`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (credentials: AuthCredentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, credentials);
    return response.data;

  } catch (error) {
    throw error;
  }
}
