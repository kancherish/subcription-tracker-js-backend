import arcjet, { shield, tokenBucket } from "@arcjet/node";
import { ARC_JET } from "./env.js";

const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: ARC_JET,
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    // Shield protects your ahpp from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});


export default aj