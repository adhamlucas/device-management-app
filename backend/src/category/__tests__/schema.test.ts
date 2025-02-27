import { createCategorySchema, deleteCategorySchema } from '../schema'
describe("Category Schema Validation", () => {
  it("should pass for valid create category body data", () => {
    const mockBody = { name: "Tech" }
    expect(() => createCategorySchema.request.body.parse(mockBody)).not.toThrow();
  });

  it("should fail for missing name on create category body", () => {
    expect(() => createCategorySchema.request.body.parse({})).toThrow();
  });

  it("should fail for invalid name type on create category body", () => {
    const mockBody = { name: 123 }
    expect(() => createCategorySchema.request.body.parse(mockBody)).toThrow();
  });

  it("should pass for valid delete category params", () => {
    const mockParams = { id: 1 }
    expect(() => deleteCategorySchema.request.params.parse(mockParams)).not.toThrow();
  })

  it("should fail for missing id on delete category params", () => {
    expect(() => deleteCategorySchema.request.params.parse({})).toThrow();
  });

  it("should fail for invalid id type on delete category params", () => {
    const mockBody = { id: "id01" }
    expect(() => deleteCategorySchema.request.params.parse(mockBody)).toThrow();
  });
});