export function optimizeCloudinaryImage(url: string, width = 2000) {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/q_auto,f_auto,c_limit,w_${width}/`
  );
}