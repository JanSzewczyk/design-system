import fs from "fs/promises";
import { updateFilesWithText } from "./post-build.js";

// Mock fs module
vi.mock("fs/promises");

describe("post-build.js", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console methods
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("updateFilesWithText", () => {
    test("should successfully update a single file with text", async () => {
      // Arrange
      const mockFileContent = 'export { Button } from "./button";';
      const expectedContent = '"use client";\n\nexport { Button } from "./button";';
      const filePath = "dist/components/index.js";

      fs.readFile.mockResolvedValue(mockFileContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText([filePath], '"use client";\n\n');

      // Assert
      expect(fs.readFile).toHaveBeenCalledWith(filePath, "utf8");
      expect(fs.writeFile).toHaveBeenCalledWith(filePath, expectedContent, "utf8");
      expect(console.log).toHaveBeenCalledWith(`Updated: ${filePath}`);
    });

    test("should successfully update multiple files with text", async () => {
      // Arrange
      const mockFileContent = 'export { Button } from "./button";';
      const expectedContent = '"use client";\n\nexport { Button } from "./button";';
      const filePaths = ["dist/components/index.js", "dist/components/index.cjs"];

      fs.readFile.mockResolvedValue(mockFileContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText(filePaths, '"use client";\n\n');

      // Assert
      expect(fs.readFile).toHaveBeenCalledTimes(2);
      expect(fs.writeFile).toHaveBeenCalledTimes(2);

      filePaths.forEach((filePath) => {
        expect(fs.readFile).toHaveBeenCalledWith(filePath, "utf8");
        expect(fs.writeFile).toHaveBeenCalledWith(filePath, expectedContent, "utf8");
        expect(console.log).toHaveBeenCalledWith(`Updated: ${filePath}`);
      });
    });

    test("should handle empty file content", async () => {
      // Arrange
      const mockFileContent = "";
      const expectedContent = '"use client";\n\n';
      const filePath = "dist/components/index.js";

      fs.readFile.mockResolvedValue(mockFileContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText([filePath], '"use client";\n\n');

      // Assert
      expect(fs.readFile).toHaveBeenCalledWith(filePath, "utf8");
      expect(fs.writeFile).toHaveBeenCalledWith(filePath, expectedContent, "utf8");
      expect(console.log).toHaveBeenCalledWith(`Updated: ${filePath}`);
    });

    test("should prepend text to existing content correctly", async () => {
      // Arrange
      const mockFileContent = `// Existing comment
export { Button } from "./button";
export { Input } from "./input";`;

      const expectedContent = `"use client";

// Existing comment
export { Button } from "./button";
export { Input } from "./input";`;

      const filePath = "dist/components/index.js";

      fs.readFile.mockResolvedValue(mockFileContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText([filePath], '"use client";\n\n');

      // Assert
      expect(fs.writeFile).toHaveBeenCalledWith(filePath, expectedContent, "utf8");
    });

    test("should handle file read errors gracefully", async () => {
      // Arrange
      const filePath = "nonexistent/file.js";
      const readError = new Error("ENOENT: no such file or directory");

      fs.readFile.mockRejectedValue(readError);

      // Act
      await updateFilesWithText([filePath], '"use client";\n\n');

      // Assert
      expect(fs.readFile).toHaveBeenCalledWith(filePath, "utf8");
      expect(fs.writeFile).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(`Error updating ${filePath}:`, readError);
    });

    test("should handle file write errors gracefully", async () => {
      // Arrange
      const filePath = "dist/components/index.js";
      const mockFileContent = 'export { Button } from "./button";';
      const writeError = new Error("EACCES: permission denied");

      fs.readFile.mockResolvedValue(mockFileContent);
      fs.writeFile.mockRejectedValue(writeError);

      // Act
      await updateFilesWithText([filePath], '"use client";\n\n');

      // Assert
      expect(fs.readFile).toHaveBeenCalledWith(filePath, "utf8");
      expect(fs.writeFile).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(`Error updating ${filePath}:`, writeError);
    });

    test("should continue processing other files when one fails", async () => {
      // Arrange
      const filePaths = ["dist/components/index.js", "nonexistent/file.js", "dist/components/index.cjs"];
      const mockFileContent = 'export { Button } from "./button";';
      const readError = new Error("ENOENT: no such file or directory");

      fs.readFile
        .mockResolvedValueOnce(mockFileContent) // First file succeeds
        .mockRejectedValueOnce(readError) // Second file fails
        .mockResolvedValueOnce(mockFileContent); // Third file succeeds

      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText(filePaths, '"use client";\n\n');

      // Assert
      expect(fs.readFile).toHaveBeenCalledTimes(3);
      expect(fs.writeFile).toHaveBeenCalledTimes(2); // Only successful reads should write
      expect(console.log).toHaveBeenCalledTimes(2); // Only successful updates should log
      expect(console.error).toHaveBeenCalledTimes(1); // Only one error should be logged
    });

    test("should handle different text prefixes", async () => {
      // Arrange
      const mockFileContent = 'export { Button } from "./button";';
      const customText = "/* Custom header */\n";
      const expectedContent = '/* Custom header */\nexport { Button } from "./button";';
      const filePath = "dist/components/index.js";

      fs.readFile.mockResolvedValue(mockFileContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText([filePath], customText);

      // Assert
      expect(fs.writeFile).toHaveBeenCalledWith(filePath, expectedContent, "utf8");
    });

    test("should handle empty file paths array", async () => {
      // Act
      await updateFilesWithText([], '"use client";\n\n');

      // Assert
      expect(fs.readFile).not.toHaveBeenCalled();
      expect(fs.writeFile).not.toHaveBeenCalled();
      expect(console.log).not.toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
    });

    test("should handle empty text parameter", async () => {
      // Arrange
      const mockFileContent = 'export { Button } from "./button";';
      const filePath = "dist/components/index.js";

      fs.readFile.mockResolvedValue(mockFileContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText([filePath], "");

      // Assert
      expect(fs.writeFile).toHaveBeenCalledWith(filePath, mockFileContent, "utf8");
    });
  });

  describe("Integration test for specific use case", () => {
    test('should add "use client" directive to both JS and CJS files', async () => {
      // Arrange
      const jsContent = `export { Button } from "./button";
export { Input } from "./input";`;

      const cjsContent = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;`;

      const expectedJsContent = `"use client";

export { Button } from "./button";
export { Input } from "./input";`;

      const expectedCjsContent = `"use client";

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;`;

      const filePaths = ["dist/components/index.js", "dist/components/index.cjs"];

      fs.readFile.mockResolvedValueOnce(jsContent).mockResolvedValueOnce(cjsContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText(filePaths, '"use client";\n\n');

      // Assert
      expect(fs.writeFile).toHaveBeenCalledWith(filePaths[0], expectedJsContent, "utf8");
      expect(fs.writeFile).toHaveBeenCalledWith(filePaths[1], expectedCjsContent, "utf8");
    });
  });

  describe("Edge cases", () => {
    test("should handle very large files", async () => {
      // Arrange
      const largeContent = "a".repeat(1000000); // 1MB of content
      const filePath = "dist/components/large-file.js";

      fs.readFile.mockResolvedValue(largeContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText([filePath], '"use client";\n\n');

      // Assert
      expect(fs.writeFile).toHaveBeenCalledWith(filePath, '"use client";\n\n' + largeContent, "utf8");
    });

    test("should handle files with special characters", async () => {
      // Arrange
      const specialContent = `// File with émojis 🚀 and spëcial chars
export { Button } from "./button";`;

      const expectedContent = `"use client";

// File with émojis 🚀 and spëcial chars
export { Button } from "./button";`;

      const filePath = "dist/components/special.js";

      fs.readFile.mockResolvedValue(specialContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText([filePath], '"use client";\n\n');

      // Assert
      expect(fs.writeFile).toHaveBeenCalledWith(filePath, expectedContent, "utf8");
    });

    test('should handle files that already have "use client" directive', async () => {
      // Arrange
      const existingContent = `"use client";

export { Button } from "./button";`;

      const expectedContent = `"use client";

"use client";

export { Button } from "./button";`;

      const filePath = "dist/components/index.js";

      fs.readFile.mockResolvedValue(existingContent);
      fs.writeFile.mockResolvedValue();

      // Act
      await updateFilesWithText([filePath], '"use client";\n\n');

      // Assert
      expect(fs.writeFile).toHaveBeenCalledWith(filePath, expectedContent, "utf8");
    });
  });

  describe("Performance considerations", () => {
    test("should process files sequentially", async () => {
      // Arrange
      const filePaths = ["file1.js", "file2.js", "file3.js"];
      const mockContent = "export default {};";
      let readOrder = [];
      let writeOrder = [];

      fs.readFile.mockImplementation((path) => {
        readOrder.push(path);
        return Promise.resolve(mockContent);
      });

      fs.writeFile.mockImplementation((path) => {
        writeOrder.push(path);
        return Promise.resolve();
      });

      // Act
      await updateFilesWithText(filePaths, '"use client";\n\n');

      // Assert
      expect(readOrder).toEqual(filePaths);
      expect(writeOrder).toEqual(filePaths);
    });
  });
});
