import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import { Input } from './components/Input'

function App() {
  const [score, setScores] = useState()
  const [allScores, setAllScores] = useState([])
  
  
  const socket = io("http://127.0.0.1:3000")

  function connectSocket() {
    socket.on("connection", (socket) => {
      console.log(socket)
    })
  }

  const handleInput = (e) => {
    e.preventDefault()
    let { name, value } = e.target;
    let currentObj = {[name] : value}

    setScores((prev) => ({...prev, ...currentObj}))
  }
  
  const sendScore = () => {
    socket.emit('scores', score)
    socket.on('playerScores', (playerScores) => {
      setAllScores(playerScores)
    })
    
  }

  useEffect(() => {
    connectSocket()
  }, [])

  return (
    <>
      <h1>React Multiplayer Dashboard</h1> 
      <Input handleInput={handleInput} name="name" placeholder={'Enter your Name'}/>
      <Input handleInput={handleInput} name="score" placeholder={'Enter your Score'}/>

      <button onClick={sendScore}>Publish Score</button>

      <table>
        <tbody>
          {allScores.map((score, key) => (
            <tr key={key}>
              <td>{score.name}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
