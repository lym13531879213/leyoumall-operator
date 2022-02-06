<template>

  <el-tree
    ref="tree"
    :data="treedata"
    node-key="catId"
    :props="{label:'name',children:'children'}"
    @node-click="nodeClick"
  />

</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['treedata'],
  methods: {
    nodeClick(data, node, component) {
      console.log(data, node, component)
    }
  }
}
</script>

<style>

</style>
