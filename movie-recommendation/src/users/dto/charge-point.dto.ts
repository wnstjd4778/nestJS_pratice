import {IsNotEmpty, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ChargePointDto {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  point: number;
}
