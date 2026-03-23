"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Hotel } from './ChatBox'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, Wallet, MapPin } from 'lucide-react'
import axios from 'axios'

type Props = {
    hotel: Hotel
}

function HotelCardItem({ hotel }: Props) {
    const [photoUrl, setPhotoUrl] = useState<string>('/placeholder.jpeg');

    useEffect(() => {
        if (hotel?.hotel_name) {
            GetGooglePlaceDetail();
        }
    }, [hotel]);

    const GetGooglePlaceDetail = async () => {
        try {
            const result = await axios.post('/api/google-place-detail', {
                placeName: hotel?.hotel_name
            });
            
            if (result?.data && typeof result.data === 'string') {
                setPhotoUrl(result.data);
            }
        } catch (error) {
            console.error("Error fetching hotel image:", error);
            setPhotoUrl('/placeholder.jpeg');
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col h-full border border-gray-100 overflow-hidden">
            
            {/* --- 1. FIXED IMAGE SECTION --- */}
            <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <Image 
                    src={photoUrl} 
                    alt={hotel?.hotel_name || 'Hotel Image'}
                    fill // This makes the image fill the 48/56 height container
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    onError={() => setPhotoUrl('/placeholder.jpeg')}
                />
            </div>

            {/* --- 2. CONTENT SECTION --- */}
            <div className="p-4 flex flex-col flex-1 gap-2">
                <div>
                    {/* line-clamp-1 prevents the title from wrapping to 2 lines */}
                    <h2 className="font-bold text-lg line-clamp-1 text-gray-800">
                        {hotel?.hotel_name}
                    </h2>
                    <p className="text-gray-500 text-xs flex items-center gap-1 mt-1 line-clamp-1">
                        <MapPin size={12}/> {hotel?.hotel_address}
                    </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1 text-green-700 font-semibold text-sm">
                        <Wallet size={16}/> {hotel?.price_per_night}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-600 font-bold text-sm">
                        <Star size={16} fill="currentColor"/> {hotel?.rating}
                    </div>
                </div>

                {/* --- 3. ACTION SECTION --- */}
                <div className="mt-auto pt-3">
                    <Link 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_name + " " + hotel?.hotel_address)}`} 
                        target="_blank"
                    >
                        <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-medium">
                            View on Map
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HotelCardItem;