<template>

  <div class="block">
    <el-cascader
      ref="cascade"
      v-model="value"
      :options="options"
      filterable
      clearable
      :placeholder="title"
      :props="{label:'name',value:'catId',checkStrictly:checkStrictly }"
      @change="handleChange"
    />

  </div>

</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['valuedata', 'options', 'title', 'belong', 'checkStrictly'],
  data() {
    return {
      value: null,
      belongData: null
    }
  },
  watch: {
    belong: {
      handler: function(n, o) {
        this.belongData = n
      },
      immediate: true,
      deep: true
    },
    valuedata: {
      handler: function(n, o) {
        this.value = n
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleChange(value) {
      console.log(this.$refs['cascade'])
      this.$emit('choose', this.belongData, value)
    }
  }
}
</script>

<style>

</style>
