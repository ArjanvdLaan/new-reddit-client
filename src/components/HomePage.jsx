import React from "react";
import PostList from "./PostList";
import Search from "./Search";
import Title from "./Title";
import Vote from "./Vote";
import MediaViewer from "./MediaViewer";
import LoadingPlaceholder from "./LoadingPlaceholder";
import { extractMediaUrl, calculateHoursSincePost } from "../utils";
import "./CSS/HomePage.css";

const HomePage = ({ posts, setPosts, loadMoreRef, isLoading, accessToken }) => {
  return (
    <div className="homepage-container">
      <div className="space-div"></div>
      <div className="title-container">
        <Title />
      </div>
      <div>
        <ul>
          {console.log("Homepage gets rendered!")}
          {posts.map((post) => {
            const mediaUrl = extractMediaUrl(post); // Get the media URL or fallback image
            const author = post.data.author; // Access the author's username
            const hoursSincePost = calculateHoursSincePost(
              post.data.created_utc
            ); // Calculate hours since posting
            const postUrl = post.data.url; // Access the URL of the post
            const numComments = post.data.num_comments; // Access the number of comments
            return (
              <React.Fragment key={post.data.id}>
                <div className="post">
                  <li className="title" key={post.data.id}>
                    {post.data.title}
                  </li>
                  <div className="vote-container">
                    <Vote post={post} accessToken={accessToken} />
                  </div>
                  <MediaViewer
                    post={post}
                    mediaUrl={mediaUrl}
                    postUrl={postUrl}
                  />
                  <li className="nada"></li> {/*for styling purposes */}
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
        <div ref={loadMoreRef} style={{ height: "350px", width: "100px" }}>
          {/* Show loading placeholders while fetching new posts */}
          {isLoading && (
            <>
              <LoadingPlaceholder />
            </>
          )}
        </div>
      </div>

      <Search />
      <PostList />
    </div>
  );
};

export default HomePage;
