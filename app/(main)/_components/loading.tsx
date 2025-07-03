import React from 'react';

const BigLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-8 border-blue-200 border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 rounded-full border-8 border-blue-100 border-t-transparent animate-spin-slower"></div>
        <div className="absolute inset-8 bg-blue-300 rounded-full shadow-inner flex items-center justify-center text-white text-xs">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default BigLoader;
