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
          The Crib strives to simplify and streamline communication between roommates. We invite you
          to use this as a virtual hub for fundamental communication between roommates.
        </div>
        <div class="chatband">
          <h1>Bulletin Board</h1>
          The bulletin board on The Crib connects roommates through one communication board. The
          feed includes all roommate posts for each person to access.
        </div>
        <div class="listband">
          <h1>Shopping List</h1>
          Our list joins together the needs of all roommates. Each member can contribute items that
          the living space needs. This allows each roommate to be equally accountable for buying
          shared items. Enter an item in the search box and click to add!
        </div>
        <div class="calenband">
          <h1>Calendar</h1>
          The group calendar on the crib allows roommates to share events happening in each other's
          lives. Whether one member has planned a study session or everyone grabbing dinner, the
          calendar keeps roommates on the same page.
        </div>
      </div>
    </div>
  )
}

export default Home
