import { SplitInterpolation } from "@angular/compiler";

export interface NewSportObjectRequest {
  name: string;
  imageName: string;
  streetName: string;
  streetNumber: string;
  localNumber: string;
  cityName: string;
  categories: Set<String>;
}
