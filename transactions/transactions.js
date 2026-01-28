$(document).ready(function() {
    const balance = localStorage.getItem("balance") || "0";
    $("#display-balance").text(`CLP ${balance}`);

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const $transactionsContainer = $("#transactions-container");
    
    if (transactions.length === 0) {
        $transactionsContainer.html(`
            <p class="text-muted">No hay transacciones registradas.</p>`);
    } else {
        $transactionsContainer.empty();
        transactions
            .reverse()
            .forEach((tx) => {
                const $txElement = $("<div>").addClass("mb-3");
                
                let transactionTitle = "";
                let transactionDetail = "";
                
                if (tx.type === "deposit") {
                    transactionTitle = "Abono";
                    transactionDetail = "Depósito a tu billetera";
                } else if (tx.type === "send") {
                    transactionTitle = "Envío";
                    transactionDetail = `Enviado a ${tx.recipient}`;
                }
                
                $txElement.html(`
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${transactionTitle}</strong><br/>
                            <small class="text-muted">${transactionDetail}</small><br/>
                            <small class="text-muted">${tx.date}</small>
                        </div>
                        <div class="${tx.type === "deposit" ? "text-success" : "text-danger"} fw-bold">
                            ${tx.type === "deposit" ? "+" : "-"} CLP ${tx.amount}
                        </div>
                    </div>
                    <hr class="my-2"/>
                `);
                $transactionsContainer.append($txElement);
            });
    }
});
