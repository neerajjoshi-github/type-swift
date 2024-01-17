import React from "react";

type CharProps = {
  isCurrent: boolean;
  state: null | "right" | "wrong";
  value: string;
};

const Char: React.FC<CharProps> = React.memo(
  ({ isCurrent, state, value }) => {
    return (
      <span
        className={`
              ${isCurrent && " text-blue-500 animate-border rounded-none"} 
              ${state === "right" && "text-[#a6cfa1] bg-[#edf7e7]"}
              ${state === "wrong" && "text-[#d86368] bg-[#ffdcd9] error-text"}
              h-[42px] min-w-[21px] mx-[1px] rounded-md flex items-center justify-center border-b-[3px] border-transparent my-[4px]`}
      >
        {value}
      </span>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.isCurrent === newProps.isCurrent &&
      oldProps.state === newProps.state
    );
  }
);

export default Char;
