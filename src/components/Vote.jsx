import React from "react";
import { voteOnPost } from "../vote.js";
import "./CSS/Vote.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Vote = ({ posts, accessToken }) => {
  //   console.log(posts);
  //   console.log(accessToken);
  return (
    <div>
      {posts.map((post) => {
        const postId = post.data.id; // This is the post ID you will use for voting

        return (
          <div key={postId}>
            <p>{post.data.ups} upvotes</p>

            {/* Upvote and Downvote buttons */}
            <FontAwesomeIcon
              icon={faArrowUp}
              onClick={() => voteOnPost(postId, 1, accessToken)}
              className="upvote-button"
            />
            <FontAwesomeIcon
              icon={faArrowDown}
              onClick={() => voteOnPost(postId, -1, accessToken)}
              className="downvote-button"
            />

            {/* Remove vote button */}

            <button
              onClick={() => voteOnPost(postId, 0, accessToken)} // Remove vote button
              className="remove-vote-button"
            >
              Remove Vote
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Vote;
