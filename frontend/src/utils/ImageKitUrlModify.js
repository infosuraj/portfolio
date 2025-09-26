export function transformImageKitUrl(
  url,
  { width, height, quality = 80, crop = false, format } = {}
) {
  if (!url || typeof url !== "string" || !url.includes("ik.imagekit.io")) return url;

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

  if (tr.length === 0) return url;

  const joinChar = url.includes("?") ? "&" : "?";
  return `${url}${joinChar}tr=${tr.join(",")}`;
}
