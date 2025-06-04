function UnAuthorisedPage() {

  return (
    <div className="font-sans container mx-auto my-5 sm:my-10 w-3/4 flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">403 Forbidden</h1>
      <h2 className="text-lg  sm:text-xl font-bold text-center">Redirect to Login Page.</h2>
    </div>
  );
}

export default UnAuthorisedPage;