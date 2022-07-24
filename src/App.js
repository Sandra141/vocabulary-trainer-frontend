import { Routes, Route } from 'react-router-dom';
import './App.css';
import MyDecks from './components/MyDecks';
import PublishedDecks from './components/PublishedDecks';
import Games from './components/Games';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Login from './components/Login';
import Registration from './components/Registration';
import useFetch from './hooks/useFetch';

function App() {
  const { data, isError, isLoading } = useFetch("https://pokeapi.co/api/v2/pokemon/ditto")
  console.log("data", data)
  console.log("isError", isError)
  console.log("isLoading", isLoading)

  return (
    <div className="app">
      <div className='appContent'>
        <Routes>
          <Route path="/" element={<MyDecks />} />
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
