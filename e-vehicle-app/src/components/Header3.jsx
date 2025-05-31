function Header3({children,style}) {
  return (
    <h3 className={`text-md sm:text-xl font-bold mb-2 text-gray-800 ${style}`}>{children}</h3>
  );
}

export default Header3;
