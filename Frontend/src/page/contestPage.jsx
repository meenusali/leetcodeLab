import React from 'react';
import { Calendar, Clock, Trophy, Star, Timer, Users, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContestPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Main Content */}
      <div className="space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary via-blue-400 to-primary/70 text-transparent bg-clip-text">
              Contests Coming Soon
            </span>
          </h1>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
            Get ready for exciting coding competitions! Compete with developers worldwide and showcase your skills.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Trophy className="w-8 h-8 text-yellow-500" />,
              title: "Win Prizes",
              description: "Compete for exciting prizes and recognition in the developer community"
            },
            {
              icon: <Users className="w-8 h-8 text-blue-500" />,
              title: "Global Competition",
              description: "Challenge developers from around the world"
            },
            {
              icon: <Timer className="w-8 h-8 text-green-500" />,
              title: "Real-time Rankings",
              description: "Watch live leaderboards during contests"
            },
            {
              icon: <Star className="w-8 h-8 text-purple-500" />,
              title: "Skill Levels",
              description: "Contests for all skill levels from beginner to expert"
            },
            {
              icon: <Calendar className="w-8 h-8 text-red-500" />,
              title: "Regular Events",
              description: "Weekly and monthly contests to keep you engaged"
            },
            {
              icon: <Clock className="w-8 h-8 text-orange-500" />,
              title: "Flexible Timing",
              description: "Contests scheduled across different time zones"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className={`absolute inset-0 rounded-2xl bg-${feature.icon.props.className.split(' ').find(c => c.includes('text-')).replace('text-', '')}/20 blur-xl transition-all duration-500 group-hover:scale-110`}></div>
              <div className="relative bg-base-200 backdrop-blur-xl border border-base-300 rounded-2xl p-8 h-full transition-all duration-300 hover:transform hover:-translate-y-2 flex flex-col items-center text-center">
                <div className="bg-base-200/50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mt-4 mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestPage;
