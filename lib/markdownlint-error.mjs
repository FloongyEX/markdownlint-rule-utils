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

  toString() {
    if (this.columnNumber === null)
      return `:${this.lineNumber}`
    else
      return `:${this.lineNumber}:${this.columnNumber}`
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

  toString() {
    let result = `${this.fileName}${this.position.toString()} ${this.ruleName} ${this.description}`

    if (this.detail)
      result += ` [${this.detail}]`
    if (this.context)
      result += ` [Context: "${this.context}"]`

    return result
  }
}

const LINT_ERROR_REGEX = /^([^:]+):(\d+)(?::(\d+))?\s([^\s]+)\s([^[]+?)(?:\s\[(?!Context:)([^\]]+)\])?(?:\s\[Context:\s"([^"]+)"\])?\s*$/

export function parseLintErrorOutputs(
  outputs = "",
) {
  const errorLines = outputs.split("\n")
  const details = []

  for (const line of errorLines) {
    const match = line.match(LINT_ERROR_REGEX)

    if (!match)
      continue

    const fileName = match[1]
    const lineNumber = parseInt(match[2], 10)
    const columnNumber = match[3] ? parseInt(match[3], 10) : null
    const ruleNames = match[4].split("/")
    const description = match[5]
    const detail = match[6] ?? null
    const context = match[7] ?? null

    const position = new Position(lineNumber, columnNumber)

    details.push(new ErrorDetail(
      ruleNames,
      description,
      fileName,
      position,
      detail,
      context
    ))
  }

  return details
}
