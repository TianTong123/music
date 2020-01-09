//获取对象函数
function $(id){
  return document.getElementById(id);
}
window.onload = function(){
  var play = $('play');//播放按钮
  var previous = $('previous');//上一首按钮
  var next = $('next');//下一首按钮
  var music = $('music');//获取音乐
  var m_progress = $('m_progress');//获取进度条
  var v_progress = $('v_progress');//获取音量进度条
  var v_value = $('v_value');//获取当前音量大小默认 50%！
  var m_p_icon = $('m_p_icon');//获取进度条图标
  
  //让50音量立即生效，否则就默认100音量
  music.volume = 0.5;
  /*
   *
   *	按钮方法
   */
  //播放按钮
  play.onclick = function(){
  
    if( music.paused ){
      music.play();//播放音乐
      play.style.backgroundImage = "url(images/pause.png)";//播放按钮切换为暂停
    }else{
      music.pause();
      play.style.backgroundImage = "url(images/play.png)";//暂停按钮切换为播放
    }
  }
  
  
  /*
   *
   * 进度条
   */
  //时间处理
  function time(){
    var m_time = music.duration;//总时长
    //总时长换算为 xx分xx秒
    var minutes = parseInt( m_time / 60 );//除去60取整数， 分
    var seconds = parseInt( m_time - minutes*60 );//取秒数
  
    var play_time = music.currentTime;//当前播放时长
    //播放时间换算为 xx分xx秒
    var play_minutes = parseInt( play_time / 60);
    var play_seconds = parseInt( play_time -play_minutes*60 );
    $('m_time').innerHTML = play_minutes + ":" + play_seconds + " / " 
                  + minutes + ":" + seconds;//替换内容
  
    /*进度条百分比计算*/
    var long = play_time * 650 / m_time;//得到进度条长度，650是进度条总长度
    m_progress.style.width = long + "px";
    m_p_icon.style.left = (long - 12) + "px";
  
    if( music.ended )//归零
      music.currentTime = 0;
    
  }
  
  //音量处理
  v_progress.onclick = function( event ){
    var e = event ? event : window.event;//判断处理
  
    //e.clientX(鼠标x轴) - v_progress.offsetLeft(距离父元素的x距离) - 
    //$('music_bar').offsetLeft(父元素距离页面的距离)得出相对长度
    //因为音量条长度刚好为100所以不用除去总长度，
    var value = e.clientX - v_progress.offsetLeft - $('music_bar').offsetLeft;
    
    v_value.style.width = value + "px";
    //为什么除100，因为volume 属性设置或返回音频的音量，从 0.0 (静音) 到 1.0 (最大声)。
    music.volume = value / 100;
  }
  
  /*
   *    进度条处理
   *    	原理参考上面，一样的
   */
  $('progress_bar').onclick = function( event ){
    var e = event ? event : window.event;
    var value = e.clientX - $('progress_bar').offsetLeft ;
  
    music.currentTime = value * music.duration / 650;
    m_progress.style.width = value + "px";
    m_p_icon.style.left = (value - 12) + "px";
  }
  
  //播放，走！
  var timer = setInterval(function(){
    time();
  }, 10);
}
