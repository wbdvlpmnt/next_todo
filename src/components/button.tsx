interface ButtonProps {
  text: string;
  buttonType: "button" | "submit" | "reset" | undefined;
}

export default function Button({ text, buttonType }: ButtonProps) {
  return (
    <button
      type={buttonType}
      className="block border-2 border-amber-50 rounded-md p-2 mt-4 cursor-pointer"
    >
      {text}
    </button>
  );
}
