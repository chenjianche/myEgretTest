//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("background_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.duzhuMoney = 0;
        var duzhuLabel = new egret.TextField();
        duzhuLabel.textColor = 0xffffff;
        duzhuLabel.width = stageW - 200;
        duzhuLabel.size = 48;
        duzhuLabel.x = 75;
        duzhuLabel.y = stageH - 310;
        duzhuLabel.text = this.duzhuMoney.toString();
        this.duzhufield = duzhuLabel;
        this.addChild(duzhuLabel);
        this.allMoney = 1000;
        var moneyLabel = new egret.TextField();
        moneyLabel.textColor = 0xffffff;
        moneyLabel.size = 48;
        moneyLabel.width = stageW;
        moneyLabel.textAlign = egret.HorizontalAlign.CENTER;
        moneyLabel.x = 0;
        moneyLabel.y = stageH - 50;
        moneyLabel.text = this.allMoney.toString();
        this.addChild(moneyLabel);
        this.moneyfield = moneyLabel;
        var self = this;
        egret.setTimeout(function () {
            self.createChip(5, 15, stageH - 225, stageW / 2, stageH + 133);
        }, 0, 200);
        egret.setTimeout(function () {
            self.createChip(10, (stageW / 4) * 1 + 15, stageH - 225, stageW / 2, stageH + 133);
        }, 0, 300);
        egret.setTimeout(function () {
            self.createChip(25, (stageW / 4) * 2 + 15, stageH - 225, stageW / 2, stageH + 133);
        }, 0, 400);
        egret.setTimeout(function () {
            self.createChip(100, (stageW / 4) * 3 + 15, stageH - 225, stageW / 2, stageH + 133);
        }, 0, 500);
        this.touzhu_chip_number = 0;
        this._duzhuchips = new DuZhuChips();
        this._duzhuchips.to_X = 200;
        this._duzhuchips.to_Y = 500;
        var shape = new egret.Shape();
        this.shape = shape;
        this.addChild(shape);
        this.drawCircle(640 / 2, 1136 * 1.5);
        this._Pokers = new Array();
        for (var index = 1; index < 3; index++) {
            var poker = new Poker(index);
            poker.x = stageW / 2; //index*40 + 100;
            poker.y = -490 * index; //490;
            poker.anchorOffsetX = poker.width / 2;
            poker.anchorOffsetY = poker.height;
            //            poker.rotation = index-5-1;
            this._Pokers.push(poker);
            this.addChild(poker);
        }
        //var tt = (this._Pokers.length/this.stage.width) *240;
        for (var i = 0; i < this._Pokers.length; i++) {
            var pp = this._Pokers[i];
            var ro = this._Pokers.length / 2;
            var to_x, to_y;
            to_x = i * 60 + stageW / 2 - pp.width / 4;
            to_y = 800;
            pp.rotation = (i - ro) * 3;
            egret.Tween.get(pp).to({ x: to_x, y: to_y }, 1600, egret.Ease.sineInOut);
        }
        var fapai = new eui.Label();
        fapai.x = 500;
        fapai.y = 700;
        fapai.text = "发牌";
        this.addChild(fapai);
        fapai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fapaiHandler, this);
        var r = 640 / 2;
        var a = 640 / 2;
        var b = 1136 / 2;
        for (var times = 0; times < 60; times++) {
            var hudu = (2 * Math.PI / 360) * 6 * times;
            var X = a + Math.sin(hudu) * r;
            var Y = b - Math.cos(hudu) * r; //  注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。
            var ll = new eui.Label;
            ll.x = X;
            ll.y = Y;
            ll.text = times.toString();
            this.addChild(ll);
        }
    };
    Main.prototype.drawCircle = function (x, y) {
        var shape = this.shape;
        shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        shape.graphics.drawCircle(x, y, 1000);
        shape.graphics.endFill();
    };
    Main.prototype.fapaiHandler = function () {
        //this._Pokers
        var pp = new Poker(this._Pokers.length + 1);
        pp.x = this.stage.width / 2; //index*40 + 100;
        pp.y = -346;
        pp.anchorOffsetX = pp.width / 2;
        pp.anchorOffsetY = pp.height;
        this.addChild(pp);
        this._Pokers.push(pp);
        var radius = 640 * 2;
        var centetX = 640 / 2;
        var centerY = 640 * 2.5;
        var ro = this._Pokers.length / 2;
        for (var index = 0; index < this._Pokers.length; index++) {
            var element = this._Pokers[index];
            var hudu = (2 * Math.PI / 360) * 3 * (index - ro);
            var x = centetX + Math.sin(hudu) * radius;
            var y = centerY - Math.cos(hudu) * radius;
            //element.rotation= (index-ro) * 1;
            egret.Tween.get(element).to({ x: x, y: y, rotation: (index - ro) * 3 }, 600, egret.Ease.sineInOut);
        }
        // var p_width = this._Pokers.length * 60 -60;
        // var to_x,to_y=800;
        // to_x = this.stage.width/2 - p_width/2;
        // for (var index = 0; index < this._Pokers.length; index++) {
        //     var element = this._Pokers[index];
        //      var angle:number = 0.2; //2 * Math.PI * index / this._Pokers.length;// 获得角度的大小
        //     var x = centetX + radius * Math.sin(angle) - element.width/2;
        //     var y = centerY + radius * Math.cos(angle) - element.height;
        //     egret.Tween.get(element).to({x:x,y:y},600,egret.Ease.sineInOut);
        //     var ro = this._Pokers.length/2;
        //     element.rotation = (index-ro)*3 ;
        // }
    };
    Main.prototype.createChip = function (money, to_x, to_y, from_x, from_y) {
        if (from_x === void 0) { from_x = 0; }
        if (from_y === void 0) { from_y = 0; }
        var texture = RES.getRes("chips_133x133_png");
        var rtexture = new egret.RenderTexture();
        var img_x, img_y;
        switch (money) {
            case 5:
                img_x = 0;
                img_y = 0;
                break;
            case 10:
                img_x = 133;
                break;
            case 25:
                img_x = 133 * 2;
                break;
            case 100:
                img_y = 133;
                break;
            case 500:
                img_x = 133;
                img_y = 133;
            case 1000:
                img_x = 133 * 2;
                img_y = 133;
                break;
            default:
        }
        rtexture.drawToTexture(new egret.Bitmap(texture), new egret.Rectangle(img_x, img_y, 133, 133), 1);
        var btn = new Chip(rtexture);
        btn.width = 133;
        btn.height = 133;
        btn.x = from_x;
        btn.y = from_y;
        btn.name = "chip_" + money.toString();
        btn.touchEnabled = true;
        btn.money = money;
        this.addChild(btn);
        egret.Tween.get(btn).to({ x: to_x, y: to_y }, 600, egret.Ease.backOut);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chipTouchHandler, this);
        return btn;
    };
    Main.prototype.chipTouchHandler = function (evt) {
        //alert(evt.target.name);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var money = evt.target.money;
        // if(this.touzhu_chip_number>3){
        //     this.touzhu_chip_number=0;
        // }
        //let x=0,y=0;
        // x=this.touzhu_chip_number* 10 + stageW/2-100;
        // this.createChip(money,x,500,evt.target.x,evt.target.y);
        // this.touzhu_chip_number+=1;
        // this.duzhuMoney += money;
        // this.duzhufield.text= this.duzhuMoney.toString();
        // this.allMoney -= money;
        // this.moneyfield.text= this.allMoney.toString();
        var new_chip = Chip.CreateChip(money, evt.target.x, evt.target.y);
        this.addChild(new_chip);
        this._duzhuchips.addChip(new_chip);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    Main.prototype.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map