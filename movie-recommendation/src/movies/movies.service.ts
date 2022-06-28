import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from '../schema/movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { QueryMovieDto } from './dto/query-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async findAllMovies(query?: QueryMovieDto): Promise<MovieDocument[]> {
    const title: string = query.title;
    const content: string = query.content;
    if (title && content) {
      return this.movieModel.find({
        $or: [{ title: { $regex: title } }, { content: { $regex: content } }],
      });
    } else if (title) {
      return this.movieModel.find({
        title: { $regex: title },
      });
    } else if (content) {
      return this.movieModel.find({
        content: { $regex: content },
      });
    } else {
      return this.movieModel.find();
    }
  }

  async findMovie(id: string): Promise<MovieDocument> {
    const movie: MovieDocument = await this.movieModel.findById(id);
    if (!movie) {
      throw new NotFoundException(`${id} 해당 영화를 찾을 수 없습니다.`);
    }
    return movie;
  }

  createMovie(dto: CreateMovieDto): Promise<MovieDocument> {
    return this.movieModel.create({ ...dto, score: 0 });
  }

  async updateMovie(id: string, dto: UpdateMovieDto): Promise<MovieDocument> {
    const movie: MovieDocument = await this.movieModel.findById(id);
    if (!movie) {
      throw new NotFoundException(`${id} 해당 영화를 찾을 수 없습니다.`);
    }
    await movie.updateOne(dto);
    return this.movieModel.findById(id).exec();
  }

  async deleteMovie(id: string): Promise<MovieDocument> {
    const movie: MovieDocument = await this.movieModel.findById(id);
    if (!movie) {
      throw new NotFoundException(`${id} 해당 영화를 찾을 수 없습니다.`);
    }
    await movie.deleteOne();
    return movie;
  }


}
