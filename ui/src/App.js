
import './App.css';
import NotesList from './NotesList'
import NotePage from './NotePage';
import SignIn from './SignIn';

import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom"

import { ChakraProvider } from '@chakra-ui/react'

import 'react-quill/dist/quill.snow.css';
import SignUp from './SignUp';

function App() {


  return (
    <ChakraProvider>
      <Router>
        <Routes>
            <Route path="/" exact element={<NotesList />} />
            <Route path="note/:id" element={<NotePage />} />
            <Route path="sign_in" element={<SignIn />} />
            <Route path="sign_up" element={<SignUp />} />
        </Routes>
      </Router>
      </ChakraProvider>

  );
}

export default App;
