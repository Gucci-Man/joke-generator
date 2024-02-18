import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch jokes from the api
  async function getJokes() {
    try {
      let jokes = [];
      let seenJokes = new Set();

      while (jokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokes.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }

      setJokes(jokes);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      // Handle the error (e.g., display a message to the user)
    }
  }

  // useEffect for fetching jokes on mount
  useEffect(() => {
    
    getJokes();
  }, [numJokesToGet]); // Run useEffect on mount and if numJokesToGet changes

  // Method to fetch new jokes
  const generateNewJokes = () => {
    setIsLoading(true);
    getJokes(); // Reuse the existing getJokes function
  };

  // Method to handle voting
  const vote = (id, delta) => {
    setJokes(allJokes =>
      allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  };

  // Sort jokes by votes
  const sortedJokes = jokes.sort((a, b) => b.votes - a.votes);

  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      {isLoading ? (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      ) : (
        sortedJokes.map(j => (
          <Joke
            key={j.id}
            id={j.id}
            votes={j.votes}
            text={j.joke}
            vote={vote}
          />
        ))
      )}
    </div>
  );
}

export default JokeList;
