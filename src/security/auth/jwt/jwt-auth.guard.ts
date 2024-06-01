import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    Logger,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { AuthGuard } from '@nestjs/passport';
  import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);
  
    constructor(private reflector: Reflector) {
      super();
    }
  
    canActivate(context: ExecutionContext) {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        this.logger.debug('Public route accessed');
        return true;
      }
      this.logger.debug('Protected route accessed');
      return super.canActivate(context);
    }
  
    handleRequest(err, user, info) {
      if (err || !user) {
        this.logger.error(`Unauthorized access: ${info?.message}`);
        throw err || new UnauthorizedException();
      }
      this.logger.debug(`User authenticated: ${JSON.stringify(user)}`);
      return user;
    }
  }
  