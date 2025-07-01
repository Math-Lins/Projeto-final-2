import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Produto } from "../types/Produtos"


function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data: Produto[]) => {
        setProdutos(data);
        setCarregando(false);
      });
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) return <p style={{ padding: '20px' }}>Carregando produtos...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Catálogo de Produtos</h1>
      <input
        type="text"
        placeholder="Buscar produto"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            backgroundColor: '#fff'
          }}>
            <img
              src={produto.image}
              alt={produto.title}
              style={{ height: '160px', objectFit: 'contain', marginBottom: '10px' }}
            />
            <h2 style={{ fontSize: '1rem' }}>{produto.title}</h2>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>{produto.description.slice(0, 80)}...</p>
            <p><strong>Categoria:</strong> {produto.category}</p>
            <p><strong>Preço:</strong> R$ {(produto.price * 5).toFixed(2)}</p>
            <p><strong>Nota:</strong> ⭐ {produto.rating.rate} ({produto.rating.count} avaliações)</p>
            <Link to={`/produto/${produto.id}`} style={{
              display: 'inline-block',
              marginTop: '10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '4px',
              textDecoration: 'none'
            }}>
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produtos;
