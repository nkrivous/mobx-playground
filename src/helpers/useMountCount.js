import { useRef, useEffect } from "react";

export function useMountCount(name) {
  const count = useRef(0);
  useEffect(() => {
    count.current++;
  }, [name]);

  return count.current;
}
