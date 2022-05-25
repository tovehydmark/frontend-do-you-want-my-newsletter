import { useState } from "react";
import { User } from "../models/User";
import { Fetch } from "./Fetch";

export function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Ensures the browser doesn't update when form is submitted, and clears input fields
  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setUsername("");
    setEmail("");
    setPassword("");
  };

  //Save user input info to a user object and post to the server
  function saveNewUser(username: string, email: string, password: string) {
    let newUser = new User(username, email, password);

    //Posting new user to database
    Fetch("http://localhost:3000/users/newAccount", "post", newUser);
  }

  return (
    <>
      <h1>Skapa nytt konto</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="username">Användarnamn: </label>
        <input
          type="text"
          value={username}
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Epost: </label>
        <input
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Lösenord: </label>
        <input
          type="text"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="wantsNewsLetter">Vill du ha mitt nyhetsbrev?: </label>
        <input type="checkbox" name="wantsNewsLetter" id="wantsNewsLetter" />

        <button onClick={() => saveNewUser(username, email, password)}>
          Registrera ny användare
        </button>
      </form>
    </>
  );
}
