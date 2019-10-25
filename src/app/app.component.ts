import {Component} from '@angular/core';
import {Character} from './models/character.model';
import {MarvelService} from './services/marvel.service';
import {CustomResponse} from './models/response.model';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/app.component.css'],
  providers: [
    MarvelService
  ]
})

export class AppComponent {
  title: string;
  character: Character;
  characterId: number;

  constructor(private _marvelService: MarvelService) {
    this.title = 'Find Hero by ID';
    this.characterId = null;
    this.character = null;
  }

  handleError(response: HttpErrorResponse) {
    if (response.status === 0) {
      console.log('Service offline');
    } else if (response.error && response.status && [401, 404, 402, 403, 405, 409].indexOf(response.status) !== -1) {
      const errMsg = response.error.status ? response.error.status : response.error.message;
      console.log(errMsg);
    } else {
      console.log('An unexpected error occurred.');
    }
  }

  private findHero(characterId) {
    if (!characterId) {
      console.log('ID can\'t be null.');
      return;
    }
    this._marvelService.getCharacter(characterId)
      .pipe(finalize(() => console.log('finalize')))
      .subscribe((response: CustomResponse<Character>) => {
        console.log(response);
        if (response.data && response.data.results && response.data.results.length) {
          this.character = response.data.results[0];
        }
      }, error => this.handleError(error));
  }
}
