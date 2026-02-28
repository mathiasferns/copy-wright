import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const NoiseOverlay = () => (
  <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-[90%] max-w-5xl text-background mix-blend-difference [&.nav-scrolled]:mix-blend-normal [&.nav-scrolled]:bg-background/60 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:text-primary [&.nav-scrolled]:border [&.nav-scrolled]:border-primary/10"
    >
      <div className="font-outfit font-semibold tracking-tight text-lg">Copy Capture</div>
      <div className="hidden md:flex items-center gap-8 font-mono text-sm">
        <a href="#features" className="hover-lift">Features</a>
        <a href="#philosophy" className="hover-lift">Philosophy</a>
        <a href="#protocol" className="hover-lift">Protocol</a>
      </div>
      <button className="magnetic-btn bg-accent text-background px-5 py-2 rounded-full font-mono text-sm font-medium">
        <span className="btn-bg bg-primary"></span>
        <span className="btn-content ">Start Now</span>
      </button>
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToCTA = () => {
    const ctaElement = document.getElementById('cta');
    if (ctaElement) {
      ctaElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-6 md:px-12">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2574&auto=format&fit=crop"
          alt="Dark forest moss"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl w-full md:w-2/3">
        <h1 className="text-background flex flex-col gap-2">
          <span className="hero-text font-sans font-bold text-4xl md:text-6xl tracking-tight">
            Persuasion is the
          </span>
          <span className="hero-text font-drama italic text-7xl md:text-9xl leading-[0.85] text-background">
            Advantage.
          </span>
        </h1>
        <p className="hero-text mt-8 text-background/80 font-outfit text-lg md:text-xl max-w-xl">
          Writing copy that makes people want to buy from you. Precision language engineered for conversion.
        </p>
        <div className="hero-text mt-10">
          <button onClick={scrollToCTA} className="magnetic-btn bg-accent text-background px-8 py-4 rounded-full font-mono text-sm font-medium flex items-center gap-2">
            <span className="btn-bg bg-primary"></span>
            <span className="btn-content flex items-center gap-2">
              Enter Email Below <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, title: "Buyer Psychology", desc: "Mapping the exact triggers that make your audience choose you." },
    { id: 2, title: "Desire Engineering", desc: "Structuring arguments that build undeniable want." },
    { id: 3, title: "Friction Removal", desc: "Eliminating objections before they even arise." }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background border border-primary/10 rounded-[2rem] p-8 shadow-lg h-[400px] flex flex-col relative overflow-hidden">
      <div className="mb-6">
        <h3 className="font-sans font-bold text-2xl text-primary">Buyer Resonance</h3>
        <p className="font-outfit text-dark/70 mt-2">Write copy that makes buyers want to choose you.</p>
      </div>
      <div className="relative flex-1 mt-4">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="absolute w-full bg-white border border-primary/5 rounded-2xl p-6 shadow-sm transition-all duration-700"
            style={{
              top: `${i * 20}px`,
              scale: 1 - i * 0.05,
              opacity: 1 - i * 0.2,
              zIndex: 10 - i,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="font-mono text-xs text-accent mb-2">0{card.id}</div>
            <h4 className="font-sans font-semibold text-lg text-primary">{card.title}</h4>
            <p className="font-outfit text-sm text-dark/60 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const fullText = "Analyzing existing copy... Identifying weak value propositions... Injecting high-converting frameworks... Optimizing for industry dominance... Ready.";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        setTimeout(() => { i = 0; }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark border border-primary/20 rounded-[2rem] p-8 shadow-lg h-[400px] flex flex-col relative overflow-hidden text-background">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-sans font-bold text-2xl text-background">Industry Dominance</h3>
          <p className="font-outfit text-background/70 mt-2">Improve existing website copy to be the best.</p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          Live Feed
        </div>
      </div>
      <div className="flex-1 bg-black/50 rounded-xl p-6 font-mono text-sm text-background/80 leading-relaxed border border-white/5">
        {text}
        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
      </div>
    </div>
  );
};

const CursorProtocolScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: 120, y: 80, duration: 1, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .call(() => setActiveDay(3))
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 220, y: 180, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 })
        .call(() => setActiveDay(null));
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background border border-primary/10 rounded-[2rem] p-8 shadow-lg h-[400px] flex flex-col relative overflow-hidden">
      <div className="mb-6">
        <h3 className="font-sans font-bold text-2xl text-primary">Continuous Optimization</h3>
        <p className="font-outfit text-dark/70 mt-2">Improve your existing websites copy and newsletters.</p>
      </div>
      
      <div className="flex-1 relative mt-4">
        <div className="grid grid-cols-7 gap-2 mb-8">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-lg flex items-center justify-center font-mono text-xs transition-colors duration-300 ${activeDay === i ? 'bg-accent text-background' : 'bg-primary/5 text-primary/50'}`}
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <div className={`px-4 py-2 rounded-lg font-mono text-xs transition-colors duration-300 ${activeDay !== null ? 'bg-primary text-background' : 'bg-primary/10 text-primary/50'}`}>
            Deploy Update
          </div>
        </div>

        <div ref={cursorRef} className="absolute top-0 left-0 z-10 pointer-events-none">
          <MousePointer2 className="text-dark fill-dark w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-primary tracking-tight">
            Functional Artifacts
          </h2>
          <p className="font-outfit text-lg text-dark/60 mt-4 max-w-xl">
            We don't just write words. We engineer persuasion systems designed to capture attention and convert it into revenue.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card"><DiagnosticShuffler /></div>
          <div className="feature-card"><TelemetryTypewriter /></div>
          <div className="feature-card"><CursorProtocolScheduler /></div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.phil-line');
      gsap.from(lines, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-40 px-6 md:px-12 bg-dark overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Organic texture"
          className="w-full h-full object-cover"
          data-speed="0.5"
          loading="lazy"
          decoding="async"
        />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="phil-line font-outfit text-xl md:text-2xl text-background/60 mb-8">
          Most copywriting focuses on: generic templates and empty words.
        </p>
        <h2 className="phil-line font-drama italic text-5xl md:text-8xl text-background leading-tight">
          We focus on: <span className="text-accent">psychological resonance.</span>
        </h2>
      </div>
    </section>
  );
};

const ProtocolCard = ({ index, title, desc, children }) => {
  return (
    <div className="protocol-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-background">
      <div className="max-w-5xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="font-mono text-accent text-sm mb-6">Phase 0{index}</div>
          <h3 className="font-sans font-bold text-4xl md:text-6xl text-primary mb-6">{title}</h3>
          <p className="font-outfit text-lg text-dark/70 leading-relaxed">{desc}</p>
        </div>
        <div className="order-1 md:order-2 aspect-square bg-primary/5 rounded-[3rem] flex items-center justify-center relative overflow-hidden border border-primary/10">
          {children}
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        gsap.to(card, {
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(10px)',
        });
      });

      // Animations for SVGs
      gsap.to('.geo-rotate', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
      gsap.to('.laser-scan', { y: '100%', duration: 3, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      gsap.to('.wave-pulse', { strokeDashoffset: 0, duration: 2, repeat: -1, ease: 'power1.inOut' });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={sectionRef} className="relative bg-background">
      <ProtocolCard 
        index={1} 
        title="Discovery & Extraction" 
        desc="We mine your business for the raw materials of persuasion. Understanding your product, your market, and the exact psychological triggers of your buyers."
      >
        <svg className="w-1/2 h-1/2 geo-rotate text-primary" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="25" />
          <path d="M50 10 L50 90 M10 50 L90 50" strokeDasharray="2 4" />
        </svg>
      </ProtocolCard>
      
      <ProtocolCard 
        index={2} 
        title="Architecture" 
        desc="Structuring the argument. We build wireframes of logic and emotion, ensuring every sentence pulls the reader deeper into the funnel."
      >
        <div className="w-full h-full relative p-12">
          <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-2">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="bg-primary/20 rounded-sm"></div>
            ))}
          </div>
          <div className="laser-scan absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_rgba(204,88,51,0.8)] z-10"></div>
        </div>
      </ProtocolCard>

      <ProtocolCard 
        index={3} 
        title="Conversion" 
        desc="The final polish. Injecting power words, removing friction, and optimizing the call-to-action to maximize your conversion rate."
      >
        <svg className="w-2/3 h-2/3 text-accent" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="3">
          <path className="wave-pulse" strokeDasharray="500" strokeDashoffset="500" d="M0 50 L40 50 L50 20 L60 80 L70 50 L200 50" />
        </svg>
      </ProtocolCard>
    </section>
  );
};

const CTASection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch('https://formsubmit.co/fernsmathias@gmail.com', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <section id="cta" className="py-32 px-6 md:px-12 bg-background flex justify-center">
      <div className="max-w-4xl w-full bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2574&auto=format&fit=crop"
            alt="Texture"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="relative z-10">
          <h2 className="font-drama italic text-5xl md:text-7xl text-background mb-6">
            Ready to capture your audience?
          </h2>
          <p className="font-outfit text-background/80 text-lg mb-10 max-w-xl mx-auto">
            Enter your email address in the form below to start transforming your copy into your biggest competitive advantage.
          </p>
          
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
          >
            <input type="hidden" name="_subject" value="New Copy Capture Lead" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input 
              type="email"
              name="email"
              placeholder="Enter your email address" 
              className="flex-1 bg-background/10 border border-background/20 rounded-full px-6 py-4 text-background placeholder:text-background/50 focus:outline-none focus:border-accent font-mono text-sm transition-colors"
              required
              disabled={isSubmitted}
            />
            <button 
              type="submit" 
              disabled={isSubmitted}
              className="magnetic-btn bg-accent text-background px-8 py-4 rounded-full font-mono text-sm font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="btn-bg bg-primary"></span>
              <span className="btn-content text-background group-hover:text-primary">
                {isSubmitted ? 'Notified' : 'Book a Call'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-background pt-20 pb-10 px-6 md:px-12 rounded-t-[4rem] mt-[-2rem] relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <h3 className="font-outfit font-semibold text-2xl mb-4">Copy Capture</h3>
            <p className="font-outfit text-background/60 max-w-sm">
              Writing copy that makes people want to buy from you.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs text-background/40 mb-6 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4 font-outfit text-background/80">
              <li><a href="#features" className="hover:text-accent transition-colors">Features</a></li>
              <li><a href="#philosophy" className="hover:text-accent transition-colors">Philosophy</a></li>
              <li><a href="#protocol" className="hover:text-accent transition-colors">Protocol</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs text-background/40 mb-6 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 font-outfit text-background/80">
              <li><a href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs text-background/40">
            &copy; {new Date().getFullYear()} Copy Capture. All rights reserved.
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-background/60 bg-background/5 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            System Operational
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="bg-background min-h-screen selection:bg-accent selection:text-background">
      <NoiseOverlay />
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;