export interface CreateSportObjectRequest {
    name: string;
    imageName: string;
    cityName: string;
    streetName: string;
    streetNumber: string;
    localNumber: string;
    categoriesIds: number[];
}
