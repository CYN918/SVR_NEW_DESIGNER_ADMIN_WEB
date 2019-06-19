<template>
	<div class="wh">
		<div class="detailtitle ofh relative Detail">
			<div style="margin-bottom: 32px;">
				<span class="fleft worktabs">
					首页banner
				</span>
				<div class="textcenter">
					<!-- <span v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
					 @click="tabsChange(index,item.name)">
						
						{{ item.name }}
					</span> -->
					 <span :class="tabsnum == 1 ? 'tabs tabactive' : 'tabs'"
					 @click="tabsChange(1)">展示方案</span>
					<span :class="tabsnum == 0 ? 'tabs tabactive' : 'tabs'"
					 @click="tabsChange(0)">banner素材</span>
				</div>
			</div>
			<common-top :commonTopData="commonTopData" class="commonbg"></common-top>
		</div>
		<div style="height: calc(100% - 205px);margin-top: 20px;" v-show="tabsnum == 0">
			<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
			 ref="Tabledd"></common-table>
		</div>
		<div style="height: calc(100% - 235px);margin-top: 20px;background-color: white;" v-show="tabsnum == 1">
			<div style="height: calc(100% - 70px);margin-top: 20px;background-color: white;overflow: auto;">
				<ul class="screenContent" style="flex-wrap: wrap">
					<li class="bannerlistg relative" v-for="(item,index) in bannerprogramlists" :key="item.id">
						<div class="wh">
							<div style="position: absolute;top: 0;left: 0;z-index: 999;">
								<div>
									<button style="margin-left: 0;color: white;" :class="['defaultbtn','bannerstatus'+item.status] "> {{ getstatus(item.status)  }}</button>
								</div>
							    <div>
									<button style="margin-left: 0;margin-top:8px" v-if="item.is_default == '1'" class="defaultbtn bannerstatusdefa">默认展示</button>
								</div>
								
							</div>
							<el-carousel height="190px" style="background: gray;border-radius: 5px;">
							  <el-carousel-item v-for="citem in item.banner_list" :key="citem.id">
								<img :src="citem.banner_pic" width="100%" height="100%" alt="">
							  </el-carousel-item>
							</el-carousel>
							<div class="fleft w" style="height: calc(100% - 190px);">
								<div class="fleft" style="padding: 20px;">
									<div class="fontcolorg">
										<span>ID: </span><span>{{ item.id }}</span><span style="padding-left: 20px;">{{ item.banner_program_name }}</span>
									</div>
									<div class="fontcolorg">
										<span>展示时间段: </span><span>{{ item.program_begin_time + " 至 " + item.program_end_time}}  </span>
									</div>
								</div>
								<div class="fright" style="padding: 20px;margin: 0;">
									<el-dropdown :hide-on-click="false">
									  <button class="defaultbtn">更多操作</button>
									  <el-dropdown-menu slot="dropdown">
										<el-dropdown-item @click.native="delectprogram(item.id)">删除</el-dropdown-item>
										<el-dropdown-item @click.native="editprogram(item.id,'edit')">编辑</el-dropdown-item>
										<el-dropdown-item @click.native="seeprogram(item.id)">查看</el-dropdown-item>
									  </el-dropdown-menu>
									</el-dropdown>
								</div>
							</div>
						</div>
					</li>
					
					<li class="bannerlistg relative" style="visibility: hidden;">
						
					</li>
				</ul>
				<div style="text-align: right;">
					<div class="fleft" style="line-height: 100px;color: #999999;margin-left: 40px;">
						<span v-if="tableConfig.ischeck">已选择{{ selected }}条,</span><span>共{{tableConfig.total}}条数据</span>
					</div>
					<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableConfig.currentpagec"
					 :page-sizes="[10, 20, 30, 40]" :page-size="tableConfig.pagesize" layout="sizes, prev, pager, next, jumper" :total="tableConfig.total">
					</el-pagination>
				</div>
			</div>
			<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
		</div>
		<el-dialog title="征集模板文件-修改文件名称" :visible.sync="centerDialogVisible" width="406px">
		  <div style="position: relative;overflow: auto;">
			<ul>
				<li class="w ofh textcenter">
					<span class="fleft marginleft60" style="line-height: 40px;">用户名称</span>
					<input type="text" class="fleft defaultbtn defaultbtn0" style="width:200px">
				</li>
			</ul>
		  </div>
		  <span slot="footer" class="dialog-footer sel-footer">
			<el-button type="primary" >确 定</el-button>
		  </span>
		</el-dialog>
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
				tabData: [{
						name: "banner素材"
					},
					{
						name: "展示方案"
					}],
				tabsnum: 1,
				commonTopData: {
					"pageName": "homeBanner",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					"commonrightbtn": [{
						name: "新建展示方案",
						id: "right0",
					}],
					"commonbottombtn":[],
					"IsShow":true,
					upload:true
					
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					pageName:"homeBanner",
					list: DataScreen.screenShow.homeBanner.bts,
					ischeck:false
				},
				tableData: [],
				tableAction: DataScreen.screenShow.homeBanner.action,
				detailData: "",
				IsDetail: false,
				filterFields:DataScreen.screen.homeBanner.filterFields1,
				centerDialogVisible:false,
				showmask:false,
				bannerprogramlists:[],
			}
		},
		methods: {
			tabsChange(num) {
				this.tabsnum = num;
				this.getData({pageCurrent:1,pageSize:50});
				//console.log(this.tableConfig.list);
				if(num == 0){
					this.commonTopData.commonrightbtn = [{
						name: "新建banner素材",
						id: "right1",
					}];
				} else {
					this.commonTopData.commonrightbtn = [{
						name: "新建展示方案",
						id: "right0",
					}];
				}
				this.$parent.tabchange(num+1);
			},
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg) {
				//获取子组件表格数据
				if(this.tabsnum == 0){
					var data = {
						access_token: localStorage.getItem("access_token"),
						page: pg.pageCurrent,
						limit: pg.pageSize
					}
					//获取筛选的条件
					if (this.$route.query.urlDate) {
						const sreenData = JSON.parse(this.$route.query.urlDate);
						//console.log(sreenData)
						sreenData.page = pg.pageCurrent;
						sreenData.limit = pg.pageSize;
						sreenData.access_token = localStorage.getItem("access_token");
						data = sreenData;
					}
								
					this.api.bannerlist(data).then((da) => {
						//console.log(da.data)
						if (!da) {
							this.$message('数据为空');
						}
						this.tableData = da.data;
						this.tableConfig.total = da.total;
						this.tableConfig.currentpage = da.page;
						this.tableConfig.pagesize = da.page_size;
						this.setLoding(false);
					}).catch(() => {
						this.setLoding(false);
					});
				} else {
					var data = {
						access_token: localStorage.getItem("access_token"),
						page: pg.pageCurrent,
						limit: pg.pageSize
					}
					//获取筛选的条件
					if (this.$route.query.urlDate) {
						const sreenData = JSON.parse(this.$route.query.urlDate);
						//console.log(sreenData)
						sreenData.page = pg.pageCurrent;
						sreenData.limit = pg.pageSize;
						sreenData.access_token = localStorage.getItem("access_token");
						data = sreenData;
					}
								
					this.api.bannerprogramlist(data).then((da) => {
						this.bannerprogramlists = da.data;
						if (!da) {
							this.$message('数据为空');
						}
						
					}).catch(() => {
					});
				}
				
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:1,pageSize:50});
					
				})
			},
			linkDetail(id) {
				//alert(id);
				this.IsDetail = true;
				this.api.getContributorInfo({
					open_id: id,
					contribute_type:2
				}).then(da => {
					this.detailData = da;
					console.log(da);
				}).catch(() => {})
			},
			getcommonrightbtn(){
				this.commonTopData.commonbottombtn = [];
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate);
					console.log(urldata);
					this.filterFields = this.tabsnum == 0 ? DataScreen.screen.homeBanner.filterFields0 : DataScreen.screen.homeBanner.filterFields1;
					console.log(this.filterFields);
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
					this.$router.push({ path: '/contentManager/homeBanner', query: {urlDate: JSON.stringify(urldata)}});
				}
			},
			delete(val) {
				this.$confirm('确认删除该文件', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					 this.api.templateDelete({
						activity_id: val.id,
						access_token: 2,
					}).then(da => {
						this.getData({pageCurrent:1,pageSize:50});
					}) 
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			delect(val) {
				//this.centerDialogVisible = true;
				this.$confirm('确认删除该banner素材？', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					this.api.bannerdelete({
						access_token:localStorage.getItem("access_token"),
						id: val.id,
					}).then(da => {
						this.getData({pageCurrent:1,pageSize:50});
						this.$refs.Tabledd.currentpage = 1;
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			handleSizeChange(val) {
				this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
			},
			handleCurrentChange(val) {
				this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
			},
			handleSelectionChange(val) {
				this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
			},
			isdefault(id){
				this.$confirm('确认设置默认方案？', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					this.api.bannerprogramedit({
						access_token:localStorage.getItem("access_token"),
						is_default:1,
						id:id
					}).then(da =>{
						this.getData({pageCurrent:1,pageSize:50});
					}).catch(da =>{
						
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			seeprogram(id){
				this.router.push({
					path:"/contentManager/homeBanner/seebannerScheme",
					query:{
						id:id
					}
				})
			},
			editprogram(id,edit){
				this.router.push({
					path:"/contentManager/homeBanner/editbannerScheme",
					query:{
						id:id,
						edit:edit
					}
				})
			},
			delectprogram(id){
				this.$confirm('确认删除该banner方案？', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					this.api.bannerprogramdelete({
						access_token:localStorage.getItem("access_token"),
						id:id
					}).then(da =>{
						this.getData({pageCurrent:1,pageSize:50});
					}).catch(da =>{
						
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
				
			},
			getstatus(num){
				let status = {
					"-1":"已过期",
					"0":"待使用",
					"1":"线上展示"
				}
				return status[num];
			}
		},
		created() {
			this.screenreach();
			this.getcommonrightbtn();
		},
		mounted() {
			this.getData({pageCurrent:1,pageSize:50});
			this.$parent.tabchange(2);
			if(this.$route.query.tabsnum == 0){
				this.tabsChange(0);
			}
			if(this.$route.query.tabsnum == 1) {
				this.tabsChange(1);
			}
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
		margin-top: 20px;
	}
	
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
