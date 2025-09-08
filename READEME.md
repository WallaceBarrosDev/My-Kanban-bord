# Projeto My Kanban Bord

## O que e o My Kanban Bord

- Descrição: O My Kanban Bord e um projeto pessoal de minha altoria.

- Objetivo: Me ajudar a gerenciar os meu projetos pessoal.

- funcionalidades:
    - Criar nova coluna
    - Editar nome e cor da coluna
    - Deletar coluna
    - Criar nova tarefa
    - Adicionar nome, cor e descrição da tarefa
    - Editar nome, cor e descrição da tarefa
    - Mover tarefa para outra coluna
    - Marcar tarefa como concluida
    - Deletar tarefa

## Documentação

```mermaid
graph TD
A[Frontend React] --> B[Backend Node.js/Express]
B --> C[(Banco de Dados PostgreSQL)]
B --> D[Serviço de Notificações]
D --> A
```

```mermaid
flowchart TD
User["Usuário"] -->|Clica em Criar Card| Frontend["Frontend React"]
Frontend -->|POST /api/cards| Backend["Backend Node.js"]
Backend -->|Salva| DB[(PostgreSQL)]
Backend -->|Dispara notificação| Notification["Serviço de Notificações"]
Notification -->|Atualiza em tempo real| Frontend
Frontend -->|Renderiza card| User
```

```mermaid
classDiagram
class User {
+id: int
+name: string
+email: string
+login()
}

class Board {
+id: int
+title: string
+createCard()
}

class Card {
+id: int
+title: string
+status: string
+move()
}

User "1" --> "*" Board : owns
Board "1" --> "*" Card : contains
```

```mermaid
sequenceDiagram
participant User
participant Frontend
participant Backend
participant DB
participant Notification

User->>Frontend: Clica em "Criar Card"
Frontend->>Backend: POST /api/cards
Backend->>DB: Salva Card
DB-->>Backend: Confirmação
Backend->>Notification: Dispara notificação
Notification-->>Frontend: Atualiza card
Frontend-->>User: Mostra card criado
```

```mermaid
graph LR
Auth[Autenticação] --> Backend[Backend]
Boards[Boards] --> Backend
Notifications[Notificações] --> Backend
Frontend --> Backend
Backend --> DB[(PostgreSQL)]

```
