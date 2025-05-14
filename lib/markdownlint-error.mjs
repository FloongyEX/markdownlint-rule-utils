// This class is used to represent a position of a linting error in a file
export class Position {
  /*
   * @param {number} lineNumber - The line number of the error
   * @param {number|null} columnNumber - The column number of the error
   */
  constructor(
    lineNumber,
    columnNumber = null,
  ) {
    this.lineNumber = lineNumber
    this.columnNumber = columnNumber
  }

  equals(other) {
    if (!(other instanceof Position))
      return false

    return (
      this.lineNumber === other.lineNumber
      && this.columnNumber === other.columnNumber
    )
  }
}

// This class is used to represent the details of a linting error
export class ErrorDetail {
  /*
   * @param {string[]} ruleNames - The names of the rules that caused the error
   * @param {string} ruleDescription - The description of the rule
   * @param {string} file - The name of the file where the error occurred
   * @param {Position} position - The position of the error
   * @param {string|null} detail - The detail of the error
   * @param {string|null} context - The context of the error
   */
  constructor(
    ruleNames,
    ruleDescription,
    file,
    position,
    detail = null,
    context = null,
  ) {
    this.ruleName = ruleNames.join("/")
    this.description = ruleDescription
    this.fileName = file
    this.position = position
    this.context = context
    this.detail = detail
  }

  equals(other) {
    if (!(other instanceof ErrorDetail))
      return false

    return (
      this.ruleName === other.ruleName
      && this.description === other.description
      && this.fileName === other.fileName
      && this.position.equals(other.position)
      && this.context === other.context
      && this.detail === other.detail
    )
  }
}
