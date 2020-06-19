<template>
	<div class="banner">
		<div class="banner1">
			<img v-for="(el,index) in list" @click="getimgulr(el)" :class="backcls(index)" :src="el" alt="">
		</div>
		<div v-if="list.length>1" class="bannerBtn">
			<div class="banner_jt pend banner_jt1" @click="checkBan1()"></div>
			<div class="banner_jt pend banner_jt2" @click="checkBan2()"></div>
		</div>
		
		<div class="maskimg screenContent" v-if="isimgurl" @click="getimgulr">
			<img :src="imgurl" alt="暂无图片" style="max-height:500px;">
		</div>
	</div>
</template>

<script>
export default{
	props:{value:String},
	data(){
		return {
			isimgurl:false,
			tancD:{
				zj:''
			},
			list:[],
			on:0,
			jsan:'',
			
			
			nexOn:0,
			outc:{
				num:'',
				scroll:2,
			},
			imgurl:'',
		}
	},
	mounted: function () {
		this.getBanner();		
	}, 
	methods: {
		getimgulr(rel){
			this.imgurl = rel;
			this.isimgurl = !this.isimgurl;
		},
		backcls(inx){
			if(inx==this.on){
				return 'action'
			}
			if(this.nexOn!=this.on && inx==this.nexOn){
				return 'actionno';
			}
			return '';
		},

		getBanner(){
		
			let arr = [];
			
			try{
				arr = JSON.parse(this.value);
			}catch(e){
				arr = [this.value];
			}
			
			this.list = arr;		
		},

		checkBan(on){
			if(this.on==on){
				return
			}

			this.nexOn = this.on;
			this.on = on;
		},
		checkBan1(){
		
			this.nexOn = this.on;
			if(this.on>0){
				this.on--;
				return
			}
			this.on = this.list.length-1;
		},
		checkBan2(){
		
			this.nexOn = this.on;
			if(this.on<this.list.length-1){
			
				this.on++;				
				return
			}
			
			this.on = 0;
		},		
	}
	
	
}
</script>

<style>
.banner{
	position: relative;
	background: #FFFFFF;
	overflow: hidden;
	/* padding-bottom: 31.25%; */
	width: 100%;
	height: 100%;
}

.banner_jt{
	position: absolute;
	top: 0;
	width: 28px;
	height: 100%;
/* 	opacity: 0.2;
	background: #000000;
	border-radius: 50%; */
}
.banner_jt:after{
    content: "";
    position: absolute;	
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border: 2px solid #fff;
    border-right: 0;
    border-bottom: 0;
    -webkit-transform: translate(-35%,-50%) rotate(-45deg);
    transform: translate(-35%,-50%) rotate(-45deg);
}
.banner_jt1{	
    left:3.6%;
}
.banner_jt2{	
    right: 3.6%;
    -webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.banner_nav1{
	position: absolute;
	bottom: 365px;
	width: 100%;
	text-align: center;
}
.banner_nav1>span{
	display: inline-block;
	width: 16px;
	height: 4px;	
	background: #D8D8D8;
	border-radius: 4px;
	margin-right: 8px;
}
.banner_nav1>span:last-child{
	margin-right: 0;
}
.banner_nav1>span.action{
	width: 24px;
	background: #fff;
}
.banner_nav1>span:hover{
	cursor: pointer;
}

.banner1{
	position: relative;
	width: 100%;
	height: 100%;
}
.banner1>img{
	cursor: pointer;
	opacity: 0;
	width: 100%;
	max-height: 356px;
	position: absolute;
	top: 0;
	left: 0;
	display: none;
	border-radius: 5px;
}
.banner1>img.action{
	-webkit-animation: jxd 2s forwards;
	animation: jxd 2s forwards;
	display: block;

}
.banner1>img.actionno{
	z-index: 10;
	pointer-events: none;
	-webkit-animation: jxd2 2s forwards;
	animation: jxd2 2s forwards;
	display: block;
}

@-webkit-keyframes jxd{
	from {opacity: 0}
	to{opacity: 1}
}
@keyframes jxd{
	from {opacity: 0}
	to{opacity: 1}	
}
@-webkit-keyframes jxd2{
	from {opacity: 1;visibility: visible;}
	to{opacity: 0;visibility: hidden;}
}
@keyframes jxd2{
	from {opacity: 1;visibility: visible;}
	to{opacity: 0;visibility: hidden;}	
}
</style>
