export const phoneNumberValidation = phoneNumber => {
    const pattern = new RegExp('^09\\d{9}$');
    return pattern.test(phoneNumber);
}



export const phoneNumberValidationUser = phoneNumber => {
    const pattern = new RegExp('^09\\d{9}$');
    const pattern2 = new RegExp('^09\\d{9}-09\\d{9}$');
    const pattern3 = new RegExp('^09\\d{9}-09\\d{9}-09\\d{9}$');
    console.log("pattern");
    console.log(pattern);
    if (pattern.test(phoneNumber))
        return true;
    else if (pattern2.test(phoneNumber))
        return true;
    else if (pattern3.test(phoneNumber))
        return true
    else
    return false
}