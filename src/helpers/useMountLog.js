import { useEffect } from "react";

export function useMountLog(name) {
  useEffect(() => {
    console.log("Mount:", name);

    return () => {
      console.log("Unmount:", name);
    };
  }, [name]);
}
