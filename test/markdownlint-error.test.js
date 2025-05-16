import { ErrorInfo, Position, parseLintErrorOutputs } from "../lib/markdownlint-error.mjs"
import { TestCase } from "../lib/testcase.mjs"

const errorInfoList = [
  new ErrorInfo(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    "test detail",
    "test context"
  ),
  new ErrorInfo(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    null,
    null
  ),
  new ErrorInfo(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    null,
    null
  ),
  new ErrorInfo(
    ["test001", "test"],
    "test description",
    "test2.md",
    new Position(1, 1),
    null,
    null
  ),
  new ErrorInfo(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(3),
    null,
    null
  ),
  new ErrorInfo(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    "test detail",
    null
  ),
  new ErrorInfo(
    ["test001", "test"],
    "test description",
    "test.md",
    new Position(1, 1),
    null,
    "test context"
  ),
  new ErrorInfo(
    ["test002", "test2"],
    "test2 description",
    "test.md",
    new Position(1, 1),
    null,
    null
  ),
]

const positionEqualityTestCases = [
  new TestCase(
    "Position equality test case 1",
    "Position object and non-Position object should not be equal.",
    {
      pos1: errorInfoList[0].position,
      pos2: null,
    },
    false
  ),
]

const errorStringTestCases = [
  new TestCase(
    "ErrorInfo string test case 1",
    "ErrorInfo toString() should return the correct error string",
    errorInfoList[1],
    `test.md:1:1 test001/test test description`,
  ),
  new TestCase(
    "ErrorInfo string test case 2",
    "ErrorInfo toString() should return the correct error string that without column number.",
    errorInfoList[4],
    `test.md:3 test001/test test description`,
  ),
  new TestCase(
    "ErrorInfo string test case 3",
    "ErrorInfo toString() should return the correct error string that includes all information.",
    errorInfoList[0],
    `test.md:1:1 test001/test test description [test detail] [Context: "test context"]`,
  ),
]

const errorInfoEqualityTestCases = [
  new TestCase(
    "ErrorInfo equality test case 1",
    "ErrorInfo object that have the same properties should be equal.",
    {
      info1: errorInfoList[1],
      info2: errorInfoList[2],
    },
    true
  ),
  new TestCase(
    "ErrorInfo equality test case 2",
    "ErrorInfo should not be equal, because of different file names.",
    {
      info1: errorInfoList[1],
      info2: errorInfoList[3],
    },
    false
  ),
  new TestCase(
    "ErrorInfo equality test case 3",
    "ErrorInfo should not be equal, because of different positions.",
    {
      info1: errorInfoList[1],
      info2: errorInfoList[4],
    },
    false
  ),
  new TestCase(
    "ErrorInfo equality test case 4",
    "ErrorInfo should not be equal, because of different error infos.",
    {
      info1: errorInfoList[1],
      info2: errorInfoList[5],
    },
    false
  ),
  new TestCase(
    "ErrorInfo equality test case 5",
    "ErrorInfo should not be equal, because of different contexts.",
    {
      info1: errorInfoList[1],
      info2: errorInfoList[6],
    },
    false
  ),
  new TestCase(
    "ErrorInfo equality test case 6",
    "ErrorInfo should not be equal, because of different rules.",
    {
      info1: errorInfoList[1],
      info2: errorInfoList[7],
    },
    false
  ),
  new TestCase(
    "ErrorInfo equality test case 7",
    "ErrorInfo object and non-Errorinfo object should not be equal.",
    {
      info1: errorInfoList[1],
      info2: null,
    },
    false
  ),
]

const errorOutputsParsingTestCases = [
  new TestCase(
    "Error outputs parsing test case 1",
    "parseLintErrorOutputs() should correctly parse all kind of invalid error outputs.",
    errorStringTestCases.map((testCase) => testCase.expectedResult).join("\n"),
    errorStringTestCases.map((testCase) => testCase.input),
  ),
  new TestCase(
    "Error outputs parsing test case 2",
    "parseLintErrorOutputs() should return an empty array when the input have no invalid error outputs.",
    "This is a test string without error outputs.",
    [],
  ),
]

describe.each(positionEqualityTestCases)(
  "$name",
  ({ description, input, expectedResult }) => {
    test(`${description}`, () => {
      const { pos1, pos2 } = input

      expect(pos1.equals(pos2))
        .toBe(expectedResult)
    })
  }
)

describe.each(errorStringTestCases)(
  "$name",
  ({ description, input, expectedResult }) => {
    test(`${description}`, () => {
      const errorInfo = input

      expect(errorInfo.toString())
        .toBe(expectedResult)
    })
  }
)

describe.each(errorInfoEqualityTestCases)(
  "$name",
  ({ description, input, expectedResult }) => {
    test(`${description}`, () => {
      const { info1, info2 } = input

      expect(info1.equals(info2))
        .toBe(expectedResult)
    })
  }
)

describe.each(errorOutputsParsingTestCases)(
  "$name",
  ({ description, input, expectedResult }) => {
    test(`${description}`, () => {
      const errorOutputs = input

      const parsedErrorInfoList = parseLintErrorOutputs(errorOutputs)

      expect(parsedErrorInfoList)
        .toEqual(expectedResult)
    })
  }
)
