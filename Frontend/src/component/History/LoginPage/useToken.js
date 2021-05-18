import { useState } from "react";

export default function useToken() {
  //const [token, setToken] = useState();

  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    if (userToken == "Failed") {
      alert("Username or Password Wrong!!!!");
    } else {
      localStorage.setItem("token", userToken);
      setToken(userToken);
      console.log(userToken);
    }
  };

  return {
    setToken: saveToken,
    token,
  };
}
