import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SoundDialog from "../components/SoundDialog";
import { useSoundDialog } from "../zustand-store/useSoundDialog";
import Sounds from "../components/Sounds";
import TestResult from "../components/TestResult";
import TestScreen from "../components/TestScreen";
import { useTime, useTimer } from "../zustand-store/useTimer";
import { useTestProgress } from "../zustand-store/useTestProgress";
import { getStories } from "../helpers/GetStories";

export type Chars = {
  id: number;
  value: string;
};

export type Story = {
  wordsArray: Chars[][];
  charsArray: string[];
};

const regex = /^[a-zA-Z0-9\s[\]!@#$%^&*()-_+=;:'",.<>?/\\]$/;

const TestPage = () => {
  // Params
  const { id } = useParams() as { id: string };
  const [stringNum, type] = id.split("-") as [string, string];
  const num = Number(stringNum);

  // Params validation
  if (type !== "minute" && type !== "page") {
    throw new Response("Bad Request", {
      status: 400,
      statusText: `Url seems to be broken!!`,
    });
  }

  if (
    (type === "minute" && num > 5) ||
    num <= 0 ||
    (type === "page" && num > 3)
  ) {
    throw new Response("Bad Request", {
      status: 400,
      statusText: `Please select valid number of ${type}!!`,
    });
  }

  // Store
  const { isOpen } = useSoundDialog((state) => state);
  const { setRemainingSeconds } = useTime();
  const { setProgressPrecentage } = useTestProgress();

  // Test states
  const [story] = useState<Story>(getStories({ num, type }));
  const [userInput, setUserInput] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [testState, setTestState] = useState<null | "started" | "finished">(
    null
  );

  // TIMER
  const { seconds, startTimer, stopTimer } = useTimer();

  // FOR CONTAINER SCROLL
  const [prevIndexes, setPrevIndexes] = useState([0]);
  const [shiftIndex, setShiftIndex] = useState(0);
  const [wrongCharactersTyped, setWrongCharactersTyped] = useState(0);

  useEffect(() => {
    if (testState === "finished") return;

    const keydownHandler = (e: KeyboardEvent) => {
      if (regex.test(e.key) || e.key === " ") {
        const len = userInput.length;
        if (e.key !== story.charsArray[len]) {
          setWrongCharactersTyped((prev) => prev + 1);
        }
        if (
          userInput[len - 1] !== story.charsArray[len - 1] &&
          e.key !== story.charsArray[len]
        ) {
          return;
        }

        if (story.charsArray[userInput.length] === " ") {
          setCurrentWordIndex((prev) => prev + 1);
        }
        setUserInput((prev) => [...prev, e.key]);
      }

      if (e.key === "Backspace" && userInput.length !== 0) {
        if (story.charsArray[userInput.length - 1] === " ") {
          setCurrentWordIndex((prev) => prev - 1);
          setPrevIndexes((prev) => prev.slice(0, prev.length - 1));
          setShiftIndex((prev) => (prev === 0 ? prev : prev - 1));
        }
        setUserInput((prev) => prev.slice(0, prev.length - 1));
      }
    };

    if (type === "page") {
      setProgressPrecentage((userInput.length / story.charsArray.length) * 100);
    }

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [userInput, setProgressPrecentage, type, story, testState]);

  useEffect(() => {
    if (
      (type === "minute" && seconds === num * 60) ||
      userInput.length === story.charsArray.length
    ) {
      setTestState("finished");
      stopTimer();
      return;
    }

    if (userInput.length !== 0) {
      setTestState("started");
      startTimer();
    }
  }, [seconds, num, stopTimer, userInput, startTimer, type, story]);

  useEffect(() => {
    if (type === "minute") {
      const remainingSeconds = num * 60 - seconds;
      setRemainingSeconds(remainingSeconds);
      setProgressPrecentage(100 - (remainingSeconds / (num * 60)) * 100);
    }
  }, [
    seconds,
    setRemainingSeconds,
    setProgressPrecentage,
    num,
    testState,
    type,
  ]);

  return (
    <div className="h-screen flex flex-col gap-8 items-center justify-center px-3">
      {isOpen && <SoundDialog />}
      <Sounds
        isError={
          userInput[userInput.length - 1] !==
          story.charsArray[userInput.length - 1]
        }
        userInput={userInput}
      />
      {testState === "finished" ? (
        <TestResult
          totalCharactersTyped={userInput.length}
          wrongCharactersTyped={wrongCharactersTyped}
          secondsTaken={seconds}
        />
      ) : (
        <TestScreen
          story={story}
          userInput={userInput}
          currentWordIndex={currentWordIndex}
          prevIndexes={prevIndexes}
          addToPrevIndexes={(index) =>
            setPrevIndexes((prev) => [...prev, index])
          }
          shiftIndex={shiftIndex}
          incrementShiftIndex={() => setShiftIndex((prev) => prev + 1)}
        />
      )}
    </div>
  );
};

export default TestPage;
