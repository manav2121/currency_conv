const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

const apiKey = 'cda3e32f66fd9db5962f3251'; // Replace with your API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

let currencyRates = {};

async function fetchCurrencyRates() {
    result.textContent = "Loading...";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        currencyRates = data.conversion_rates;
        populateCurrencyOptions();
    } catch (error) {
        console.error("Error fetching currency rates:", error);
        result.textContent = "Failed to fetch currency rates. Please try again later.";
    }
}

function populateCurrencyOptions() {
    // Clear existing options
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';

    for (let currency in currencyRates) {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    }
}

function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;

    if (amountValue === "" || isNaN(amountValue)) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    const convertedAmount = (amountValue * currencyRates[to]) / currencyRates[from];
    result.textContent = `${amountValue} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
}

convertBtn.addEventListener("click", convertCurrency);
fetchCurrencyRates();