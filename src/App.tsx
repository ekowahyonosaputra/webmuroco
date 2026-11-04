import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import HeroScene from './components/HeroScene';
import ProductScene from './components/ProductScene';
import { 
  Factory, Shield, Truck, Award, Users, Lightbulb, 
  ChevronDown, Play, ArrowRight, CheckCircle, 
  Package, Layers, Gauge, Eye, Sparkles, Box
} from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-deep-navy min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductShowcase />
      <ManufacturingProcess />
      <FactoryFacilities />
      <QualityAssurance />
      <Statistics />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
      <BackToTop />
    </div>
  );
}

/* ============ LOADING SCREEN ============ */
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-deep-navy flex flex-col items-center justify-center z-[9999]">
      <div className="relative mb-8">
        <img 
          src="https://muroco.com/wp-content/uploads/2020/09/LOGO-PUTIH-MUROCO.png" 
          alt="Muroco Logo" 
          className="h-20 w-auto animate-pulse"
        />
        <div className="absolute inset-[-8px] border-2 border-accent-orange/30 rounded-3xl animate-spin" style={{ animationDuration: '3s' }} />
      </div>
      
      <div className="text-xl font-bold mb-2">
        Muroco<span className="text-accent-orange">.</span>
      </div>
      <div className="text-white/50 text-sm mb-8">Premium Polyester Manufacturing</div>
      
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent-orange to-industrial-blue rounded-full animate-loading-bar" />
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

/* ============ HERO SECTION ============ */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* 3D Scene Background - Full prominence */}
      <HeroScene />
      
      {/* Subtle Gradient Overlays - Less opaque to show 3D animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/70 via-deep-navy/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-deep-navy/20 z-10" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 z-10" />

      {/* Hero Content - Smaller text, positioned left */}
      <div className="relative z-20 h-full flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass mb-4 sm:mb-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-orange animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/80">Premium Polyester Manufacturing</span>
            </div>

            {/* Main Heading - Smaller size */}
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-3 sm:mb-4 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <span className="text-white">ENGINEERING</span>
              <br />
              <span className="gradient-text">QUALITY.</span>
              <br />
              <span className="text-white">DELIVERING</span>{' '}
              <span className="text-accent-orange">EXCELLENCE.</span>
            </h1>

            {/* Subheadline */}
            <p className={`text-sm sm:text-base lg:text-lg text-white/70 max-w-lg mb-4 sm:mb-6 leading-relaxed transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              Advanced Polyester Manufacturing Solutions for Modern Industries. 
              Precision-engineered products built for performance and durability.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <a href="#products" className="group px-5 sm:px-6 py-2.5 sm:py-3 bg-accent-orange text-white font-semibold rounded-xl hover:bg-accent-orange/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent-orange/30 flex items-center justify-center gap-2 text-xs sm:text-sm">
                Explore Our Products
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="group px-5 sm:px-6 py-2.5 sm:py-3 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Discover Our Company
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-accent-orange" />
      </div>

      {/* Side Stats - Hidden on smaller screens */}
      <div className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-3 sm:gap-4 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
        {[
          { value: '20+', label: 'Years' },
          { value: '100+', label: 'Projects' },
          { value: '98%', label: 'Quality' },
        ].map((stat) => (
          <div key={stat.label} className="text-center glass rounded-xl px-2 sm:px-3 py-1.5 sm:py-2">
            <div className="text-lg sm:text-xl font-bold text-accent-orange">{stat.value}</div>
            <div className="text-[10px] sm:text-xs text-white/60">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ ABOUT SECTION ============ */
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-16 sm:py-20 lg:py-24 xl:py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <span className="text-accent-orange font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">About Our Company</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Pioneering <span className="text-accent-orange">Polyester</span> Innovation Since 2003
            </h2>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
              With over two decades of expertise in polyester manufacturing, we have established ourselves as a trusted partner for industries worldwide. Our state-of-the-art facilities combine cutting-edge technology with rigorous quality standards to deliver products that exceed expectations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Factory, text: 'Modern Factory' },
                { icon: Shield, text: 'Quality Certified' },
                { icon: Truck, text: 'Global Delivery' },
                { icon: Award, text: 'Award Winning' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 glass rounded-lg px-4 py-3">
                  <Icon className="w-5 h-5 text-accent-orange flex-shrink-0" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glass p-1">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-industrial-blue/40 to-deep-navy flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="relative z-10 text-center p-4 sm:p-8">
                    <Factory className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-accent-orange mx-auto mb-3 sm:mb-4 animate-float" />
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">State-of-the-Art Facility</h3>
                    <p className="text-sm sm:text-base text-white/60">50,000 sqm Production Area</p>
                  </div>
                  <div className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 border border-accent-orange/30 rounded-full animate-pulse" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 sm:w-32 sm:h-32 border border-industrial-blue/30 rounded-full" />
                </div>
              </div>
              <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 glass rounded-xl px-4 sm:px-6 py-3 sm:py-4 animate-float">
                <div className="text-2xl sm:text-3xl font-bold text-accent-orange">20+</div>
                <div className="text-xs sm:text-sm text-white/70">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ PRODUCT SHOWCASE ============ */
function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState<'plywood' | 'blockboard'>('plywood');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const products = {
    plywood: {
      name: 'Polyester Plywood',
      description: 'High-performance plywood with premium polyester coating. Features multi-layer construction with exceptional surface finish, moisture resistance, and structural integrity.',
      specs: ['Thickness: 3mm - 25mm', 'Surface: High-Gloss Polyester', 'Core: Multi-ply Hardwood', 'Finish: UV-Cured Coating', 'Grade: A/B/C Available'],
    },
    blockboard: {
      name: 'Polyester Blockboard',
      description: 'Premium blockboard with solid wood core strips and polyester surface coating. Ideal for furniture, partitions, and interior applications requiring dimensional stability.',
      specs: ['Thickness: 16mm - 25mm', 'Surface: Polyester Coated', 'Core: Solid Wood Strips', 'Veneer: Premium Face/Back', 'Application: Interior/Exterior'],
    }
  };

  const current = products[activeProduct];

  return (
    <section id="products" ref={ref} className="py-16 sm:py-20 lg:py-24 xl:py-32 relative bg-gradient-to-b from-deep-navy via-[#0d1825] to-deep-navy">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-accent-orange font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Our Products</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            Premium <span className="text-accent-orange">Polyester</span> Solutions
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
            Engineered for excellence, our polyester products deliver unmatched quality and performance for diverse industrial applications.
          </p>
        </div>

        {/* Product Tabs */}
        <div className={`flex justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {(['plywood', 'blockboard'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveProduct(type)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm lg:text-base transition-all duration-300 ${
                activeProduct === type
                  ? 'bg-accent-orange text-white shadow-lg shadow-accent-orange/30'
                  : 'glass text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {type === 'plywood' ? 'Polyester Plywood' : 'Polyester Blockboard'}
            </button>
          ))}
        </div>

        {/* Product Display */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* 3D Product Viewer */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden glass p-2 relative group">
              <ProductScene type={activeProduct} />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs sm:text-sm text-white/80">🖱️ Drag to rotate • Interactive 3D Model</p>
              </div>
            </div>
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 glass rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 animate-float">
              <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-accent-orange inline mr-1" />
              <span className="text-xs font-medium">Multi-Layer</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/20 mb-3 sm:mb-4">
              <Box className="w-3 h-3 sm:w-4 sm:h-4 text-accent-orange" />
              <span className="text-xs sm:text-sm text-accent-orange font-medium">{current.name}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{current.name}</h3>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">{current.description}</p>
            
            {/* Specifications */}
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {current.specs.map((spec) => (
                <div key={spec} className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent-orange flex-shrink-0" />
                  <span className="text-white/80 text-xs sm:text-sm lg:text-base">{spec}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-accent-orange text-white font-semibold rounded-xl hover:bg-accent-orange/90 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                Request Sample <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                Download Specs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ MANUFACTURING PROCESS ============ */
function ManufacturingProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const processes = [
    { num: '01', title: 'Raw Material Preparation', desc: 'Selection and preparation of premium raw materials including wood veneers, adhesives, and polyester resins.', icon: Package },
    { num: '02', title: 'Surface Preparation', desc: 'Precision sanding and surface treatment to ensure optimal bonding and finish quality.', icon: Layers },
    { num: '03', title: 'Polyester Coating', desc: 'Application of high-performance polyester coating using advanced spray and roller systems.', icon: Sparkles },
    { num: '04', title: 'Lamination Process', desc: 'Multi-layer lamination under controlled temperature and pressure for maximum bond strength.', icon: Layers },
    { num: '05', title: 'Quality Control', desc: 'Rigorous inspection at every stage including thickness, surface, and structural integrity tests.', icon: Gauge },
    { num: '06', title: 'Finishing', desc: 'Final surface treatment including polishing, edge sealing, and protective coating application.', icon: Sparkles },
    { num: '07', title: 'Packaging', desc: 'Professional packaging with protective materials ensuring safe transit and storage.', icon: Package },
    { num: '08', title: 'Warehousing & Distribution', desc: 'Organized warehouse management and efficient distribution logistics for timely delivery.', icon: Truck },
  ];

  return (
    <section id="manufacturing" ref={ref} className="py-16 sm:py-20 lg:py-24 xl:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy to-[#0d1825]" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-accent-orange font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Our Process</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 px-4">
            PRECISION IN <span className="text-accent-orange">EVERY PROCESS</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
            From raw material to finished product, every step is executed with precision and care.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline line - Hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-orange via-industrial-blue to-accent-orange opacity-30" />

          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {processes.map((process, index) => (
              <div
                key={process.num}
                className={`relative transition-all duration-1000 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Mobile/Tablet Layout */}
                <div className="lg:hidden">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-orange/20 border-2 border-accent-orange flex items-center justify-center">
                      <span className="text-accent-orange font-bold text-sm">{process.num}</span>
                    </div>
                    <div className="flex-1 glass rounded-xl p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <process.icon className="w-5 h-5 text-accent-orange" />
                        <h3 className="text-base sm:text-lg font-bold">{process.title}</h3>
                      </div>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{process.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className={`hidden lg:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-accent-orange border-4 border-deep-navy z-10 shadow-lg shadow-accent-orange/30" />

                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 xl:pr-16' : 'pl-12 xl:pl-16'}`}>
                    <div className={`glass rounded-xl p-6 hover:bg-white/5 transition-all duration-300 group ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center gap-4 mb-3 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                        <div className="w-12 h-12 rounded-lg bg-accent-orange/10 flex items-center justify-center group-hover:bg-accent-orange/20 transition-colors flex-shrink-0">
                          <process.icon className="w-6 h-6 text-accent-orange" />
                        </div>
                        <div>
                          <span className="text-accent-orange text-sm font-bold">{process.num}</span>
                          <h3 className="text-lg font-bold">{process.title}</h3>
                        </div>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{process.desc}</p>
                    </div>
                  </div>

                  {/* Empty space for other side */}
                  <div className="w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ FACTORY & FACILITIES ============ */
function FactoryFacilities() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const facilities = [
    { title: 'Production Line', desc: 'Automated production lines with precision machinery', icon: Factory, color: 'from-accent-orange/20 to-orange-900/20' },
    { title: 'Quality Lab', desc: 'Advanced testing and quality control laboratory', icon: Gauge, color: 'from-industrial-blue/20 to-blue-900/20' },
    { title: 'Warehouse', desc: '50,000 sqm climate-controlled storage facility', icon: Package, color: 'from-green-500/20 to-green-900/20' },
    { title: 'Loading Dock', desc: 'Multiple loading bays for efficient distribution', icon: Truck, color: 'from-purple-500/20 to-purple-900/20' },
    { title: 'R&D Center', desc: 'Innovation hub for product development', icon: Lightbulb, color: 'from-yellow-500/20 to-yellow-900/20' },
    { title: 'Showroom', desc: 'Product display and client consultation area', icon: Eye, color: 'from-pink-500/20 to-pink-900/20' },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 xl:py-32 relative bg-gradient-to-b from-[#0d1825] to-deep-navy">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-accent-orange font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Our Facilities</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 px-4">
            World-Class <span className="text-accent-orange">Manufacturing</span> Facilities
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
            Our integrated manufacturing campus houses everything from production to distribution under one roof.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {facilities.map((facility, index) => (
            <div
              key={facility.title}
              className={`group relative overflow-hidden rounded-2xl glass p-5 sm:p-6 hover:bg-white/5 transition-all duration-500 cursor-pointer ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${facility.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <facility.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent-orange" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{facility.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm">{facility.desc}</p>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-r-2 border-accent-orange/20 rounded-tr-2xl group-hover:border-accent-orange/50 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Large visual */}
        <div className={`mt-12 sm:mt-16 rounded-2xl overflow-hidden glass p-1 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="w-full h-48 sm:h-64 lg:h-80 xl:h-96 rounded-xl bg-gradient-to-r from-industrial-blue/30 via-deep-navy to-industrial-blue/30 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/50 to-transparent" />
            <div className="relative z-10 text-center px-4">
              <Factory className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-accent-orange mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Integrated Manufacturing Campus</h3>
              <p className="text-xs sm:text-sm lg:text-base text-white/60">Production • Quality • Storage • Distribution</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-orange to-transparent animate-shimmer" />
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-accent-orange/40" />
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-accent-orange/40" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-accent-orange/40" />
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-accent-orange/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ QUALITY ASSURANCE ============ */
function QualityAssurance() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const qualityChecks = [
    { title: 'Surface Inspection', desc: 'Automated optical inspection for surface defects', icon: Eye },
    { title: 'Thickness Measurement', desc: 'Precision laser measurement ±0.1mm accuracy', icon: Gauge },
    { title: 'Durability Testing', desc: 'Stress and impact resistance verification', icon: Shield },
    { title: 'Finish Quality', desc: 'Gloss level and color consistency analysis', icon: Sparkles },
    { title: 'Final Assurance', desc: 'Comprehensive quality certification before shipping', icon: Award },
  ];

  return (
    <section id="quality" ref={ref} className="py-16 sm:py-20 lg:py-24 xl:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-[#0a1520] to-deep-navy" />
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-accent-orange font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Quality Assurance</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 px-4">
            QUALITY IS BUILT INTO <span className="text-accent-orange">EVERY LAYER</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
            Our multi-stage quality assurance process ensures every product meets the highest international standards.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Scanner Visual */}
          <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass">
              <div className="absolute inset-4 sm:inset-6 lg:inset-8 rounded-xl bg-gradient-to-br from-[#f5f0e8] to-[#d4c5a9] shadow-2xl">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 21px)'
                }} />
              </div>
              
              <div className="absolute inset-4 sm:inset-6 lg:inset-8 scan-effect" />
              
              <div className="absolute inset-2 sm:inset-4 border-2 border-accent-orange/30 rounded-lg" />
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-accent-orange" />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-accent-orange" />
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-accent-orange" />
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-accent-orange" />

              <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs text-green-400 font-mono">SCANNING</span>
              </div>
              <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 text-[10px] sm:text-xs text-white/60 font-mono">
                QA-SYS v3.2
              </div>
            </div>
          </div>

          {/* Quality Checks */}
          <div className={`space-y-3 sm:space-y-4 transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {qualityChecks.map((check, index) => (
              <div
                key={check.title}
                className="group flex items-start gap-3 sm:gap-4 glass rounded-xl p-4 sm:p-5 hover:bg-white/5 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-orange/20 transition-colors">
                  <check.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1">{check.title}</h3>
                  <p className="text-white/60 text-xs sm:text-sm">{check.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ STATISTICS ============ */
function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 20, suffix: '+', label: 'Years of Experience', icon: Award },
    { value: 100, suffix: '+', label: 'Industrial Projects', icon: Factory },
    { value: 50, suffix: '+', label: 'Product Variations', icon: Package },
    { value: 98, suffix: '%', label: 'Quality Commitment', icon: Shield },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue/20 via-deep-navy to-industrial-blue/20" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-accent-orange/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent-orange" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 counter-value">
                {visible ? <Counter end={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
              </div>
              <div className="text-white/60 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-white/40 text-xs mt-6 sm:mt-8">* Placeholder data - easily editable</p>
      </div>
    </section>
  );
}

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <>{count}{suffix}</>;
}

/* ============ WHY CHOOSE US ============ */
function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const reasons = [
    { title: 'Advanced Manufacturing Technology', desc: 'State-of-the-art machinery and automated production systems', icon: Factory },
    { title: 'Consistent Product Quality', desc: 'Rigorous quality control at every production stage', icon: Shield },
    { title: 'Professional Production Team', desc: 'Experienced engineers and skilled technicians', icon: Users },
    { title: 'Reliable Supply Chain', desc: 'Efficient logistics ensuring on-time delivery worldwide', icon: Truck },
    { title: 'Customer-Focused Solutions', desc: 'Customized products tailored to specific requirements', icon: Lightbulb },
    { title: 'Continuous Innovation', desc: 'Ongoing R&D investment for next-generation products', icon: Award },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 xl:py-32 relative bg-gradient-to-b from-deep-navy to-[#0d1825]">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-accent-orange font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Why Choose Us</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 px-4">
            The <span className="text-accent-orange">PolyTech</span> Advantage
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`group relative glass rounded-2xl p-6 sm:p-8 hover:bg-white/5 transition-all duration-500 overflow-hidden ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-5xl sm:text-6xl font-black text-white/5 group-hover:text-accent-orange/10 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent-orange/20 to-industrial-blue/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent-orange" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{reason.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{reason.desc}</p>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-orange group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CALL TO ACTION ============ */
function CallToAction() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-16 sm:py-20 lg:py-24 xl:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-industrial-blue/30 via-deep-navy to-accent-orange/10" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 rounded-full border border-accent-orange/10" />
      <div className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-industrial-blue/10" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-accent-orange font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Get Started</span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 leading-tight text-center">
            LET'S BUILD SOMETHING <span className="text-accent-orange">BETTER TOGETHER</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8 sm:mb-10">
            Discover reliable polyester manufacturing solutions designed to meet your industry's evolving needs. Our team is ready to help you find the perfect solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a href="mailto:info@polytech.com" className="group px-6 sm:px-8 py-3 sm:py-4 bg-accent-orange text-white font-semibold rounded-xl hover:bg-accent-orange/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent-orange/30 flex items-center justify-center gap-2 text-sm sm:text-base">
              Contact Our Team
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:sales@polytech.com" className="px-6 sm:px-8 py-3 sm:py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
              Request a Quotation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ BACK TO TOP ============ */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-orange text-white flex items-center justify-center shadow-lg shadow-accent-orange/30 transition-all duration-300 hover:scale-110 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
    </button>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="bg-[#0a1520] border-t border-white/5 pt-12 sm:pt-16 pb-6 sm:pb-8 relative">
      <div className="absolute inset-0 noise-overlay" />
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Company */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <img 
                src="https://muroco.com/wp-content/uploads/2020/09/LOGO-PUTIH-MUROCO.png" 
                alt="Muroco Logo" 
                className="h-8 sm:h-10 w-auto"
              />
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              Leading polyester manufacturing company delivering premium quality products for industrial applications worldwide.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a key={social} href="#" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-accent-orange/20 transition-colors">
                  <span className="text-xs text-white/60 uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4">Products</h4>
            <ul className="space-y-2">
              {['Polyester Plywood', 'Polyester Blockboard', 'Custom Solutions', 'Raw Materials', 'Accessories'].map((item) => (
                <li key={item}>
                  <a href="#products" className="text-white/50 text-xs sm:text-sm hover:text-accent-orange transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Manufacturing */}
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4">Manufacturing</h4>
            <ul className="space-y-2">
              {['Our Process', 'Quality Assurance', 'Facilities', 'Technology', 'Certifications'].map((item) => (
                <li key={item}>
                  <a href="#manufacturing" className="text-white/50 text-xs sm:text-sm hover:text-accent-orange transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4">Contact</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-accent-orange mt-0.5 text-xs sm:text-sm">📍</span>
                <span className="text-white/50 text-xs sm:text-sm">Industrial Area, Manufacturing Zone, City 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent-orange text-xs sm:text-sm">📞</span>
                <span className="text-white/50 text-xs sm:text-sm">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent-orange text-xs sm:text-sm">✉️</span>
                <span className="text-white/50 text-xs sm:text-sm">info@polytech-industries.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent-orange text-xs sm:text-sm">🕐</span>
                <span className="text-white/50 text-xs sm:text-sm">Mon - Sat: 08:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-white/40 text-xs sm:text-sm">
            © 2024 PolyTech Industries. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="text-white/40 text-xs sm:text-sm hover:text-accent-orange transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 text-xs sm:text-sm hover:text-accent-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}