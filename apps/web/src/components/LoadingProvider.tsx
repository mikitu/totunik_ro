'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Stop loading when route changes
    setIsLoading(false);
  }, [pathname]);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <LoadingOverlay />}
    </LoadingContext.Provider>
  );
}

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Liquid loading animation */}
        <div className="relative w-20 h-20">
          {/* Main container */}
          <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>

          {/* Liquid fill effect */}
          <div className="absolute inset-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-t from-orange-600 to-orange-500 rounded-full animate-pulse"
              style={{
                background: 'linear-gradient(45deg, #f97316, #ea580c, #f97316)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 2s ease-in-out infinite',
              }}
            ></div>

            {/* Liquid wave effect */}
            <div className="absolute bottom-0 left-0 right-0 h-full bg-orange-500 rounded-full animate-bounce"></div>
          </div>

          {/* Shine effect */}
          <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full animate-pulse"></div>
        </div>

        {/* Clean, modern text */}
        <div className="text-center">
          <div className="text-lg font-medium text-gray-800 mb-2">Loading</div>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
