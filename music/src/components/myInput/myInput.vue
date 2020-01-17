<template>
  <div class="my-input">
    <i v-if="icon" :class="icon"></i>
    <input :type="type" @input="$emit('input', $event.target.value)" :placeholder="placeholder">
  </div>
</template>
<script>
export default {
  props:{
    icon: {
      default: '',
      type: String,
    },
    type: {
      default: 'text',
      type: String
    },
    placeholder: {
      default: '请输入',
      type: String
    }
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