import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { AddCvDto, UpdateCvDto } from './dto/cv.dto';
import { CvEntity } from './entities/cv.entity';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  async getAllCv(): Promise<CvEntity[]> {
    return await this.cvService.findAll();
  }

  @Get('/stats/:min/:max')
  async statCvNumberByAge(
    @Param('min', ParseIntPipe) min: number,
    @Param('max', ParseIntPipe) max: number,
  ) {
    return await this.cvService.cvNumberByAge(min, max);
  }

  @Get('/:id')
  async getCvById(@Param('id', ParseIntPipe) id: number): Promise<CvEntity> {
    return await this.cvService.findOne(id);
  }

  @Post()
  async addCv(@Body() addCvDto: AddCvDto): Promise<CvEntity> {
    return await this.cvService.addCv(addCvDto);
  }

  @Patch('/:id')
  async updateCv(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCvDto: UpdateCvDto,
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, updateCvDto);
  }

  @Delete('/:id')
  async deleteCv(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.removeCv(id);
  }
}
