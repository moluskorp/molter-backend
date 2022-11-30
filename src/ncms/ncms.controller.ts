import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NcmsService } from './ncms.service';
import { CreateNcmDto } from './dto/create-ncm.dto';
import { UpdateNcmDto } from './dto/update-ncm.dto';

@Controller('ncms')
export class NcmsController {
  constructor(private readonly ncmsService: NcmsService) {}

  @Post()
  create(@Body() createNcmDto: CreateNcmDto) {
    return this.ncmsService.create(createNcmDto);
  }

  @Get()
  findAll() {
    return this.ncmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ncmsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNcmDto: UpdateNcmDto) {
    return this.ncmsService.update(id, updateNcmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ncmsService.remove(id);
  }
}
