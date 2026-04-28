import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import System from './pages/System';
import FormPendaftaran from './pages/FormPendaftaran';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="system" element={<System />} />
          <Route path="form-pendaftaran" element={<FormPendaftaran />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

