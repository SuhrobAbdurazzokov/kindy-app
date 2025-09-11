import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { CryptoService } from 'src/common/crypt/Crypto';
import { SignInDto } from 'src/common/dto/signIn.dto';
import { TokenService } from 'src/common/token/token';
import { getSuccessRes } from 'src/common/util/response';
import { config } from 'src/config';
import { IToken } from 'src/infrastructure/interface/token.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: TokenService) {}

  async newToken(repository: Repository<any>, token: string) {
    const data: any = await this.jwt.verifyToken(
      token,
      config.TOKEN.REFRESH_TOKEN_SECRET_KEY,
    );
    if (!data) {
      throw new UnauthorizedException('Refresh token expired');
    }
    const user = await repository.findOne({ where: { id: data?.id } });
    if (!user) {
      throw new ForbiddenException('Forbidden user');
    }
    const paylod: IToken = {
      id: user.id,
      isActive: user.isActive,
      role: user.roles,
    };
    const accessToken = await this.jwt.accessToken(paylod);
    return getSuccessRes({ token: accessToken });
  }

  async signOut(
    repository: Repository<any>,
    token: string,
    res: Response,
    tokenKey: string,
  ) {
    const data: any = await this.jwt.verifyToken(
      token,
      config.TOKEN.REFRESH_TOKEN_SECRET_KEY,
    );
    if (!data) {
      throw new UnauthorizedException('Refresh token expired');
    }
    const user = await repository.findOne({ where: { id: data?.id } });
    if (!user) {
      throw new ForbiddenException('Forbidden user');
    }
    res.clearCookie(tokenKey);
    return getSuccessRes({});
  }
}
