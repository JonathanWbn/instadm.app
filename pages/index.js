import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <>
      <input
        value={username}
        placeholder="username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        value={password}
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default App
