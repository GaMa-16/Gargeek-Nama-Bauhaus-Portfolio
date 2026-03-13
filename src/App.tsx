/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Circle, 
  Square, 
  Triangle, 
  Check, 
  ArrowRight, 
  Github, 
  Mail, 
  Phone, 
  ExternalLink,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import portrait from './portrait.jpeg';

// --- Types ---

type ShapeType = 'circle' | 'square' | 'triangle';

// --- Components ---

const GeometricShape = ({ type, color, size = 'h-8 w-8', className = '' }: { type: ShapeType, color: string, size?: string, className?: string }) => {
  const baseClass = `${size} ${className}`;
  if (type === 'circle') return <div className={`${baseClass} rounded-full ${color} bauhaus-border`} />;
  if (type === 'square') return <div className={`${baseClass} rounded-none ${color} bauhaus-border`} />;
  return (
    <div 
      className={`${baseClass} ${color}`} 
      style={{ 
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        border: 'none' // Clip path doesn't play well with standard borders
      }} 
    />
  );
};

const BauhausButton = ({ 
  children, 
  variant = 'primary', 
  shape = 'square',
  className = '',
  onClick
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'yellow' | 'outline',
  shape?: 'square' | 'pill',
  className?: string,
  onClick?: () => void
}) => {
  const variants = {
    primary: 'bg-bauhaus-red text-white',
    secondary: 'bg-bauhaus-blue text-white',
    yellow: 'bg-bauhaus-yellow text-bauhaus-black',
    outline: 'bg-white text-bauhaus-black'
  };

  return (
    <button 
      onClick={onClick}
      className={`
        px-6 py-3 font-bold uppercase tracking-wider bauhaus-border bauhaus-shadow-sm bauhaus-press
        ${variants[variant]}
        ${shape === 'pill' ? 'rounded-full' : 'rounded-none'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

interface BauhausCardProps {
  key?: React.Key;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  accentColor?: string;
  shape?: ShapeType;
}

const BauhausCard = ({ 
  title, 
  subtitle, 
  children, 
  accentColor = 'bg-bauhaus-red',
  shape = 'circle'
}: BauhausCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white bauhaus-border bauhaus-shadow-lg p-8 relative flex flex-col h-full"
    >
      <div className="absolute top-4 right-4">
        <GeometricShape type={shape} color={accentColor} size="h-4 w-4" />
      </div>
      {subtitle && <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">{subtitle}</span>}
      <h3 className="text-3xl mb-4">{title}</h3>
      <div className="flex-grow text-lg leading-relaxed mb-6">
        {children}
      </div>
    </motion.div>
  );
};

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-bauhaus-white border-b-4 border-bauhaus-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded-full bg-bauhaus-red bauhaus-border" />
            <div className="w-4 h-4 bg-bauhaus-blue bauhaus-border" />
            <div className="w-4 h-4 bg-bauhaus-yellow bauhaus-border" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
          <span className="font-black text-2xl tracking-tighter ml-2">GN.</span>
        </div>

        <div className="hidden md:flex gap-8 font-bold uppercase tracking-widest text-sm">
          <a href="#projects" className="hover:text-bauhaus-red transition-colors">Projects</a>
          <a href="#skills" className="hover:text-bauhaus-blue transition-colors">Skills</a>
          <a href="#philosophy" className="hover:text-bauhaus-yellow transition-colors">Philosophy</a>
          <a href="#contact" className="hover:text-bauhaus-red transition-colors">Contact</a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden bg-bauhaus-white border-t-2 border-bauhaus-black"
          >
            <div className="flex flex-col p-4 gap-4 font-bold uppercase tracking-widest">
              <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
              <a href="#skills" onClick={() => setIsOpen(false)}>Skills</a>
              <a href="#philosophy" onClick={() => setIsOpen(false)}>Philosophy</a>
              <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b-4 border-bauhaus-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Left Panel */}
        <div className="p-8 sm:p-16 lg:p-24 flex flex-col justify-center relative bg-bauhaus-white">
          <div className="absolute inset-0 dot-grid" />
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10"
          >
            <span className="inline-block bg-bauhaus-yellow bauhaus-border px-4 py-1 font-bold uppercase tracking-widest text-sm mb-6 bauhaus-shadow-sm">
              2nd Year CSE @ SRMIST // 9.0 CGPA
            </span>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl mb-8">
              GARGEEK <br /> NAMA
            </h1>
            <p className="text-xl sm:text-2xl font-medium leading-relaxed max-w-xl mb-10">
              "CONSTRUCTING THE INTERSECTION OF MACHINE LEARNING AND HUMAN-CENTRIC DESIGN."
            </p>
            <div className="flex flex-wrap gap-4">
              <BauhausButton 
                variant="primary" 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </BauhausButton>
              <BauhausButton 
                variant="outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </BauhausButton>
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Geometric Composition */}
        <div className="bg-bauhaus-blue relative min-h-[400px] lg:min-h-full flex items-center justify-center overflow-hidden border-t-4 lg:border-t-0 lg:border-l-4 border-bauhaus-black">
          <motion.div 
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
          >
            {/* Abstract GN Monogram Composition with Portrait */}
            <div className="absolute inset-0 rounded-full bg-white bauhaus-border bauhaus-shadow-lg overflow-hidden flex items-center justify-center group cursor-pointer">
               <img 
                 src={portrait} 
                 alt="Gargeek Nama" 
                 className="w-full h-full object-cover object-[center_25%] grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
               />
               {/* Subtle overlay for texture */}
               <div className="absolute inset-0 bg-bauhaus-yellow/5 pointer-events-none mix-blend-multiply" />
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-bauhaus-red bauhaus-border rotate-45 bauhaus-shadow-md" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-bauhaus-yellow bauhaus-border rounded-full bauhaus-shadow-md" />
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      id: "01",
      title: "AI VOICE CLASSIFIER",
      hook: "Real-time audio analysis platform.",
      core: "Classifies sources as AI-generated or human using multilingual detection.",
      flex: "Low-latency processing for live-streamed audio inputs.",
      color: "bg-bauhaus-red",
      shape: "circle" as ShapeType
    },
    {
      id: "02",
      title: "SMELL-ML",
      hook: "Software-driven residential energy management.",
      core: "Isolation Forest ML models for anomaly detection and cost optimization.",
      flex: "Translating predictive demand models into actionable visualization dashboards.",
      color: "bg-bauhaus-blue",
      shape: "square" as ShapeType
    },
    {
      id: "03",
      title: "OMNIROUTE LOGISTICS",
      hook: "Responsive logistics management dashboard.",
      core: "Prototyped in Figma/Framer; engineered with modular JavaScript architecture.",
      flex: "High-fidelity wireframe translation with a focus on navigation efficiency.",
      color: "bg-bauhaus-yellow",
      shape: "triangle" as ShapeType
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b-4 border-bauhaus-black">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-bauhaus-red mb-4 block">Selected Works</span>
          <h2 className="text-5xl sm:text-7xl">PROJECT GALLERY</h2>
        </div>
        <div className="hidden md:block h-1 bg-bauhaus-black flex-grow mx-12 mb-4" />
        <div className="text-right">
          <span className="text-4xl font-black opacity-20">01—03</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <BauhausCard 
            key={project.id}
            title={project.title} 
            subtitle={`${project.id}. ${project.hook}`}
            accentColor={project.color}
            shape={project.shape}
          >
            <p className="mb-4">{project.core}</p>
            <div className="p-4 bg-bauhaus-white bauhaus-border border-dashed">
              <p className="text-sm font-bold italic">"{project.flex}"</p>
            </div>
          </BauhausCard>
        ))}
      </div>
    </section>
  );
};

const TechnicalLegend = () => {
  const skills = [
    { category: "Programming", items: ["Java (Advanced)", "JavaScript", "Python", "HTML5", "CSS3"] },
    { category: "Tools", items: ["Git/GitHub", "MySQL", "Figma", "Framer"] },
    { category: "Certifications", items: ["OCI 2025 Certified AI Foundations Associate"] },
    { category: "Leadership", items: ["Event Coordinator for SRM HACKSPHERE 2.0"] }
  ];

  return (
    <section id="skills" className="bg-bauhaus-yellow border-b-4 border-bauhaus-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3">
        <div className="p-12 lg:p-24 border-b-4 lg:border-b-0 lg:border-r-4 border-bauhaus-black flex flex-col justify-center">
          <h2 className="text-5xl sm:text-6xl mb-8">TECHNICAL LEGEND</h2>
          <p className="text-lg font-bold uppercase tracking-wider">The architectural foundation of my engineering process.</p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-bauhaus-black">
          {skills.map((skill, idx) => (
            <div key={idx} className={`p-12 flex flex-col gap-6 ${idx >= 2 ? 'sm:border-t-4 border-bauhaus-black' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 bauhaus-border ${idx % 3 === 0 ? 'rounded-full bg-bauhaus-red' : idx % 3 === 1 ? 'bg-bauhaus-blue' : 'bg-white'}`} 
                     style={idx % 3 === 2 ? { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } : {}} />
                <h4 className="text-2xl">{skill.category}</h4>
              </div>
              <ul className="space-y-2">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-medium">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-bauhaus-red" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b-4 border-bauhaus-black relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-bauhaus-red opacity-10 rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-bauhaus-blue opacity-10" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl mb-12">
          FORM FOLLOWS FUNCTION. <br />
          <span className="text-bauhaus-red">CODE FOLLOWS DESIGN.</span>
        </h2>
        <div className="bauhaus-border p-8 sm:p-12 bg-white bauhaus-shadow-lg">
          <p className="text-xl sm:text-3xl font-medium leading-tight">
            "I leverage my background in Computer Science to build scalable systems where the UI isn't just a skin—it's a functional extension of the logic. From hackathons to ML integration, my goal is architectural clarity."
          </p>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const handleDownloadResume = () => {
    const doc = new jsPDF();
    const margin = 20;
    let y = 20;

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('GARGEEK NAMA', margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('+91 7728862797 | gn6521@srmist.edu.in | github.com/GaMa-16 | Chennai, TN', margin, y);
    y += 15;

    // Sections
    const addSection = (title: string, content: string[]) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin, y);
      y += 2;
      doc.line(margin, y, 190, y);
      y += 7;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      content.forEach(line => {
        const splitText = doc.splitTextToSize(line, 170);
        doc.text(splitText, margin, y);
        y += (splitText.length * 5) + 2;
      });
      y += 5;
    };

    addSection('EDUCATION', [
      'SRM Institute of Science and Technology, Kattankulathur, TN',
      'B.Tech Computer Science Engineering | Expected: May 2028',
      'Current CGPA: 9.0 (No current arrears)'
    ]);

    addSection('TECHNICAL SKILLS', [
      'Programming Languages: Java (Advanced), JavaScript, HTML5, CSS3, Python.',
      'Tools & Technologies: Git/GitHub, MySQL, JDBC, Figma, Framer.',
      'Core Competencies: Machine Learning Integration, Frontend Development, UI/UX Design, Agile Methodologies.'
    ]);

    addSection('PROJECT EXPERIENCE', [
      'Sustainable Energy Optimization (Smell-ML): Developed a smart home system for energy management using Isolation Forest ML models.',
      'Real-Time Gesture Recognition System: Computer vision application mapping hand movements to digital commands.',
      'Real-Time AI Voice Classification: Web-based platform classifying audio as AI-generated or human.',
      'Logistics Management Frontend: Responsive dashboard prototyped in Figma/Framer and engineered with JS/HTML/CSS.'
    ]);

    addSection('CERTIFICATIONS & LEADERSHIP', [
      'OCI 2025 Certified AI Foundations Associate',
      'Event Coordinator for SRM HACKSPHERE 2.0',
      'Smart India Hackathon 2025 Participant'
    ]);

    doc.save('Gargeek_Nama_Resume.pdf');
  };

  return (
    <section id="contact" className="bg-bauhaus-black text-bauhaus-white py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl sm:text-8xl mb-8 text-bauhaus-yellow">THE BLUEPRINT</h2>
            <p className="text-xl mb-12 opacity-80 max-w-md">
              Available for Summer Internship // May 2028 Batch. Let's construct something meaningful.
            </p>
            
            <div className="space-y-6">
              <a href="tel:+917728862797" className="flex items-center gap-4 text-2xl font-bold hover:text-bauhaus-yellow transition-colors">
                <div className="p-3 bg-bauhaus-red bauhaus-border border-white">
                  <Phone className="text-white" />
                </div>
                +91 7728862797
              </a>
              <a href="mailto:gargeeknama2007@gmail.com" className="flex items-center gap-4 text-2xl font-bold hover:text-bauhaus-yellow transition-colors">
                <div className="p-3 bg-bauhaus-blue bauhaus-border border-white">
                  <Mail className="text-white" />
                </div>
                gargeeknama2007@gmail.com
              </a>
              <a href="https://github.com/GaMa-16" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-2xl font-bold hover:text-bauhaus-yellow transition-colors">
                <div className="p-3 bg-bauhaus-yellow bauhaus-border border-black">
                  <Github className="text-black" />
                </div>
                github.com/GaMa-16
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bauhaus-border border-white p-8 sm:p-12 bg-bauhaus-black relative z-10">
               <h3 className="text-4xl mb-6">STATUS: ACTIVE</h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between border-b border-white/20 pb-2">
                   <span className="uppercase font-bold tracking-widest opacity-60">Location</span>
                   <span className="font-bold">SRMIST, Chennai</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/20 pb-2">
                   <span className="uppercase font-bold tracking-widest opacity-60">Role</span>
                   <span className="font-bold">Full Stack ML Engineer</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/20 pb-2">
                   <span className="uppercase font-bold tracking-widest opacity-60">Availability</span>
                   <span className="font-bold text-bauhaus-yellow">Summer 2026</span>
                 </div>
               </div>
               <BauhausButton 
                 variant="yellow" 
                 className="w-full mt-8" 
                 shape="pill"
                 onClick={handleDownloadResume}
               >
                 Download Resume
               </BauhausButton>
            </div>
            {/* Decorative shapes */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-bauhaus-red rounded-full opacity-50 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-bauhaus-blue opacity-50 blur-2xl" />
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-bold uppercase tracking-widest text-xs opacity-40">© 2026 Gargeek Nama // Bauhaus Edition</span>
          <div className="flex gap-4">
             <div className="w-3 h-3 rounded-full bg-bauhaus-red" />
             <div className="w-3 h-3 bg-bauhaus-blue" />
             <div className="w-3 h-3 bg-bauhaus-yellow" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-bauhaus-yellow selection:text-bauhaus-black">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <TechnicalLegend />
        <Philosophy />
        <Contact />
      </main>
    </div>
  );
}
