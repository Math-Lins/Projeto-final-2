export type Produto = {
  id: number;
  nome: string;
  descricao: string;
};

export const produtos: Produto[] = [
  { id: 1, nome: 'Mouse Gamer', descricao: 'Mouse com RGB e alta precisão' },
  { id: 2, nome: 'Teclado Mecânico', descricao: 'Teclado com switches azuis e iluminação' },
  { id: 3, nome: 'Monitor 144Hz', descricao: 'Monitor Full HD 24" para jogos' },
  { id: 4, nome: 'Headset Surround', descricao: 'Headset com som 7.1 e microfone removível' },
  { id: 5, nome: 'Mousepad XXL', descricao: 'Mousepad antiderrapante para mesa inteira' },
  { id: 6, nome: 'Webcam Full HD', descricao: 'Webcam com foco automático e microfone' },
  { id: 7, nome: 'Cadeira Gamer', descricao: 'Cadeira ergonômica com apoio lombar' },
  { id: 8, nome: 'Notebook i7', descricao: 'Notebook com 16GB RAM e SSD 512GB' },
  { id: 9, nome: 'Placa de Vídeo RTX', descricao: 'RTX 3060 com 12GB GDDR6' },
  { id: 10, nome: 'Controle sem fio', descricao: 'Controle compatível com PC e consoles' }
];
