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