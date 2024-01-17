import stories from "../../data/stories.json";
import { Chars } from "../pages/TestPage";

type GetStoriesParams = {
  num: number;
  type: "page" | "minute";
};

const maxWPM = 300; // words per minute
const maxWPP = 450; // Words per page

export const getStories = ({ num, type }: GetStoriesParams) => {
  const wordsArray: Chars[][] = [];
  const charsArray: string[] = [];
  const numberOfWords: number = type === "minute" ? maxWPM * num : maxWPP * num;
  let addedWords = 0;

  while (addedWords < numberOfWords) {
    const randomIndex = Math.floor(Math.random() * stories.length);
    const { story } = stories[randomIndex];
    const words =
      story.match(/\S+\s*/g)?.slice(0, numberOfWords - addedWords) || [];
    const chars = words.flatMap((word) => word.split(""));
    charsArray.push(...chars);

    let charIndex = 0;
    words.forEach((word) => {
      const temp = word
        .split("")
        .map((value, index) => ({ value, id: index + charIndex }));

      charIndex += word.length;
      wordsArray.push(temp);
    });
    addedWords += words.length;
  }

  return {
    wordsArray,
    charsArray,
  };
};
