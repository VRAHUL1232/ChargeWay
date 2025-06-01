import Contact from "../pages/Contact";
import Profile from "../pages/Profile";

function SecondaryButton({ children, style, onClickFunction }) {
  return (
    <button onClick={onClickFunction} className={`px-2 py-1 lg:px-3 lg:py-2 rounded ${style}`}>
      {children}
    </button>
  );
}

export default SecondaryButton;
