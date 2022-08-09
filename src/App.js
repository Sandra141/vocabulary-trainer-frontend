import { Routes, Route } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards';
import FindSharedDecks from './components/FindSharedDecks';
import Chars from './components/games/Chars';
import Connect from './components/games/Connect';
import Flashcards from './components/games/Flashcards';
import Games from './components/games/Games';
import Memory from './components/games/Memory';
import MultipleChoice from './components/games/MultipleChoice';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Logout from './components/Logout';
import PageNotFound from './components/PageNotFound';
import MyDecks from './components/MyDecks';
import Profile from './components/Profile';
import PublishedDecks from './components/PublishedDecks';
import Registration from './components/Registration';
import Settings from './components/Settings';
import Download from './components/system/Download';
import RequireAuthentification from './components/system/RequireAuthentification';

function App() {
  return (
    <div className="app">
      <div className='appContent'>
        <Routes>
          {/* WITHOUT SECURITY */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/logout" element={<Logout />} />


          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />

          {/* WITH SECURITY */}
          <Route path="/download" element={<RequireAuthentification><Download /></RequireAuthentification>} />
          <Route path="/find-Decks" element={<RequireAuthentification><FindSharedDecks /></RequireAuthentification>} />
          <Route path="/find-Decks/:id" element={<RequireAuthentification><PublishedDecks /></RequireAuthentification>} />

          <Route path="/games" element={<RequireAuthentification><Games /></RequireAuthentification>} />
          <Route path="/games/Flascards" element={<RequireAuthentification><Flashcards /></RequireAuthentification>} />
          <Route path="/games/Memory" element={<RequireAuthentification><Memory /></RequireAuthentification>} />
          <Route path="/games/Multiple-Choice" element={<RequireAuthentification><MultipleChoice /></RequireAuthentification>} />
          <Route path="/games/Chars" element={<RequireAuthentification><Chars /></RequireAuthentification>} />
          <Route path="/games/Connect" element={<RequireAuthentification><Connect /></RequireAuthentification>} />

          <Route path="/profile" element={<RequireAuthentification><Profile /></RequireAuthentification>} />
          <Route path="/decks" element={<RequireAuthentification><MyDecks /></RequireAuthentification>} />
          <Route path="/decks/:id" element={<RequireAuthentification><Cards /></RequireAuthentification>} />
        </Routes >
      </div >
    </div >
  );
}

export default App;
