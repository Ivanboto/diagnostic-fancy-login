import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from "./pages/LogInPage";
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
