var egretContext=(function(){
    function egretContext(){

    }
    egretContext.showLogin = function(headUrl,userName){
       //fbLogin(callBack);
       this.egret.Login(headUrl,userName);
    };

    egretContext.SetEgret= function(egret){
        this.egret = egret;
    };

    egretContext.showFriends = function(data){
        this.egret.showFriends(data);
    };

    return egretContext;
})();