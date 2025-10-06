// helpers/LoginDetails.js
// Login detais
// helpers/LoginDetails.js
// This module safely reads credentials from environment and throws a helpful error
// if they are missing. We immediately execute the IIFE so we validate at import time.

export const Credentials = (() => {
  const username = process.env.BRIGHTHR_USERNAME;
  const password = process.env.BRIGHTHR_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "❌ Missing BRIGHTHR_USERNAME or BRIGHTHR_PASSWORD. " +
        "Please create a .env file with these values."
    );
  }

  return { username, password };
})();
