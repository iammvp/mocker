<template>
  <div class="container">
    <Header/>
    <Schema :schema="schema"/>
    <Generate :schema="schema" @loadConfig="loadedConfig"/>
  </div>
</template>

<script>
import Schema from './Schema'
import Generate from './Generate'
import Header from './Header'
import defaultSchema from '../config/defaultSchema'

export default {
  name: 'Main',
  components: {
    Header,
    Schema,
    Generate
  },
  data () {
    return {
      schema: defaultSchema
    }
  },
  methods: {
    loadedConfig (value) {
      this.schema = JSON.parse(value)
    }
  }
}
</script>

<style>

</style>
