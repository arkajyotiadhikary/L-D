/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

// const BASE_URL = "https://lizmotor.onrender.com";
const BASE_URL = "http://localhost:8000";

interface AuthCredentials {
      email: string;
      password: string;
}

export const signin = async (
      credentials: AuthCredentials
): Promise<{ token: string; user: any }> => {
      try {
            console.log("Sending credentials: ", credentials);
            const response = await axios.post(`${BASE_URL}/login`, credentials);
            console.log("Response: ", response.data);
            return response.data;
      } catch (error) {
            const err = error as { response: { data: { message: string } } };
            const message = err.response?.data?.message || "An error occurred during login.";
            throw new Error(message);
      }
};

export const signup = async (credentials: AuthCredentials) => {
      try {
            console.log("Sending credentials: ", credentials);
            const response = await axios.post(`${BASE_URL}/register`, credentials);
            return response.data;
      } catch (error) {
            const err = error as { response: { data: { message: string } } };
            const message = err.response?.data?.message || "An error occurred during signup.";
            throw new Error(message);
      }
};

export const getUser = async (userId: string) => {
      try {
            const response = await axios.get(`${BASE_URL}/users/${userId}`);
            return response.data;
      } catch (error) {
            throw new Error("Failed to fetch user details.");
      }
};

export const updateUser = async (userId: string, userDetails: any) => {
      try {
            const response = await axios.put(`${BASE_URL}/users/${userId}`, userDetails);
            return response.data;
      } catch (error) {
            throw new Error("Failed to update user details.");
      }
};

export const deleteUser = async (userId: string) => {
      try {
            const response = await axios.delete(`${BASE_URL}/users/${userId}`);
            return response.data;
      } catch (error) {
            throw new Error("Failed to delete user.");
      }
};
