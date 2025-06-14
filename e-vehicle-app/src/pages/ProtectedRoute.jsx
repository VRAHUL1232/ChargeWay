import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstancce from "../middleware/axiosInstance";
import UnAuthorisedPage from "./UnAuthorisedPage";

function ProtectedRoute({ children, isAllowed }) {
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        setIsAuth(false);
        return;
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

  const role = localStorage.getItem("role");
  const roleAllowed = !isAllowed || !isAllowed.includes(role) ? false : true;

  return <div>{isAuth && roleAllowed ? children : <UnAuthorisedPage />}</div>;
}

export default ProtectedRoute;
