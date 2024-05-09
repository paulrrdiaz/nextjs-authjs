import isEqual from 'lodash/isEqual'
import isUndefined from 'lodash/isUndefined'
import kebabCase from 'lodash/kebabCase'
import omitBy from 'lodash/omitBy'
import pick from 'lodash/pick'
import toPairs from 'lodash/toPairs'

const getObjectDiff = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
  compareRef = false,
) => {
  return Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key)
    } else if (isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key)

      if (compareRef && obj1[key] !== obj2[key]) {
        result[resultKeyIndex] = `${key} (ref)`
      } else {
        result.splice(resultKeyIndex, 1)
      }
    }
    return result
  }, Object.keys(obj2))
}

export { getObjectDiff, isUndefined, kebabCase, omitBy, pick, toPairs }
