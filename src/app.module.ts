import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { ApiController } from './api/api.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardModule, UsersModule, AuthModule],
  controllers: [ApiController, AppController],
  providers: [AppService],
})
export class AppModule {}
