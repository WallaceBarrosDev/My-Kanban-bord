# Diagrama de Classes

```mermaid
classDiagram
class Card {
   - id: number
   - title: string
   - description: string
   - createdAt: Date
   - deadline: Date
   + status: string
   }

   class User {
   - id: number
   - name: string
   }

   User "1" --> "*" Card : Criar
   ```
