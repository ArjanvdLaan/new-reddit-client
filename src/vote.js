import axios from 'axios';

// Function to handle voting on a post
export const voteOnPost = async (postId, direction, accessToken) => {
  try {
    // Ensure the direction is valid: 1 (upvote), -1 (downvote), or 0 (remove vote)
    if (![1, -1, 0].includes(direction)) {
      console.error("Invalid vote direction. Use 1 for upvote, -1 for downvote, 0 for remove.");
      return;
    }

    // Make the API request to Reddit's vote endpoint
    const response = await axios.post(
      'https://oauth.reddit.com/api/vote',
      {
        dir: direction,
        id: `t3_${postId}` // t3_ is the prefix for posts, followed by the actual post ID
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('Vote successful:', response.data);
  } catch (error) {
    console.error('Failed to vote on post:', error);
    if (error.response?.status === 401) {
      console.error('Unauthorized. Please reauthenticate.');
    }
  }
};
