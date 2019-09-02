<template>
  <div class="wrapper">
      <div>
         <el-input type="text" placeholder="请输入内容" v-model="ipt" style="width:357px;height:40px;" :maxlength="20" :show-word-limit="true"></el-input>
      </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
		ipt:111
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
</style>