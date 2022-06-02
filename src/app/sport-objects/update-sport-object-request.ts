export interface UpdateSportObjectRequest {
  name: string;
  imageName: string;
  streetName: string;
  streetNumber: string;
  localNumber: string;
  cityName: string;
  categories: Set<String>;
}
