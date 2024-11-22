function updateForm() {
    const model = document.getElementById("model").value;
    document.getElementById("dcf-form").style.display = model === "dcf" ? "block" : "none";
    document.getElementById("gordon-form").style.display = model === "gordon" ? "block" : "none";
}

function calculateDCF() {
    const cashflows = document.getElementById("cashflows").value.split(',').map(Number);
    const discountRates = document.getElementById("discountRates").value.split(',').map(rate => parseFloat(rate) / 100);
    const terminalGrowth = parseFloat(document.getElementById("terminalGrowth").value) / 100;

    if (cashflows.length !== discountRates.length) {
        document.getElementById("result").innerText = "Erro: A quantidade de fluxos e taxas de desconto deve ser igual.";
        return;
    }

    let presentValue = 0;
    for (let i = 0; i < cashflows.length; i++) {
        presentValue += cashflows[i] / Math.pow(1 + discountRates[i], i + 1);
    }

    const terminalValue = cashflows[cashflows.length - 1] * (1 + terminalGrowth) / (discountRates[discountRates.length - 1] - terminalGrowth);
    presentValue += terminalValue / Math.pow(1 + discountRates[discountRates.length - 1], cashflows.length);

    document.getElementById("result").innerText = `Valuation pelo método DCF: R$${presentValue.toFixed(2)}`;
}

function calculateGordon() {
    const fcf = parseFloat(document.getElementById("fcf").value);
    const discountRate = parseFloat(document.getElementById("discountRateGordon").value) / 100;
    const growthRate = parseFloat(document.getElementById("growthRate").value) / 100;

    if (discountRate <= growthRate) {
        document.getElementById("result").innerText = "Erro: A taxa de desconto deve ser maior que a taxa de crescimento.";
        return;
    }

    const valuation = fcf / (discountRate - growthRate);
    document.getElementById("result").innerText = `Valuation pelo método Gordon: R$${valuation.toFixed(2)}`;
}
