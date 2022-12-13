import logo from '../logo.png'
import './index.css'

const Home = () => {
  return (
    <div className="Home">
      <div class="h-page">
        <div class="topband">
          <h1>Home</h1>
          <img src={logo} alt="Crib Logo" width="100" height="100" />
        </div>
        <div class="welcomeband">
          <h1>Welcome!</h1>
          Describe app..
        </div>
        <div class="chatband">
          <h1>Chat</h1>
          Describe Chat
        </div>
        <div class="listband">
          <h1>Shopping List</h1>
          Describe shopping list
        </div>
      </div>
    </div>
  )
}

export default Home
