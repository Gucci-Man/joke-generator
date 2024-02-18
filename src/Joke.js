import React, { useState } from "react";
import "./Joke.css";

function Joke({ id, vote, votes, text }) {
  // Optionally, add a hook for local visual feedback 
  // on vote button clicks if desired.
  // const [isVoting, setIsVoting] = useState(false);

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={() => { 
            // setIsVoting(true); // Toggle if using isVoting state
            vote(id, +1) 
          }}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={() => { 
            // setIsVoting(true); 
            vote(id, -1) 
          }}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;

