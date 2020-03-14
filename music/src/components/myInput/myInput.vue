<template>
  <div :class="{'my-input':type != 'checkbox', 'my-checkbox':type == 'checkbox'}">
    <i v-if="icon" :class="icon"></i>
    <input :type="type" @input="$emit('input', $event.target.value)" :placeholder="placeholder" v-if="type != 'checkbox'">
      <div class="my-checkbox-wrap" v-if="type == 'checkbox'">
        <input :type="type"  @input="$emit('input', $event.target.checked?label:null)" :value="label" >
      </div>
     <div class="my-checkbox-label"><slot></slot></div> 
  </div>
</template>
<script>
export default {
  props:{
    icon: {
      default: '', //user, pwd,
      type: String,
    },
    type: {//text, password, checkbox
      default: 'text',
      type: String
    },
    placeholder: {
      default: '请输入',
      type: String
    },
    label: {
      default: '',
      type: String
    },
  },
}
</script>
<style scoped>
.my-input{
  display: flex;
  width: 218px;
  height: 28px;
  border: 1px solid #242424;
  border-radius: 4px;
  overflow: hidden;
}
.my-input input{
  flex: 1;
  margin: 0;
  padding-left: 0;
  border: 0;
  width: 100%;
  height: 100%;
  outline: none;
  background: rgba(0, 0, 0, 0);
  text-align: left;
}
.my-input input button{
  height: 100% !important;
  background: #242424 !important;
}
.my-checkbox{
  display: flex;
  width: 218px;
  height: 28px;
  border-radius: 4px;
  overflow: hidden;
}
.my-checkbox .my-checkbox-wrap{
  position: relative;
  margin: 8px 0;
  width: 11px;
  height: 11px;
  border: 1px solid #242424;
  border-radius: 4px;
  overflow: hidden;
}
.my-checkbox input{
  position: absolute;
  top: -1px;
  left: -1px;
}
.my-checkbox .my-checkbox-label{
  flex: 1;
  margin-left: 10px;
  text-align: left;
  line-height: 28px;
}
/* 图标 */
.my-input i{
  display: inline-block;
  width: 30px;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
}
/* 用户 */
.my-input .user{
  background-image: url(./images/user.png);
}
/* 密码 */
.my-input .pwd{
  background-image: url(./images/pwd.png);
}
</style>