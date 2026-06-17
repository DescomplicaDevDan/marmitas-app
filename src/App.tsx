import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cardapio } from './pages/Cardapio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cardapio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
