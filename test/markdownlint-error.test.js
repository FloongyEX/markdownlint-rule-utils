import { ErrorDetail, Position, parseLintErrorOutputs } from "../lib/markdownlint-error.mjs"
import { TestCase } from "../lib/testcase.mjs"

const errorDetails = [
  new ErrorDetail(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    "test detail",
    "test context"
  ),
  new ErrorDetail(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    null,
    null
  ),
  new ErrorDetail(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    null,
    null
  ),
  new ErrorDetail(
    ["test001", "test"],
    "test description",
    "test2.md",
    new Position(1, 1),
    null,
    null
  ),
  new ErrorDetail(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(3),
    null,
    null
  ),
  new ErrorDetail(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    "test detail",
    null
  ),
  new ErrorDetail(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    null,
    "test context"
  ),
  new ErrorDetail(
    ["test002", "test2"],
    "test2 description",
    "test.md",
    new Position(1, 1),
    null,
    null
  ),
]

const positionComparisonTestCases = [
  new TestCase(
    "Position comparison test case 1",
    "Position and non-Position should not be equal.",
    {
      pos1: errorDetails[0].position,
      pos2: null,
    },
    false
  ),
]

const errorDetailStringTestCases = [
  new TestCase(
    "Error detail string test case 1",
    "errorDetail.toString() should return the correct error detail string",
    errorDetails[1],
    `test.md:1:1 test001/test test description`,
  ),
  new TestCase(
    "Error detail string test case 2",
    "errorDetail.toString() should return the correct error detail string that without column number.",
    errorDetails[4],
    `test.md:3 test001/test test description`,
  ),
  new TestCase(
    "Error detail string test case 3",
    "errorDetail.toString() should return the correct error detail string that includes all information.",
    errorDetails[0],
    `test.md:1:1 test001/test test description [test detail] [Context: "test context"]`,
  ),
]

const errorDetailComparisonTestCases = [
  new TestCase(
    "Error detail comparison test case 1",
    "Error detail should be equal.",
    {
      detail1: errorDetails[1],
      detail2: errorDetails[2],
    },
    true
  ),
  new TestCase(
    "Error detail comparison test case 2",
    "Error detail should not be equal, because of different file names.",
    {
      detail1: errorDetails[1],
      detail2: errorDetails[3],
    },
    false
  ),
  new TestCase(
    "Error detail comparison test case 3",
    "Error detail should not be equal, because of different positions.",
    {
      detail1: errorDetails[1],
      detail2: errorDetails[4],
    },
    false
  ),
  new TestCase(
    "Error detail comparison test case 4",
    "Error detail should not be equal, because of different error details.",
    {
      detail1: errorDetails[1],
      detail2: errorDetails[5],
    },
    false
  ),
  new TestCase(
    "Error detail comparison test case 5",
    "Error detail should not be equal, because of different contexts.",
    {
      detail1: errorDetails[1],
      detail2: errorDetails[6],
    },
    false
  ),
  new TestCase(
    "Error detail comparison test case 6",
    "Error detail should not be equal, because of different rules.",
    {
      detail1: errorDetails[1],
      detail2: errorDetails[7],
    },
    false
  ),
  new TestCase(
    "Error detail comparison test case 7",
    "Error detail and non-ErrorDetail should not be equal.",
    {
      detail1: errorDetails[1],
      detail2: null,
    },
    false
  ),
]

const errorOutputsParsingTestCases = [
  new TestCase(
    "Error outputs parsing test case 1",
    "parseErrorOutputs() should parse error outputs correctly.",
    errorDetailStringTestCases.map((testCase) => testCase.expectedResult).join("\n"),
    errorDetailStringTestCases.map((testCase) => testCase.input),
  ),
  new TestCase(
    "Error outputs parsing test case 2",
    "parseErrorOutputs() should return an empty array when the input have no invalid error outputs.",
    "This is a test string without error outputs.",
    [],
  ),
]

describe.each(positionComparisonTestCases)(
  "$name",
  ({ description, input, expectedResult }) => {
    test(`${description}`, () => {
      const { pos1, pos2 } = input

      expect(pos1.equals(pos2))
        .toBe(expectedResult)
    })
  }
)

describe.each(errorDetailStringTestCases)(
  "$name",
  ({ description, input, expectedResult }) => {
    test(`${description}`, () => {
      const errorDetail = input

      expect(errorDetail.toString())
        .toBe(expectedResult)
    })
  }
)

describe.each(errorDetailComparisonTestCases)(
  "$name",
  ({ description, input, expectedResult }) => {
    test(`${description}`, () => {
      const { detail1, detail2 } = input

      expect(detail1.equals(detail2))
        .toBe(expectedResult)
    })
  }
)

describe.each(errorOutputsParsingTestCases)(
  "$name",
  ({ description, input, expectedResult }) => {
    test(`${description}`, () => {
      const errorOutputs = input

      const parsedErrorDetails = parseLintErrorOutputs(errorOutputs)

      expect(parsedErrorDetails)
        .toEqual(expectedResult)
    })
  }
)
