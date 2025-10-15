// Collection of different loading effects to choose from

// Effect 1: Ripple Effect (Current)
export function RippleLoadingEffect() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-white/95 to-orange-50/95 backdrop-blur-md flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Modern ripple effect */}
        <div className="relative flex items-center justify-center">
          {/* Outer ripples */}
          <div className="absolute w-24 h-24 border-2 border-orange-300/40 rounded-full animate-ping"></div>
          <div className="absolute w-20 h-20 border-2 border-orange-400/60 rounded-full animate-ping animation-delay-200"></div>
          <div className="absolute w-16 h-16 border-2 border-orange-500/80 rounded-full animate-ping animation-delay-400"></div>
          
          {/* Center element */}
          <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Animated text */}
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800 mb-2">
            <span className="inline-block animate-bounce">L</span>
            <span className="inline-block animate-bounce animation-delay-100">o</span>
            <span className="inline-block animate-bounce animation-delay-200">a</span>
            <span className="inline-block animate-bounce animation-delay-300">d</span>
            <span className="inline-block animate-bounce animation-delay-400">i</span>
            <span className="inline-block animate-bounce animation-delay-500">n</span>
            <span className="inline-block animate-bounce animation-delay-600">g</span>
          </div>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-1 mt-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Effect 2: Sliding Bars
export function SlidingBarsEffect() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Sliding bars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-orange-500 rounded-full animate-pulse"
              style={{
                height: '40px',
                animationDelay: `${i * 100}ms`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
        
        <div className="text-white font-semibold text-lg">Loading...</div>
      </div>
    </div>
  );
}

// Effect 3: Morphing Shapes
export function MorphingShapesEffect() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Morphing shapes */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-2 bg-orange-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 bg-white rounded-full animate-bounce"></div>
        </div>
        
        {/* Elegant text */}
        <div className="text-center">
          <h3 className="text-2xl font-light text-gray-800 mb-2">Loading</h3>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

// Effect 4: Particle System
export function ParticleSystemEffect() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-md flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Particle system */}
        <div className="relative w-24 h-24">
          {/* Central core */}
          <div className="absolute inset-8 bg-orange-500 rounded-full animate-pulse"></div>
          
          {/* Orbiting particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full animate-spin"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 45}deg) translateX(40px) translateY(-4px)`,
                animationDuration: '2s',
                animationDelay: `${i * 250}ms`
              }}
            ></div>
          ))}
        </div>
        
        <div className="text-gray-700 font-medium">Preparing your experience...</div>
      </div>
    </div>
  );
}

// Effect 5: Progress Wave
export function ProgressWaveEffect() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Wave progress */}
        <div className="relative w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full transform -translate-x-full animate-pulse"></div>
        </div>
        
        {/* Glowing text */}
        <div className="text-center">
          <h3 className="text-white text-xl font-semibold mb-2">Loading</h3>
          <p className="text-orange-300 text-sm">Please wait a moment...</p>
        </div>
        
        {/* Floating elements */}
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 200}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Effect 6: Minimal Spinner
export function MinimalSpinnerEffect() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Simple elegant spinner */}
        <div className="w-8 h-8 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
        <div className="text-gray-600 text-sm font-medium">Loading</div>
      </div>
    </div>
  );
}
