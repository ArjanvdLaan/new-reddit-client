import React, { useState } from "react";
import "./CSS/MediaViewer.css";

const MediaViewer = ({ post, mediaUrl, postUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const postData = post.data;
  console.log("Post Data:", postData);

  // Function to open the MediaViewer
  const openViewer = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling when the modal is open
  };

  // Function to close the MediaViewer
  const closeViewer = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling when the modal is closed
  };

  return (
    <>
      <a
        // href={post.data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="anchor-tag"
      >
        {/* {console.log("Post Preview Data:", post.data.preview)} */}

        <img className="image" src={mediaUrl} alt="Post Preview" onClick={openViewer} />
      </a>
      {/* Fullscreen MediaViewer when open */}
      {isOpen && (
        <div className="media-viewer-overlay">
          <div className="media-viewer-content">
            <button className="close-btn" onClick={closeViewer}>
              X
            </button>
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="post-link"
            >
              View Original Post
            </a>
            <img
              src={mediaUrl}
              alt="Full screen media"
              className="media-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MediaViewer;
