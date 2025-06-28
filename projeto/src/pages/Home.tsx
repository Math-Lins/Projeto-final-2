import { useState } from 'react';
import { Link } from 'react-router-dom';
import { produtos } from '../utils/mock';
import { useFavoritos } from '../hooks/useFavoritos';

function Home() {
  const [busca, setBusca] = useState('');
  const { favoritos, toggleFavorito } = useFavoritos();

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} className="card" style={{ position: 'relative' }}>
            <Link to={`/produto/${produto.id}`}>
              <h2>{produto.nome}</h2>
              <p>{produto.descricao}</p>
            </Link>
            <button
              onClick={() => toggleFavorito(produto.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: favoritos.includes(produto.id) ? 'red' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
              }}
            >
              {favoritos.includes(produto.id) ? '♥' : '♡'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
