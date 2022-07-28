import { Routes, Route } from 'react-router-dom';
import './App.css';
import MyDecks from './components/MyDecks';
import PublishedDecks from './components/PublishedDecks';
import Games from './components/Games';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Login from './components/Login';
import Registration from './components/Registration';
import RequireAuthentification from './components/RequireAuthentification';
import Download from './components/Download';

function App() {
  return (
    <div className="app">
      <div className='appContent'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<h1>Warning! <br/>Page not available</h1>} />

          <Route path="/" element={<RequireAuthentification><MyDecks /></RequireAuthentification>} />
          <Route path="/download" element={<RequireAuthentification><Download /></RequireAuthentification>} />
          <Route path="/find-Decks" element={<RequireAuthentification><PublishedDecks /></RequireAuthentification>} />
          <Route path="/games" element={<RequireAuthentification><Games /></RequireAuthentification>} />
          <Route path="/profile" element={<RequireAuthentification><Profile /></RequireAuthentification>} />
          <Route path="/settings" element={<RequireAuthentification><Settings /></RequireAuthentification>} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
