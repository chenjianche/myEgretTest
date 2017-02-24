var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fighter;
(function (fighter) {
    /**
     * buff
     */
    var Buff = (function (_super) {
        __extends(Buff, _super);
        function Buff(texture, buffType, textureName) {
            var _this = _super.call(this) || this;
            _this._BuffType = buffType;
            _this.bmp = new egret.Bitmap(texture);
            _this.textureName = textureName;
            _this.addChild(_this.bmp);
            return _this;
        }
        /**生产 */
        Buff.produce = function (textureName, buffType) {
            if (fighter.Buff.cacheDic[textureName] == null)
                fighter.Buff.cacheDic[textureName] = [];
            var dict = fighter.Buff.cacheDic[textureName];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new fighter.Buff(RES.getRes(textureName), buffType, textureName);
            }
            return theFighter;
        };
        /**回收 */
        Buff.reclaim = function (theFighter) {
            var textureName = theFighter.textureName;
            if (fighter.Buff.cacheDic[textureName] == null)
                fighter.Buff.cacheDic[textureName] = [];
            var dict = fighter.Buff.cacheDic[textureName];
            if (dict.indexOf(theFighter) == -1) {
                dict.push(theFighter);
            }
        };
        Object.defineProperty(Buff.prototype, "BuffType", {
            get: function () {
                return this._BuffType;
            },
            enumerable: true,
            configurable: true
        });
        return Buff;
    }(egret.DisplayObjectContainer));
    Buff.cacheDic = {};
    fighter.Buff = Buff;
    __reflect(Buff.prototype, "fighter.Buff");
    var BuffTypes;
    (function (BuffTypes) {
        BuffTypes[BuffTypes["BloodAdd"] = 0] = "BloodAdd";
        BuffTypes[BuffTypes["PowerUp"] = 1] = "PowerUp";
    })(BuffTypes = fighter.BuffTypes || (fighter.BuffTypes = {}));
})(fighter || (fighter = {}));
//# sourceMappingURL=Buff.js.map