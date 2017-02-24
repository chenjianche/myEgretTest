var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by shaorui on 14-6-6.
 */
var fighter;
(function (fighter) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        /**基于矩形的碰撞检测*/
        GameUtil.hitTest = function (obj1, obj2) {
            var mm;
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
            // var r1 = obj1.width/2;
            // var x1 = obj1.x +r1;
            // var y1 = obj1.y +r1;
            // var r2 = obj2.width/2;
            // var x2 = obj2.x+r2;
            // var y2 = obj2.y+r2;
            // if(Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))<= r1+r2){
            //     return true;
            // }
            // return false;
        };
        return GameUtil;
    }());
    fighter.GameUtil = GameUtil;
    __reflect(GameUtil.prototype, "fighter.GameUtil");
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    fighter.createBitmapByName = createBitmapByName;
})(fighter || (fighter = {}));
//# sourceMappingURL=GameUtil.js.map