# TruckTracker - Desafio Inlog 🚀

## Descrição do Projeto 📜

Este projeto foi desenvolvido como parte do desafio técnico para a vaga de Frontend Developer na Inlog. O objetivo foi criar uma aplicação React com duas páginas principais:

1. **Listagem de Caminhões**: Exibe uma lista de veículos ordenados pela proximidade do usuário, com um mapa interativo (usando Leaflet) que mostra a localização de cada veículo.
2. **Adição de Caminhões**: Permite ao usuário cadastrar novos veículos, incluindo informações básicas e a localização (coordenadas).

O projeto foi desenvolvido com React, TypeScript, e utiliza bibliotecas como Leaflet para mapas, Axios para requisições à API, e React Testing Library para testes automatizados.

---

## Funcionalidades ✨

- **Listagem de Veículos**:
  - Lista de veículos ordenada pela proximidade do usuário.
  - Mapa interativo com pins indicando a localização de cada veículo.
  - Integração com a API para buscar os dados dos veículos.

- **Cadastro de Veículos**:
  - Formulário para cadastrar novos veículos.
  - Campos para identificação, placa, número de série do rastreador e coordenadas (latitude e longitude).
  - Validação de campos e feedback visual.

- **Testes Automatizados**:
  - Testes para garantir que a listagem de veículos e o formulário de cadastro funcionem corretamente.
  - Testes de integração com a API.

---

## Bônus Implementados 🎁

- **Filtro de Veículos**: Adicionei um campo de busca para filtrar veículos por nome ou placa.
- **Upload de Imagem**: No formulário de cadastro, é possível adicionar uma imagem do veículo.

---

## Pré-visualização 🎥

### Listagem de Veículos

### Cadastro de Veículos

### GIF de Demonstração

---

## Tecnologias Utilizadas 🛠️

- **React**: Biblioteca principal para construção da interface.
- **TypeScript**: Para tipagem estática e melhor organização do código.
- **Vite**: Build tool rápida para desenvolvimento e produção.
- **MUI (Material UI)**: Biblioteca de componentes para estilização moderna.
- **Emotion**: Biblioteca de CSS-in-JS usada pelo MUI.
- **Leaflet & React Leaflet**: Biblioteca para exibição de mapas interativos.
- **Axios**: Para requisições HTTP à API.
- **SWR**: Gerenciamento de estado assíncrono para requisições e cache de dados.
- **React Hook Form**: Gerenciamento de formulários com validação eficiente.
- **Zod**: Biblioteca de validação de schemas integrada ao React Hook Form.
- **UUID**: Para geração de identificadores únicos universais.
- **Zustand**: Gerenciamento de estado leve e eficiente.
- **MirageJS**: Simulação de API para desenvolvimento sem backend.
- **Keycloak JS**: Gerenciamento de autenticação e autorização.
- **JSPDF & JSPDF-Autotable**: Geração de PDFs, incluindo tabelas formatadas.
- **React Router**: Para gerenciamento de rotas.
- **Styled Components**: Para estilização dos componentes.

### Testes e Qualidade de Código 🧪

- **Vitest**: Framework de testes unitários e integração.
- **React Testing Library**: Testes focados na usabilidade de componentes.
- **Jest DOM**: Extensões do Jest para testar o DOM de maneira mais intuitiva.
- **Testing Library User Event**: Simulação interativa de eventos do usuário.
- **ESLint**: Linter para manter a padronização do código.
- **Prettier**: Formatação automática do código.
- **Sonar Scanner**: Análise de código para identificar bugs e vulnerabilidades.
