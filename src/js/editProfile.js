$(() => {
    let firstname = $('#inpFirstname');
    let lastname = $('#inpLastname');
    let phone = $('#inpPhone');
    let description = $('#exampleFormControlTextarea1');

    let handle = (text, msgElement) => {
        if (text) {
            msgElement.html(text);
        } else {
            msgElement.html('');
        }
    };

    $('#btn-submit').on('click', () => {
        handle(checkName(firstname), $('.firstName_msg'));
        handle(checkName(lastname), $('.lastName_msg'));
        handle(checkPhone(phone), $('.phone_msg'));
        handle(checkDescription(description), $('.description_msg'));
    });
});
