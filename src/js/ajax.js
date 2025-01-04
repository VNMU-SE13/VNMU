$(() => {
    let load = (title, url) => {
        document.title = title;
        $('.content').load('loading.html');
        setTimeout(() => {
            $('.content').load(url);
        }, 2000);
    };

    // default
    load('Edit Profile', 'bodyEditProfile.html');

    // click load view content
    $('.link_viewContent').on('click', () => load('View Content', 'bodyViewContent.html'));

    // click load form content
    $('.link_formContent').on('click', () => load('Form Content', 'bodyFormContent.html'));

    // click load edit profile
    $('.link-edit-profile').on('click', () => load('Edit Profile', 'bodyEditProfile.html'));
});
