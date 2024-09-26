import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { getRedditAuthUrl, getAccessToken } from "./auth";
import axios from "axios";
import "./App.css";

const App = () => {
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  ); // Retrieve token from localStorage
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken); // Track authentication state
  const [page, setPage] = useState(1); // State to keep track of which page (batch) of posts we are on
  const [isLoading, setIsLoading] = useState(false); // State to track if the next set of posts is being loaded
  const loadMoreRef = useRef(null); // Ref for the "Load More" element
  const [after, setAfter] = useState(null); // State to keep track of the last post ID
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Check if the URL has a code parameter
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // Check if an access token exists in localStorage
    if (!accessToken && code) {
      console.log("Authorization Code Detected:", code);
      setAuthCode(code);
    } else if (!accessToken && !code) {
      console.log(
        "No Access Token or Authorization Code found. Redirecting to Reddit login..."
      );
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
          localStorage.removeItem("accessToken");
          window.location.href = getRedditAuthUrl(); // Re-initiate the login flow if token retrieval fails
        }
      });
    }
  }, [authCode]);

  // Function to fetch posts from Reddit API
  const fetchPosts = async (pageNum) => {
    console.log("Fetching posts for page:", pageNum); // Debug log
    if (!accessToken) return; // Exit if accessToken is not available
    try {
      setIsLoading(true); // Set loading state to true while fetching
      // Fetch 3 posts per batch based on the page number
      const response = await axios.get(
        `https://oauth.reddit.com/r/pics/hot?limit=3&raw_json=1${
          after ? `&after=${after}` : ""
        }`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // Append the new posts to the existing posts
      setPosts((prevPosts) => [...prevPosts, ...response.data.data.children]);
      // Update the 'after' parameter with the ID of the last post in the current batch
      setAfter(response.data.data.after);
      console.log("Posts Retrieved:", response.data.data.children);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      if (error.response?.status === 401) {
        // Handle expired or invalid token by clearing it and redirecting to reauthorize
        console.log("Access Token expired or invalid. Re-authorizing...");
        localStorage.removeItem("accessToken");
        setAccessToken(null);
        window.location.href = getRedditAuthUrl(); // Redirect to reauthorize
      }
    } finally {
      setIsLoading(false); // Set loading state to false once fetching is complete
    }
  };

  // Fetch posts when the component mounts or when the page changes
  useEffect(() => {
    console.log("Current Page:", page); // Log the current page number
    if (initialLoad) {
      setInitialLoad(false);
    } else {
      fetchPosts(page);
    }
  }, [page]);

  // Intersection Observer to detect when the "Load More" element comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1); // Increment page number to load the next batch
        }
      },
      { threshold: 1.0 } // Trigger when the element is fully in view
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isLoading]);

  // Display login button if no auth code or access token is available
  if (!authCode && !accessToken) {
    return (
      <div>
        <button onClick={() => (window.location.href = getRedditAuthUrl())}>
          Login with Reddit
        </button>
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
              <HomePage
                posts={posts}
                setPosts={setPosts}
                loadMoreRef={loadMoreRef}
                isLoading={isLoading}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              onClick={() => (window.location.href = getRedditAuthUrl())}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
