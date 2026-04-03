// Currency converter logic
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('currency-amount').value);
    const from = document.getElementById('from-currency').value;
    const to = document.getElementById('to-currency').value;
    
    if (!amount) {
        document.getElementById('currency-result').textContent = '';
        return;
    }
    
    try {
        // Mock API response (replace with real API like exchangerate-api.com)
        const rates = {
            USD: {EUR: 0.92, GBP: 0.79, INR: 83.5},
            EUR: {USD: 1.09, GBP: 0.86, INR: 91.0},
            GBP: {USD: 1.27, EUR: 1.16, INR: 106.0},
            INR: {USD: 0.012, EUR: 0.011, GBP: 0.0095}
        };
        
        const rate = rates[from]?.[to] || 1;
        const result = (amount * rate).toFixed(2);
        
        document.getElementById('currency-result').textContent = 
            `${amount} ${from} = ${result} ${to}`;
    } catch (error) {
        document.getElementById('currency-result').textContent = 'Conversion error';
    }
}

// Populate currency dropdowns
document.addEventListener('DOMContentLoaded', function() {
    const currencies = ['USD', 'EUR', 'GBP', 'INR'];
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    
    currencies.forEach(cur => {
        fromSelect.innerHTML += `<option>${cur}</option>`;
        toSelect.innerHTML += `<option>${cur}</option>`;
    });
});
