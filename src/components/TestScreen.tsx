import React, { useEffect, useRef } from "react";
import { Story } from "../pages/TestPage";
import Char from "./Char";

type TestScreenProps = {
  story: Story;
  userInput: string[];
  currentWordIndex: number;
  prevIndexes: number[];
  addToPrevIndexes: (index: number) => void;
  incrementShiftIndex: () => void;
  shiftIndex: number;
};

const TestScreen: React.FC<TestScreenProps> = React.memo(
  ({
    story,
    userInput,
    currentWordIndex,
    prevIndexes,
    addToPrevIndexes,
    incrementShiftIndex,
    shiftIndex,
  }) => {
    const wordsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!wordsContainerRef.current) return;
      const wordsArray = Array.from(
        wordsContainerRef.current.childNodes
      ) as HTMLDivElement[];

      const wordsWidth = wordsArray
        .slice(prevIndexes[prevIndexes.length - 1], currentWordIndex + 1)
        .reduce((total, word) => {
          return total + word.clientWidth;
        }, 0);

      const containerWidth = wordsContainerRef.current.clientWidth;
      if (wordsWidth >= containerWidth) {
        addToPrevIndexes(currentWordIndex);
        incrementShiftIndex();
      }
    }, [
      userInput,
      shiftIndex,
      story,
      prevIndexes,
      currentWordIndex,
      addToPrevIndexes,
      incrementShiftIndex,
    ]);

    useEffect(() => {
      if (wordsContainerRef.current)
        wordsContainerRef.current.style.transform = `translateY(-${
          50 * shiftIndex
        }px)`;
    }, [shiftIndex]);

    return (
      <div className="w-full max-w-[1080px]  p-2  bg-white  rounded-lg h-[calc(350px+7px)] overflow-hidden">
        <div
          ref={wordsContainerRef}
          className="transition-all overflow-x-hidden duration-300 bg-[url(/images/line-image.gif)] bg-[length:100%_50px] font-pt-mono flex flex-wrap text-3xl text-[#4a4a4a] font-medium"
        >
          {story.wordsArray.map((word, wordIndex) => {
            return (
              <div key={wordIndex} className="flex">
                {word.map((char) => {
                  return (
                    <Char
                      key={char.id}
                      state={
                        userInput[char.id]
                          ? userInput[char.id] === char.value
                            ? "right"
                            : "wrong"
                          : null
                      }
                      isCurrent={userInput.length === char.id}
                      value={char.value}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.userInput === newProps.userInput &&
      oldProps.prevIndexes === newProps.prevIndexes &&
      oldProps.currentWordIndex === newProps.currentWordIndex &&
      oldProps.shiftIndex === newProps.shiftIndex
    );
  }
);

export default TestScreen;
