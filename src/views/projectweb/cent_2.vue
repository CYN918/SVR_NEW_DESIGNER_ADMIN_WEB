<template>
	<div class="pr_cent2_1">
		<div @click="openCent()" class="pr_cent2_2">
			<img  class="pr_cent2_3" :src="deta.banner+'?x-oss-process=image/resize,w_310'"/>
			<div class="pr_cent2_rs" v-if="deta.status==1 || deta.status==2">{{deta.sign_up_num}}人已报名</div>
			<div class="pr_cent2_r2" v-html="tips"></div>
		</div>
		<div class="pr_cent2_4">
			<div @click="openCent()" class="pr_cent2_5">
				<div class="pr_cent2_6">{{deta.name}}</div>
				<div class="pr_cent2_7">项目类型：{{deta.classify_name}}</div>
				<div class="pr_cent2_8">领域范围：<span v-for="(ed,index) in deta.fields">{{ed}}</span></div>	
			</div>
			<div class="pr_cent2_9">
				<div class="pr_cent2_10" v-html="tip"></div>				
				<div class="pr_cent2_11">
					<div v-for="(els,index) in btns" @click="ckd(els.fn)" :class="['btns pend',els.cls]">{{els.n}}</div>
				</div>				
			</div>
		</div>
		
		<div class="sjxd" v-if="deta.extra_reward && deta.extra_reward!='0.00'">
			额外奖金¥{{deta.extra_reward}}
		</div>
		<component v-bind:is="tcZj"  :datad="tcData"></component>
	</div>
	
</template>

<script>


import pushGj from './pushGj';
import qxGj from './qxGj';

import question from './question';
import Log from './log';
import presentation from './presentation';

export default {
	components:{pushGj,qxGj,question,presentation,Log},
	props:{
		elm:{
			type:Object,
			default:{}
		},	
	
	},
	data(){
		return{
			tcZj:'',
			tcData:{},
			djtime:'',
			tips:'',
			tip:'',
			btns:'',
			deta:{},
		}
	},
	mounted: function(){
		this.init();
		this.backtims();
	}, 
	watch: {		
		'elm': function() {
			this.init();
		},
	},
	methods: {	
		ckd(a){
			if(a=='ypj'){this.$message({message:'你已经评价过了'});}
			if(a=='presentation'){
				this.$router.push({path:'/presentation',query:{id:this.deta.id}})	
				return
			}
			this.tcZj = a;
			this.tcData = this.deta;
		},
		close(){
			this.tcZj = '';
		},
		setStaus(on){
			
			this.deta.status = on;
			this.clsfn();
		},
		getData(){
			this.$parent.getData();
		},
		init(){
			this.deta = this.elm;
			this.clsfn();
		},
		clsfn(){
			this.btns = [];
			this.tip = '预计收益：<span>'+this.deta.expected_profit+'</span>';
			if(this.deta.status==1){
				this.tips = '<div class="pr_cent2_r2_1 backdse"><span><span>'+this.deta.left_time.d+'</span>天<span>'+this.deta.left_time.h+'</span>时<span>'+this.deta.left_time.m+'</span>分<span>'+this.deta.left_time.s+'</span>秒</span>后截止报名</div>';
				return
			}
			if(this.deta.status==2){
				this.tips = '<div class="backdse pr_cent2_r2_2">报名已截止，等待平台选标</div>';
				return
			}
			if(this.deta.status==3){

				let be = [{n:'提交稿件',fn:'pushGj',cls:'btns_js'}];
				if(this.deta.is_rejected==1){
					be[0].n = "重新提交";
					be[1] = {n:'交稿记录',fn:'Log'};
				}
				this.btns = be;
				
				
				if(this.deta.is_de){
					this.tips = '<div class="backdse pr_cent2_r2_2">你已延期'+this.deta.delay_time.d+'天'+this.deta.delay_time.h+'小时，请尽快完成</div>';
					return
				}
		
				if(this.deta.delivery_deadline && !(this.deta.delivery_deadline instanceof Array)){
					let otim = this.bckdtimed(this.deta.delivery_deadline);
			
					this.tips = '<div class="pr_cent2_r2_1 backdse"><span>截稿时间：<span>'+otim[0]+'</span></span><span><span>'+otim[1]+'前</span></span></div>';
				
				}
				return
			}
			
			if(this.deta.status==4){
				this.btns = [
					{n:'稿件撤回',fn:'qxGj'}
				];
				this.tips = '<div class="backdse pr_cent2_r2_2">稿件已提交，请等待验收审核</div>';
				return
			}
			if(this.deta.status==5){
				let bd = [
					{n:'验收报告',fn:'presentation'},
					{n:'项目评价',fn:'question'},
				];
				
				if(this.deta.is_evaluated==1){
					bd[1].n = '已评价';
					bd[1].fn = 'ypj';
				}
				this.btns = bd;
				this.tip = '成交价格：<span class="csyaswz_01">'+this.deta.deal_price+'</span>';
				this.tips = '<div class="backdse pr_cent2_r2_2">项目已验收，感谢与你的本次合作</div>';
			}
				
		},
		bckdtimed(t){
		
			let times =new Date(t.replace(/-/g,'/')),
			Y = times.getFullYear(),
			M = times.getMonth()+1,
			D = times.getDate(),
			h = times.getHours(),
			m = times.getMinutes();
			return [(Y+'/'+this.bNus(M)+'/'+this.bNus(D)),(this.bNus(h)+':'+this.bNus(m))];
		},
		bNus(n){ 
			return n<10?'0'+n:n;		
		},
		openCent(){
			if(this.deta.id){
				window.open('/#/prcent?id='+this.deta.id)
			}
			
		},
		backtims(){
			
			let a = this.deta.left_time;
			if(!a || a.length==0){return}
			let str = '';
			if(a.s>0){
				a.s--;				
			}else
			
			if(a.m>0){
				a.s = 59;
				a.m--;
			}else
			if(a.h>0){
				a.s = 59;
				a.m = 59;
				a.h--;
				
			}else
			if(a.d>0){
				a.s = 59;
				a.m = 59;
				a.h = 23;
				a.d--;
				
			}else{
				this.$parent.getData();
				return
			}
			this.djtime = '<span><span class="pr_hs">'+a.d+'</span>d<span class="pr_hs">'+(a.h>9?a.h:'0'+a.h)+'</span>h<span class="pr_hs">'+(a.m>9?a.m:'0'+a.m)+'</span>m<span class="pr_hs">'+(a.s>9?a.s:'0'+a.s)+'</span>s</span>';	
		
		}
	}
}
</script>

<style>
.pr_cent2_1{
	position: relative;
	width:600px;
	height:212px;
	padding: 20px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.pr_cent2_2{
	cursor: pointer;
	position: relative;
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	overflow: hidden;
	width:283px;
	height:212px;
	box-shadow:0px 5px 15px 0px rgba(0,0,0,0.1);
	border-radius:5px 5px 5px 5px;
}
.pr_cent2_3{
	display: block;
	width: 100%;
	height: 100%;
}
.pr_cent2_4{
	display: inline-block;
	vertical-align: top;
	width:290px;
}
.pr_cent2_5{
	cursor: pointer;
	width:290px;
	border-bottom: 1px solid rgba(216,216,216,.3);

}
.pr_cent2_6{
	font-size:16px;
	color:rgba(40,40,40,1);
	line-height:22px;
	margin-bottom: 10px;
	width: 220px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.pr_cent2_7,.pr_cent2_8{
	font-size:12px;
	color:rgba(187,187,187,1);
	
}
.pr_cent2_7{
	margin-bottom: 4px;
	line-height:18px;
}
.pr_cent2_8{margin-bottom: 20px;line-height:22px;}
.pr_cent2_8>span{
	display: inline-block;vertical-align: top;
	margin-right: 5px;
	margin-bottom: 5px;
	padding: 0 8px;
	height: 22px;
	background:rgba(244,246,249,1);
	border-radius:5px;
}
.pr_cent2_rs{
	position: absolute;
    right: 5px;
    top: 5px;
    padding: 1px 8px;
	background:rgba(0,0,0,.5);
	border-radius:3px;
	font-size:12px;
	color:rgba(255,255,255,1);
	line-height:20px;
}
.pr_cent2_r2{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height:32px;
	
	
}
.pr_cent2_r2>div{
	border-radius:0px 0px 5px 5px;
	text-align: center;	
	line-height:32px;
	height: 100%;
	width: 100%;
}

.backdse{
	background:rgba(0,0,0,.7);
}
.pr_cent2_r2_1{		
	font-size:12px;
	color:rgba(255,255,255,.7);		
}
.pr_cent2_r2_1>span{
	margin-right: 4px;
}
.pr_cent2_r2_1>span>span{
	font-family: PingFang SC Medium;
	font-size: 16px;
	margin:0 1px;
	color:rgba(255,255,255,1);
}
.pr_cent2_r2_2{
	font-size:14px;
	color:rgba(255,255,255,1);
}
.pr_cent2_js{
	position: absolute;
    bottom: 80px;
    right: 5px;
    width: 98px;
	
}
.pr_cent2_10{
	margin: 14px 0 20px;
	height:18px;
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:22px;
}
.pr_cent2_10>span{
	font-size:14px;
	color:rgba(51,51,51,1);
}
.pr_cent2_10>span.csyaswz_01{
	font-size:16px;
	color: #33B3FF;
}
.pr_cent2_11>div{
	margin: 0;
	margin-right: 10px;
}
</style>
