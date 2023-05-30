import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { config } from 'src/config/config';

@Injectable()
export class authGaurd implements CanActivate {
  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {

     //get the http request in graphqlContext

     //const request: Request = context.switchToHttp().getRequest();
     const gqlCtx = GqlExecutionContext.create(context);
     const request = gqlCtx.getContext().req;

     //get token
    const token = this.extractToken(request);
    console.log(token);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: config.secret,
        });
  
        //add the payload to request
  
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }


      return true;
    }
}
