import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../errors/AppError';
import { CreateNcmDto } from './dto/create-ncm.dto';
import { UpdateNcmDto } from './dto/update-ncm.dto';

@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class NcmsService {
  constructor(private prisma: PrismaClient, @Inject(CONTEXT) private context) {
    if (context) {
      const { prisma: prismaService } = context.res.locals;
      if (prismaService) {
        this.prisma = prismaService;
      }
    }
  }

  async create(createNcmDto: CreateNcmDto) {
    const ncmAlreadyExists = await this.prisma.ncm.findFirst({
      where: {
        code: createNcmDto.code,
      },
    });

    if (ncmAlreadyExists) {
      throw new AppError('Ncm já existente');
    }

    return await this.prisma.ncm.create({
      data: {
        ...createNcmDto,
      },
    });
  }

  async findAll() {
    return await this.prisma.ncm.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.ncm.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateNcmDto: UpdateNcmDto) {
    return await this.prisma.ncm.update({
      where: {
        id,
      },
      data: {
        code: updateNcmDto.code,
        description: updateNcmDto.description,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.ncm.delete({
      where: {
        id,
      },
    });
  }
}
