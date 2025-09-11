import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsPhoneNumber,
  Length,
  Matches,
} from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 32, { message: 'Password must be between 6 and 32 characters' })
  password: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]{7,9}$/, { message: 'Passport ID must be valid format' })
  passportId: string;

  @IsPhoneNumber('UZ', {
    message: 'Phone number must be valid Uzbekistan format',
  })
  phoneNumber: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
