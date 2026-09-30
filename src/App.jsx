import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Breeds from './pages/Breeds.jsx';
import BreedDetail from './pages/BreedDetail.jsx';
import Birds from './pages/Birds.jsx';
import BirdDetail from './pages/BirdDetail.jsx';
import OurFarm from './pages/OurFarm.jsx';
import About from './pages/About.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Faq from './pages/Faq.jsx';
import Privacy from './pages/Privacy.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="breeds" element={<Breeds />} />
        <Route path="breeds/:slug" element={<BreedDetail />} />
        <Route path="birds" element={<Birds variant="all" />} />
        <Route path="birds/roosters" element={<Birds variant="rooster" />} />
        <Route path="birds/hens" element={<Birds variant="hen" />} />
        <Route path="birds/:id" element={<BirdDetail />} />
        <Route path="our-farm" element={<OurFarm />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<Faq />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
