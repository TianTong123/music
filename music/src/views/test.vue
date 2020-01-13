<template>

  <div class="userlist">
    <h1>ced</h1>

    <el-table
      :data="tableData"
      stripe
      style="width: 360">
      <el-table-column prop="mid" label="mid" width="180"></el-table-column>
      <el-table-column prop="musicName" label="姓名" width="180"></el-table-column>
       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <input type="submit" @click="getData()" value="正确刷新">
    <input type="submit" @click="getErrData()" value="错误刷新">

    <el-input v-model="music.musicName" placeholder="请输入name" clearable></el-input>
    <el-button type="primary" @click="addBoy()">添加♂</el-button>
  </div>
  
</template>

<script>

export default {
  name: "userlist",
  data() {
    return {
      tableData: [],
      music:{
        isUsed: -1,
        isVip: -1,
        mid: "",
        musicAuthor: "",
        musicFile: "",
        musicInfo: "",
        musicLyric: "",
        musicName: "",
        musicPoster: "",
        musicType: -1,
        musicUpTime: "",
        musicUploadAuthor: "",
        musicalbum: "",
        mvid: ""
      }
      
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      let url = "/music/getMusicList";
      this.geUrlData(url);//请求接口
    })  
  },
  methods:{
    getData(){
      let url = "/music/getMusicList";
      this.geUrlData(url);//请求接口
    },

    getErrData(){
      let url = "/music/err";
      this.geUrlData(url);//请求接口
    },





    addBoy(){
      let params = new URLSearchParams();
          params.append('name', this.boy.name);

      this.axios.post("/style/boy/add", params).then((response)=>{

        this.tableData = response.data;
        console.log(response.data);

      }).catch((response)=>{
        console.log(response);
      }) 
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      let params = new URLSearchParams();
          params.append('id', row.id);
      this.axios.post("/style/boy/delete", params).then((response)=>{

        //console.log(response.data);
        //this.tableData = 
      }).catch((response)=>{
        console.log(response);
      }) 
    },
    geUrlData( url ){
      this.axios.get(url).then((response)=>{
        this.tableData = response.data.data;
      }).catch((response)=>{
        console.log(response);
      }) 

      
    } 
  }
}
</script>
