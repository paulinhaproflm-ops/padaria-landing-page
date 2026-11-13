# Design System: Padaria Bella Vista

Definido com a skill **UI/UX Pro Max** (busca `bakery cafe elegant food --design-system`)
e ajustado à identidade da marca. Os valores ficam no `:root` de `css/style.css`.

## Direção
- **Estilo:** minimalismo editorial, com muito espaço, poucos efeitos e as fotos em destaque.
- **Densidade:** espaçosa (espaços de 24 a 96px).
- **Movimento:** sutil (transições de 200 a 250ms) e respeita "reduzir movimento" do sistema.

## Cores
| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#FAF4EA` (marfim) | Fundo principal |
| `--color-surface` | `#FFFDF9` (branco quente) | Cards e formulário |
| `--color-surface-alt` | `#F2E6D5` (bege claro) | Seções alternadas |
| `--color-foreground` | `#3D2B22` | Texto |
| `--color-heading` | `#493024` (marrom café) | Títulos |
| `--color-muted-foreground` | `#6E5849` | Texto de apoio |
| `--color-primary` | `#A95732` (laranja terroso) | Botões |
| `--color-accent` | `#C9824D` (caramelo) | Detalhes e foco |
| `--color-accent-text` | `#94492A` | Rótulos em laranja sobre fundo claro |
| `--color-dark` | `#302019` (marrom profundo) | Rodapé e camada do hero |

### Contraste (WCAG, mínimo 4.5:1 para texto)
| Combinação | Contraste |
|---|---|
| Texto de apoio no marfim | 6.08 |
| Branco no botão laranja | 5.05 |
| Rótulo laranja escuro no bege claro | 5.25 |
| Placeholder do formulário no marfim | 4.75 |
| Bege no marrom profundo | 10.80 |

## Tipografia
- **Títulos:** Playfair Display
- **Rótulos** (categorias do cardápio, "Horário de funcionamento"): Playfair Display SC, no estilo dos cardápios de restaurante
- **Textos e navegação:** Manrope (a skill sugeriu Karla; ficou a Manrope, escolhida no briefing)

## Regras de acessibilidade aplicadas
- Links, botões e campos com pelo menos **44px de altura** (alvo de toque)
- **Foco visível** em todos os elementos clicáveis
- **Horário de funcionamento em destaque** (a skill aponta "horário escondido" como erro comum em sites de comida)
- Testado em 375, 768, 1024 e 1440px, sem rolagem lateral
