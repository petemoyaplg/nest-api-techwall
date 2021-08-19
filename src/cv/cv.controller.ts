import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/decorators/users.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { CvService } from './cv.service';
import { AddCvDto, UpdateCvDto } from './dto/cv.dto';
import { CvEntity } from './entities/cv.entity';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCv(@User() user): Promise<CvEntity[]> {
    return await this.cvService.findAll(user);
  }

  @Get('/stats/:min/:max')
  async statCvNumberByAge(
    @Param('min', ParseIntPipe) min: number,
    @Param('max', ParseIntPipe) max: number,
  ) {
    return await this.cvService.cvNumberByAge(min, max);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getCvById(
    @Param('id', ParseIntPipe) id: number,
    @User() user,
  ): Promise<CvEntity> {
    return await this.cvService.findOne(id, user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addCv(@Body() addCvDto: AddCvDto, @User() user): Promise<CvEntity> {
    return await this.cvService.addCv(addCvDto, user);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateCv(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCvDto: UpdateCvDto,
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, updateCvDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteCv(@Param('id', ParseIntPipe) id: number, @User() user) {
    return await this.cvService.removeCv(id, user);
  }
}
