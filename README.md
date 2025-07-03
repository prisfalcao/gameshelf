# 🎮 GameShelf

Aplicação React que permite gerenciar sua coleção de jogos, adicionando manualmente ou importando dados diretamente da API RAWG. Com interface intuitiva, validação de formulários e componentes reutilizáveis, é possível adicionar, editar, remover e visualizar jogos com praticidade.

## 📌 Funcionalidades

- Adição manual de jogos com formulário validado.
- Importação de jogos diretamente da [RAWG API](https://rawg.io/apidocs).
- Edição e exclusão de jogos da estante.
- Busca de jogos por nome.
- Feedbacks visuais com modais de sucesso e erro.
- Armazenamento local via `localStorage`.

## ⚙️ Tecnologias Utilizadas

- **React**
- **React Router DOM**
- **Formik + Yup** (validação)
- **SCSS**
- **localStorage**
- **API RAWG** (para importação de jogos)

## 🌐 API Externa

Esta aplicação utiliza a [RAWG Video Games Database API](https://rawg.io/apidocs) para importar dados de jogos.

- **Chave de API**: Sim (requer cadastro gratuito)
- **Licença**: Gratuita para uso não comercial
- **Endpoint utilizado**: `/games?search={query}`

## 🧪 Componentes Reutilizados

- `Navbar`: cabeçalho com navegação e campo de busca
- `CustomButton`: botão estilizado e reutilizável
- `GameCard`: cartão com dados do jogo e botão de ação
- `Modal`: modal genérico para feedback de ações

## 🛠️ Instalação e Execução

1. Clone este repositório:
   ```bash
   git clone https://github.com/prisfalcao/gameshelf.git

2. Acesse a pasta:
   ```bash
   cd gameshelf

3. Instale as dependências:
   ```bash
   npm install

4. Inicie o servidor local:
   ```bash
   npm start

📄 Licença
Projeto desenvolvido para fins acadêmicos (pós-graduação em desenvolvimento full stack). Uso livre para fins não comerciais.


---

# 🎮 GameShelf

A React application to manage your game collection. You can add games manually or import them directly from the RAWG API. With a clean interface, form validation, and reusable components, it offers full control over your personal game library.

## 📌 Features

- Add games manually via a validated form.
- Import games from the [RAWG API](https://rawg.io/apidocs).
- Edit and delete games from your shelf.
- Search games by title.
- Visual feedback via success/error modals.
- Local data storage using `localStorage`.

## ⚙️ Technologies Used

- **React**
- **React Router DOM**
- **Formik + Yup** (form validation)
- **SCSS**
- **localStorage**
- **RAWG API** (game import)

## 🌐 External API

This project uses the [RAWG Video Games Database API](https://rawg.io/apidocs) to fetch game data.

- **API Key Required**: Yes (free account needed)
- **License**: Free for non-commercial use
- **Endpoint used**: `/games?search={query}`

## 🧪 Reused Components

- `Navbar`: header with navigation and search bar
- `CustomButton`: reusable styled button
- `GameCard`: game card with action button
- `Modal`: generic modal for user feedback

## 🛠️ Installation & Run

1. Clone this repository:
   ```bash
   git clone https://github.com/prisfalcao/gameshelf.git

2. Navigate to the folder:
   ```bash
   cd gameshelf

3. Install dependencies:
   ```bash
   npm install

4. Start the dev server:
   ```bash
   npm start

📄 Licence
Project developed for academic purposes (postgraduate coursework in Full Stack Development). Free for non-commercial use.
