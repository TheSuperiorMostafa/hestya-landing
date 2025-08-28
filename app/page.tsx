'use client';

import { PhoneFrame } from '../components/PhoneFrame';
import { CreditCard, Calendar, Bell, AlertTriangle, Wrench, ArrowRight, Star, Users, Shield, Zap, Home, Building2, Settings, MessageSquare, DollarSign, TrendingDown, Globe, Award, CheckCircle, Package, Car, FileText, ShoppingCart, Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';


const flows = {
  rent: [
    '/images/flow-rent-1.png',
    '/images/flow-rent-2.png',
    '/images/flow-rent-3.png',
  ],
  amenity: [
    '/images/flow-amenity-1.png',
    '/images/flow-amenity-2.png',
    '/images/flow-amenity-3.png',
    '/images/flow-amenity-4.png',
  ],
  alerts: [
    '/images/flow-alerts-1.png',
    '/images/flow-alerts-2.png',
    '/images/flow-alerts-3.png',
    '/images/flow-alerts-4.png',
  ],
  maintenance: [
    '/images/flow-maintenance-1.png',
    '/images/flow-maintenance-2.png',
    '/images/flow-maintenance-3.png',
    '/images/flow-maintenance-4.png',
    '/images/flow-maintenance-5.png',
    '/images/flow-maintenance-6.png',
  ],
};

/**
 * DesignGapSection — Light, compact layout
 * - Sticky scrollytelling comparing Legacy vs. Hestya
 * - Tighter spacing, fewer overlays, no bottom headline
 * - Step pills moved inside the card (not absolute) for better flow
 */

const DEFAULT_LABELS = ["Dashboard", "Lease & Rent", "Amenities", "Maintenance", "Contact Management", "Package Tracking", "Pet Registration", "Utility Management", "Parking Management"];
const DEFAULT_OUTDATED = [
  "404 Not Found",
  "404 Not Found",
  "Add-On Required", 
  "Module Missing",
  "Contact Support",
  "Add-On Required",
  "Module Missing",
  "Add-On Required",
  "Module Missing",
];
const PLACEHOLDERS = [
  "/images/resident-home.png",
  "/images/new-lease.PNG",
  "/images/amenityextra.PNG",
  "/images/new-maintaince.PNG",
  "/images/new-contact.PNG",
  "/images/packageextra.PNG",
  "/images/petextra.PNG",
  "/images/utilityextra.PNG",
  "/images/parking extra.PNG",
];

const OUTDATED_IMAGES = [
  "/images/outdated.PNG",
  "/images/outdated-lease.PNG",
  "/images/outdated.PNG",
  "/images/outdated-maintaince.PNG",
  "/images/outdated-contact.PNG",
  "/images/outdated.PNG",
  "/images/outdated.PNG",
  "/images/outdated.PNG",
  "/images/outdated.PNG",
];

function DesignGapSection({
  screenshots = PLACEHOLDERS,
  outdatedScreenshots = OUTDATED_IMAGES,
  labels = DEFAULT_LABELS,
  outdatedMessages = DEFAULT_OUTDATED,
  brandName = "Hestya",
}) {
  const [current, setCurrent] = useState(0);
  const [imgOk, setImgOk] = useState(true);

  const currentShot = screenshots[current] || screenshots[screenshots.length - 1];
  const currentOutdatedShot = outdatedScreenshots[current] || outdatedScreenshots[outdatedScreenshots.length - 1];
  const currentLabel = labels[current] || labels[labels.length - 1];
  const currentOutdated = outdatedMessages[current % outdatedMessages.length];

  useEffect(() => { setImgOk(true); }, [currentShot]);

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-20">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              The Design Gap
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              See the difference between modern, intuitive design and outdated legacy platforms.
            </p>
          </div>

          {/* Step pills - moved to top of devices */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 mb-4">See yourself - try switching between different screens:</p>
            <div className="flex justify-center gap-4">
              {labels.map((label, i) => (
                <button
                  key={label + i}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    i === current
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-800"
                  }`}
                  onClick={() => setCurrent(i)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Left: Legacy Platform - Outdated Design */}
            <div className="relative">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-3xl border-2 border-red-200">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Legacy Platform - 2006</h3>
                  <p className="text-red-600 font-semibold">Outdated, Confusing Design</p>
                </div>
                
                                  <div className="relative">
                    {/* Outdated Phone Frame */}
                    <div className="relative mx-auto w-full max-w-[280px]">
                      <div className="relative aspect-[9/19.5] w-full rounded-[2.6rem] border border-black bg-black p-2 shadow-[0_16px_60px_-24px_rgba(0,0,0,0.1)]">
                        {/* Old Notch */}
                        <div className="absolute left-1/2 top-2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-black" />
                        
                                                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-white p-2">
                          <img
                            src={currentOutdatedShot}
                            alt={`Legacy – ${currentLabel}`}
                            className="h-full w-full object-cover rounded-[1.4rem]"
                          />
                        
                        {/* Error overlay - only for specific features */}
                        {(currentLabel === "Amenities" || 
                          currentLabel === "Pet Registration" || 
                          currentLabel === "Parking Management" || 
                          currentLabel === "Utility Management" || 
                          currentLabel === "Package Tracking") && (
                          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur rounded-xl p-4 text-center">
                              <div className="mb-2 flex items-center justify-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                <span className="text-sm font-semibold text-red-700">{currentLabel}</span>
                              </div>
                              <div className="text-lg font-bold text-red-800">{currentOutdated}</div>
                              <p className="text-xs text-red-600 mt-1">Feature unavailable</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Ticker background */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-5">
                    <div className="absolute left-0 right-0 top-1/3">
                      <div className="text-5xl font-black tracking-wider text-zinc-300 animate-pulse">{"404 • Not Found • ".repeat(10)}</div>
                    </div>
                    <div className="absolute left-0 right-0 top-1/2">
                      <div className="text-5xl font-black tracking-wider text-zinc-300 animate-pulse" style={{ animationDelay: "2s" }}> {"Feature Unavailable • ".repeat(8)} </div>
                    </div>
                  </div>
                </div>
                

              </div>
            </div>

            {/* Right: Hestya - Modern Design */}
            <div className="relative">
              <div className="bg-gradient-to-br from-brand/10 to-brand/5 p-8 rounded-3xl border-2 border-brand/20">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Hestya - 2024</h3>
                  <p className="text-brand font-semibold">Modern, Intuitive Design</p>
                </div>
                
                                  <div className="relative">
                    {/* Modern Phone Frame */}
                    <div className="relative mx-auto w-full max-w-[280px]">
                      <div className="relative aspect-[9/19.5] w-full rounded-[2.6rem] border border-black bg-black p-2 shadow-[0_16px_60px_-24px_rgba(0,0,0,0.2)]">
                                                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-white p-2">
                          <img
                            src={currentShot}
                            alt={`${brandName} – ${currentLabel}`}
                            className="h-full w-full object-cover rounded-[1.4rem]"
                          />
                      </div>
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
          </div>



          <div className="text-center">
            <div className="bg-gradient-to-r from-brand/10 to-red-100 p-8 rounded-3xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Choice is Clear</h3>
              <p className="text-gray-700 leading-relaxed">
                While legacy platforms still use design patterns from 2006, Hestya brings you the latest in mobile-first, 
                intuitive design that users actually want to use. The difference isn't just visual—it's about creating 
                experiences that work seamlessly in the modern world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const flowsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      
      setScrollY(Math.min(scrolled, 10000));
      setScrollProgress(progress);
      
      // Check for elements to reveal
      const elementsToReveal = document.querySelectorAll('.reveal-on-scroll, .reveal-on-scroll-left, .reveal-on-scroll-right, .reveal-on-scroll-scale');
      elementsToReveal.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
          const elementId = element.getAttribute('data-reveal-id') || element.className;
          setRevealedElements(prev => new Set([...prev, elementId]));
          element.classList.add('revealed');
        }
      });
      
      const sections = [heroRef, featuresRef, flowsRef, galleryRef];
      const currentSection = sections.findIndex((ref, index) => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      setActiveSection(currentSection >= 0 ? currentSection : 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center cosmic-bg">
        <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden cosmic-bg">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cosmic Background with Dynamic Effects */}
      <div 
        className="fixed inset-0 -z-10 cosmic-bg"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(49,221,194,0.1) 0%, transparent 50%),
                       radial-gradient(circle at ${window.innerWidth - mousePosition.x}px ${window.innerHeight - mousePosition.y}px, rgba(147,51,234,0.1) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Cosmic Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
            }}
          />
        ))}
      </div>

      {/* Meteor Shower Effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-brand to-purple-500 rounded-full animate-meteorShower"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Navigation with Parallax */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
        style={{
          transform: `translateY(${scrollY > 100 ? 0 : -100}px)`,
          opacity: scrollY > 100 ? 1 : 0
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Hestya Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900">Hestya</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection(featuresRef)} className="text-gray-600 hover:text-brand transition-colors font-medium">Features</button>
              <button onClick={() => scrollToSection(flowsRef)} className="text-gray-600 hover:text-brand transition-colors font-medium">Flows</button>
              <button onClick={() => scrollToSection(galleryRef)} className="text-gray-600 hover:text-brand transition-colors font-medium">Gallery</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Cosmic Effects */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center pt-20 relative parallax-container">
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="text-center space-y-12">
            <div className="space-y-6 blur-in-stagger">
              <h1 
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-900 via-brand to-gray-900 bg-clip-text text-transparent leading-tight animate-gradient reveal-on-scroll"
                data-reveal-id="hero-title"
                style={{
                  transform: `translateY(${scrollY * 0.2}px) perspective(1000px) rotateX(${scrollY * 0.01}deg)`
                }}
              >
                The Future of
                <br />
                Community Living
              </h1>
              <p 
                className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed reveal-on-scroll"
                data-reveal-id="hero-description"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`
                }}
              >
                Eliminate costly middlemen and fragmented software. Hestya is the first truly mobile-first 
                community operating system that cuts costs by up to 25x while building stronger, 
                more connected neighborhoods.
              </p>
            </div>
            
            <div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center reveal-on-scroll animate-blurInUp"
              data-reveal-id="hero-cta"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`
              }}
            >
              <button 
                onClick={() => scrollToSection(featuresRef)}
                className="group bg-brand text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand/90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 magnetic-button"
              >
                <span>Explore Features</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Hero Phone Mockups with Cosmic Parallax */}
            <div 
              className="flex justify-center items-center space-x-12 mt-20 reveal-on-scroll-scale blur-in-stagger"
              data-reveal-id="hero-phones"
              style={{
                transform: `translateY(${scrollY * -0.1}px) perspective(1000px) rotateY(${scrollY * 0.005}deg)`
              }}
            >
              <div className="transform hover:scale-110 transition-transform duration-500 animate-cosmicFloat">
                <PhoneFrame
                  src="/images/resident-home.png"
                  alt="Resident home screen"
                  delay={0.1}
                />
              </div>
              <div className="transform hover:scale-110 transition-transform duration-500 animate-cosmicFloat">
                <PhoneFrame
                  src="/images/admin-dashboard.png"
                  alt="Admin dashboard screen"
                  delay={0}
                />
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Cost Savings Full Screen Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand via-brand/90 to-brand/80 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
          style={{
            transform: `translateX(${scrollY * 0.05}px)`
          }}
        />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-6xl mx-auto space-y-12 blur-in-stagger">
            <h1 
              className="text-8xl md:text-[12rem] font-bold reveal-on-scroll"
              data-reveal-id="cost-savings-title"
              style={{
                transform: `translateY(${scrollY * 0.5}px) translateX(${Math.sin(scrollY * 0.01) * 20}px) perspective(1000px) rotateX(${scrollY * 0.03}deg) rotateY(${Math.cos(scrollY * 0.008) * 5}deg) scale(${1 + Math.sin(scrollY * 0.005) * 0.1})`,
                filter: `blur(${Math.abs(Math.sin(scrollY * 0.02)) * 2}px)`,
                opacity: `${0.8 + Math.sin(scrollY * 0.01) * 0.2}`
              }}
            >
              <span 
                className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent animate-gradient"
                style={{
                  backgroundPosition: `${scrollY * 0.5}% 50%`,
                  textShadow: `0 0 ${20 + Math.sin(scrollY * 0.01) * 10}px rgba(255, 255, 255, 0.5)`
                }}
              >
                Up to 25x Cheaper
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Problem Statement Section with Reveal Effects */}
      {/* Problem We Solve Section - Enhanced */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-orange-500/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-20">
            <div className="space-y-8">
              <h2 
                className="text-5xl md:text-7xl font-bold text-gray-900 reveal-on-scroll"
                data-reveal-id="problem-title"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005) * 10}px)`,
                  textShadow: '0 0 50px rgba(239, 68, 68, 0.1)'
                }}
              >
                The <span className="text-red-600">Problem</span> We Solve
              </h2>
              <p 
                className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto reveal-on-scroll leading-relaxed"
                data-reveal-id="problem-description"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005 + 0.5) * 5}px)`
                }}
              >
                Today's communities face critical challenges that cost residents and owners millions annually.
                <br className="hidden md:block" />
                These problems are solvable with the right technology.
              </p>
              
              {/* Problem Stats */}
              <div className="flex justify-center">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-lg border border-red-200">
                  <span className="text-2xl">💸</span>
                  <span className="text-lg font-semibold text-gray-900">$2.3B+ wasted annually</span>
                  <span className="text-red-600 font-bold">→</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div 
                className="group relative p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-3xl border border-red-200 reveal-on-scroll-left interactive-card hover:shadow-2xl transition-all duration-500"
                data-reveal-id="problem-1"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005) * 10}px)`
                }}
              >
                {/* Problem Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-red-700 mb-4">
                  Outdated, Fragmented Software
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Legacy platforms like AppFolio and Yardi are desktop-first, hard to use, and require 
                  multiple third-party subscriptions just to handle basics like payments, amenities, 
                  and communication.
                </p>
                
                {/* Problem Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Desktop-only interfaces from 2006
                  </div>
                  <div className="flex items-center text-sm text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    5+ separate apps needed for basic functions
                  </div>
                  <div className="flex items-center text-sm text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    $200-500/month in additional software costs
                  </div>
                </div>
                
                {/* Impact Badge */}
                <div className="mt-6 inline-block bg-red-500/10 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-red-700 border border-red-200">
                  Impact: 73% user frustration rate
                </div>
              </div>
              
              <div 
                className="group relative p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl border border-orange-200 reveal-on-scroll-right interactive-card hover:shadow-2xl transition-all duration-500"
                data-reveal-id="problem-2"
                style={{
                  transform: `translateY(${Math.cos(scrollY * 0.005) * 10}px)`
                }}
              >
                {/* Problem Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-orange-700 mb-4">
                  Costly Middlemen
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Property management firms take 8-12% of monthly rent, while households pay up to 
                  $50 per month for scattered services, adding layers of inefficiency and expense.
                </p>
                
                {/* Problem Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-orange-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    8-12% of rent goes to management fees
                  </div>
                  <div className="flex items-center text-sm text-orange-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    $50/month per household for scattered services
                  </div>
                  <div className="flex items-center text-sm text-orange-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Multiple communication layers slow everything down
                  </div>
                </div>
                
                {/* Impact Badge */}
                <div className="mt-6 inline-block bg-orange-500/10 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-orange-700 border border-orange-200">
                  Impact: $600/year average waste per unit
                </div>
              </div>
            </div>
            
            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur rounded-full px-8 py-4 shadow-xl border border-red-200">
                <span className="text-2xl">🚀</span>
                <span className="text-lg font-semibold text-gray-900">Ready to solve these problems?</span>
                <span className="text-red-600 font-bold">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Comparison Section */}
      <DesignGapSection />

      {/* Horizontal Scrolling Features Section with Orbit Effects */}
      <section ref={featuresRef} className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-20">
            <div className="space-y-8 text-center">
              <h2 
                className="text-5xl md:text-7xl font-bold text-gray-900 reveal-on-scroll"
                data-reveal-id="features-title"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005) * 10}px)`,
                  textShadow: '0 0 50px rgba(102, 126, 234, 0.1)'
                }}
              >
                All-in-One <span className="text-brand">Community OS</span>
              </h2>
              <p 
                className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto reveal-on-scroll leading-relaxed"
                data-reveal-id="features-description"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005 + 0.5) * 5}px)`
                }}
              >
                Everything your community needs in one modern, mobile-first platform. 
                <br className="hidden md:block" />
                No more fragmented software or costly middlemen.
              </p>
              

            </div>

            {/* Enhanced Interactive Features Grid */}
            <div className="relative max-w-7xl mx-auto">
              {/* Scroll Progress Indicator */}
              <div className="mb-8 flex justify-center">
                <div className="w-full max-w-2xl bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand to-purple-500 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(100, Math.max(0, (scrollY - 200) / 10))}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Interactive Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: CreditCard,
                    title: "Lease & Rent Management",
                    description: "Secure payment tracking with transparent billing and automated reminders",
                    color: "from-blue-500 to-purple-600",
                    gradient: "bg-gradient-to-br from-blue-500/10 to-purple-600/10",
                    features: ["Automated billing", "Payment history", "Late fee tracking"]
                  },
                  {
                    icon: Calendar,
                    title: "Amenity Booking & QR Codes",
                    description: "Frictionless access with QR codes and smart scheduling system",
                    color: "from-green-500 to-teal-600",
                    gradient: "bg-gradient-to-br from-green-500/10 to-teal-600/10",
                    stats: "Instant QR generation",
                    features: ["Smart scheduling", "QR access", "Usage analytics"]
                  },
                  {
                    icon: Bell,
                    title: "Real-Time Alerts",
                    description: "Instant notifications for emergencies and community updates",
                    color: "from-orange-500 to-red-600",
                    gradient: "bg-gradient-to-br from-orange-500/10 to-red-600/10",
                    stats: "< 30 second delivery",
                    features: ["Emergency alerts", "Community updates", "Custom notifications"]
                  },
                  {
                    icon: Wrench,
                    title: "Maintenance Tracking",
                    description: "Real-time updates for staff and residents on repair requests",
                    color: "from-purple-500 to-pink-600",
                    gradient: "bg-gradient-to-br from-purple-500/10 to-pink-600/10",
                    stats: "24/7 tracking",
                    features: ["Photo uploads", "Status updates", "Vendor management"]
                  },
                  {
                    icon: Package,
                    title: "Package & Pet Registration",
                    description: "Streamline community operations with digital registration system",
                    color: "from-indigo-500 to-blue-600",
                    gradient: "bg-gradient-to-br from-indigo-500/10 to-blue-600/10",
                    stats: "Digital verification",
                    features: ["Package tracking", "Pet profiles", "Digital records"]
                  },
                  {
                    icon: Car,
                    title: "Visitor & Parking Management",
                    description: "Improve safety and access control throughout the community",
                    color: "from-yellow-500 to-orange-600",
                    gradient: "bg-gradient-to-br from-yellow-500/10 to-orange-600/10",
                    stats: "Enhanced security",
                    features: ["Visitor passes", "Parking permits", "Access logs"]
                  },
                  {
                    icon: FileText,
                    title: "Utility Management",
                    description: "Track payments and usage with integrated billing system",
                    color: "from-teal-500 to-green-600",
                    gradient: "bg-gradient-to-br from-teal-500/10 to-green-600/10",
                    stats: "Usage analytics",
                    features: ["Bill tracking", "Usage monitoring", "Payment integration"]
                  },
                  {
                    icon: ShoppingCart,
                    title: "Community Marketplace",
                    description: "Nextdoor-style chat, lost & found, and buy/sell features",
                    color: "from-pink-500 to-red-600",
                    gradient: "bg-gradient-to-br from-pink-500/10 to-red-600/10",
                    stats: "Community engagement",
                    features: ["Local marketplace", "Community chat", "Lost & found"]
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className={`group relative p-6 rounded-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 interactive-card ${feature.gradient} border border-white/20 backdrop-blur-sm cursor-pointer`}
                    style={{
                      transform: `translateY(${Math.sin(scrollY * 0.005 + index * 0.3) * 8}px) rotateY(${scrollY * 0.001 * (index % 2 === 0 ? 1 : -1)}deg)`,
                      animationDelay: `${index * 0.1}s`
                    }}
                    onClick={() => {
                      // Smooth scroll to section when clicked
                      const element = document.getElementById(`feature-${index}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                  >
                    {/* Feature Icon */}
                    <div className="mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    {/* Feature Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    
                    {/* Stats Badge */}
                    <div className="inline-block bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-brand border border-brand/20 mb-3">
                      {feature.stats}
                    </div>
                    
                    {/* Feature List */}
                    <div className="space-y-1">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-brand rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    {/* Click Indicator */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Interactive Flows Section with Black Hole Effects */}
      <section ref={flowsRef} className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-20">
            <div className="space-y-6">
              <h2 
                className="text-5xl md:text-6xl font-bold text-gray-900 reveal-on-scroll"
                data-reveal-id="flows-title"
                style={{
                  transform: `perspective(1000px) rotateX(${scrollY * 0.01}deg)`
                }}
              >
                See It In Action
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto reveal-on-scroll" data-reveal-id="flows-description">
                Experience the seamless user flows that make Hestya the most intuitive 
                community platform ever created.
              </p>
            </div>

            {/* Rent Flow with Parallax */}
            <div className="space-y-12">
              <h3 
                className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-4 reveal-on-scroll"
                data-reveal-id="rent-title"
                style={{
                  transform: `translateX(${scrollY * 0.05}px)`
                }}
              >
                <CreditCard className="w-8 h-8 text-brand animate-stellarPulse" />
                Paying Rent Made Simple
              </h3>
              <div 
                className="flex overflow-x-auto gap-8 py-8 scrollbar-hide"
                style={{
                  transform: `translateX(${scrollY * -0.03}px)`
                }}
              >
                {flows.rent.map((src, idx) => (
                  <div 
                    key={idx} 
                    className="shrink-0 transform hover:scale-105 transition-transform duration-300 reveal-on-scroll-scale"
                    data-reveal-id={`rent-${idx}`}
                    style={{
                      transform: `translateY(${Math.sin(scrollY * 0.008 + idx * 0.3) * 12}px)`
                    }}
                  >
                    <PhoneFrame
                      src={src}
                      alt={`Rent payment step ${idx + 1}`}
                      delay={idx * 0.1}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Amenity Flow with Reverse Parallax */}
            <div className="space-y-12">
              <h3 
                className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-4 reveal-on-scroll"
                data-reveal-id="amenity-title"
                style={{
                  transform: `translateX(${scrollY * -0.05}px)`
                }}
              >
                <Calendar className="w-8 h-8 text-brand animate-stellarPulse" />
                Book Amenities Instantly
              </h3>
              <div 
                className="flex overflow-x-auto gap-8 py-8 scrollbar-hide"
                style={{
                  transform: `translateX(${scrollY * 0.03}px)`
                }}
              >
                {flows.amenity.map((src, idx) => (
                  <div 
                    key={idx} 
                    className="shrink-0 transform hover:scale-105 transition-transform duration-300 reveal-on-scroll-scale"
                    data-reveal-id={`amenity-${idx}`}
                    style={{
                      transform: `translateY(${Math.sin(scrollY * 0.008 + idx * 0.3) * 12}px)`
                    }}
                  >
                    <PhoneFrame
                      src={src}
                      alt={`Amenity booking step ${idx + 1}`}
                      delay={idx * 0.1}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts Flow with Wave Effect */}
            <div className="space-y-12">
              <h3 
                className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-4 reveal-on-scroll"
                data-reveal-id="alerts-title"
                style={{
                  transform: `translateX(${scrollY * 0.03}px)`
                }}
              >
                <AlertTriangle className="w-8 h-8 text-brand animate-stellarPulse" />
                Emergency Alerts
              </h3>
              <div 
                className="flex overflow-x-auto gap-8 py-8 scrollbar-hide"
                style={{
                  transform: `translateX(${scrollY * -0.03}px)`
                }}
              >
                {flows.alerts.map((src, idx) => (
                  <div 
                    key={idx} 
                    className="shrink-0 transform hover:scale-105 transition-transform duration-300 reveal-on-scroll-scale"
                    data-reveal-id={`alerts-${idx}`}
                    style={{
                      transform: `translateY(${Math.sin(scrollY * 0.008 + idx * 0.3) * 12}px)`
                    }}
                  >
                    <PhoneFrame
                      src={src}
                      alt={`Emergency alert step ${idx + 1}`}
                      delay={idx * 0.1}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* And Much Much Much More Section */}
            <div className="space-y-12">
              <div className="text-center py-32 min-h-screen flex flex-col justify-center items-center">
                <h3 
                  className="text-8xl md:text-9xl lg:text-[12rem] font-black text-gray-900 reveal-on-scroll leading-none"
                  data-reveal-id="much-more-title"
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.005) * 30}px) scale(${1 + Math.sin(scrollY * 0.003) * 0.1})`,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 100px rgba(102, 126, 234, 0.3)',
                    filter: 'drop-shadow(0 0 50px rgba(102, 126, 234, 0.2))'
                  }}
                >
                  and much much much more
                </h3>

              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Complete Platform Gallery Section - Redesigned */}
      <section ref={galleryRef} className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-20">
            <div className="space-y-8">
              <h2
                className="text-5xl md:text-7xl font-bold text-gray-900 reveal-on-scroll"
                data-reveal-id="gallery-title"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005) * 10}px)`,
                  textShadow: '0 0 50px rgba(102, 126, 234, 0.1)'
                }}
              >
                Complete Platform <span className="text-brand">Gallery</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto reveal-on-scroll leading-relaxed" data-reveal-id="gallery-description">
                Explore every screen and feature of the Hestya platform. We're constantly
                adding new modules to make community living even better.
              </p>
              
              {/* Gallery Stats */}
              <div className="flex justify-center">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-lg border border-brand/20">
                  <span className="text-2xl">📱</span>
                  <span className="text-lg font-semibold text-gray-900">15+ Platform Screens</span>
                  <span className="text-brand font-bold">→</span>
                </div>
              </div>
            </div>

            {/* Gallery Categories */}
            <div className="space-y-16">
              {/* Admin Dashboard Section */}
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Powerful management tools for property administrators</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {[
                    { src: "/images/admin-dashboard.png", alt: "Admin Dashboard", title: "Main Dashboard" },
                    { src: "/images/admin-maintenance-management.png", alt: "Maintenance Management", title: "Maintenance" },
                    { src: "/images/admin-amenity-management.png", alt: "Amenity Management", title: "Amenities" }
                  ].map((image, idx) => (
                    <div 
                      key={idx} 
                      className="group relative"
                      style={{
                        transform: `translateY(${Math.sin(scrollY * 0.005 + idx * 0.5) * 8}px)`,
                        animationDelay: `${idx * 0.2}s`
                      }}
                    >
                      <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <PhoneFrame
                          src={image.src}
                          alt={image.alt}
                          delay={idx * 0.2}
                        />
                        <h4 className="text-lg font-semibold text-gray-900 mt-4 text-center">{image.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resident Experience Section */}
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Resident Experience</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Seamless mobile-first experience for residents</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {[
                    { src: "/images/resident-home.png", alt: "Resident Home", title: "Home Screen" },
                    { src: "/images/community-feed.png", alt: "Community Feed", title: "Community Feed" },
                    { src: "/images/marketplace.png", alt: "Marketplace", title: "Marketplace" }
                  ].map((image, idx) => (
                    <div 
                      key={idx} 
                      className="group relative"
                      style={{
                        transform: `translateY(${Math.sin(scrollY * 0.005 + idx * 0.5) * 8}px)`,
                        animationDelay: `${idx * 0.2}s`
                      }}
                    >
                      <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <PhoneFrame
                          src={image.src}
                          alt={image.alt}
                          delay={idx * 0.2}
                        />
                        <h4 className="text-lg font-semibold text-gray-900 mt-4 text-center">{image.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Management Tools Section */}
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Management Tools</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive tools for efficient community management</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {[
                    { src: "/images/admin-package-tracking.png", alt: "Package Tracking", title: "Package Tracking" },
                    { src: "/images/admin-contact-manager.png", alt: "Contact Manager", title: "Contact Manager" },
                    { src: "/images/admin-utility-management.png", alt: "Utility Management", title: "Utilities" },
                    { src: "/images/admin-payment-analytics.png", alt: "Payment Analytics", title: "Analytics" }
                  ].map((image, idx) => (
                    <div 
                      key={idx} 
                      className="group relative"
                      style={{
                        transform: `translateY(${Math.sin(scrollY * 0.005 + idx * 0.3) * 6}px)`,
                        animationDelay: `${idx * 0.15}s`
                      }}
                    >
                      <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                        <PhoneFrame
                          src={image.src}
                          alt={image.alt}
                          delay={idx * 0.15}
                        />
                        <h4 className="text-sm font-semibold text-gray-900 mt-3 text-center">{image.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Features Section */}
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Additional Features</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Specialized modules for complete community management</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {[
                    { src: "/images/admin-community-management.png", alt: "Community Management", title: "Community Mgmt" },
                    { src: "/images/admin-community-documents.png", alt: "Community Documents", title: "Documents" },
                    { src: "/images/admin-visitor-registration.png", alt: "Visitor Registration", title: "Visitors" },
                    { src: "/images/admin-parking-management.png", alt: "Parking Management", title: "Parking" },
                    { src: "/images/alerts-performance.png", alt: "Alerts Performance", title: "Alerts" },
                    { src: "/images/admin-dashboard.png", alt: "Dashboard Overview", title: "Overview" }
                  ].map((image, idx) => (
                    <div 
                      key={idx} 
                      className="group relative"
                      style={{
                        transform: `translateY(${Math.sin(scrollY * 0.005 + idx * 0.4) * 5}px)`,
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                        <PhoneFrame
                          src={image.src}
                          alt={image.alt}
                          delay={idx * 0.1}
                        />
                        <h4 className="text-sm font-semibold text-gray-900 mt-3 text-center">{image.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur rounded-full px-8 py-4 shadow-xl border border-brand/20">
                <span className="text-2xl">🚀</span>
                <span className="text-lg font-semibold text-gray-900">Ready to see Hestya in action?</span>
                <span className="text-brand font-bold">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Hestya Section - Enhanced */}
      <section className="py-32 bg-gradient-to-b from-white to-brand/5 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-brand/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-20">
            <div className="space-y-8">
              <h2 
                className="text-5xl md:text-7xl font-bold text-gray-900 reveal-on-scroll"
                data-reveal-id="why-title"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005) * 10}px)`,
                  textShadow: '0 0 50px rgba(102, 126, 234, 0.1)'
                }}
              >
                Why Choose <span className="text-brand">Hestya</span>?
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto reveal-on-scroll leading-relaxed" data-reveal-id="why-description">
                Transform your property management with the most advanced, cost-effective, and user-friendly platform ever created.
              </p>
            </div>

            {/* Enhanced Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: "📱",
                  title: "Revolutionary Mobile Experience",
                  description: "Built from the ground up for mobile-first users. Lightning-fast, intuitive, and beautiful across all devices.",
                  stats: "10x faster than traditional platforms",
                  color: "from-blue-500 to-purple-600",
                  gradient: "bg-gradient-to-br from-blue-500/10 to-purple-600/10"
                },
                {
                  icon: "💰",
                  title: "Unprecedented Cost Savings",
                  description: "Slash your management costs by up to 90%. No more expensive software licenses or hidden fees.",
                  stats: "Up to 90% cost reduction",
                  color: "from-green-500 to-teal-600",
                  gradient: "bg-gradient-to-br from-green-500/10 to-teal-600/10"
                },
                {
                  icon: "🎯",
                  title: "Complete Platform Solution",
                  description: "Everything you need in one place: rent collection, maintenance, amenities, HOA management, and more.",
                  stats: "15+ integrated modules",
                  color: "from-orange-500 to-red-600",
                  gradient: "bg-gradient-to-br from-orange-500/10 to-red-600/10"
                },
                {
                  icon: "🚀",
                  title: "Lightning-Fast Implementation",
                  description: "Get up and running in days, not months. Our streamlined onboarding process gets you live quickly.",
                  stats: "Live in 7 days",
                  color: "from-purple-500 to-pink-600",
                  gradient: "bg-gradient-to-br from-purple-500/10 to-pink-600/10"
                },
                {
                  icon: "🛡️",
                  title: "Enterprise-Grade Security",
                  description: "Bank-level security with SOC 2 compliance, encryption, and regular security audits.",
                  stats: "99.9% uptime guarantee",
                  color: "from-indigo-500 to-blue-600",
                  gradient: "bg-gradient-to-br from-indigo-500/10 to-blue-600/10"
                },
                {
                  icon: "🌟",
                  title: "Future-Ready Technology",
                  description: "Built with cutting-edge tech stack. AI-powered insights, real-time analytics, and continuous updates.",
                  stats: "AI-powered insights",
                  color: "from-yellow-500 to-orange-600",
                  gradient: "bg-gradient-to-br from-yellow-500/10 to-orange-600/10"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`group relative p-8 rounded-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 interactive-card reveal-on-scroll-scale ${feature.gradient} border border-white/20 backdrop-blur-sm`}
                  data-reveal-id={`why-feature-${index}`}
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.005 + index * 0.5) * 5}px)`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Feature Icon */}
                  <div className="mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-500`}>
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                  </div>
                  
                  {/* Feature Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Stats Badge */}
                  <div className="inline-block bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-brand border border-brand/20">
                    {feature.stats}
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur rounded-full px-8 py-4 shadow-xl border border-white/20">
                <span className="text-2xl">🚀</span>
                <span className="text-lg font-semibold text-gray-900">Ready to transform your property management?</span>
                <span className="text-brand font-bold">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Stellar Effects */}
      <section className="py-32 bg-gradient-to-b from-brand/5 to-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-20">
            <div className="space-y-6">
              <h2 
                className="text-5xl md:text-6xl font-bold text-gray-900 reveal-on-scroll"
                data-reveal-id="pricing-title"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005) * 10}px)`
                }}
              >
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto reveal-on-scroll" data-reveal-id="pricing-description">
                Choose the perfect plan for your community size. No hidden fees, 
                no surprises just straightforward pricing that scales with you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$3.50",
                  units: "1-200 units",
                  popular: false
                },
                {
                  name: "Standard",
                  price: "$2.75",
                  units: "200-500 units",
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "$2.00",
                  units: "500+ units",
                  popular: false
                }
              ].map((plan, index) => (
                <div 
                  key={index}
                  className={`relative p-8 rounded-3xl shadow-lg transition-all duration-500 transform hover:-translate-y-4 interactive-card reveal-on-scroll-scale ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-brand to-brand/80 text-white scale-105' 
                      : 'bg-white text-gray-900 hover:shadow-2xl'
                  }`}
                  data-reveal-id={`pricing-${index}`}
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.005 + index) * 5}px)`
                  }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-white text-brand px-4 py-2 rounded-full text-sm font-semibold animate-stellarPulse">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-80">/unit/mo</span>
                  </div>
                  <p className="text-sm opacity-80 mb-8">{plan.units}</p>
                  
                  <button className={`w-full py-3 rounded-full font-semibold transition-all duration-300 magnetic-button ${
                    plan.popular
                      ? 'bg-white text-brand hover:bg-gray-100'
                      : 'bg-brand text-white hover:bg-brand/90'
                  }`}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>

            {/* Pilot Program Notice */}
            <div className="bg-gradient-to-r from-brand/10 to-brand/5 p-8 rounded-3xl max-w-4xl mx-auto reveal-on-scroll" data-reveal-id="pilot-notice">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Pilot Program - 50% Off!</h3>
              <p className="text-gray-700">
                Join our exclusive pilot program and get 50% off your first six months on all tiers. 
                Perfect for communities ready to transform their operations and cut costs dramatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section with Cosmic Reveal */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-20">
            <div className="space-y-6">
              <h2 
                className="text-5xl md:text-6xl font-bold text-gray-900 reveal-on-scroll"
                data-reveal-id="founder-title"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005) * 10}px)`
                }}
              >
                Meet the Founder
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto reveal-on-scroll" data-reveal-id="founder-description">
                Built by someone who understands the challenges communities face.
              </p>
            </div>

            <div className="max-w-4xl mx-auto reveal-on-scroll-scale" data-reveal-id="founder-card">
              <div className="bg-white rounded-3xl shadow-xl p-12 interactive-card">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-56 h-48 rounded-full overflow-hidden shadow-xl animate-cosmicFloat">
                                  <img
                src="/images/Mostafa.webp"
                alt="Mostafa Mubarak - Founder of Hestya" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left space-y-4">
                    <h3 className="text-3xl font-bold text-gray-900">Mostafa Mubarak</h3>
                    <p className="text-lg text-gray-600">
                      Senior at the University of Kentucky studying Computer Science, Computer Engineering, 
                      and Electrical Engineering. From Alexandria, Egypt, and at 20 years old, I've built 
                      Hestya from the ground up to solve problems I saw firsthand in how communities are managed.
                    </p>
                    <p className="text-gray-700">
                      My technical background and entrepreneurial drive have allowed me to design and build 
                      a platform that's not just functional, but modern, scalable, and ready to change the 
                      way neighborhoods and apartment communities operate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Hestya Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">Hestya</span>
            </div>
            <div className="text-sm opacity-60">
              © 2025 Hestya. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}