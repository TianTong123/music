<template>
  <div class="singerinfo">
    <div class="wrap">
      <div class="info">
        <div class="poster"><img v-if="user.photoUrl" :src="$global.imgUrl+user.photoUrl" alt=""></div>
        <div class="name"><span>名字：</span>{{user.accountName}}</div>
        <div class="detail-info"><span>介绍：</span>{{user.info}}</div>
      </div>
      <div class="music-list">
        <div class="title">他的歌曲</div>
        <div class="list-wrap">
          <ul>
            <li v-for="(e, index) in musicList" :key="index" >
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">{{e.name}}</div>
              <div class="time">{{timeFormat(e.timeLength)}}</div>
              <div class="play-btn" @click="goMusic(e.id)"><i class="icon-mini-play"></i></div>
              <div class="play-btn" @click="openOrClocseDiaMusicForm(index)">
                <i class="icon-add"></i>
                <div class="my-form-wrap" v-show="diaAddMusicForm == index">
                  <div class="my-form-card" v-for="(item, id) in addMusicFormList" @click="addCollect(e.id, item.id)" :key="id">
                    <span>{{id+1}}</span>
                    {{item.songFormName}}
                  </div>
                </div>
              </div>
              <div class="play-btn" @click="addCollect(e.id, addMusicFormList[0].id)"><i class="icon-like"></i></div>
              <div class="play-btn" @click="addCollect(e.id, addMusicFormList[1].id)"><i class="icon-collect"></i></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import util from '@/util/utils';
import Footer from "@/components/myFooter/Footer";
export default {
  components:{
    Footer
  },
  data(){
    return{
      user: {},
      musicList: [],
      diaAddMusicForm: -1,
      addMusicFormList: [],
    }
  },
  mounted(){
    this.getUserInfo();
    this.addMusicFormList = util.getStorage('musicFormList')
  },
  methods:{

    //获取用户信息
    getUserInfo(){
      let parames = {
        id: this.$route.params.id,
      }
      this.$http.getUserInfo( parames ).then(({data}) => {
        if (data.code == 0){
          this.user = data.data; 
          this.getMyWorks(this.user.singerId);   
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      });
    },

    //获取作品
    getMyWorks(id){
      let parames = {
        flag: 1,
        songerId: id,
      }
      this.$http.getMyWorks( parames ).then(({data}) => {
        if (data.code == 0){
          this.musicList = data.data;
          
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },

    //收藏&添加到歌单
    addCollect(sId, id){
      if(util.getStorage('user') == ''){
        this.$myMsg.notify({content: '请登录后再操作！', type: 'error'})
        return
      }
      let parames = {
        formId: id,
        songId: sId,
      }
      this.$http.addCollect( parames ).then(({data}) => {
        this.$myMsg.notify({content: '添加成功', type: 'success'})
        if(id == util.getStorage('musicFormList')[1].id){
          this.$http.addCollectNum({ musicId: parames.songId });//增加收藏数
        }
      })
    },
    goMusic(index){
      this.$router.push({
        path: `../../player/${index}`
      })
    },
    //打开或添加歌单框
    openOrClocseDiaMusicForm(index){
      this.diaAddMusicForm = this.diaAddMusicForm==index?-1:index
    },
    //时间格式
    timeFormat: (val) => util.timeFormat(val)
  }
}
</script>
<style scoped>
@import '../../../static/css/singerInfo.css';
</style>