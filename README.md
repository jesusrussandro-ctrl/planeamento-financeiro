# Planeamento Financeiro

Dashboard financeiro com frontend React/Vite e API Python para Vercel.

## Estrutura

- `api/index.py` - API para dados e calculos.
- `api/data.py` - dados iniciais do dashboard.
- `frontend/` - aplicacao React/Vite.
- `vercel.json` - configuracao de build e rotas da Vercel.
- `requirements.txt` - vazio porque a API usa apenas bibliotecas padrao do Python.

## Seguranca

Por omissao, a API funciona em modo demo. Para producao, configura:

- `ALLOWED_ORIGIN` com o dominio do frontend.
- `API_TOKEN` para exigir `Authorization: Bearer <token>` nos pedidos da API.
- `VITE_API_TOKEN` no frontend, se ativares `API_TOKEN`.

Os dados atuais sao mantidos em memoria e servem apenas como prototipo. `VITE_API_TOKEN` fica embutido no bundle do frontend, por isso nao substitui autenticacao real. Para dados reais, usa uma base de dados e autenticacao por utilizador.

## Deploy

1. Envia estes ficheiros para um repositorio GitHub.
2. Importa o repositorio na Vercel.
3. Configura as variaveis de ambiente necessarias.
4. Faz deploy.
5. Abre a rota `/`.
