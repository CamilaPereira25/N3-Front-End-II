// src/data/sugestoes.js
import { FaWater, FaHandsHelping, FaSpa, FaBook, FaSmile, FaWalking } from 'react-icons/fa';

// Lista de sugestões de tarefas com ícones
export const listaDeSugestoes = [
  { 
    titulo: "Beber 2L de água", 
    icone: FaWater, // Ícone de gota d'água
    cor: "#66CCFF" // Cor opcional para o ícone
  },
  { 
    titulo: "15 min de alongamento", 
    icone: FaHandsHelping, // Ícone de mãos (simboliza flexibilidade/ajuda)
    cor: "#FF9966"
  },
  { 
    titulo: "Meditar 5 minutos", 
    icone: FaSpa, // Ícone de flor de lótus/spa
    cor: "#99CC66"
  },
  { 
    titulo: "Ler 10 páginas", 
    icone: FaBook, // Ícone de livro
    cor: "#CC99FF"
  },
  { 
    titulo: "Anotar 3 gratidões", 
    icone: FaSmile, // Ícone de sorriso
    cor: "#FFCC00"
  },
  { 
    titulo: "Caminhada de 20 min", 
    icone: FaWalking, // Ícone de pessoa andando
    cor: "#99CCFF"
  }
];