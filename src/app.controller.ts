import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { JwtGuard } from './auth/auth/jwt.guard';
import { PrismaClient } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  hello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtGuard)
  @Post('/')
  async postHello(@Res() response: Response): Promise<void> {
    console.log('hello');
  }
}
