$(document).ready(function() {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    $("#display-username").text(`${firstName} ${lastName}`);

    const balance = localStorage.getItem("balance") || "0";
    $("#display-balance").text(`CLP ${balance}`);

    $("#abonar-btn").on("click", function() {
        window.location.href = "../deposit/deposit.html";
    });

    $("#enviar-btn").on("click", function() {
        window.location.href = "../sendmoney/sendmoney.html";
    });

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const $recentTransactionsContainer = $("#recent-transactions-container");
    
    if (transactions.length === 0) {
        $recentTransactionsContainer.html(`
            <p class="text-muted">No hay transacciones recientes.</p>`);
    } else {
        $recentTransactionsContainer.empty();
        transactions
            .slice(-5)
            .reverse()
            .forEach((tx) => {
                const $txElement = $("<div>").addClass("mb-2");
                $txElement.html(`
                    <div class="d-flex justify-content-between">
                        <div>
                            <strong>${tx.type === "deposit" ? "Abono" : "Envío"}</strong><br/>
                            <small class="text-muted">${tx.date}</small>
                        </div>
                        <div class="${tx.type === "deposit" ? "text-success" : "text-danger"}">
                            ${tx.type === "deposit" ? "+" : "-"} CLP ${tx.amount}
                        </div>
                    </div>
                    <hr class="my-1"/>
                `);
                $recentTransactionsContainer.append($txElement);
            });
    }
});