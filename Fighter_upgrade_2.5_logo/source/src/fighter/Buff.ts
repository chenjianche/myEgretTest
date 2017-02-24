module fighter {
	/**
	 * buff
	 */
	export class Buff extends egret.DisplayObjectContainer {

		
		private static cacheDic:Object={};
		/**生产 */
		public static produce(textureName:string,buffType:BuffTypes):fighter.Buff{
			if(fighter.Buff.cacheDic[textureName]==null)
				fighter.Buff.cacheDic[textureName]=[];
			var dict:fighter.Buff[]= fighter.Buff.cacheDic[textureName];
			var theFighter:fighter.Buff;
			if(dict.length>0){
				theFighter = dict.pop();
			}else{
				theFighter = new fighter.Buff(RES.getRes(textureName),buffType,textureName);
			}
			return  theFighter;
		}
		/**回收 */
		public static reclaim(theFighter:fighter.Buff):void{
			var textureName:string = theFighter.textureName;
			if(fighter.Buff.cacheDic[textureName]==null)
				fighter.Buff.cacheDic[textureName]=[];
			var dict:fighter.Buff[] = fighter.Buff.cacheDic[textureName];
			if(dict.indexOf(theFighter)==-1){
				dict.push(theFighter);
			}
		}

		/**buff位图 */
		private bmp:egret.Bitmap;
		//可视为buff类型名
		public textureName:string;
		/**buff类型 */
		private _BuffType : BuffTypes;
		public get BuffType() : BuffTypes {
			return this._BuffType;
		}	

		public constructor(texture:egret.Texture,buffType:BuffTypes,textureName:string) {
			super();
			this._BuffType = buffType;
			this.bmp = new egret.Bitmap(texture);
			this.textureName = textureName;
			this.addChild(this.bmp);
		}
	}

	export enum BuffTypes{
		BloodAdd,
		PowerUp
	}
}