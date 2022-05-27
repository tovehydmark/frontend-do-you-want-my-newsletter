import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LogInUser } from "../models/LogInUser";

import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  //For validation when user tries to login
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = async () => {
    let logInUser = new LogInUser(username, password);

    // let controlUserInDb = Fetch(
    //   "http://localhost:1337/users/login",
    //   "post",
    //   logInUser
    // ).then((res) =>
    //   res.json().then((data) => {
    //     console.log(data);
    //   })
    // );

    let response = await fetch("http://localhost:1337/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInUser),
    }).then((res) =>
      res.json().then((data) => {
        //Logs in user if res.status == 200 + sets the userId from server
        if (res.status == 200) {
          console.log("Användare och lösen stämmer");

          localStorage.setItem("loggedInUserId", data.message);

          //Takes user to loggedIn page
          nav("/LoggedIn");
        } else {
          console.log("Fel användarnamn eller lösenord, var god försök igen");
        }
      })
    );

    setUsername("");
    setPassword("");
  };

  //Returns HTML with validation to ensure both password and username is provided by the user
  return (
    <>
      <h1>Logga in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Användarnamn: </label>
        <input
          {...register("username", {
            required: "Ange användarnamn",
          })}
          type="text"
          value={username}
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <ErrorMessage errors={errors} name="username" />

        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => <p>{message}</p>}
        />

        <label htmlFor="password">Lösenord: </label>
        <input
          {...register("password", {
            required: "Ange lösenord",
          })}
          type="text"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <ErrorMessage errors={errors} name="password" />

        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p>{message}</p>}
        />

        <button>Logga in</button>
      </form>

      <Link to={`/CreateUser`}>Skapa nytt konto</Link>
    </>
  );
}
