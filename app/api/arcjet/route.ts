// import arcjet, { tokenBucket } from "@arcjet/next";
// import { NextResponse } from "next/server";

// export const aj = arcjet({
//   key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
//   rules: [
//     // Create a token bucket rate limit. Other algorithms are supported.
//     tokenBucket({
//       mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
//       characteristics: ["userId"], // track requests by a custom user ID
//       refillRate: 10, // refill 5 tokens per interval
//       interval: 10, //10, //86400 // refill every 10 seconds //24 hours limit is set
//       capacity: 10, // bucket maximum capacity of 10 tokens
//     }),
//   ],
// });

// export async function GET(req: Request) {
//   const userId = "user123"; // Replace with your authenticated user ID
//   const decision = await aj.protect(req, { userId, requested: 5 }); // Deduct 5 tokens from the bucket
//   console.log("Arcjet decision", decision);

//   if (decision.isDenied()) {
//     return NextResponse.json(
//       { error: "Too Many Requests", reason: decision.reason },
//       { status: 429 },
//     );
//   }

//   return NextResponse.json({ message: "Hello world" });
// }

// import arcjet, { tokenBucket } from "@arcjet/next";
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server"; // Import Clerk Auth

// export const aj = arcjet({
//   key: process.env.ARCJET_KEY!,
//   rules: [
//     tokenBucket({
//       mode: "LIVE", 
//       characteristics: ["userId"], // This looks for the userId we provide below
//       refillRate: 10,
//       interval: 10,
//       capacity: 10,
//     }),
//   ],
// });

// export async function GET(req: Request) {
//   // Get the real Clerk user ID
//   const { userId } = await auth();

//   // If someone isn't logged in, don't let them use the AI
//   if (!userId) {
//     return NextResponse.json({ error: "Please log in to continue" }, { status: 401 });
//   }

//   // Use the real userId for the rate limit
//   const decision = await aj.protect(req, { userId, requested: 5 });

//   if (decision.isDenied()) {
//     return NextResponse.json(
//       { error: "Too Many Requests", reason: decision.reason },
//       { status: 429 },
//     );
//   }

//   return NextResponse.json({ message: "Success! AI credits available." });
// }

import { aj } from "@/utils/arcjet";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; 

export async function GET(req: Request) {
  
  const { userId } = await auth();

  if (!userId) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decision = await aj.protect(req, { userId, requested: 1 }); //change it to 5 later
  
  console.log("Arcjet decision for user:", userId, decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 },
    );
  }

  return NextResponse.json({ message: "Check Passed: User has remaining credits." });
}