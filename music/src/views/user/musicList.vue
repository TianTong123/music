<template>
  <div class="singerinfo">
    <div class="wrap">
      <div class="info">
        <div class="poster">
          <img v-if="poster == null" src="../../../static/images/logo.png">
          <img v-if="poster != null" :src="`http://192.168.17.126:8848/tiantong/file/imgShow/${poster}`">
        </div>
      </div>
      <div class="music-list" style="width: 100%; min-height: 1000px">
        <div class="title">{{formName}}</div>
        <div class="list-wrap">
          <ul>
            <li v-for="(e, index) in list" :key="index">
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">{{e.name}}</div>
              <div class="time">{{timeFormat(e.timeLength)}}</div>
              <div class="play-btn" @click="deleteMusic(e.id)"><i class="delete-btn"></i></div>
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
          <div class="my-min-null-box" v-if="list.length == 0">这个歌单没有歌</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import util from '@/util/utils';

export default {
   data(){
    return{
      formId: '',
      formName: '',
      list: [],
      poster: null,
      musicList: [],
      diaAddMusicForm: -1,
      addMusicFormList: [],
    }
  },
  beforeMount() {
    this.getMusicList();
    this.addMusicFormList = util.getStorage('musicFormList')
  },
  methods:{
    //获取音乐列表
    getMusicList(){
      let parames = {
        formId: this.$route.params.id,
      }
      this.$http.getMusicList( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.formId = data.data.formId;
          this.formName = data.data.formName;
          this.list = data.data.musicList;
          this.poster = data.data.posterUrl;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
      .catch(err => {
        this.$myMsg.notify({content: err.message,type: 'error'})
      })
    },

    //收藏&添加到歌单
    addCollect(sId, id){
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

    //移除歌曲
    deleteMusic( id){
      let parames = {
        formId: this.formId,
        songId: id,
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否将这首音乐移除歌单？`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.deleteMusicByForm( parames ).then(({data}) => {
            this.$myMsg.notify({content: '移除成功', type: 'success'})
            this.getMusicList();
          })
        }
      })
      
    },

    //播放
    goMusic(id){
      this.$router.push({name:'player',params:{id: id}});
    },

    //打开或添加歌单框
    openOrClocseDiaMusicForm(index){
      this.diaAddMusicForm = this.diaAddMusicForm==index?-1:index
    },

    //时间格式
    timeFormat: (val) => util.timeFormat(val)
  },
  watch:{
    $route(to, from) {
      this.search();
    }
  }
}
</script>
<style scoped>
@import '../../../static/css/singerInfo.css';

</style>