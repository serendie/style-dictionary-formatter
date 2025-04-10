import { cssWithTheme } from "./formatter/cssWithTheme";
import { jsModule, jsModuleDeclarations } from "./formatter/jsModule";
import { pandaToken, pandaTokenDeclarations } from "./formatter/pandaToken";
import { tokenList, tokenListDeclarations } from "./formatter/tokenList";
import { filenameToTheme } from "./parser/filenameToTheme";
import { cssShadow } from "./transformer/cssShadow";
import { cssTypography } from "./transformer/cssTypography";
import { robotoToInherit } from "./transformer/robotoToInherit";
export { customFileHeader } from "./customFileHeader";

// プロジェクト側のStyleDictionaryを受け取って登録する
export function registerTransformer(sd = require("style-dictionary")) {
  sd.registerTransform(cssShadow);
  sd.registerTransform(cssTypography);
  sd.registerTransform(robotoToInherit);
}

export function registerFormatter(sd = require("style-dictionary")) {
  sd.registerFormat(cssWithTheme);
  sd.registerFormat(jsModule);
  sd.registerFormat(jsModuleDeclarations);
  sd.registerFormat(pandaToken);
  sd.registerFormat(pandaTokenDeclarations);
  sd.registerFormat(tokenList);
  sd.registerFormat(tokenListDeclarations);
}

export function registerParser(sd = require("style-dictionary")) {
  sd.registerParser(filenameToTheme);
}

export function registerAll(sd = require("style-dictionary")) {
  registerFormatter(sd);
  registerParser(sd);
  registerTransformer(sd);
}
