import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { voteOnPost } from '../vote.js';
import './CSS/Vote.css';

const Vote = ({ post, accessToken }) => {
  const postId = post.data.id;
  return (
    <div>
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
        onClick={() => voteOnPost(postId, 0, accessToken)}
        className="remove-vote-button"
      >
        Remove Vote
      </button>
    </div>
  );
};

export default Vote;
