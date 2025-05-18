function Header4({children,style}){
    return (
        <p className={`text-sm sm:text-md ${style}`}>
              {children}
            </p>
    );
}

export default Header4;