import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'auhrob',
    description: 'users login',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'Suhrob1222!',
    description: 'users password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
