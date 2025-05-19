import { TestCase } from "../lib/testcase.mjs"

const testCases = [
  new TestCase(
    "TestCase class test case 1",
    "Input should be equal to expected result",
    "test",
    "test",
  ),
]

describe.each(testCases)(
  "$name",
  (testCases) => {
    test(`${testCases.description}`, () => {
      expect(testCases.input)
        .toBe(testCases.expectedResult)
    })
  },
)
