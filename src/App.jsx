import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { getRedditAuthUrl, getAccessToken } from "./auth";
import axios from "axios";
import "./App.css";

const App = () => {
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken')); // Retrieve token from localStorage
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken); // Track authentication state

  useEffect(() => {
    // Check if the URL has a code parameter
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // Check if an access token exists in localStorage
    if (!accessToken && code) {
      console.log('Authorization Code Detected:', code);
      setAuthCode(code);
    } else if (!accessToken && !code) {
      console.log('No Access Token or Authorization Code found. Redirecting to Reddit login...');
      window.location.href = getRedditAuthUrl(); // Trigger Reddit login only if necessary
    }
  }, [accessToken]);

  useEffect(() => {
    // Exchange the code for an access token
    if (authCode) {
      getAccessToken(authCode).then((token) => {
        if (token) {
          setAccessToken(token);
          setIsAuthenticated(true); // Mark as authenticated
        } else {
          // If accessToken is null, clear authCode and attempt login again
          setAuthCode(null);
          localStorage.removeItem('accessToken');
          window.location.href = getRedditAuthUrl(); // Re-initiate the login flow if token retrieval fails
        }
      });
    }
  }, [authCode]);

  useEffect(() => {
    // Fetch posts using the access token
    if (accessToken) {
      axios
        .get('https://oauth.reddit.com/r/pics?raw_json=1', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setPosts(response.data.data.children);
          console.log('Posts Retrieved:', response.data.data.children);
        })
        .catch((error) => {
          console.error('Failed to fetch posts:', error);
          if (error.response?.status === 401) {
            // Handle expired or invalid token by clearing it and redirecting to reauthorize
            console.log('Access Token expired or invalid. Re-authorizing...');
            localStorage.removeItem('accessToken');
            setAccessToken(null);
            window.location.href = getRedditAuthUrl(); // Redirect to reauthorize
          }
        });
    }
  }, [accessToken]);

  // Display login button if no auth code or access token is available
  if (!authCode && !accessToken) {
    return (
      <div>
        <button onClick={() => window.location.href = getRedditAuthUrl()}>Login with Reddit</button>
      </div>
    );
  }

  return (
<Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage posts={posts} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage onClick={() => (window.location.href = getRedditAuthUrl())} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
