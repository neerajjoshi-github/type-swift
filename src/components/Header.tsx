import { FaClockRotateLeft } from "react-icons/fa6";
import {
  PiSpeakerSimpleNoneFill,
  PiSpeakerSimpleHighFill,
} from "react-icons/pi";
import { useSoundDialog } from "../zustand-store/useSoundDialog";
import { useSounds } from "../zustand-store/useSounds";
import { displaySeconds } from "../helpers/displaySeconds";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTime } from "../zustand-store/useTimer";
import { useTestProgress } from "../zustand-store/useTestProgress";

const Header = () => {
  const { toggle } = useSoundDialog();
  const { errorSound, keySound } = useSounds();
  const { remainingSeconds } = useTime();
  const { progressPrecentage } = useTestProgress();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="w-full fixed top-0 left-0 flex items-center justify-between py-1 px-4 text-white bg-gradient-primary">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-lg font-black">
          TypeSwift<span className="text-sm font-medium"> .com</span>
        </span>
      </Link>
      {pathname.includes("/typing-test/") && (
        <>
          <div className="absolute left-1/2 -translate-x-1/2">
            <p className="font-semibold capitalize">
              {pathname.replace("/typing-test/", "").replace("-", " ")} Typing
              Test
            </p>
          </div>
          <div className="flex gap-6">
            {!!remainingSeconds && (
              <div>
                <span className="text-xl font-bold">
                  {displaySeconds(remainingSeconds)}
                </span>
              </div>
            )}
            <button onClick={() => navigate(0)} title="redo">
              <FaClockRotateLeft className="text-xl" />
            </button>
            <button title="sound setting" onClick={toggle} className="text-xl">
              {errorSound || keySound ? (
                <PiSpeakerSimpleHighFill />
              ) : (
                <PiSpeakerSimpleNoneFill />
              )}
            </button>
          </div>
        </>
      )}

      <div
        className="absolute -bottom-2 left-0 bg-gradient-secondary h-2 transition-[width] duration-1000"
        style={{
          width: `${progressPrecentage}%`,
        }}
      />
    </header>
  );
};

export default Header;
