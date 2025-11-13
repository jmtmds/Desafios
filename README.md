# 📻 Piadas Rápidas (React Native)

[![Status](https://img.shields.io/badge/status-em%20andamento-yellow)](https://github.com/[SEU-USUARIO-GITHUB]/[NOME-DO-REPOSITORIO])

> Um aplicativo móvel simples e divertido, construído com React Native e Expo, que exibe piadas aleatórias em Português.

### Prévia do App

<p align="center">
  <img src="[URL]" alt="Demo do App Piadas Rápidas" width="300px">
</p>

---

## 📌 Status do Projeto

O projeto está **em andamento**. Funcionalidades básicas estão implementadas, futuramente mais melhorias...

---

## 📜 Sobre o Projeto

Este projeto foi criado como um exercício prático para solidificar conceitos fundamentais de desenvolvimento mobile com **React Native** e **Expo**.

O foco principal foi aprender a:

* **Consumir APIs:** Realizar chamadas (`fetch`) a uma API externa para buscar dados dinâmicos (piadas).
* **Gerenciar Estado:** Utilizar os hooks `useState` e `useEffect` para controlar o estado da aplicação (a piada atual, o estado de carregamento).
* **Estilização com Styled-Components:** Aplicar estilos de forma componentizada e dinâmica usando `styled-components/native`.
* **Componentização:** Estruturar a aplicação em componentes reutilizáveis.
* **Manipulação de Eventos:** Lidar com o toque do usuário no botão para buscar uma nova piada.

---

## ✨ Funcionalidades

* **Piada Inicial:** Exibe uma piada aleatória assim que o aplicativo é carregado.
* **Buscar Nova Piada:** Um botão permite ao usuário solicitar uma nova piada a qualquer momento.
* **Feedback de Carregamento:** Mostra uma mensagem "Buscando piada..." enquanto a nova piada está sendo carregada pela API.
* **Interface Limpa:** Um design simples e direto ao ponto, focado no conteúdo.

---

## 🚀 Tecnologias Utilizadas

* **React Native**
* **Expo** (para gerenciamento do projeto e build)
* **TypeScript**
* **Styled-Components** (para estilização)
* **API:** [JokeAPI](https://v2.jokeapi.dev/) (configurada para buscar piadas em Português)

---

## ⚙️ Como Executar o Projeto Localmente

Para rodar este projeto na sua máquina, você precisará ter o ambiente de desenvolvimento React Native/Expo configurado.

**Pré-requisitos:**
* [Node.js](https://nodejs.org/) (LTS)
* [Yarn](https://classic.yarnpkg.com/en/docs/install) (ou `npm`)
* `expo-cli` (opcional, mas recomendado)
* App **Expo Go** no seu celular (Android ou iOS)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/jmtmds/Desafios.git
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd [NOME-DO-REPOSITORIO]/Jokes-App
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
4.  **Inicie o servidor de desenvolvimento Expo:**
    ```bash
    npm start
    # ou
    yarn start
    ```
5.  **Execute o App:**
    * Abra o aplicativo **Expo Go** no seu celular e escaneie o QR Code que apareceu no seu terminal.
    * Alternativamente, pressione `a` no terminal para tentar abrir em um emulador Android ou `i` para um simulador iOS (se estiverem instalados).

---

_Desenvolvido com ❤️ por [João Marcos Tavares]_
