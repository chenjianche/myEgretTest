// TypeScript file
class Chip extends egret.Bitmap{

    //当前筹码对应的金额
    public money:number;

    public static CreateChip(money:number,from_x:number=0,from_y:number=0):Chip{
        var texture:egret.Texture = RES.getRes("chips_133x133_png");           
        let rtexture = new egret.RenderTexture();
        var img_x,img_y;

        switch(money){
            case 5:
            img_x=0;
            img_y=0;
            break;
            case 10:
            img_x=133;
            break;
            case 25:
            img_x=133*2;
            break;
            case 100:
            img_y=133;
            break;
            case 500:
            img_x=133;
            img_y=133;
            case 1000:
            img_x=133*2;
            img_y =133;
            break;
            default:
        }

        rtexture.drawToTexture( new egret.Bitmap(texture),new egret.Rectangle(img_x,img_y,133,133),1)

        let btn:Chip = new Chip(rtexture);
        btn.width=133;
        btn.height=133;

        btn.x =from_x;
        btn.y =from_y;
        
        //btn.name = "chip_"+ money.toString();
        btn.touchEnabled = true;
        btn.money = money;

        return btn;
    }
}
class DuZhuChips{
    public chips:Array<Chip>=[];
    public to_X:number;
    public to_Y:number;
    public max_chips:number=10;
    public addChip(chip:Chip){

        this.chips.push(chip);
        let x:number;
        if(this.chips.length<=this.max_chips){
            x= this.to_X+15* (this.chips.length-1);
        }else{
            x= this.to_X+15* (this.max_chips-1);
        }
        egret.Tween.get(chip).to({x:x,y:this.to_Y},400,egret.Ease.backOut);

        if(this.chips.length>this.max_chips){
            for(let i:number=0;i<this.max_chips;i++){
                var nn = this.chips.length-(this.max_chips-i);
                var cc = this.chips[nn];
                let x:number = this.to_X+15*i;
                egret.Tween.get(cc).to({x:x,y:this.to_Y},200,egret.Ease.sineIn);
            }
        }
    }   
}
class BtnChip extends Chip{
    public constructor() {
        super();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.chipTouchHandler,this);
    }
    public chipTouchHandler(evt:egret.TouchEvent){

    }
}