import { useState } from 'react';

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, value}) => (
  <p>{text} {value}</p>
)

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={good + neutral + bad}/>
      <StatisticLine text='average' value={(good + bad*-1)/(good+neutral+bad)}/>
      <StatisticLine text='positive' value={(good+neutral) / (good+neutral+bad) *100 + '%'} />
    </div>
  )
}

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
      <Button text='good' handleClick={handleGoodClick}/>
      <Button text='neutral' handleClick={handleNeutralClick}/>
      <Button text='bad' handleClick={handleBadClick}/>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App