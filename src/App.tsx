import './App.css'

function App() {

  return (
      <div className="card">
        <h1>Equipo Rohan</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        
        <label htmlFor="passwd">Password</label>
        <input type="password" id="passwd" />
        
        <button>Login</button>
      </div>
  )
}

export default App
