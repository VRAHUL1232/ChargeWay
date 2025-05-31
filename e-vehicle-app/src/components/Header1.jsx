function Header1({children,style}){
    return (
        <h1 className={`text-xl sm:text-4xl font-bold mb-4 text-gray-800 ${style}`}>
             {children}
            </h1>
    );
}

export default Header1;