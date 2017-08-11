var koa = require('koa');
var app = new koa();
const route = require('koa-route');
var mysql = require('mysql');
var util = require('./util');
// 
//  index.js
//  <project>
//  KOA与MySQL搭建后台服务，提供json接口
//  Created by licheng09 on 2017-08-11.
//  Copyright 2017 licheng09. All rights reserved.
// 

var connection = mysql.createConnection({
	host: 'test1267.db.58dns.org',
	port: '13312',
	user: 'jinrong_rw',
	password: '0c414262412d5be1',
	database: 'dbwww58com_jrportal'
});

connection.connect();

const main = ctx => {
	ctx.response.type = 'html';
	ctx.response.body = 'Hello World <br/> <a href="/about">用户列表</a>';
};
const about= async (ctx, next) => {
  	 ctx.response.type = 'application/json';
  	 //phone=17710800540
  	 var sql="";
  	 if(ctx.request.query.phone){
  	 	sql='SELECT * FROM t_portal_user WHERE phone='+ctx.request.query.phone;
  	 }else{
  	 	sql='SELECT * FROM t_portal_user';
  	 }
	 let data1 =  await util.promise(function(resolve,  reject){
			 connection.query(sql, function(error, results, fields) {
				if(error) throw error;
				resolve(results);
			 });
		})
  		 ctx.response.body = data1;
}

app.use(route.get('/', main));
app.use(route.get('/about', about));
app.listen(3000);
console.log('listening on port 3000');





