<template>
  <div class="generate">
    <p class="done" @click="download">生成数据</p>
    <p class="export" @click="exportConfig">导出配置</p>
    <p class="import" @click="importConfig">导入配置</p>
    <form enctype="multipart/form-data" v-show="false">
      <input @change="uploaded($event)" id="upload" type=file ref="upload" accept="text/json" name="files[]" size=30>
    </form>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import Mock from '../lib/Mock'
export default {
  name: 'generate',
  props: ['schema', 'loadConfig'],
  data () {
    return {
      file: undefined
    }
  },
  watch: {
    file: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },
  methods: {
    download () {
      const mock = new Mock(this.schema)
      mock.init()
      const output = mock.getOutput()
      const blob = new Blob([output], {type: 'text/json;charset=utf-8'})
      FileSaver.saveAs(blob, 'mock.json', false)
    },
    exportConfig () {
      const config = JSON.stringify(this.schema)
      const blob = new Blob([config], {type: 'text/json;charset=utf-8'})
      FileSaver.saveAs(blob, 'config.json', false)
    },
    importConfig () {
      this.$refs.upload.click()
    },
    uploaded (e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      const self = this
      reader.onload = (function (theFile) {
        return function (ev) {
          self.$emit('loadConfig', ev.target.result)
        }
      })(file)
      reader.readAsText(file)
    }
  },
  mounted () {
  }
}
</script>

<style>
  .generate{
    padding-left: 20px;
    display: flex;
  }
  .done,.import,.export{
    width: 100px;
    height: 32px;
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
    background-color: #5cb85c;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
</style>
