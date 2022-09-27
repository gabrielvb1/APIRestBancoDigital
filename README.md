# APIRestBancoDigital
Simulação de uma API Rest com CRUD em um Banco Digital.
<br>
 RESTful API que permite:

-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário


Todas as etapas do CRUD são protegidas por um Middleware de autenticação.

Os dados são persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. **Todas as transações e contas bancárias deverão ser inseridas dentro deste objeto, seguindo a estrutura que já existe.**

### Estrutura do objeto no arquivo `bancodedados.js`

```javascript
{
    banco: {
        nome: "Cubos Bank",
        numero: "123",
        agencia: "0001",
        senha: "Cubos123Bank",
    },
    contas: [
        // array de contas bancárias
    ],
    saques: [
        // array de saques
    ],
    depositos: [
        // array de depósitos
    ],
    transferencias: [
        // array de transferências
    ],
}
```
