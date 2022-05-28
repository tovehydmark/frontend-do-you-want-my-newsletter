import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateSubscriptionStatus } from "../models/UpdateSubscriptionStatus";
import { User } from "../models/User";
import { UserId } from "../models/UserId";
import { IFormInputs } from "../models/UserInterface";
import { Fetch } from "./Fetch";

export function LoggedIn() {
  const [loggedInUserId, setLoggedInUserId] = useState<string>("");
  const [loggedInUserName, setLoggedInUserName] = useState<string>("");
  const [loggedInSubscriptionStatus, setLoggedInSubscriptionStatus] =
    useState<boolean>(false);

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
      //Ensure the right value is in the variable. Sometimes react render weirdly and the value is null when using e.g. loggedInUserId only
      let userIdToSend = loggedInUserId;
      let userId = new UserId(userIdToSend);

      let response: User = await Fetch(
        "http://localhost:1337/users/loggedin",
        "post",
        userId
      ).then((res) => {
        console.log(res);

        setLoggedInUserName(res[0].username);
        setLoggedInSubscriptionStatus(res[0].wantsNewsLetter);

        return res;
      });
    }
  };

  async function changeSubscriptionStatus() {
    setLoggedInSubscriptionStatus(!loggedInSubscriptionStatus);

    let updateUser = new UpdateSubscriptionStatus(
      loggedInUserId,
      !loggedInSubscriptionStatus
    );

    // let response = await fetch(
    //   "http://localhost:1337/users/updateSubscription",
    //   {
    //     method: "put",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(updateUser),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });

    await Fetch(
      "http://localhost:1337/users/updateSubscription",
      "put",
      updateUser
    ).then((data: any) => {
      console.log(data);
    });
  }

  return (
    <>
      <div className="loggedInView">
        <p>Välkommen {loggedInUserName} </p>
        <p>
          {loggedInSubscriptionStatus
            ? "Trött på våra utskick?"
            : "Vill du ha vårt nyhetsbrev?"}
        </p>
        <button onClick={changeSubscriptionStatus}>
          {loggedInSubscriptionStatus ? "Avprenumerera" : "Prenumerera"}
        </button>
        <button>Logga ut</button>
      </div>
    </>
  );
}
