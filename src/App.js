import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import MyDecks from './components/MyDecks';
import Cards from './components/Cards';
import PublishedDecks from './components/PublishedDecks';
import Games from './components/Games';
import Flashcards from './components/Flashcards';
import Memory from './components/Memory';
import MultipleChoice from './components/MultipleChoice';
import Chars from './components/Chars';
import Connect from './components/Connect';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Login from './components/Login';
import Registration from './components/Registration';
import RequireAuthentification from './components/system/RequireAuthentification';
import Download from './components/system/Download';

function App() {
  return (
    <div className="app">
      <div className='appContent'>
        <Routes>
          <Route path="/" element={<Homepage />} /> {/*---- change when ready ----*/}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<h1>Warning! <br />Page not available</h1>} />



          <Route path="/download" element={<RequireAuthentification><Download /></RequireAuthentification>} />
          <Route path="/find-Decks" element={<RequireAuthentification><PublishedDecks /></RequireAuthentification>} />

          <Route path="/games" element={<RequireAuthentification><Games /></RequireAuthentification>} />
          <Route path="/games/Flascards" element={<RequireAuthentification><Flashcards /></RequireAuthentification>} />
          <Route path="/games/Memory" element={<RequireAuthentification><Memory /></RequireAuthentification>} />
          <Route path="/games/Multiple-Choice" element={<RequireAuthentification><MultipleChoice /></RequireAuthentification>} />
          <Route path="/games/Chars" element={<RequireAuthentification><Chars /></RequireAuthentification>} />
          <Route path="/games/Connect" element={<RequireAuthentification><Connect /></RequireAuthentification>} />

          <Route path="/profile" element={<RequireAuthentification><Profile /></RequireAuthentification>} />
          <Route path="/settings" element={<RequireAuthentification><Settings /></RequireAuthentification>} />
          <Route path="/decks" element={<RequireAuthentification><MyDecks /></RequireAuthentification>} />
          <Route path="/decks/:id" element={<RequireAuthentification><Cards /></RequireAuthentification>} />
        </Routes >
      </div >
    </div >
  );
}

export default App;
