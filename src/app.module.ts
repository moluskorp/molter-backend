import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ClientsModule } from './clients/clients.module';
import { StoresModule } from './stores/stores.module';
import { NcmsModule } from './ncms/ncms.module';
import { TaxesModule } from './taxes/taxes.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ClientsModule,
    StoresModule,
    NcmsModule,
    TaxesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
