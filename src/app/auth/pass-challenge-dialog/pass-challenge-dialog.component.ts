import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IAuthUser} from '../../shared/models/interfaces/i-auth-user';
import {IApiError} from '../../shared/models/interfaces/i-api-error';
import {EApiErrorTypes} from '../../shared/models/eapi-error-types.enum';
import {UserService} from '../../shared/http/user.service';

@Component({
  selector: 'app-pass-challenge-dialog',
  templateUrl: './pass-challenge-dialog.component.html',
  styleUrls: ['./pass-challenge-dialog.component.scss']
})
export class PassChallengeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PassChallengeDialogComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: IAuthUser
  ) {
  }

  ngOnInit(): void {
  }

  passChallenge(phrase: string): void {
    console.log(phrase);
    this.userService.passChallenge(this.user, phrase).subscribe(value => {
      this.snackBar.open('Success!', null, {
        duration: 2000
      });
      this.dialogRef.close();
    }, (err: IApiError<any>) => {
      if (err.errorType === EApiErrorTypes.InvalidData) {
        this.snackBar.open((err.error as string[]).join('\n'), null, {
          duration: 2000
        });
      }
    });
  }
}
