import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your backend API base URL

// Create an instance of axios with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add an interceptor to include the JWT token in the Authorization header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); // Get token from localStorage or another secure location
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Function to upload a video
export const uploadVideo = async (formData: FormData) => {
  try {
    const response = await api.post('/api/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

// Function to upload a module
export const uploadModule = async (formData: FormData) => {
  try {
    const response = await api.post('/api/modules', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading module:', error);
    throw error;
  }
};

// Function to get video details
export const getVideoDetails = async (videoId: string) => {
  try {
    const response = await api.get(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

// Function to get all videos
export const getAllVideos = async () => {
  try {
    const response = await api.get('/videos');
    return response.data;
  } catch (error) {
    console.error('Error fetching all videos:', error);
    throw error;
  }
};

