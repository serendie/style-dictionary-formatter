import StyleDictionary from "style-dictionary";
import { describe, it, expect } from "vitest";
import { valueTypeConverter } from "../../src/formatter/utils";
const { getTypeScriptType } = StyleDictionary.formatHelpers;

describe("valueTypeConverter", () => {
  it("通常の数値を正しく処理する", () => {
    const input = { value: 10 };
    const output = valueTypeConverter(input);
    expect(output).toEqual({ value: 10 });
  });

  it("先頭が0の数値を処理する", () => {
    // JavaScriptでは05のような記述は8進数として解釈されるため、
    // 実際には5が渡されることになる。ここでは文字列として渡す
    const input = { value: "05" };
    const output = valueTypeConverter(input);
    expect(output).toEqual({ value: "05" });
  });

  it("16進数の色コードを処理する", () => {
    const input = { value: "#FF5500" };
    const output = valueTypeConverter(input);
    expect(output).toEqual({ value: "#FF5500" });
  });

  it("オブジェクト内のネストされた値を処理する", () => {
    const input: Record<string, any> = {
      color: "#FF5500",
      size: "05",
      nested: {
        color: "#00FF00",
        size: "02",
      },
    };
    const output = valueTypeConverter(input);
    expect(output).toEqual({
      color: "#FF5500",
      size: "05",
      nested: {
        color: "#00FF00",
        size: "02",
      },
    });
  });

  it("特定のキーの文字列値を数値に変換する", () => {
    const input = {
      offsetX: "10px",
      offsetY: "5px",
      blur: "2px",
      spread: "1px",
    };
    const output = valueTypeConverter(input);
    // 現在の実装では、これらの値は数値に変換されることが期待される
    // ただし、これがエラーの原因である可能性もある
    expect(output).toEqual({
      offsetX: 10,
      offsetY: 5,
      blur: 2,
      spread: 1,
    });
  });
});

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
