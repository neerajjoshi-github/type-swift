import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

type TestResultProps = {
  totalCharactersTyped: number;
  wrongCharactersTyped: number;
  secondsTaken: number;
};

const TestResult: React.FC<TestResultProps> = ({
  totalCharactersTyped,
  wrongCharactersTyped,
  secondsTaken,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const wpm = Math.round(totalCharactersTyped / 5.5 / (secondsTaken / 60));
  const accuracy = (
    100 -
    (wrongCharactersTyped / totalCharactersTyped) * 100
  ).toFixed(1);

  return (
    <div className="flex w-full flex-col gap-8 p-6 max-w-[1080px] bg-white rounded-lg">
      <div className="flex-1 flex items-center  gap-6 ">
        <img className="w-80" src="/svgs/laptop.svg" alt="Laptop Icon" />
        <div className="relative flex-1 flex flex-col h-full items-center justify-center gap-4 shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)]  rounded-2xl">
          <img
            className="absolute top-0 -left-14 max-w-xs"
            src="/svgs/stars-1.svg"
            alt="Stars"
          />
          <img
            className="absolute top-0 -right-14 max-w-xs"
            src="/svgs/stars-2.svg"
            alt="Stars"
          />
          <img
            className="absolute top-0 -left-9 max-w-xs "
            src="/svgs/bubble-arrow.svg"
            alt="Stars"
          />
          <h3 className="text-4xl font-bold z-[1]">Typing Test Complete!</h3>
          <h3 className="text-4xl z-[1]">
            You typed the{" "}
            <span className="font-bold">
              {pathname.replace("/typing-test/", "").replace("-", " ")} Typing
              Test
            </span>
          </h3>
          <p className="text-2xl font-bold z-[1]">
            Your speed was <span className="text-green-600">{wpm} WPM</span>{" "}
            with <span className="text-green-600">{accuracy}%</span> accuracy!
          </p>
        </div>
      </div>
      <div className="border-t border-gray-300 flex items-center justify-between px-4 py-2">
        <Link
          to="/"
          className="text-primary underline underline-offset-2 font-semibold text-lg flex items-center gap-1"
        >
          <MdKeyboardDoubleArrowLeft /> Back to Typing Tests
        </Link>

        <button
          onClick={() => navigate(0)}
          className="bg-primary hover:bg-primary/90 transition duration-300 text-white text-lg font-bold px-4 py-2 rounded-lg"
        >
          Take Again
        </button>
      </div>
    </div>
  );
};

export default TestResult;
