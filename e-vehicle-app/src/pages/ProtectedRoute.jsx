import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstancce from "../middleware/axiosInstance";
import { Underline } from "lucide-react";
import UnAuthorisedPage from "./UnAuthorisedPage";

function ProtectedRoute({ children, isAllowed }) {
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        const response = await axiosInstancce.get("/userauth");
        if (response.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
        console.log(response);
      } catch (err) {
        console.log(err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  const role = localStorage.getItem("role");
  const roleAllowed = (!isAllowed || !isAllowed.includes(role)) ? false : true;

  return (
    <div>
      {(!isAuth || !roleAllowed) ? <UnAuthorisedPage/> : children}
    </div>
  );
}

export default ProtectedRoute;
