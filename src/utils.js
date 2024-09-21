export const extractMediaUrl = (post) => {
  // Define the default Reddit logo URL
  const DEFAULT_REDDIT_LOGO_URL =
    "https://www.redditinc.com/assets/images/site/reddit-logo.png";

  // 1. Try to get the third resolution image URL from the preview
  const previewUrl = post?.data?.preview?.images?.[0]?.resolutions?.[2]?.url;

  // 2. If the preview fails, try to get the URL from the gallery data using media_id
  const galleryItem = post?.data?.gallery_data?.items?.[0];
  const galleryUrl = galleryItem
    ? post?.data?.media_metadata?.[galleryItem.media_id]?.s?.u
    : null;

  // 3. As a last fallback, use the thumbnail URL if it's a valid URL
  const thumbnailUrl = post?.data?.thumbnail;
  const validThumbnailUrl =
    thumbnailUrl && thumbnailUrl.startsWith("http") ? thumbnailUrl : null;

  // Return the first available URL in the order of preference
  return previewUrl || galleryUrl || validThumbnailUrl || DEFAULT_REDDIT_LOGO_URL;
};
