import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

interface AuthCredentials {
  username: string;
  password: string;
}

export const signin = async (credentials: AuthCredentials) => {
  try {
    console.log("Sending credentials: ", credentials);
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (credentials: AuthCredentials) => {
  try {
    console.log("Sending credentials: ", credentials);
    const response = await axios.post(`${BASE_URL}/register`, credentials);
    return response.data;

  } catch (error) {
    throw error;
  }
}
