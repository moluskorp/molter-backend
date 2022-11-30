import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

export type Pagination = {
  skip: number;
  take: number;
  name: string;
};

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientsService.create(createClientDto);
  }

  @Get()
  async findAll() {
    return await this.clientsService.findAll();
  }

  @Get(':name/:skip/:take')
  async findManyPagination(
    @Param('skip') skip: number,
    @Param('take') take: number,
    @Param('name') nameParam: string,
  ) {
    const name = nameParam === '*' ? '' : nameParam;
    const searchConditions = {
      skip: Number(skip * take),
      take: Number(take),
      name,
    };
    return await this.clientsService.findAllPerPagination(searchConditions);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clientsService.remove(id);
  }
}
