// This class is used to represent a test case for a linting rule
export class TestCase {
  constructor(
    name,
    description,
    input,
    expectedResult,
  ) {
    this.name = name
    this.description = description
    this.input = input
    this.expectedResult = expectedResult
  }
}
