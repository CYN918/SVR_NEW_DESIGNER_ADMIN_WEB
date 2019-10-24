<template>
	<div class="pr_box">
		
		
		<div class="pr_02_1Box">
			<pTop class="" :cn="topCn">
				<template v-slot:todo="{ todo }">
					<div class="pr_02_1">
						<span 
						v-for="(el,index) in prLn" 
						:key="index"
						:class="['pr_02_2 pend',type==index?'pr_02_2On':'']"
						@click="qhNav(index,todo)"
						>{{el.classify_name+'（'+el.project_num+'）'}}</span>
						<span @click="goOn('/help',{on:'4_1'})" class="pr_02_3 pend">项目承接指南</span>
					</div>
				</template>		
			</pTop>
		</div>
		<div class="pr_02">
			<list :isDjs="'1'" :page="setPage" :config="data" class="iopdlf_01" ref="sfafa">
				<template v-slot:todo="{ todo }">
					<cent :djs="djson"  :el="todo"></cent>
				</template>			
			</list>
		</div>
	</div>
</template>
<script>
import list from '../../components/list';
import pTop from '../../components/postionTop';
import cent from './cent_1';
export default {
	components:{list,cent,pTop},
	name: 'home',
	data(){
		return {
			data:{
				ajax:{
					url:'pr_list',
				},
				pr:{
					
				},
				bdtj:[['首页','翻页'],['首页','更改单页显示数']]
				
			},	
			topCn:{
				min:284,
			},
			setPage:{page:1,limit:10,size:[10,20,40,60]},
			bdtjdata:[['首页','作品'],['首页','创作者']],
			type:0,
			cont:50,
			djson:0,
			prLn:[],
			djsOb:'',
		}
	},
	mounted: function(){
		this.getCl();
		
	}, 
	methods: {
		goOn(on,cs){
			this.$router.push({path:on,query:cs})	
		},
		getCl(){
			this.mJs.scTop(1);		
			this.api.pr_classifyInfo().then((da)=>{
				if(da=='error'){
					return
				}				
				this.prLn = da;
			})
		},
		
		stardjs(){
			clearInterval(this.djsOb);
			this.djsOb = setInterval(()=>{
				if(this.$route.name!='project'){
					clearInterval(this.djsOb);
				}
				this.djson = this.djson==1?0:1;
			},1000);
		},
		djsjs(){
			clearInterval(this.djsOb);
			this.$refs.sfafa.getData();
		},
		qhNav(on,c){
			if(on==this.type){return}
			if(c){
				this.mJs.scTop(284);
			}
			this.type=on;
			if(this.prLn[on].id){
				this.data.pr.classify_id = this.prLn[on].id;
				
			}else{
				this.data.pr = {};
			}			
			this.$refs.sfafa.sxfn();
			
		}
	}
}
</script>

<style>
.pr_box{
	background:rgba(244,246,249,1);
}
.pr_01{
	padding: 40px 0;
    text-align: left;
	background: #fff;
}
.pr_01>div{
	margin: 0 auto;
	width: 1300px;
}
.pr_01_1{
	margin-bottom: 20px;
	font-size:36px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:50px;
	font-family:PingFang SC Regular;
}
.pr_01_2{
	display: inline-block;
	background: #33b3ff;
	color: #fff;	
}
.pr_01_3{
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.pr_02{
	padding: 0 0 50px;
	margin: 0 auto;
	width: 1300px;
}
.pr_02_1Box{
	width: 100%;
	line-height: 80px;
    height: 80px;
    margin-bottom: 30px;
}
.pr_02_1{
	text-align: left;
	margin: 0 auto;
	width: 1300px;
}
.pr_02_2{
	
	font-size:14px;
	font-weight:400;
	margin-right: 40px;
}
.pr_02_2On{
	color:#33B3FF;
}
.pr_02_3{
	display: inline-block;
	float: right;
	background:#33B3FF;
	border-radius:5px;
	margin-top: 20px;
	width:140px;
	height:40px;
	text-align: center;
	line-height: 40px;
	color: #fff;
	font-size:14px;
	font-weight:400;
}
.iopdlf_01>li{
	display: inline-block;
	margin-bottom: 40px;
	margin-right: 20px;
}
.iopdlf_01>li:nth-child(2n+2){
	margin-right: 0;
}
.pr_02_1Box .p_isTop{
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;	
	width: 100%;
	-webkit-animation: bjs .3s linear forwards;
	animation: bjs .3s linear forwards;
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
}
</style>