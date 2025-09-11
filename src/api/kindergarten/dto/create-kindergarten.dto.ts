import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  Length,
} from 'class-validator';

export class CreateKindergartenDto {
  @ApiProperty({
    example: 'Happy Kids Kindergarten',
    description: 'Name of the kindergarten',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123 Main Street, Tashkent',
    description: 'Address of the kindergarten',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'LIC-2025-001',
    description: 'Unique license number for the kindergarten',
  })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({
    example: '305112345',
    description: 'STIR (tax identification number)',
  })
  @IsString()
  @IsNotEmpty()
  STIR: string;

  @ApiProperty({
    example: 8600123456789012,
    description: 'Bank card number of the kindergarten',
  })
  @IsNumber()
  @IsNotEmpty()
  cardNumber: number;

  @ApiProperty({
    example: false,
    description: 'Soft delete flag',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID of the owner who owns this kindergarten',
  })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
