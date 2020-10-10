import React, { useEffect, useState } from "react";

/* useKeyPress takes the key to monitor as a string
    and keeps track of it being pressed
    params:
      targetKey: The value of the key we want to keep track of
        "pressed" state for
*/
export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  // Key being pressed down
  const downHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

    // Key being pressed up
  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  // event listener
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    }
  }, []);

  return keyPressed;
}