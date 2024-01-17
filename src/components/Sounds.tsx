import { useEffect, useRef } from "react";
import { useSounds } from "../zustand-store/useSounds";

type SoundsProps = {
  isError: boolean;
  userInput: string[];
};

const Sounds: React.FC<SoundsProps> = ({ isError, userInput }) => {
  const keySoundRef = useRef<HTMLAudioElement>(null);
  const errorSoundRef = useRef<HTMLAudioElement>(null);
  const { errorSound, keySound } = useSounds();

  useEffect(() => {
    if (errorSound && isError) {
      const errorAudio = new Audio("/sounds/error.mp3");
      errorAudio.play();
    }

    if (keySound && !isError) {
      const audio = new Audio("/sounds/key.mp3");
      audio.play();
    }
  }, [userInput]);
  return (
    <>
      <audio preload="auto" ref={keySoundRef} src="/sounds/key.mp3"></audio>
      <audio preload="auto" ref={errorSoundRef} src="/sounds/error.mp3"></audio>
    </>
  );
};

export default Sounds;
