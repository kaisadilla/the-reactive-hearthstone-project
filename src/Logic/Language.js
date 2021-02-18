let language;

/**
 * Sets the cookie for the language to the given value.
 * @param {*} lang The language symbol (e.g. "enUS" or "deDE");
 */
function setLanguage (lang) {
    /* Firefox does not like "unsafe" cookies (they need to have SameSite=None and Secure attributes), b
     * but Chromium browsers won't set the cookie if those parameters are given.
     * Life is too short to test Safari, Opera and all other browsers.
     */
    if (navigator.userAgent.indexOf("Firefox") !== -1) {
        document.cookie = `lang=${lang}; max-age=31536000; SameSite=None; Secure`;
        console.log("cookie set for firefox");
    }
    else {
        document.cookie = `lang=${lang}; max-age=31536000`;
        console.log("cookie set for generic browser");
    }
    language = lang;
}

/**
 * Returns the variable "language". If the variable "language" is not defined,
 * reads the language cookie and assigns its value to "language" before returning it.
 */
function getLanguage () {
    if (!language) {
        if (document.cookie == "") {
            language = "enUS";
        }
        else {
            const cookies = document.cookie.split("; ");
            const langCookie = cookies.filter(v => v.startsWith("lang="))[0];
            language = langCookie.split("=")[1];
        }
    }
    return language;
}

export { setLanguage }
export default getLanguage;