function SecondaryButton({ children, style }) {
  return (
    <button className={`px-2 py-1 lg:px-3 lg:py-2 rounded ${style}`}>
      {children}
    </button>
  );
}

export default SecondaryButton;
