import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavoritos } from '../hooks/useFavoritos';
import { useTheme } from '../contexts/ThemeContext'; // se estiver usando tema

interface Produto {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState('');
  const { favoritos, toggleFavorito } = useFavoritos();
  const { theme, toggleTheme } = useTheme(); // opcional

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Produto[]) => setProdutos(data))
      .catch((err) => console.error('Erro ao buscar produtos:', err));
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>Catálogo de Produtos</h1>
        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--button-bg)',
            color: 'var(--button-text)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
        </button>
      </header>

      <input
        type="text"
        placeholder="Buscar produto"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          padding: '8px',
          width: '300px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center'
      }}>
        {produtosFiltrados.map(produto => (
          <div
            key={produto.id}
            style={{
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-color)',
              border: '1px solid var(--card-border)',
              borderRadius: '8px',
              padding: '16px',
              width: '220px',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <img
              src={produto.image}
              alt={produto.title}
              style={{ height: '150px', objectFit: 'contain', marginBottom: '10px' }}
            />

            <h2 style={{ fontSize: '1rem' }}>{produto.title}</h2>
            <p style={{ fontSize: '0.9rem' }}>{produto.description.slice(0, 60)}...</p>
            <p><strong>R$ {(produto.price * 5).toFixed(2)}</strong></p>
            <p style={{ fontSize: '0.8rem' }}>⭐ {produto.rating.rate} ({produto.rating.count})</p>

            <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <Link to={`/produto/${produto.id}`}>
                <button style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Ver detalhes
                </button>
              </Link>

              <button
                onClick={() => alert(`Produto "${produto.title}" comprado!`)}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Comprar
              </button>
            </div>

            <button
              onClick={() => toggleFavorito(produto.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: favoritos.includes(produto.id) ? 'red' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer'
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

export default Produtos;
