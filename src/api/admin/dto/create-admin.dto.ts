import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Roles } from 'src/common/enum/roles.enum';

export class CreateAdminDto {
  @ApiProperty({
    type: 'string',
    example: 'Suhrob Abdurazzoqov',
    description: 'full name for admin',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

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
    description: 'strong password for admin',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: 'string',
    example: 'ADMIN',
    default: Roles.ADMIN,
    description: 'role from ADMIN',
  })
  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;

  @ApiProperty({
    type: 'string',
    example: '+998991234567',
    description: 'phone number for admin',
  })
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: 'boolean',
    example: true,
    description: 'activity for admin',
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;
}
