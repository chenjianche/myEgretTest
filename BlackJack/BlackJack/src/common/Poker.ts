class Poker extends egret.Bitmap{
	public constructor(pokerId:number) {
		super();
		this._pokerId = pokerId;
		this.init();
	}
	private _pokerId:number;
	private init(){
		var texture:egret.Texture = RES.getRes("poker_png");           
        let rtexture = new egret.RenderTexture();
        var img_x,img_y,img_w=256,img_h=346,column=9;
		var id= this._pokerId-1;
		var row = parseInt((id/column).toString());
		var col = id % column;
				
        img_x = col*img_w;
		img_y = row*img_h;

        rtexture.drawToTexture( new egret.Bitmap(texture),new egret.Rectangle(img_x,img_y,img_w,img_h),0.7);

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
	}
}