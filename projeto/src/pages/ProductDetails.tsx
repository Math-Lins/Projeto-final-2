import { useParams, Link } from 'react-router-dom';
import { produtos } from '../utils/mock';

function ProductDetail() {
  const { id } = useParams();
  const produtoId = Number(id);
  const produto = produtos.find((p) => p.id === produtoId);

  if (!produto) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Produto não encontrado</h2>
        <Link to="/">← Voltar ao catálogo</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <h1>{produto.nome}</h1>
      <p style={{ fontSize: '1.2rem' }}>{produto.descricao}</p>
      <p><strong>ID do Produto:</strong> {produto.id}</p>
      <p><strong>Preço:</strong> R$ {(produto.id * 100).toFixed(2)}</p>
      <p><strong>Estoque:</strong> {10 + produto.id} unidades</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{
          textDecoration: 'none',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          borderRadius: '5px'
        }}>← Voltar ao catálogo</Link>
      </div>
    </div>
  );
}

export default ProductDetail;
