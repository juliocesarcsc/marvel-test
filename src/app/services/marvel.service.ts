import {Md5} from 'ts-md5/dist/md5';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class MarvelService {
  private _apiHostUrl;
  private _publicKey;
  private _privateKey;

  constructor(private _httpClient: HttpClient) {
    this._privateKey = 'ce2dbaaa1cf946d6959dfc1f139306c8960fc880';
    this._publicKey = '57c9261ef744947bb61e05a4956d5e2e';
    this._apiHostUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  }

  private getHash(timeStamp: string): string {
    const hashGenerator: Md5 = new Md5();
    hashGenerator.appendStr(timeStamp);
    hashGenerator.appendStr(this._privateKey);
    hashGenerator.appendStr(this._publicKey);
    const hash: string = hashGenerator.end().toString();
    return hash;
  }

  private getTimeStamp(): string {
    return new Date().valueOf().toString();
  }

  public getCharacter(characterId): Observable<any> {
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const requestUrl = this._apiHostUrl + '/' + characterId + '?ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;
    const response = this._httpClient.get(requestUrl);
    return response;
  }
}
