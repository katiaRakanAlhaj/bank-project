import { useEffect } from "react";

const useLoaderScroll = (isLoading) => {
  useEffect(() => {
    console.log(`Loading state changed: ${isLoading}`);
    if (isLoading) {
      window.scrollTo(0, 0); // Scroll to top
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "visible"; // Allow scrolling
    }
    return () => {
      document.body.style.overflow = "hidden"; // Cleanup on unmount
    };
  }, [isLoading]);
};

export default useLoaderScroll;