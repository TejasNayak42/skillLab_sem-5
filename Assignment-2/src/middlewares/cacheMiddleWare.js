// cacheMiddleware.js
import NodeCache from "node-cache";

const cache = new NodeCache();

export const cacheGet = (key) => {
  return new Promise((resolve, reject) => {
    cache.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};

export const cacheSet = (key, value) => {
  return new Promise((resolve, reject) => {
    cache.set(key, value, (err, success) => {
      if (err) {
        reject(err);
      } else {
        resolve(success);
      }
    });
  });
};
