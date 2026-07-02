# Kairós Engenharia

Site institucional da Kairós Engenharia, preparado para publicação no GitHub Pages em:

https://renovera1.github.io/renovera-projetos-eletricos/

## Stack

- Vite
- React
- Tailwind CSS
- Vitest + Testing Library
- ESLint

## Scripts

```bash
pnpm install
pnpm dev
pnpm lint
pnpm test
pnpm build
```

O `vite.config.js` usa:

```js
base: "/renovera-projetos-eletricos/"
```

Após o build, `scripts/postbuild-pages.mjs` copia o `index.html` para as rotas estáticas:

- `/servicos/`
- `/a-kairos/`
- `/cases/`
- `/conteudos/`
- `/contato/`
- `/404.html`

## Publicação no GitHub Pages

1. Suba o conteúdo deste projeto para `renovera1/renovera-projetos-eletricos`.
2. Rode `pnpm install`.
3. Rode `pnpm build`.
4. Publique a pasta `dist/` pelo fluxo escolhido do GitHub Pages ou configure um workflow para build automático.
5. Valide a URL final: `https://renovera1.github.io/renovera-projetos-eletricos/`.

## Configurações editáveis

As principais configurações ficam em `src/config/site.js`.

- WhatsApp: defina `VITE_WHATSAPP_NUMBER` no ambiente ou edite `whatsappNumber`.
- E-mail: edite `email`.
- LinkedIn: defina `VITE_LINKEDIN_URL` ou edite `linkedinUrl`.
- Formulário: configure `VITE_CONTACT_ENDPOINT`.
- Domínio futuro: atualize `baseUrl`, `sitemap.xml`, `robots.txt` e o `base` do Vite se o caminho mudar.

Enquanto `VITE_CONTACT_ENDPOINT` não estiver configurado, o formulário valida os campos e exibe:

> Solicitação validada. Configure o endpoint seguro de envio para concluir a integração.

## Conteúdo

- Serviços: `src/data/content.js`, em `serviceGroups`.
- Cases: `src/data/content.js`, em `caseStudies`.
- Artigos: `src/data/content.js`, em `articles`.
- Textos institucionais: `src/App.jsx` e `src/data/content.js`.

Não há tokens, senhas ou chaves de API no front-end.
