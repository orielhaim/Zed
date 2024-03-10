function createMessage(text, from = "bot") {
    const message = `<div class="message">
        <div class="title">
            <img src="./imgs/${from}.png">
            <span>Zed</span>
        </div>
        <div class="text">${text}</div>
    </div>`
    $("#chat").append(message)
}

jQuery(document).ready(function($) {
    $("#enter").click(async function() {
        const text = $("#prompt").val();
        if (!text) return;
        createMessage(text, "user");
        const response = await window.model.generete(text);
        console.log(response);
        createMessage(response.message.content, "bot");
    });
});