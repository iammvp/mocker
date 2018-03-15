import loremIpsum from 'lorem-ipsum'
import ele from './ele' // ele 新零售专用
class Mock {
  constructor (schema) {
    this.schema = schema // data schema
    this.output = '' // init output
  }

  init () {
    this.parseSchema(this.schema)
    this.wrapForEle()
  }
  getOutput () {
    return JSON.stringify(JSON.parse(this.output), null, 2)
  }
  // 为新零售数据包裹json
  wrapForEle () {
    this.output = '{"error_no": 0,"error_msg": "",' + this.output.substring(1)
  }
  parseSchema (schema, length = 1) {
    for (let i = 0; i < length; i++) {
      this.output += '{'
      schema.forEach((field, fieldIndex) => {
        const isLastField = schema.length === fieldIndex + 1
        this.output += `"${field.key}":`
        switch (field.type) {
          case 'index':
            this.handleIndexType(field, i)
            break
          case 'interge':
            this.handleIntergeType(field)
            break
          case 'float':
            this.handleFloatType(field)
            break
          case 'exactly':
            this.handleExactlyType(field)
            break
          case 'enum':
            this.handleEnumType(field)
            break
          case 'word':
            this.handleWordType(field)
            break
          case 'timestamp':
            this.handleTimestampType(field)
            break
          case 'itemName':
            this.handleItemNameType(field)
            break
          case 'itemCategory':
            this.handleItemCategoryType(field)
            break
          case 'storeAddress':
            this.handleStoreAddressType(field)
            break
          case 'imageUrl':
            this.handleImageUrlType(field)
            break
          case 'imageHash':
            this.handleImageHashType(field)
            break
          case 'object':
            this.parseSchema(field.schema)
            break
          case 'array':
            this.output += '['
            this.parseSchema(field.schema, Number(field.condition) || 10)
            this.output += ']'
            break
          default:
            break
        }
        if (isLastField === true) {
          this.output += '}'
        } else {
          this.output += ','
        }
      })
      if (i !== length - 1) {
        this.output += ','
      }
    }
  }
  /**
     * validate index type
     * @param {object} field
     */
  handleIndexType (field, index) {
    const start = Math.floor(Number(field.condition)) || 1 // default start at 1
    this.output += start + index
  }
  /**
     * handle enum type
     * @param {object} field
     */
  handleEnumType (field) {
    const enumArray = field.condition.split('|')
    const enumLength = enumArray.length
    const randomEnumIndex = this.random(0, enumLength - 1)
    this.output += JSON.stringify(enumArray[randomEnumIndex])
  }
  /**
     * handle Interge type
     * @param {object} field
     */
  handleIntergeType (field) {
    const rangeArray = field.condition.split('|')
    const min = Number(rangeArray[0]) || 1
    const max = Number(rangeArray[1]) || 10
    this.output += this.random(min, max)
  }
  /**
     * handle Float type
     * @param {object} field
     */
  handleFloatType (field) {
    const rangeArray = field.condition.split('|')
    const min = Number(rangeArray[0]) || 1
    const max = Number(rangeArray[1]) || 10
    const decimal = Number(rangeArray[2]) || 10
    this.output += this.random(min, max, decimal)
  }
  /**
     * return a random number between min and max , include min and max
     * @param {number} min
     * @param {number} max
     * @param {number} decimal, decimal place default 0
     * @return {number}
     */
  /**
     * handle exactly type, output exactly field.value
     * @param {object} field
     */
  handleExactlyType (field) {
    this.output += JSON.stringify(field.condition || '未输入定值')
  }
  /**
     * handle word type, default length 10
     * @param {object} field
     */
  handleWordType (field) {
    const length = field.condition || 10
    const word = loremIpsum({
      count: length,
      units: 'words'
    })
    this.output += `"${word}"`
  }
  /**
     * handle date type, default range 1970 to now
     * @param {object} field
     */
  handleTimestampType (field) {
    /*  default start 0  default start 0 */
    const timestampArray = field.condition.split('|')
    const start = new Date(timestampArray[0]).getTime() || 0
    const end = new Date(timestampArray[1]).getTime() || new Date().getTime()
    const randomTime = this.random(start, end)
    this.output += `"${randomTime}"`
  }
  /**
     * handle ele type, generate a reasonable value randomly
     */
  handleItemNameType () {
    this.output += `"${ele.getItemName()}"`
  }
  handleImageHashType () {
    this.output += `"${ele.getImageHash()}"`
  }
  handleImageUrlType () {
    this.output += `"${ele.getImageUrl()}"`
  }
  handleItemCategoryType () {
    this.output += `"${ele.getCategory()}"`
  }
  handleStoreAddressType () {
    this.output += `"${ele.getStoreAddress()}"`
  }
  random (min, max, decimal = 0) {
    if (decimal === 0) {
      return Math.floor(Math.random() * ((max - min) + 1)) + min
    }
    return (Math.random() * ((max - min) + 1) + min).toFixed(decimal)
  }
}
export default Mock
