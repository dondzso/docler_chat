window.onload = () => {
    let chat = new Chat();
    chat.init();
};

class Chat {
    constructor() {
        this.name = '';
        this.io = io;
        this.socket = this.io.connect('http://185.13.90.140:8081/');

        this.createMessage = this.createMessage.bind(this);
    }

    init() {
        this.socket.on('message', socket => {
            this.createMessage(socket.user, socket.message);
        });

        document.getElementById('guest-button').addEventListener('click', () => this.setName());
        document.getElementById('send-button').addEventListener('click', () => this.sendMessage());
    }

    setName() {
        this.nickName = document.getElementById('message').value;
        document.getElementById('message').value = "";
    }

    sendMessage() {
        let message = document.getElementById('message').value;

        this.socket.emit('message', {message: message, user: this.nickName});
        this.createMessage(this.nickName, message);
        document.getElementById('message').value = "";
    }

    createMessage(user, message) {
        let messageContainer = document.createElement("div");

        if(user === this.nickName) {
            messageContainer.className = "message right";
        } else {
            messageContainer.className = "message left";
        }

        let messageLabel = document.createElement("label");
        let value;
        if(user === this.nickName) {
            value = document.createTextNode(message);
        } else {
            value = document.createTextNode(user + ": " + message);
        }

        messageLabel.appendChild(value);

        messageContainer.appendChild(messageLabel);
        document.getElementById('chat-window').appendChild(messageContainer);
    }
}