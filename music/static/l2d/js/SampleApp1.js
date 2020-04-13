var thisRef = this;


window.onerror = function(msg, url, line, col, error) {
    var errmsg = "file:" + url + "<br>line:" + line + " " + msg;
    l2dError(errmsg);
}

window.onload = function(){
    sampleApp1()
}

function sampleApp1()
{
    this.platform = window.navigator.platform.toLowerCase();
    
    this.live2DMgr = new LAppLive2DManager();

    this.isDrawStart = false;
    
    this.gl = null;
    this.canvas = null;
    this.bg = null;//鼠标生效的背景
    
    this.dragMgr = null; /*new L2DTargetPoint();*/ 
    this.viewMatrix = null; /*new L2DViewMatrix();*/
    this.projMatrix = null; /*new L2DMatrix44()*/
    this.deviceToScreen = null; /*new L2DMatrix44();*/
    
    this.drag = false; //是否拖拽, false 不拖拽 ，true拖拽
    //this.drag = true; //是否拖拽，false 不拖拽 ，true拖拽//原版是上面，我魔改了
    this.oldLen = 0;    
    
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
    this.isModelShown = false;
    
    this.sizeIndex = 2;
    
    initL2dCanvas("glcanvas", "myl2d");
    
    init();
}

//尺寸变化
function changeSize(){ //先删除元素，再创建，这样的强制刷新实现变大
    if(thisRef.sizeIndex > 5){
      thisRef.sizeIndex = 1
    }
    thisRef.sizeIndex ++;
    rebornCanvas(thisRef.sizeIndex * 128, thisRef.sizeIndex * 128);
    talkControl();
}

//全屏模式
function fullScreenModel(){
    //进入全屏
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
    }
    rebornCanvas(window.screen.height, window.screen.height, true);
    bgControl(window.screen.width, window.screen.height);
    btnControl(true)
}

//伟大的 document 哟！将统领世界的 canvas 重生吧！canvas ~ reborn！
function rebornCanvas(width, height, isCenter=false){
    //涅槃
    thisRef.canvas.parentNode.removeChild(thisRef.canvas); 
    //重生
    var canvas1 = document.createElement("canvas");   
    canvas1.id = 'glcanvas'
    canvas1.className = isCenter?'myCanvans canvas-center':'myCanvans';
    canvas1.setAttribute('crossOrigin', 'anonymous');
    canvas1.width = width;
    canvas1.height = height;
    //大爷我回来啦
    thisRef.bg.appendChild(canvas1);
    thisRef.initL2dCanvas("glcanvas", "myl2d");
    thisRef.init(thisRef.sizeIndex);
}

//背景处理
function bgControl(width, height){
    thisRef.bg.style.zIndex = 999999;
    var l2dbg = document.getElementById('myl2dbg')
    l2dbg.style.display = 'block';
    l2dbg.style.width = width + 'px';//背景处理
    l2dbg.style.height = height + 'px';//背景处理
}

//按钮隐藏处理
function btnControl(isFull=false){
   document.getElementById('bigBtn').style.display = isFull?'none':'block';
   document.getElementById('fullBtn').style.display = isFull?'none':'block';
   document.getElementById('closeBtn').style.display = isFull?'block':'none';
}

//对话框处理
function talkControl(isFull = false){
    let talkTip = document.getElementById('my-l2d-tip');
    console.log(thisRef.sizeIndex * 128 + 34)
    talkTip.style.bottom = thisRef.sizeIndex * 128 + 34 +'px';
    talkTip.style.left = thisRef.sizeIndex==2?0:thisRef.sizeIndex * 20 +'px';
}

//退出全屏
function exitFullScreenModel(){
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    thisRef.sizeIndex --
    thisRef.bg.style.zIndex = 1;
    document.getElementById('myl2dbg').style.display = 'none'
    changeSize();
    btnControl()
}

function initL2dCanvas(canvasId, bgId)
{
	this.canvas = document.getElementById(canvasId);
    this.bg = document.getElementById(bgId);//鼠标生效范围
    
    if(this.canvas.addEventListener) {
        this.canvas.addEventListener("mousewheel", mouseEvent, false);
        this.bg.addEventListener("click", mouseEvent, false);

        this.canvas.addEventListener("mousedown", mouseEvent, false);
        this.canvas.addEventListener("mousemove", mouseEvent, false);

        this.canvas.addEventListener("mouseup", mouseEvent, false);
        this.canvas.addEventListener("mouseout", mouseEvent, false);

        this.canvas.addEventListener("touchstart", touchEvent, false);
        this.canvas.addEventListener("touchend", touchEvent, false);
        this.canvas.addEventListener("touchmove", touchEvent, false);
        
    }
    
    //btnChangeModel = document.getElementById("btnChange");
    //btnChangeModel.addEventListener("click", function(e) {
    //    changeModel();
    //});
}


function init()
{    

    var width = this.canvas.width;
    var height = this.canvas.height;
    
    this.dragMgr = new L2DTargetPoint();

    
    var ratio = height / width;
    var left = LAppDefine.VIEW_LOGICAL_LEFT;
    var right = LAppDefine.VIEW_LOGICAL_RIGHT;
    var bottom = -ratio;
    var top = ratio;

    this.viewMatrix = new L2DViewMatrix();

    
    this.viewMatrix.setScreenRect(left, right, bottom, top);
    
    
    this.viewMatrix.setMaxScreenRect(LAppDefine.VIEW_LOGICAL_MAX_LEFT,
                                     LAppDefine.VIEW_LOGICAL_MAX_RIGHT,
                                     LAppDefine.VIEW_LOGICAL_MAX_BOTTOM,
                                     LAppDefine.VIEW_LOGICAL_MAX_TOP); 

    this.viewMatrix.setMaxScale(LAppDefine.VIEW_MAX_SCALE);
    this.viewMatrix.setMinScale(LAppDefine.VIEW_MIN_SCALE);

    this.projMatrix = new L2DMatrix44();
    this.projMatrix.multScale(1, (width / height));

    
    this.deviceToScreen = new L2DMatrix44();
    this.deviceToScreen.multTranslate(-width / 2.0, -height / 2.0);
    this.deviceToScreen.multScale(2 / width, -2 / width);
    
    
	this.gl = getWebGLContext();
	if (!this.gl) {
        l2dError("Failed to create WebGL context.");
        return;
    }

	
	this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

    //changeModel();
    this.isModelShown = false;
    this.live2DMgr.reloadFlg = true;
    this.live2DMgr.count = this.live2DMgr.count == -1? 0 :this.live2DMgr.count;
    this.live2DMgr.changeModel(this.gl);

    startDraw();
}


function startDraw() {
    if(!this.isDrawStart) {
        this.isDrawStart = true;
        (function tick() {
                draw(); 

                var requestAnimationFrame = 
                    window.requestAnimationFrame || 
                    window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame || 
                    window.msRequestAnimationFrame;
   
                requestAnimationFrame(tick ,this.canvas);   
        })();
    }
}


function draw()
{
    // l2dLog("--> draw()");
    
    MatrixStack.reset();
    MatrixStack.loadIdentity();
    
    this.dragMgr.update(); 
    this.live2DMgr.setDrag(this.dragMgr.getX(), this.dragMgr.getY());
    
    
	this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
    MatrixStack.multMatrix(projMatrix.getArray());
    MatrixStack.multMatrix(viewMatrix.getArray());
    MatrixStack.push();

    for (var i = 0; i < this.live2DMgr.numModels(); i++)
    {
        var model = this.live2DMgr.getModel(i);

        if(model == null) return;
        
        if (model.initialized && !model.updating)
        {
            model.update();
            model.draw(this.gl);
            
            //if (!this.isModelShown && i == this.live2DMgr.numModels()-1) {
            //    this.isModelShown = !this.isModelShown;
            //    var btnChange = document.getElementById("btnChange");
            //    btnChange.textContent = "Change Model";
            //    btnChange.removeAttribute("disabled");
            //    btnChange.setAttribute("class", "active");
            //}
        }
    }
    
    MatrixStack.pop();
}


function changeModel()
{
    //var btnChange = document.getElementById("btnChange");
    //btnChange.setAttribute("disabled","disabled");
    //btnChange.setAttribute("class", "inactive");
    //btnChange.textContent = "Now Loading...";
    this.isModelShown = false;
    
    this.live2DMgr.reloadFlg = true;
    this.live2DMgr.count ++;
    this.live2DMgr.changeModel(this.gl);
}



//缩放比例
function modelScaling(scale)
{   
    var isMaxScale = thisRef.viewMatrix.isMaxScale();
    var isMinScale = thisRef.viewMatrix.isMinScale();
    
    thisRef.viewMatrix.adjustScale(0, 0, scale);

    
    if (!isMaxScale)
    {
        if (thisRef.viewMatrix.isMaxScale())
        {
            thisRef.live2DMgr.maxScaleEvent();
        }
    }
    
    if (!isMinScale)
    {
        if (thisRef.viewMatrix.isMinScale())
        {
            thisRef.live2DMgr.minScaleEvent();
        }
    }
}



function modelTurnHead(event)
{
    thisRef.drag = true;
    event = window.event
    //var rect = event.target.getBoundingClientRect();
    
    var sx = transformScreenX(event.clientX - thisRef.canvas.offsetLeft);
    var sy = transformScreenY(event.clientY - thisRef.canvas.offsetTop);
    var vx = transformViewX(event.clientX - thisRef.canvas.offsetLeft);
    var vy = transformViewY(event.clientY - thisRef.canvas.offsetTop);
    if (LAppDefine.DEBUG_MOUSE_LOG){
        //l2dLog("onMouseDown device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");
    }
        
    thisRef.lastMouseX = sx;
    thisRef.lastMouseY = sy;

    thisRef.dragMgr.setPoint(vx, vy); 
    
    
    thisRef.live2DMgr.tapEvent(vx, vy);
}


//鼠标跟随
function followPointer(event)
{    
    event = window.event;
    var sx = transformScreenX(event.clientX - thisRef.canvas.offsetLeft);
    var sy = transformScreenY(event.clientY - thisRef.canvas.offsetTop);
    var vx = transformViewX(event.clientX - thisRef.canvas.offsetLeft);
    var vy = transformViewY(event.clientY - thisRef.canvas.offsetTop);
    if (LAppDefine.DEBUG_MOUSE_LOG){
        //l2dLog("onMouseMove device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");
    }
    thisRef.lastMouseX = sx;
    thisRef.lastMouseY = sy;

    thisRef.dragMgr.setPoint(vx, vy); 
    //移动live2d
    // if (thisRef.drag){
    //   thisRef.canvas.style.left = event.clientX
    //   thisRef.canvas.style.top = event.clientY
    //   console.left               
    // }
}

		

function lookFront()
{   
    if (thisRef.drag)
    {
        thisRef.drag = false;
    }

    thisRef.dragMgr.setPoint(0, 0);
}


//鼠标事件处理
function mouseEvent(e)
{
    e.preventDefault();
    
    if (e.type == "mousewheel") {
        
        // if (e.clientX > thisRef.canvas.offsetLeft && 
        //     e.clientX < thisRef.canvas.clientWidth + thisRef.canvas.offsetLeft && //判断x在窗体内
        //     e.clientY > thisRef.canvas.offsetTop &&
        //     e.clientY < thisRef.canvas.clientHeight + thisRef.canvas.offsetTop) //判断y在窗体内
        // {
            //执行缩放
            if (e.wheelDelta > 0) 
                modelScaling(1.1); 
            else 
                modelScaling(0.9); 
        //}
        
    } else if (e.type == "mousedown") {
        
        if("button" in e && e.button != 0) return;
        
        modelTurnHead(e);
        
    } else if (e.type == "mousemove") {

        followPointer(e);
        
    } else if (e.type == "mouseup") {
        
        
        if("button" in e && e.button != 0) return;
        
        lookFront();
        
    } else if (e.type == "mouseout") {
        
        lookFront();
        
    }
}


function touchEvent(e)
{
    e.preventDefault();
    
    var touch = e.touches[0];
    
    if (e.type == "touchstart") {
        //if (e.touches.length == 1) modelTurnHead(touch);
        // onClick(touch);
        
    } else if (e.type == "touchmove") {
        followPointer(touch);
        
        if (e.touches.length == 2) {
            var touch1 = e.touches[0];
            var touch2 = e.touches[1];
            
            var len = Math.pow(touch1.pageX - touch2.pageX, 2) + Math.pow(touch1.pageY - touch2.pageY, 2);
            if (thisRef.oldLen - len < 0) modelScaling(1.025); 
            else modelScaling(0.975); 
            
            thisRef.oldLen = len;
        }
        
    } else if (e.type == "touchend") {
        lookFront();
    }
}




function transformViewX(deviceX)
{
    var screenX = this.deviceToScreen.transformX(deviceX); 
    return viewMatrix.invertTransformX(screenX); 
}


function transformViewY(deviceY)
{
    var screenY = this.deviceToScreen.transformY(deviceY); 
    return viewMatrix.invertTransformY(screenY); 
}


function transformScreenX(deviceX)
{
    return this.deviceToScreen.transformX(deviceX);
}


function transformScreenY(deviceY)
{
    return this.deviceToScreen.transformY(deviceY);
}



function getWebGLContext()
{
	var NAMES = [ "webgl" , "experimental-webgl" , "webkit-3d" , "moz-webgl"];
	
	for( var i = 0; i < NAMES.length; i++ ){
		try{
            var ctx = this.canvas.getContext(NAMES[i], {premultipliedAlpha : true});
			if(ctx) return ctx;
		} 
		catch(e){}
	}
	return null;
};



function l2dLog(msg) {
    if(!LAppDefine.DEBUG_LOG) return;
    
    //var myconsole = document.getElementById("myconsole");
    //myconsole.innerHTML = myconsole.innerHTML + "<br>" + msg;
    
    console.log(msg);
}



function l2dError(msg)
{
    if(!LAppDefine.DEBUG_LOG) return;
    
   // l2dLog( "<span style='color:red'>" + msg + "</span>");
    
	console.error(msg);
};