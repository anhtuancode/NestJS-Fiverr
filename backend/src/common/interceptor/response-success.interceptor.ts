
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();   
    const statusCode = res.statusCode


    //http://localhost:3069/swagger#/Auth/AuthController_signin
    
    const baseUrl = 'http://localhost:3069/swagger'
    const methodName = context.getHandler().name;
    const controllerName = context.getClass().name;
    const tag = controllerName.replace('Controller', '');

    const docUrl = `${baseUrl}#/${tag}/${controllerName}_${methodName}`

    return next
      .handle()
      .pipe(
        map((data) => {
            return {
                status: "success",
                statusCode: statusCode,
                data,
                doc: docUrl
            }
        })
      );
  }
}
