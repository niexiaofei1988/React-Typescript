import { useEffect } from "react";

const useListener = (
  handlerType: keyof GlobalEventHandlersEventMap,
  handler: (event: Event) => void,
  options?: boolean | EventListenerOptions
) => {
  useEffect(() => {
    document.addEventListener(handlerType, handler, options);
    return () => {
      document.removeEventListener(handlerType, handler, options);
    };
  }, []);
};

export default useListener;
