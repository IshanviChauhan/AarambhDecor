export const getBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? "http://localhost:4001"
    : "http://localhost:4001";
