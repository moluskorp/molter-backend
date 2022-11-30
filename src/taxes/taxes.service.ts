import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';

@Injectable({ scope: Scope.REQUEST })
export class TaxesService {
  constructor(private prisma: PrismaClient, @Inject(CONTEXT) private context) {
    if (context) {
      const { prisma: prismaService } = context.res.locals;
      if (prismaService) {
        this.prisma = prismaService;
      }
    }
  }

  async create(createTaxDto: CreateTaxDto) {
    const taxe = await this.prisma.taxes.create({
      data: {
        hasIpi: createTaxDto.hasIpi,
        cstIpi: createTaxDto.cstIpi,
        ipiPercentage: createTaxDto.ipiPercentage,
        ncm: {
          connect: {
            code: createTaxDto.ncm,
          },
        },
        pisCofinsnature: createTaxDto.pisCofinsNature,
        taxNature: createTaxDto.taxNature,
        taxedPercentage: createTaxDto.taxedPercentage,
        fcpPercentage: createTaxDto.fcpPercentage,
        taxedReductionPercentage: createTaxDto.taxedReductionPercentage,
      },
    });

    return taxe;
  }

  async findAll() {
    return await this.prisma.taxes.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.taxes.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTaxDto: UpdateTaxDto) {
    return await this.prisma.taxes.update({
      where: {
        id,
      },
      data: {
        hasIpi: updateTaxDto.hasIpi,
        cstIpi: updateTaxDto.cstIpi,
        ipiPercentage: updateTaxDto.ipiPercentage,
        ncm: {
          connect: {
            code: updateTaxDto.ncm,
          },
        },
        fcpPercentage: updateTaxDto.fcpPercentage,
        pisCofinsnature: updateTaxDto.pisCofinsNature,
        taxNature: updateTaxDto.taxNature,
        taxedPercentage: updateTaxDto.taxedPercentage,
        taxedReductionPercentage: updateTaxDto.taxedReductionPercentage,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.taxes.delete({
      where: {
        id,
      },
    });
  }
}
