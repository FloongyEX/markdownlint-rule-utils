export function lintError(
  {
    rule = {
      names: null,
      description: null,
      information: null,
    },
    lineNumber = null,
    errorRange = null,
    errorDetail = null,
    errorContext = null,
    fixInfo = null,
  } = {}
) {
  return {
    lineNumber: lineNumber,
    ruleNames: rule.names,
    ruleDescription: rule.description,
    ruleInformation: rule.information,
    errorDetail: errorDetail,
    errorContext: errorContext,
    errorRange: errorRange,
    fixInfo: fixInfo,
  }
}
