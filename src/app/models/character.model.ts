export class Character {
  public id: number;
  public name: string;
  public description: string;
  public comics: Comics;
  public thumbnail: Thumbnail;
}

export class Thumbnail {
  public path: string;
  public extension: string;
}

export class Comics {
  public available: number;
}
