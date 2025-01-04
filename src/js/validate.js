const ERR_EMPTY = 'This field can not empty!!!';
const ERR_EMAIL_LENGTH = 'Email must be 5-50 characters!!!';
const ERR_EMAIL_FORM = 'Incorrect email format!!!';
const ERR_PASSWORD_LENGTH = 'Password must be 8-30 characters!!!';
const ERR_USERNAME_LENGTH = 'Username must be 3-30 characters!!!';

const checkEmailLogin = (email) => {
    let value = email.val();
    if (!value) return ERR_EMPTY;
    if (value.length < 5 || value.length > 50) return ERR_EMAIL_LENGTH;
    if (
        !String(value).match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    )
        return ERR_EMAIL_FORM;
    return null;
};

const checkPassword = (password) => {
    let value = password.val();
    if (!value) return ERR_EMPTY;
    if (value.length < 8 || value.length > 30) return ERR_PASSWORD_LENGTH;
    return null;
};

const checkUsername = (username) => {
    let value = username.val();
    if (!value) return ERR_EMPTY;
    if (value.length < 3 || value.length > 30) return ERR_USERNAME_LENGTH;
    return null;
};

const checkEmailRegister = (email) => {
    let value = email.val();
    if (!value) return ERR_EMPTY;
    if (value.length < 5) return 'Email must be least 5 characters!!!';
    if (
        !String(value).match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    )
        return ERR_EMAIL_FORM;
    return null;
};

const checkMatchPassword = (password, rePassword) => {
    let pass = password.val();
    let repass = rePassword.val();
    if (!(pass === repass)) return 'Password do not match!!!';
};

const checkName = (name) => {
    let value = name.val();
    if (!value) return ERR_EMPTY;
    if (value.length < 3 || value.length > 30) return 'This field must be 3-30 characters!!!';
    return null;
};

const checkPhone = (phone) => {
    let value = phone.val();
    if (!value) return ERR_EMPTY;
    if (!String(value).match(/^\d{9,13}$/)) return 'Phone must be 9-13 numbers!!!';
    return null;
};

const checkDescription = (description) => {
    let value = description.val();
    if (value.length > 200) return 'Text do not over 200 characters!!!';
    return null;
};

const checkTitle = (title) => {
    let value = title.val();
    if (!value) return ERR_EMPTY;
    if (value.length < 10 || value.length > 200) return 'This field must be 10-200 characters!!!';
    return null;
};

const checkBrief = (brief) => {
    let value = brief.val();
    if (!value) return ERR_EMPTY;
    if (value.length < 30 || value.length > 150) return 'This field must be 30-150 characters!!!';
    return null;
};

const checkContent = (content) => {
    let value = content.val();
    if (!value) return ERR_EMPTY;
    if (value.length < 50 || value.length > 1000) return 'This field must be 50-1000 characters!!!';
    return null;
};
