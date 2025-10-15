
'use client';

import { useRef, useEffect, useState } from 'react';

type UseScrollAnimationOptions = {
  threshold?: number;
  triggerOnce?: boolean;
};

export const useScrollAnimation = <T extends HTMLElement>(options?: UseScrollAnimationOptions) => {
  const { threshold = 0.1, triggerOnce = true } = options || {};
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && ref.current) {
              observer.unobserve(ref.current);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
};
