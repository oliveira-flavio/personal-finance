const Modal = {
    open() {
        // Abrir Modal
        // Adicionar a class active ao modal
        document.querySelector(".modal-overlay").classList.add("active");
    },
    close() {
        // Fechar o Modal
        // Remover a class active do modal
        document.querySelector(".modal-overlay").classList.remove("active");
    },
};

const transactions = [
    {
        id: 1,
        description: "Luz",
        amount: -50000,
        date: "23/01/2021",
    },
    {
        id: 2,
        description: "Website",
        amount: 500000,
        date: "23/01/2021",
    },
    {
        id: 3,
        description: "Internet",
        amount: -20000,
        date: "23/01/2021",
    },
];

const Transaction = {
    incomes() {
        let income = 0;
        // //pegar todas as transações
        // para cada transação
        transactions.forEach(transaction => {
            if (transaction.amount > 0) {
                income = + transaction.amount;
            }
        })
        // se for maior de zero
        // somar a uma variavel e retornar a varial
        return income;
    },
    expenses() {
        let expense = 0;
        // //pegar todas as transações
        // para cada transação
        transactions.forEach(transaction => {
            if (transaction.amount < 0) {
                expense = + transaction.amount;
            }
        })
        // se for maior de zero
        // somar a uma variavel e retornar a varial
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    },
};

//Fazer a substituição dos dados no HTML pelos dados do
//Javascript

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction, index) {
        const tr = document.createElement("tr");
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const HTML = `       
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `;
        return HTML;
    },

    updateBalance() {
        document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total());
    },
};

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, ""); // REGEX

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        return signal + value;
    },
};

transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction);
});

DOM.updateBalance();
