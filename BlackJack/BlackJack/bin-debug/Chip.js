var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var Chip = (function (_super) {
    __extends(Chip, _super);
    function Chip() {
        return _super.apply(this, arguments) || this;
    }
    Chip.CreateChip = function (money, from_x, from_y) {
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
        //btn.name = "chip_"+ money.toString();
        btn.touchEnabled = true;
        btn.money = money;
        return btn;
    };
    return Chip;
}(egret.Bitmap));
__reflect(Chip.prototype, "Chip");
var DuZhuChips = (function () {
    function DuZhuChips() {
        this.chips = [];
        this.max_chips = 10;
    }
    DuZhuChips.prototype.addChip = function (chip) {
        this.chips.push(chip);
        var x;
        if (this.chips.length <= this.max_chips) {
            x = this.to_X + 15 * (this.chips.length - 1);
        }
        else {
            x = this.to_X + 15 * (this.max_chips - 1);
        }
        egret.Tween.get(chip).to({ x: x, y: this.to_Y }, 400, egret.Ease.backOut);
        if (this.chips.length > this.max_chips) {
            for (var i = 0; i < this.max_chips; i++) {
                var nn = this.chips.length - (this.max_chips - i);
                var cc = this.chips[nn];
                var x_1 = this.to_X + 15 * i;
                egret.Tween.get(cc).to({ x: x_1, y: this.to_Y }, 200, egret.Ease.sineIn);
            }
        }
    };
    return DuZhuChips;
}());
__reflect(DuZhuChips.prototype, "DuZhuChips");
var BtnChip = (function (_super) {
    __extends(BtnChip, _super);
    function BtnChip() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.chipTouchHandler, _this);
        return _this;
    }
    BtnChip.prototype.chipTouchHandler = function (evt) {
    };
    return BtnChip;
}(Chip));
__reflect(BtnChip.prototype, "BtnChip");
//# sourceMappingURL=Chip.js.map