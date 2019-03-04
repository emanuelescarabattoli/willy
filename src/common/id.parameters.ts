
import { IsNumber } from 'class-validator';

export class IdParameters {
  @IsNumber()
  id: number;
}
