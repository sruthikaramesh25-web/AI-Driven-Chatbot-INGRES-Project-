// =======================
// SIGN UP
// =======================
function signup() {
    let fullname = document.getElementById("fullname").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (fullname === "" || username === "" || password === "") {
        alert("Please fill all fields!");
        return;
    }

    localStorage.setItem("fullname", fullname);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Account Created Successfully!");
    window.location.href = "index.html";
}

// =======================
// LOGIN
// =======================
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let savedUsername = localStorage.getItem("username");
    let savedPassword = localStorage.getItem("password");

    if (username === savedUsername && password === savedPassword) {
        alert("Login Successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid Username or Password!");
    }
}

// =======================
// LOGOUT
// =======================
function logout() {
    window.location.href = "index.html";
}

// =======================
// AI CHATBOT
// =======================
async function sendMsg() {

    const input = document.getElementById("msg");
    const chatbox = document.getElementById("chatbox");

    const message = input.value.trim();

    if (message === "") return;

    chatbox.innerHTML += `<div class="user-message">${message}</div>`;

    input.value = "";

    try {

        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        chatbox.innerHTML += `<div class="bot-message">${data.reply}</div>`;

        chatbox.scrollTop = chatbox.scrollHeight;

    } catch (error) {

        chatbox.innerHTML += `<div class="bot-message">❌ Unable to connect to AI server.</div>`;

    }
}