/* 为新零售定制数据 */
const ele = {
  'district': ['海淀', '朝阳', '东城', '西城', '石景山', '丰台'], // 生成地址 区
  'street': ['信息路', '马连洼北路', '高粱桥斜街', '西直门北大街', '上地西路', '上地五街', '长安街', '洋房街道'], // 生成地址 街道
  'storeName': ['邻家便利店', '京客隆', '新华联超市', '华欣超市', '爱鲜蜂盛同源网络超市', '汇通超市（西二旗店）', '农夫山泉专卖店', '私人订制鲜花店（一分店）'], // 商店名称
  'category': ['方便速食', '数码配件', '饮用水', '碳酸饮料', '果汁茶饮', '坚果', '卫生纸系列', '洗发液 洗衣液 用品', '店家推荐', '土豪专区', '蓝色妖姬专场', '礼盒专区'], // 分类
  'productBrande': ['益达', '旺仔', '哇哈哈', '伊利', '蒙牛', '双汇', '金锣', '绿箭', '雀巢', '哈哈镜', '哈尔滨'], // 商品品牌
  'productDesc': ['木糖醇无糖口香糖', '养乐多', '高钙纯牛奶', '王中王火腿肠', '天然矿泉水', '乳酸菌饮料', '小馒头', '酸奶', '五仁月饼'], // 商品描述
  'productQuantity': ['100ml*3包', '58g*2合', '200g*5袋'],
  'imageUrl': [
    'http://img.waimai.baidu.com/pb/0124288808a957018de22b309fd6fb8be5',
    'http://img.waimai.baidu.com/pb/3e48315ce98b1a14730df73241dc99d90e',
    'http://img.waimai.baidu.com/pb/4c78a6f81d47742109b47f6a31ec902bbf',
    'https://fuss10.elemecdn.com/3/43/5ebf43c76d56dadda7f75e5e317cbpng.png',
    'https://img.waimai.baidu.com/pb/9034ebfd7dd7ae0c706e82699f6bc5ac7a'
  ], // 图片 url
  'imageHash': [
    '34ebfd7dd7ae0c706e82699f6bc5ac7ajpeg',
    '874487830a2d0f64da4bb146e5633ee6jpeg',
    '56a2c50fdf786080eb649e67ecb5e1c9jpeg',
    '6a933cace91b0658e0facfc700d2ade5jpeg',
    '78a6f81d47742109b47f6a31ec902bbfjpeg',
    '24288808a957018de22b309fd6fb8be5jpeg'
  ], // 图片hash
  random (min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min
  },
  getRandomValueByProperty (property) {
    const len = this[property].length
    const index = this.random(0, len - 1)
    return this[property][index]
  },
  getImageUrl () {
    return this.getRandomValueByProperty('imageUrl')
  },
  getImageHash () {
    return this.getRandomValueByProperty('imageHash')
  },
  getStoreAddress () {
    return this.getRandomValueByProperty('district') + '区' + this.getRandomValueByProperty('street') + this.random(10, 30) + '号'
  },
  getCategory () {
    return this.getRandomValueByProperty('category')
  },
  getItemName () {
    return this.getRandomValueByProperty('productBrande') + '\u0020' + this.getRandomValueByProperty('productDesc') + '\u0020' + this.getRandomValueByProperty('productQuantity')
  }
}

export default ele
