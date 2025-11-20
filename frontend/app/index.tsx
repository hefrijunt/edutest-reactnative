import { useEffect } from "react";
import { router } from "expo-router";

export default function Index(): null {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/splashScreen");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
