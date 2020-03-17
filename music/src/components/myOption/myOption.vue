<template>
  <li class="my-option" @click="test" >{{label}}</li>
</template>

<script>
export default {
  props:{
    value: '',
    label: {
      default: '',
      type: String
    },
  },
  methods:{
    test(val){
      //document.getElementById('mySelectWrap').style.display = 'none';
      document.getElementById('toolsPeople').value = this.value;
    }
  }
}
</script>
<style scoped>
.my-option{
  display: block;
  padding: 0 10px;
  height: 34px;
  background-color: #fff;
  list-style: none;
  color: #242424;
  line-height: 34px;
  font-size: 14px;
  font-size: 500;
  cursor: pointer;
  user-select: none;
}
.my-option:hover{
  background-color: #eee;
}
</style>