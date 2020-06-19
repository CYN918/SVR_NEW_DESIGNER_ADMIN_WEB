<template>
	<div @click="openWork()" class="work1_01">
		<div class="work1_06" :style="bgd(value.face_pic)"></div>
		<div class="work1_07">
			<span class="work1_08">{{value.name}}</span><span class="work1_09"></span>
		</div>
		<div class="work1_10">
			<span class="work1_03 work1_11">{{value.classify_1}}</span><span class="work1_12">{{value.classify_2+'--'+value.classify_3}}</span>
		</div>
		<div class="work1_13">
			<span>
				<img class="work1_14" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/see/zs_icon_gk.svg">
				{{value.comment_num+'9999'}}
			</span><span>
				<img class="work1_15" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/see/zs_icon_dz.svg">
				{{value.like_num}}
			</span>
		</div>
	</div>
</template>

<script>
export default{
	props:{
		value:Object,
	},
	methods:{
		bgd(rl){
			return 'background-image: url('+rl+');'
		},
		openWork(){
			window.open(localStorage.getItem("URL")+"/#/cont?id=" + this.value.id);

		}
	}
}
</script>

<style>
.work1_01{
	cursor: pointer;
	display: inline-block;
	vertical-align: top;
	padding: 20px 15px;
	width:310px;
	height:304px;
	background:rgba(255,255,255,1);
	box-shadow:0px 8px 32px 0px rgba(0,0,0,0.1);
	border-radius:5px;
}
.work1_02{
	display: inline-block;
	vertical-align: top;
	width: 40px;
	height: 40px;
	margin-right: 5px;
	border-radius: 50%;
}
.work1_03{
	display: inline-block;
	vertical-align: top;
}
.work1_04{
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	margin-bottom: 2px;
}
.work1_05{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.work1_06{
	width:310px;
	height:232px;
	margin-bottom: 10px;
	border-radius:5px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%,50%;
}
.work1_01_1{
	margin-bottom: 20px;
}
.work1_07{
	margin-bottom: 6px;
}
.work1_08{
	width:291px;
	height:20px;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	
}
.work1_11{
	height: 22px;
	padding: 0 8px;
	background:rgba(244,246,249,1);
	border-radius:2px;
	font-size:12px;
	color:rgba(153,153,153,1);
	line-height:22px;
	margin-right: 5px;
}
.work1_12{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:22px;
}
.work1_10{
	margin-bottom: 10px;
}
.work1_13>span{
	display: inline-block;
	vertical-align: top;
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
	width: 75px;
}
.work1_13>span>img{
	display: inline-block;
	vertical-align: top;
}
.work1_14{
	margin-top: 4px;
}
.work1_15{
	margin-top: 3px;
}
</style>
