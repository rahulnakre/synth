import { useState, useEffect } from "react";

export const useMultiKeyPress = () => {
  const [keysPressed, setKeyPressed]= useState<Set<string>>(new Set([]));

    // Key being pressed down
  const downHandler = ({ key }: { key: string }) => {
    setKeyPressed(keysPressed.add(key));
  }

    // Key being pressed up
  const upHandler = ({ key }: { key: string }) => {
    keysPressed.delete(key)
    setKeyPressed(keysPressed);
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => { 
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    }
  }, []);

  return keysPressed;

}