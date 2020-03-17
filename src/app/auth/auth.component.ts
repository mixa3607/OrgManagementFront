import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {MustMatch} from '../shared/validators/must-match.validator';
import {EUserSessionState} from '../shared/models/euser-session-state.enum';
import {IUser} from '../shared/models/interfaces/i-user';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {PassChallengeDialogComponent} from './pass-challenge-dialog/pass-challenge-dialog.component';
import {IApiError} from '../shared/models/interfaces/i-api-error';
import {EApiErrorTypes} from '../shared/models/eapi-error-types.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registryForm: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registryForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRetry: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validator: MustMatch('password', 'passwordRetry')
    });
    this.loginForm.get('userName').setValue(this.userService.userName);
    // this.userService.sessionBehavior.subscribe(state => {
    //  if (state === EUserSessionState.Ok) this.redirectToHome();
    // });
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  openPassChallengeDialog(user: IUser): Observable<string> {
    const dialogRef = this.dialog.open(PassChallengeDialogComponent, {
      data: user, disableClose: true
    });
    return dialogRef.afterClosed() as Observable<string>;
  }

  openSnackbar(text: string, duration: number = 3000) {
    this.snackBar.open(text, null, {
      duration
    });
  }

  login(user: IUser): void {
    this.userService.login(user)
      .subscribe(retUser => {
        this.openSnackbar('Successful');
        this.redirectToHome();
      }, (error: IApiError<any>) => {
        switch (error.errorType) {
          case EApiErrorTypes.NeedPassChallenge:
            this.openPassChallengeDialog(user).subscribe(result => {
              this.userService.setUser(user);
              this.login(user);
              this.redirectToHome();
            });
            break;
          case EApiErrorTypes.InvalidData:
            this.openSnackbar((error.error as string[]).join('\n'));
            break;
          default:
            this.openSnackbar('Unknown error!');
        }
      });
  }

  registry(user: IUser): void {
    this.userService.registry(user)
      .subscribe((result: any) => {
        this.openPassChallengeDialog(user).subscribe(value => {
          this.userService.setUser(user);
          this.redirectToHome();
        });
      }, (err: IApiError<any>) => {
        if (err.errorType === EApiErrorTypes.InvalidData) {
          this.openSnackbar((err.error as string[]).join('\t'));
        } else {
          this.openSnackbar('Unknown error!');
        }
      });
  }
}
