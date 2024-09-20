import React from "react";
import PostList from "./PostList";
import Search from "./Search";
import Title from "./Title";

const HomePage = ({ posts }) => {
  return (
    <div>
      <div>
        <h1>Reddit Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.data.id}>{post.data.title}</li>
          ))}
        </ul>
      </div>
      <Title />
      <Search />
      <PostList />
    </div>
  );
};

export default HomePage;
