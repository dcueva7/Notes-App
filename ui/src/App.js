
import './App.css';
import NotesList from './NotesList'
import NotePage from './NotePage';

import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom"

import { ChakraProvider } from '@chakra-ui/react'

import 'react-quill/dist/quill.snow.css';

function App() {


  return (
    <ChakraProvider>
      <Router>
        <Routes>
            <Route path="/" exact element={<NotesList />} />
            <Route path="note/:id" element={<NotePage />} />
        </Routes>
      </Router>
      </ChakraProvider>

  );
}

export default App;
