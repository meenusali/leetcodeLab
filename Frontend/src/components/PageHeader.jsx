// Frontend/src/components/PageHeader.jsx
import React from 'react';
import { ChevronLeft, Home, Clock, Users, ThumbsUp, Bookmark, Share2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const PageHeader = ({ 
  title, 
  showBackButton = true,
  showHomeButton = false,
  rightContent,
  className = "",
  onBack,
  subtitle,
  gradient = false
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`bg-base-100/50 backdrop-blur-sm border-b border-base-300 ${gradient ? 'bg-gradient-to-r from-base-100/50 to-base-200/50' : ''} ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showBackButton && (
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="text-lg font-medium">Back</span>
              </button>
            )}
            {showHomeButton && (
              <Link 
                to="/" 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
              >
                <Home className="w-6 h-6" />
              </Link>
            )}
            {title && (
              <div className={`${showBackButton || showHomeButton ? 'ml-4' : ''}`}>
                <h1 className="text-xl font-bold">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-base-content/70">{subtitle}</p>
                )}
              </div>
            )}
          </div>
          {rightContent && (
            <div className="flex items-center gap-4">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;