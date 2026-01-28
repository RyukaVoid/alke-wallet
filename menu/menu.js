const displayUsername = document.getElementById("display-username");
const firstName = localStorage.getItem("firstName") || "";
const lastName = localStorage.getItem("lastName") || "";
displayUsername.textContent = `${firstName} ${lastName}`;

const displayBalance = document.getElementById("display-balance");
const balance = localStorage.getItem("balance") || "0";
displayBalance.textContent = `CLP ${balance}`;

const abonarBtn = document.getElementById("abonar-btn");
abonarBtn.addEventListener("click", () => {
  window.location.href = "../deposit/deposit.html";
});

const enviarBtn = document.getElementById("enviar-btn");
enviarBtn.addEventListener("click", () => {
  window.location.href = "../sendmoney/sendmoney.html";
});

const recentTransactionsContainer = document.getElementById(
  "recent-transactions-container",
);
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
if (transactions.length === 0) {
  recentTransactionsContainer.innerHTML = `
    <p class="text-muted">No hay transacciones recientes.</p>`;
} else {
  recentTransactionsContainer.innerHTML = "";
  transactions
    .slice(-5)
    .reverse()
    .forEach((tx) => {
      const txElement = document.createElement("div");
      txElement.classList.add("mb-2");
      txElement.innerHTML = `
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
        `;
      recentTransactionsContainer.appendChild(txElement);
    });
}
