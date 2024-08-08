

## Config

To enable both eslint and prettier on file save, add the following to your settings.json vscode file:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true
}
```



## Front-End Stack

- **Main Technologies**

  - TS

  - Vue.JS (3.x)

  - Pinia

- **Bundler**

  - Vite

- **Testing**
  - Vue Test Utils
  - Vitest
- **Containerization**
  - Docker
- **Linters**

  - ESLint

  - Prettier

  - Stylelint

## How to run

### Running locally

> **ATTENTION! To use this app you must change license token in _.npmrc_ for TIP-TAP on one you own! More info -- https://tiptap.dev/**

#### Installing dependencies

    npm install

#### Compile and Hot-Reload for Development

    npm run dev

#### Type-Check, Compile and Minify for Production

    npm run build

#### Run Unit Tests with [Vitest](https://vitest.dev/)

    npm run test:unit

#### Lint with [ESLint](https://eslint.org/)

    npm run lint:fix

### Running from container

> **ATTENTION! To use this app you must change license token in _Dockerfile_ for TIP-TAP on one you own! More info -- https://tiptap.dev/**

    docker compose up

### In detached mode

     docker compose up -d
