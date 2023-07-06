import { UpdateCategoryUseCase } from '@tsn/micro-videos/category/application';

export class UpdateCategoryDto implements UpdateCategoryUseCase.Input {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}
