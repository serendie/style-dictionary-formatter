import { describe, it, expect, beforeEach } from "vitest";
import StyleDictionary from "style-dictionary";
import fs from "fs";
import path from "path";
import { pandaToken } from "../../src/formatter/pandaToken";
import { customFileHeader, registerAll } from "../../src/index";

const files = [
  {
    destination: "tokens.js",
    format: "serendie/jsModule",
  },
  {
    destination: "tokens.d.ts",
    format: "serendie/jsModuleDeclarations",
  },
  {
    destination: "panda-tokens.d.ts",
    format: "serendie/pandaTokenDeclarations",
  },
];

describe("pandaToken", () => {
  // 各テスト前に必要な登録を行う
  beforeEach(() => {
    // 登録済みのフォーマットをクリア
    StyleDictionary.format = {};
    // フォーマッターを登録
    StyleDictionary.registerFormat(pandaToken);
    // 必要な登録を行う
    registerAll();
    // dist内のファイルを削除
    fs.rmSync("dist", { recursive: true, force: true });
  });

  it("実際のトークンデータでエラーなく生成されることを確認する", () => {
    // style-dictionaryの設定 - 実際のトークンデータ
    const sd = StyleDictionary.extend({
      source: ["tests/fixtures/*.json"],
      platforms: {
        js: {
          transformGroup: "js",
          buildPath: "dist/",
          options: {
            fileHeader: customFileHeader,
          },
          files,
        },
      },
    });

    sd.buildAllPlatforms();

    files.forEach((file) => {
      // 生成されたファイルを読み込む
      const generatedFile = fs.readFileSync(
        path.join("dist", file.destination),
        "utf8"
      );

      // TypeScript構文のエラーをチェック
      if (generatedFile.trim()) {
        // 0で始まる数値（エラーの原因）がリテラルとして含まれていないか確認
        expect(generatedFile).toContain('"05"');

        // 色コードが文字列として出力されていることを確認
        expect(generatedFile.toLowerCase()).toContain('"#ff5500"');
      }
    });
  });
});
