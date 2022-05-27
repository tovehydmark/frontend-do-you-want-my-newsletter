import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoggedIn() {
  const [loggedInUser, setLoggedInUser] = useState<string>("");

  const nav = useNavigate();

  useEffect(() => {
    let userFromLs = localStorage.getItem("loggedInUserId");

    //If no user is logged in, one is redirected to login page if trying to access /LogedIn route
    if (!userFromLs) {
      nav("/");
    } else {
      setLoggedInUser(userFromLs);
    }
  }, []);

  //Här är loggedInUser sin sträng
  console.log(loggedInUser);

  return (
    <>
      <p>Logged in </p>
    </>
  );
}
