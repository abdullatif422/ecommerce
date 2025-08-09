export const getBaseUrl = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  if (isDevelopment) {
    return process.env.NEXT_PUBLIC_DEV_VERCEL_URL;
  } else if (process.env.NODE_ENV == "production") {
    return process.env.NEXT_PUBLIC_PROD_VERCEL_URL;
  } else {
    return "http://localhost:3000";
  }
};
