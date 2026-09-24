# Estimativa de custos do CodeRabbit

Atualizado em 24/09/2026. Valores em USD, sem impostos, conversão cambial ou descontos negociados. Esta é uma simulação para planejamento, não uma fatura nem uma cotação comercial.

## O que é gratuito nesta POC

`rafael-fante/poc-coderabbit` é público. O CodeRabbit declara que revisões de PR, inclusive segurança, são gratuitas para repositórios públicos. A Action do GitHub neste repo público usa runners padrão, também sem cobrança de minutos. O produto **AI Deep Scan** (varredura completa sob demanda) e o **CodeRabbit Agent** (tarefas de codificação em nuvem) têm regras de cobrança separadas. Evite ativá-los para medir apenas revisão de PR.

Fontes: [CodeRabbit para projetos públicos](https://www.coderabbit.ai/oss), [preços e adicionais](https://www.coderabbit.ai/pricing), [cobrança do GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

## Planos para um repositório privado

O CodeRabbit cobra por **desenvolvedor que abre PR**, não por todos os membros da organização. Revisão de segurança em cada PR e monitoramento contínuo estão incluídos no Advanced e no Enterprise. Os valores anuais abaixo são equivalentes por desenvolvedor por mês, com compromisso anual. A página indica 20% de desconto anual; por isso, a coluna de pagamento mensal é uma **inferência** (preço anual equivalente ÷ 0,8), a confirmar antes da contratação.

| Plano | USD/dev/mês, anual | USD/dev/mês, mensal estimado | Segurança dedicada em PR | Limite incluído de revisões por dev/hora |
| --- | ---: | ---: | --- | ---: |
| Essentials | 24 | 30 | Não | 5 |
| Team | 48 | 60 | Não | 8 |
| Advanced | 72 | 90 | Sim | 10 |
| Enterprise | Sob consulta | Sob consulta | Sim | 12 |

Fonte: [tabela oficial de preços e recursos](https://www.coderabbit.ai/pricing). Os limites são por desenvolvedor e por hora, sujeitos à política de uso justo; não são uma franquia mensal fixa de PRs.

## Escala do Advanced para código privado

Hipótese de volume: **20 PRs por desenvolvedor por mês**, com alterações distribuídas no tempo e sem ultrapassar o limite horário incluído. Nesse cenário o volume de PRs não altera a assinatura. O compromisso anual é 12 vezes a coluna anual equivalente.

| Devs que abrem PR | PRs/mês ilustrativos | Equivalente mensal no contrato anual | Compromisso anual | Pagamento mensal estimado |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 20 | US$ 72 | US$ 864 | US$ 90 |
| 5 | 100 | US$ 360 | US$ 4.320 | US$ 450 |
| 10 | 200 | US$ 720 | US$ 8.640 | US$ 900 |
| 25 | 500 | US$ 1.800 | US$ 21.600 | US$ 2.250 |
| 50 | 1.000 | US$ 3.600 | US$ 43.200 | US$ 4.500 |

Para um orçamento real, substitua o número de desenvolvedores por **autores únicos de PR** no período e observe picos de revisões por hora. Uma PR atualizada várias vezes pode consumir mais de uma revisão.

## Custos adicionais e fórmula

| Item | Cálculo aproximado | Exemplo | Controle sugerido |
| --- | --- | --- | --- |
| Revisões além da franquia horária, quando habilitadas | US$ 0,25 × arquivos revisados nas revisões excedentes | 40 revisões excedentes × 8 arquivos = **US$ 80** | Deixar cobrança por uso em **Off** ou usar teto mensal |
| CodeRabbit Agent | US$ 0,40 × minutos de agente, após minutos grátis aplicáveis | 120 minutos = **US$ 48** | Não acionar tarefas de codificação na POC |
| AI Deep Scan do código inteiro | Preço variável por scan | Sem preço fixo publicável | Ver custo apresentado antes de iniciar; não executar nesta POC |
| GitHub Actions em repo público | Runners padrão: grátis | **US$ 0** de minutos | Manter runners padrão |
| GitHub Actions em repo privado | Franquia por plano; excedente cobrado pelo GitHub | Não incluído nas tabelas acima | Configurar orçamento com bloqueio ao atingir o limite |

Fórmula para repos privados: **total ≈ autores de PR × preço do plano + arquivos em revisões excedentes × US$ 0,25 + minutos pagos de Agent × US$ 0,40 + scans sob demanda + eventual excedente de Actions**. O custo do AI Deep Scan não pode ser estimado com rigor sem o preço exibido para o scan específico.

Fontes: [preços e FAQ do CodeRabbit](https://www.coderabbit.ai/pricing), [franquias e cobrança do GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

## Próximos dados para uma projeção da equipe

1. Autores únicos de PR por mês.
2. PRs e atualizações por autor e por hora, especialmente nos horários de pico.
3. Arquivos alterados por revisão e percentual de revisões que excederia a franquia.
4. Minutos de Agent e quantidade/tamanho de AI Deep Scans pretendidos.
5. Plano GitHub da organização e consumo atual da franquia de Actions.

Esses números devem ser medidos em um período representativo antes de extrapolar a POC para repositórios privados.
