<template>
<div>
	<common-top :commonTopData="commonTopData"></common-top>
	<div class="wh Detail" v-loading="loading">
		<div class="detailtitle">{{ currentpageName }}</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">选择干预作品</span>
					<div class="fleft">	
						<div>
							<button class="defaultbtn" style="margin: 0;" @click="dialogTable">选择作品</button>
						</div>
						<div>
							<span v-html="activitiesrows.work_name"></span>
						</div>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">干预位置</span>
					
					<el-input class="newlistAdin" v-model="position" placeholder="请输入"></el-input>
				</li>
				<li class="margint13 ofh">
					<div>
						<span class="fleft detailKey" style="line-height: 40px;">展示时间段</span>
						<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="start_time" type="datetime"
						 placeholder="开始时间">
						</el-date-picker>
						<span class="fleft" style="line-height: 40px;">
							&nbsp;至&nbsp;
						</span>
						<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="end_time" type="datetime"
						 placeholder="结束时间">
						</el-date-picker>
					</div>
				</li>
				
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" v-if="!row" @click="add()">添加</button>
			<button class="defaultbtn defaultbtnactive" v-if="row" @click="edit()">确认</button>
		</div>
		<el-dialog title="请选择干预的作品" :visible.sync="dialogTableVisible" custom-class="sel-dialog">
			<div>
				<div class="margin40 borderb" style="position: relative;padding-bottom: 22px;">
					<div class="ofh">
						<div class="fleft">
							<el-button class="btnorgle" v-for="(item,index) in commonTopData.commonleftbtn" :key="item.id" @click="screen(item.id)">{{ item.name }}</el-button>
						</div>
					</div>
				</div>
				<div class="margin40" style="height: 60px;">
					<div class="tagbts">
						<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
						 :disable-transitions="false" @close="handleClose(item.id)">
							{{item.btnName + "：" + item.val}}
						</el-tag>
					</div>
				</div>
				<div class="calc205" style="max-height: 300px;overflow-y:auto;">
					<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
					 ref="Tabledd"></common-table>
				</div>
			</div>
			
		</el-dialog>
		<div class="workfixed" v-show="IsScreen == 'No'">
			<common-screen :pageName="pageName"></common-screen>
		</div>
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
			commonTable,
		},
		data() {
			return {
				detailData: '',
				activity_id: '',
				start_time:'',
				end_time:'',
				position:'',
				row: '',
				loading:false,
				pageName: "newlistAd",
				tableAction: DataScreen.screenShow.newlistAd.action,
				filterFields: DataScreen.screen.newlistAd.filterFields,
				dialogTableVisible: false,
				textarea: '',
				commonTopData: {
					"pageName": "newlistAd",
					"commonleftbtn": [],
					"commonrightbtn": [],
					"commonbottombtn": [],
					// "IsShow": true,
				},
				screenConfig: [],
				tableConfig: {
					"pageName": "newrecommendedActivities",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: DataScreen.screenShow.newlistAd.bts,
					ischeck: false,
					loading:true
				
				},
				tableData: [],
				activitiesrows:{},
				IsScreen:"off",
				currentpageName:""
			}
		},
		methods: {
			handleClose(tag) {
				this.resetSave(tag)
			},
			getactivitiesrows(row){
	
				this.activitiesrows = row;
				this.activitiesrows.id = this.row.id;
				this.dialogTableVisible=false;
			},
			getparent() {
				this.loading = false;
				this.$router.push({
					path:"/contentManager/workconfig",
					query:{
						tabsnum:localStorage.getItem('workconfig')
					}
				})
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			add(){
				if(this.settime()){
					this.$message({
						message:"结束时间必须大于开始时间"
					})
					return;
				}
				
				this.loading = true;
				this.api.Homerec_add({
					access_token:localStorage.getItem("access_token"),
					work_id: this.activitiesrows.work_id,
					work_name:this.activitiesrows.work_name,
					start_time:this.start_time,
					end_time:this.end_time,
					position:this.position
				}).then(da => {
					//console.log(da)
					if(da = "添加成功"){
						this.getparent()
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				})
			},
			edit(){
				if(this.settime()){
					this.$message({
						message:"结束时间必须大于开始时间"
					})
					return;
				}
				this.loading = true;
				this.api.Homerec_edit({
					access_token:localStorage.getItem("access_token"),
					work_id: this.activitiesrows.work_id,
					work_name:this.activitiesrows.work_name,
					id:this.activitiesrows.id,
					start_time:this.start_time,
					end_time:this.end_time,
					position:this.position
				}).then(da => {
					//console.log(da)
					if(da = "修改成功"){
						this.getparent()
					}
					this.loading = false
				}).catch(() => {
					this.loading = false
				})
			},
			settime(){
				let s= this.start_time.replace(new RegExp("-","gm"),"/");
				s = (new Date(s)).getTime(); //得到毫秒数
				let e= this.end_time.replace(new RegExp("-","gm"),"/");
				e = (new Date(e)).getTime(); //得到毫秒数
				if(e > s){
					return false;
				} else {
					return true;
				}
			},
			dialogTable(){
				this.dialogTableVisible = !this.dialogTableVisible;
				/* if(this.dialogTableVisible == true){
					this.setLoding(false);
				} */
				//this.$refs.Tabledd.loading = false;	
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
					this.$router.push({ path: '/contentManager/newlistAd', query: {urlDate: JSON.stringify(urldata)}});
				}
			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
					status:2
				};
				//获取筛选的条件
				//console.log(JSON.parse(this.$route.query.urlDate))
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
					
				}
			
				this.api.workList(data).then((da) => {
					
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
				}).catch(() => {
				});
			
				/* this.setLoding(false); */
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:1,pageSize:10});
					
				})
			},
			screen(id) {
				if (id = "left1") {
					this.IsScreen = "No";
				}
			},
			screenmask(data, n) {
				this.pageName = "";
				switch (n) {
					case "left1":
						this.IsScreen = data;
						break;
					default:
						break;
				}
			
			},
		},
		created() {
			//console.log(this.row)
			if(this.$route.query.row){
				this.row = JSON.parse(this.$route.query.row)
				this.activitiesrows.work_name = this.row.work_name;
				this.activitiesrows.work_id = this.row.work_id;
				this.activitiesrows.id = this.row.id;
				this.start_time = this.row.start_time;
				this.end_time = this.row.end_time;
				this.position = this.row.position;
				localStorage.setItem("newlistAd",this.$route.query.row);
			} else {
				if(this.currentpageName == "新建干预任务"){
					if(localStorage.getItem("newlistAd")){
						this.rows = JSON.parse(localStorage.getItem("newlistAd"));
						this.text10 = this.rows.title;
						this.text100 = this.rows.content;
						this.send_time=this.rows.send_time;
						this.sendnum = this.rows.send_num;
						this.to_open_ids = this.rows.to_open_ids
					}
				}
			}
			this.screenreach();
			this.getcommonrightbtn();
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
		},
		mounted() {
			this.getData({pageCurrent:1,pageSize:10});
			this.$parent.tabchange(1);
		},
		watch:{
			"$route":function(){
				this.screenreach();
				this.getcommonrightbtn();
				this.getData({pageCurrent:1,pageSize:10});
			}
		}
		
	}
</script>

<style>
	.sel-dialog  {
		width: 1000px;
	}
	.Detail {
		background: white;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent {
		height: calc(100% - 139px);
		overflow-y: auto;
	}

	.detailContent ul {
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
	
	.status .el-radio{
		width: auto;
	}
	.newlistAdin{
		width: 270px;
	}
	.workfixed {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2050;
		display: fixed;
		background: rgba(0,0,0,0.5);
	}
</style>
