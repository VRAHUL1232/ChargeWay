function Header2({children,style}) {
  return (
    <h1 className={`text-xl sm:text-3xl font-bold mb-4 text-gray-800 ${style}`}>
        {children}
    </h1>
  );
}

export default Header2;
