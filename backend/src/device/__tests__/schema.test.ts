import { createDeviceSchema, deleteDeviceSchema } from "../schema";

describe("Device Schema Validation", () => {
  it("should pass for valid create device body data", () => {
    const mockBody = { color: "orange", partNumber: 101, categoryId: 1 }
    expect(() => createDeviceSchema.request.body.parse(mockBody)).not.toThrow();
  });

    it("should fail for missing properties on create device body", () => {
      expect(() => createDeviceSchema.request.body.parse({})).toThrow();
    });
  
    it("should fail for invalid color type on create category body", () => {
      const mockBody = { color: 123, partNumber: 101, categoryId: 1 }
      expect(() => createDeviceSchema.request.body.parse(mockBody)).toThrow();
    });
  
    it("should pass for valid delete device params", () => {
      const mockParams = { id: 1 }
      expect(() => deleteDeviceSchema.request.params.parse(mockParams)).not.toThrow();
    })
  
    it("should fail for missing id on delete device params", () => {
      expect(() => deleteDeviceSchema.request.params.parse({})).toThrow();
    });
  
    it("should fail for invalid id type on delete device params", () => {
      const mockBody = { id: "id01" }
      expect(() => deleteDeviceSchema.request.params.parse(mockBody)).toThrow();
    });
})