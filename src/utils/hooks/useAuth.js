import { useNavigate } from "react-router-dom";

const isLoggedIn = (redirectedPage) => {
  const navigate = useNavigate();

  let authToken = sessionStorage.getItem("Auth Token");

  if (authToken) {
    navigate(`/${redirectedPage}`);
  } else {
    navigate("/login");
  }
};

export default isLoggedIn;
