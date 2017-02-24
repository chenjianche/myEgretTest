var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameCenterScene = (function (_super) {
    __extends(GameCenterScene, _super);
    function GameCenterScene() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    GameCenterScene.prototype.init = function () {
        var labelfield = new eui.Label();
        labelfield.x = 150;
        labelfield.y = 500;
        labelfield.text = "提交";
        labelfield.$touchEnabled = true;
        labelfield.addEventListener(egret.TouchEvent.TOUCH_TAP, this.myButtonTouchHandler, this);
        this.addChild(labelfield);
        var myText = new eui.TextInput();
        myText.name = "txt_uid";
        myText.x = 130;
        myText.y = 300;
        myText.text = "123456789";
        this._myText = myText;
        this.addChild(myText);
        var myButton = new eui.Button();
        myButton.skinName = "resource/eui_skins/head_img.exml";
        myButton.label = "提交";
        myButton.x = 150;
        myButton.y = 300;
        myButton.$touchEnabled = true;
        myButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.myButtonTouchHandler, this);
        this.addChild(myButton);
        var myButton2 = new eui.Label();
        myButton2.x = 170;
        myButton2.y = 300;
        myButton2.text = "获取";
        myButton2.$touchEnabled = true;
        myButton2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.myButton2TouchHandler, this);
        this.addChild(myButton2);
        //this.showFriends({});
    };
    GameCenterScene.prototype.myButtonTouchHandler = function (evt) {
        //alert(this._myText.text);
        var uid = this._myText.text;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.withCredentials = true;
        request.open("https://blackjace.dev02.zhongcaiweiyou.com/login?uid=" + uid + "&type=login", egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    GameCenterScene.prototype.myButton2TouchHandler = function (evt) {
        var uid = this._myText.text;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.withCredentials = true;
        request.open("https://blackjace.dev02.zhongcaiweiyou.com/info", egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    GameCenterScene.prototype.onGetComplete = function (evt) {
        var request = evt.currentTarget;
        alert(request.response);
    };
    GameCenterScene.prototype.onGetIOError = function (event) {
        console.log("get error : " + event);
    };
    GameCenterScene.prototype.onGetProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    GameCenterScene.prototype.Login = function (headUrl, userName) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.headImgLoadHandler, this);
        imgLoader.load(headUrl);
        var nameField = new egret.TextField();
        nameField.x = 80;
        nameField.y = 33;
        nameField.text = userName;
        this.addChild(nameField);
    };
    GameCenterScene.prototype.labelTouchHandler = function (evt) {
        window.location.href = "blackjack/index.html";
    };
    GameCenterScene.prototype.headImgLoadHandler = function (evt) {
        var bmd = evt.currentTarget.data;
        var icon = new egret.Bitmap(bmd);
        icon.x = 10;
        icon.y = 10;
        //icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.labelTouchHandler,this);
        this.addChild(icon);
    };
    GameCenterScene.prototype.showFriends = function (data) {
        //加一个滚动视图
        var friendsScrollView = new egret.ScrollView();
        friendsScrollView.width = 760;
        friendsScrollView.height = 100;
        friendsScrollView.x = 0;
        friendsScrollView.y = this.height - 100;
        //var mygroup:eui.Group = new eui.Group();
        for (var i = 0; i < 10; i++) {
            //var head:head_img  = new head_img();
            var button = new eui.Button();
            button.skinName = "resource/eui_skins/head_img.exml";
            button.label = "button" + i.toString();
            button.x = i * 110 + 10;
            button.y = 0;
            friendsScrollView.addChild(button);
        }
        //friendsScrollView.addChild(mygroup);
    };
    return GameCenterScene;
}(egret.Sprite));
__reflect(GameCenterScene.prototype, "GameCenterScene");
//# sourceMappingURL=GameCenterScene.js.map