/* 默认 schema */
const defaultSchema = [
  {
    'key': 'result',
    'isRoot': true,
    'type': 'array',
    'condition': '',
    'placeholder': '生成多少条数据?',
    'schema': [
      {
        'key': 'item_id',
        'type': 'index',
        'condition': '',
        'placeholder': '从多少开始?默认1'
      }
    ]
  }
]
export default defaultSchema
