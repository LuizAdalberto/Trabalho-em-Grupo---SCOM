# Bula Acessível

Aplicativo Android de acessibilidade para pessoas com baixa visão, idosas ou com baixa alfabetização que tomam remédios. Ele **lê a caixa do remédio com a câmera, fala em voz alta as informações cadastradas, avisa os horários com alarme e avisa quando está na hora de comprar mais**.

Trabalho em grupo — UNESP. Todos os dados ficam **somente no celular** (nada é enviado para servidores).

## Instalação (Android)

1. Baixe o arquivo `.apk` mais recente em **Releases** deste repositório: `[LINK_DA_RELEASE_AQUI](https://github.com/LuizAdalberto/Trabalho-em-Grupo---SCOM/releases/tag/v1)`.
2. Abra o arquivo no celular e permita "instalar apps de fontes desconhecidas" quando o Android pedir.
3. Abra o app, crie uma conta local (nome e senha) e permita câmera e notificações.
4. Para os alarmes tocarem com o app fechado, em alguns aparelhos (ex.: Xiaomi) ative "Início automático", bateria "Sem restrições" e a permissão "Alarmes e lembretes".

## Funcionalidades

- **Conta local** com senha (SHA-256 com salt aleatório); cada usuário vê só os seus remédios.
- **Cadastro de remédios:** nome, dose, como tomar, alarme (a cada N horas, a partir de um horário, com ou sem data final escolhida no calendário), quantidade de comprimidos na cartela e por dose, fotos da bula (câmera ou galeria) com o texto extraído.
- **Leitura em voz alta** (pt-BR) da tela inteira ou de um campo específico; compatível com TalkBack.
- **Identificação pela câmera:** o app lê o texto da caixa (OCR no aparelho, ML Kit), compara com os remédios cadastrados e abre o correto. Se não achar, mostra o texto e oferece cadastrar.
- **Alarme sonoro** (canal de alta prioridade, som de ~28 s, vibração) que funciona com o app fechado.
- **Controle de estoque:** desconta comprimidos a cada alarme e envia notificação quando o restante não dá para 7 dias.

## Tecnologias

Expo SDK 58 / React Native 0.88, TypeScript, Expo Router, expo-sqlite, expo-notifications, expo-camera, expo-text-extractor, expo-speech, expo-image-picker, expo-file-system, expo-crypto, Jest (jest-expo).

## Arquitetura

```
src/
  app/          telas (Expo Router): index, login, menu, meus-remedios,
                remedio-form, remedio-detalhe, scan, resultado
  components/   botões, campos, AlarmSync (reagenda alarmes ao abrir o app)
  constants/    tema (cores, fontes, tamanho mínimo de toque)
  context/      AuthContext (usuário logado)
  hooks/        useScreenReader, useFieldSpeaker, useRequireUser
  services/     db (SQLite + migrações), auth, medicines, alarms, stock,
                photos, speech, ocr
  utils/        lógica pura e testada: schedule, stock, format, match
__tests__/      testes automatizados (Jest)
```

Camadas: **telas → serviços → SQLite**. Regras de cálculo (alarmes, estoque, identificação por nome) ficam em `utils/`, sem dependência do celular, por isso são testáveis.

Banco local (`bula.db`): tabelas `users`, `app_state`, `medicines`, `bula_photos`. Toda consulta filtra por `user_id`. Migrações por `PRAGMA table_info` + `ALTER TABLE`.

Alarmes: se o intervalo divide 24 h e não há data final, usa gatilhos diários; caso contrário agenda as próximas 48 ocorrências e reagenda ao abrir o app.

## Executar para desenvolvimento

```
npm install
npx expo start --dev-client
```

Precisa de um *development build* (módulos nativos; não roda no Expo Go):
`npx eas-cli build --platform android --profile development`

## Gerar o APK para distribuição

```
npx eas-cli build --platform android --profile preview
```

O APK gerado leva o JavaScript embutido e funciona sem o computador ligado.

## Testes

```
npx expo install jest-expo jest @types/jest --dev
npm pkg set scripts.test="jest"
npm test
```

Cobrem cálculo de horários de alarme, datas, estoque/aviso de compra, máscaras de digitação e identificação do remédio pelo texto da caixa.

## Limitações conhecidas

- Dados só no aparelho (sem backup nem recuperação de senha).
- Senha com SHA-256 + salt (não bcrypt/Argon2).
- O estoque assume que toda dose foi tomada (não há botão "Tomei").
- O OCR erra mais em fotos de bula com texto pequeno e denso.
- O volume do alarme segue o volume de alarme do sistema.
- Alarmes não diários dependem de abrir o app periodicamente (janela de 48 agendamentos).
- O alarme toca uma vez (~28 s), sem repetir até ser desligado.
- O app **não substitui orientação médica**; as informações são as que o próprio usuário cadastra.

## Uso de IA generativa

Veja [`REGISTRO_IA.md`](REGISTRO_IA.md).
