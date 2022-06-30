import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schema/movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { QueryMovieDto } from './dto/query-movie.dto';
import { IAccessTokenPayload } from '../types/auth-tokens';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async findAllMovies(query?: QueryMovieDto): Promise<MovieDocument[]> {
    return this.movieModel
      .find(query)
      .populate({ path: 'user', select: ['name', 'email'] });
  }

  async findMovie(id: string): Promise<MovieDocument> {
    const movie: MovieDocument = await this.movieModel.findById(id).populate({ path: 'user', select: ['name', 'email'] });;
    if (!movie) {
      throw new NotFoundException(`${id} 해당 영화를 찾을 수 없습니다.`);
    }
    return movie;
  }

  createMovie(dto: CreateMovieDto, user): Promise<MovieDocument> {
    return this.movieModel.create({ ...dto, score: 0, user });
  }

  async updateMovie(id: string, dto: UpdateMovieDto): Promise<MovieDocument> {
    const movie: MovieDocument = await this.movieModel.findById(id);
    if (!movie) {
      throw new NotFoundException(`${id} 해당 영화를 찾을 수 없습니다.`);
    }
    if (dto.user._id !== String(movie.user)) {
      throw new UnauthorizedException('해당 영화에 접근할 수 없습니다.');
    }
    await movie.updateOne(dto);
    return this.movieModel.findById(id).exec();
  }

  async deleteMovie(
    id: string,
    user: IAccessTokenPayload,
  ): Promise<MovieDocument> {
    const movie: MovieDocument = await this.movieModel.findById(id);
    if (!movie) {
      throw new NotFoundException(`${id} 해당 영화를 찾을 수 없습니다.`);
    }
    if (user._id !== String(movie.user)) {
      throw new UnauthorizedException('해당 영화에 접근할 수 없습니다.');
    }
    await movie.deleteOne();
    return movie;
  }
}
