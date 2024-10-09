// hooks/useDebounce.ts

import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value by a specified delay.
 *
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
      const [debouncedValue, setDebouncedValue] = useState<T>(value);

      useEffect(() => {
            const handler = window.setTimeout(() => {
                  setDebouncedValue(value);
            }, delay);

            return () => {
                  window.clearTimeout(handler);
            };
      }, [value, delay]);

      return debouncedValue;
}

export default useDebounce;
