export function isHideMenu (url: string) {
    let patt = new RegExp(`/hotels\/(.*?)\/(.*?)\/(.*?)\/rooms`);
    var res = patt.test(url);

    return res;
}

var currencySymbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'IDR': 'Rp', // Indonesian Rupiah
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'SAR': '﷼', // SAudi Arabia Real
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};

export function ToFinance(curr: string, value: number, locale: string) {
    var curr1: string = curr.toUpperCase();
    let currSymbol = currencySymbols[curr1] || curr1;
    return currSymbol + ' ' + value.toLocaleString(locale);
}