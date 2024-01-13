import { useEffect, useCallback, useRef } from "react";

type HotKeyCallback = (event: KeyboardEvent) => void;

type Args = {
  key: string;
  callback: HotKeyCallback;
};

const useHotKey = ({ callback, key }: Args) => {
  const callbackRef = useRef<HotKeyCallback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) callbackRef.current(event);
    },
    [key]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
};

export default useHotKey;
