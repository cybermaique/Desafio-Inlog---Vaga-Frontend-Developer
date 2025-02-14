import { describe, expect, it } from "vitest";
import { convertFileToBase64 } from "./add-truck";

describe("convertFileToBase64", () => {
  it("should convert a file to Base64", async () => {
    const file = new File(["file content"], "test.txt", {
      type: "text/plain",
    });

    const base64 = await convertFileToBase64(file);

    expect(base64).toBeDefined();
    expect(typeof base64).toBe("string");
    expect(base64.startsWith("data:text/plain;base64,")).toBe(true);
  });
});
