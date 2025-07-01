import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavoritos } from '../hooks/useFavoritos';
import './Home.css';

interface Produto {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function Home() {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { favoritos, toggleFavorito } = useFavoritos();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Produto[]) => setProdutos(data));
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">Catálogo de Produtos</h1>
      <input
        className="searchInput"
        type="text"
        placeholder="Buscar produto"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <div className="productsGrid">
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} className="card">
            <Link to={`/produto/${produto.id}`}>
              <img
                className="productImage"
                src={produto.image}
                alt={produto.title}
              />
              <h2 className="productTitle">{produto.title}</h2>
              <p className="productDescription">
                {produto.description.length > 60
                  ? produto.description.slice(0, 60) + '...'
                  : produto.description}
              </p>
              <p className="productPrice">R$ {(produto.price * 5).toFixed(2)}</p>
              <p className="productCategory">Categoria: {produto.category}</p>
              <p className="productRating">
                ⭐ {produto.rating.rate} ({produto.rating.count})
              </p>
            </Link>
            <button
              onClick={() => toggleFavorito(produto.id)}
              className={`favoriteButton ${
                favoritos.includes(produto.id) ? 'active' : ''
              }`}
              aria-label={
                favoritos.includes(produto.id)
                  ? 'Remover dos favoritos'
                  : 'Adicionar aos favoritos'
              }
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
