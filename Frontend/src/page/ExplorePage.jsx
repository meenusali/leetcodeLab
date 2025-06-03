import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Crown, Sparkles } from 'lucide-react';

const companies = [
  {
    id: 'google',
    name: 'Google',
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    description: 'Master Google\'s interview process with our curated collection of premium problems.',
    color: 'from-blue-500 to-red-500',
    problems: 150,
    difficulty: 'Hard',
  },
  {
    id: 'meta',
    name: 'Meta',
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    description: 'Prepare for Meta interviews with our specially designed problem sets.',
    color: 'from-blue-600 to-blue-400',
    problems: 120,
    difficulty: 'Medium-Hard',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    icon: (
     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#FFB300" d="M39.6,39c-4.2,3.1-10.5,5-15.6,5c-7.3,0-13.8-2.9-18.8-7.4c-0.4-0.4,0-0.8,0.4-0.6c5.4,3.1,11.5,4.9,18.3,4.9c4.6,0,10.4-1,15.1-3C39.7,37.7,40.3,38.5,39.6,39z M41.1,36.9c-0.5-0.7-3.5-0.3-4.8-0.2c-0.4,0-0.5-0.3-0.1-0.6c2.3-1.7,6.2-1.2,6.6-0.6c0.4,0.6-0.1,4.5-2.3,6.3c-0.3,0.3-0.7,0.1-0.5-0.2C40.5,40.4,41.6,37.6,41.1,36.9z"></path><path fill="#37474F" d="M36.9,29.8c-1-1.3-2-2.4-2-4.9v-8.3c0-3.5,0-6.6-2.5-9c-2-1.9-5.3-2.6-7.9-2.6C19,5,14.2,7.2,13,13.4c-0.1,0.7,0.4,1,0.8,1.1l5.1,0.6c0.5,0,0.8-0.5,0.9-1c0.4-2.1,2.1-3.1,4.1-3.1c1.1,0,3.2,0.6,3.2,3v3c-3.2,0-6.6,0-9.4,1.2c-3.3,1.4-5.6,4.3-5.6,8.6c0,5.5,3.4,8.2,7.8,8.2c3.7,0,5.9-0.9,8.8-3.8c0.9,1.4,1.3,2.2,3,3.7c0.4,0.2,0.9,0.2,1.2-0.1l0,0c1-0.9,2.9-2.6,4-3.5C37.4,30.9,37.3,30.3,36.9,29.8z M27,22.1L27,22.1c0,2-0.1,6.9-5,6.9c-3,0-3-3-3-3c0-4.5,4.2-5,8-5V22.1z"></path>
</svg>
    ),
    description: 'Tackle Amazon\'s most frequently asked coding problems.',
    color: 'from-orange-500 to-yellow-500',
    problems: 180,
    difficulty: 'Medium',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <path fill="#F25022" d="M11.4 24H0V12.6h11.4V24z"/>
        <path fill="#00A4EF" d="M24 24H12.6V12.6H24V24z"/>
        <path fill="#7FBA00" d="M11.4 11.4H0V0h11.4v11.4z"/>
        <path fill="#FFB900" d="M24 11.4H12.6V0H24v11.4z"/>
      </svg>
    ),
    description: 'Practice with Microsoft\'s signature problem patterns.',
    color: 'from-green-500 to-blue-500',
    problems: 140,
    difficulty: 'Medium-Hard',
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <path fill="#000000" d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.13.89 6.41-.65 1.29-1.51 2.58-2.92 4.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
    description: 'Solve Apple\'s challenging algorithmic problems.',
    color: 'from-gray-800 to-gray-600',
    problems: 100,
    difficulty: 'Hard',
  },
  {
    id: 'netflix',
    name: 'Netflix',
    icon: (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#F44336" d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"></path>
</svg>
    ),
    description: 'Master Netflix\'s system design and coding challenges.',
    color: 'from-red-600 to-red-400',
    problems: 90,
    difficulty: 'Hard',
  },
];

const ExplorePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <h1 className="text-4xl font-bold">Explore Premium Problems</h1>
          <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white text-sm font-medium">
            <Crown className="w-4 h-4" />
            <span>Premium</span>
          </div>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Practice with our curated collection of premium problems from top tech companies.
          Master the patterns and techniques that will help you ace your interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="group relative overflow-hidden rounded-2xl bg-base-200 border border-base-300 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
            
            <div className="relative p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-white/5 p-2 flex items-center justify-center">
                  {company.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{company.name}</h3>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded text-yellow-500 text-xs font-medium">
                      <Star className="w-3 h-3" />
                      <span>Premium</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{company.problems} problems</span>
                    <span>•</span>
                    <span className="text-primary">{company.difficulty}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 mb-6 line-clamp-2">
                {company.description}
              </p>

              {/* <Link
                to={`/problems?company=${company.id}`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-colors"
              >
                <span>View Problems</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link> */}
              <span className="text-muted-foreground italic">Coming Soon</span>

            </div>

            <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block p-6 bg-gradient-to-r from-base-200 to-base-300 rounded-2xl border border-base-300">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Premium Features
            </h3>
          </div>
          <p className="text-gray-400 mb-6 max-w-lg">
            Get access to exclusive company-specific problems, detailed solutions, and expert guidance to help you land your dream job.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Company-specific problems</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Detailed solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Expert guidance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage; 