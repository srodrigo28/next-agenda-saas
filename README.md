# Next Agenda (SaaS)

Aplicação de agendamento e gestão de serviços construída com Next.js, TypeScript e TailwindCSS — pronta para evoluir como um produto SaaS.

**Stack principal**:
- **Framework:** Next.js 15
- **Linguagem:** TypeScript
- **UI:** React 19 + TailwindCSS 4 + ShadCN UI
- **BD:** Prisma (Postgres / MySQL compatível)
- **Pagamentos:** Stripe (Pix, cartão, boleto)

## Recursos
- Autenticação de usuários
- Painel administrativo para empresas
- Agendamento de horários e disponibilidade
- Lembretes e notificações
- Gestão de serviços (criar/editar/excluir)

## Rápido (Desenvolvimento)
Pré-requisitos: `node` (v18+ recomendado) e `npm` ou `pnpm`.

No Windows (cmd.exe) ou em qualquer terminal, execute:

```bash
npm install
npx prisma generate
```

Configurar variáveis de ambiente (copie do arquivo de exemplo se existir):

```bash
copy text.env.local .env.local
```

Depois, rode em modo de desenvolvimento:

```bash
npm run dev
```

Se precisar aplicar migrations localmente (desenvolvimento):

```bash
npx prisma migrate dev
```

Para aplicar migrations em ambiente de produção usando migrações existentes:

```bash
npx prisma migrate deploy
```

## Variáveis de ambiente (exemplos)
- `DATABASE_URL` : string de conexão do banco (Prisma)
- `NEXTAUTH_SECRET` : segredo do NextAuth
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Confira `text.env.local` para um exemplo/guia local já incluído no repositório.

## Estrutura relevante do projeto
- `src/app/` : rotas e pages do Next.js
- `src/lib/prisma.ts` : cliente Prisma
- `prisma/` : schema e migrations
- `src/app/(panel)` : painel administrativo
- `src/app/(public)` : páginas públicas (agendamento)

## Testes e lint
- Linter/formatador (se configurado): execute os scripts em `package.json` (ex.: `npm run lint`, `npm run format`).

## Deploy
- Recomendado: Vercel (integração nativa com Next.js). Configure as variáveis de ambiente no painel do provedor e execute as migrations se necessário.

## Contribuindo
- Abra issues para bugs e discussões de features.
- Faça fork, crie branch com `feat/...` ou `fix/...` e envie PR com descrição clara.

## Observações
- Este repositório está em desenvolvimento. Algumas rotas, componentes e ações podem estar em progresso (ex.: criação de lembretes, componentes de agendamento).

## Licença
- Coloque aqui a licença do projeto (ex.: MIT) ou remova esta seção conforme necessário.

---

Se quiser, eu posso:
- Adicionar um resumo das variáveis de ambiente reais encontradas no `text.env.local`.
- Incluir instruções de deploy passo a passo para Vercel.
- Adicionar exemplos de endpoints (API) e comandos de seed para o banco.

Diga qual dessas você prefere que eu adicione em seguida.