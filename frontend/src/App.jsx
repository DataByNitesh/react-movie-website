import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/home";
import Watched from "./pages/Watched";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { AuthProvider } from "./contexts/AuthContext";
import { WatchedProvider } from "./contexts/WatchedContext";
import NavBar from "./component/NavBar"
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <WatchedProvider>
          <NavBar />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(20, 20, 20, 0.9)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(229, 9, 20, 0.3)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
              },
              iconTheme: {
                primary: '#e50914',
                secondary: '#fff',
              },
            }}
          />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watched" element={<Watched />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </WatchedProvider>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;



