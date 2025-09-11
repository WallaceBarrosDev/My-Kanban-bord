# Modeleagem de Requisitos

## Etapa 1 – Diagrama de Processos

### Abrir aplicação

```mermaid
sequenceDiagram
participant User
participant Browser
participant Server

User->>Browser: Abre aplicação
Browser->>Server: Requisição HTTP (GET /home)
Server-->>Browser: Retorna a pagina HTML
Browser->>User: Renderiza pagina

Browser->>Server: Requisição HTTP (GET /api/cards)
alt cards.length > 0
Server-->>Browser: Retorna cards
Browser->>User: Renderiza cards
end
```

### Criar Novo Card

```mermaid
sequenceDiagram
participant User
participant Browser
participant Server
participant DB

User->>Browser: Cria card
Browser-->>User: Renderiza modal de criação de card
User->>Browser: Confirma a criação do card
Browser->>Browser: Valida os campos do card
alt campos validos
Browser->>Server: Requisição HTTP (POST /api/cards)
Server->>DB: Salva card
DB-->>Server: Retorna card
Server-->>Browser: Retorna card
Browser-->>User: Renderiza card
else
Browser-->>User: Renderiza modal de criação de card informando o erro
end
```

### Editar Card

```mermaid
sequenceDiagram
participant User
participant Browser
participant Server
participant DB

User->>Browser: Seleciona um card
Browser-->>User: Renderiz o card na tela
User->>Browser: Adiciona os novos dados e confirma as alterações
Browser->>Server: Requisição HTTP (PUT /api/cards/{id})
Server->>DB: Atualiza card
alt card atualizado
DB-->>Server: Retorna card
Server-->>Browser: Retorna card
Browser-->>User: Confirma as alterações e renderiza card
else
DB-->>Server: Retorna erro
Server-->>Browser: Retorna erro
Browser-->>User: notifica o erro
end

```

### Deletar Card

```mermaid
sequenceDiagram
participant User
participant Browser
participant Server
participant DB

User->>Browser: Seleciona um card
Browser-->>User: Renderiz o card na tela
User->>Browser: confirma que vai deletar o card 
Browser->>Server: Requisição HTTP (DELETE /api/cards/{id})
Server->>DB: Deleta card
alt card deletado
DB-->>Server: Retorna o status de deletado
Server-->>Browser: confirma que o card foi deletado
Browser-->>User: apaga card, modal e notifica
else
DB-->>Server: Retorna erro
Server-->>Browser: Retorna erro
Browser-->>User: notifica o erro
end

```

### Mudar Status

```mermaid
sequenceDiagram
participant User
participant Browser
participant Server
participant DB

User->>Browser: Seleciona um card, o arasta para outra coluna
Browser-->>User: Renderiza o card na nova coluna
Browser->>Server: Requisição HTTP (PUT /api/cards/{id})
Server->>DB: Atualiza status do card
DB-->>Server: Confirma que foi atualizado
```
