import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstancce from "../middleware/axiosInstance";
import UnAuthorisedPage from "./UnAuthorisedPage";

function ProtectedRoute({ children, isAllowed }) {
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        setIsAuth(false);
        return;
      }

      if (!isAllowed?.includes(role)){
        navigate("/login");
      }

      try {
        const response = await axiosInstancce.get("/userauth");
        if (response.status === 200) {
          setIsAuth(true);
        } else {
          navigate("/login");
          setIsAuth(false);
        }
        console.log(response);
      } catch (err) {
        navigate("/login");
        console.log(err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);
  
  return <div>{children}</div>;
}

export default ProtectedRoute;
