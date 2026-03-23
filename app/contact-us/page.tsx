"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Github, Linkedin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen mt-20 bg-white flex flex-col items-center px-6 py-4 font-sans">
      
      
      {/* --- SECTION 1: HEADER --- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-gray-500 mt-3 text-lg">Have questions about your next trip? Our team is here to help you plan the perfect getaway.</p>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-8">
        
        {/* --- SECTION 2: THE FORM (ON TOP) --- */}
        <Card className="shadow-2xl border-none bg-white rounded-3xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold">Send a Message</CardTitle>
            <CardDescription className="text-base">We usually respond within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Your Name" className="h-11 bg-gray-50/50 border-none rounded-2xl" />
                <Input type="email" placeholder="Email Address" className="h-11 bg-gray-50/50 border-none rounded-2xl" />
              </div>
              <Input placeholder="Subject" className="h-14 bg-gray-50/50 border-none rounded-2xl" />
              <Textarea placeholder="Tell us more about your travel plans..." className="min-h-120px bg-gray-50/50 border-none rounded-2xl  p-4" />
              <Button className="w-full bg-primary h-11 text-lg font-bold rounded-2xl shadow-lg transition-all active:scale-95 flex gap-2">
                
                Send Message <Send size={15}/>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* --- SECTION 3: INFO CARDS (BELOW THE FORM) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Email Card */}
          <div className="flex items-center gap-5 p-8 bg-orange-50/40 rounded-[32px] border border-orange-100/50 transition-all hover:shadow-md">
            <div className="p-4 bg-white rounded-2xl text-orange-600 shadow-sm border border-orange-50">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">Email Us</h3>
              <p className="text-gray-500 font-medium">support@vaycayai.com</p>
            </div>
          </div>

          {/* Socials Card */}
          <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 transition-all hover:shadow-md">
            <h3 className="font-bold text-xl mb-5 text-gray-900">Follow Our Journey</h3>
            <div className="flex gap-4">
              <a href="#" className="p-4 bg-white rounded-2xl shadow-sm text-gray-700 hover:text-orange-600 transition-all hover:-translate-y-1 border border-gray-100">
                <Github size={24} />
              </a>
              <a href="#" className="p-4 bg-white rounded-2xl shadow-sm text-gray-700 hover:text-blue-600 transition-all hover:-translate-y-1 border border-gray-100">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* --- SECTION 4: FAQ --- */}
      <div className="mt-24 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 font-sans">FAQ</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border rounded-2xl px-6 bg-white shadow-sm">
            <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline">Is Vaycay AI available globally?</AccordionTrigger>
            <AccordionContent className="text-gray-500 pb-5">
              Yes, our AI can generate itineraries for any destination indexed by Google Places API worldwide.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border rounded-2xl px-6 bg-white shadow-sm">
            <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline">How do I access my saved trips?</AccordionTrigger>
            <AccordionContent className="text-gray-500 pb-5">
              Simply log in to your account and navigate to the 'My Trips' dashboard to see all your previous generations.
            </AccordionContent>
          </AccordionItem>
       
        
              <AccordionItem value="item-3" className="border rounded-2xl px-6 bg-white shadow-sm transition-all hover:shadow-md">
                <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline text-gray-900">
                  Where does the travel data come from?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-5 leading-relaxed">
                  We fetch real-time data from the Google Places API to ensure all locations, ratings, and photos are up-to-date. This is then processed by our AI to create a logical and time-efficient itinerary for your trip.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-2xl px-6 bg-white shadow-sm">
                <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline text-gray-900">
                  Does the AI consider my budget and travel style?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-5 leading-relaxed">
                  Yes. Before generating, you can select your budget (Cheap, Moderate, or Luxury) and your "Traveler" type (Solo, Couple, Family, or Friends). The AI then filters its suggestions to match your specific needs.
                </AccordionContent>
              </AccordionItem>
              </Accordion>
      </div>

      {/* --- SECTION 5: FOOTER --- */}
      <footer className="mt-32 pt-10 border-t w-full max-w-4xl text-center">
        <p className="text-gray-400 text-sm font-medium">
          © {new Date().getFullYear()} Vaycay AI. All rights reserved. 
        </p>
        
      </footer>
    </div>
  );
}