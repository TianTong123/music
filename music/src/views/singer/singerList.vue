<template>
  <div class="singer" ref="singer">
    <div class="wrap">
      <div class="type">
        <div class="type-title">
          <ul>
            <li :class="e.class" v-for="(e, id) in typeList" :key="id" @click="activeTitle(id, 1)">{{e.name}}</li>
          </ul>
        </div>
        <div class="type-list">
          <div class="type-list-wrap" :style="{'left': tlwLeft+'px'}">
            <ul v-for="(e, id) in typeList" :key="id">
              <li v-for="(te, eid) in e.list" :key="eid" @click="activeTitle(eid, 2, id)" :class="te.class">
                {{te.name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-title">歌手列表</div>
        <div class="card" v-for="(e, id) in singer" :key="id" @click="goSingerInfo(id)">
          <div class="img-wrap"><img :src="e.headimg" alt=""></div>
          <span>{{e.name}}</span>
        </div>
        <div class="pagination">
          <div class="prev p-btn"></div>
          <div class="next p-btn"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tlwLeft: 53,
      //类型列表
      typeList:[
        {name:'国语', class: 'activeTitle', list:[{name:'国语男歌手', class:'activeTitleContent', param:''},{name:'国语女歌手', class:'', param:''}]},
        {name:'粤语', class: '', list:[{name:'粤语男歌手', class:'activeTitleContent', param:''},{name:'粤语女歌手', class:'', param:''}]},
        {name:'外语', class: '', list:[{name:'外语男歌手', class:'activeTitleContent', param:''},{name:'外语女歌手', class:'', param:''}]},
      ],
      //歌手列表
      singer:[
        {name: '刘德华', headimg:'../../../static/images/ldh.jpg'},{name: '刘德华', headimg:'../../../static/images/ldh.jpg'},{name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'}, {name: '刘德华', headimg:'../../../static/images/ldh.jpg'},
      ]
    }
  },
  methods:{
    activeTitle(id, flag, eid){
      //标题头
      if(flag == 1){ 
        //点亮操作
        for(let i = 0; i < this.typeList.length; i ++ ){
          this.typeList[i].class = ''
        }
        this.typeList[id].class = 'activeTitle';
        //滚动的控制
        this.tlwLeft = 53 + (-id*240)
      }
      //子标签点亮
      else{         
        for(let i = 0; i < this.typeList[eid].list.length; i ++ ){
          this.typeList[eid].list[i].class = '';
        }
        this.typeList[eid].list[id].class = 'activeTitleContent';
      }
    },
    //设置宽度
    setContentWidth(){
      this.$refs['singer'].style.width = 1571 + "px";
      console.log(this.$refs['singer'].width)
    },
    //跳转信息页
    goSingerInfo(id){
      this.$router.push({
        path: `info/${id}`
      })
    }
  },
  mounted(){
    //this.setContentWidth();
  },
}
</script>
<style scoped>
@import '../../../static/css/singer.css';
</style>