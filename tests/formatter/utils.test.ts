import StyleDictionary from "style-dictionary";
import { describe, it, expect } from "vitest";
const { getTypeScriptType } = StyleDictionary.formatHelpers;

describe("getTypeScriptType", () => {
  it("通常の数値を正しく処理する", () => {
    const input = { value: 10 };
    const output = getTypeScriptType(input);
    expect(output).toEqual("{ value: number }");
  });

  it("キーが01のオブジェクトを正しく処理する", () => {
    const input = {
      "01": { value: 10 },
      "02": { value: 20 },
    };
    const output = getTypeScriptType(input);
    expect(output).toEqual(
      `{ "01": { value: number }, "02": { value: number } }`
    );
  });
});
