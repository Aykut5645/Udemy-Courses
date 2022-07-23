import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Logging Interceptor Body');
        return next.handle(req);
    }
}
