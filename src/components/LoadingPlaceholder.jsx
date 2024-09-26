import React from "react";

const LoadingPlaceholder = () => {
    return (
        <div
        style={{
          padding: '20px',
          background: '#e0e0e0',
          borderRadius: '5px',
          marginBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div style={{ height: '20px', background: '#ccc', borderRadius: '4px', width: '60%' }}></div>
        <div style={{ height: '150px', background: '#ddd', borderRadius: '4px' }}></div>
        <div style={{ height: '20px', background: '#ccc', borderRadius: '4px', width: '80%' }}></div>
        <div style={{ height: '20px', background: '#ccc', borderRadius: '4px', width: '50%' }}></div>
      </div>
    )
};

export default LoadingPlaceholder;