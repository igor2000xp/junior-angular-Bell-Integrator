export interface IPhotos {
  photos: IPhoto[];
}
export interface IPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: Cameras;
    rover_ud: number;
    full_name: CameraFullName;
  };
  img_src: string;
  earth_date: Date;
  rover: {
    id: number;
    name: RoverName;
    landing_date: Date,
    launch_date: Date,
    status: Status,
  }
}
export enum CameraFullName {
  FHAZ = 'Front Hazard Avoidance Camera',
  RHAZ = 'Rear Hazard Avoidance Camera',
  MAST = 'Mast Camera',
  CHEMCAM = 'Chemistry and Camera Complex',
  MAHLI = 'Mars Hand Lens Imager',
  MARDI = 'Mars Descent Imager',
  NAVCAM = 'Navigation Camera',
  PANCAM = 'Panoramic Camera',
  MINITES = 'Miniature Thermal Emission Spectrometer (Mini-TES)',
}
export enum RoverName {
  Curiosity = 5,
  Opportunity,
  Spirit,
}
export enum Status {
  active,
  complete,
}
export interface IManifestPhotos {
  sol: number;
  earth_date: Date;
  total_photos: number;
  cameras?: Cameras;
}
export enum Cameras {
  FHAZ = 'FHAZ',
  RHAZ = 'RHAZ',
  MAST = 'MAST',
  CHEMCAM = 'CHEMCAM',
  MAHLI = 'MAHLI',
  MARDI = 'MARDI',
  NAVCAM = 'NAVCAM',
  PANCAM = 'PANCAM',
  MINITES= 'MINITES',
}
export interface IPhotoManifest {
  name: string;
  landing_date: Date;
  launch_date: Date;
  status: string;
  max_sol: number;
  max_date: Date;
  total_photos: number;
  photos: IPhoto[];
}
