export const getFieldType = (valueType: string, optionSetValue: boolean) => {

  if (optionSetValue) {
    return 'select'
  }
  switch (valueType) {
    case 'DATE':
    case 'DATETIME':
      return 'date-picker'
    case 'LONG_TEXT':
      return 'textarea'
    default:
      return 'input'
  }
}

export const getRule = (valueType: string) => {
  switch (valueType) {
    case 'DATE':
    case 'DATETIME':
      return 'date'
    case 'NUMBER':
      return 'number'
    case 'EMAIL':
      return 'email'
    case 'INTEGER':
      return 'integer'
    case 'BOOLEAN':
      return 'boolean'
    default:
      return 'string'
  }
}

export const colors = (value: string) => {
  if (value === '-') {
    return 'none'
  }

  const valueFloat = parseFloat(value)

  if (valueFloat >= 0 && valueFloat < 50) {
    return '#A42626';
  }

  if (valueFloat >= 50 && valueFloat < 70) {
    return '#CC0000';
  }
  if (valueFloat >= 70 && valueFloat < 90) {
    return '#FFFF01';
  }
  if (valueFloat >= 90 && valueFloat < 95) {
    return '#62F091';
  }
  if (valueFloat >= 95 && valueFloat <= 100) {
    return '#109909';
  }

  return 'none'
}
