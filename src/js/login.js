$(() => {
    let email = $('#inpEmail');
    let emailMsg = $('.email_msg');
    let password = $('#inpPassword');
    let passwordMsg = $('.password_msg');

    let handle = (text, msgElement) => {
        if (text) {
            msgElement.html(text);
        } else {
            msgElement.html('');
        }
    };

    $('#btn-submit').on('click', () => {
        handle(checkEmailLogin(email), emailMsg);
        handle(checkPassword(password), passwordMsg);
    });
});
