import { InputHTMLAttributes } from "react";

type SwitchProps = InputHTMLAttributes<HTMLInputElement>;

const Switch: React.FC<SwitchProps> = ({ id, ...props }) => {
  return (
    <label
      htmlFor={id}
      className="w-16 h-8 relative bg-primary/50  has-[:checked]:bg-gradient-primary rounded-full cursor-pointer"
    >
      <input className="sr-only peer" type="checkbox" id={id} {...props} />
      <div className="absolute top-1/2 left-1 peer-checked:translate-x-8 -translate-y-1/2 transition-all duration-300 h-6 aspect-square bg-white rounded-full"></div>
    </label>
  );
};

export default Switch;
