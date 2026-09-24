# Resultado da segunda POC de revisão de segurança

PR avaliada: [#3 — benchmark de segurança](https://github.com/rafael-fante/poc-coderabbit/pull/3). A PR foi aberta em 24/09/2026 às **19:49:30 UTC**, permaneceu sem merge e foi convertida em *draft* após a análise. O código vulnerável existe somente na branch de teste; o servidor de demonstração escuta apenas em `127.0.0.1`.

## Casos preparados e evidência

As quatro falhas abaixo foram introduzidas sem nomeá-las na descrição da PR. Cada uma foi reproduzida localmente usando dados de teste, sem credenciais nem serviços externos.

| Caso preparado | Prova local | CodeRabbit | Semgrep CE da Action |
| --- | --- | --- | --- |
| Path traversal, CWE-22 | `name=../README.md` leu arquivo fora de `fixtures` | Detectou; classificou como Critical | Não detectou |
| SSRF, CWE-918 | A rota de proxy acessou `/health` pelo endereço local do servidor | Detectou; classificou como Critical | Não detectou |
| Injeção de comando, CWE-78 | Um argumento com separador de shell produziu marcador extra na saída | Detectou; classificou como Critical | Não detectou |
| Token sem assinatura verificada, CWE-347 | Um JWT forjado com `role=admin` recebeu HTTP 200 | Detectou; classificou como Critical | Não detectou |

O CodeRabbit encontrou também um **quinto problema não preparado**: uma rota `/benchmark/*` desconhecida não recebe resposta porque `handleBenchmark` retorna `false` e `app` não envia o 404. Confirmei localmente que a requisição expira; o CodeRabbit marcou o achado como Major.

Resultado nesta amostra: **4/4 falhas preparadas identificadas**, mais **1/1 achado adicional confirmado**. Isso mede apenas esta PR pequena; não é uma taxa geral de detecção para outros códigos ou vulnerabilidades. A classificação Critical descreve o risco se essas rotas fossem expostas num ambiente com acesso relevante; nesta POC o servidor escuta somente em loopback.

## Tempo e comportamento do pipeline

| Evento | Horário UTC | Tempo após abertura |
| --- | --- | ---: |
| PR aberta | 19:49:30 | 0 s |
| Testes Node concluídos com sucesso | 19:49:45 | 15 s |
| Semgrep CE concluído com sucesso | 19:49:56 | 26 s |
| Primeiros comentários de segurança do CodeRabbit | 19:55:22 | 5 min 52 s |
| Revisão do CodeRabbit submetida | 19:55:24 | 5 min 54 s |

Os comentários vieram em português após a configuração `language: pt-BR`. O check do **CodeRabbit terminou com sucesso mesmo apontando quatro achados Critical**. Assim, a revisão informa problemas, mas esta POC ainda não configura um bloqueio automático de merge baseado na severidade. A PR foi colocada em *draft* para evitar merge acidental. Os testes Node existentes não cobriam as novas rotas; o resultado verde deles não indica segurança dessas rotas. O Semgrep usou apenas os conjuntos `p/javascript` e `p/secrets`; este resultado não representa todas as regras disponíveis no produto.

## Conclusão prática

Nesta amostra, a revisão do CodeRabbit forneceu contexto, caminhos de exploração e correções para todas as falhas inseridas, além de encontrar uma falha de disponibilidade. O custo da revisão é **US$ 0 neste repositório público** segundo a oferta OSS atual. Para estimar uso em repositórios privados, consulte [custos.md](custos.md). Antes de escalar, vale repetir o teste com PRs de código real, registrar falsos positivos e verificar se um requisito de bloqueio de merge precisa de configuração adicional.
