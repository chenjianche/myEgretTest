var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Poker = (function (_super) {
    __extends(Poker, _super);
    function Poker(pokerId) {
        var _this = _super.call(this) || this;
        _this._pokerId = pokerId;
        _this.init();
        return _this;
    }
    Poker.prototype.init = function () {
        var texture = RES.getRes("poker_png");
        var rtexture = new egret.RenderTexture();
        var img_x, img_y, img_w = 256, img_h = 346, column = 9;
        var id = this._pokerId - 1;
        var row = parseInt((id / column).toString());
        var col = id % column;
        img_x = col * img_w;
        img_y = row * img_h;
        rtexture.drawToTexture(new egret.Bitmap(texture), new egret.Rectangle(img_x, img_y, img_w, img_h), 0.7);
        this.texture = rtexture;
        // let btn:Chip = new Chip(rtexture);
        // btn.width=133;
        // btn.height=133;
        // btn.x =from_x;
        // btn.y =from_y;
        // //btn.name = "chip_"+ money.toString();
        // btn.touchEnabled = true;
        // btn.money = money;
        //this.anchorOffsetX = this.width/2;
        // this.anchorOffsetY = this.height;
        // this.rotation = 10 * this._pokerId;
        // this.y += 346;
    };
    return Poker;
}(egret.Bitmap));
__reflect(Poker.prototype, "Poker");
//# sourceMappingURL=Poker.js.map