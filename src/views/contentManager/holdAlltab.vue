<template>
	<div class="wh">
		<div class="wh" v-show="tabsnum == 0">
			<div class="detailtitle ofh relative Detail">
				<div style="margin-bottom: 32px;">
					<span class="fleft worktabs">
						首次上传原创作品+认证奖励
					</span>
					<div class="textcenter">
						 <span :class="tabsnum == 1 ? 'tabs tabactive' : 'tabs'"
						 @click="tabsChange(1)">配置页</span>
						<span :class="tabsnum == 0 ? 'tabs tabactive' : 'tabs'"
						 @click="tabsChange(0)">奖励记录</span>
					</div>
				</div>
				<common-top :commonTopData="commonTopData" class="commonbg"></common-top>
			</div>
			<div style="height: calc(100% - 205px);margin-top: 20px;">
				<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
				 ref="Tabledd"></common-table>
			</div>
		</div>
		<div class="wh" v-show="tabsnum == 1" style="overflow-y: scroll;">
			<div class="detailtitle ofh relative Detail" style="height:calc(100% - 73px);">
				<div style="margin-bottom: 32px;">
					<span class="fleft worktabs">
						首次上传原创作品+认证奖励
					</span>
					<div class="textcenter">
						 <span :class="tabsnum == 1 ? 'tabs tabactive' : 'tabs'"
						 @click="tabsChange(1)">配置页</span>
						<span :class="tabsnum == 0 ? 'tabs tabactive' : 'tabs'"
						 @click="tabsChange(0)">奖励记录</span>
					</div>
				</div>
				<div>
					<ul>
						<li class="ofh textcenter" style="margin: 10px 0;margin-left: 100px;">
							<span class="fleft detailKey" style="line-height: 40px;padding-right: 40px;">奖励金额</span>
							<el-input class="fleft" placeholder="请输入内容" v-model="pirce" style="width:357px;height:40px;" clearable></el-input>
						</li>
						<li class="ofh textcenter" style="margin: 10px 0;margin-left: 100px;">
							<span class="fleft detailKey" style="line-height: 40px;padding-right: 40px;">奖励描述</span>
							<el-input class="fleft" placeholder="请输入内容" v-model="desc" style="width:357px;height:40px;" clearable></el-input>
						</li>
						<li class="ofh textcenter" style="margin: 10px 0;margin-left: 100px;">
							
							<span class="fleft detailKey" style="line-height: 40px;padding-right: 40px;">使用时段</span>
							<el-date-picker class="fleft" value-format="yyyy-MM-dd HH-mm-ss" v-model="start_time" type="datetime"
							 placeholder="开始时间">
							</el-date-picker>
							<span class="fleft" style="line-height: 40px;">
								&nbsp;至&nbsp;
							</span>
							<el-date-picker class="fleft" value-format="yyyy-MM-dd HH-mm-ss" v-model="end_time" type="datetime"
							 placeholder="结束时间">
							</el-date-picker>
						</li>
						<li class="fleft ofh textcenter" style="margin-left: 100px;">
							<span class="fleft detailKey" style="line-height: 40px;padding-right: 40px;">当前状态</span>
							<span style="line-height: 40px;padding-right: 40px;">{{ this.status == "0" ? "停用" : "启用" }}</span>
						</li>
						
						
					</ul>
					<div class="w textcenter" style="margin-top: 200px;">
						<button class="defaultbtn" @click="getparent()">返回</button>
						<button class="defaultbtn defaultbtnactive" @click="edit()">保存</button>
					</div>
				</div>
			</div>
			<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
		</div>
	</div>
</template>

<script>
	import commonTop from '@/components/commonTop.vue'
	import commonTable from '@/components/commonTable.vue'
	import DataScreen from "@/assets/DataScreen.js"
	
	export default {
		components: {
			commonTop,
			commonTable
		},
		data() {
			return {
				
				tabsnum: 1,
				commonTopData: {
					"pageName": "holdAlltab",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					commonrightbtn:[{
						name: "导出数据",
						id: "right1",
					}],
					"commonbottombtn":[
						
					],
					"IsShow":true,
					upload:true
					
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					pageName:"holdAlltab",
					list: DataScreen.screenShow.holdAlltab.bts
				},
				tableData: [],
				tableAction: DataScreen.screenShow.holdAlltab.action,
				detailData: "",
				filterFields:DataScreen.screen.holdAlltab.filterFields,
				bannerprogramlists:[],
				pirce:"",
				start_time:"",
				end_time:"",
				status:"",
				desc:""
				
			}
		},
		methods: {
			getparent(){
				this.$router.go(-1);
			},
			tabsChange(num) {
				this.tabsnum = num;
				this.getData({pageCurrent:1,pageSize:50});
				//console.log(this.tableConfig.list)
			},
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg) {
				//获取子组件表格数据
					var data = {
						access_token: localStorage.getItem("access_token"),
						page: pg.pageCurrent,
						limit: pg.pageSize,
						task_id:this.detailData.id
					}
					//获取筛选的条件
					if (this.$route.query.urlDate) {
						const sreenData = JSON.parse(this.$route.query.urlDate);
						//console.log(sreenData)
						sreenData.page = pg.pageCurrent;
						sreenData.limit = pg.pageSize;
						sreenData.task_id = this.detailData.id;
						sreenData.access_token = localStorage.getItem("access_token");
						data = sreenData;
					}
								
					this.api.operaterecord(data).then((da) => {
						//console.log(da.data)
						this.tableData = da.data;
						this.tableConfig.total = da.total;
						
						this.tableConfig.currentpage = da.page;
						this.tableConfig.pagesize = da.page_size;
						this.setLoding(false);
					}).catch(() => {
						this.setLoding(false);
					});
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:1,pageSize:50});
					
				})
			},
			getcommonrightbtn(){
				this.commonTopData.commonbottombtn = [];
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate);
					this.filterFields.forEach(item=>{
						//console.log(urldata[item.id]);
						if(urldata[item.id]){
							var val = urldata[item.id];
							if(item.child){	
								val = "";
								item.child.forEach(citem=>{
									//alert(urldata[item.id])
									if(citem.id == urldata[item.id]){
										val = citem.name;
									}
								})
							} 
							this.commonTopData.commonbottombtn.push({btnName:item.name,val:val,id:item.id});
							console.log(this.commonTopData.commonbottombtn);
						} 
						if(item.type == "two"){
							if(item.child){
								item.child.forEach(citem=>{
									if(urldata[citem.id]){
										this.commonTopData.commonbottombtn.push({btnName:citem.name,val:urldata[citem.id],id:citem.id})
									}
								})
							}
						}
						if(item.type == "time"){
							if(item.child){
								item.child.forEach(citem=>{
									if(urldata[citem.id]){
										this.commonTopData.commonbottombtn.push({btnName:citem.name,val:urldata[citem.id],id:citem.id})
									}
								})
							}
						}
					})
				}
			},
			resetSave(tag) {
				if (this.$route.query.urlDate) {
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					this.$router.push({ path: '/contentManager/holdAll/holdAlltab', query: {urlDate: JSON.stringify(urldata)}});
				}
			},
			getstatus(num){
				let status = {
					"-1":"已过期",
					"0":"待使用",
					"1":"线上展示"
				}
				return status[num];
			},
			edit(){
				this.api.operateedit({
					access_token: localStorage.getItem("access_token"),
					events:this.detailData.events,
					start_time:this.start_time,
					end_time:this.end_time,
					award_type:this.detailData.award_type,
					award_value:this.pirce,
					id:this.detailData.id,
					desc:this.desc
				}).then(da=>{
					this.$router.go(-1)
				}).catch(da=>{
					
				})
			}
		},
		created() {
			this.screenreach();
			this.getcommonrightbtn();
			if(this.$route.query.data){
				this.detailData = JSON.parse(this.$route.query.data);
				localStorage.setItem("holdAlltab",this.$route.query.data)
				console.log(JSON.parse(this.$route.query.data))
				this.pirce = this.detailData.award_value;
				this.start_time = this.detailData.start_time;
				this.end_time = this.detailData.end_time;
				this.status = this.detailData.status;
				this.desc = this.detailData.desc
			} else {
				this.detailData = JSON.parse(localStorage.getItem("holdAlltab"));
				console.log(JSON.parse(this.$route.query.data))
				this.pirce = this.detailData.award_value;
				this.start_time = this.detailData.start_time;
				this.end_time = this.detailData.end_time;
				this.status = this.detailData.status;
				this.desc = this.detailData.desc
			}
		},
		mounted() {
			this.getData({pageCurrent:1,pageSize:50});
		},
		watch:{
			"$route":function(){
				this.screenreach();
				this.getcommonrightbtn();
				this.getData({pageCurrent:1,pageSize:50});
			}
		}
	}
</script>

<style>
	.materiallist .el-checkbox__label {
		display: none;
	}
	
	.work .el-button--primary{
		background: #FF5121;
		border-color: #FF5121;
	}
	#app .bannerstatus-1{
		background:lightgray;
		border-color:lightgray;
	}
	#app .bannerstatus1{
		background:rgba(81,197,20,1);
		border-color:rgba(81,197,20,1);
	}
	#app .bannerstatus0{
		background:rgba(255,154,0,1);
		border-color:rgba(255,154,0,1);
	}
	
	#app .bannerstatusdefa{
		background:rgba(255,81,33,1);
		border-color:rgba(255,81,33,1);
	}
	
</style>

<style scoped>
	.bannerlistg{
		width:750px;
		height:270px;
		border-radius:5px;
		border: 1px solid #E6E6E6;
		margin-bottom: 20px;
		
	}
	
	.screenContent1{
		display: flex;
		align-items: center;
		overflow: hidden;
		flex-wrap: wrap;
		justify-content:space-between;
		padding:0 20px;
	}
	
	#app .defaultbtn1400{
		margin-right: 20px;
	}
	
	@media screen and (max-width: 1860px) {
		.bannerlistg{
			width:calc(50% - 8px);
			height:270px;
			border-radius:5px;
			border: 1px solid #E6E6E6;
			margin:0 1;
			margin-bottom: 20px;
			
		}
		
		.screenContent1{
			display: flex;
			align-items: center;
			overflow: hidden;
			flex-wrap: wrap;
			justify-content:space-between;
			
		}
		
		#app .defaultbtn1400{
			width: 80px;
			margin-left: 0;
			margin-right: 5px;
		}
	}
	
	
	
	.scrollbar{
		height: calc(100% - 90px);
		background-color: white;
		overflow-y: auto;
	}
	
	/* width:calc(50% - 8px); */
	
	.bannerlisttag0 {
		width:100px;
		height:40px;
		border-radius:0px 5px 0px 5px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:40px;
		text-align: center;
	}
	
	.Detail {
		background: white;
	}

	.Dialogkey {
		margin: 0 33px 26px 66px;
		width: 84px;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent1 {
		height: calc(100% - 139px);
		overflow-y: auto;
	}

	.detailContent1>ul {
		padding-left: 132px;
		padding-top: 64px;
	}

	.margint13 {
		margin-bottom: 13px;
	}

	.detailKey {
		width: 160px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
	}

	.detailValueImg {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		background: red;
	}

	.detailKeyImg {
		line-height: 68px;
	}

	.routerLink {
		color: #FF5121;
	}

	.detailbtn {
		height: 100px;
	}

	.squareImg {
		width: 160px;
		height: 102px;
		background: red;
	}

	.roles-input {
		height: 40px;
		line-height: 40px;
	}

	.width500 {
		width: 500px;
	}

	.roles-input input {
		height: 100%;
		width: 400px;
	}

	.roletree {
		height: 460px;
		border: 1px solid #D9D9D9;
		display: inline-block;
		overflow-y: auto;
		border-radius: 5px;
	}

	.account-ipt {
		padding: 10px;
		text-align: center;
		border: 1px solid #999999;
		border-radius: 5px;
	}

	.tabs {
		width: 96px;
		height: 33px;
		display: inline-block;
		margin-right: 71px;
		cursor: pointer;
	}

	.tabactive {
		color: #FF5121;
		border-bottom: 2px solid #FF5121;
	}

	.img-top {
		width: 68px;
		height: 68px;
		border-radius: 50%;
	}
	
	.img-zheng {
		width: 160px;
		height: 100px;
	}

	.img-fengmian {
		width: 200px;
		height: 150px;
	}

	.img-banner {
		width: 341px;
		height: 110px;
	}

	.materiallist {
		display: flex;
		overflow: hidden;
		flex-wrap: wrap;
		justify-content: flex-start
	}

	.materiallist li {
		margin: 0 17px 17px 0;
	}

	.material {
		width: 239px;
		height: 135px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
		border-radius: 5px;
		background: #F9F9F9;
	}

	.material-fu {
		width: 60px;
		height: 68px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -34px;
		margin-left: -30px;
	}

	.material-bo {
		width: 32px;
		height: 32px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -16px;
		margin-left: -16px;
	}

	.material-checkbox {
		position: absolute;
		top: 6px;
		right: 10px;
	}

	.materialdownload {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.color66 {
		color: #666666;
		margin-top: 3px;
		overflow: hidden;
		font-size: 14px;
	}

	.el-message-box--center .el-message-box__title {
		justify-content: left;
	}

	.sel-alert {
		width: 406px;
	}

	.el-message-box__header,
	.el-dialog__header {
		padding: 27px 30px !important;

	}

	.el-dialog__title {
		font-size: 16px !important;
	}

	.el-dialog__body {
		padding: 27px 0 27px !important;
		border-top: 1px solid #e6e6e6;
	}

	.el-radio-group {
		display: block;
	}

	.el-dialog__headerbtn {
		position: "";
		float: right;
		font-size: 18px;
	}

	.sel-footer {
		display: block;
		text-align: center;
	}

	.el-radio {
		line-height: 28px;
	}

	.el-radio__input.is-checked .el-radio__inner,
	.el-button--primary {
		background: #FF5121;
		border-color: #FF5121;
	}

	.el-button--primary:focus,
	.el-button--primary:hover {
		background: #FF5121;
		border-color: #FF5121;
	}

	[class*=" el-icon-"],
	[class^=el-icon-] {
		line-height: 2;
	}

	.sel-radio-title {
		position: absolute;
		left: 30px;
	}

	.font12 {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #999999;
	}

	.el-message-box--center .el-message-box__content {
		padding: 20px 0 37px;
		border-top: 1px solid #E6E6E6;
	}

	.workbtn {
		width: 70px;
	}
	
	.employipt{
		height: 40px;
		line-height: 40px;
		margin: 30px;
	}
	
	.employmonre {
		width: 300px;
		display: inline-block;
		margin: 0 20px;
	}
	
	.employmonre input {
		width: 200px;
		height: 100%;
		margin-left: 5px;
		
	}
</style>
