$(() => {
    let title = $('#inpTitle');
    let brief = $('#inpBrief');
    let content = $('#inpContent');

    let handle = (text, msgElement) => {
        if (text) {
            msgElement.html(text);
        } else {
            msgElement.html('');
        }
    };

    $('#btn-submit').on('click', () => {
        console.log('aehf');
        handle(checkTitle(title), $('.title_msg'));
        handle(checkBrief(brief), $('.brief_msg'));
        handle(checkContent(content), $('.content_msg'));
    });
});
