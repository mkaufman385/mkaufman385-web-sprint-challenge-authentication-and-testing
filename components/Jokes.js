import React, { useEffect, useState } from "react";
import axios from "axios";

function Jokes() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/jokes", {
          headers: { Authorization: token },
        });
        setJokes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJokes();
  }, []);

  return (
    <div>
      <h1>Jokes</h1>
      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>{joke.joke}</li>
        ))}
      </ul>
    </div>
  );
}

export default Jokes;
