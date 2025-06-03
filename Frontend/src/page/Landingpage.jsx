import React, { useEffect } from 'react';
import { Code2, Brain, Timer, ChartBar, ArrowRight } from 'lucide-react';

function Landingpage() {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 20) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-300 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[150%] h-[150%] bg-gradient-conic from-primary/30 via-secondary/30 to-accent/30 animate-slow-spin"></div>
        <div className="absolute inset-0 bg-base-100/90 backdrop-blur-3xl"></div>
            </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-base-100/50 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center w-full h-16">
            <a href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Codexium Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Codexium
              </span>
            </a>
            <a href="/login" className="btn btn-primary btn-sm">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-32 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-white">Master Your</span>
                <br />
                <span className="text-primary animate-pulse-text">
                  Coding Journey
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 animate-fade-in">
                Practice with real-world problems, track your progress, and join a community of developers preparing for tech interviews.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up">
                <a 
                  href="/login" 
                  className="btn btn-primary btn-lg group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Practicing
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-2xl opacity-30"></div>
                <img 
                  src="/hero.png" 
                  alt="Coding Illustration" 
                  className="w-full max-w-2xl mx-auto drop-shadow-2xl rounded-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 bg-base-200/50">
        <div className="container mx-auto px-4">
      <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Why Choose Codexium?
              </span>
</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform is built with the latest technology to provide you with the best coding practice experience.
            </p>
          </div>

          <div className="auto-scroll-container overflow-hidden">
            <div className="flex gap-8 pb-6 auto-scroll custom-scrollbar">
              {[
                {
                  icon: <Code2 className="w-8 h-8" />,
                  title: "Multi-Language Support",
                  description: "Code in JavaScript, Python, or Java with our powerful in-browser IDE"
                },
                {
                  icon: <Timer className="w-8 h-8" />,
                  title: "Interview Timer",
                  description: "Practice under timed conditions to simulate real interview scenarios"
                },
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "Smart Learning",
                  description: "AI-powered problem recommendations based on your skill level"
                },
                {
                  icon: <ChartBar className="w-8 h-8" />,
                  title: "Progress Tracking",
                  description: "Detailed analytics to monitor your improvement over time"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card bg-base-100/50 backdrop-blur-lg rounded-xl p-8 border border-white/5 hover:border-primary/50 transition-all duration-300 min-w-[300px]"
                >
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    {feature.icon}
        </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
          </div>
              ))}
              {/* Duplicate cards for seamless loop */}
              {[
                {
                  icon: <Code2 className="w-8 h-8" />,
                  title: "Multi-Language Support",
                  description: "Code in JavaScript, Python, or Java with our powerful in-browser IDE"
                },
                {
                  icon: <Timer className="w-8 h-8" />,
                  title: "Interview Timer",
                  description: "Practice under timed conditions to simulate real interview scenarios"
                },
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "Smart Learning",
                  description: "AI-powered problem recommendations based on your skill level"
                },
                {
                  icon: <ChartBar className="w-8 h-8" />,
                  title: "Progress Tracking",
                  description: "Detailed analytics to monitor your improvement over time"
                }
              ].map((feature, index) => (
                <div 
                  key={`duplicate-${index}`} 
                  className="feature-card bg-base-100/50 backdrop-blur-lg rounded-xl p-8 border border-white/5 hover:border-primary/50 transition-all duration-300 min-w-[300px]"
                >
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    {feature.icon}
          </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
        </div>
              ))}
          </div>
          </div>
      </div>
        </section>

      {/* About Us Section */}
      <section className="relative z-10 py-32 bg-base-100/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                About Codexium
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              We're on a mission to democratize technical interview preparation and make coding practice accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                description: "To empower developers worldwide with the tools and resources they need to excel in their technical interviews and advance their careers.",
                icon: "🎯"
              },
              {
                title: "Our Vision",
                description: "To become the most trusted platform for technical interview preparation, fostering a global community of skilled developers.",
                icon: "🌟"
              },
              {
                title: "Our Values",
                description: "We believe in continuous learning, community support, and making quality education accessible to all developers, regardless of their background.",
                icon: "💡"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-base-100/50 backdrop-blur-lg rounded-xl p-8 border border-white/5 hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-base-100/50 backdrop-blur-lg rounded-xl p-8 border border-white/5 max-w-2xl">
              <h3 className="text-2xl font-semibold text-white mb-4">Join Our Community</h3>
              <p className="text-gray-400 mb-6">
                Be part of a growing community of developers who are passionate about coding and continuous learning. 
                Together, we're building the future of technical education.
              </p>
              <a 
                href="/login" 
                className="btn btn-primary btn-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Join Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "What is Codexium?",
                answer: "Codexium is a modern platform designed to help developers prepare for technical interviews through structured problem-solving, real-time feedback, and a supportive community."
              },
              {
                question: "Is it free to use?",
                answer: "Yes! Core features are completely free. We also offer a Pro plan with advanced features for serious interview preparation."
              },
              {
                question: "Is this good for beginners?",
                answer: "Absolutely! Whether you're just starting with DSA or preparing for FAANG interviews, our platform adapts to your skill level."
              }
            ].map((faq, index) => (
              <div key={index} className="collapse collapse-plus bg-base-100/50 backdrop-blur-lg border border-white/5">
                <input type="radio" name="faq-accordion" /> 
                <div className="collapse-title text-xl font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content text-gray-400">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
                </div>
              </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-base-300/50 backdrop-blur-lg border-t border-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Codexium Logo" className="w-8 h-8" />
              <p className="text-gray-400">
                © {new Date().getFullYear()} Codexium. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Add animation keyframes */}
      <style>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }

        /* Auto-scroll animation */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .auto-scroll-container {
          width: 100%;
          position: relative;
        }

        .auto-scroll {
          animation: scroll 30s linear infinite;
          width: fit-content;
        }

        .auto-scroll:hover {
          animation-play-state: paused;
        }

        /* Custom Scrollbar Styling */
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Card hover effect */
        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px -10px rgba(139, 92, 246, 0.3);
        }

        /* Sticky header styles */
        nav {
          transition: background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
        }

        nav.scrolled {
          background-color: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(12px);
          border-color: rgba(255, 255, 255, 0.1);
        }

        @keyframes pulseText {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-pulse-text {
          animation: pulseText 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Landingpage;
