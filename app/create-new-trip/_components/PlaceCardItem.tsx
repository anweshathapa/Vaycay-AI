"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ticket, Clock, ExternalLink } from "lucide-react";
import axios from "axios";
import { Activity } from "./ChatBox";

type Props = {
  activity: Activity;
};

function PlaceCardItem({ activity }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("/placeholder.jpeg");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (activity) {
      GetGooglePlaceDetail();
    }
  }, [activity]);

  const GetGooglePlaceDetail = async () => {
    try {
      const result = await axios.post("/api/google-place-detail", {
        placeName: activity?.place_name + " " + activity?.place_address,
      });

      if (result?.data && typeof result.data === "string") {
        setPhotoUrl(result.data);
      }
    } catch (error) {
      console.error("Error fetching place image:", error);
      setPhotoUrl("/placeholder.jpeg");
    }
  };

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)} 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col h-full border border-gray-100 overflow-hidden cursor-pointer"
    >
      {/* IMAGE SECTION*/}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <Image
          src={photoUrl}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          alt={activity?.place_name || 'Place Image'}
          onError={() => setPhotoUrl("/placeholder.jpeg")}
        />
      </div>

      {/* --- 2. CONTENT SECTION --- */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div>
          
          <h2 
            title={activity?.place_name}
            className="font-bold text-lg line-clamp-1 text-gray-800"
          >
            {activity?.place_name}
          </h2>

          
          <p 
            title={activity?.place_details}
            className={`text-gray-500 text-xs mt-1 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}
          >
            {activity?.place_details}
          </p>
        </div>

        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1 text-blue-700 font-semibold text-sm">
            <Ticket size={16} /> {activity?.ticket_pricing || "Free"}
          </div>
          <div className="flex items-center gap-1 text-orange-600 font-bold text-sm">
            <Clock size={16} /> {activity?.best_time_to_visit}
          </div>
        </div>

        
        <div className="mt-auto pt-3">
              <Link href={'https://www.google.com/maps/search/?api=1&query='+activity?.place_name} target='_blank'>
            <Button
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-medium flex gap-2"
            >
              View on Map <ExternalLink size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlaceCardItem;