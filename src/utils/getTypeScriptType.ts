import StyleDictionary from "style-dictionary";
const { getTypeScriptType: _getTypeScriptType } = StyleDictionary.formatHelpers;

export function getTypeScriptType(value: any) {
  const type = _getTypeScriptType(value);
  // 01や02などゼロから始まる数値リテラルになっている箇所をクオートする
  return type.replace(/\b0\d+\b/g, (match) => `"${match}"`);
}
