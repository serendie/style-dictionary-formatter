import StyleDictionary from "style-dictionary";
const { getTypeScriptType: _getTypeScriptType } = StyleDictionary.formatHelpers;

export function getTypeScriptType(value: any) {
  const type = _getTypeScriptType(value);
  // 01や02などがリテラルになっている箇所をクオートする
  const regex = /(\d+)/g;
  return type.replace(regex, '"$1"');
}
