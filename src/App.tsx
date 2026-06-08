import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cardapio } from './pages/Cardapio';
import { TabelaNutricional } from './components/TabelaNutricional';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/tabela-nutricional" element={<TabelaNutricional />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;