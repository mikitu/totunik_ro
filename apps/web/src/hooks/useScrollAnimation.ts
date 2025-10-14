'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true, delay = 0 } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) setHasTriggered(true);
            }, delay);
          } else {
            setIsVisible(true);
            if (triggerOnce) setHasTriggered(true);
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered]);

  return { ref: elementRef, isVisible };
}

// Hook for staggered animations (useful for lists)
export function useStaggeredScrollAnimation<T extends HTMLElement = HTMLElement>(
  itemCount: number,
  options: UseScrollAnimationOptions & { staggerDelay?: number } = {}
) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true, staggerDelay = 100 } = options;

  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          // Trigger animations with stagger delay
          visibleItems.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * staggerDelay);
          });

          if (triggerOnce) setHasTriggered(true);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setVisibleItems(new Array(itemCount).fill(false));
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, staggerDelay, itemCount, hasTriggered, visibleItems]);

  return { ref: containerRef, visibleItems };
}
