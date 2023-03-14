import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcToHttpInterceptor } from '@libs/grpc';

class SignInDto {
  email?: string;
  login?: string;
}

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(GrpcToHttpInterceptor)
  @Post('/sign-in')
  public async signIn(@Body() dto: SignInDto): Promise<{ loggedIn: boolean }> {
    const result = await this.authService.signIn(dto);

    return { loggedIn: result };
  }
}
