<template>
	<tanC :title="'报名项目'">
		<template v-slot:todo="{ todo }">
			<div class="bmXm_00">
				<!-- <div class="bmXm_01">
					请选择你期望的项目成交方式：
					<div class="bmXm_01_1">
						<label @click="chekdeal_type(el.k)" v-for="(el,index) in deal_types" :key="index"><span :class="el.k==postData.deal_type?'chekdOn':''"></span>{{el.n}}</label>
					</div>
				</div> -->
				<div class="bmXm_02">请选择至少 <span>1个符合</span> 项目需求的 <span>原创作品</span> 作为案例</div>
				<div class="bmXm_03_box" @scroll="test">
					<ul class="bmXm_03">
						
						<li @click="checkZp(el.work_id)" :class="postData.work_ids.indexOf(el.work_id)!=-1?'chekonzp':''" v-for="(el,index) in List" :key="index">
							<img class="bmXm_03_1" :src="el.face_pic">
							<div class="bmXm_03_2">
								{{el.work_name.slice(0,10)}}
								<img v-if="el.is_recommend==1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/zs_icon_tj.svg" alt="">
							</div>
							<div class="bmXm_03_3">
								<span>{{el.classify_1_name}}</span>
								{{el.classify_2_name+'-'+el.classify_3_name}}
								
							</div>
							
						</li>
						<div ref="botmm"></div>						
						<img v-if="isnoData" class="upImnoData" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/k/empty_nodata@3x.png"/>
					</ul>
				</div>
				
			</div>
			<div class="bmXm_01Btn">
				<div @click="pushBm" class="btns btns_js pend">提交报名 ({{postData.work_ids.length}})</div>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
export default {
	components:{tanC},
	props:{
		datad:Object,
	},
	data(){
		return{
			page2:1,
			deal_types:[
				{n:'买断式',k:1},
				{n:'分成式',k:2},
			],
			List:[],
			isnoData:'',
			postData:{
				deal_type:1,
				work_ids:[],
			},
			getType:'',
			noGd:'',
			total:0,
		}
	},
	
	mounted: function(){
		this.init();
	},
	methods: {	
		init(){
			if(!this.datad.project_id){
				this.close();
				return
			}
			this.postData.project_id= this.datad.project_id;
			this.getSelfWorkList();
		},
		chekdeal_type(o){
			this.postData.deal_type = o;
			
		},
		checkZp(o){
			let ond = this.postData.work_ids.indexOf(o);
			if(ond==-1){
				this.postData.work_ids.push(o);
				return
			}
			this.postData.work_ids.splice(ond,1)
			
		},
		close(){			
			this.$parent.close();
		},
		test(){
			let data = this.$refs.botmm.getBoundingClientRect();
			if(data.top<800 && !this.getType && !this.noGd){
				if(this.total<40){
					this.noGd=1;
					return
				}
				
				this.page2++;
				this.getSelfWorkList();
			}
		},
		pushBm(){
			if(this.postData.work_ids.length==0){
				this.$message({message:'请先选择作品'})
				return 
			}
			this.api.pr_signup(this.postData).then((da)=>{
				if(da=='error'){return}
				this.$message({message: '报名成功'});
				this.close();
				this.$parent.setBm(1);
				this.$parent.getData();
			}).catch(()=>{
				
			});
		},
		getSelfWorkList(){
			if(this.getType==1){return}
			if(!window.userInfo){return}
			let pr = {
				status:2,
				page:this.page2,
				limit:40,
				classify_1:1,
			};
			this.getType=1;
			
			this.api.getSelfWorkList(pr).then((da)=>{
				
				if(da=='error'){
					if(this.List.length==0){
						this.isnoData=1;
					}
					return
				}
				if(this.List.length>0 && this.page2!=1){
					this.List = this.List.concat(da.data);
					return
				}

				this.total = da.total;
				this.List = da.data;
				if(this.List.length==0){
					this.isnoData=1;
				}
			})
		},
	}
}		
	
</script>

<style>
.bmXm_00{
	padding: 30px 40px 0 40px;
}
.bmXm_01{
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
	text-align: left;
	margin-bottom: 30px;
}
.bmXm_01_1{
	margin-left: 10px;
	display: inline-block;
}
.bmXm_01_1 span{
	position: relative;
	display: inline-block;
	vertical-align: middle;
	margin-right: 8px;
	width:14px;
	height:14px;
	background:rgba(255,255,255,1);
	border-radius:2px;
	border:1px solid rgba(217,217,217,1);
}
.bmXm_01_1 label{
	cursor: pointer;
	margin-right: 20px;
}
.bmXm_01_1 span.chekdOn{
	background: #33B3FF;
	border-color: #33B3FF;
}
.bmXm_01_1 span.chekdOn:after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 4px;
    border: 1px solid #fff;
    border-top: 0;
    border-right: 0;
    -webkit-transform: rotate(-58deg) translate(-21%,76%);
    transform: rotate(-58deg) translate(-21%,76%);
}
.bmXm_02{
	font-size:14px;
	text-align: left;
	font-weight:400;
	color:#2c3e50;
	line-height:20px;
	margin-bottom: 10px;
}
.bmXm_02>span{
	color: #000;
	font-size: 15px;
}
.bmXm_03_box{

	width: 922px;
	height: 396px;
	overflow: hidden;
	overflow-y: auto;
	text-align: left;
}

.bmXm_03>li{
	position: relative;
	box-sizing: border-box;
	display: inline-block;
	margin-right: 20px;
	margin-bottom: 20px;
	width:210px;
	height:224px;
	background:rgba(255,255,255,1);
	box-shadow:0px 3px 9px 0px rgba(0,0,0,0.06);
	border-radius:5px;
	
}
.bmXm_03>li.chekonzp:after{
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	border-radius:5px;
	border:2px solid #33B3FF;	
}
.bmXm_03>li:nth-child(4n+4){
	margin-right: 0;
}
.bmXm_03_1{
	display: block;
	margin-bottom: 10px;
	width:210px;
	height:157px;
	border-radius:5px 5px 0px 0px;
}
.bmXm_03_2{
	position: relative;
	padding: 0 15px;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
	height: 20px;	
	margin-bottom: 7px;
	
}
.bmXm_03_3{
	padding: 0 15px;
	height: 22px;
	font-size:12px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:22px;
	margin-bottom: 10px;
}
.bmXm_03_3>span{
	display: inline-block;
	margin-right: 5px;
	height: 100%;
	padding: 0 8px;
	background:rgba(244,246,249,1);
	border-radius:5px;
}
.bmXm_03_2>img{
	position: absolute;
    right: 15px;
    top: 5px;
}

.bmXm_01Btn{
	border-top: 1px solid rgba(244,246,249,1);
	height: 79px;
	line-height: 79px;
}
</style>
