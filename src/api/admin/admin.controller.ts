import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum/roles.enum';
import { QueryPaginationDto } from 'src/common/dto/query-pagination.dto';
import { ILike } from 'typeorm';
import { SignInDto } from 'src/common/dto/signIn.dto';
import type { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { GetRequestUser } from 'src/common/decorator/get-request-user.decorator';
import type { IToken } from 'src/infrastructure/interface/token.interface';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create new admin (only SUPER_ADMIN)' })
  @ApiResponse({
    status: 201,
    description: 'Admin created successfully',
    schema: {
      example: {
        id: 1,
        fullName: 'John Doe',
        login: 'johndoe',
        phoneNumber: '+123456789',
        role: 'ADMIN',
        isActive: true,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: { example: { message: 'Bad Request', error: 'Validation failed' } },
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in as Admin' })
  @ApiResponse({
    status: 200,
    description: 'Signed in successfully',
    schema: {
      example: {
        accessToken: 'jwt-token-here',
        refreshToken: 'refresh-token-here',
        user: {
          id: 1,
          fullName: 'John Doe',
          login: 'johndoe',
          role: 'ADMIN',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: { example: { message: 'Invalid login or password' } },
  })
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(signInDto, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all admins (SUPER_ADMIN only)' })
  @ApiResponse({
    status: 200,
    description: 'List of admins',
    schema: {
      example: [
        {
          id: 1,
          fullName: 'John Doe',
          login: 'johndoe',
          isActive: true,
          phoneNumber: '+123456789',
          role: 'ADMIN',
        },
      ],
    },
  })
  findAll() {
    return this.adminService.findAll({
      where: { role: Roles.ADMIN },
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        fullName: true,
        login: true,
        isActive: true,
        phoneNumber: true,
        role: true,
      },
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN)
  @Get('pagination')
  @ApiOperation({ summary: 'Get admins with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of admins',
    schema: {
      example: {
        data: [
          {
            id: 1,
            fullName: 'John Doe',
            login: 'johndoe',
            isActive: true,
            phoneNumber: '+123456789',
            role: 'ADMIN',
          },
        ],
        total: 10,
        page: 1,
        limit: 10,
      },
    },
  })
  findAllWithPagination(@Query() queryDto: QueryPaginationDto) {
    const { query, limit, page } = queryDto;
    const where = query
      ? { login: ILike(`${query}`), role: Roles.ADMIN, isDeleted: false }
      : { role: Roles.ADMIN, isDeleted: false };
    return this.adminService.findAllWithPagination({
      where,
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        login: true,
        fullName: true,
        isActive: true,
        phoneNumber: true,
        role: true,
      },
      skip: page,
      take: limit,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN, Roles.ADMIN, 'ID')
  @Get(':id')
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Admin found',
    schema: {
      example: {
        id: 1,
        fullName: 'John Doe',
        login: 'johndoe',
        phoneNumber: '+123456789',
        role: 'ADMIN',
        isActive: true,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Admin not found',
    schema: { example: { message: 'Admin not found' } },
  })
  findOne(@Param('id') id: string) {
    return this.adminService.findOneById(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN, Roles.ADMIN, 'ID')
  @Patch(':id')
  @ApiOperation({ summary: 'Update admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Admin updated successfully',
    schema: {
      example: {
        id: 1,
        fullName: 'Updated Name',
        login: 'johndoe',
        phoneNumber: '+998991234567',
        role: 'ADMIN',
        isActive: true,
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @GetRequestUser('user') user: IToken,
  ) {
    return this.adminService.updateAdmin(+id, updateAdminDto, user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN)
  @Patch('delete/:id')
  @ApiOperation({ summary: 'Soft delete admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Admin soft deleted',
    schema: { example: { message: 'Admin successfully soft deleted' } },
  })
  softDelete(@Param('id') id: string) {
    return this.adminService.findOneById(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin permanently' })
  @ApiResponse({
    status: 200,
    description: 'Admin deleted',
    schema: { example: { message: 'Admin successfully deleted' } },
  })
  remove(@Param('id') id: string) {
    return this.adminService.delete(+id);
  }
}
