
const productValueInput = document.getElementById('product-value');
const addProductButton = document.getElementById('add-product');
const productsTableBody = document.querySelector('#products-table tbody');
const totalValueElement = document.getElementById('total-value');
const moneyInput = document.getElementById('money-input');
const calculateChangeButton = document.getElementById('calculate-change');
const changeValueElement = document.getElementById('change-value');


let products = [];
let productCounter = 1;


function formatCurrency(value) {
    return 'R$ ' + value.toFixed(2).replace('.', ',');
}


function updateProductsTable() {
   
    productsTableBody.innerHTML = '';
    
  
    products.forEach((product) => {
        const row = document.createElement('tr');
        
        const itemCell = document.createElement('td');
        itemCell.textContent = `Produto ${product.id}`;
        
        const valueCell = document.createElement('td');
        valueCell.textContent = formatCurrency(product.value);
        
        row.appendChild(itemCell);
        row.appendChild(valueCell);
        
        productsTableBody.appendChild(row);
    });
}


function updateTotal() {
    const total = products.reduce((sum, product) => sum + product.value, 0);
    totalValueElement.textContent = formatCurrency(total);
    return total;
}


function addProduct() {
    const value = parseFloat(productValueInput.value);
    
    if (isNaN(value) || value <= 0) {
        alert('Por favor, insira um valor válido para o produto.');
        return;
    }
    
    products.push({
        id: productCounter++,
        value: value
    });
    
    productValueInput.value = '';
    updateProductsTable();
    updateTotal();
}


function calculateChange() {
    const total = products.reduce((sum, product) => sum + product.value, 0);
    const money = parseFloat(moneyInput.value);
    
   if (isNaN(money) || money <= 0) {
        changeValueElement.textContent = 'R$ 0,00';
        return;
    }
    
    const change = money - total;
    
    if (change < 0) {
        changeValueElement.textContent ='Valor insuficiente';
        changeValueElement.style.color = '#e74c3c';
    } else {
        changeValueElement.textContent = formatCurrency(change);
        changeValueElement.style.color = '#2c3e50';
    }
}


addProductButton.addEventListener('click', addProduct);

productValueInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addProduct();
    }
});

calculateChangeButton.addEventListener('click', calculateChange);

moneyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateChange();
    }
});


updateProductsTable();
updateTotal();