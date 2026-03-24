// "use client"
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import axios from 'axios'
// import { Loader, Send } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import EmptyBoxState from './EmptyBoxState'
// import GroupSizeUi from './GroupSizeUi'
// import BudgetUi from './BudgetUi'
// import SelectDays from './SelectDaysUi'
// import FinalUi from './FinalUi'
// import { useMutation } from 'convex/react'
// import { api } from '@/convex/_generated/api'
// import { useTripDetail, useUserDetail } from '@/app/provider'
// import { v4 as uuidv4 } from 'uuid';

// type Message = {
//   role: string,
//   content: string,
//   ui?: string,
// }

// export type TripInfo = {
//   budget:string;
//   destination: string,
//   duration: string,
//   group_size:string,
//   origin:string,
//   hotels: Hotel[],
//   itinerary: Itinerary[]
// }

// export  type Hotel = {
//   hotel_name: string;
//   hotel_address: string;
//   price_per_night: string;
//   hotel_image_url: string;
//   geo_coordinates: {
//     latitude: number;
//     longitude: number;
//   };
//   rating: number;
//   description: string;
// };

// export type Activity = {
//   place_name : string;
//   place_details : string;
//   place_image_url: string;
//   geo_coordinates: {
//     latitude: number;
//     longitude:number;
//   };
//   place_address: string;
//   ticket_pricing: string;
//   time_travel_each_location: string;
//   best_time_to_visit: string;

// };

// type Itinerary = {
//   day: number;
//   day_plan: string;
//   best_time_to_visit_day: string;
//   activities: Activity[];
// };

// function ChatBox() {

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [userInput, setUserInput]=useState<string>();
//   const [loading, setLoading]= useState(false);
//   const [isFinal, setIsFinal]= useState(false);
//   const [tripDetail, setTripDetail] = useState<TripInfo>();
//   const SaveTripDetail=useMutation(api.tripDetail.CreateTripDetail);
//   const {userDetail, setUserDetail}=useUserDetail();
//   //@ts-ignore
//   const {tripDetailInfo, setTripDetailInfo} = useTripDetail();
//     const onSend = async() => {
//       // console.log("INSIDE")
//       if(!userInput?.trim()) return;
//       setLoading(true);

//       const newMsg:Message={
//         role:'user',
//         content: userInput ?? ''
//       }
//       setUserInput('');
//       // console.log("HERE")

//       setMessages((prev:Message[])=>[...prev, newMsg]);

//          const result = await axios.post('/api/aimodel', {
//           messages:[...messages, newMsg],
//           isFinal: isFinal

//          });

//          console.log("TRIP", result.data);

         

//           !isFinal && setMessages((prev:Message[])=>[...prev,{
//           role:'assistant',
//           content: result?.data?.resp,
//           ui: result?.data?.ui
//          }]);

//           if (isFinal) {
//             setTripDetail(result?.data?.trip_plan);
//             setTripDetailInfo(result?.data?.trip_plan);
//             const tripId = uuidv4();
//             await SaveTripDetail({
//               tripDetail: result?.data?.trip_plan,
//               tripId: tripId,
//               uid: userDetail?._id
//             });

//           }
         
//          setLoading(false);    
//         }

//   const RenderGenerativeUi=(ui:string)=> {
//     if (ui == 'budget') {
//       //Budget UI Component
//       return <BudgetUi onSelectedOption={(v:string)=>{setUserInput(v); onSend()}}/>

//     } else if(ui=='groupSize'){
//       // Group Size UI Component
//       return <GroupSizeUi onSelectedOption={(v:string)=>{setUserInput(v); onSend()}}/>


//     } else if(ui == 'tripDuration') {
//       // Trip Duration UI Component
//       return <SelectDays onSelectedOption={(v: string) => {setUserInput(v); onSend() }} />
//     } else if (ui == 'final') {
//       // Final UI Component
//       return <FinalUi viewTrip = {() => console.log()} 
//       disable={!tripDetail}
//       />
//     }

//     return null
//   }
//   useEffect(() => {
//     const lastMsg = messages[messages.length-1];
//     if(lastMsg?.ui=='final'){
//       setIsFinal(true);
//       setUserInput('Ok, Great!')
      
//     }
//   }, [messages])

//   useEffect (() => {
//     if (isFinal && userInput) {
//       onSend();
//     }

//   }, [isFinal]);

//   return (
    
//     // <div className='h-[85vh] flex flex-col border shadow rounded-2xl p-5'>
//       <div className='h-[90vh] flex flex-col border shadow rounded-2xl p-5'>
//       {messages?.length == 0 &&
//       <EmptyBoxState
//        onSelectOption={(v:string) => { setUserInput(v); onSend()}}/>

//       }
//       {/* Display Messages */}

//       <section className='flex-1 overflow-y-auto p-4'>
//       {messages.map((msg:Message,index) =>(
//         msg.role=='user'?

//           <div className='flex justify-end mt-2' key = {index}>
//                 <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
//                     {msg.content}
//                 </div>
                    
//             </div>:
        

//          <div className='flex justify-start mt-2' key = {index}>
//                 <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
//                     {msg.content}
//                     {RenderGenerativeUi(msg.ui??'')}
//                 </div>
//           </div>

//         ))}

//         {loading && <div className='flex justify-start mt-2' >
//                 <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
//                     <Loader className='animate-spin' />
//                 </div>
//           </div>
          
//         }
//       </section>
//     {/* User Input  */}
//       <section>
//          <div className='border rounded-2xl p-4 shadow relative'>
//                     <Textarea placeholder='Start typing here...'
//                     className='w-full h-3 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
//                     onChange = {(event)=>setUserInput(event.target.value)}
//                     value = {userInput}
//                     onKeyDown={(e) => {
//                     if (e.key === 'Enter' && !e.shiftKey) {
//                     e.preventDefault();
//                     onSend();           
//         }
//       }}
//                     />
//                     <Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>
//                         <Send className='h-4 w-4'/>

//                     </Button>
//                 </div>
//       </section>
//     </div>
    
//   )
  
// }

// export default ChatBox




"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import SelectDays from './SelectDaysUi'
import FinalUi from './FinalUi'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useTripDetail, useUserDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';

// --- TYPES & INTERFACES ---

type Message = {
  role: string,
  content: string,
  ui?: string,
}

export type TripInfo = {
  budget: string;
  destination: string,
  duration: string,
  group_size: string,
  origin: string,
  hotels: Hotel[],
  itinerary: Itinerary[]
}

export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
};

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};

type Itinerary = {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
};

// --- MAIN COMPONENT ---

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();

  // Convex Mutation
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);

  // Context Hooks
  const { userDetail } = useUserDetail();
  //@ts-ignore
  const { setTripDetailInfo } = useTripDetail();

  /**
   * Main logic for sending messages and handling AI response
   */
  const onSend = async () => {
    if (!userInput?.trim()) return;
    setLoading(true);

    const newMsg: Message = {
      role: 'user',
      content: userInput ?? ''
    }

    setUserInput('');
    setMessages((prev: Message[]) => [...prev, newMsg]);

    try {
      const result = await axios.post('/api/aimodel', {
        messages: [...messages, newMsg],
        isFinal: isFinal
      });

      console.log("AI RESPONSE RECEIVED:", result.data);

      // Handle intermediate chat responses
      if (!isFinal) {
        setMessages((prev: Message[]) => [...prev, {
          role: 'assistant',
          content: result?.data?.resp,
          ui: result?.data?.ui
        }]);
      }

      // Handle Final Itinerary Generation & Database Save
      if (isFinal) {
        const generatedPlan = result?.data?.trip_plan;

        if (generatedPlan) {
          console.log("VALIDATING PLAN:", generatedPlan);
          
          // Update Context and Local State
          setTripDetail(generatedPlan);
          setTripDetailInfo(generatedPlan);

          // Generate Unique ID and Save to Convex
          const tripId = uuidv4();
          
          await SaveTripDetail({
            tripDetail: generatedPlan, // Matches schema.ts key
            tripId: tripId,
            uid: userDetail?._id // Matches schema.ts key
          });

          console.log("CONVEX: Trip Saved Successfully");
        } else {
          console.error("AI FAIL: Generated plan is empty or undefined.");
        }
      }

    } catch (error) {
      console.error("SYSTEM ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Helper to render specific interactive UI components
   */
  const RenderGenerativeUi = (ui: string) => {
    switch (ui) {
      case 'budget':
        return <BudgetUi onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />
      case 'groupSize':
        return <GroupSizeUi onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />
      case 'tripDuration':
        return <SelectDays onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />
      case 'final':
        return <FinalUi viewTrip={() => console.log("Navigating...")} disable={!tripDetail} />
      default:
        return null;
    }
  }

  // Effect to detect when the conversation reaches the 'final' stage
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui == 'final') {
      setIsFinal(true);
      setUserInput('Ok, Great!');
    }
  }, [messages])

  // Automatically trigger onSend once the 'final' flag is set
  useEffect(() => {
    if (isFinal && userInput === 'Ok, Great!') {
      onSend();
    }
  }, [isFinal]);

  return (
    <div className='h-[90vh] flex flex-col border shadow rounded-2xl p-5 bg-white'>
      {messages?.length == 0 && (
        <EmptyBoxState onSelectOption={(v: string) => { setUserInput(v); onSend() }} />
      )}

      {/* Message Display Area */}
      <section className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((msg: Message, index) => (
          <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`} key={index}>
            <div className={`max-w-lg px-4 py-2 rounded-2xl shadow-sm ${
              msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-black'
            }`}>
              {msg.content}
              {msg.ui && RenderGenerativeUi(msg.ui)}
            </div>
          </div>
        ))}

        {loading && (
          <div className='flex justify-start'>
            <div className='max-w-lg bg-gray-100 p-4 rounded-2xl'>
              <Loader className='animate-spin h-5 w-5 text-gray-500' />
            </div>
          </div>
        )}
      </section>

      {/* User Input Section */}
      <section className='mt-4'>
        {/* <div className='border rounded-2xl p-4 shadow-inner relative bg-gray-50 focus-within:ring-1 ring-primary transition-all'> */}
          <div className='border rounded-2xl p-4 shadow relative'>
          <Textarea 
            placeholder='Start typing here...'
            className='w-full h-12 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-sm'
              // className='w-full h-3 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <Button 
            size={'icon'} 
            className='absolute bottom-6 right-6' 
            // rounded-full transition-transform active:scale-90' 
            onClick={() => onSend()}
            disabled={loading}
          >
            <Send className='h-4 w-4' />
            {/* <Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>
//                         <Send className='h-4 w-4'/> */}
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ChatBox;