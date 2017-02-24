/**
 * Created by shaorui on 14-6-6.
 */
module fighter
{
    export class GameUtil
    {
        /**基于矩形的碰撞检测*/
        public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var mm:egret.Bitmap;
            var rect1:egret.Rectangle = obj1.getBounds();
            var rect2:egret.Rectangle = obj2.getBounds();
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
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}