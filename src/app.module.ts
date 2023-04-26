import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { BookService } from './modules/book/book.service';
import { PrismaService } from './database/prisma.database';
import { BookController } from './modules/book/book.controller';

@Module({
  imports: [BookModule],
  controllers: [BookController],
  providers: [BookService, PrismaService],
})
export class AppModule {}
