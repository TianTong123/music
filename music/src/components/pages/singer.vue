<template>
  <div class="singer" ref="singer">
    <div class="wrap">
      <div class="type">
        <div class="type-title">
          <ul>
            <li v-for="(e, id) in typeList" :key="id">{{e.name}}</li>
          </ul>
        </div>
        <div class="type-list">
          <div class="type-list-wrap">
            <ul v-for="(e, id) in typeList" :key="id">
              <li v-for="(te, eid) in e.list" :key="eid">
                {{te.name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-title">歌手列表</div>
        <div class="card" v-for="(e, id) in singer" :key="id">
          <div class="img-wrap"><img :src="e.headimg" alt=""></div>
          <span>{{e.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      //类型列表
      typeList:[
        {name:'国语', list:[{name:'国语男歌手', param:''},{name:'国语女歌手', param:''}]},
        {name:'粤语', list:[{name:'粤语男歌手', param:''},{name:'粤语女歌手', param:''}]},
        {name:'外语', list:[{name:'外语男歌手', param:''},{name:'外语女歌手', param:''}]},
      ],
      //歌手列表
      singer:[
        {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'},
      ]
    }
  },
  methods:{
    //设置宽度
    setContentWidth(){
      this.$refs['singer'].style.width = 1571 + "px";
      console.log(this.$refs['singer'].width)
    }
  },
  mounted(){
    //this.setContentWidth();
  },
}
</script>
<style scoped>
@import '../../../static/css/singer.css';
@import '../../../static/css/myIcon.css';
</style>