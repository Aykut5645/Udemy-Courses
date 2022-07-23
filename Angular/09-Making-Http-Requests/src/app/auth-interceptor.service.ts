import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Auth Interceptor Body');
        const modifiedReq = req.clone({ headers: req.headers.append('auth', 'xyz') });
        return next.handle(modifiedReq).pipe(
            tap((event) => {
                if (event.type === HttpEventType.Response) {
                    console.log('Response has arrived!');
                    console.log(event.body);
                }
            })
        );
    }
}
