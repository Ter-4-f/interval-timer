import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RootPage from './routes/RootPage';
import Clock from './routes/Clock';


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export default function AAAA() {
    return (
        <Router>
            <Routes>
                <Route path="/clock" element={<Clock />} />
                <Route path="/" element={<RootPage />} />
                {/* <Route path="*" element={<NotFound/>}/> */}
                {/* Add other routes here if needed */}
            </Routes>
          
        </Router>
      );
}