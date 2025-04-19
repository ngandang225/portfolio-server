import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so you don't need to import it everywhere
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}