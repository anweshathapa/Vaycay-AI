import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet ({
    key : process.env.ARCJET_KEY!, 
    rules : [
        // Create a token bucket rate limit.
        tokenBucket ({
            mode: "LIVE", //will block request
            characteristics: ["userId"],
            refillRate: 10, //refill 5 tokens per interval
            interval: 86400,
            capacity: 10,
        }),
    ],
});