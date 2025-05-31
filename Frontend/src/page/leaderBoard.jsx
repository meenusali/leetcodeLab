import React from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  Target,
  Award,
  Zap,
  Construction,
  Rocket,
  Users,
  Brain,
  Code,
  Timer,
  Flame,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const leaderBoard = () => {
    const navigate = useNavigate();

    return (
      <div className="w-full">
        {/* Main Content */}
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <Construction className="w-20 h-20 text-primary mx-auto animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-ping"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-blue-400 to-primary/70 text-transparent bg-clip-text">
                Leaderboard
              </span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
              The ultimate competitive coding experience is coming soon
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <div className="flex justify-center items-center relative">
                  <Trophy className="w-16 h-16 text-yellow-500" />
                  <Crown className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
                </div>,
                title: "Global Rankings",
                description: "Compete with developers worldwide and prove your coding prowess",
                color: "from-yellow-500 to-orange-600",
                bgGlow: "yellow-500/20"
              },
              {
                icon: <div className="flex justify-center items-center relative">
                  <Award className="w-16 h-16 text-blue-500" />
                  <Sparkles className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-pulse" />
                </div>,
                title: "Achievement System",
                description: "Unlock badges, rewards, and recognition for your coding excellence",
                color: "from-blue-500 to-primary",
                bgGlow: "blue-500/20"
              },
              {
                icon: <div className="flex justify-center items-center relative">
                  <Brain className="w-16 h-16 text-purple-500" />
                  <Flame className="w-8 h-8 text-purple-400 absolute -top-2 -right-2 animate-pulse" />
                </div>,
                title: "Daily Challenges",
                description: "Take on exciting coding challenges and maintain your winning streak",
                color: "from-purple-500 to-pink-600",
                bgGlow: "purple-500/20"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-2xl bg-${feature.bgGlow} blur-xl transition-all duration-500 group-hover:scale-110`}></div>
                <div className="relative bg-base-200 backdrop-blur-xl border border-base-300 rounded-2xl p-8 h-full transition-all duration-300 hover:transform hover:-translate-y-2 flex flex-col items-center text-center">
                  <div className={`bg-gradient-to-r ${feature.color} text-transparent bg-clip-text mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mt-4 mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Section */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary"
                  style={{ animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite` }}
                ></div>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300">
              <span className="text-primary">Development in Progress</span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Custom Animation Styles */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }
        `}</style>
      </div>
    );
}

export default leaderBoard;
