"use client";
import React, { useEffect, useState } from 'react'
import { Timeline } from "@/components/ui/timeline";
import Image from 'next/image';
import { ArrowLeft, Clock, ExternalLink, Smartphone, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';

// const TRIP_DATA = {

 
//     "destination": "Goa, India",
//     "duration": "2 Days",
//     "origin": "Mumbai, India",
//     "budget": "Low",
//     "group_size": "Solo",
//     "hotels": [
//       {
//         "hotel_name": "The Hosteller Goa, Anjuna",
//         "hotel_address": "Near Anjuna Flea Market, St. Michael’s Vaddo, Anjuna, Goa 403509",
//         "price_per_night": "₹500 - ₹800",
//         "hotel_image_url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
//         "geo_coordinates": {
//           "latitude": 15.5733,
//           "longitude": 73.7410
//         },
//         "rating": 4.5,
//         "description": "A vibrant, budget-friendly hostel perfect for solo travelers. Features a swimming pool, common areas for socializing, and clean dorm beds."
//       },
//       {
//         "hotel_name": "Zostel Goa, Calangute",
//     "hotel_address": "Near Calangute Beach, North Goa, Goa 403516",
//     "price_per_night": "₹950",
//     "hotel_image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945",
//     "geo_coordinates": {
//       "latitude": 15.5494,
//       "longitude": 73.7535
//     },
//     "rating": 4.7,
//     "description": "A popular social hub for travelers located just minutes from the beach. Offers cozy private rooms, lively dorms, and a rooftop cafe with great vibes."
//   }
      
//     ],
//     "itinerary": [
//       {
//         "day": 1,
//         "day_plan": "North Goa Beach Hopping & Sunset",
//         "best_time_to_visit_day": "9:00 AM - 9:00 PM",
//         "activities": [
//           {
//             "place_name": "Anjuna Beach",
//             "place_details": "Famous for its rocky shores and bohemian vibe. Great for a morning walk and watching the waves.",
//             "place_image_url": "https://images.unsplash.com/photo-1512789172734-77a660329280",
//             "geo_coordinates": {
//               "latitude": 15.5728,
//               "longitude": 73.7407
//             },
//             "place_address": "Anjuna, North Goa",
//             "ticket_pricing": "Free",
//             "time_travel_each_location": "15 mins from Hostel",
//             "best_time_to_visit": "Early Morning"
//           },
//           {
//             "place_name": "Baga Beach",
//             "place_details": "One of the most famous beaches in Goa. Known for its water sports, shacks, and the famous Tito's Lane nearby.",
//             "place_image_url": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b",
//             "geo_coordinates": { "latitude": 15.5553, "longitude": 73.7517 },
//             "place_address": "Baga, North Goa",
//             "ticket_pricing": "Free",
//             "time_travel_each_location": "20 mins from Anjuna",
//             "best_time_to_visit": "1:00 PM - 3:30 PM"
//           },
//           {
//             "place_name": "Chapora Fort",
//             "place_details": "Commonly known as the 'Dil Chahta Hai' fort. Offers a panoramic view of Vagator Beach.",
//             "place_image_url": "https://images.unsplash.com/photo-1582972236019-ea4af5ea9443",
//             "geo_coordinates": {
//               "latitude": 15.6056,
//               "longitude": 73.7358
//             },
//             "place_address": "Chapora, North Goa",
//             "ticket_pricing": "Free",
//             "time_travel_each_location": "25 mins from Baga",
//             "best_time_to_visit": "4:30 PM (Pre-Sunset)"
//           },
//           {
//             "place_name": "Vagator Beach",
//         "place_details": "A beautiful beach split into Big Vagator and Little Vagator. Perfect for watching the sunset after visiting the fort.",
//         "place_image_url": "https://images.unsplash.com/photo-1590393957530-9118c760802c",
//         "geo_coordinates": { "latitude": 15.6030, "longitude": 73.7336 },
//         "place_address": "Vagator, North Goa",
//         "ticket_pricing": "Free",
//         "time_travel_each_location": "10 mins walk from Fort",
//         "best_time_to_visit": "6:00 PM"
//           }

//         ]
//       },
//       {
//         "day": 2,
//         "day_plan": "Old Goa Heritage & Panjim Walk",
//         "best_time_to_visit_day": "10:00 AM - 7:00 PM",
//         "activities": [
//           {
//             "place_name": "Basilica of Bom Jesus",
//             "place_details": "A UNESCO World Heritage site containing the remains of St. Francis Xavier. Stunning Baroque architecture.",
//             "place_image_url": "https://images.unsplash.com/photo-1624460773097-9e678393e878",
//             "geo_coordinates": {
//               "latitude": 15.5009,
//               "longitude": 73.9116
//             },
//             "place_address": "Old Goa Road, Bainguinim",
//             "ticket_pricing": "Free",
//             "time_travel_each_location": "45 mins from Anjuna",
//             "best_time_to_visit": "11:00 AM"
//           },
//           {
//             "place_name": "Fontainhas (Latin Quarter)",
//             "place_details": "Colorful Portuguese-style houses and narrow winding streets. Extremely photogenic for solo explorers.",
//             "place_image_url": "https://images.unsplash.com/photo-1590424600100-33671239845d",
//             "geo_coordinates": {
//               "latitude": 15.4920,
//               "longitude": 73.8285
//             },
//             "place_address": "Panjim, Goa",
//             "ticket_pricing": "Free",
//             "time_travel_each_location": "25 mins from Old Goa",
//             "best_time_to_visit": "Late Afternoon"
//           }
//         ]
//       }
//     ]
//   }

function Itinerary() {
    //@ts-ignore
    const { tripDetailInfo, setTripDetailInfo} = useTripDetail();
    const [tripData, setTripData] = useState<TripInfo|null>(null)

    useEffect(() =>{
        tripDetailInfo && setTripData(tripDetailInfo)
    }, [tripDetailInfo])

const data = tripData?[
    {
      title: "Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData?.hotels.map((hotel, index) => (
           <HotelCardItem key={index} hotel = {hotel} />

          ))}
          
        </div>
      ),
    },
    ...tripData?.itinerary.map((dayData) => ({
        title: `Day ${dayData?.day}`,
        content:(
            <div>
                <p>Best Time:{dayData?.best_time_to_visit_day}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {dayData?.activities.map((activity,index) => (
                      
                <PlaceCardItem key={index} activity={activity}/>
                ))}
                </div>
            </div>
        )
    }))
    
  ]:[];
  return (
    <div className="relative w-full h-[83vh] overflow-auto">
        {/* @ts-ignore */}
      {tripData ? <Timeline data={data} tripData={tripData}/> 
      :
      <div>
        <h2 className='flex gap-2 text-3xl text-white left-20 items-center absolute bottom-20'> <ArrowLeft/> Getting to know you to build perfect trip here...</h2>
    <Image src= {'/travel.gif'} alt = 'travel' width={'800'} 
      height={'800'} className='w-full h-full object-cover rounded-3xl'/>
      
      
      </div>
}
     
    </div>
  );
}

export default Itinerary
