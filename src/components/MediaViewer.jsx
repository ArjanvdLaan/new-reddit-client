import React, { useState } from "react";
import "./CSS/MediaViewer.css";

const MediaViewer = ({ post, mediaUrl, postUrl, galleryData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // The current index of the image being shown

  // Function to open the MediaViewer
  const openViewer = () => {
    
    setIsOpen(true);
    console.log("Opening MediaViewer isOpen:", isOpen);
    document.body.style.overflow = "hidden"; // Disable scrolling when the modal is open
  };

  // Function to close the MediaViewer
  const closeViewer = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling when the modal is closed
  };

  // Function to check if the mediaUrl is a fallback video
  const isVideoFallback = (url) => {
    const isFallback = url.toLowerCase().endsWith("fallback");
    return isFallback;
  };

  // Function to handle "Next" button click of the carousel
  const goToNext = () => {
    if (galleryData.length > 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === galleryData.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Function to handle "Previous" button click of the carousel
  const goToPrevious = () => {
    if (galleryData.length > 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? galleryData.length - 1 : prevIndex - 1
      );
    }
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
        {!mediaUrl.startsWith("http") ? (
          <div className="text-content" onClick={openViewer}>
            {mediaUrl}
          </div>
        ) : isVideoFallback(mediaUrl) ? (
          <video
            className="video"
            src={mediaUrl}
            controls
            onClick={openViewer}
          />
        ) : galleryData ? (
          // Show "Gallery" indicator if there are multiple images
          <div className={`gallery-indicator-container ${isOpen ? "hide-indicators" : ""}`}>
            <img
              className="image-indicator"
              src={mediaUrl}
              alt="Post Preview"
              onClick={openViewer}
            />
            <div className="gallery-indicator">Click for gallery</div>
          </div>
        ) : (
          <img
            className="image"
            src={mediaUrl}
            alt="Post Preview"
            onClick={openViewer}
          />
        )}
      </a>
      {/* Fullscreen MediaViewer when open */}
      {isOpen && (
        <div className="media-viewer-overlay">
          <div className="media-viewer-content">
            {typeof mediaUrl === "string" && !mediaUrl.startsWith("http") ? (
              <div className="text-content-fullscreen" onClick={openViewer}>
                {mediaUrl}
              </div>
            ) : isVideoFallback(mediaUrl) ? (
              <video
                className="video"
                src={mediaUrl}
                controls
                onClick={openViewer}
              />
            ) : galleryData ? (
              <div className="gallery-container">
                <button onClick={goToPrevious} className="arrow left-arrow">
                  {"<"}
                </button>
                <img
                  className="gallery-image"
                  src={mediaUrl}
                  alt="Post Preview"
                  onClick={openViewer}
                />
                <button onClick={goToNext} className="arrow right-arrow">
                  {">"}
                </button>
              </div>
            ) : (
              <img
                className="image"
                src={mediaUrl}
                alt="Post Preview"
                onClick={openViewer}
              />
            )}
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
          </div>
        </div>
      )}
    </>
  );
};

export default MediaViewer;
