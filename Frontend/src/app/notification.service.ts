import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { onMessage } from 'firebase/messaging';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from './shared/layout-components/header/header.component';
import { User } from './user-auth/user';
// import { HeaderComponent } from './shared/components/header/header.component';

@Injectable({
  providedIn: 'root',
})
export class FirebaseNotificationService {
  private apiServerUrl = environment.apiBaseUrl;
  currentMessage = new BehaviorSubject(null);
  constructor(
    private afMessaging: AngularFireMessaging,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.afMessaging.onMessage((payload: NotificationData) => {
      console.log('Foreground message received:', payload);
      // this.currentMessage.next(payload);
      this.showNotification(
        payload.notification.title,
        payload.notification.body
      );
    });
  }
  showNotification(title: string, body: string) {
    var content = `${title}: ${body}`;
    console.log(content);
    HeaderComponent.showPulse.push(body);
    this.snackBar.open(content, 'Dismiss', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['notification-snackbar'],
      announcementMessage: title,
    });
  }

  requestPermission(userData) {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        if (token) {
          const user = {
            token: token,
            user: {id:userData.user_id},
          };
          this.sendTokenToServer(user).subscribe(
            (response) => {},
            (err) => {}
          );
        }
        console.log('Token: ', token);
      },
      (err) => {
        console.log('Error: ', err);
      }
    );
  }

  private sendTokenToServer(user): Observable<any> {
    const url = `${this.apiServerUrl}/fcm/token`;
    return this.http.post<any>(url, user);
  }

  receiveMessages(): void {
    this.afMessaging.messages.subscribe((message: any) => {
      console.log('Received message:', message);
      // Handle the received notification message
      this.showNotification(
        message.notification.title,
        message.notification.body
      );
    });
  }

  sendNotification(to): Observable<any> {
    const url = `${this.apiServerUrl}/fcm/send-notification`;
    return this.http.post<any>(url, to);
  }

  deleteUserFcm(user: User): Observable<any> {
    const url = `${this.apiServerUrl}/fcm/delete`;
    return this.http.post<any>(url, user);
  }
}

interface NotificationData {
  notification: {
    title: string;
    body: string;
  };
  // Add any other properties you expect to receive in the notification payload
}
