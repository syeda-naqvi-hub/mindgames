// Enhanced Calculator - MindPlay
// Features: Tabs, Memory, History, Keyboard, Scientific functions

let display = '0';
let operator = null;
let previousValue = 0;
let waitingForOperand = false;
let memory = 0;
let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
let currentTab = 'basic';

document.addEventListener('DOMContentLoaded', function() {
    loadTab(currentTab);
    updateHistory();
    setupKeyboard();
    
    // Currency setup
    setupCurrency();
});

function loadTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const container = document.getElementById('calculator-container');
    let html = `
        <input type="text" class="display" id="display" readonly value="${display}">
        <div class="memory-row">
            <button class="btn btn-memory" onclick="memoryStore()">MS</button>
            <button class="btn btn-memory" onclick="memoryRecall()">MR</button>
            <button class="btn btn-memory" onclick="memoryAdd()">M+</button>
            <button class="btn btn-memory" onclick="memorySubtract()">M-</button>
            <button class="btn btn-clear" onclick="clearDisplay()">AC</button>
        </div>
        <div class="buttons-grid">
    `;
    
    if (tab === 'basic') {
        html += basicButtons();
    } else if (tab === 'scientific') {
        html += scientificButtons();
    }
    
    html += `</div>`;
    container.innerHTML = html;
    updateDisplay();
}

function basicButtons() {
    return `
        <button class="btn btn-clear" onclick="deleteLast()">⌫</button>
        <button class="btn btn-operator" onclick="setOperator('/')" data-func="/">÷</button>
        <button class="btn btn-operator" onclick="setOperator('*')" data-func="*">×</button>
        <button class="btn btn-operator" onclick="setOperator('-')" data-func="−">−</button>
        
        <button class="btn btn-number" onclick="appendToDisplay('7')">7</button>
        <button class="btn btn-number" onclick="appendToDisplay('8')">8</button>
        <button class="btn btn-number" onclick="appendToDisplay('9')">9</button>
        <button class="btn btn-operator" onclick="setOperator('+')" data-func="+">+</button>
        
        <button class="btn btn-number" onclick="appendToDisplay('4')">4</button>
        <button class="btn btn-number" onclick="appendToDisplay('5')">5</button>
        <button class="btn btn-number" onclick="appendToDisplay('6')">6</button>
        <button class="btn btn-equals" onclick="calculate()">=</button>
        
        <button class="btn btn-number" onclick="appendToDisplay('1')">1</button>
        <button class="btn btn-number" onclick="appendToDisplay('2')">2</button>
        <button class="btn btn-number" onclick="appendToDisplay('3')">3</button>
        <button class="btn btn-number" onclick="appendToDisplay('0')" style="grid-column: span 2;">0</button>
        
        <button class="btn btn-number" onclick="appendToDisplay('.')">.</button>
    `;
}

function scientificButtons() {
    return `
        <button class="btn btn-function" onclick="appendToDisplay('(')">(</button>
        <button class="btn btn-function" onclick="appendToDisplay(')')">)</button>
        <button class="btn btn-function" onclick="calcFunction('sin')">sin</button>
        <button class="btn btn-function" onclick="calcFunction('cos')">cos</button>
        
        <button class="btn btn-function" onclick="calcFunction('tan')">tan</button>
        <button class="btn btn-function" onclick="calcFunction('log')">log</button>
        <button class="btn btn-function" onclick="calcFunction('pow')">x²</button>
        <button class="btn btn-function" onclick="calcFunction('sqrt')">√</button>
        
        <button class="btn btn-number" onclick="appendToDisplay('7')">7</button>
        <button class="btn btn-number" onclick="appendToDisplay('8')">8</button>
        <button class="btn btn-number" onclick="appendToDisplay('9')">9</button>
        <button class="btn btn-operator" onclick="setOperator('/')" data-func="/">÷</button>
        
        <button class="btn btn-number" onclick="appendToDisplay('4')">4</button>
        <button class="btn btn-number" onclick="appendToDisplay('5')">5</button>
        <button class="btn btn-number" onclick="appendToDisplay('6')">6</button>
        <button class="btn btn-operator" onclick="setOperator('*')">×</button>
        
        <button class="btn btn-number" onclick="appendToDisplay('1')">1</button>
        <button class="btn btn-number" onclick="appendToDisplay('2')">2</button>
        <button class="btn btn-number" onclick="appendToDisplay('3')">3</button>
        <button class="btn btn-operator" onclick="setOperator('-')">−</button>
        
        <button class="btn btn-number" onclick="appendToDisplay('0')">0</button>
        <button class="btn btn-number" onclick="appendToDisplay('.')">.</button>
        <button class="btn btn-equals" onclick="calculate()" style="grid-column: span 3;">=</button>
    `;
}

function switchTab(tab) {
    loadTab(tab);
}

// Core Functions
function updateDisplay() {
    const disp = document.getElementById('display');
    if (disp) disp.value = display;
}

function appendToDisplay(value) {
    if (waitingForOperand) {
        display = '0';
        waitingForOperand = false;
    }
    display = display === '0' && value !== '.' ? value : display + value;
    updateDisplay();
}

function setOperator(op) {
    operator = op;
    previousValue = parseFloat(display);
    waitingForOperand = true;
}

function calculate() {
    if (!operator) return;
    
    let current = parseFloat(display);
    let result;
    
    switch (operator) {
        case '+': result = previousValue + current; break;
        case '-': result = previousValue - current; break;
        case '*': result = previousValue * current; break;
        case '/': 
            result = current === 0 ? NaN : previousValue / current; 
            break;
        default: return;
    }
    
    display = isNaN(result) ? 'Error' : result.toString();
    updateDisplay();
    addToHistory(`${previousValue} ${operator} ${current} = ${display}`);
    operator = null;
    waitingForOperand = true;
}

function clearDisplay() {
    display = '0';
    previousValue = 0;
    operator = null;
    waitingForOperand = false;
    updateDisplay();
}

function deleteLast() {
    display = display.length > 1 ? display.slice(0, -1) : '0';
    updateDisplay();
}

// Memory Functions
function memoryStore() { memory = parseFloat(display); }
function memoryRecall() { display = memory.toString(); updateDisplay(); }
function memoryAdd() { memory += parseFloat(display); }
function memorySubtract() { memory -= parseFloat(display); }

// Scientific Functions
function calcFunction(fn) {
    const num = parseFloat(display);
    let result;
    switch(fn) {
        case 'sin': result = Math.sin(num * Math.PI / 180); break;
        case 'cos': result = Math.cos(num * Math.PI / 180); break;
        case 'tan': result = Math.tan(num * Math.PI / 180); break;
        case 'log': result = Math.log10(num); break;
        case 'pow': result = Math.pow(num, 2); break;
        case 'sqrt': result = Math.sqrt(num); break;
    }
    display = isNaN(result) ? 'Error' : result.toString();
    updateDisplay();
    addToHistory(`${fn}(${num}) = ${display}`);
}

// History
function addToHistory(entry) {
    history.unshift(entry);
    if (history.length > 50) history = history.slice(0, 50);
    localStorage.setItem('calcHistory', JSON.stringify(history));
    updateHistory();
}

function updateHistory() {
    const list = document.getElementById('history-list');
    if (list && history.length) {
        list.innerHTML = history.slice(0, 10).map((item, i) => 
            `<div class="history-item" onclick="useHistory(${i})">${item}</div>`
        ).join('');
    }
}

function useHistory(index) {
    display = history[index].split('=')[1] || '0';
    updateDisplay();
}

function clearHistory() {
    history = [];
    localStorage.removeItem('calcHistory');
    updateHistory();
}

// Keyboard Support
function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        
        const key = e.key;
        if (key >= '0' && key <= '9' || key === '.') appendToDisplay(key);
        else if (key === '+') setOperator('+');
        else if (key === '-') setOperator('-');
        else if (key === '*') setOperator('*');
        else if (key === '/') setOperator('/');
        else if (key === 'Enter' || key === '=') calculate();
        else if (key === 'Escape') clearDisplay();
        else if (key === 'Backspace') deleteLast();
    });
}

// Converter (integrated)
function setupCurrency() {
    const currencies = ['USD','EUR','GBP','INR','JPY'];
    // Dropdown population moved to HTML for simplicity
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('currency-amount')?.value || 0);
    if (!amount || currentTab !== 'converter') return;
    
    // Mock rates (production: use API)
    const rates = {USD:{EUR:0.92,GBP:0.79,INR:83.5,JPY:150},EUR:{USD:1.09}};
    const from = document.getElementById('from-currency')?.value || 'USD';
    const to = document.getElementById('to-currency')?.value || 'EUR';
    
    const rate = rates[from]?.[to] || 1;
    const result = (amount * rate).toFixed(4);
    document.getElementById('currency-result').textContent = `${amount} ${from} = ${result} ${to}`;
    addToHistory(`Convert: ${amount} ${from} → ${result} ${to}`);
}

