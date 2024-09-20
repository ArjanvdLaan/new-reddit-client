// src/auth.js
import axios from 'axios';
import { Buffer } from 'buffer'; // Import Buffer from the 'buffer' module

// Environment variables
const CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_REDDIT_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDDIT_REDIRECT_URI;

// Use Buffer to encode client credentials for the Authorization header
const AUTHORIZATION_HEADER = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

// Function to generate the Reddit authorization URL
export const getRedditAuthUrl = () => {
  const scope = 'read'; // Define the scope of access you need
  const state = 'some_random_string'; // A random string to prevent CSRF attacks
  const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${REDIRECT_URI}&duration=temporary&scope=${scope}`;
  return authUrl;
};

// Function to exchange authorization code for an access token
export const getAccessToken = async (code) => {
  const tokenUrl = 'https://www.reddit.com/api/v1/access_token';

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
  });

  const headers = {
    'Authorization': AUTHORIZATION_HEADER,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.post(tokenUrl, params.toString(), { headers });
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error);
        // Log the request details for debugging
        console.log('Request Headers:', headers);
        console.log('Request Params:', params.toString());
  }
};
