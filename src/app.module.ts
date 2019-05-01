import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VocabularyController } from './vocabulary/vocabulary.controller';
import { UsersController } from './user/users.controller';
import { logger } from './infrastructure/logger';

@Module({
  imports: [],
  controllers: [VocabularyController, UsersController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes(UsersController);
  }
}
