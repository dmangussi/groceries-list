import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  description: string;
}
