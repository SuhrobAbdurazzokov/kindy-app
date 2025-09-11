import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { KindergartenService } from './kindergarten.service';
import { CreateKindergartenDto } from './dto/create-kindergarten.dto';
import { UpdateKindergartenDto } from './dto/update-kindergarten.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QueryPaginationDto } from 'src/common/dto/query-pagination.dto';

@ApiTags('Kindergarten')
@ApiBearerAuth()
@Controller('kindergarten')
export class KindergartenController {
  constructor(private readonly kindergartenService: KindergartenService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new kindergarten' })
  @ApiResponse({
    status: 201,
    description: 'Kindergarten successfully created',
    schema: {
      example: {
        success: true,
        data: {
          id: 1,
          name: 'Happy Kids Kindergarten',
          address: '123 Main Street, Tashkent',
          licenseNumber: 'LIC-2025-001',
          STIR: '305112345',
          cardNumber: 8600123456789012,
          isDeleted: false,
          ownerId: 1,
          createdAt: '2025-09-11T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  create(@Body() createKindergartenDto: CreateKindergartenDto) {
    return this.kindergartenService.create(createKindergartenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all kindergartens (without pagination)' })
  @ApiResponse({
    status: 200,
    description: 'List of all kindergartens',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            name: 'Happy Kids Kindergarten',
            address: '123 Main Street',
            licenseNumber: 'LIC-2025-001',
            STIR: '305112345',
            cardNumber: 8600123456789012,
            isDeleted: false,
            ownerId: 1,
          },
        ],
      },
    },
  })
  findAll() {
    return this.kindergartenService.findAll();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get kindergartens with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of kindergartens',
    schema: {
      example: {
        success: true,
        meta: {
          total: 25,
          page: 1,
          limit: 10,
        },
        data: [
          {
            id: 1,
            name: 'Happy Kids Kindergarten',
            address: '123 Main Street',
            licenseNumber: 'LIC-2025-001',
            STIR: '305112345',
            cardNumber: 8600123456789012,
            isDeleted: false,
            ownerId: 1,
          },
        ],
      },
    },
  })
  findAllWithPagination(@Query() queryDto: QueryPaginationDto) {
    const { query, limit, page } = queryDto;
    const where = query
      ? { name: query, isDeleted: false }
      : { isDeleted: false };
    return this.kindergartenService.findAllWithPagination({
      where,
      order: { createdAt: 'DESC' },
      skip: page,
      take: limit,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get kindergarten by ID' })
  @ApiResponse({
    status: 200,
    description: 'Kindergarten found',
    schema: {
      example: {
        success: true,
        data: {
          id: 1,
          name: 'Happy Kids Kindergarten',
          address: '123 Main Street',
          licenseNumber: 'LIC-2025-001',
          STIR: '305112345',
          cardNumber: 8600123456789012,
          isDeleted: false,
          ownerId: 1,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Kindergarten not found' })
  findOne(@Param('id') id: string) {
    return this.kindergartenService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update kindergarten by ID' })
  @ApiResponse({
    status: 200,
    description: 'Kindergarten successfully updated',
    schema: {
      example: {
        success: true,
        data: {
          id: 1,
          name: 'Updated Kindergarten',
          address: '456 New Address',
          licenseNumber: 'LIC-2025-001',
          STIR: '305112345',
          cardNumber: 8600123456789012,
          isDeleted: false,
          ownerId: 1,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Kindergarten not found' })
  update(
    @Param('id') id: string,
    @Body() updateKindergartenDto: UpdateKindergartenDto,
  ) {
    return this.kindergartenService.update(+id, updateKindergartenDto);
  }

  @Patch('delete/:id')
  @ApiOperation({ summary: 'Soft delete kindergarten by ID' })
  @ApiResponse({
    status: 200,
    description: 'Kindergarten marked as deleted',
    schema: {
      example: {
        success: true,
        data: {
          id: 1,
          name: 'Happy Kids Kindergarten',
          isDeleted: true,
        },
      },
    },
  })
  async softDelete(@Param('id') id: string) {
    await this.kindergartenService.findOneById(+id);
    await this.kindergartenService.getRepository.update(
      { id: +id },
      { isDeleted: true },
    );
    return this.kindergartenService.findOneById(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hard delete kindergarten by ID' })
  @ApiResponse({
    status: 200,
    description: 'Kindergarten permanently deleted',
    schema: {
      example: { success: true, message: 'Kindergarten deleted successfully' },
    },
  })
  remove(@Param('id') id: string) {
    return this.kindergartenService.delete(+id);
  }
}
