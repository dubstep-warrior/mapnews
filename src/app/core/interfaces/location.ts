export interface ILocation {
  longitude: number;
  latitude: number;
}

export interface IMapAttributes extends Partial<ILocation> {
  zoom: number;
}
