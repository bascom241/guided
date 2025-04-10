import React from 'react';

type TitleProp = { 
  title: string; 
  subtitle: string; 
};

const AuthImagePatternSignIn = ({ title, subtitle }: TitleProp) => {
  return (
    <div className="hidden lg:flex items-center justify-center  rounded-l-3xl  bg-gradient-to-r from-blue-500 to-purple-500 p-12">
      <div className="relative max-w-md text-center">
        {/* Radial Pattern */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-64 h-64 rounded-full bg-white/10 blur-3xl animate-ping"></div>
          <div className="w-48 h-48 rounded-full bg-white/20 blur-xl"></div>
        </div>

        {/* Animated Circles */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full ${
                i % 2 === 0 ? 'bg-blue-300 animate-bounce' : 'bg-purple-300 animate-spin'
              }`}
            ></div>
          ))}
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-white/80">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePatternSignIn;
