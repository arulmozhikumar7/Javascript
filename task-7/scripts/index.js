function sendMessage() {
    const input = document.getElementById("message-input");
    const messageText = input.value.trim();
    if (messageText === "") return;
    addMessage("You", messageText, "user-message");
    input.value = "";
    const typingMessage = addTypingIndicator();
    setTimeout(() => {
        typingMessage.remove();
        addMessage("Customer Care", getCustomerCareResponse(), "customer-care");
    }, 5000); 
    /*
    setInterval(() => {
        const typing = addTypingIndicator();
        setTimeout(() => {
            typing.remove();
            addMessage("Customer Care", getCustomerCareResponse(), "customer-care");
        }, 2000);
    }, 10000);
    */
}

function addMessage(sender, text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text} <span class="timestamp">${timestamp}</span>`;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
}

function addTypingIndicator() {
    const chatBox = document.getElementById("chat-box");
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "typing");
    
    typingDiv.innerHTML = `<strong>Customer Care</strong> <span class="dots"><span class="dot"></span> <span class="dot"></span> <span class="dot"></span></span>`;

    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv;
}

function getCustomerCareResponse() {
    const responses = [
        "Hello! How can I assist you today?",
        "We're here to help!",
        "Can you provide more details about your issue?",
        "Thank you for reaching out to Customer Care.",
        "Our team is looking into your request.",
        "Is there anything else I can assist you with?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
