$(document).ready(function() {
    const balance = localStorage.getItem("balance") || "0";
    $("#display-balance").text(`CLP ${balance}`);

    $("#deposit-form").on("submit", function(event) {
        event.preventDefault();
        const depositAmount = $("#deposit-amount").val();
        
        if(depositAmount && parseFloat(depositAmount) >= 1000) {
            $("#confirm-amount").text(depositAmount);
            const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
            confirmModal.show();
        }
    });

    $("#confirm-deposit").on("click", function() {
        const depositAmount = parseFloat($("#deposit-amount").val());
        const currentBalance = parseFloat(localStorage.getItem("balance")) || 0;
        const newBalance = currentBalance + depositAmount;
        
        localStorage.setItem("balance", newBalance.toString());

        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        const now = new Date();
        const depositTransaction = {
            type: "deposit",
            amount: depositAmount,
            date: now.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        transactions.push(depositTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
        confirmModal.hide();

        window.location.href = "../menu/menu.html";
    });
});
