import { useState } from 'react';
import Navbar from './components/Navbar'
import WordsList from './components/WordsList'

const App = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="App">
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <WordsList searchText={searchText} />
    </div>
  );
}

export default App;
