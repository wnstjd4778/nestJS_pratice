import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { QueryMovieDto } from './dto/query-movie.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { MoviesService } from './movies.service';
import { User } from '../decorater/user.decorater';
import { IUser } from '../types/user';
import { IAccessTokenPayload } from '../types/auth-tokens';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAllMovies(@Query() query: QueryMovieDto) {
    return this.moviesService.findAllMovies(query);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  findAllMyMovies(
    @User() user: IAccessTokenPayload,
    @Query() query: QueryMovieDto,
  ) {
    console.log(query.title);
    query.user = user;
    return this.moviesService.findAllMovies(query);
  }

  @Get(':id')
  findMovie(@Param('id') id: string) {
    return this.moviesService.findMovie(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createMovie(@User() user: IAccessTokenPayload, @Body() dto: CreateMovieDto) {
    return this.moviesService.createMovie(dto, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateMovie(
    @User() user: IAccessTokenPayload,
    @Param('id') id: string,
    @Body() dto: UpdateMovieDto,
  ) {
    dto.user = user;
    return this.moviesService.updateMovie(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteMovie(@User() user: IAccessTokenPayload, @Param(':id') id: string) {
    return this.moviesService.deleteMovie(id, user);
  }
}
