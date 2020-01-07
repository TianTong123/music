<template>
  <div class="player">
    <div class="bg"><img src="../../../static/images/timg1.jpg" alt=""></div>
    <div class="wrap">
      <div class="poster"><img src="../../../static/images/ldh.jpg" alt=""></div>
      <div class="info">
        <div class="music-title">一起走过的日子</div>
        <div class="singer">刘德华</div>
        <div class="lyric">
          <p v-for="(e, index) in lyric" :key="index">{{e.LrcLine}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      lyric: [
        {
          "type": 1,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "菊花台"
        },
        {
          "type": 0,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "周杰伦"
        },
        {
          "type": 2,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "依然范特西"
        },
        {
          "type": 3,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "style海峰"
        },
        {
          "type": 5,
          "Time": "00:00.40",
          "TimeMs": 40,
          "LrcLine": "周杰伦 - 菊花台"
        },
        {
          "type": 5,
          "Time": "00:03.24",
          "TimeMs": 3024,
          "LrcLine": "作词：方文山 作曲：周杰伦"
        },
        {
          "type": 5,
          "Time": "00:06.29",
          "TimeMs": 6029,
          "LrcLine": "编曲：钟兴民"
        },
        {
          "type": 5,
          "Time": "00:09.79",
          "TimeMs": 9079,
          "LrcLine": "LRC制作： 惜  fQQ:727991729"
        },
        {
          "type": 5,
          "Time": "00:36.01",
          "TimeMs": 36001,
          "LrcLine": "你的泪光 柔弱中带伤"
        },
        {
          "type": 5,
          "Time": "00:43.00",
          "TimeMs": 43000,
          "LrcLine": "惨白的月弯弯 勾住过往"
        },
        {
          "type": 5,
          "Time": "00:49.75",
          "TimeMs": 49075,
          "LrcLine": "夜太漫长 凝结成了霜"
        },
        {
          "type": 5,
          "Time": "00:56.46",
          "TimeMs": 56046,
          "LrcLine": "是谁在阁楼上 冰冷的绝望"
        },
        {
          "type": 5,
          "Time": "01:03.75",
          "TimeMs": 63075,
          "LrcLine": "雨轻轻弹 朱红色的窗"
        },
        {
          "type": 5,
          "Time": "01:10.58",
          "TimeMs": 70058,
          "LrcLine": "我一生在纸上 被风吹乱"
        },
        {
          "type": 5,
          "Time": "01:17.68",
          "TimeMs": 77068,
          "LrcLine": "梦在远方 化成一缕香"
        },
        {
          "type": 5,
          "Time": "01:24.39",
          "TimeMs": 84039,
          "LrcLine": "随风飘散 你的模样"
        },
        {
          "type": 5,
          "Time": "01:34.39",
          "TimeMs": 94039,
          "LrcLine": "菊花残 满地伤 你的笑容已泛黄"
        },
        {
          "type": 5,
          "Time": "01:41.91",
          "TimeMs": 101091,
          "LrcLine": "花落人断肠 我心事 静静淌  "
        },
        {
          "type": 5,
          "Time": "01:48.10",
          "TimeMs": 108010,
          "LrcLine": "北风乱 夜未央 你的影子剪不断"
        },
        {
          "type": 5,
          "Time": "01:55.77",
          "TimeMs": 115077,
          "LrcLine": "徒留我孤单在湖面 成双"
        },
        {
          "type": 5,
          "Time": "02:30.70",
          "TimeMs": 150070,
          "LrcLine": "花已向晚 飘落了灿烂"
        },
        {
          "type": 5,
          "Time": "02:37.67",
          "TimeMs": 157067,
          "LrcLine": "凋谢的世道上 命运不堪"
        },
        {
          "type": 5,
          "Time": "02:44.67",
          "TimeMs": 164067,
          "LrcLine": "愁莫渡江 秋心拆两半"
        },
        {
          "type": 5,
          "Time": "02:51.40",
          "TimeMs": 171040,
          "LrcLine": "怕你上不了岸 一辈子摇晃"
        },
        {
          "type": 5,
          "Time": "02:58.65",
          "TimeMs": 178065,
          "LrcLine": "谁的江山 马蹄声狂乱"
        },
        {
          "type": 5,
          "Time": "03:05.76",
          "TimeMs": 185076,
          "LrcLine": "我一身的戎装 呼啸沧桑"
        },
        {
          "type": 5,
          "Time": "03:12.82",
          "TimeMs": 192082,
          "LrcLine": "天微微亮 你轻声地叹"
        },
        {
          "type": 5,
          "Time": "03:20.28",
          "TimeMs": 200028,
          "LrcLine": "一夜惆怅 如此委婉"
        },
        {
          "type": 5,
          "Time": "03:29.27",
          "TimeMs": 209027,
          "LrcLine": "菊花残 满地伤 你的笑容已泛黄"
        },
        {
          "type": 5,
          "Time": "03:37.09",
          "TimeMs": 217009,
          "LrcLine": "花落人断肠 我心事 静静淌"
        },
        {
          "type": 5,
          "Time": "03:43.19",
          "TimeMs": 223019,
          "LrcLine": "北风乱 夜未央 你的影子剪不断"
        },
        {
          "type": 5,
          "Time": "03:50.91",
          "TimeMs": 230091,
          "LrcLine": "徒留我孤单在湖面 成双"
        },
        {
          "type": 5,
          "Time": "04:00.55",
          "TimeMs": 240055,
          "LrcLine": "菊花残 满地伤 你的笑容已泛黄"
        },
        {
          "type": 5,
          "Time": "04:08.18",
          "TimeMs": 248018,
          "LrcLine": "花落人断肠 我心事 静静淌"
        },
        {
          "type": 5,
          "Time": "04:14.39",
          "TimeMs": 254039,
          "LrcLine": "北风乱 夜未央 你的影子剪不断"
        },
        {
          "type": 5,
          "Time": "04:24.09",
          "TimeMs": 264009,
          "LrcLine": "徒留我孤单在湖面 成双"
        },
        {
          "type": 5,
          "Time": "04:46.69",
          "TimeMs": 286069,
          "LrcLine": " 惜  fQQ:727991729"
        },
        {
          "type": 5,
          "Time": "99:99.99",
          "TimeMs": 6039099,
          "LrcLine": "◇"
        },
        {
          "type": 5,
          "Time": "10:00.00",
          "TimeMs": 600000,
          "LrcLine": "LRC歌词下载：www.22lrc.com "
        }
      ],
    }
  },
  methods:{

  },
}
</script>

<style scoped>
@import '../../../static/css/myIcon.css';
@import '../../../static/css/play.css';
</style>