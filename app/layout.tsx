import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";



export const metadata: Metadata = {
  title: "Vaycay AI - Your Smart Travel Planner",
  description: "Plan your dream vacation effortlessly with the power of AI",
};
const outfit=Outfit({subsets:['latin']})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <ConvexClientProvider>
        {children}
        </ConvexClientProvider>
       
      </body>
    </html>
    </ClerkProvider>
  );
}



// new code----------------------------------



// import type { Metadata } from "next";
// import { Outfit } from "next/font/google";
// import "./globals.css";
// import Provider from "./provider";
// import { 
//   ClerkProvider, 
//   SignInButton, 
//   SignUpButton, 
//   SignedIn, 
//   SignedOut, 
//   UserButton 
// } from "@clerk/nextjs";

// export const metadata: Metadata = {
//   title: "Vaycay AI",
//   description: "AI-Powered Personalized Trip Planner",
// };

// const outfit = Outfit({ subsets: ['latin'] });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body className={outfit.className}>
//           <header className="flex justify-end items-center p-4 gap-4 h-16">
//             {/* Show buttons when signed out */}
//             <SignedOut>
//               <SignInButton mode="modal" />
//               <SignUpButton mode="modal">
//                 <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </SignedOut>

//             {/* Show user profile when signed in */}
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </header>

//           <Provider>
//             {children}
//           </Provider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }



