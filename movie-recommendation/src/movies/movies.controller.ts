import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { QueryMovieDto } from './dto/query-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAllMovies(@Query() query: QueryMovieDto) {
    return this.moviesService.findAllMovies(query);
  }

  @Get(':id')
  findMovie(@Param('id') id: string) {
    return this.moviesService.findMovie(id);
  }

  @Post()
  createMovie(@Body() dto: CreateMovieDto) {
    console.log(dto.genre);
    return this.moviesService.createMovie(dto);
  }

  @Put(':id')
  updateMovie(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.moviesService.updateMovie(id, dto);
  }

  @Delete(':id')
  deleteMovie(@Param(':id') id: string) {
    return this.moviesService.deleteMovie(id);
  }
}
