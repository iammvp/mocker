<template>
  <div class="container">
    <Header/>
    <Schema :schema="schema"/>
    <Generate :schema="schema"/>
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
  }
}
</script>

<style>

</style>
