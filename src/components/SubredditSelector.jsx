import React, { useState, useEffect } from 'react';

// Define the list of subreddits that can be selected
const subredditOptions = [
    { name: 'Pics', value: 'pics' },
    { name: 'Aww', value: 'aww' },
    { name: 'EarthPorn', value: 'EarthPorn' },
    { name: 'Itookapicture', value: 'itookapicture' },
    { name: 'Art', value: 'Art' },
    { name: 'FoodPorn', value: 'foodporn' },
    { name: 'DesignPorn', value: 'DesignPorn' },
    { name: 'ImaginaryLandscapes', value: 'ImaginaryLandscapes' },
    { name: 'CityPorn', value: 'CityPorn' },
    { name: 'Wallpaper', value: 'wallpaper' },
    { name: 'SpacePorn', value: 'SpacePorn' }
  ];

  const SubredditSelector = ({ onSubredditChange }) => {
    const [selectedSubreddit, setSelectedSubreddit] = useState('pics');
  
    // Handle change event when the user selects a new subreddit
    const subredditSelectionHandler = (event) => {
      const subreddit = event.target.value;
      console.log("different subreddit is selected", subreddit)
      setSelectedSubreddit(subreddit);
      onSubredditChange(subreddit);  // Pass the selected subreddit to the parent component
    };
  
    return (
      <div>
        <label htmlFor="subreddit-select">Select a subreddit: </label>
        <select id="subreddit-select" value={selectedSubreddit} onChange={subredditSelectionHandler}>
          {subredditOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SubredditSelector;

