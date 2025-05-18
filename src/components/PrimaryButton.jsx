function PrimaryButton({ children, style }) {
  return (
    <button
      className={`lg:text-xl px-2 py-1 sm:px-6 sm:py-3 lg:px-9 lg:py-4 rounded font-medium ${style}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
