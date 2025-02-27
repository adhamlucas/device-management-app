jest.mock("@prisma/client")
import CategoryService from "../service";
import { mockCategoryFindMany, mockDeleteCategory, mockCreateCategory } from "../../__mocks__/@prisma/client";


// jest.mock("@prisma/client", () => {
//   return  {
//     PrismaClient: jest.fn().mockImplementation(() => {
//       return {
//         category: {
//           findMany: jest.fn()
//         }
//       }
//     })
//   }
// })

// // jest.mock(PrismaClient)
// const categoryGeMethod = jest.spyOn(PrismaClient.prototype, 'category', 'get').mockImplementation(() => return {
//   findMany: jest.fn()
// })

// const mockCategories = [{ id: 1, name: "Tech" }];
// const mockCategoryFindMany = jest.spyOn(PrismaClient.prototype.category, 'findMany').mockResolvedValue(mockCategories);


// const prisma = new PrismaClient();
const categoryService = new CategoryService()
describe("CategoryService", () => {

  beforeEach(() => {
    mockCategoryFindMany.mockClear()
    mockDeleteCategory.mockClear()
    mockCreateCategory.mockClear()
  })

  it("should return categories from the database", async () => {
    const mockCategories = [{ id: 1, name: "Tech" }, {id: 2, name: "Sells"}];
    mockCategoryFindMany.mockResolvedValue(mockCategories)

    const categories = await categoryService.findAll();

    expect(categories).toEqual(mockCategories);
    expect(mockCategoryFindMany).toHaveBeenCalledTimes(1);
  })
  
  it("should create a new category on the database", async () => {
    const mockCategory = {
      id: 1,
      name: "Tech"
    }
    mockCreateCategory.mockResolvedValue(mockCategory)
    
    const category = await categoryService.create(mockCategory.name)
    
    expect(category).toEqual(mockCategory)
    expect(mockCreateCategory).toHaveBeenCalledTimes(1);
  })

  it("should delete category from the database", async() => {
    const mockCategory = {
      id: 1,
      name: "Tech"
    }
    mockDeleteCategory.mockResolvedValue(mockCategory)
  
    const category = await categoryService.delete(1)
  
    expect(category).toEqual(mockCategory)
    expect(mockDeleteCategory).toHaveBeenCalledTimes(1);
  
  })
})
