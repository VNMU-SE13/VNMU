$(() => {
    let username = $('#inpUsername');
    let email = $('#inpEmail');
    let password = $('#inpPassword');
    let rePassword = $('#inpRePassword');

    let handle = (text, msgElement) => {
        if (text) {
            msgElement.html(text);
        } else {
            msgElement.html('');
        }
    };

    $('#btn-submit').on('click', () => {
        handle(checkUsername(username), $('.username_msg'));
        handle(checkEmailRegister(email), $('.email_msg'));
        handle(checkPassword(password), $('.password_msg'));
        handle(checkMatchPassword(password, rePassword), $('.rePassword_msg'));
    });
});
