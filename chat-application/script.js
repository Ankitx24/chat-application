const sendButton = document.querySelector('.send');
const inputField = document.querySelector('.input-msg');
const conversationContainer = document.querySelector('.conversation-container');

// Predefined auto-reply messages
const autoReplies = [
    "I'm just a bot, but I'm here to help!",
    "That's interesting!",
    "Could you tell me more?",
    "Sounds good to me!",
    "I'm not sure, but I'll try to find out!",
    "Let's chat more about that!"
];

// Simulate existing messages
const messages = [
{ type: 'received', text: 'Hello! How are you?', time: '10:00 AM' },
{ type: 'sent', text: 'I am good, thank you! How about you?', time: '10:01 AM' },
{ type: 'received', text: 'I am doing great, thanks for asking!', time: '10:02 AM' },
{ type: 'sent', text: 'What are you up to today?', time: '10:03 AM' },
{ type: 'received', text: 'I am planning to go hiking.', time: '10:05 AM' },
{ type: 'sent', text: 'That sounds fun! Where are you going?', time: '10:06 AM' },
{ type: 'received', text: 'We’re heading to the Blue Ridge Mountains.', time: '10:07 AM' },
{ type: 'sent', text: 'I love that place! The views are amazing.', time: '10:08 AM' },
{ type: 'received', text: 'Absolutely! We’ll take lots of photos.', time: '10:09 AM' },
{ type: 'sent', text: 'Please do! I’d love to see them.', time: '10:10 AM' },
{ type: 'received', text: 'Sure thing! Do you want to join us?', time: '10:12 AM' },
{ type: 'sent', text: 'I wish I could, but I have to work.', time: '10:13 AM' },
{ type: 'received', text: 'No worries. Maybe next time!', time: '10:14 AM' },
{ type: 'sent', text: 'Definitely! Have a great hike.', time: '10:15 AM' },
{ type: 'received', text: 'Thanks! Enjoy your day too.', time: '10:16 AM' }
];


// Function to display messages
function displayMessages() {
    conversationContainer.innerHTML = ""; // Clear previous messages
    messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.type);
        messageElement.innerHTML = `
            ${message.text}
            <span class="metadata">
                <span class="time">${message.time}</span>
                ${message.type === 'sent' ? '<span class="tick">&#10004;</span>' : ''}
            </span>
        `;
        conversationContainer.appendChild(messageElement);
    });
}

// Function to generate a random auto-reply
function generateAutoReply() {
    const randomIndex = Math.floor(Math.random() * autoReplies.length);
    return autoReplies[randomIndex];
}

// Function to send a message
function sendMessage() {
    const messageText = inputField.value.trim();
    if (messageText !== '') {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMessage = {
            type: 'sent',
            text: messageText,
            time: currentTime
        };

        // Add the sent message to the messages array
        messages.push(newMessage);
        displayMessages(); // Refresh messages display

        // Simulate a delay for the bot reply
        setTimeout(() => {
            const botReply = {
                type: 'received',
                text: generateAutoReply(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            // Add the bot's reply to the messages array
            messages.push(botReply);
            displayMessages(); // Refresh messages display

            // Scroll to the bottom of the chat
            conversationContainer.scrollTop = conversationContainer.scrollHeight;
        }, 1000);

        // Clear the input field
        inputField.value = '';

        // Scroll to the bottom of the chat
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for pressing 'Enter' key
inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Display initial messages
displayMessages();