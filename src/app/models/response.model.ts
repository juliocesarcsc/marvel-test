export abstract class CustomResponse<T> {
  public data: ResponseList<T>;
}

export class ResponseList<T> {
  public results: T[];
}
