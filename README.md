# POC CodeRabbit: revisão de segurança em PRs

Projeto Node.js sem dependências externas para testar a revisão automática do CodeRabbit em um repositório público. A aplicação expõe `GET /health` e `GET /hello?name=...`. A segunda rota mostra um caso simples de saída HTML que deve manter o escape do texto enviado pelo usuário.

Estimativas de custo e escala: [docs/custos.md](docs/custos.md).

Resultado da segunda avaliação: [docs/benchmark-02.md](docs/benchmark-02.md).

## Executar localmente

Requer Node.js 20 ou superior.

```bash
npm test
npm start
```

Depois, abra `http://127.0.0.1:3000/hello?name=Maria`.

## Ativar o CodeRabbit

1. Entre em [app.coderabbit.ai](https://app.coderabbit.ai/) com a conta GitHub que administra este repositório.
2. Instale o GitHub App do CodeRabbit e selecione **apenas** `rafael-fante/poc-coderabbit`.
3. Confirme no painel do CodeRabbit que o repositório aparece como ativo. A configuração em `.coderabbit.yaml` pede revisão automática de PRs para `main`, com foco em segurança para `src/**`.
4. Abra uma PR com uma mudança em `src/server.js`. O CodeRabbit deve publicar a revisão na PR automaticamente. Ele é integrado pelo GitHub App; não é executado pela Action deste repositório.

O CodeRabbit informa que a revisão de PRs de repositórios públicos é gratuita. Não habilite produtos com cobrança por uso no painel para esta POC.

## Teste sugerido

Após instalar o App, crie uma branch de teste e altere **somente nessa branch** a resposta de `/hello` para inserir `name` no HTML sem `escapeHtml(name)`. Abra uma PR para `main` e verifique se a revisão aponta o risco de XSS e sugere restaurar o escape. Não faça merge dessa alteração. A ausência de um comentário específico não prova que a mudança é segura; registre o resultado observado.

A Action `Security POC` roda em `opened`, `synchronize` e `reopened`: executa os testes Node e o Semgrep Community Edition com regras de JavaScript e segredos. Ela não depende de token ou assinatura do CodeRabbit. Os resultados aparecem em **Actions** e nos checks da PR. Um check falho exige revisão humana antes do merge.

## Critérios da POC

- CodeRabbit publica uma revisão na PR após sua abertura.
- A Action aparece nos checks e executa testes e análise estática.
- Uma alteração insegura feita apenas para o teste é identificada, discutida e descartada sem merge.
- Nenhuma cobrança é ativada no CodeRabbit.
