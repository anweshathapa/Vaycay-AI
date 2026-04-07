import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet ({
    key : process.env.ARCJET_KEY!, 
    rules : [
        // Create a token bucket rate limit.
        tokenBucket ({
            mode: "LIVE", //will block request
            characteristics: ["userId"],
            refillRate: 5, //refill 5 tokens per interval // changed it from 10
            interval: 84600, //make it 84600 later // changed it from 10
            capacity: 10,
        }),
    ],
});