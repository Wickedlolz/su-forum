import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageBusService } from './services/message-bus.service';
import { MessageType } from './interfaces/message';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private messageBus: MessageBusService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.messageBus.notifyForMessage({
          text: err.error.error.message || 'Something went wrong!',
          type: MessageType.Error,
        });
        return throwError(() => err.error.error);
      })
    );
  }
}
