import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { IsUserExistByLoginOrEmailRequest, IsUserExistByLoginOrEmailResponse, UserService as UserExternalService } from '@libs/grpc';

@Injectable()
export class UserService implements OnModuleInit {
  private userExternalService: UserExternalService;

  constructor(@Inject('USER_PACKAGE') private grpcClient: ClientGrpc) {}

  onModuleInit() {
    this.userExternalService = this.grpcClient.getService<UserExternalService>('UserService');
  }

  public async isUserExistByLoginOrEmail(options: IsUserExistByLoginOrEmailRequest): Promise<IsUserExistByLoginOrEmailResponse> {
    const observableResponse = await this.userExternalService.isUserExistByLoginOrEmail(options);

    return observableResponse.toPromise();
  }
}
