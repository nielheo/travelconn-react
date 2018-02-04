export type room = {
  adult: number,
  childAges?: number[],
};

export type hotel = {
  id: string,
  name: string,
  thumbnail: string,
  shortDesc: string,
};

export type hotelResult = {
  checkIn: Date,
  checkOut: Date,
  hotels: hotel[],
};