import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SkillService {
    constructor(private readonly prismaService: PrismaService) {}
    async findAll() {
        
        return "ok";
    }
}
