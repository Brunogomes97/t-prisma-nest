import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../../database/prisma.database';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookDto) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) {
      throw new Error('Book already exists');
    }

    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }

  async findAll() {
    return await this.prisma.book.findMany();
  }

  async update(id: string, data: UpdateBookDto) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    return await this.prisma.book.update({
      data,
      where: {
        id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  async remove(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    return await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
