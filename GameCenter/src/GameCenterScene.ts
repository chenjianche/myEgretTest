class GameCenterScene extends egret.Sprite{
    public constructor(){
        super();
        this.init();
    }

    private _myText:eui.TextInput;
    private init(){
        let labelfield = new eui.Label();
        labelfield.x=150;
        labelfield.y=500;
        labelfield.text="提交";
        labelfield.$touchEnabled=true;
        labelfield.addEventListener(egret.TouchEvent.TOUCH_TAP,this.myButtonTouchHandler,this);
        this.addChild(labelfield);

        let myText = new eui.TextInput();
        myText.name = "txt_uid";
        myText.x=130;
        myText.y= 300;
        myText.text= "123456789";     
        this._myText = myText;   
        this.addChild(myText);

        let myButton = new eui.Button();
        myButton.skinName = "resource/eui_skins/head_img.exml";
        myButton.label = "提交";
        myButton.x = 150;
        myButton.y =300;
        myButton.$touchEnabled = true;
        myButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.myButtonTouchHandler,this);
        this.addChild(myButton);

        let myButton2 = new eui.Label();
        myButton2.x=170;
        myButton2.y=300;
        myButton2.text="获取";
        myButton2.$touchEnabled=true;
        myButton2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.myButton2TouchHandler,this);
        this.addChild(myButton2);
        //this.showFriends({});
    }
    private myButtonTouchHandler(evt:egret.Event):void{
        //alert(this._myText.text);
        var uid = this._myText.text;
        var request =new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.withCredentials = true;
        request.open("https://blackjace.dev02.zhongcaiweiyou.com/login?uid="+ uid +"&type=login",egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }
    
    private myButton2TouchHandler(evt:egret.Event):void{
        var uid = this._myText.text;
        var request =new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.withCredentials = true;
        request.open("https://blackjace.dev02.zhongcaiweiyou.com/info",egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }

    private onGetComplete(evt:egret.Event):void{
        var request = <egret.HttpRequest>evt.currentTarget;
        alert(request.response);
    }
private onGetIOError(event:egret.IOErrorEvent):void {
    console.log("get error : " + event);
}
private onGetProgress(event:egret.ProgressEvent):void {
    console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
}

    private textfield:egret.TextField;
    private _nameField:egret.TextField;

    public Login(headUrl:string,userName:string):void{

        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once( egret.Event.COMPLETE, this.headImgLoadHandler, this );
        imgLoader.load( headUrl );

        let nameField = new egret.TextField();
        nameField.x=80;
        nameField.y=33;
        nameField.text=userName;
        
        this.addChild(nameField);

    }

    private labelTouchHandler(evt:egret.TouchEvent){
        window.location.href= "blackjack/index.html";
    }

    private headImgLoadHandler(evt:egret.Event):void{
        var bmd:egret.BitmapData = evt.currentTarget.data;
        let icon:egret.Bitmap = new egret.Bitmap(bmd);
        icon.x = 10;
        icon.y = 10;
        //icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.labelTouchHandler,this);
        this.addChild(icon);
    }
    
    public showFriends(data):void{
        //加一个滚动视图

        var friendsScrollView:egret.ScrollView = new egret.ScrollView();

        friendsScrollView.width=760;
        friendsScrollView.height=100;
        friendsScrollView.x = 0;
        friendsScrollView.y = this.height-100;

        //var mygroup:eui.Group = new eui.Group();

        for (var i = 0; i < 10; i++) {
            //var head:head_img  = new head_img();
            var button = new eui.Button();
            button.skinName= "resource/eui_skins/head_img.exml";
            button.label="button" + i.toString();
            button.x = i*110 +10;
            button.y = 0;

            friendsScrollView.addChild(button);
        }
        //friendsScrollView.addChild(mygroup);
    }
}