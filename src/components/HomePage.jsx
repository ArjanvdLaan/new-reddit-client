import React from "react";
import PostList from "./PostList";
import Search from "./Search";
import Title from "./Title";
import LoadingPlaceholder from "./LoadingPlaceholder";
import { extractMediaUrl, calculateHoursSincePost } from "../utils";
import "./CSS/HomePage.css";

const HomePage = ({ posts, setPosts, loadMoreRef, isLoading }) => {
  return (
    <div>
      <div>
        <h1>Reddit Posts</h1>
        <ul>
          {posts.map((post) => {
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
                    {/* {console.log("Post Preview Data:", post.data.preview)} */}

                    <img
                      src={mediaUrl}
                      alt="Post Preview"
                      style={{ maxWidth: "100%" }}
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
        {/* This element is observed to trigger loading more posts */}
        <div
          ref={loadMoreRef}
          style={{ height: "100px", width: "100px", backgroundColor: "black" }}
        >
        {/* Show loading placeholders while fetching new posts */}
        {isLoading && (
          <>
            <LoadingPlaceholder />
            <LoadingPlaceholder />
            <LoadingPlaceholder />
          </>
        )}
        </div>
      </div>
      <Title />
      <Search />
      <PostList />
    </div>
  );
};

export default HomePage;
