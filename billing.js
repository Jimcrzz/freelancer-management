const billingSection = document.getElementById('billing');

const invoiceForm = document.createElement('form');
invoiceForm.innerHTML = `
    <h2>Generar Factura</h2>
    <label>Fecha: <input type="date" id="invoice-date"></label>
    <label>Cliente: <input type="text" id="invoice-client"></label>
    <label>Descripción: <input type="text" id="invoice-description"></label>
    <label>Monto: <input type="number" id="invoice-amount"></label>
    <label>Estado: 
        <select id="invoice-status">
            <option value="pendiente">Pendiente</option>
            <option value="pagada">Pagada</option>
        </select>
    </label>
    <button type="button" onclick="addInvoice()">Agregar Factura</button>
`;

const invoiceList = document.createElement('div');
invoiceList.innerHTML = `<h2>Lista de Facturas</h2><ul id="invoice-list"></ul>`;

billingSection.appendChild(invoiceForm);
billingSection.appendChild(invoiceList);

function addInvoice() {
    const invoice = {
        date: document.getElementById('invoice-date').value,
        client: document.getElementById('invoice-client').value,
        description: document.getElementById('invoice-description').value,
        amount: parseFloat(document.getElementById('invoice-amount').value),
        status: document.getElementById('invoice-status').value
    };
    let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    displayInvoices();
}

function displayInvoices() {
    const invoiceListElement = document.getElementById('invoice-list');
    invoiceListElement.innerHTML = '';
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.forEach(invoice => {
        const listItem = document.createElement('li');
        listItem.textContent = `${invoice.date} - ${invoice.client} - ${invoice.description} - $${invoice.amount.toFixed(2)} - ${invoice.status}`;
        invoiceListElement.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', displayInvoices);