import { create } from "zustand";

const sound_preferences_Key = "SOUND_PREFERENCES" as const;

type soundsState = {
  errorSound: boolean;
  keySound: boolean;
  toggleErrorSound: () => void;
  toggleKeySound: () => void;
};

type SoundPreferences = {
  errorSound: boolean;
  keySound: boolean;
};

const getUserSoundPreferences = (): SoundPreferences => {
  const soundPreferences = localStorage.getItem(sound_preferences_Key);
  if (!soundPreferences) return { errorSound: false, keySound: false };
  return JSON.parse(soundPreferences) as SoundPreferences;
};

const setUserSoundPreferences = (soundPreferences: SoundPreferences) => {
  localStorage.setItem(sound_preferences_Key, JSON.stringify(soundPreferences));
};

export const useSounds = create<soundsState>()((set) => ({
  errorSound: getUserSoundPreferences().errorSound,
  keySound: getUserSoundPreferences().keySound,
  toggleErrorSound: () =>
    set((state) => {
      setUserSoundPreferences({
        errorSound: !state.errorSound,
        keySound: state.keySound,
      });
      return { errorSound: !state.errorSound };
    }),
  toggleKeySound: () =>
    set((state) => {
      setUserSoundPreferences({
        errorSound: state.errorSound,
        keySound: !state.keySound,
      });
      return { keySound: !state.keySound };
    }),
}));
