"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Globe, Plane, Building, Compass } from "lucide-react";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-white">
      <h2 className="max-w-7xl pl-4 mx-auto text-2xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
        Popular <span className="text-primary">Destinations</span> to Visit
      </h2>
      <p className="max-w-7xl pl-4 mx-auto text-neutral-500 mt-2 mb-5 text-lg">
        Explore hand-picked world-class cities and their most iconic landmarks.
      </p>
      <Carousel items={cards} />
    </div>
  );
}

// --- REUSABLE SECTION COMPONENT ---
const DestinationSection = ({ title, description, imgSrc }: { title: string, description: string, imgSrc: string }) => (
  <div className="bg-white dark:bg-neutral-900 p-5 md:p-5 rounded-[32px] mb-4 border border-neutral-100 shadow-sm">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 tracking-tight">
        {title}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg font-sans leading-relaxed mb-8">
        {description}
      </p>
      {/* <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-video"> */}
        <img
          src={imgSrc}
          alt={title}
          height="500"
          width="500"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
        />
      </div>
    </div>
  // </div>
);

// --- DESTINATION CONTENT COMPONENTS ---

const ParisContent = () => (
  <div className="py-10">
    <DestinationSection 
      title="The Eiffel Tower" 
      description="The iron lady of Paris. Ascend to the summit for a breathtaking view of the Seine and the city's historic boulevards as they light up at night."
      imgSrc="https://images.unsplash.com/photo-1626985250004-63435013e135?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="The Louvre Museum" 
      description="The world's largest art museum. Beyond the Mona Lisa, explore the glass pyramid and miles of galleries housing 35,000 works of art."
      imgSrc="https://images.unsplash.com/photo-1566477479228-ba589c11475b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="Notre-Dame Cathedral" 
      description="A Gothic masterpiece standing on the Île de la Cité. Admire the flying buttresses and the gargoyles that have watched over Paris for 800 years."
      imgSrc="https://images.unsplash.com/photo-1556773523-d9f29b2127af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  </div>
);

const IndiaContent = () => (
  <div className="py-10">
    <DestinationSection 
      title="Dzukou Valley, Nagaland" 
      description="Known as the 'Valley of Flowers of the Northeast,' this high-altitude sanctuary features unique rolling green hills and rare lilies that bloom nowhere else on Earth."
      imgSrc="https://images.unsplash.com/photo-1542709111240-e9df0dd813b4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      
    />
    <DestinationSection 
      title="Hawa Mahal, Jaipur" 
      description="The 'Palace of Winds' features 953 tiny windows designed to keep the palace cool while allowing royal ladies to watch the streets unseen."
      imgSrc="https://images.unsplash.com/photo-1697907271176-5ee312f7fb18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="Kerala Backwaters" 
      description="Cruise through a tropical paradise on a traditional houseboat, surrounded by palm trees and serene waterways."
      imgSrc= "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  </div>
);

const TokyoContent = () => (
  <div className="py-10">
    <DestinationSection 
      title="Shibuya Crossing" 
      description="The heartbeat of Tokyo. Experience the world's busiest pedestrian crossing, surrounded by massive LED screens and vibrant city energy."
      imgSrc="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="Senso-ji Temple" 
      description="Located in Asakusa, this is Tokyo's oldest temple. Walk through the giant Kaminarimon Gate and enjoy traditional street food at Nakamise-dori."
      imgSrc="https://images.unsplash.com/photo-1547251808-66d1db460ce0?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="Mount Fuji" 
      description="Japan's sacred peak. Whether viewed from the Chureito Pagoda or Lake Kawaguchi, Fuji-san is the ultimate symbol of Japanese natural beauty."
      imgSrc="https://images.unsplash.com/photo-1677774399689-80404bc9403a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  </div>
);

const RomeContent = () => (
  <div className="py-10">
    <DestinationSection 
      title="The Colosseum" 
      description="The grandest amphitheater of the Roman Empire. Stand where gladiators once fought and marvel at the engineering that has stood for nearly 2,000 years."
      imgSrc="https://images.unsplash.com/photo-1699012462295-bace478f27bc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="St. Peter's Basilica" 
      description="Located in Vatican City, it is an Italian Renaissance masterpiece. Climb the dome designed by Michelangelo for the best view of Rome."
      imgSrc="https://images.unsplash.com/photo-1610655769765-be8a0dd9627a?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="Trevi Fountain" 
      description="The most famous Baroque fountain in the world. Legend says if you toss a coin with your right hand over your left shoulder, you will return to Rome."
      imgSrc="https://images.unsplash.com/photo-1549047608-0c9d7e6ec4fd?q=80&w=1058&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  </div>
);

const NYCContent = () => (
  <div className="py-10">
    <DestinationSection 
      title="Times Square" 
      description="The Junction of the World. Surrounded by Broadway theaters and neon signs, it is the center of the New York entertainment industry."
      imgSrc="https://images.unsplash.com/photo-1582760548598-0bccdf815aa2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="Central Park" 
      description="The green heart of Manhattan. From the Bethesda Fountain to Strawberry Fields, discover 843 acres of beautiful parkland and lakes."
      imgSrc="https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="Statue of Liberty" 
      description="A colossal copper statue on Liberty Island. A gift from France, she has stood as a welcoming symbol of freedom to millions of arrivals."
      imgSrc="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1199&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  </div>
);

const DubaiContent = () => (
  <div className="py-10">
    <DestinationSection 
      title="Burj Khalifa" 
      description="The world's tallest building. Witness the desert landscape and the Persian Gulf from the 148th floor observation deck."
      imgSrc= "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="Palm Jumeirah" 
      description="A man-made archipelago shaped like a palm tree. This engineering marvel is home to some of Dubai's most luxurious resorts and beaches."
      imgSrc="https://images.unsplash.com/photo-1682410601904-24ec1d9858e6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <DestinationSection 
      title="The Dubai Fountain" 
      description="The world's largest choreographed fountain system. Watch water dance to music at the base of the Burj Khalifa in a spectacular nightly show."
      imgSrc="https://images.unsplash.com/photo-1642874836561-b76b1c6478fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  </div>
);

// --- MAIN DATA ARRAY ---

const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights – Eiffel Tower & Louvre",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    content: <ParisContent />,
  },
  {
    category: "New York, USA",
    title: "Experience NYC – Times Square & Central Park",
    src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop",
    content: <NYCContent />,
  },
  {
    category: "India",
    title: "Harbour Views – Opera House, Bondi Beach & Wildlife",
    src: "https://images.unsplash.com/photo-1585506942812-e72b29cef752?q=80&w=728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <IndiaContent />,
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo – Shibuya & Senso-ji Temple",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlHnxfGVufDB8fHx8fA%3D%3D",
    content: <TokyoContent />,
  },
  {
    category: "Rome, Italy",
    title: "Walk through History – Colosseum & Vatican",
    src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlHnxfGVufDB8fHx8fA%3D%3D",
    content: <RomeContent />,
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and Innovation – Burj Khalifa & The Palm",
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop",
    content: <DubaiContent />,
  },
];