import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] =  useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    // good++ => error. why?
    setGood(good+1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1);
  }

  const handleBadClick = () => {
    setBad(bad+1);
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + bad*-1)/(good+neutral+bad)}</p>
      <p>positive {(good+neutral) / (good+neutral+bad) *100}%</p>
    </div>
  )
}

export default App