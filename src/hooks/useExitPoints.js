import { useEffect } from "react";

export function useExitPoints(adjustPointsFn) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      adjustPointsFn();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [adjustPointsFn]);
}