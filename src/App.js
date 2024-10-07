import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login';
import Home from './home';
function App() {
  return (
    <Router>
      <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
