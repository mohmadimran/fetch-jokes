import { useState } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setJoke(null);

    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!res.ok) throw new Error("Failed to fetch joke");

      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setError("Could not fetch a joke. Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1 className="title">Random Joke</h1>
      <p className="subtitle">Click the button to fetch a fresh one</p>

      <button
        className="btn"
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? "Fetching…" : "Fetch Joke"}
      </button>

      {/* Joke */}
      {joke && (
        <div>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div>
          <p>{error}</p>
          <button className="btn" onClick={fetchData}>Try Again</button>
        </div>
      )}

      {/* Initial State */}
      {!joke && !error && !loading && <p>No joke yet</p>}
    </div>
  );
}

export default App;
