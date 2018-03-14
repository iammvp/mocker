<template>
  <div class="generate">
    <p class="done" @click="download">生成数据</p>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import Mock from '../lib/Mock'
export default {
  name: 'generate',
  props: ['schema'],
  data () {
    return {

    }
  },
  methods: {
    download () {
      const mock = new Mock(this.schema)
      mock.init()
      const output = mock.getOutput()
      const blob = new Blob([output], {type: 'text/json;charset=utf-8'})
      FileSaver.saveAs(blob, 'mock.json', false)
    }
  }
}
</script>

<style>
  .generate{
    padding-left: 20px;
  }
  .done{
    width: 100px;
    height: 32px;
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
    background-color: #5cb85c;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
