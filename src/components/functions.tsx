import { currencySymbols } from './types';

export function isHideMenu (url: string) {
    let patt = new RegExp(`/hotels\/(.*?)\/(.*?)\/(.*?)\/rooms`);
    var res = patt.test(url);

    return res;
}

export function ToFinance(curr: string, value: number, locale: string) {
    var curr1: string = curr.toUpperCase();
    let currSymbol = currencySymbols[curr1] || curr1;
    return currSymbol + ' ' + value.toLocaleString(locale);
}