import React from "react";

function Home() {
  return (
    <div>
      <h1>Welcome to the Joke App</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
