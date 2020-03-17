<template>
  <div class="my-select">
    <!-- <div class="">{{placeholder||label}}</div> -->
    <input class="my-select-tools-people"  @click="showOption = !showOption"  type="text" @input="$emit('input', $event.target.checked?label:null)">
    <div class="my-select-wrap" id="mySelectWrap" v-show="showOption">
      <div class="triangle-up"></div>
      <ul class="my-select-ul">
        <slot></slot>
      </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  props:{
    placeholder: {
      default: '请选择',
      type: String
    },
  },
  data(){
    return{
      showOption: false
    }
  },
  methods:{
    test(val){
      return val.target.value
    },
  }
}
</script>

<style scoped>
.my-select{
  position: relative;
  width: 220px;
}
.my-select .my-select-tools-people{
  margin: 0;
  padding-left: 10px;
  width: 208px;
  height: 28px;
  border: 1px solid #242424;
  border-radius: 4px;
  outline: none;
  background: rgba(0, 0, 0, 0);
  text-align: left;
}
.my-select .my-select-wrap{
  position: absolute;
  z-index: 10;
  top: 26px;
  width: 100%;
}
.my-select .my-select-ul{
  margin-top: 0;
  padding: 0px;
  z-index: 999999;
  width: 100%;
  border: 1px solid #242424;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 5px rgba(0,0,0,.1);
  overflow: hidden;
}
.my-select .triangle-up{
  /* position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%); */

  display: block;
  margin: 6px auto 0 auto;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #3b3b3b;
}
</style>
