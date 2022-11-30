import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../errors/AppError';
import { Pagination } from './clients.controller';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable({ scope: Scope.REQUEST })
export class ClientsService {
  constructor(private prisma: PrismaClient, @Inject(CONTEXT) private context) {
    if (context) {
      const { prisma: prismaService } = context.res.locals;
      if (prismaService) {
        this.prisma = prismaService;
      }
    }
  }

  async create(createClientDto: CreateClientDto) {
    const clientExists = await this.prisma.client.findFirst({
      where: {
        cpf: createClientDto.cpf,
      },
    });

    if (clientExists) {
      throw new AppError('Cliente já existe');
    }

    const {
      cpf,
      name,
      nickname,
      birthday,
      email,
      type,
      limit,
      finalConsumer,
      rg,
      address,
      contacts,
    } = createClientDto;

    const client = await this.prisma.client.create({
      data: {
        cpf,
        name,
        nickname,
        birthday,
        email,
        type,
        limit,
        finalConsumer,
        rg,
        address: {
          create: {
            street: address.street,
            number: address.number,
            complement: address.complement,
            district: address.district,
            city: address.city,
            state: address.state,
            postalcode: address.postalCode,
          },
        },
        contacts: {
          create: contacts.map((contact) => {
            return {
              type: contact.type,
              value: contact.value,
            };
          }),
        },
      },
    });

    return client;
  }

  async findAll() {
    return await this.prisma.client.findMany({
      include: { address: true, contacts: true },
    });
  }

  async findAllPerPagination(pagination: Pagination) {
    const retorno = await this.prisma.client.findMany({
      skip: Number(pagination.skip),
      take: pagination.take,
      include: { address: true, contacts: true },
      where: {
        name: {
          contains: pagination.name,
          mode: 'insensitive',
        },
      },
    });

    return retorno;
  }

  async findOne(id: string) {
    return await this.prisma.client.findUnique({
      where: {
        id,
      },
      include: { address: true, contacts: true },
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    console.log(updateClientDto);
    const response = await this.prisma.client.update({
      where: {
        id,
      },
      data: {
        birthday: updateClientDto.birthday,
        email: updateClientDto.email,
        name: updateClientDto.name,
        nickname: updateClientDto.nickname,
        cpf: updateClientDto.cpf,
        rg: updateClientDto.rg,
        type: updateClientDto.type,
        limit: updateClientDto.limit,
        finalConsumer: updateClientDto.finalConsumer,
        active: updateClientDto.active,
        address: {
          connectOrCreate: {
            where: {
              id: updateClientDto.addressId,
            },
            create: {
              city: updateClientDto.address.city,
              district: updateClientDto.address.district,
              number: updateClientDto.address.number,
              postalcode: updateClientDto.address.postalCode,
              state: updateClientDto.address.state,
              street: updateClientDto.address.street,
              complement: updateClientDto.address.complement,
            },
          },
        },
        contacts: {
          connectOrCreate: updateClientDto.contacts.map((contact) => {
            return {
              where: {
                id: contact.id,
              },
              create: {
                type: contact.type,
                value: contact.value,
              },
            };
          }),
        },
      },
    });

    return response;
  }

  async remove(id: string) {
    return await this.prisma.client.update({
      where: { id },
      data: {
        active: false,
      },
    });
  }
}
