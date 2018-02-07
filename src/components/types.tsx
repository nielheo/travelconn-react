export type currency = {
  code: string,
  symbol: string,
  text: string,
};

export var currencies: currency[] = [
  { code: 'usd', symbol: '$', text: 'US Dollar' },
  { code: 'eur', symbol: '€', text: 'Euro' },
  { code: 'gbp', symbol: '£', text: 'British Pound Sterling' },
  { code: 'idr', symbol: 'Rp', text: 'Indonesian Rupiah' },
  { code: 'jpy', symbol: '¥', text: 'Japanese Yen' },
  { code: 'krw', symbol: '₩', text: 'South Korean Won' },
  { code: 'thb', symbol: '฿', text: 'Thai Baht' },
  { code: 'cny', symbol: '¥', text: 'China Yuan Renminbi' },
  { code: 'twd', symbol: 'NT$', text: 'Taiwan New Dollar' },
];  

export type language = {
  code: string,
  locale: string,
  text: string,
};

export var languages: language[] = [
  { code: 'US', locale: 'en-US', text: 'English' },
  { code: 'CN', locale: 'zh-CN', text: '简体中文' },
  { code: 'DE', locale: 'de-DE', text: 'Deutsch' },
  { code: 'ES', locale: 'es-ES', text: 'Español' },
  { code: 'FR', locale: 'fr-FR', text: 'Français' },
  { code: 'ID', locale: 'id-ID', text: 'Bahasa Indonesia' },
  { code: 'IT', locale: 'it-IT', text: 'Italiano' },
  { code: 'JP', locale: 'ja-JP', text: '日本語' },
  { code: 'KR', locale: 'ko-KR', text: '한국어' },
  { code: 'TH', locale: 'th-TH', text: 'ภาษาไทย' },
  { code: 'TW', locale: 'zh-TW', text: '繁體中文 (台灣)' },
  { code: 'PT', locale: 'pt-PT', text: 'Português' },
];

export type room = {
  adult: number,
  childAges?: number[],
};

export type hotelRoom = {
  chargeableRate: chargeableRate
};

export type chargeableRate = {
  currency: string,
  totalCommissionable: number, 
  totalSurcharge: number,
  total: number,
  maxNightlyRate: number,
};

export type hotel = {
  id: string,
  name: string,
  thumbnail: string,
  shortDesc: string,
  location: string,
  hotelRooms: hotelRoom[],
};

export type hotelResult = {
  checkIn: Date,
  checkOut: Date,
  hotels: hotel[],
  cacheKey: string,
  cacheLocation: string,
  requestKey: string,
};

export type propertyAmenity = {
  id: string,
  name: string,
};

export type hotelImage = {
  url: string,
  highResUrl: string,
  isHeroImage: boolean,
  caption: string,
};

export type valueAdd = {
  id: string,
  description: string,
};

export type roomDetail = {
  rateDesc: string,
  roomTypeDesc: string,
  roomTypeDescLong: string,
  isNonRefundable: boolean,
  isPromo: boolean,
  allotmnet: number,
  chargeableRate: chargeableRate,
  valueAdds: valueAdd[],
};

export type hotelDetail = {
  id: string,
  name: string,
  address: string,
  starRating: number,
  city: string,
  country: string,
  checkInInstruction: string,
  propertyDescription: string,
  areaInformation: string,
  roomInformation: string,
  propertyAmenities: propertyAmenity[],
  hotelImages: hotelImage[],
};

export type hotelRoomResult = {
  hotelId: string,
  checkIn: Date,
  checkOut: Date,
  locale: string,
  currency: string,
  hotelDetail: hotelDetail,
};