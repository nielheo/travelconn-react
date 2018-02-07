import { currencies, currency } from './types';

export function isHideMenu (url: string) {
    let patt = new RegExp(`/hotels\/(.*?)\/(.*?)\/(.*?)\/rooms`);
    var res = patt.test(url);

    return res;
}

export function ToFinance(curr: string, value: number, locale: string) {
    var curr1: string = curr.toLowerCase();
    let selectedCurr = currencies.find((cr: currency) => cr.code === curr1);
    let currSymbol = selectedCurr && selectedCurr.symbol || '';
    return currSymbol + ' ' + value.toLocaleString(locale);
}