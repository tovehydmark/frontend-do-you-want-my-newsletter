import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { User } from "../models/User";
import { IFormInputs } from "../models/UserInterface";
import { Fetch } from "./Fetch";

export function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wantsNewsLetter, setWantsNewsLetter] = useState(false);

  //For validation when registering a new user
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  const onSubmit = async () => {
    let newUser = new User(username, email, password, wantsNewsLetter);

    //Post new user to database
    Fetch("https://backendforlogintaskone.herokuapp.com/users/newAccount", "post", newUser).then(
      (data) => {
        let responseFromServer = data;
        console.log(responseFromServer);

        if (
          responseFromServer == "Username is taken, please try another name"
        ) {
          alert("Användarnamn upptaget");
          return;
        } else {
          if (username.length > 6 && password.length > 6 && email.length > 6) {
            alert("New user created");
          }
        }
      }
    );

    setUsername("");
    setEmail("");
    setPassword("");
  };

  //Toggles the value of the "wants the news letter" when the box is ticked
  function toggleWantsNewsLetter() {
    setWantsNewsLetter(!wantsNewsLetter);
  }
  //Only alerts new user created if all fields are filled correctly (only then a new user will be posted to the database)
  // function login() {
  //   if (username.length > 6 && password.length > 6 && email.length > 6) {
  //     alert("New user created");
  //   }
  // }

  //Returning a sign-up form for new users. Validation and error messages are provided to ensure the right data comes into the database
  return (
    <>
      <h1>Skapa nytt konto</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Användarnamn: </label>
        <input
          {...register("username", {
            required: "Ange användarnamn",
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Användarnamnet får endast innehålla bokstäver",
            },
            minLength: {
              value: 7,
              message: "Användarnamnet måste vara minst 7 tecken långt",
            },
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

        <label htmlFor="email">Epost: </label>
        <input
          {...register("email", {
            required: "Ange en e-postadress",

            minLength: {
              value: 7,
              message: "Ange en riktig e-post, minst 7 tecken lång",
            },
          })}
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <ErrorMessage
          errors={errors}
          name="email"
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

        <label htmlFor="password">Lösenord: </label>
        <input
          {...register("password", {
            required: "Ange ett lösenord",

            minLength: {
              value: 7,
              message: "Lösenordet måste vara minst 7 tecken långt",
            },
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

        <label htmlFor="wantsNewsLetter">Vill du ha mitt nyhetsbrev?: </label>
        <input
          type="checkbox"
          name="wantsNewsLetter"
          id="wantsNewsLetter"
          onClick={toggleWantsNewsLetter}
        />

        <button type="submit" disabled={!username || !email || !password}>
          Registrera ny användare
        </button>
        <Link to={`/`}>Tillbaka till start</Link>
      </form>
    </>
  );
}
