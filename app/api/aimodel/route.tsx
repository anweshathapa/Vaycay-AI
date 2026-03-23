import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { aj } from "@/utils/arcjet";
import { auth, currentUser } from "@clerk/nextjs/server";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details in order, and wait for the user's answer before asking the next:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, relaxation)
7. Special requirements or preferences (if any)

Rules:
- Do not ask multiple questions at once, and never ask irrelevant questions
- If an answer is missing or unclear, politely ask the user for clarification.
- Always maintain a conversational, interactive style while asking questions.
- Along with the response, also send which UI component to display for generative UI for example ('budget/groupSize/tripDuration/final'), where Final means AI generating complete final output.
- Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text)

JSON Schema:
{
  "resp": "Your conversational response text here",
  "ui": "componentName"
}
`;

const FINAL_PROMPT = `Generate Travel Plan with give details, give me Hotels options list with HotelName,
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url,
Geo Coordinates,Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.
Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
  `

export async function POST(req: NextRequest) {
    try {
        const { messages, isFinal } = await req.json();
        const user = await currentUser();
        const {has} = await auth();
        const hasPremiumAccess = has({ plan: 'monthly' });
        console.log("hasPremiumAccess", hasPremiumAccess);
        const decision = await aj.protect(req, { userId: user?.primaryEmailAddress?.emailAddress?? '', requested: isFinal?5:0 }); //Deduct 5 tokens from the bucket
        console.log(decision);
        //@ts-ignore
        if (decision?.reason?.remaining==0 && !hasPremiumAccess) {
            return NextResponse.json({
            resp: 'No Free Credit Remaining',
            ui: 'limit'
        
        })
    }
        
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", 
            generationConfig: {
                responseMimeType: "application/json",
            },
        });

        const chatHistory = messages.slice(0, -1).map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
        }));

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: isFinal?FINAL_PROMPT:PROMPT}],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to help you plan your trip one step at a time." }],
                },
                ...chatHistory
            ],
        });

        
        const lastUserMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastUserMessage);
        const responseText = result.response.text();

        
        return NextResponse.json(JSON.parse(responseText));

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { resp: "I'm having trouble thinking right now. Could you repeat that?", ui: "" }, 
            { status: 500 }
        );
    }
}