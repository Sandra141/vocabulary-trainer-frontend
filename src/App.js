import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import MyDecks from './components/MyDecks';
import Cards from './components/Cards';
import PublishedDecks from './components/PublishedDecks';
import Games from './components/Games';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  return (
    <div className="app">
      <div className='appContent'>
        <Routes>
        <Route path="/" element={<Homepage />} /> {/*---- change when ready ----*/}
          <Route path="/decks" element={<MyDecks />} />
          <Route path="/decks/:id" element={<Cards />} />
          <Route path="/find-Decks" element={<PublishedDecks />} />
          <Route path="/games" element={<Games />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
