import Switch from "./Switch";
import { useSoundDialog } from "../zustand-store/useSoundDialog";
import { useSounds } from "../zustand-store/useSounds";

const SoundDialog = () => {
  const { toggle, isOpen } = useSoundDialog();
  const { errorSound, keySound, toggleErrorSound, toggleKeySound } =
    useSounds();
  return (
    <div className="z-10 w-screen h-screen bg-black/20 fixed top-0 left-0 flex items-center justify-center">
      <div
        className={`
        ${isOpen && "dialog-open"}
      bg-white rounded-lg py-4 px-6 w-[450px] transition duration-300
      `}
      >
        <h1 className="text-3xl font-bold">Sound Settings!!</h1>
        <div className="border-y border-gray-300 my-2 flex flex-col gap-3 py-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Typing Sound</span>
            <Switch
              checked={keySound}
              onChange={toggleKeySound}
              id="typing-sound"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Error Sound</span>
            <Switch
              checked={errorSound}
              onChange={toggleErrorSound}
              id="error-sound"
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={toggle}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundDialog;
