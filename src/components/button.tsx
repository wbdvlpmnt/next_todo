interface ButtonProps {
  text: string;
  buttonType: "button" | "submit" | "reset" | undefined;
  handleClick: () => void;
}

export default function Button({ text, buttonType, handleClick }: ButtonProps) {
  return (
    <button
      type={buttonType}
      className="block border-2 border-zinc-500 rounded-md p-2 mt-4 cursor-pointer"
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
}
