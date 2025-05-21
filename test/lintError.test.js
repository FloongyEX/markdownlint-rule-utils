import { TestCase } from "../lib/testcase.mjs"
import { lintError } from "../lib/lintError.mjs"

const testCases = [
  new TestCase(
    "lintError test case 1",
    "pass empty object",
    {},
    {
      lineNumber: null,
      ruleNames: null,
      ruleDescription: null,
      ruleInformation: null,
      errorDetail: null,
      errorContext: null,
      errorRange: null,
      fixInfo: null,
    },
  ),
  new TestCase(
    "lintError test case 2",
    "pass partial object",
    {
      rule: {
        names: ["rulename", "rulealias"],
        description: "description",
        information: new URL("https://example.com")
      },
      lineNumber: 1,
      errorDetail: "error detail",
      errorContext: "error context",
    },
    {
      lineNumber: 1,
      ruleNames: ["rulename", "rulealias"],
      ruleDescription: "description",
      ruleInformation: new URL("https://example.com"),
      errorDetail: "error detail",
      errorContext: "error context",
      errorRange: null,
      fixInfo: null,
    },
  ),
  new TestCase(
    "lintError test case 3",
    "pass full object",
    {
      rule: {
        names: ["rulename", "rulealias"],
        description: "description",
        information: new URL("https://example.com")
      },
      lineNumber: 1,
      errorRange: [1, 2],
      errorDetail: "error detail",
      errorContext: "error context",
      fixInfo: {},
    },
    {
      lineNumber: 1,
      ruleNames: ["rulename", "rulealias"],
      ruleDescription: "description",
      ruleInformation: new URL("https://example.com"),
      errorDetail: "error detail",
      errorContext: "error context",
      errorRange: [1, 2],
      fixInfo: {},
    },
  ),
]

describe.each(testCases)(
  "$name",
  (testcase) => {
    test(`${testcase.description}`, () => {
      const result = lintError(testcase.input)

      expect(result).toEqual(testcase.expectedResult)
    })
  },
)
