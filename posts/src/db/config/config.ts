export const configs = {
  production: {
    uri: process.env?.PROD_DB_URI ?? "postgres://niko:niko@db:5432/kcposts",
    logging: false,
  },
};
