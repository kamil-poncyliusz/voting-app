import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((response) => response.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
