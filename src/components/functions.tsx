export function isHideMenu (url: string) {
    let patt = new RegExp(`/hotels\/(.*?)\/(.*?)\/(.*?)\/rooms`);
    var res = patt.test(url);

    return res;
}