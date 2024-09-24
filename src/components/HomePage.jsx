import React from "react";
import PostList from "./PostList";
import Search from "./Search";
import Title from "./Title";
import { extractMediaUrl, calculateHoursSincePost } from "../utils";
import "./CSS/HomePage.css";

const HomePage = ({ posts }) => {
  return (
    <div>
      <div>
        <h1>Reddit Posts</h1>
        <ul>
          {posts.slice(0, 3).map((post) => {
            const mediaUrl = extractMediaUrl(post); // Get the media URL or fallback image
            const author = post.data.author; // Access the author's username
            const hoursSincePost = calculateHoursSincePost(
              post.data.created_utc
            ); // Calculate hours since posting
            const numComments = post.data.num_comments; // Access the number of comments
            const upvotes = post.data.ups; // Access the number of upvotes
            return (
              <React.Fragment key={post.data.id}>
                <div className="post">
                  <li className="title" key={post.data.id}>
                    {post.data.title}
                  </li>
                  <li className="upvotes">{upvotes} upvotes</li>
                  <a
                    href={post.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image"
                  >
                    {console.log("Post Preview Data:", post.data.preview)}

                    <img
                      src={mediaUrl}
                      alt="Post Preview"
                      style={{ maxWidth: "100%", height: "auto" }} // Optional styling for better display
                    />
                  </a>
                  <li className="info">
                    <p>
                      Posted by {author} • {hoursSincePost} hours ago •{" "}
                      {numComments} comments
                    </p>
                  </li>
                </div>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
      <Title />
      <Search />
      <PostList />
    </div>
  );
};

export default HomePage;
