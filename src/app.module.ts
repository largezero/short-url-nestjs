import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShorterModule } from './shorter/shorter.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { ApikeyModule } from './apikey/apikey.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    SharedModule,
    AccountModule,
    ApikeyModule,
    ShorterModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }), // .env 라는 단어가 들어가야 한다.
  ],
})
export class AppModule {}
