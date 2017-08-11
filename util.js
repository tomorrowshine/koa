var promise=function(next){
	 return new Promise((resolve,  reject) => {
	 	next(resolve,  reject);
     })
};

module.exports = {promise:promise};