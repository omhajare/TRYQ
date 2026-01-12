import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, Check, X, Phone, Star, Zap, Briefcase, ChevronRight, Play, Layers, Cpu, Award, AlertTriangle, AlertOctagon, Plus, Minus, Menu, MessageCircle, Mail, Lock, Headset, FileText, Receipt } from "lucide-react";
import confetti from "canvas-confetti";

// --- Hooks ---

const useScrollReveal = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// --- Components ---

const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/919823782121?text=Hi%2C%20I%20am%20interested%20in%20the%20Video%20Mastery%20Program"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white fill-white group-hover:scale-110 transition-transform" />
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
    </a>
  );
};

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string, sectionIndex?: number) => void;
}

const Navbar: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleEnrollClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#EA580C', '#FFFFFF'], 
      disableForReducedMotion: true,
      scalar: 0.8
    });
  };

  const navLinks = [
    { name: 'Reality', href: '#reality' },
    { name: 'About Us', href: '#comparison' },
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (currentPage !== 'home') {
        onNavigate('home');
        // Allow time for Home component to mount
        setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo - Navigates to Home */}
        <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('home'); window.scrollTo(0,0); }} 
            className="block z-50"
        >
            <img src="logo.png" alt="TRYQ Logo" className="h-14 object-contain" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
                <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-oswald font-medium uppercase tracking-widest text-gray-400 hover:text-tryqGold transition-colors duration-300 relative group cursor-pointer"
                >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tryqGold transition-all duration-300 group-hover:w-full"></span>
                </a>
            ))}
        </div>

        <div className="flex items-center gap-4">
            {/* Desktop Enroll Button */}
            <a 
              href="https://wa.me/919823782121?text=Hi%2C%20I%20am%20interested%20in%20the%20Video%20Mastery%20Program" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleEnrollClick}
              className="hidden md:flex items-center gap-2 bg-white text-black font-oswald font-bold px-6 py-2.5 rounded-full hover:bg-tryqGold transition-all duration-300 transform hover:scale-105 uppercase tracking-wide text-sm"
            >
              Enroll Now <ArrowRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle */}
            <button 
                className="lg:hidden p-2 text-white/80 hover:text-white z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 w-full bg-black/95 backdrop-blur-3xl z-40 flex flex-col items-center py-12 border-b border-white/10 shadow-2xl animate-shutter">
            <div className="flex flex-col items-center gap-6 w-full max-w-md px-6">
                {navLinks.map((link, index) => (
                    <a 
                        key={link.name} 
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-xl font-oswald font-medium text-gray-300 hover:text-white transition-colors tracking-widest"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {link.name}
                    </a>
                ))}
                
                <a 
                  href="https://wa.me/919823782121?text=Hi%2C%20I%20am%20interested%20in%20the%20Video%20Mastery%20Program"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                      handleEnrollClick();
                      setIsMobileMenuOpen(false);
                  }}
                  className="mt-6 px-8 py-3 w-full text-center bg-gradient-to-r from-tryqBlue to-purple-600 text-white font-oswald font-bold text-lg rounded-full hover:scale-105 transition-transform uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  Enroll Now <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </div>
      )}
    </nav>
  );
};

const HeroBackground = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    // Resize handler
    const handleResize = () => {
       w = canvas.width = window.innerWidth;
       h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class Star {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      brightness: number;
      
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.brightness = Math.random();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
        
        // Twinkle
        this.brightness += (Math.random() - 0.5) * 0.05;
        this.brightness = Math.max(0, Math.min(1, this.brightness));
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class ShootingStar {
        x: number;
        y: number;
        speed: number;
        len: number;
        angle: number;
        active: boolean;

        constructor() {
            this.x = 0;
            this.y = 0;
            this.speed = 0;
            this.len = 0;
            this.angle = 0;
            this.active = false;
            this.reset();
            this.active = false; // Start inactive
        }

        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h * 0.5; // Start mostly in top half
            this.speed = (Math.random() * 10) + 15;
            this.len = (Math.random() * 80) + 40;
            this.angle = Math.PI / 4; // Diagonal 45 degrees
            this.active = true;
        }

        update() {
            if (!this.active) {
                if (Math.random() < 0.01) this.reset(); // Spawn rate
                return;
            }
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            
            if (this.x > w + this.len || this.y > h + this.len) {
                this.active = false;
            }
        }

        draw() {
            if (!this.active || !ctx) return;
            
            // Create gradient tail
            const gradient = ctx.createLinearGradient(
                this.x, this.y, 
                this.x - Math.cos(this.angle) * this.len, 
                this.y - Math.sin(this.angle) * this.len
            );
            gradient.addColorStop(0, "rgba(255, 215, 0, 1)"); // Gold head
            gradient.addColorStop(1, "rgba(255, 215, 0, 0)"); // Transparent tail
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - Math.cos(this.angle) * this.len, this.y - Math.sin(this.angle) * this.len);
            ctx.stroke();
            
            // Draw glowing head
            ctx.fillStyle = "rgba(255, 215, 0, 1)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const stars = Array.from({ length: 150 }, () => new Star());
    const shootingStars = Array.from({ length: 4 }, () => new ShootingStar());

    let animationId: number;
    const animate = () => {
        ctx.clearRect(0, 0, w, h);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        shootingStars.forEach(ss => {
            ss.update();
            ss.draw();
        });

        animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
    };

  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

const Hero = () => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Parallax Background Wrapper */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        {/* Animated Background */}
        <HeroBackground />
        
        {/* Subtle Glow Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
           <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-tryqOrange/10 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-tryqGold/5 rounded-full blur-[120px]"></div>
        </div>
      </div>
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center">
        
        <div className="mb-8 md:mb-12 animate-fade-in-up w-full">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-tryqGold font-mono text-[10px] md:text-xs uppercase tracking-widest mb-6">
            Video Mastery Program
          </span>
          
          <h1 className="flex flex-col items-center justify-center w-full">
            <span className="text-4xl sm:text-5xl md:text-6xl font-oswald font-bold text-gray-300 uppercase tracking-tighter leading-none mb-2">
              You Don't Need
            </span>
            {/* Updated Gradient to Orange/Gold with responsive sizing to fill screen */}
            <span className="text-[26vw] md:text-[14rem] leading-[0.8] font-oswald font-bold text-transparent bg-clip-text bg-gradient-to-b from-tryqGold to-tryqOrange uppercase tracking-tighter scale-y-110 my-2 md:my-4 animate-flicker drop-shadow-[0_0_35px_rgba(255,165,0,0.6)]">
              LAKHS
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl font-oswald font-bold text-gray-300 uppercase tracking-tighter leading-none mb-4">
              To Learn
            </span>
            {/* Updated text to be Uppercase and added Gold Shimmer Animation */}
            <span className="text-[14vw] md:text-[8rem] leading-[0.9] font-serif uppercase text-transparent bg-clip-text bg-[linear-gradient(to_right,#FFD700,#FDB931,#FFFFFF,#FDB931,#FFD700)] bg-[length:200%_auto] animate-text-shimmer drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              Creativity
            </span>
          </h1>
        </div>

        <p className="text-gray-400 text-base md:text-xl max-w-xl mx-auto mb-8 md:mb-10 font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Skip the theory. Master the tools. <span className="text-white font-medium">Build a career in 3 stages.</span>
        </p>

        {/* New Dual CTA Buttons - WhatsApp and Call */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a 
              href="https://wa.me/919823782121?text=Hi%2C%20I%20am%20interested%20in%20the%20Video%20Mastery%20Program" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-black font-oswald font-bold text-xl uppercase tracking-wider rounded-2xl hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] hover:scale-105 min-w-[300px]"
            >
              <MessageCircle className="w-7 h-7 fill-black text-black" />
              Join via WhatsApp
            </a>

            <a 
              href="tel:+919823782121"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-oswald font-bold text-xl uppercase tracking-wider rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-3 min-w-[300px]"
            >
              <Phone className="w-7 h-7" />
              Call Now
            </a>
        </div>
      </div>
    </section>
  );
};

const DarkReality = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="reality" className="py-24 scroll-mt-20 bg-[#050505] relative overflow-hidden">
      {/* Red Alert Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-tryqRed/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-tryqOrange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div ref={ref} className={`container mx-auto px-4 relative z-10 reveal-on-scroll ${isVisible ? 'reveal-visible' : ''}`}>
        
        {/* Redesigned Layout */}
        <div className="flex flex-col lg:flex-row gap-32 lg:gap-16 items-start">
            
            {/* Left Column: The Problem */}
            <div className="lg:w-1/2 sticky top-24">
               <div className="flex items-center gap-3 mb-6">
                   <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-tryqRed/10 border border-tryqRed/30">
                        <AlertTriangle className="w-4 h-4 text-tryqRed animate-pulse" />
                        <span className="text-tryqRed font-mono text-xs font-bold uppercase tracking-widest">Industry Warning</span>
                   </div>
               </div>
               
               <h2 className="text-7xl md:text-9xl font-oswald font-bold uppercase leading-[0.85] mb-8 tracking-tighter">
                  <span className="text-white block">Dark</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-tryqRed via-tryqOrange to-yellow-600 drop-shadow-[0_0_20px_rgba(234,88,12,0.4)]">Reality</span>
               </h2>
               
               {/* Removed text block as requested */}
            </div>

            {/* Right Column: The Cards */}
            <div className="lg:w-1/2 grid gap-6 w-full">
                {/* Card 1: The Cost */}
                <div className="group relative bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl overflow-hidden hover:border-tryqRed/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(234,88,12,0.1)]">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertOctagon className="w-40 h-40 text-tryqRed rotate-12" />
                    </div>
                    
                    <div className="relative z-10">
                        <span className="text-tryqRed font-mono text-sm uppercase tracking-wider mb-2 block">Error: High Cost / Low Return</span>
                        <h3 className="text-6xl md:text-7xl font-oswald font-bold text-white mb-4 group-hover:text-tryqRed transition-colors">
                            ₹5 LAKH
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            The average amount wasted on traditional creative institutes for theory-based learning that became outdated 5 years ago.
                        </p>
                    </div>
                    {/* Decorative Warning Stripe */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-tryqRed to-transparent opacity-50"></div>
                </div>

                {/* Card 2: The Truth */}
                <div className="group relative bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl overflow-hidden hover:border-tryqGold/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                        <X className="w-40 h-40 text-tryqGold -rotate-12" />
                    </div>
                    
                    <div className="relative z-10">
                        <span className="text-tryqGold font-mono text-sm uppercase tracking-wider mb-2 block">Critical Failure</span>
                        <h3 className="text-5xl md:text-6xl font-oswald font-bold text-white mb-4 group-hover:text-tryqGold transition-colors">
                            THEORY != JOB
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Most institutes sell certificates. We sell the ability to walk into an agency and start working on Day 1.
                        </p>
                    </div>
                     {/* Decorative Warning Stripe */}
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-tryqGold to-transparent opacity-50"></div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="comparison" className="py-24 scroll-mt-20 bg-black relative">
       {/* Optional background element */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
           <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-tryqBlue/5 rounded-full blur-[120px]"></div>
        </div>

      <div ref={ref} className={`container mx-auto px-4 reveal-on-scroll ${isVisible ? 'reveal-visible' : ''} relative z-10`}>
        
        {/* Title Section */}
        <div className="text-center mb-16">
            <span className="text-tryqGold font-mono text-sm uppercase tracking-[0.3em] mb-4 block">The Mission</span>
            <h2 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase leading-none">
                Why Are We <span className="text-transparent bg-clip-text bg-gradient-to-r from-tryqGold to-tryqOrange">Here For?</span>
            </h2>
        </div>

        {/* The Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {/* Traditional - Updated colors to Orange/Amber theme */}
          <div className="p-10 rounded-[2rem] bg-[#111] border border-white/5 relative group overflow-hidden">
              <div className="absolute inset-0 bg-orange-900/5 group-hover:bg-orange-900/10 transition-colors duration-500"></div>
              <h3 className="text-2xl font-oswald text-gray-300 mb-8 uppercase tracking-wide relative z-10">Traditional Institutes</h3>
              <ul className="space-y-4 relative z-10">
                  {["Long theory classes", "Outdated syllabus", "No industry exposure", "Certificate Lie"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-500 group-hover:text-gray-400 transition-colors">
                          <X className="w-5 h-5 text-tryqRed" /> {item}
                      </li>
                  ))}
              </ul>
          </div>

          {/* TRYQ */}
          <div className="p-10 rounded-[2rem] bg-zinc-900 border border-tryqGold/20 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-tryqGold/5 to-transparent opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-tryqGold/10 blur-[80px] rounded-full"></div>
              
              <h3 className="text-3xl font-oswald text-white mb-8 uppercase tracking-wide relative z-10">
                  TRYQ <span className="text-tryqGold">Creative School</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                  {["Only earning-relevant skills", "Real tools creators use today", "Practical from Day 1", "Clear Income Roadmap"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white font-medium">
                          <div className="w-5 h-5 rounded-full bg-tryqGold flex items-center justify-center">
                              <Check className="w-3 h-3 text-black" />
                          </div> 
                          {item}
                      </li>
                  ))}
              </ul>
          </div>
        </div>

        {/* Massive Slogan Section */}
        <div className="py-16 md:py-24 relative mb-16">
             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-tryqOrange/5 blur-[100px] rounded-full pointer-events-none"></div>

             <div className="relative z-10 text-center">
                 <h3 className="flex flex-col items-center font-oswald font-bold uppercase leading-none">
                    {/* Top: Goal is to */}
                    <span className="text-lg md:text-2xl text-gray-500 tracking-[0.4em] mb-4 md:mb-6">
                        Our Goal Is To
                    </span>
                    
                    {/* Middle: Break The Record */}
                    <span className="text-5xl md:text-8xl lg:text-9xl mb-4 md:mb-6 tracking-tight drop-shadow-2xl">
                        <span className="text-tryqGold drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">
                            Break The Record
                        </span>
                    </span>

                    {/* Connector */}
                    <span className="text-xl md:text-3xl text-gray-600 font-light tracking-[0.2em] mb-8 md:mb-10">
                        — Of Training —
                    </span>

                    {/* Hero: 1 Million Individuals */}
                    <div className="relative mb-8 md:mb-12 flex flex-col items-center">
                        <span className="text-[12vw] md:text-[10rem] leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(110deg,#EA580C,45%,#FFFFFF,55%,#EA580C)] bg-[length:250%_100%] animate-text-shimmer drop-shadow-[0_0_40px_rgba(234,88,12,0.5)] scale-y-110">
                            1 MILLION
                        </span>
                        <span className="text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-[linear-gradient(110deg,#9ca3af,45%,#FFFFFF,55%,#9ca3af)] bg-[length:250%_100%] animate-text-shimmer drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] tracking-[0.1em] mt-2">
                            INDIVIDUALS
                        </span>
                    </div>

                    {/* Bottom: Get Them Placed */}
                     <div className="flex items-center gap-4 md:gap-8 text-2xl md:text-4xl text-gray-300 tracking-wide">
                        <span className="h-px w-8 md:w-24 bg-gradient-to-r from-transparent to-gray-700"></span>
                        <span>
                            & Get Them <span className="text-white font-serif italic border-b-2 border-tryqGold/50 pb-1">Placed</span>
                        </span>
                        <span className="h-px w-8 md:w-24 bg-gradient-to-l from-transparent to-gray-700"></span>
                    </div>
                 </h3>
             </div>
        </div>

        {/* Context Paragraph */}
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                TRYQ is a modern creator-first creative school built to bridge the gap between academic theory and industry reality. While traditional institutes focus on certificates and long theory classes, we focus on what actually builds careers—industry-ready skills, real projects, strong portfolios, and income clarity. Our mission is to empower the next generation of creators with not just tools like video editing, design, and AI workflows, but also the mindset, mentorship, and practical guidance required to thrive in today’s competitive digital world—so students don’t just complete a boring course,{" "}
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-tryqGold to-tryqOrange drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                    they become work-ready and earning professionals
                </span>
            </p>
        </div>

      </div>
    </section>
  );
};

const StageCard = ({ 
    number, 
    title, 
    subtitle, 
    colorClass, 
    icon: Icon, 
    roles 
}: { 
    number: string, 
    title: string, 
    subtitle: string, 
    colorClass: string, 
    icon: any, 
    roles: string[]
}) => (
    <div className="group relative bg-[#0a0a0a] rounded-[2.5rem] p-8 md:p-12 border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/10">
        {/* Background Glow */}
        <div className={`absolute top-0 right-0 w-96 h-96 ${colorClass} opacity-10 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity duration-500`}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            {/* Left Column: Header */}
            <div className="md:w-1/2 flex flex-col justify-between w-full">
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-6xl md:text-8xl font-oswald font-bold text-white/5 select-none">{number}</span>
                        <div className={`p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 ${colorClass.replace('bg-', 'text-')}`}>
                            <Icon className="w-8 h-8" />
                        </div>
                    </div>
                    {/* Font Serif (Playfair Display) */}
                    <h3 className="text-4xl font-serif font-bold text-white uppercase mb-2 tracking-wide">{title}</h3>
                    <p className={`text-xl font-serif italic ${colorClass.replace('bg-', 'text-')}`}>{subtitle}</p>
                </div>
            </div>

            {/* Right Column: Content Grid */}
            <div className="md:w-1/2 w-full">
                {/* Outcomes Box */}
                <div className="bg-gradient-to-br from-white/5 to-transparent rounded-3xl p-8 border border-white/5 hover:bg-white/10 transition-colors h-full">
                    <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Career Unlocked</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {roles.map((role, i) => (
                            <li key={i} className="flex items-center gap-3 text-white font-medium">
                                <ChevronRight className={`w-4 h-4 ${colorClass.replace('bg-', 'text-')}`} />
                                {role}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const Stages = () => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <section id="curriculum" className="py-24 scroll-mt-20 bg-black relative overflow-hidden">
            <div ref={ref} className={`container mx-auto px-4 reveal-on-scroll ${isVisible ? 'reveal-visible' : ''}`}>
                 {/* Reduced margin and adjusted spacing for tighter gap (addressed 'remove this gap') */}
                 <div className="mb-2 relative h-40 flex items-center justify-center"> 
                     <h2 className="text-5xl md:text-8xl font-oswald font-bold text-white uppercase tracking-tighter opacity-10 absolute -z-10 w-full text-center scale-150">
                        Growth System
                     </h2>
                     <div className="text-center relative z-10">
                        <span className="text-tryqGold font-mono text-sm uppercase tracking-[0.3em]">The Curriculum</span>
                        <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase mt-4">
                            3 Steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Mastery</span>
                        </h2>
                     </div>
                 </div>

                 <div className="space-y-6">
                    <StageCard 
                        number="01"
                        title="Foundation"
                        subtitle="Confidence + Clarity"
                        colorClass="bg-blue-500"
                        icon={Layers}
                        roles={["Junior Video Editor", "Social Media Designer", "Content Editor", "Digital Media Assistant"]}
                    />
                    <StageCard 
                        number="02"
                        title="Professional"
                        subtitle="Project + Direction"
                        colorClass="bg-tryqGold"
                        icon={Play}
                        roles={["Video Editor", "Agency Editor", "Brand Content Exec", "Freelance Creator"]}
                    />
                    <StageCard 
                        number="03"
                        title="Mastery"
                        subtitle="Job + Stable Freelance"
                        colorClass="bg-tryqOrange"
                        icon={Award}
                        roles={["Senior Video Editor", "Creative Producer", "AI Content Specialist", "Creative Lead"]}
                    />
                 </div>
            </div>
        </section>
    );
};

const ValueStack = () => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <section id="benefits" className="py-24 scroll-mt-20 bg-zinc-950">
            <div ref={ref} className={`container mx-auto px-4 reveal-on-scroll ${isVisible ? 'reveal-visible' : ''}`}>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase">What You Get</h2>
                        <p className="text-gray-500 mt-2">Everything you need to launch your career.</p>
                    </div>
                    <div className="hidden md:block w-32 h-1 bg-tryqGold/20"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 auto-rows-[250px]">
                    {/* Large Card */}
                    <div className="md:col-span-2 row-span-1 bg-gradient-to-r from-blue-900/20 to-black rounded-3xl p-8 border border-blue-500/20 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Briefcase className="w-32 h-32 text-blue-500" />
                        </div>
                        <h3 className="text-3xl font-oswald text-white mb-2 uppercase relative z-10">Creative Toolkit Access</h3>
                        <p className="text-blue-200/60 max-w-sm relative z-10">Full access to premium assets, templates, and libraries used by top agencies.</p>
                    </div>

                    {/* Small Card 1 - AI Resource Stack - Redesigned Swiss Style with Shimmer */}
                    <div className="relative group rounded-3xl p-[2px] overflow-hidden">
                        {/* Shimmering Border Effect */}
                        <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg_at_50%_50%,#000000_0%,#333333_50%,#FFD700_100%)] animate-spin-slow opacity-100" />
                        
                        <div className="relative h-full bg-black rounded-[22px] p-8 flex flex-col justify-between">
                            <Zap className="w-12 h-12 text-tryqGold" />
                            <h3 className="text-5xl font-oswald text-white uppercase leading-[0.85] tracking-tighter">
                                AI<br/>Resource<br/>Stack
                            </h3>
                        </div>
                    </div>

                    {/* Small Card 2 - Portfolio Package - Redesigned Swiss Style with Shimmer */}
                    <div className="relative group rounded-3xl p-[2px] overflow-hidden">
                        {/* Shimmering Border Effect - Red/Orange Theme */}
                        <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg_at_50%_50%,#000000_0%,#333333_50%,#EA580C_100%)] animate-spin-slow opacity-100" />
                        
                        <div className="relative h-full bg-black rounded-[22px] p-8 flex flex-col justify-between">
                            <Star className="w-12 h-12 text-tryqRed" />
                            <h3 className="text-5xl font-oswald text-white uppercase leading-[0.85] tracking-tighter">
                                Portfolio<br/>Package
                            </h3>
                        </div>
                    </div>

                    {/* Large Card Bottom */}
                    <div className="md:col-span-2 row-span-1 bg-gradient-to-r from-purple-900/20 to-black rounded-3xl p-8 border border-purple-500/20 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Check className="w-32 h-32 text-purple-500" />
                        </div>
                        <h3 className="text-3xl font-oswald text-white mb-2 uppercase relative z-10">Job & Freelance Setup</h3>
                        <p className="text-purple-200/60 max-w-sm relative z-10">We don't just teach. We help you set up your profiles, pricing, and client outreach.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, delay }) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer
        ${isOpen ? 'border-tryqGold/30 bg-white/10' : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'}
        backdrop-blur-md`}
      onClick={onClick}
    >
        {/* Shimmer Effect - Randomized delay for "random" feel */}
        <div 
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none animate-shimmer"
            style={{ animationDelay: `${delay}s`, animationDuration: '3s' }}
        ></div>

        <button className="relative z-10 w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none">
            <span className={`text-lg md:text-xl font-oswald uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-tryqGold' : 'text-white group-hover:text-gray-200'}`}>
                {question}
            </span>
            <div className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-tryqGold border-tryqGold text-black rotate-180' : 'bg-transparent text-white/50 group-hover:border-white/30 group-hover:text-white'}`}>
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
        </button>
        
        <div 
            className={`relative z-10 px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
        >
            <p className="text-gray-400 font-light leading-relaxed pr-8 border-l-2 border-white/10 pl-4">{answer}</p>
        </div>
    </div>
  );
};

const FAQ = () => {
    const { ref, isVisible } = useScrollReveal();
    const [openIndex, setOpenIndex] = React.useState<number | null>(0); 

    const faqs = [
        { q: "Who is this course for?", a: "This program is built for total beginners, graphic designers, social media managers, and anyone who wants to switch their career to Video Editing & Motion Graphics. No prior experience needed." },
        { q: "Do I need a high-end PC to start?", a: "A mid-range laptop (i5/Ryzen 5, 8GB+ RAM, dedicated graphics preferred) is sufficient to start. We'll guide you on hardware upgrades as you progress." },
        { q: "Is counseling free?", a: "Yes, counseling is absolutely free. We believe in guiding you first. It's best to visit our office for a detailed discussion, or you can call us to get your queries resolved." },
        { q: "What tools will I learn?", a: "You will master the industry-standard suite: Adobe Premiere Pro, After Effects, and Photoshop. Plus, we teach you the latest AI tools that agencies are using right now." },
        { q: "Do you provide job placement?", a: "Yes. We don't just teach skills; we build careers. Our 'Job & Freelance Setup' module (Stage 3) is dedicated to building your portfolio, fixing your resume, and connecting you with our hiring partners." },
        { q: "Is the course online or offline?", a: "This is an offline, hands-on mentorship program at our Pune campus. We believe creative skills are best learned in a studio environment with real-time feedback." },
        { q: "What is the duration?", a: "The program spans 3 months of intensive training. You'll move through our 3-stage Growth System: Foundation, Professional, and Mastery." }
    ];

    return (
        <section id="faq" className="py-24 scroll-mt-20 bg-zinc-950 relative overflow-hidden">
             {/* Background elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tryqGold/5 rounded-full blur-[120px] pointer-events-none"></div>

             <div ref={ref} className={`container mx-auto px-4 max-w-4xl relative z-10 reveal-on-scroll ${isVisible ? 'reveal-visible' : ''}`}>
                 <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-tryqGold font-mono text-sm uppercase tracking-[0.3em] mb-4">Common Questions</span>
                    <h2 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase leading-none">
                        Everything You <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500">Need to Know</span>
                    </h2>
                 </div>

                 <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <FAQItem 
                            key={i} 
                            question={f.q} 
                            answer={f.a} 
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            delay={Math.random() * 2} // Random delay for shimmer
                        />
                    ))}
                 </div>
             </div>
        </section>
    );
}

const Footer: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => (
  <footer id="contact" className="relative pt-24 pb-12 overflow-hidden border-t border-white/5">
    {/* Parallax-like Background */}
    <div className="absolute inset-0 bg-black z-0">
        <div className="absolute bottom-0 w-full h-full bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-tryqGold/10 via-black to-black opacity-60"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tryqGold/50 to-transparent"></div>
    </div>

    <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            {/* Office */}
            <div className="group bg-zinc-900/40 rounded-3xl p-10 text-center border border-white/5 hover:border-tryqOrange/40 hover:bg-zinc-900/60 transition-all duration-500 backdrop-blur-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-tryqOrange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-tryqOrange/10 text-tryqOrange text-xs font-bold uppercase tracking-widest mb-6 border border-tryqOrange/20">Headquarters</span>
                    <p className="text-gray-300 leading-relaxed font-light text-lg">
                        Pune, Maharashtra, India
                    </p>
                </div>
            </div>

            {/* CTA Section (Replacing Contact) */}
            <div className="group bg-zinc-900/40 rounded-3xl p-10 text-center border border-white/5 hover:border-tryqGold/40 hover:bg-zinc-900/60 transition-all duration-500 backdrop-blur-md flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-tryqGold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 w-full flex flex-col items-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-tryqGold/10 text-tryqGold text-xs font-bold uppercase tracking-widest mb-4 border border-tryqGold/20">Enroll Now</span>
                    
                    <h3 className="text-3xl font-oswald font-bold text-white mb-3 uppercase tracking-wide">
                        Ask for Free Counselling
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                        <a 
                          href="https://wa.me/919823782121?text=Hi%2C%20I%20am%20interested%20in%20the%20Video%20Mastery%20Program" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center py-4 rounded-xl bg-[#25D366] text-black font-oswald font-bold text-lg uppercase tracking-wide hover:scale-105 transition-all duration-300 shadow-lg gap-2"
                        >
                           <MessageCircle className="w-5 h-5 fill-black" />
                           WhatsApp
                        </a>
                        <a 
                          href="tel:+919823782121" 
                          className="flex items-center justify-center py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white font-oswald font-bold text-lg uppercase tracking-wide transition-all duration-300 gap-2"
                        >
                           <Phone className="w-5 h-5" />
                           Call Now
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-tryqGold/10 rounded-full blur-[80px] pointer-events-none"></div>
            {/* Removed filters to allow the colored logo to shine */}
            <img src="logo.png" alt="TRYQ Logo" className="h-28 mb-8 object-contain relative z-10" />

             {/* Added Footer Links Section */}
            <div className="flex flex-col items-center gap-6 mb-8 relative z-10 w-full max-w-4xl">
                {/* Contact Row */}
                <div className="flex flex-wrap justify-center gap-4">
                     <a href="tel:+919823782121" className="flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 border border-white/10 hover:border-tryqGold/30 hover:bg-zinc-800 transition-all duration-300 group">
                        <Phone className="w-4 h-4 text-gray-400 group-hover:text-tryqGold transition-colors" />
                        <span className="text-gray-300 font-medium text-sm">+91 98237 82121</span>
                     </a>
                     <a href="mailto:contact@tryq.in" className="flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 border border-white/10 hover:border-tryqGold/30 hover:bg-zinc-800 transition-all duration-300 group">
                        <Mail className="w-4 h-4 text-gray-400 group-hover:text-tryqGold transition-colors" />
                        <span className="text-gray-300 font-medium text-sm">contact@tryq.in</span>
                     </a>
                </div>

                {/* Legal Row */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button onClick={() => onNavigate('terms', 0)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/5 hover:border-white/20 hover:bg-zinc-800 transition-all duration-300 text-xs text-gray-400 hover:text-white group">
                        <Lock className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                        <span>Privacy Policy</span>
                    </button>
                    <button onClick={() => onNavigate('terms', 3)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/5 hover:border-white/20 hover:bg-zinc-800 transition-all duration-300 text-xs text-gray-400 hover:text-white group">
                        <Headset className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                        <span>Customer Support</span>
                    </button>
                    <button onClick={() => onNavigate('terms', 1)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/5 hover:border-white/20 hover:bg-zinc-800 transition-all duration-300 text-xs text-gray-400 hover:text-white group">
                        <FileText className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                        <span>Terms of Service</span>
                    </button>
                    <button onClick={() => onNavigate('terms', 2)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/5 hover:border-white/20 hover:bg-zinc-800 transition-all duration-300 text-xs text-gray-400 hover:text-white group">
                        <Receipt className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                        <span>Refund Policy</span>
                    </button>
                </div>
            </div>

            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] relative z-10 font-mono">
                &copy; {new Date().getFullYear()} TRYQ Creative School. All Rights Reserved.
            </p>
        </div>
    </div>
  </footer>
);

interface LegalItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
}

const LegalItem: React.FC<LegalItemProps> = ({ title, children, isOpen, onClick, delay }) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-default
        ${isOpen ? 'border-tryqGold/30 bg-white/10' : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'}
        backdrop-blur-md`}
    >
        {/* Shimmer Effect */}
        <div 
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none animate-shimmer"
            style={{ animationDelay: `${delay}s`, animationDuration: '3s' }}
        ></div>

        <button 
            className="relative z-10 w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
            onClick={onClick}
        >
            <span className={`text-lg md:text-2xl font-oswald uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-tryqGold' : 'text-white group-hover:text-gray-200'}`}>
                {title}
            </span>
            <div className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-tryqGold border-tryqGold text-black rotate-180' : 'bg-transparent text-white/50 group-hover:border-white/30 group-hover:text-white'}`}>
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
        </button>
        
        <div 
            className={`relative z-10 px-6 overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
        >
             <div className="text-gray-300 font-light leading-relaxed border-l-2 border-white/10 pl-6 space-y-4">
                {children}
             </div>
        </div>
    </div>
  );
};

const TermsOfService = ({ initialSection = 0 }: { initialSection?: number }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(initialSection);

  React.useEffect(() => {
    setOpenIndex(initialSection);
    window.scrollTo(0, 0);
  }, [initialSection]);

  const sections = [
      {
          title: "1. Privacy Policy",
          content: (
              <>
                  <p>At TRYQ, accessible from our website, one of our main priorities is the privacy of our visitors and students. This Privacy Policy document contains types of information that is collected and recorded by TRYQ and how we use it.</p>
                  
                  <div>
                      <strong className="text-white block mb-2 font-oswald tracking-wide">Consent</strong>
                      <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
                  </div>

                  <div>
                      <strong className="text-white block mb-2 font-oswald tracking-wide">Information We Collect</strong>
                      <p className="mb-2">The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information (e.g., when enrolling in a course).</p>
                      <ul className="list-disc pl-5 space-y-1">
                          <li><strong className="text-white">Registration Data:</strong> When you register for an Account or our 3-stage growth program, we may ask for your contact information, including items such as name, email address, and telephone number.</li>
                          <li><strong className="text-white">Log Files:</strong> We follow a standard procedure of using log files. The information collected includes internet protocol (IP) addresses, browser type, date and time stamp, and referring/exit pages.</li>
                      </ul>
                  </div>

                  <div>
                      <strong className="text-white block mb-2 font-oswald tracking-wide">How We Use Your Information</strong>
                      <p className="mb-2">We use the information we collect to:</p>
                      <ul className="list-disc pl-5 space-y-1">
                          <li>Provide, operate, and maintain our educational platform.</li>
                          <li>Improve, personalize, and expand our course materials.</li>
                          <li>Communicate with you regarding course updates, mentorship schedules, and support.</li>
                          <li>Find and prevent fraud.</li>
                      </ul>
                  </div>

                  <div>
                      <strong className="text-white block mb-2 font-oswald tracking-wide">Cookies</strong>
                      <p>Like any other website, TRYQ uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type.</p>
                  </div>

                  <div>
                       <strong className="text-white block mb-2 font-oswald tracking-wide">GDPR & CCPA Rights</strong>
                       <p>We respect your data rights. You have the right to request access to, correction of, or deletion of your personal data. If you wish to exercise these rights, please contact our support team.</p>
                  </div>
              </>
          )
      },
      {
          title: "2. Terms of Service",
          content: (
              <>
                  <div>
                      <strong className="text-white block mb-2 font-oswald tracking-wide">2.1 Using the Website</strong>
                      <p className="mb-2">By accessing and using the TRYQ website, you are deemed to have accepted the following terms and conditions. These terms apply to all visitors, students, and users of our platform. If you do not want to be legally bound by these terms and conditions, please do not access or use the Website.</p>
                      <p>We reserve the right to change these terms and conditions at any time to reflect changes in our services, such as updates to our training programs or legal requirements. You are advised to review these terms regularly to ensure you are aware of any changes. Your continued use of the Website after such changes are posted will be deemed agreement on your part to these terms and conditions as amended.</p>
                  </div>

                  <div>
                      <strong className="text-white block mb-2 font-oswald tracking-wide">2.2 Intellectual Property</strong>
                      
                      <div className="mb-4">
                          <strong className="text-gray-300 block mb-1">(a) Copyright and Ownership</strong>
                          <p className="mb-2">Copyright and all intellectual property rights in the content of the website and our educational materials are vested in TRYQ and reserved, unless indicated otherwise. This includes, but is not limited to:</p>
                          <ul className="list-disc pl-5 space-y-1">
                              <li>Our unique 3-stage growth program structure and curriculum.</li>
                              <li>All training modules regarding video editing, graphic design, and AI creative tools.</li>
                              <li>Project-based learning materials, templates, and student resources.</li>
                              <li>The TRYQ brand identity, logo, and "industry-ready" methodology.</li>
                          </ul>
                      </div>

                      <div className="mb-4">
                           <strong className="text-gray-300 block mb-1">(b) Permitted Use</strong>
                           <p className="mb-2">You may use the content of the Website subject to the following conditions:</p>
                           <ul className="list-disc pl-5 space-y-1">
                               <li><strong className="text-white">Educational Purpose:</strong> It is used for your personal learning and skill development only.</li>
                               <li><strong className="text-white">Non-Commercial:</strong> It is used only for your own personal, non-commercial use. You may not resell, redistribute, or white-label our course materials.</li>
                               <li><strong className="text-white">Attribution:</strong> Any copies or downloads of any content from the Website (where download is expressly permitted for students) must include a notice that copyright in the relevant material is owned by TRYQ.</li>
                           </ul>
                      </div>

                      <div>
                          <strong className="text-gray-300 block mb-1">(c) No License Grant</strong>
                          <p>Except as expressly provided above, nothing contained on this Website should be construed as conferring any license or right to use any trademark, copyright, or proprietary curriculum of TRYQ or any third party without written permission.</p>
                      </div>
                  </div>
              </>
          )
      },
      {
          title: "3. Refund Policy",
          content: (
              <>
                  <p>We are committed to providing high-quality, job-oriented training. However, we understand that sometimes circumstances change.</p>
                  
                  <div>
                      <strong className="text-white block mb-2 font-oswald tracking-wide">Refund Eligibility</strong>
                      <p>We offer a refund within 7 days of your initial purchase, provided you have not completed more than 20% of the course content.</p>
                  </div>

                  <div>
                      <strong className="text-white block mb-2 font-oswald tracking-wide">Non-Refundable Items</strong>
                      <p>Downloadable assets (such as template packs or presets) that have already been downloaded are non-refundable due to the nature of digital goods.</p>
                  </div>

                  <div>
                      <strong className="text-white block mb-2 font-oswald tracking-wide">Processing</strong>
                      <p>To request a refund, please contact our support team with your transaction details. Approved refunds are processed within 5-7 business days to the original method of payment.</p>
                  </div>
              </>
          )
      },
      {
          title: "4. Customer Support",
          content: (
              <>
                  <p>We are here to help you succeed. If you have any questions about our courses, technical issues, or legal policies, please reach out to us.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <strong className="text-white block mb-1 font-oswald tracking-wide">Email Support</strong>
                          <p className="text-tryqGold">contact@tryq.in</p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <strong className="text-white block mb-1 font-oswald tracking-wide">Response Time</strong>
                          <p>We aim to respond to all inquiries within 24-48 hours.</p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 sm:col-span-2">
                          <strong className="text-white block mb-1 font-oswald tracking-wide">Address</strong>
                          <p>TRYQ, Pune, Maharashtra, India.</p>
                      </div>
                  </div>
              </>
          )
      }
  ];

  return (
    <section className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl animate-fade-in-up">
        <div className="mb-12">
            <div className="w-48 h-4 bg-gradient-to-r from-tryqGold to-tryqOrange mb-8 rounded-full"></div>
            <h1 className="text-6xl md:text-8xl font-serif text-transparent mb-8 select-none tracking-tighter bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20">
                LEGAL & SUPPORT
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed max-w-2xl">
                Welcome to TRYQ. To ensure transparency and a smooth learning experience, we have compiled our Privacy Policy, Terms of Service, Refund Policy, and Support channels below.
            </p>
        </div>

        <div className="space-y-4">
            {sections.map((section, index) => (
                <LegalItem 
                    key={index}
                    title={section.title}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    delay={index * 0.2}
                >
                    {section.content}
                </LegalItem>
            ))}
        </div>
      </div>
    </section>
  )
}

const Home = () => (
  <>
    <Hero />
    <DarkReality />
    <Comparison />
    <Stages />
    <ValueStack />
    <FAQ />
  </>
);

const App = () => {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [legalSection, setLegalSection] = React.useState(0);

  const handleNavigate = (page: string, sectionIndex: number = 0) => {
    setCurrentPage(page);
    setLegalSection(sectionIndex);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-tryqGold selection:text-black overflow-x-hidden">
      <FloatingWhatsApp />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      {currentPage === 'home' ? <Home /> : <TermsOfService initialSection={legalSection} />}
      <Footer currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);