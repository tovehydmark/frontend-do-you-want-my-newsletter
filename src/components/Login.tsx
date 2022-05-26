import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LogInUser } from "../models/LogInUser";
import { Fetch } from "./Fetch";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

    let response = await fetch("http://localhost:1337/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInUser),
    });

    console.log(response);

    // //Checks if the user is registered

    //Varför kan jag inte använda min fetch-fil för??? får inte tillbaka response...

    // Fetch("http://localhost:1337/users/login", "post", logInUser);

    if (response.status == 200) {
      console.log("Användare och lösen stämmer");
    } else {
      console.log("Fel användarnamn eller lösenord, var god försök igen");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <>
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

        <ErrorMessage
          errors={errors}
          name="username"
          render={({ messages }) => {
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p className="errorMessage" key={type}>
                    {message}
                  </p>
                ))
              : null;
          }}
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

        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) => {
            console.log("messages: ", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p className="errorMessage" key={type}>
                    {message}
                  </p>
                ))
              : null;
          }}
        />

        <button>Logga in</button>
      </form>
    </>
  );
}
