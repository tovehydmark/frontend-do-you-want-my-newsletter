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

  const nav = useNavigate();

  useEffect(() => {
    let userFromLs = localStorage.getItem("loggedInUserId");

    //If no user is logged in, user is redirected to login page if trying to access /LogedIn route
    if (!userFromLs) {
      nav("/");
    } else {
      setLoggedInUserId(userFromLs);
    }
  }, []);

  useEffect(() => {
    presentUserDetails();
  }, [loggedInUserId]);

  const presentUserDetails = async () => {
    if (loggedInUserId !== null) {
      //Ensure the right value is in the variable. Sometimes react render weirdly and the value is null when using e.g. loggedInUserId only
      let userIdToSend = loggedInUserId;
      let userId = new UserId(userIdToSend);

      let response: User = await Fetch(
        "https://backendforlogintaskone.herokuapp.com/users/loggedin",
        "post",
        userId
      ).then((res) => {
        // console.log(res);

        setLoggedInUserName(res[0].username);
        setLoggedInSubscriptionStatus(res[0].wantsNewsLetter);

        return res;
      });
    }
  };

  //Changes subscription status in db via "put" based on userId, when clicking the change subscription button
  async function changeSubscriptionStatus() {
    setLoggedInSubscriptionStatus(!loggedInSubscriptionStatus);

    let updateUser = new UpdateSubscriptionStatus(
      loggedInUserId,
      !loggedInSubscriptionStatus
    );

    await Fetch(
      "https://backendforlogintaskone.herokuapp.com/users/updateSubscription",
      "put",
      updateUser
    ).then((data: any) => {
      // console.log(data);
    });
  }

  function logout() {
    localStorage.clear();
    nav("/");
  }

  return (
    <>
      <div className="loggedInView">
        <h2>Välkommen {loggedInUserName} </h2>
        <p>
          {loggedInSubscriptionStatus
            ? "Trött på våra utskick?"
            : "Vill du ha vårt nyhetsbrev?"}
        </p>
        <button onClick={changeSubscriptionStatus}>
          {loggedInSubscriptionStatus ? "Avprenumerera" : "Prenumerera"}
        </button>
        <button onClick={logout}>Logga ut</button>
      </div>
    </>
  );
}
