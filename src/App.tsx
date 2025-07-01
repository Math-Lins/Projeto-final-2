import { Routes, Route } from 'react-router-dom';
import Produtos from './components/ListaProdutos'; 
import ProductDetail from './pages/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Produtos />} />
      <Route path="/produto/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
