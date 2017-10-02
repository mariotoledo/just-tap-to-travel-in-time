Main.ScaleHelper = function(){
};

Main.ScaleHelper.prototype = {
	getScaleRatio: function(){
    return window.devicePixelRatio > 1 ? 2 / window.devicePixelRatio : window.devicePixelRatio;
	}
}