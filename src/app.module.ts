import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShorterModule } from './shorter/shorter.module';
import { SharedModule } from './shared/shared.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ShorterModule, SharedModule],
})
export class AppModule {}
