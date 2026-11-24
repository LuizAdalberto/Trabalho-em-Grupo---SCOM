# Registro de uso de IA

## 23/11/2026 — atualização visual e acessibilidade

- **Ferramenta:** ChatGPT (GPT-6).
- **Finalidade:** aplicar ao projeto Bula Acessível a identidade visual azul aprovada, com fontes maiores, botões e ícones ampliados, cartões com contraste e cabeçalhos azuis.
- **Arquivos alterados:** `src/constants/theme.ts`; componentes `ActionButton`, `PrimaryButton`, `TextField`, `FieldSection` e `HomeBackButton`; telas `index`, `login`, `menu`, `meus-remedios`, `remedio-form`, `remedio-detalhe`, `scan`, `resultado`; e `src/app/_layout.tsx`.
- **Alterações funcionais:** nenhuma funcionalidade de cadastro, banco local, alarmes, estoque, fotos/OCR, câmera ou narração foi intencionalmente modificada. A tela inicial permanece sem nome ou logotipo, conforme pedido.
- **Verificação:** `tsc --noEmit` executado sem erros após corrigir o tipo de `ListEmptyComponent` para usar `undefined` enquanto a lista carrega. O app ainda precisa ser aberto e testado em aparelho Android.
- **Avaliação crítica:** a IA ajudou a padronizar cores, tipografia e componentes visuais. A equipe deve conferir contraste, tamanho dos textos em aparelhos menores e navegação com TalkBack antes da entrega.

## 20–23/11/2026 — desenvolvimento das funcionalidades e da documentação

- **Ferramenta:** Claude (Anthropic, Claude Sonnet 5.5).
- **Finalidade:** apoiar o desenvolvimento do código, orientar a configuração (Expo/EAS, Android) e redigir testes e documentação, sempre a partir dos pedidos da equipe.
- **Trechos produzidos:**
  - banco local e autenticação (`services/db.ts`, `auth.ts`, `AuthContext`);
  - cadastro e consulta de remédios, fotos da bula e OCR (`services/medicines.ts`, `photos.ts`, `ocr.ts`, telas `remedio-form`, `remedio-detalhe`, `scan`, `resultado`);
  - alarmes e canal de notificação, som do alarme, reagendamento (`services/alarms.ts`, `utils/schedule.ts`, `AlarmSync`);
  - controle de estoque e aviso de compra (`services/stock.ts`, `utils/stock.ts`);
  - leitura em voz alta (`services/speech.ts`, hooks `useScreenReader`, `useFieldSpeaker`);
  - identificação do remédio pelo nome (`utils/match.ts`), testes Jest em `__tests__/`, `README.md` e ajustes do `app.json`.
- **Modificações realizadas pela equipe:** a equipe definiu a ideia e os requisitos, pediu cada mudança de comportamento (alarme, estoque de 7 dias, calendário, remoção do código de barras, menu), testou em aparelho Android real e corrigiu o rumo quando algo não funcionou. A identidade visual foi feita com o ChatGPT (entrada acima). _(Equipe: complete aqui o que vocês alteraram manualmente.)_
- **Verificação:** a IA não executou o app em celular. Ela checou sintaxe com o compilador TypeScript e validou a lógica pura (`utils/`) com testes em Node; o comportamento no aparelho (alarmes com app fechado, câmera, OCR, voz) foi testado pela equipe.
- **Avaliação crítica:** a IA acelerou o código e apontou causas de problemas (ex.: módulo nativo ausente no build, restrições de bateria do Xiaomi), mas errou algumas vezes e precisou de correção a partir dos testes da equipe: limite de aviso de estoque (2 dias → 7 dias), pilha de navegação crescendo, volume baixo do alarme (depende do volume do sistema). Limitações como senha com SHA-256 e estoque que assume doses tomadas foram mantidas e estão declaradas no `README.md`. Toda a lógica deve ser lida e compreendida pela equipe antes da apresentação.
