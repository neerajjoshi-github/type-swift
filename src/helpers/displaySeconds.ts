export const displaySeconds = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const remainingSeconds = seconds - min * 60;
  return `${min}:${
    remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`
  }`;
};
