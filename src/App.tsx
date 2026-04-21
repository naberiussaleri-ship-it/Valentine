/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Heart, Music, Camera, BookHeart, Stars, Gift, Sparkles, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const IMAGE_PLACEHOLDERS = [
  "https://picsum.photos/seed/love-1/800/600",
  "https://picsum.photos/seed/love-2/800/600",
  "https://picsum.photos/seed/love-3/800/600",
  "https://picsum.photos/seed/love-4/800/600",
  "https://picsum.photos/seed/love-5/800/600",
];

const STORY_CHAPTERS = [
  {
    title: "How It All Started",
    date: "The First Day",
    text: "I still remember the first time I saw you. Everything else seemed to fade into the background. You were the sparked that lit up my world.",
    icon: <Stars className="w-8 h-8 text-theme-accent-deep" />,
    image: "https://picsum.photos/seed/romance1/600/400"
  },
  {
    title: "Our Favorite Place",
    date: "The Sunny Afternoon",
    text: "The coffee shop where we spent hours talking about nothing and everything. Every laugh we shared made me realize you were the one.",
    icon: <MapPin className="w-8 h-8 text-theme-accent-deep" />,
    image: "https://picsum.photos/seed/romance2/600/400"
  },
  {
    title: "Growing Together",
    date: "Every Single Day",
    text: "Every challenge we faced only made us stronger. I love the way we support each other and grow more in love every day.",
    icon: <BookHeart className="w-8 h-8 text-theme-accent-deep" />,
    image: "https://picsum.photos/seed/romance3/600/400"
  }
];

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "110vh",
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: "-10vh",
            x: `${(Math.random() - 0.5) * 20}vw`
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute text-theme-soft-blur/50"
        >
          <Heart fill="currentColor" size={Math.random() * 20 + 20} />
        </motion.div>
      ))}
    </div>
  );
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn("Autoplay blocked or file not found:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const { scrollYProgress } = useScroll();

  return (
    <div className="relative min-h-screen overflow-x-hidden text-theme-text selection:bg-theme-accent-deep selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-theme-soft-blur rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-[500px] h-[500px] bg-white rounded-full blur-3xl opacity-40"></div>
        <FloatingHearts />
      </div>

      <nav className="absolute top-8 left-8 md:left-12 z-20">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-theme-accent-light">Valentine's 2026</span>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-8 md:px-[8%]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="z-10"
        >
          <h1 className="text-[70px] md:text-[110px] leading-[0.85] font-serif italic tracking-tighter text-theme-accent-deep">
            Our<br />&nbsp;&nbsp;Beautiful<br />Story.
          </h1>
          <p className="mt-8 ml-2 md:ml-4 max-w-xs text-[11px] md:text-sm leading-relaxed text-theme-accent-meta opacity-80 uppercase tracking-[0.2em] font-bold">
            A collection of moments that mean everything to me.
          </p>
        </motion.div>

        {/* Decorative Floating Icon */}
        <div className="absolute top-[20%] right-[10%] md:right-[15%] text-theme-accent-light opacity-10 pointer-events-none hidden md:block">
          <Heart size={200} fill="currentColor" />
        </div>
      </section>

      {/* Music Player (Fixed at bottom right) */}
      <div className="fixed bottom-6 right-6 z-50 w-[300px] md:w-[340px] h-[100px] bg-[#1F1F1F] text-white rounded-3xl p-4 flex items-center gap-4 shadow-2xl overflow-hidden group">
        <div 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-14 h-14 md:w-16 md:h-16 bg-theme-accent-deep rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer ${isPlaying ? 'animate-pulse' : ''}`}
        >
          <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center relative">
            <div className={`w-2 h-2 bg-white rounded-full ${isPlaying ? 'animate-ping' : ''}`}></div>
            <Music className="absolute inset-0 m-auto text-white p-1 hover:scale-110 transition-transform" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 mb-1">Now Playing</p>
          <p className="text-sm font-bold truncate">Last Day on Earth</p>
          <p className="text-[10px] text-white/60">Green Day</p>
          <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: isPlaying ? "80%" : "0%" }}
              transition={{ duration: 180, ease: "linear" }}
              className="h-full bg-theme-accent-deep"
            />
          </div>
        </div>

        <audio 
          ref={audioRef}
          src="/Last Night on Earth.mp3" 
          loop
          className="hidden"
        />
      </div>

      {/* Stories Grid / Collage */}
      <section className="py-20 px-8 max-w-7xl mx-auto space-y-32">
        {STORY_CHAPTERS.map((chapter, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50, rotate: idx % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
          >
            <div className={`polaroid flex-1 w-full max-w-lg ${idx % 2 === 0 ? 'rotate-2' : '-rotate-1 hover:rotate-0'}`}>
              <div className="w-full aspect-[4/5] bg-theme-soft-blur overflow-hidden">
                <img 
                  src={chapter.image} 
                  alt={chapter.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-6 font-serif italic text-center text-xl md:text-2xl text-theme-text tracking-tight">
                {chapter.title}
              </p>
            </div>

            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-4">
                <div className="h-[1px] w-8 bg-theme-accent-light/50"></div>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-theme-accent-light">
                  {chapter.date}
                </span>
              </div>
              <p className="font-serif italic text-2xl md:text-3xl leading-relaxed opacity-90">
                "{chapter.text}"
              </p>
              <div className="pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-theme-accent-light flex items-center justify-center">
                   {chapter.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Quote / Message Section */}
      <section className="py-32 px-8 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="glass-morphism p-10 md:p-16 rounded-[40px] text-center relative overflow-hidden"
        >
          <Sparkles className="absolute top-8 right-8 text-theme-accent-light opacity-30 w-8 h-8" />
          <p className="text-2xl md:text-4xl font-serif italic leading-relaxed text-theme-accent-meta">
            "Every day with you feels like a beautiful dream I never want to wake up from.<br className="hidden md:block" /> 
            You are my sunshine, my moon, and all my stars."
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-theme-accent-light/30"></div>
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-theme-accent-light">Always Yours</span>
            <div className="h-[1px] w-12 bg-theme-accent-light/30"></div>
          </div>
        </motion.div>
      </section>

      {/* Captured Moments */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-xs uppercase tracking-[0.5em] font-bold text-theme-accent-light">Gallery</h2>
            <div className="h-[1px] flex-1 bg-theme-accent-light/20"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {IMAGE_PLACEHOLDERS.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                className="polaroid aspect-[3/4] p-2 pb-8"
              >
                <div className="w-full h-full bg-theme-soft-blur overflow-hidden">
                  <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Memory" referrerPolicy="no-referrer" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Button */}
      <section className="py-40 text-center relative">
         <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-theme-accent-light opacity-[0.03] pointer-events-none"
         >
           <Heart size={400} fill="currentColor" />
         </motion.div>
         
         <div className="relative z-10 px-8">
           <h2 className="text-[60px] md:text-[80px] font-serif italic text-theme-accent-deep mb-12 tracking-tighter">Will you be my Valentine?</h2>
           <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-theme-accent-deep text-white px-12 py-5 rounded-full text-sm uppercase tracking-[0.3em] font-bold shadow-2xl shadow-theme-accent-deep/30 transition-all"
            >
              Forever Yes ❤️
            </motion.button>
         </div>
      </section>

      <footer className="py-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-theme-accent-light">Made for you • 2026</p>
      </footer>
    </div>
  );
}
