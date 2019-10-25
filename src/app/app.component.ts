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
  showAlert: boolean;
  alertText: string;
  alertClass: string;
  loading: boolean;

  constructor(private _marvelService: MarvelService) {
    this.title = 'Find Hero by ID';
    this.characterId = null;
    this.character = null;
    this.showAlert = false;
    this.alertText = null;
    this.loading = false;
  }

  showMsg(msg: string, error: boolean = true) {
    this.alertText = msg;
    this.showAlert = true;
    this.alertClass = error ? 'danger' : 'info';
  }

  handleError(response: HttpErrorResponse) {
    if (response.status === 0) {
      this.showMsg('Service offline');
    } else if (response.error && response.status && [401, 404, 402, 403, 405, 409].indexOf(response.status) !== -1) {
      const errMsg = response.error.status ? response.error.status : response.error.message;
      this.showMsg(errMsg);
    } else {
      this.showMsg('An unexpected error occurred.');
    }
  }

  private findHero(characterId) {
    if (!characterId) {
      this.showMsg('ID can\'t be null.');
      return;
    }
    this.loading = true;
    this._marvelService.getCharacter(characterId)
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: CustomResponse<Character>) => {
        console.log(response);
        if (response.data && response.data.results && response.data.results.length) {
          this.character = response.data.results[0];
        }
      }, error => this.handleError(error));
  }
}
