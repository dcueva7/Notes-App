import Header from './Header';
import './App.css';
import NotesList from './NotesList'
import {
  BrowserRouter as Router,
  Route,

} from "react-router-dom"

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <NotesList />
      </div>
    </Router>

  );
}

export default App;
