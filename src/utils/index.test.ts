import { cn } from "~/utils/index";

describe("cn function", () => {
  test("returns classes correctly", () => {
    expect(cn("")).toEqual("");
    expect(cn("class1 class2", "class3 class4")).toEqual("class1 class2 class3 class4");
  });

  test("override classes correctly", () => {
    expect(cn("m-4 h-23 pr-3", "m-3")).toEqual("h-23 pr-3 m-3");
  });
});
