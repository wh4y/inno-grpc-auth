import { Injectable } from '@nestjs/common';

import { UserService } from './user/user.service';

interface SignInOptions {
  email?: string;
  logins?: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signIn(options: SignInOptions): Promise<boolean> {
    const { result } = await this.userService.isUserExistByLoginOrEmail(options);

    return result;
  }
}
