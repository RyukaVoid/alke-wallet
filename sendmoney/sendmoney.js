$(document).ready(function() {
    let allContacts = [];
    let selectedContact = null;

    const balance = localStorage.getItem("balance") || "0";
    $("#display-balance").text(`CLP ${balance}`);

    loadContacts();

    function loadContacts() {
        allContacts = JSON.parse(localStorage.getItem("contacts")) || [];
        renderContacts(allContacts);
    }

    function renderContacts(contacts) {
        const $container = $("#contacts-container");
        
        if (contacts.length === 0) {
            $container.html('<p class="text-muted">No tienes contactos agregados.</p>');
            return;
        }

        $container.empty();
        contacts.forEach((contact, index) => {
            const $contactElement = $("<div>").addClass("contact-item mb-2 p-3 border rounded cursor-pointer");
            $contactElement.html(`
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${contact.nombre} ${contact.apellido}</h6>
                        <small class="text-muted">${contact.correo}</small><br/>
                        <small class="text-muted">RUT: ${contact.rut}</small>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm send-money-btn" data-index="${index}">
                        <i data-lucide="send"></i> Enviar
                    </button>
                </div>
            `);
            $container.append($contactElement);
        });

        lucide.createIcons();
    }

    function filterContacts(searchTerm) {
        if (!searchTerm) {
            renderContacts(allContacts);
            return;
        }

        const filtered = allContacts.filter(contact => {
            return contact.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   contact.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   contact.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   contact.rut.toLowerCase().includes(searchTerm.toLowerCase());
        });

        renderContacts(filtered);
    }

    $("#contact-filter").on("input", function() {
        filterContacts($(this).val());
    });

    $("#save-contact").on("click", function() {
        const nombre = $("#contact-name").val().trim();
        const apellido = $("#contact-lastname").val().trim();
        const correo = $("#contact-email").val().trim();
        const rut = $("#contact-rut").val().trim();

        if (nombre && apellido && correo && rut) {
            const newContact = { nombre, apellido, correo, rut };
            allContacts.push(newContact);
            localStorage.setItem("contacts", JSON.stringify(allContacts));
            
            loadContacts();
            
            $("#add-contact-form")[0].reset();
            const addContactModal = bootstrap.Modal.getInstance(document.getElementById('addContactModal'));
            addContactModal.hide();
        }
    });

    $(document).on("click", ".send-money-btn", function() {
        const contactIndex = $(this).data("index");
        selectedContact = allContacts[contactIndex];
        
        $("#recipient-name").text(`${selectedContact.nombre} ${selectedContact.apellido}`);
        $("#recipient-email").text(selectedContact.correo);
        
        const sendMoneyModal = new bootstrap.Modal(document.getElementById('sendMoneyModal'));
        sendMoneyModal.show();
    });

    $("#confirm-send").on("click", function() {
        const sendAmount = parseFloat($("#send-amount").val());
        const currentBalance = parseFloat(localStorage.getItem("balance")) || 0;

        if (!sendAmount || sendAmount <= 0) {
            alert("Ingresa un monto válido mayor a 0");
            return;
        }

        if (sendAmount > currentBalance) {
            alert("No tienes suficiente saldo para realizar esta transferencia");
            return;
        }

        const newBalance = currentBalance - sendAmount;
        localStorage.setItem("balance", newBalance.toString());

        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        const now = new Date();
        const sendTransaction = {
            type: "send",
            amount: sendAmount,
            recipient: `${selectedContact.nombre} ${selectedContact.apellido}`,
            date: now.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        transactions.push(sendTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        const sendMoneyModal = bootstrap.Modal.getInstance(document.getElementById('sendMoneyModal'));
        sendMoneyModal.hide();

        $("#send-money-form")[0].reset();

        window.location.href = "../menu/menu.html";
    });
});
