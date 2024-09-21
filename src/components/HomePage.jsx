import React from "react";
import PostList from "./PostList";
import Search from "./Search";
import Title from "./Title";
import { extractMediaUrl } from "../utils";

const HomePage = ({ posts }) => {
  return (
    <div>
      <div>
        <h1>Reddit Posts</h1>
        <ul>
          {posts.slice(0, 10).map(
            (post) => (
              console.log(post),
              (
                <>
                  <li key={post.data.id}>{post.data.title}</li>
                  <a
                    href={post.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* {console.log('Image URL:', post.data.preview?.images?.[0]?.source?.url)} */}
                    {console.log('Post Preview Data:', post.data.preview)}
                    {console.log('Thumbnail URL:', post.data.thumbnail)}
                    {console.log('Image URL:', post.data.preview?.images?.[0]?.source?.url)}

                    <img
                      src={ extractMediaUrl(post) }
                      alt="Post Preview"
                      style={{ maxWidth: "100%", height: "auto" }} // Optional styling for better display
                    />
                  </a>
                </>
              )
            )
          )}
        </ul>
      </div>
      <Title />
      <Search />
      <PostList />
    </div>
  );
};

export default HomePage;
