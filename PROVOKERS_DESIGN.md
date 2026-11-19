# PROVOKERS DESIGN.md
Versão 1.4 · Default 2027 · Mantido por Design & Inovação

Este arquivo é a estrutura default de todo output visual da Provokers. Anexe no Notebook do projeto antes de pedir qualquer slide, HTML, simulador ou dashboard. Quando o projeto tiver uma Bíblia de Cliente (skin), anexe as duas. A regra de precedência é simples: **a skin sobrescreve tokens, o DESIGN.md manda na estrutura**.

---

## 0. Como a IA deve ler este arquivo

1. Leia tudo antes de gerar. Não pule seções.
2. Regras marcadas com **[OBRIGATÓRIO]** não podem ser quebradas, nem a pedido de quem escreve o prompt. Se houver conflito, avise e peça confirmação.
3. Se existir uma skin anexada, use os tokens dela no lugar dos tokens da seção 3. Tudo que a skin não definir continua valendo daqui.
4. Identifique o tipo de estudo (seção 8) antes de montar a estrutura. Cada tipo tem capítulos, visuais obrigatórios, slides de exemplo no template e armadilhas próprias.
5. Nunca invente dado, número, nome de marca, base ou fonte. Se faltar informação, deixe o slot com `[PENDENTE: o que falta]`.
6. Ao terminar, rode o checklist da seção 12 e reporte o que passou e o que falhou.

### 0.1 Hierarquia de arquivos

| Camada | Arquivo | O que define | Quem edita |
|---|---|---|---|
| Sistema | `PROVOKERS_DESIGN.md` | Estrutura, grid, componentes, data viz, padrões por estudo, editorial, QA | Design & Inovação |
| Template | `Template_PVKS_2027_AI.pptx` | Tema, slide mestre e 51 slides de exemplo (L01 a L51) | Design & Inovação |
| Skin | `SKIN_<CLIENTE>.md` | Cores, fontes, logo, tom, restrições, glossário do cliente | Design & Inovação, sob demanda |
| Projeto | Briefing no Notebook | Conteúdo, dados, objetivo, público | Time do projeto |

---

## 1. Princípios

**Decisão antes de dado.** Todo slide e toda tela respondem a uma pergunta de negócio. O título afirma a resposta.

**Uma ideia por tela.** Se precisar de duas conclusões, são duas telas.

**Número visível sempre.** Gráfico sem rótulo de valor é ilustração. Em todo chart o leitor vê o número e o percentual sem precisar de hover.

**Contraste conduz o olhar.** Uma cor de destaque por tela. O resto fica em cinza.

**Editorial, sem ornamento.** A referência é revista de design e infografia de jornal, com grid rígido, tipografia com escala dramática e espaço em branco.

### 1.1 Anti AI slop [OBRIGATÓRIO]

Não usar:

- Eyebrow accents: faixas, barras ou bordas coloridas no topo ou na lateral de cards, e rótulos coloridos em caixa alta acima de títulos.
- Linha de acento sob título.
- Gradientes roxo-azul, glow neon, fundo com bolhas desfocadas genéricas.
- Grade de 3 ou 4 cards idênticos com ícone, título e duas linhas de texto como solução padrão para qualquer conteúdo.
- Emoji em material de cliente.
- Sombras pesadas, bordas grossas, cantos com raios diferentes na mesma tela.
- Frases de efeito vazias ("desbloqueie o potencial", "jornada transformadora", "no cenário atual").
- Imagens de banco com pessoas apontando para telas, robôs, cérebros luminosos, mãos com hologramas.

Usar no lugar: escala tipográfica forte, big numbers, alinhamento por grid, infografia que explica o dado, fotos editoriais neutras e arquitetônicas, cor só onde há informação.

---

## 2. Produtos de output

Cada produto tem um blueprint fixo. O cliente compra o produto, a skin dá a cara. Samples navegáveis com dados fictícios ficam na Output Library.

| Código | Produto | Formato | Uso típico | Blueprint |
|---|---|---|---|---|
| P1 | **Deck de Resultados** | PPT 16:9 | Entrega de estudo quanti, quali ou misto | 6.1 |
| P2 | **Keynote** | HTML apresentação | Debrief executivo, evento, kick-off, treinamento | 6.2 |
| P3 | **Simulate** | HTML app | Conjoint, preço, portfólio, share of preference | 6.3 |
| P4 | **Pulse** | HTML app | Tracking, funil, brand drive, troca de marca | 6.4 |
| P5 | **Playbook** | HTML site | Segmentação, personas, jornada, guia de ativação | 6.5 |
| P6 | **Stories** | HTML longform | Estudo editorial com capítulos e gráficos vivos | 6.6 |

---

## 3. Tokens default Provokers

Tokens são as únicas variáveis que a skin pode trocar. Use sempre pelo nome, nunca o hex solto no código.

### 3.1 Cor de marca e neutros

| Token | Hex | Uso |
|---|---|---|
| `brand.primary` | `#F7921E` | Laranja Provokers. Destaque, número principal, série em foco |
| `brand.primary-strong` | `#C96A08` | Texto laranja sobre fundo claro com contraste AA |
| `brand.primary-soft` | `#FDE7CC` | Fundo de destaque, fundo de ícone, chip |
| `brand.primary-tint` | `#FFF6EC` | Área de destaque em chart (quadrante, faixa, norma) |
| `ink.900` | `#1A1A1A` | Títulos, big numbers em fundo claro |
| `ink.700` | `#292929` | Texto corrido, fundo escuro |
| `ink.500` | `#5E5E5E` | Texto secundário, rótulos de eixo |
| `ink.300` | `#8C8C8C` | Notas, base, fonte |
| `ink.150` | `#E2E2E0` | Linhas de grade, divisores |
| `paper.100` | `#F3F2F0` | Fundo alternativo, painéis |
| `paper.000` | `#FFFFFF` | Fundo padrão |

Proporção visual por tela: 70% neutro, 20% ink, até 10% `brand.primary`.

### 3.2 Paleta de dados

**Categórica (até 8 séries, nesta ordem).** Acima de 8, agrupe em "Outros".

| Ordem | Token | Hex |
|---|---|---|
| 1 | `data.cat.1` | `#F7921E` laranja |
| 2 | `data.cat.2` | `#2E4057` azul petróleo |
| 3 | `data.cat.3` | `#5FA8A0` verde-água |
| 4 | `data.cat.4` | `#C3AE84` areia |
| 5 | `data.cat.5` | `#8E4A6B` ameixa |
| 6 | `data.cat.6` | `#8FB3D9` azul claro |
| 7 | `data.cat.7` | `#7D8B3A` oliva |
| 8 | `data.cat.8` | `#9A9A9A` cinza |

No tema do PowerPoint, as ênfases 1 a 6 seguem `data.cat.1` a `data.cat.6`.

**Foco.** Marca do cliente em `data.cat.1`, concorrentes em `#C9C9C9`, média de mercado em `ink.500` tracejado.

**Sequencial.** `#FFF4E6` `#FDD9AE` `#FBB86A` `#F7921E` `#C96A08`

**Divergente.** `#2E4057` `#7C8DA3` `#E9E9E9` `#FBB86A` `#C96A08`

**Semântica.** `data.positive` `#2F8F5B`, `data.negative` `#C8433A`, `data.neutral` `#9A9A9A`. Só para variação e significância, nunca para identificar marca.

### 3.3 Tipografia

**PPT (P1).** Família Aptos, padrão do Microsoft 365.

| Papel | Fonte | Peso |
|---|---|---|
| Título, big number | Aptos Display | Bold |
| Texto, rótulos, tabelas | Aptos | Regular e SemiBold |
| Rodapé, base, fonte, selos | Aptos Mono | Regular e Bold |
| Acento editorial | Aptos Serif | Italic |

**Digital (P2 a P6).** Google Fonts.

| Papel | Fonte | Por quê |
|---|---|---|
| Sans principal | **Schibsted Grotesk** (400 a 800) | Grotesca de origem jornalística, firme em tamanho pequeno, números claros para chart e tabela |
| Serifa editorial | **Newsreader** Italic | Itálico expressivo para leitura em tela, combina com a sans sem disputar |
| Mono | **JetBrains Mono** | Base, fonte, notas técnicas, códigos de projeto |

```css
--font-sans: "Schibsted Grotesk", "Aptos", "Segoe UI", system-ui, sans-serif;
--font-serif: "Newsreader", "Aptos Serif", Georgia, serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;
```

**Números tabulares só em números [OBRIGATÓRIO].** `font-variant-numeric: tabular-nums` vale para KPIs, tabelas, gráficos, notas e contadores. Nunca no `body` inteiro: em várias fontes isso alarga a pontuação e cria espaço falso antes de vírgula e ponto.

**Serifa só em momento editorial [OBRIGATÓRIO].** Palavra-chave de capa ou divisória, verbatim, frase de impacto isolada. Nunca em texto corrido, rótulo, eixo, tabela, botão ou tooltip. No máximo um trecho serifado por tela.

### 3.4 Escala tipográfica

| Token | Digital (px / line-height) | PPT (pt) | Uso |
|---|---|---|---|
| `type.hero` | clamp(56, 8vw, 120) / 0.95 | 48 a 140 | Big number, palavra de capa |
| `type.display` | clamp(40, 5vw, 64) / 1.05 | 40 a 54 | Divisória, statement |
| `type.h1` | 32 / 1.15 | 26 a 28 | Título de tela |
| `type.h2` | 22 / 1.25 | 14 a 18 | Título de card |
| `type.body` | 16 / 1.5 | 12 a 16 | Texto |
| `type.small` | 13 / 1.45 | 10 a 11 | Rótulo de chart, legenda |
| `type.micro` | 11 / 1.4 | 8 a 9 | Base, fonte, rodapé, selos |

Títulos 700, texto 400, rótulo 500 a 600. Tracking negativo em display (-0.02em a -0.04em). Nunca caixa alta com mais de 3 palavras, exceto selos mono e rótulos de quadrante.

### 3.5 Espaço, grid e forma

- Unidade base 8 px.
- Digital: 12 colunas, gutter 24, margem 48 em desktop e 20 em mobile. Linha de leitura até 72 caracteres.
- PPT 16:9 (13,333 × 7,5 pol): margem 0,5 pol. Título a 0,42 pol do topo, linha de apoio logo abaixo, logo do cliente no canto superior direito, rodapé a 7,0 pol. Área útil de conteúdo de 1,85 a 6,75 pol na vertical.
- Raio: 8, 16 a 18, 28. Uma família de raio por tela.
- Sombra única: `0 1px 2px rgba(0,0,0,.04), 0 10px 30px rgba(0,0,0,.07)`.
- Glass (só digital, sobre foto ou cor): `rgba(255,255,255,.82)` com `backdrop-filter: blur(18px)`.

### 3.6 Ícones

- Traço de 1,7 px em grade de 24 px, cantos e pontas arredondados. Uma única família por material.
- Sempre dentro de uma caixa quadrada com raio, **centralizado nos dois eixos** [OBRIGATÓRIO]. No CSS: `display:inline-grid; place-items:center` e o SVG como `display:block`.
- Tamanhos: 34, 44 e 56 px de caixa para 18, 22 e 26 px de ícone. No PPT, caixa de 0,44 a 0,5 pol.
- Fundo `brand.primary-soft` com ícone `brand.primary-strong` no destaque. Fundo `paper.100` com ícone `ink.500` no neutro. Fundo `ink.900` com ícone branco na ênfase.
- Ícone acompanha um conceito (ocasião, canal, métrica). Não use ícone só para preencher espaço.

### 3.7 Movimento (digital)

- 160 ms em microinteração, 320 ms em entrada de bloco, 600 a 750 ms em animação de chart.
- Curva: `cubic-bezier(.2,.7,.2,1)`. Mola para hover: `cubic-bezier(.34,1.56,.64,1)`.
- Charts crescem do zero ao entrar na viewport, uma vez. Na troca de filtro, interpolam do valor anterior.
- Big numbers contam até o valor em até 900 ms.
- Respeitar `prefers-reduced-motion`.

---

## 4. Marca Provokers

### 4.1 Logo [OBRIGATÓRIO]

- O logo PROVOKERS é **espelhado de propósito**. Nunca corrigir, girar, espelhar de volta ou redesenhar. Usar sempre os arquivos oficiais.
- Versões: colorida em fundo claro, branca em fundo escuro ou foto, cinza escuro monocromática quando houver logo de cliente ao lado.
- Altura mínima: 20 px no digital, 0,19 pol no PPT. Respiro igual à altura do "O".
- Em telas de conteúdo, logo pequeno no rodapé ou na barra superior. Em capa e encerramento, logo grande.
- Co-branding: mesma altura óptica e mesmo tom (ambos brancos, ambos cinza ou ambos originais).

### 4.2 Tagline

"Challenging limits" aparece só em capa institucional e encerramento.

### 4.3 Laranja como gesto

O laranja marca o que importa: o número da conclusão, a série do cliente, a palavra-chave do título. Fundo laranja inteiro só em divisória e slide de statement.

### 4.4 Motivo visual

Formas do "O": círculos, arcos e retângulos com um único canto muito arredondado. Uma forma de motivo por tela.

### 4.5 Fotografia

Fotos editoriais, neutras e arquitetônicas: concreto, gesso, pedra, luz natural, curvas e sombras. Pessoas reais em contexto quando o estudo pedir. Em capa e divisória, foto em tela cheia com névoa branca à esquerda para o texto. Nunca foto como fundo de texto longo.

---

## 5. Componentes (building blocks)

| ID | Componente | Regra-chave |
|---|---|---|
| `C-TITLE` | Título de tela | Frase-conclusão, até 2 linhas no digital e 1 linha no PPT (até 50 car.) |
| `C-APOIO` | Linha de apoio | Logo abaixo do título, `ink.500`, até 140 caracteres |
| `C-KPI` | Big number | Ícone opcional, número em `type.hero`, rótulo até 6 palavras, delta com seta e cor semântica, sparkline opcional |
| `C-KPI-ROW` | Faixa de 3 a 4 KPIs | Mesma baseline, sem caixa |
| `C-INSIGHT` | Leitura do dado | Até 3 frases. Pode ir em painel escuro com ícone quando for a conclusão da tela |
| `C-QUOTE` | Verbatim | Serifa itálica, aspas tipográficas, perfil em `type.micro` |
| `C-CHART` | Área de gráfico | Título-conclusão, rótulos de valor, nota de base, exportar |
| `C-TABLE` | Tabela | Linhas finas, sem zebra, números à direita |
| `C-NOTE` | Base e fonte | Mono, `type.micro`, `ink.300` |
| `C-SECTION` | Divisória | Número grande, título de 1 a 4 palavras, foto ou motivo |
| `C-BADGE` | Selos de slide | "DADO DE EXEMPLO" em amarelo claro e selo do tipo de estudo em cinza, ambos mono, no canto superior direito. Apagar no deck final |
| `C-FILTER` | Filtros | Selects com rótulo visível, chips removíveis, base (n) visível |
| `C-TABS` | Abas e switches | Colunas iguais, ativo em branco com sombra, foco interno |
| `C-TOOLTIP` | Tooltip | Ver 7.4 |
| `C-EXPORT` | Exportar | JPG por card, CSV em simuladores |
| `C-EMPTY` | Estado vazio | Explica o que falta e oferece a ação. Nunca tela em branco ou fallback silencioso |
| `C-WARN` | Base baixa | Faixa `brand.primary-soft` com ícone quando n<50 |

---

## 6. Blueprints por produto

### 6.1 P1 · Deck de Resultados (PPT)

Arquivo base: `Template_PVKS_2027_AI.pptx`, com tema "Provokers 2027" (cores e fontes do item 3). O template tem 51 slides de exemplo em duas partes: a estrutura do deck (L01 a L25) e a biblioteca de gráficos por tipo de estudo (L26 a L51).

**Dois jeitos de montar:** layouts do slide mestre (Página Inicial > Novo Slide > PVKS 00 a 06) ou duplicar o slide de exemplo (Ctrl+D) e trocar dados em botão direito > Editar dados. A nota de cada slide começa com o código e explica quando usar e como editar.

#### Estrutura do deck · L01 a L25

| Código | Slide | Limite |
|---|---|---|
| L01 | Capa com foto e névoa | Título 30 car. |
| L02 | Agenda | 6 itens de 40 car. |
| L03 | Divisória | Título 30 car., frase 90 car. |
| L04 | Três achados | 3 × (35 + 150 car.) |
| L05 | Destaque escuro | Frase 70 car. |
| L06 | Texto corrido | 700 car. |
| L07 | Tópicos | 3 a 6 tópicos de 90 car. |
| L08 | Duas colunas | 2 × 280 car. |
| L09 | Texto + imagem grande | 450 car. |
| L10 | Texto + imagem pequena | 600 car. |
| L11 | Três cards + conclusão | 30 + 90 car. por card |
| L12 | Verbatim | 220 car. |
| L13 | KPIs | 3 a 4 indicadores |
| L14 | Big number + barras | Até 12 barras |
| L15 | Tracking em linha | 5 séries, 12 ondas |
| L16 | Três rankings | Até 8 itens |
| L17 | Empilhado 100% | 10 linhas, 4 categorias |
| L18 | Funil com conversão | 4 a 6 etapas |
| L19 | Heatmap | 6 × 10 |
| L20 | Tabela qualitativa | 6 × 4, 80 car. por célula |
| L21 | Comparativo entre grupos | Até 6 linhas |
| L22 | Síntese + recomendação | 4 blocos + 3 recomendações |
| L23 | Próximos passos | 5 ações de 80 car. |
| L24 | Ficha técnica | Até 8 linhas |
| L25 | Encerramento | Fixo |

#### Biblioteca de gráficos por tipo de estudo · L26 a L51

Fica depois da ficha técnica, aberta por um slide escuro de abertura. Cada slide traz o selo do tipo de estudo e aponta para a seção 8 correspondente.

| Código | Estudo (seção 8) | Slide | Tipo de objeto |
|---|---|---|---|
| L26 | Sumário quanti (8.1) | Quatro achados com big number + painel "O que fazer" | Texto e formas |
| L27 | Sumário quali (8.2) | Tensões de/para com verbatim | Texto e formas |
| L28 | Qualitativo (8.3) | Jornada em 5 etapas com curva de emoção | Formas |
| L29 | Semiótica (8.4) | Mapa de códigos residual, dominante e emergente | Formas |
| L30 | U&A (8.5) | Waffle 10 × 10 + colunas por horário | Formas + gráfico nativo |
| L31 | U&A (8.5) | Flow bands ocasião → canal | Formas livres |
| L32 | Segmentação (8.6) | Mapa de segmentos com barra proporcional | Formas |
| L33 | Segmentação (8.6) | Matriz de priorização em bolhas | Gráfico nativo (bolhas) |
| L34 | Brand Drive (8.7) | Quadrante importância × desempenho + leitura | Gráfico nativo (dispersão) |
| L35 | Brand Drive (8.7) | Distância para o líder em barras divergentes | Gráfico nativo |
| L36 | Tracking (8.9) | KPIs com sparkline | Gráficos nativos |
| L37 | Tracking (8.9) | Troca de marca em flow bands | Formas livres |
| L38 | Posicionamento (8.8) | Mapa perceptual de marcas e atributos | Gráfico nativo (dispersão) |
| L39 | Conjoint (8.10) | Importância relativa dos atributos | Gráfico nativo |
| L40 | Conjoint (8.10) | Utilidades por nível, centradas em zero | Gráfico nativo |
| L41 | Preço (8.10) | Curva de share e receita com preço ótimo | Gráfico nativo (linhas) |
| L42 | Portfólio (8.11) | Cascata de alcance TURF | Gráfico nativo (empilhado) |
| L43 | Conceitos e packs (8.12) | Ranking contra norma com faixa de aprovação | Gráfico nativo |
| L44 | Comunicação (8.13) | Curva segundo a segundo com marcações e frames | Gráfico nativo (linha) |
| L45 | Lealdade e NPS (8.14) | Detratores, neutros e promotores por marca | Gráfico nativo (100%) |
| L46 | Shopper (8.15) | Árvore de decisão com captura da marca | Formas e conectores |
| L47 | ROI e BTL (8.16) | Cascata de contribuição + ROI | Gráfico nativo (empilhado) |
| L48 | Consultoria (8.17) | Plataforma de marca em camadas | Formas |
| L49 | Consultoria (8.17) | Roadmap por trimestre | Formas |
| L50 | Observatório (8.18) | Radar de horizonte com intensidade | Formas |
| L51 | IA aplicada (8.19) | Temas em barras + verbatins | Gráfico nativo |

**Como editar a biblioteca**

- **Gráfico nativo:** botão direito > Editar dados. Cores por ponto seguem a regra do slide (destaque em laranja, prioridade em `ink.900`, demais em cinza).
- **Formas livres (flow bands):** o PowerPoint não tem Sankey nativo. Para outros números, peça à IA para redesenhar a partir da nova matriz, em vez de ajustar faixas à mão.
- **Rótulos manuais:** nas cascatas (L42 e L47), o NPS à direita do L45 e os destaques do L41, os valores são caixas de texto. Atualize-os junto com os dados. A nota do slide avisa.
- **Elementos posicionados:** linhas de média, norma, preço ótimo, marcações de tempo e quadrantes sombreados estão desenhados para os eixos do exemplo. Se mudar a escala do eixo, mova a forma conforme a fórmula da nota.
- **Waffle (L30):** 100 quadrados, cada um 1%. Pinte os N primeiros de laranja e os demais de cinza claro.

**Regras [OBRIGATÓRIO]:** gráficos nativos e editáveis sempre que o PowerPoint suportar; título até 50 car. em uma linha; selos "DADO DE EXEMPLO" e de tipo de estudo removidos no deck final; notas de especificação apagadas no final; texto mínimo 11 pt (rodapé e selos 8 a 9 pt); nunca reduzir fonte para caber; apagar a abertura da biblioteca e os slides não usados.

### 6.2 P2 · Keynote (HTML)

Palco fixo 1440 × 810 que se adapta à tela. Capa com título cinético e chips flutuantes sobre foto. Roteiro clicável. Abertura de capítulo com foto, número grande e indicador de progresso. Navegação em pílula com Hub, anterior, contador, próximo, link do slide e tela cheia. Setas, espaço, Home, End, F e swipe. Link direto por slide (`#5`). Gráficos interativos com abas quando houver mais de um indicador.

### 6.3 P3 · Simulate

Painel de cenário (presets, alavancas, reação da concorrência, restaurar base), leitura automática do cenário, KPIs (share, índice de receita, concorrente, canibalização), share por item com base tracejada, waffle "a cada 100 escolhas", flow bands da origem do ganho, variação por perfil, tabela recolhível, CSV. O HTML espelha a planilha do modelo sem divergência. Arredondar só na exibição.

### 6.4 P4 · Pulse

Filtros fixos (onda, região, perfil, marca em foco) com base visível. Seções: Saúde (KPIs com sparkline, funil com waffle de conversão, preferência, evolução), Brand drive (quadrante, leitura automática, distância para o líder), Troca de marca (flow bands entre ondas), Imagem (heatmap). Todo card respeita o filtro. n<50 avisa; n<30 esconde e oferece ampliar o recorte.

### 6.5 P5 · Playbook

Mapa dos segmentos em infográfico de pessoas, página por segmento (fatos com ícones, drivers, ocasiões, preferência, brand drive do segmento, verbatim, ativações ligadas a drivers, barreira), comparador, busca e glossário.

### 6.6 P6 · Stories

Capa editorial com foto neutra, índice lateral com progresso, capítulos com resumo "em uma frase", trio de big numbers, colunas, waffle, jornada em passos, flow bands, scrollytelling, cards clicáveis, recomendações com prazo, versão para impressão.

---

## 7. Data visualization

### 7.1 Escolha do gráfico

| Pergunta | Gráfico | Exemplo no PPT | Evitar |
|---|---|---|---|
| Quem é maior? | Barra horizontal ordenada | L14, L39, L51 | Pizza com mais de 3 fatias |
| Como evoluiu? | Linha com marcadores, foco em uma série | L15 | Barra agrupada para mais de 4 períodos |
| Do que é feito? | Empilhado 100% | L17, L45 | Donut múltiplo |
| Quanto de cada 100? | Waffle 10 × 10 | L30 | Pizza |
| Onde perde gente? | Funil em barras com conversão | L18 | Trapézio 3D |
| Para onde as pessoas vão? | Flow bands (Sankey simples) | L31, L37 | Tabela de migração sem visual |
| O que proteger e o que corrigir? | Quadrante importância × desempenho | L34 | Duas barras separadas |
| Onde está a distância? | Barras divergentes | L35, L40 | Duas barras lado a lado |
| Como se posiciona? | Heatmap, dot plot ou mapa perceptual | L19, L38 | Radar com mais de 2 séries |
| Quanto mudou? | Dumbbell ou barra divergente | L21 | Duas pizzas |
| Quando acontece? | Colunas por faixa | L30 | Linha para categorias |
| Quanto soma cada parte? | Cascata (waterfall) | L42, L47 | Pizza |
| Quem priorizar? | Bolhas tamanho × atratividade | L33 | Tabela de notas |
| Qual o ponto ótimo? | Linhas com marcação do ótimo | L41 | Tabela de cenários |
| Passa ou não passa? | Barras contra norma com faixa | L43 | Ranking sem referência |
| Como reage no tempo? | Curva contínua com marcações | L44 | Média única |
| Como decide? | Árvore de decisão | L46 | Lista de percentuais |
| Tendência rápida no KPI | Sparkline | L36 | Gráfico completo dentro do card |
| Onde está no mapa? | Mapa coroplético sequencial | — | Mapa com categórica |

### 7.2 Regras gerais [OBRIGATÓRIO]

- Valor visível em toda barra, ponto final de linha e célula. Percentual com `%`, sem espaço.
- Percentual inteiro por padrão; 1 casa quando a diferença relevante for menor que 1 ponto; índices sem casa; moeda com 2.
- Separador decimal pelo idioma. Milhar com ponto em PT.
- Eixo começa em zero em barras.
- Gridlines horizontais finas, sem vertical, sem borda.
- Legenda direta no fim da série sempre que possível.
- Ordenar por valor, exceto escalas ordinais.
- Base, pergunta e fonte no rodapé de todo chart.
- Significância: ▲ ▼ em cor semântica, com nível de confiança na nota.
- n<50: valor em itálico e cinza com aviso. n<30: não exibir.
- Rótulos nunca se sobrepõem: reposicione, abrevie com reticências ou empilhe o rótulo acima da barra em telas estreitas.
- Não quebrar valor e unidade: use espaço não separável em "R$ 4,79", "−18 p.p.", "R$ 22 mi".

### 7.3 Densidade

- Até 12 barras, 5 linhas, 8 categorias. Acima disso, top 10 com "Outros" ou filtro.
- Em flow bands, até 6 nós de cada lado.
- Em quadrante e mapa perceptual, até 12 pontos com rótulo.
- Em árvore de decisão, até 3 níveis e 6 folhas.

### 7.4 Interação e tooltips (digital)

Tooltip acrescenta informação, nunca repete o rótulo. Ordem: item e recorte; valor em destaque; delta com cor semântica; base e significância; uma frase de leitura quando agregar. Abre no hover e no toque, fecha fora. Guia vertical em linhas com todas as séries. Legenda clicável esconde série (sempre fica ao menos uma). Filtros com chip removível. Charts exportáveis em JPG.

---

## 8. Padrões por tipo de estudo

Cada tipo de estudo do portfólio Provokers tem uma pergunta central, uma estrutura de capítulos, visuais obrigatórios, slides de exemplo no template, o produto digital indicado e as armadilhas mais comuns. A IA deve identificar o tipo antes de montar o material. Estudos combinados seguem a estrutura do tipo principal e incorporam os visuais dos demais.

### 8.0 Estrutura comum a todo estudo

1. Capa (L01)
2. Sumário executivo (ver 8.1 ou 8.2)
3. Objetivos e metodologia em uma tela (L24)
4. Capítulos por objetivo de negócio, não por bloco de questionário
5. Síntese e recomendações (L22, L23)
6. Anexos: perfil da amostra, tabelas completas, glossário

**Capítulo por objetivo [OBRIGATÓRIO].** Nunca organizar o deck na ordem do questionário. Cada capítulo responde a um objetivo do briefing.

### 8.1 Sumário executivo quanti

- **Pergunta:** o que o cliente precisa saber e fazer, em três minutos.
- **Estrutura:** uma frase-mãe (L05) → 3 a 5 achados com número → implicações → recomendações com prazo (L23).
- **Visuais:** big numbers com delta e significância; no máximo um gráfico por achado; nada de tabela.
- **Slides:** L26 (achados + o que fazer), L05, L13, L23.
- **Regras:** todo achado tem número e base; todo número tem leitura; recomendação começa com verbo no infinitivo; cabe em 3 a 5 slides.
- **Armadilha:** repetir o índice do deck. Sumário traz conclusões, não capítulos.

### 8.2 Sumário executivo quali

- **Pergunta:** o que aprendemos sobre as pessoas e o que isso muda para a marca.
- **Estrutura:** frase-mãe → 3 a 5 tensões ou insights → verbatim que prova cada um → implicações → oportunidades.
- **Visuais:** insight em formato "tensão: de / para"; verbatim curto; ícone por território. Sem percentuais.
- **Slides:** L27 (tensões de/para), L04, L11, L12.
- **Regras:** proibido quantificar ("70% dos entrevistados") em quali. Use "a maioria dos grupos", "recorrente", "pontual". Todo insight tem pelo menos um verbatim e o perfil de quem falou.
- **Armadilha:** listar falas sem interpretação. Insight é a leitura, o verbatim é a prova.

### 8.3 Qualitativo (grupos, entrevistas, etnografia, imersões)

- **Pergunta:** por que as pessoas fazem o que fazem.
- **Estrutura:** contexto de vida → relação com a categoria → jornada ou ocasiões → percepção de marcas → reação a estímulos → territórios de oportunidade.
- **Visuais:** jornada em passos com ícones e curva de emoção (dor e ganho); mapa de territórios; tabela qualitativa; verbatins; fotos de campo quando autorizadas; texto + imagem.
- **Slides:** L28 (jornada), L06 a L12, L20.
- **Regras:** perfil do respondente sem nome; fotos sem rosto identificável sem autorização; aspas tipográficas; verbatim fiel, sem corrigir a fala.
- **Produto digital:** Stories (P6).
- **Armadilha:** slide só de texto corrido. Alterne texto, verbatim, esquema e imagem.

### 8.4 Semiótica e antropologia

- **Pergunta:** que códigos culturais a categoria usa e para onde eles estão indo.
- **Estrutura:** códigos dominantes → residuais → emergentes → implicações para a marca.
- **Visuais:** mapa de códigos em três colunas (residual, dominante, emergente) com seta do tempo; moodboards com legenda; linha do tempo cultural.
- **Slides:** L29 (mapa de códigos), L09 e L10 para moodboards.
- **Regras:** toda imagem de referência tem legenda e fonte; nada de imagem decorativa.
- **Produto digital:** Stories (P6) ou Keynote (P2).
- **Armadilha:** moodboard sem leitura. Cada imagem precisa dizer qual código representa.

### 8.5 Hábitos e atitudes (U&A)

- **Pergunta:** como a categoria é consumida, por quem, quando e por quê.
- **Estrutura:** penetração e frequência → ocasiões → canais → repertório de marcas → atitudes → perfis.
- **Visuais:** waffle de penetração; colunas por horário ou dia; flow bands ocasião → canal; empilhado por perfil; heatmap de atitudes.
- **Slides:** L30 (waffle + horário), L31 (ocasião → canal), L17, L19.
- **Produto digital:** Stories (P6).
- **Armadilha:** excesso de gráficos de frequência. Agrupe e destaque só o que muda a estratégia.

### 8.6 Segmentação (consumidor ou comprador)

- **Pergunta:** quais grupos existem, quanto valem e como falar com cada um.
- **Estrutura:** mapa dos segmentos → um capítulo por segmento (quem é, drivers, ocasiões, marcas, barreiras, ativação) → comparativo → priorização.
- **Visuais:** barra proporcional, infográfico de pessoas ou waffle com o tamanho de cada segmento; fatos com ícones; drivers em barras; brand drive do segmento; matriz de priorização em bolhas (afinidade × valor, tamanho = % do segmento).
- **Slides:** L32 (mapa), L33 (priorização), L34 e L14 por segmento.
- **Regras:** cada segmento tem uma cor fixa em todo o material; nome do segmento em 2 a 4 palavras e uma frase-tag; tamanho sempre em % e em n; mesma estrutura em todas as páginas de segmento.
- **Produto digital:** Playbook (P5).
- **Armadilha:** persona com nome e foto inventados sem base. Persona é síntese do dado, não ficção.

### 8.7 Brand Drive

- **Pergunta:** o que move a escolha da marca e onde investir.
- **Estrutura:** funil de marca → drivers da categoria → desempenho da marca nos drivers → quadrante → gaps contra o líder → recomendações de alavanca.
- **Visuais:** quadrante importância × desempenho com quadrantes nomeados (Fortalezas, Prioridades, Monitorar, Secundários) e o de fortalezas em `brand.primary-tint`; barras divergentes de distância para o líder ordenadas por importância; funil com waffle de conversão.
- **Slides:** L34 (quadrante), L35 (distância para o líder), L18 (funil).
- **Regras:** declarar o método da importância (correlação, regressão, Shapley) na nota; linhas médias tracejadas; leitura do quadrante sempre escrita, nunca só o gráfico.
- **Produto digital:** Pulse (P4) quando houver ondas; Playbook (P5) quando cruzado com segmentos.
- **Armadilha:** quadrante com 20 atributos ilegíveis. Até 12, com rótulos que não se sobrepõem.

### 8.8 Posicionamento e diagnóstico de marca

- **Pergunta:** onde a marca está na cabeça das pessoas e onde pode estar.
- **Estrutura:** funil → imagem (heatmap) → mapa perceptual → território atual × desejado → caminhos de posicionamento.
- **Visuais:** heatmap de atributos por marca; mapa perceptual (marcas e atributos na mesma dispersão, eixos nomeados); dumbbell atual × desejado.
- **Slides:** L38 (mapa perceptual), L19, L21, L18.
- **Regras:** declarar o método e a variância explicada; leitura escrita ao lado do mapa.
- **Produto digital:** Pulse (P4) ou Stories (P6).

### 8.9 Tracking (marca, comunicação, lançamentos)

- **Pergunta:** o que mudou desde a última onda e se a mudança é real.
- **Estrutura:** resumo da onda → KPIs com delta → funil → evolução → drivers → troca de marca → imagem → leitura por região e perfil.
- **Visuais:** KPIs com sparkline; linhas com todas as ondas disponíveis; flow bands entre ondas; marcação de significância em todos os deltas.
- **Slides:** L36 (KPIs com sparkline), L37 (troca de marca), L15, L18, L34.
- **Regras [OBRIGATÓRIO]:** toda variação mostra se é significativa; mesma base e mesmas cores em todas as ondas; nunca trocar a ordem das marcas entre ondas.
- **Produto digital:** Pulse (P4).
- **Armadilha:** destacar variação não significativa como notícia.

### 8.10 Conjoint, preço e elasticidade

- **Pergunta:** quanto vale cada atributo e qual cenário maximiza share e receita.
- **Estrutura:** importância relativa dos atributos → utilidades por nível → disposição a pagar ou curva de demanda → cenários → recomendações.
- **Visuais:** barras de importância somando 100%; utilidades em barras divergentes centradas em zero, agrupadas por atributo; curva de share e receita com ponto ótimo marcado; simulador.
- **Slides:** L39 (importância), L40 (utilidades), L41 (curva de preço).
- **Regras [OBRIGATÓRIO]:** nunca mostrar utilidade bruta sem explicar a leitura; simulador e planilha são espelhos idênticos; documentar regra de escolha (first choice, share of preference) e arredondamento; cenário base sempre visível.
- **Produto digital:** Simulate (P3).
- **Armadilha:** apresentar share simulado como previsão de mercado. Sempre chamar de share de preferência.

### 8.11 Otimização de portfólio e SKUs

- **Pergunta:** quais itens manter, cortar ou lançar.
- **Estrutura:** alcance e duplicação (TURF) → canibalização → portfólio ótimo → impacto em share.
- **Visuais:** cascata de alcance incremental com corte sugerido; lista manter / revisar; flow bands de canibalização; waffle de alcance.
- **Slides:** L42 (cascata TURF), L31 adaptado para canibalização.
- **Produto digital:** Simulate (P3).
- **Armadilha:** cortar item olhando só alcance, sem canibalização.

### 8.12 Avaliação de conceitos, produtos e packs

- **Pergunta:** qual alternativa seguir e o que ajustar.
- **Estrutura:** veredito → KPIs de decisão contra benchmark → diagnóstico (atributos, gostos e desgostos) → ajustes recomendados.
- **Visuais:** ranking de alternativas contra norma com faixa de aprovação e linha tracejada; dumbbell conceito × benchmark; comentários agrupados por tema (não word cloud); para packs, imagem do pack com pontos de atenção anotados.
- **Slides:** L43 (ranking contra norma), L21, L10.
- **Regras:** o veredito aparece na primeira tela; o critério de aprovação é declarado antes dos resultados.
- **Produto digital:** Keynote (P2).

### 8.13 Avaliação de comunicação publicitária

- **Pergunta:** a peça funciona e por quê.
- **Estrutura:** veredito → atenção e lembrança → entendimento da mensagem → atribuição à marca → persuasão → diagnóstico por cena.
- **Visuais:** KPIs contra norma; curva segundo a segundo com marcação de entrada da marca, packshot e quedas, e frames da peça abaixo do eixo; quadro de mensagem pretendida × percebida.
- **Slides:** L44 (curva segundo a segundo), L13, L08.
- **Regras:** frames da peça só com autorização do cliente; norma declarada na nota.

### 8.14 Lealdade e satisfação (NPS, CX)

- **Pergunta:** quem recomenda, quem sai e o que muda isso.
- **Estrutura:** NPS e distribuição → evolução → drivers de satisfação → pontos de dor na jornada → ações.
- **Visuais:** barra empilhada detratores, neutros e promotores com o NPS ao lado; waffle de promotores; quadrante de drivers; jornada com notas por etapa.
- **Slides:** L45 (NPS com distribuição), L34, L28.
- **Regras:** NPS sem casa decimal; sempre mostrar a distribuição, nunca só o score.

### 8.15 Shopper (critérios de decisão, promoções, gôndola, PDV, trade)

- **Pergunta:** como a decisão acontece no ponto de venda.
- **Estrutura:** missão de compra → planejado × impulso → árvore de decisão → visibilidade e gôndola → promoções → necessidades do trade.
- **Visuais:** árvore de decisão em etapas com percentuais e captura da marca em cada caminho; fluxo da missão à marca; fotos de gôndola anotadas; mapa de calor de visibilidade.
- **Slides:** L46 (árvore de decisão), L31, L10.
- **Produto digital:** Stories (P6) ou Playbook (P5) para guias de execução no PDV.
- **Armadilha:** foto de gôndola sem anotação do que importa.

### 8.16 ROI, lançamentos, BTL, eventos e patrocínios

- **Pergunta:** o investimento trouxe retorno.
- **Estrutura:** veredito → alcance → impacto em KPIs de marca → impacto em vendas ou intenção → ROI → aprendizados para a próxima ação.
- **Visuais:** antes × depois em dumbbell; cascata de contribuição com passos negativos em vermelho; big number de ROI com intervalo.
- **Slides:** L47 (cascata + ROI), L21, L13.
- **Regras:** declarar grupo de controle ou método de atribuição.

### 8.17 Consultoria de marca e negócio (posicionamento, propósito, arquitetura, ativação, inovação, team engagement)

- **Pergunta:** qual caminho estratégico seguir.
- **Estrutura:** diagnóstico com evidência → tensão central → caminhos possíveis → caminho recomendado → plano de ativação.
- **Visuais:** plataforma de marca em camadas (propósito, promessa, provas, tom); arquitetura de marca em árvore (mesma lógica do L46); roadmap por trimestre com fases; matriz de ideias (impacto × esforço, mesma lógica do L34).
- **Slides:** L48 (plataforma), L49 (roadmap), L46 adaptado para arquitetura.
- **Regras:** todo caminho estratégico cita a evidência que o sustenta; diferenciar claramente dado de recomendação.
- **Produto digital:** Keynote (P2) para workshops; Playbook (P5) para guias de marca.

### 8.18 Observatório e tendências

- **Pergunta:** que transformações culturais afetam a marca.
- **Estrutura:** tendência → sinais (exemplos reais com fonte) → tensão para o consumidor → oportunidade para a marca.
- **Visuais:** radar de horizonte em três colunas (agora, próximo, futuro); cards de tendência com ícone, sinal e intensidade de 1 a 5; imagens de sinais com legenda.
- **Slides:** L50 (radar de horizonte), L09.
- **Regras:** todo sinal tem fonte nas notas do slide.
- **Produto digital:** Stories (P6).
- **Armadilha:** tendência sem sinal real que a comprove.

### 8.19 IA aplicada (análise semântica, padrões, segmentação dinâmica, modelos preditivos)

- **Pergunta:** o que os dados em escala revelam que a pesquisa tradicional não alcança.
- **Estrutura:** fonte e volume de dados → temas e padrões → evolução → implicações.
- **Visuais:** temas em barras somando 100% com um verbatim real por tema principal; evolução de temas em linhas; clusters em dispersão; nunca word cloud.
- **Slides:** L51 (temas + verbatins), L15, L38.
- **Regras:** declarar fonte, volume, período e método; deixar claro o que é inferência do modelo e o que é análise especializada.

---

## 9. Editorial

### 9.1 Tom de voz Provokers

Direto, pragmático, humano. Frases curtas e médias alternadas. Voz ativa. Afirma o que o dado mostra e o que fazer com isso.

### 9.2 Estrutura de toda tela com dado

1. **Título-conclusão**: a resposta em frase completa.
2. **Apoio**: até 3 frases com o porquê ou a implicação.
3. **Evidência**: chart, tabela ou infográfico.
4. **Nota**: base, pergunta, fonte, significância.

Título descritivo ("Conhecimento de marca") é proibido em tela de resultado. Pode aparecer só como kicker ou selo.

### 9.3 Regras de escrita [OBRIGATÓRIO]

- Sem travessão para separar frases. Use ponto, vírgula ou dois-pontos. Hífen só em palavra composta.
- Sem jargão e aberturas prontas: "no cenário atual", "vale ressaltar", "além disso", "em suma", "é importante destacar".
- Sem adjetivos vazios: "crucial", "revolucionário", "robusto", "disruptivo".
- Sem a construção "não é X, é Y".
- Sem ponto final em título e rótulo.
- Números de zero a nove por extenso no texto; em dado, sempre algarismo.
- Siglas por extenso na primeira ocorrência.
- Caixa de frase em títulos.
- Aspas tipográficas (“ ”) em texto visível.
- Uma língua por material, inclusive tooltip, eixo, botão, alt text e nome de arquivo exportado.

### 9.4 Composição tipográfica [OBRIGATÓRIO]

- **Sem órfãs e viúvas.** Nenhuma linha final com uma única palavra.
- Digital: `text-wrap: balance` em títulos, `text-wrap: pretty` em parágrafos, `&nbsp;` entre as duas últimas palavras de títulos.
- PPT: revisar quebra; se sobrar uma palavra, reescreva ou ajuste a largura da caixa, nunca a fonte.
- Não quebrar número e unidade, "R$" e valor, nome de marca composto, data.
- Sem espaço antes de vírgula, ponto, dois-pontos e porcentagem.
- Alinhamento à esquerda. Centralizado só em capa, statement e verbatim.

### 9.5 Revisão [OBRIGATÓRIO]

Ortografia, acentuação, concordância, crase, grafia de marcas conforme glossário da skin, casas decimais uniformes. Listar dúvidas em vez de supor.

---

## 10. Acessibilidade

- Contraste 4,5:1 para texto e 3:1 para elementos gráficos. Laranja `#F7921E` sobre branco não serve para texto pequeno.
- Nunca codificar informação só por cor.
- Foco visível em todo controle, dentro do próprio controle quando ele for pílula.
- Teclado em tudo. `aria-live` em resultados dinâmicos.
- Responsivo de 320 a 1920 px sem rolagem horizontal.

---

## 11. Dados fictícios e prompts

### 11.1 Samples

Marcas A, B, C, D e Marca Própria. Categorias genéricas. Bases plausíveis (n=800 a 2.000). Totais fecham em 100%. Rodapé: "Dados fictícios para demonstração." Selo "DADO DE EXEMPLO".

### 11.2 Prompt-base PPT

```
Use PROVOKERS_DESIGN.md como sistema e SKIN_<CLIENTE>.md como skin.
Tipo de estudo: <seção 8.x>. Produto: P1. Template: Template_PVKS_2027_AI.pptx.
Siga a estrutura de capítulos, os visuais obrigatórios e os slides indicados
na seção 8 para esse tipo de estudo.
Para cada slide, devolva: código do layout (L01 a L51), texto de cada caixa,
tipo de gráfico, dados em tabela e nota de base. Títulos são conclusões.
Remova selos de exemplo, a abertura da biblioteca e slides não usados.
No fim, rode o checklist da seção 12 e liste falhas.
```

### 11.3 Prompt-base digital

```
Use PROVOKERS_DESIGN.md e SKIN_<CLIENTE>.md.
Tipo de estudo: <seção 8.x>. Produto: <P2 a P6>. Gere um HTML autocontido.
Tokens como CSS custom properties com os nomes da seção 3.
Siga o blueprint da seção 6, data viz da seção 7, padrões do estudo da seção 8
e editorial da seção 9. Use apenas os dados anexados.
```

---

## 12. Checklist de QA

**Estrutura**
- [ ] Tipo de estudo identificado e estrutura da seção 8 seguida
- [ ] Capítulos por objetivo, não por questionário
- [ ] Toda tela com título-conclusão
- [ ] Nada da lista anti AI slop

**Dados**
- [ ] Todo valor visível, com % quando for percentual
- [ ] Números conferidos com a fonte, mesmo arredondamento em tudo
- [ ] Rótulos manuais (cascatas, NPS, destaques) atualizados junto com os dados
- [ ] Linhas de média, norma e marcações reposicionadas se o eixo mudou
- [ ] Base, pergunta e fonte em toda tela de dado
- [ ] Significância marcada e não significativo sem destaque
- [ ] Quali sem quantificação

**Texto**
- [ ] Zero erro de ortografia e concordância
- [ ] Zero órfã e viúva
- [ ] Zero travessão de pausa e jargão proibido
- [ ] Sem espaço antes de pontuação
- [ ] Idioma único

**Marca**
- [ ] Logo oficial, espelhado como no original
- [ ] Tokens da skin aplicados, sem hex solto
- [ ] Serifa só em momento editorial
- [ ] Ícones centralizados e da mesma família
- [ ] Selos de exemplo e de estudo removidos

**Digital**
- [ ] Teclado, foco visível, contraste AA
- [ ] Responsivo 320 a 1920 px
- [ ] Tooltips úteis, rótulos sem sobreposição
- [ ] Exportar funcionando
- [ ] Filtros sem fallback silencioso

---

## 13. Versionamento

| Versão | Mudança |
|---|---|
| 1.0 | Sistema default |
| 1.1 | Template 2027 na estrutura Kenvue, layouts de texto e imagem, slide mestre |
| 1.2 | Tema de cores no PPT, Output Library, novos gráficos (waffle, flow bands, quadrante, sparkline) |
| 1.3 | Padrões por tipo de estudo (seção 8), regras de ícone, números tabulares só em números, produtos com nome comercial |
| 1.4 | Biblioteca de gráficos por tipo de estudo no template (L26 a L51), slides indicados em cada estudo da seção 8, tabela de escolha de gráfico com exemplos no PPT, selos de estudo, regras de edição de rótulos manuais e formas posicionadas |
