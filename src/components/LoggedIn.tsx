import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { UserId } from "../models/UserId";
import { IFormInputs } from "../models/UserInterface";
import { Fetch } from "./Fetch";

export function LoggedIn() {
  const [loggedInUserId, setLoggedInUserId] = useState<string>("");
  const [loggedInUserName, setLoggedInUserName] = useState<string>("");

  // const [isLoggedin, setIsLoggedin] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    let userFromLs = localStorage.getItem("loggedInUserId");

    //If no user is logged in, one is redirected to login page if trying to access /LogedIn route
    if (!userFromLs) {
      nav("/");
    } else {
      setLoggedInUserId(userFromLs);
      // setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    presentUserDetails();
  }, [loggedInUserId]);

  const presentUserDetails = async () => {
    // let userFromLs = localStorage.getItem("loggedInUserId");

    if (loggedInUserId !== null) {
      let userIdToSend = loggedInUserId;
      let userId = new UserId(userIdToSend);

      // let response = await fetch("http://localhost:1337/users/loggedin", {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(userId),
      // }).then((res) =>
      //   res.json().then((data) => {
      //     console.log(data);
      //   })
      // );

      let response: User = await Fetch(
        "http://localhost:1337/users/loggedin",
        "post",
        userId
      ).then((res) => {
        console.log(res);

        setLoggedInUserName(res[0].username);

        return res;
      });

      console.log(response);
      console.log(response.username);
    }
  };

  return (
    <>
      <p>Välkommen {loggedInUserName} </p>
    </>
  );
}
