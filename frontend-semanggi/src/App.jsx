import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import System from './pages/System';
import FormPendaftaran from './pages/FormPendaftaran';
import Login from './pages/Login';
import Forum from './pages/Forum';
import ThreadDetail from './pages/ThreadDetail';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Gallery from './pages/Gallery';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <>
      <LoadingScreen />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="system" element={<System />} />
          <Route path="form-pendaftaran" element={<FormPendaftaran />} />
          <Route path="register" element={<FormPendaftaran />} />
          <Route path="login" element={<Login />} />
          <Route path="forum" element={<Forum />} />
          <Route path="forum/:id" element={<ThreadDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

