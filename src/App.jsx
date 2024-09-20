import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { getRedditAuthUrl, getAccessToken } from "./auth";
import axios from "axios";
import "./App.css";

const App = () => {
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      setAuthCode(code);
    }
  }, []);

  useEffect(() => {
    if (authCode) {
      getAccessToken(authCode).then((token) => {
        setAccessToken(token);
      });
    }
  }, [authCode]);

  useEffect(() => {
    if (accessToken) {
      axios
        .get("https://oauth.reddit.com/r/reactjs/hot", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setPosts(response.data.data.children);
        })
        .catch((error) => {
          console.error("Failed to fetch posts:", error);
        });
    }
  }, [accessToken]);

  if (!authCode) {
    return (
      <div>
        <button onClick={() => (window.location.href = getRedditAuthUrl())}>
          Login with Reddit
        </button>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/">
            {authCode ? (
              <HomePage posts={posts} />
            ) : (
              <LoginPage
                onClick={() => (window.location.href = getRedditAuthUrl())}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
