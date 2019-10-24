<template>
	<div class="pr_bg_00">
		<div class="pr_bg_01">
			<div class="pr_bg_02">验收报告</div>
			<div class="pr_bg_03">
				<div class="pr_bg_03_1">
					<img class="pr_bg_03_1_1" :src="das.banner" alt="">
					<div class="pr_bg_03_1_2">
						<div class="pr_bg_03_1_2_1">
							<div class="pr_bg_03_1_2_1_1">项目名称：{{das.name}}</div>
							<div class="pr_bg_03_1_2_1_2">项目类型：{{das.classify_name}}<!-- <span></span> --><!-- 成交方式：{{backf(das.deal_type)}} --></div>
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
					<div class="pr_bg_03_2_2">¥ {{mJs.money_deiv(das.deal_price)}}</div>
					<div class="pr_bg_03_2_3">感谢您本次的项目合作，如有疑问可前往 <router-link to="/help">帮助中心</router-link> 了解更多</div>
				</div>
			</div>
			
			<div class="pr_bg_04">
				<div class="pr_bg_04_1">价格计算详情</div>
				<div class="pr_bg_04_2">成交价格=验收价格+额外奖金-延期交稿+收益加成<br/>¥ 1,284.00 = ¥ 1,140.00 + ¥ 500.00 - ¥ 228.00</div>
				<div class="pr_bg_04_3">
					<div>
						<div class="pr_bg_04_3_1">验收价格</div>
						<div class="pr_bg_04_3_2">+ ¥ {{mJs.money_deiv(das.acceptance_price)}}</div>
					</div><div>
						<div class="pr_bg_04_3_1">额外奖金</div>
						<div class="pr_bg_04_3_2">+ ¥ {{mJs.money_deiv(das.extra_reward)}}</div>
					</div><div>
						<div class="pr_bg_04_3_1">{{das.delay_day}}天 延期交稿</div>
						<div class="pr_bg_04_3_2 pr_bg_04_3_3">- ¥ {{mJs.money_deiv(das.deduction_price)}}</div>
						<img class="pr_bg_04_3_4" @mouseout="mod()" @mouseover="modx($event,0)" src="/imge/project/09.svg">
					</div><div>
						<div class="pr_bg_04_3_1">{{das.gain_share_rate}} 收益加成</div>
						<div class="pr_bg_04_3_2">+ ¥ {{mJs.money_deiv(das.gain_share_price)}}</div>
						<img class="pr_bg_04_3_4" @mouseout="mod()" @mouseover="modx($event,1)" src="/imge/project/09.svg">
					</div>
					
					
					
				</div>
				<div class="pr_bg_04_4">
					<div @click="back()" class="btns pend">返回</div>
					<div @click="goTo('/project')" class="btns btns_js pend">继续承接项目</div>
				</div>
			</div>
		</div>
		<tipd :class="tipOn==1?'newd2':'newd'" :tipCent="csff" :style="sfas" ref="csdf"></tipd>
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
			tips:['延期交稿将最多按照<span style="color:red;">项目验收价格*10%*延期天数</span>扣除收益，实际扣除金额请以验收报告显示为准','bbbbbbbbbbbbbb'],
			das:{},
			num2:0,
			syNum:'0%',
			tipOn:0,
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
			
			if(!this.$route.query.id){
				this.$router.push({path:'/index'})	
			}
			
			this.pr_gtreport();
			this.getIOFN();
		},
		mod(e){
			this.sfas = 'display:none';
		},
		
		getIOFN(){
			let pr = {};
			this.api.Income_info(pr).then((da)=>{
				
				if(da=='error'){return}
		
				this.syNum = da.gain_share_rate;
				this.num2 = da.total_income;				
				let pList = [
				{a:3000,b:'3,000.00',c:'5%'},
				{a:20000,b:'20,000.00',c:'15%'},
				{a:50000,b:'50,000.00',c:'20%'},
				{a:120000,b:'120,000.00',c:'25%'},
				{a:300000,b:'300,000.00',c:'30%'},
					
				];
				let str = '<div class="sytc_1"><div class="sytc_1_1"><div>当前累计收益：<span>￥ ';
				str+=this.num2+'</span></div><div>当前收益加成：<span class="sytc_1_1x">+ '+this.syNum;
				str+='</span></div></div><div class="sytc_1_2">收益成长任务</div><div class="sytc_1_3">';
				str+='达成收益条件，之后每单项目均会获得额外百分比收益加成</div><div class="sytc_1_4">项目加成收益=验收价格*收益加成比';
				str+='</div></div><div class="sytc_2"><div class="sytc_2_1"><span>达成条件</span><span>收益加成</span></div>';
				
				for(let i=0,n=pList.length;i<n;i++){
					str+='<div class="'+(this.num2>=pList[i].a?'sydpjcOn':'')+'"><span>累计收益达到 ￥ '+pList[i].b+'</span><span>+ '+pList[i].c+'</span></div>';
					
				}
				str+='</div><div>注:本次收益加成计算,以完成本次项目之前的等级加成为准</div>'
				this.tips[1] = str;
	
			})

		},
		modx(e,on){
			this.csff = this.tips[on];
			this.tipOn = on;
			this.setPos(e.clientX,e.clientY);
		},	
		setPos(x,y){
			this.sfas = 'top:'+y+'px;left:'+x+'px';
		},
		back(){
			this.$router.push({path:'/projectAll'})	
		},
		goTo(on){
			this.$router.push({path: on})	
		},
		pr_gtreport(){
		
			this.api.pr_gtreport({
				project_id:this.$route.query.id,
			}).then((da)=>{
				if(da=='error'){return}
				this.das = da;
				
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
.newd{
	max-width: 280px;
    width: 276px;
}
.pr_bg_00{
	background:rgba(244,246,249,1);
}
.pr_bg_01{
	margin: 20px auto 40px;
	padding: 30px 40px;
	width:1220px;

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
}
.pr_bg_03_1_2{
	display: inline-block;
	vertical-align: top;
	width:420px;
}
.pr_bg_03_1_2_1{	
	border-bottom: 1px solid rgba(244,246,249,1);
	border-radius:5px;
	margin-bottom: 10px;
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
	margin-bottom: 10px;
	height: 32px;
}
.pr_bg_03_1_2_2>span{
	display: inline-block;
	vertical-align: middle;
	margin-left: 19px;
	font-size:24px;
	font-weight:600;
	color:#33B3FF;

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
	color:#33B3FF;
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
	color: #33B3FF;
	font-weight: bold;
}
.pr_bg_04_1{
	font-size:24px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:33px;
	margin: 50px auto 20px;
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
	margin-bottom: 60px;
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
	color:#33B3FF;
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
.cen_tiop_01.newd2 {
    transform: translate(-105%,-30%);
    width: 370px;
    max-width: 370px;
}
.cen_tiop_01.newd2:after{
	top: 162px;
    right: -8px;
    left: auto;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
}
.cen_tiop_01.newd2>div{
	padding: 30px 0;
}
</style>
