import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserId } from "../models/UserId";
import { Fetch } from "./Fetch";

export function LoggedIn() {
  const [loggedInUserId, setLoggedInUserId] = useState<string>("");

  const [isLoggedin, setIsLoggedin] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    let userFromLs = localStorage.getItem("loggedInUserId");

    //If no user is logged in, one is redirected to login page if trying to access /LogedIn route
    if (!userFromLs) {
      nav("/");
    } else {
      setLoggedInUserId(userFromLs);
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    presentUserDetails();
  }, [isLoggedin]);

  const presentUserDetails = async () => {
    let userFromLs = localStorage.getItem("loggedInUserId");

    if (userFromLs !== null) {
      let userId = new UserId(userFromLs);

      let response = await fetch("http://localhost:1337/users/loggedin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // Host: "http://localhost:1337",
        },
        body: JSON.stringify(userId),
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      );
    }

    // await Fetch(
    //   "http://localhost:1337/users/loggedin",
    //   "post",
    //   loggedInUserId
    // ).then((res) =>
    //   res.json().then((data: any) => {
    //     console.log(data);
    //   })
    // );
  };

  return (
    <>
      <p>Logged in </p>
    </>
  );
}
