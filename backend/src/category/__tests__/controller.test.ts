jest.mock("@prisma/client")
import { Request, Response } from "express"
import CategoryController from "../controller"
import CategoryService from "../service"
import { mockCategoryFindMany, mockCreateCategory, mockDeleteCategory } from "../__mocks__/@prisma/client"

const categoryService = new CategoryService()
const categoryController = new CategoryController(categoryService)

describe("CategoryController", () => {
  beforeEach(() => {
    mockCategoryFindMany.mockClear();
    mockCreateCategory.mockClear();
    mockDeleteCategory.mockClear();
  })

  it("should response all categories available", async () => {
    const mockCatogories = [{id: 1, name: "tech"}, {id: 2, name: "home"}]
    mockCategoryFindMany.mockResolvedValue(mockCatogories)
    const mreq = {} as Request
    const mres = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response

    await categoryController.getAllCategories(mreq, mres)
  
    expect(mres.status).toHaveBeenCalledWith(200)
    expect(mres.json).toHaveBeenCalledWith(mockCatogories)
  })

  it("should response the new category created", async () => {
    const mockCategory = {
      id: 2,
      name: "home"
    }
    mockCreateCategory.mockResolvedValue(mockCategory)

    const mreq = {
      body: {
        name: mockCategory.name
      }
    } as Request

    const mres = {
      status: jest.fn().mockReturnThis(), json: jest.fn()
    } as unknown as Response

    await categoryController.postCategory(mreq, mres)

    expect(mres.status).toHaveBeenCalledWith(200)
    expect(mres.json).toHaveBeenCalledWith(mockCategory)
  })

  it("should response with the deleted category", async () => {
    const mockCategory = { id: 1, name: "Tech" }
    mockDeleteCategory.mockResolvedValue(mockCategory);

    const mreq = { params: { id: mockCategory.id } } as unknown as Request
    const mres = { status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

    await categoryController.deleteCategory(mreq, mres)

    expect(mres.status).toHaveBeenCalledWith(200);
    expect(mres.json).toHaveBeenCalledWith(mockCategory)
  })
})