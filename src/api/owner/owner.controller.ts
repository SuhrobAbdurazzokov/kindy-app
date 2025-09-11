import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { QueryPaginationDto } from 'src/common/dto/query-pagination.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/enum/roles.enum';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { SignInDto } from 'src/common/dto/signIn.dto';
import type { Response } from 'express';

@ApiTags('Owners')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @AccessRoles(Roles.SUPER_ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new owner' })
  @ApiResponse({
    status: 201,
    description: 'Owner successfully created',
    schema: {
      example: {
        id: 1,
        fullName: 'John Doe',
        phoneNumber: '+998901234567',
        login: 'johndoe',
        isActive: true,
        role: 'OWNER',
      },
    },
  })
  @ApiResponse({
    status: 422,
    description: 'Validation error',
    schema: {
      example: {
        statusCode: 422,
        error: { message: 'property login should not exist' },
      },
    },
  })
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }


  @Post("signin")
  signIn(@Body() signInDto: SignInDto, @Res({passthrough: true}) res: Response) {
    return this.ownerService.signIn(signInDto, res)
  }

  @AccessRoles(Roles.SUPER_ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all owners' })
  @ApiResponse({
    status: 200,
    description: 'List of owners',
    schema: {
      example: [
        {
          id: 1,
          fullName: 'John Doe',
          phoneNumber: '+998901234567',
          login: 'johndoe',
          isActive: true,
          role: 'OWNER',
        },
      ],
    },
  })
  findAll() {
    return this.ownerService.findAll();
  }

  @AccessRoles(Roles.SUPER_ADMIN)
  @Get('pagination')
  @ApiOperation({ summary: 'Get all owners with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of owners',
    schema: {
      example: {
        data: [
          {
            id: 1,
            fullName: 'John Doe',
            phoneNumber: '+998901234567',
            login: 'johndoe',
            isActive: true,
            role: 'OWNER',
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
      },
    },
  })
  findAllWithPagination(@Query() queryDto: QueryPaginationDto) {
    const { query, limit, page } = queryDto;
    const where = query
      ? { fullName: query, isDeleted: false }
      : { isDeleted: false };
    return this.ownerService.findAllWithPagination({
      where,
      order: { createdAt: 'DESC' },
      skip: page,
      take: limit,
    });
  }

  @AccessRoles(Roles.SUPER_ADMIN, Roles.OWNER)
  @Get(':id')
  @ApiOperation({ summary: 'Get owner by ID' })
  @ApiResponse({
    status: 200,
    description: 'Owner found',
    schema: {
      example: {
        id: 1,
        fullName: 'John Doe',
        phoneNumber: '+998901234567',
        login: 'johndoe',
        isActive: true,
        role: 'OWNER',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.ownerService.findOneById(+id);
  }

  @AccessRoles(Roles.SUPER_ADMIN, Roles.OWNER)
  @Patch(':id')
  @ApiOperation({ summary: 'Update owner by ID' })
  @ApiResponse({
    status: 200,
    description: 'Owner successfully updated',
    schema: {
      example: {
        id: 1,
        fullName: 'Updated Owner',
        phoneNumber: '+998901234567',
        login: 'updatedlogin',
        isActive: true,
        role: 'OWNER',
      },
    },
  })
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @AccessRoles(Roles.SUPER_ADMIN)
  @Patch('delete/:id')
  @ApiOperation({ summary: 'Soft delete owner by ID' })
  @ApiResponse({
    status: 200,
    description: 'Owner soft deleted',
    schema: {
      example: {
        id: 1,
        fullName: 'John Doe',
        isDeleted: true,
      },
    },
  })
  async softDelete(@Param('id') id: string) {
    await this.ownerService.findOneById(+id);
    await this.ownerService.getRepository.update(
      { id: +id },
      { isDeleted: true },
    );
    return this.ownerService.findOneById(+id);
  }

  @AccessRoles(Roles.SUPER_ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Permanently delete owner by ID' })
  @ApiResponse({
    status: 200,
    description: 'Owner permanently deleted',
    schema: {
      example: { message: 'Owner successfully deleted' },
    },
  })
  remove(@Param('id') id: string) {
    return this.ownerService.delete(+id);
  }
}
