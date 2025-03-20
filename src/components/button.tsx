interface ButtonProps {
  text: string;
  buttonType: "button" | "submit" | "reset" | undefined;
  handleClick: () => void;
  color?: string;
}

export default function Button({
  text,
  buttonType,
  handleClick,
  color,
}: ButtonProps) {
  const classNames = `block border-2 border-zinc-500 rounded-md p-2 mt-4 cursor-pointer ${color} max-h-12`;
  return (
    <button
      type={buttonType}
      className={classNames}
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
}
