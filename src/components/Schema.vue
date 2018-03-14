<template>
  <div class="section">
    <div class="singleProperty" v-for="(s,index) in schema" :key="index" :style="paddingLeft">
      <div class="row">
        <input class="key" type="text" v-model="s.key" :style="inputStyle">
        <select class="type" v-model="s.type" @change="changeType(s)" :style="inputStyle">
          <option  v-for="(t, tindex) in types" :key="tindex" :value="t.key">{{t.desc}}</option>
        </select>
        <input v-if="s.placeholder" class="condition" type="text" :placeholder="s.placeholder" :title="s.placeholder" v-model="s.condition" :style="inputStyle">
        <span v-if="s.type === 'object' || s.type === 'array'" class="add" @click="addProperty(s)" :style="markStyle">+</span>
        <span v-if="s.isRoot !== true" class="remove" @click="removeProperty(index)" :style="markStyle">-</span>
      </div>
      <div v-if="s.type === 'object' || s.type === 'array'">
        <schemas :schema="s.schema"/>
      </div>
    </div>
  </div>
</template>

<script>
import randomColor from 'randomcolor'
import types from '../config/type'
import rootTypes from '../config/rootType'
import placeholderDict from '../config/placeholderDict'
export default {
  name: 'schemas',
  props: ['schema'],
  data () {
    this.types = this.schema[0].isRoot === true ? rootTypes : types
    /* 新建属性计数 */
    this.newPropertyId = 1
    this.color = randomColor()
    return {
      paddingLeft: {
        borderLeft: `2px solid ${this.color}`
      },
      inputStyle: {
        border: `1px solid ${this.color}`
      },
      markStyle: {
        backgroundColor: `${this.color}`
      }
    }
  },
  methods: {
    addProperty (s) {
      /* 新建默认属性 */
      const newProperty = {
        'key': 'newProperty' + this.newPropertyId++,
        'type': 'index',
        'condition': '',
        'placeholder': '从多少开始?默认1'
      }
      s.schema.push(newProperty)
    },
    removeProperty (index) {
      this.schema.splice(index, 1)
    },
    changeType (s) {
      if (s.type === 'array' || s.type === 'object') {
        s.condition = ''
        if (s.type === 'array') {
          s.placeholder = placeholderDict[s.type]
        } else {
          delete s['placeholder']
        }
        if (s.hasOwnProperty('schema') !== true) {
          this.$set(s, 'schema', [])
          /* 新建默认属性 */
          const newProperty = {
            'key': 'newProperty' + this.newPropertyId++,
            'type': 'index',
            'condition': '',
            'placeholder': '从多少开始?默认1'
          }
          s.schema.push(newProperty)
        }
      } else {
        s.placeholder = placeholderDict[s.type]
        s.condition = ''
        delete s['schema']
      }
    }
  }

}
</script>

 <style lang="less" scoped>
.section{
  padding-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.singleProperty{
  padding-left: 15px;
  margin-bottom: 5px;
  .row{
    display: flex;
    align-items: center;
    .key,.type,.condition{
      height: 30px;
      width: 160px;
      padding: 0px;
      text-indent: 8px;
      font-size: 14px;
      margin-right: 15px;
      border-radius: 0;
    }
    .add,.remove{
      font-size: 20px;
      width: 32px;
      cursor: pointer;
      text-align: center;
      color: #fff;
      margin-right: 15px;
    }
  }
}
</style>
