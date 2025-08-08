export function transformImageKitUrl(
  url,
  { width, height, quality = 80, crop = false, format, isThumbnail = false } = {}
) {
  if (!url || typeof url !== "string" || !url.includes("ik.imagekit.io")) return url;

  const videoExtensions = ["mp4", "mov", "webm", "avi", "mkv"];
  const realImageFormats = ["jpg", "jpeg", "png", "webp", "gif", "avif"];

  const isVideo = videoExtensions.some((ext) => url.toLowerCase().endsWith("." + ext));

  const tr = [];

  if (width) tr.push(`w-${width}`);
  if (height) tr.push(`h-${height}`);
  if (crop) tr.push("c-fill");
  if (!crop) tr.push("c-fit");
  if (quality) tr.push(`q-${quality}`);
  if (format && format !== "auto") {
    tr.push(`f-${format}`);
  } else if (format === "auto") {
    tr.push("f-auto");
  }

  // 👉 Handle thumbnail-style URL for videos
  if (isVideo && isThumbnail) {
    url += "/ik-thumbnail.jpg";
  } else if (format && realImageFormats.includes(format.toLowerCase())) {
    // Replace extension for non-video
    url = url.replace(
      /\.(mp4|webm|mov|avi|mkv|png|jpg|jpeg|gif|avif)$/i,
      `.${format}`
    );
  }

  if (tr.length === 0) return url;

  // Add transformations as query params
  const joinChar = url.includes("?") ? "&" : "?";
  return `${url}${joinChar}tr=${tr.join(",")}`;
}
