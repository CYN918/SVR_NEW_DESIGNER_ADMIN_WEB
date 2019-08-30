<template>
	<div class="pr_bg_00">
		<div class="pr_bg_01">
			<div class="pr_bg_02">验收报告</div>
			<div class="pr_bg_03">
				<div class="pr_bg_03_1">
					<img class="pr_bg_03_1_1" src="" alt="">
					<div class="pr_bg_03_1_2">
						<div class="pr_bg_03_1_2_1">
							<div class="pr_bg_03_1_2_1_1">项目名称：{{das.name}}</div>
							<div class="pr_bg_03_1_2_1_2">项目类型：{{das.classify_name}}<span></span>成交方式：{{backf(das.deal_type)}}</div>
						</div>
						<div class="pr_bg_03_1_2_2">
							项目评价<span>{{das.level}}</span>
						</div>
						<div class="pr_bg_03_1_2_3">
							领域范围：<span v-for="(el,index) in das.fields" :key="index">{{el}}</span>
						</div>
					</div>
				</div>
				<div class="pr_bg_03_2">
					<div class="pr_bg_03_2_1">最终成交价格</div>
					<div class="pr_bg_03_2_2">¥ {{das.deal_price}}</div>
					<!-- <div class="pr_bg_03_2_3">感谢您本次的项目合作，如有疑问可前往 <router-link to="/help">帮助中心</router-link> 了解更多</div> -->
				</div>
			</div>
			
			<div class="pr_bg_04">
				<div class="pr_bg_04_1">价格计算详情</div>
				<div class="pr_bg_04_2">成交价格=验收价格+额外奖金-延期交稿+收益加成<br/>¥ 1,284.00 = ¥ 1,140.00 + ¥ 500.00 - ¥ 228.00</div>
				<div class="pr_bg_04_3">
					<div>
						<div class="pr_bg_04_3_1">验收价格</div>
						<div class="pr_bg_04_3_2">+ ¥ {{das.acceptance_price}}</div>
					</div><div>
						<div class="pr_bg_04_3_1">额外奖金</div>
						<div class="pr_bg_04_3_2">+ ¥ {{das.extra_reward}}</div>
					</div><div>
						<div class="pr_bg_04_3_1">{{das.delay_day}}天 延期交稿</div>
						<div class="pr_bg_04_3_2 pr_bg_04_3_3">- ¥ {{das.deduction_price}}</div>
						<img class="pr_bg_04_3_4" @mouseout="mod()" @mouseover="modx($event,0)" src="/imge/project/09.svg">
					</div><div>
						<div class="pr_bg_04_3_1">{{das.gain_share_rate}} 收益加成</div>
						<div class="pr_bg_04_3_2">+ ¥ {{das.gain_share_price}}</div>
						<img class="pr_bg_04_3_4" @mouseout="mod()" @mouseover="modx($event,1)" src="/imge/project/09.svg">
					</div>
					
					
					
				</div>
				<div class="pr_bg_04_4">
					<button @click="back()" class="defaultbtn">返回</button>
					<!-- <div @click="goTo('/project')" class="btns btns_js pend">继续承接项目</div> -->
				</div>
			</div>
		</div>
		<!-- <tipd :tipCent="csff" :style="sfas" ref="csdf"></tipd> -->
	</div>
		
</template>
<script>
import tipd from './cenTip';
export default {
	components:{tipd},
	data(){
		return{
			sfas:'',
			csff:'ccccccc',
			tips:['aaaaaaaaaaaaa','bbbbbbbbbbbbbb'],
			das:{}
		}
	},
	mounted: function(){
		this.init();
	}, 
	methods: {	
		backf(on){
			return on==1?'买断式':'分成式';
		},
		init(){
	
			
			
			this.pr_gtreport();
		},
		mod(e){
			this.sfas = 'display:none';
		},
		modx(e,on){
			this.csff = this.tips[on];
			this.setPos(e.clientX,e.clientY);
		},	
		setPos(x,y){
			this.sfas = 'top:'+y+'px;left:'+x+'px';
		},
		back(){
			this.$router.go(-1);
		},
		goTo(on){
			this.$router.push({path: on})	
		},
		pr_gtreport(){
		
			this.api.projectdetail({
				project_id:this.$route.query.project_id,
				access_token:localStorage.getItem("access_token")
			}).then((da)=>{
				if(da=='error'){return}
				this.das = da;
				console.log(da);
			}).catch(()=>{
				
			});
		},
		close(){
			this.$parent.close();
		},
	}
}		
	
</script>

<style>
.pr_bg_00{
	background:rgba(244,246,249,1);
}
.pr_bg_01{
	margin: 40px auto;
	padding: 30px 40px;
	width:1220px;
	height:709px;
	text-align: left;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.pr_bg_02{
	
	height: 63px;
	
	font-size:24px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:33px;
	text-align: center;
	
}
.pr_bg_03{
	padding: 30px 0;
	border-bottom: 1px solid rgba(244,246,249,1);
	border-top: 1px solid rgba(244,246,249,1);
	border-radius:5px;
}
.pr_bg_03>div{
	display: inline-block;
	vertical-align: top;
}
.pr_bg_03_1_1{
	display: inline-block;
	vertical-align: top;
	width:214px;
	height:160px;
	margin-right: 20px;
	box-shadow:0px 5px 15px 0px rgba(0,0,0,0.1);
	border-radius:5px 5px 5px 5px;
}
.pr_bg_03_1_2{
	display: inline-block;
	vertical-align: top;
	width:420px;
}
.pr_bg_03_1_2_1{	
	border-bottom: 1px solid rgba(244,246,249,1);
	border-radius:5px;
	margin-bottom: 17px;
}

.pr_bg_03_1_2_1_1{
	font-size:16px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:22px;
	margin-bottom: 9px;
}
.pr_bg_03_1_2_1_2{
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
	height: 20px;
	margin-bottom: 20px;
}
.pr_bg_03_1_2_1_2>span{
	display: inline-block;
	margin: 4.5px 20px;
	vertical-align: top;
	width:1px;
	height:11px;
	background:rgba(51,51,51,1);
	opacity:0.5;
}
.pr_bg_03_1_2_2,.pr_bg_03_1_2_3{
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:32px;
	margin-bottom: 17px;
	height: 32px;
}
.pr_bg_03_1_2_2>span{
	display: inline-block;
	vertical-align: middle;
	margin-left: 19px;
	font-size:24px;
	font-weight:600;
	color:rgba(255,81,33,1);

}
.pr_bg_03_1_2_3>span{
	display: inline-block;
	vertical-align: middle;
	margin-right: 10px;
	height: 32px;
	padding: 0 18px;
	background:rgba(244,246,249,1);
	border-radius:5px;
	font-size:12px;
	color:rgba(187,187,187,1);

}
.pr_bg_03_2{
	float: right;
	text-align: right;
}
.pr_bg_03_2_1{
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
	margin-bottom: 20px;
}
.pr_bg_03_2_2{
	font-size:48px;
	font-weight:600;
	color:rgba(255,81,33,1);
	line-height:34px;
	margin-bottom: 57px;
}
.pr_bg_03_2_3{
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.pr_bg_03_2_3>a{
	color: #FF5121;
	font-weight: bold;
}
.pr_bg_04_1{
	font-size:24px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:33px;
	margin: 30px auto 20px;
}
.pr_bg_04_2{
	font-size:12px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
	margin-bottom: 40px;
}
.pr_bg_04_3{
	margin-bottom: 30px;
}
.pr_bg_04_3>div{
	position: relative;
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	width:288px;
	height:158px;
	border-radius:10px;
	text-align: center;
	border:1px solid rgba(151,151,151,1);
}
.pr_bg_04_3>div:nth-child(4n+4){
	margin-right: 0;
}
.pr_bg_04_3_1{
	margin: 43px auto 20px;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.pr_bg_04_3_2{
	font-size:24px;
	font-weight:600;
	color:rgba(255,81,33,1);
	line-height:34px;
}
.pr_bg_04_3_3{
	color: #4DC600;
}
.pr_bg_04_3_4{
	position: absolute;
	top: 15px;
	right: 15px;
	width: 14px;
	height: 14px;
	cursor: pointer;
}
.pr_bg_04_4{
	text-align: center;
}
</style>
