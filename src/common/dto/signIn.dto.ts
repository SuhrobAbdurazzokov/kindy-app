import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class SignInDto {
  @ApiProperty({
    type: 'string',
    example: 'suhrob',
    description: 'login for admin',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: 'string',
    example: 'Suhrob1222!',
    description: 'password for admin',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
