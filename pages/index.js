import { useState } from 'react'

const headers = {
  'Content-Type': 'application/json',
}

function App() {
  const [username, setUsername] = useState('jonathan_wbn')
  const [password, setPassword] = useState('PAa3MajZYy')
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [code, setCode] = useState('')

  const handleSubmit = () => {
    fetch(showCodeInput ? '/challenge' : '/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        code,
      }),
      headers,
    })
      .then(res => res.json())
      .then(({ code }) => {
        if (code === 'needs_code') setShowCodeInput(true)
        else console.log('code', code)
      })
  }

  return showCodeInput ? (
    <>
      <input value={code} placeholder="code" onChange={e => setCode(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  ) : (
    <>
      <input value={username} placeholder="username" onChange={e => setUsername(e.target.value)} />
      <input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default App
