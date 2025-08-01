import categoriesData from "@/services/mockData/categories.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(100);
    return [...categoriesData];
  },

  async getById(id) {
    await delay(100);
    const category = categoriesData.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return { ...category };
  },

  async getByName(name) {
    await delay(100);
    const category = categoriesData.find(c => c.name === name);
    if (!category) {
      throw new Error(`Category with name ${name} not found`);
    }
    return { ...category };
  }
};