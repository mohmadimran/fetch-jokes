import { useState } from "react";
import "./App.css"

function App() {
  const [jokes, setJokes] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {

    try {
      setLoading(true)
      setError(false)
      const res = await fetch("https://official-joke-api.appspot.com/random_joke")
      const data = await res.json();
      setJokes(data)
    } catch (error) {
      console.log(error)
      setError(true)
    }
    finally { setLoading(false) }
  }

  return (
    <div className="card">
      <h1 className="title">Random Joke</h1>
      <p className="subtitle">Cllick the button to fetch a fresh one</p>
      <button className="btn" onClick={fetchData}>{loading ? " Fetching…" : "Fetch joke"}</button>
      <div>{jokes ? <p>{jokes.punchline}</p> : <p className="joke">No joke yet</p>}</div>
      <div>{error && <p>Could not fetch a joke. Try again</p> }</div>
    </div>
  );
}

export default App;
