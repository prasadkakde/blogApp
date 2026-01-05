const Button = ({ text, variant, onClick }) => {
  const baseClass = "px-4 py-2 rounded font-semibold";
  const style =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <button className={`${baseClass} ${style}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
