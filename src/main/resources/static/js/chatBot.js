$(document.ready).ready(function() {
    const $chatToggleBtn = $('#chatToggleBtn');
    const $chatWindow = $('#chatWindow');
    const $chatCloseBtn = $('#chatCloseBtn');
    const $chatMessages = $('#chatMessages');
    const $chatInput = $('#chatInput');
    const $chatSendBtn = $('#chatSendBtn');

    // Toggle Chat Visibility
    $chatToggleBtn.on('click', function() {
        $chatToggleBtn.toggleClass('open');
        $chatWindow.toggleClass('open');
    });

    $chatCloseBtn.on('click', function() {
        $chatToggleBtn.removeClass('open');
        $chatWindow.removeClass('open');
    });

    // Send Message Handlers
    $chatSendBtn.on('click', sendMessage);
    $chatInput.on('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const text = $chatInput.val().trim();
        if (!text) return;

        // 1. Render User Message
        appendMessage(text, 'user');
        $chatInput.val('');
        $chatInput.prop('disabled', true);
        $chatSendBtn.prop('disabled', true);

        // 2. Create placeholder bubble for incoming Bot response
        const $botBubble = appendMessage('', 'bot');
        const $botParagraph = $botBubble.find('p');

        try {
            // 3. Make Streaming Request to Spring Boot
            const response = await fetch('http://localhost:8080/v1/bakeryChat/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });

            if (response.status !== 200) {
                throw new Error(`HTTP Error: ${response.message}`);
            }

            // 4. Read the stream chunk-by-chunk
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                // Append streamed token text
                $botParagraph.text($botParagraph.text() + chunk);

                // Auto-scroll to bottom as text stream arrives
                scrollToBottom();
            }

        } catch (error) {
            console.error('Chat error:', error);
            $botParagraph.text('Sorry, something went wrong. Please try again.');
        } finally {
            $chatInput.prop('disabled', false);
            $chatSendBtn.prop('disabled', false);
            $chatInput.focus();
        }
    }

    function appendMessage(text, sender) {
        const $bubble = $('<div></div>')
            .addClass('chat-bubble')
            .addClass(sender)
            .append($('<p></p>').text(text));

        $chatMessages.append($bubble);
        scrollToBottom();
        return $bubble;
    }

    function scrollToBottom() {
        $chatMessages.scrollTop($chatMessages[0].scrollHeight);
    }
});
