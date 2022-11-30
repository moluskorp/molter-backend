import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../errors/AppError';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable({ scope: Scope.REQUEST })
export class StoresService {
  constructor(private prisma: PrismaClient, @Inject(CONTEXT) private context) {
    if (context) {
      const { prismaService } = context.res.locals;
      if (prismaService) {
        this.prisma = prismaService;
      }
    }
  }

  async create(createStoreDto: CreateStoreDto) {
    const storeExists = await this.prisma.store.findFirst({
      where: {
        cnpj: createStoreDto.cnpj,
      },
    });

    if (!!storeExists) {
      throw new AppError('CNPJ já existe');
    }

    const store = await this.prisma.store.create({
      data: {
        cnpj: createStoreDto.cnpj,
        ie: createStoreDto.ie,
        invoiceNumber: createStoreDto.invoiceNumber,
        invoiceSerie: createStoreDto.invoiceSerie,
        name: createStoreDto.name,
        nickname: createStoreDto.nickname,
        type: createStoreDto.type,
        address: {
          create: {
            city: createStoreDto.address.city,
            complement: createStoreDto.address.complement,
            district: createStoreDto.address.district,
            number: createStoreDto.address.number,
            state: createStoreDto.address.state,
            postalcode: createStoreDto.address.postalCode,
            street: createStoreDto.address.street,
          },
        },
      },
    });
    return store;
  }

  async findAll() {
    return await this.prisma.store.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.store.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    return await this.prisma.store.update({
      where: {
        id,
      },
      data: {
        cnpj: updateStoreDto.cnpj,
        ie: updateStoreDto.ie,
        invoiceNumber: updateStoreDto.invoiceNumber,
        invoiceSerie: updateStoreDto.invoiceSerie,
        name: updateStoreDto.name,
        nickname: updateStoreDto.nickname,
        type: updateStoreDto.type,
        address: {
          update: {
            city: updateStoreDto.address.city,
            complement: updateStoreDto.address.complement,
            district: updateStoreDto.address.district,
            number: updateStoreDto.address.number,
            state: updateStoreDto.address.state,
            postalcode: updateStoreDto.address.postalCode,
            street: updateStoreDto.address.street,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.store.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }
}
