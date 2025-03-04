const incomeExpenseSection = document.getElementById('income-expense');

const incomeForm = document.createElement('form');
incomeForm.innerHTML = `
    <h2>Registrar Ingreso</h2>
    <label>Fecha: <input type="date" id="income-date"></label>
    <label>Descripción: <input type="text" id="income-description"></label>
    <label>Cliente: <input type="text" id="income-client"></label>
    <label>Monto: <input type="number" id="income-amount"></label>
    <button type="button" onclick="addIncome()">Agregar Ingreso</button>
`;

const expenseForm = document.createElement('form');
expenseForm.innerHTML = `
    <h2>Registrar Gasto</h2>
    <label>Fecha: <input type="date" id="expense-date"></label>
    <label>Descripción: <input type="text" id="expense-description"></label>
    <label>Categoría: <input type="text" id="expense-category"></label>
    <label>Monto: <input type="number" id="expense-amount"></label>
    <button type="button" onclick="addExpense()">Agregar Gasto</button>
`;

const incomeList = document.createElement('div');
incomeList.innerHTML = `<h2>Lista de Ingresos</h2><ul id="income-list"></ul>`;

const expenseList = document.createElement('div');
expenseList.innerHTML = `<h2>Lista de Gastos</h2><ul id="expense-list"></ul>`;

const reportSection = document.createElement('div');
reportSection.innerHTML = `<h2>Reporte Financiero</h2><div id="financial-report"></div>`;

incomeExpenseSection.appendChild(incomeForm);
incomeExpenseSection.appendChild(expenseForm);
incomeExpenseSection.appendChild(incomeList);
incomeExpenseSection.appendChild(expenseList);
incomeExpenseSection.appendChild(reportSection);

function addIncome() {
    const income = {
        date: document.getElementById('income-date').value,
        description: document.getElementById('income-description').value,
        client: document.getElementById('income-client').value,
        amount: parseFloat(document.getElementById('income-amount').value)
    };
    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.push(income);
    localStorage.setItem('incomes', JSON.stringify(incomes));
    displayIncomes();
    generateFinancialReport();
}

function addExpense() {
    const expense = {
        date: document.getElementById('expense-date').value,
        description: document.getElementById('expense-description').value,
        category: document.getElementById('expense-category').value,
        amount: parseFloat(document.getElementById('expense-amount').value)
    };
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    generateFinancialReport();
}

function displayIncomes() {
    const incomeListElement = document.getElementById('income-list');
    incomeListElement.innerHTML = '';
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.forEach(income => {
        const listItem = document.createElement('li');
        listItem.textContent = `${income.date} - ${income.description} - ${income.client} - $${income.amount.toFixed(2)}`;
        incomeListElement.appendChild(listItem);
    });
}

function displayExpenses() {
    const expenseListElement = document.getElementById('expense-list');
    expenseListElement.innerHTML = '';
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.date} - ${expense.description} - ${expense.category} - $${expense.amount.toFixed(2)}`;
        expenseListElement.appendChild(listItem);
    });
}

function generateFinancialReport() {
    const reportElement = document.getElementById('financial-report');
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netIncome = totalIncome - totalExpense;
    reportElement.innerHTML = `
        <p>Total Ingresos: $${totalIncome.toFixed(2)}</p>
        <p>Total Gastos: $${totalExpense.toFixed(2)}</p>
        <p>Ingresos Netos: $${netIncome.toFixed(2)}</p>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    displayIncomes();
    displayExpenses();
    generateFinancialReport();
});