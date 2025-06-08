import { categoryService } from '../categoryService';

describe('categoryService', () => {
  it('should return mock categories from fetchCategories', async () => {
    const categories = await categoryService.fetchCategories();
    expect(Array.isArray(categories)).toBe(true);
  });

  it('should add category correctly with addCategory', async () => {
    const newCategory = 'Test Category';
    const result = await categoryService.addCategory(newCategory);
    expect(result).toBe(newCategory);
  });

  it('should resolve deleteCategory without throwing', async () => {
    await expect(categoryService.deleteCategory('Test Category')).resolves.toBeUndefined();
  });
});
