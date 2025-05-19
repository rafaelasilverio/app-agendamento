export interface Agendamento {
  id: number;
  servico: string;
  descricao: string;
  imagem: string;
  preco: string;
  prestador: string;
  data: string;
  horario: string;
  status: 'pendente' | 'confirmado' | 'cancelado';
  categoria: string;
  calendario: string[];
  horarioAtendimento: { inicio: string; fim: string };
  tempoEstimado: string;
  tipoAtendimento: string;
  endereco: string;
  contato: string;
  metodosPagamento: string[];
}

