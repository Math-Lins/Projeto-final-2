import { useState } from 'react';
import { produtos, type Produto } from '../data/produtos';

const ListaProdutos = () => {
  const [selecionado, setSelecionado] = useState<Produto | null>(null);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const handleSelecionar = (produto: Produto) => {
    setSelecionado(produto);
  };

  const handleAdicionar = (produto: Produto) => {
    setCarrinho((prev) => [...prev, produto]);
    setCompraFinalizada(false);
  };

  const handleRemover = (index: number) => {
    setCarrinho((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalizarCompra = () => {
    setCarrinho([]);
    setSelecionado(null);
    setCompraFinalizada(true);
  };

  return (
    <div>
      <h2>Produtos Disponíveis</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <strong>{produto.nome}</strong><br />
            <em>{produto.descricao}</em><br />
            <button onClick={() => handleSelecionar(produto)}>Ver Detalhes</button>
            <button onClick={() => handleAdicionar(produto)} style={{ marginLeft: '10px' }}>
              Adicionar ao Carrinho
            </button>
          </li>
        ))}
      </ul>

      {selecionado && (
        <div style={{ marginTop: '20px', background: '#fff', padding: '10px', borderRadius: '8px' }}>
          <h3>Detalhes do Produto</h3>
          <p><strong>{selecionado.nome}</strong></p>
          <p>{selecionado.descricao}</p>
        </div>
      )}

      {carrinho.length > 0 && (
        <div style={{ marginTop: '20px', background: '#fff', padding: '10px', borderRadius: '8px' }}>
          <h3>Carrinho ({carrinho.length} item{carrinho.length > 1 ? 's' : ''})</h3>
          <ul>
            {carrinho.map((p, index) => (
              <li key={index}>
                {p.nome}
                <button
                  onClick={() => handleRemover(index)}
                  style={{ marginLeft: '10px', backgroundColor: 'crimson' }}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleFinalizarCompra} style={{ marginTop: '10px', backgroundColor: 'green' }}>
            Finalizar Compra
          </button>
        </div>
      )}

      {compraFinalizada && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#d4edda', borderRadius: '6px' }}>
          <strong>Compra finalizada com sucesso!</strong>
        </div>
      )}
    </div>
  );
};

export default ListaProdutos;
