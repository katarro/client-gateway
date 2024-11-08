import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  Inject,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto, PaginationDto, UpdateProductDto } from 'src/common';
import { PRODUCT_SERVICES } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICES) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  async creatProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'create_product' }, createProductDto),
      );
    } catch (error) {
      // throw new BadRequestException(error);
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'find_all_products' }, paginationDto),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'remove_product' }, { id }),
      );
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Patch(':id')
  async update(@Body() product: UpdateProductDto, @Param('id') id: string) {
    // {...product,id} combina los 2 en 1 solo objeto, sed debe vniar 1 solo objeto

    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'update_product' }, { ...product, id }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
