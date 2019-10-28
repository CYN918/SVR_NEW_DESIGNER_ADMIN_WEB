<template>
	<div class="wh Detail" v-loading="loading">
		<div class="detailtitle">编辑干预任务</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">选择干预项目</span>
					<div class="fleft">	
						<div>
							<button class="defaultbtn" style="margin: 0;" @click="dialogTable">选择项目</button>
						</div>
						<div>
							<span v-html="activitiesrows.name"></span>
						</div>
						<!-- <div>
							<span class="fontcolorg" style="font-size: 12px;">{{ getValue(activitiesrows.category_name) +" "+ getValue(activitiesrows.start_time)+"至"+ getValue(activitiesrows.end_time) }}</span>	
						</div> -->
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">干预位置</span>
					<el-select v-model="position" placeholder="请选择"  style="width: 217px">
						<el-option v-for="(item,index) in tableData1" :key="item.name" :value="item.id" :label="item.name"></el-option>
					</el-select>
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
		<el-dialog title="请选择干预的活动" :visible.sync="dialogTableVisible" custom-class="sel-dialog">
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
				project_id: '',
				start_time:'',
				end_time:'',
				position:'',
				row: '',
				tableData1:[
					{name:"第一位",id:"1"},
					{name:"第二位",id:"2"},
					{name:"第三位",id:"3"},
					{name:"第四位",id:"4"}
				],
				loading:false,
				pageName: "newprojectrecommende",
				tableAction: {
					morebtns:{
						name:"删除",
						Ishow:false,
						page:"newprojectrecommende",
						accessid:"200348"  
					},
					links:{
						name:"选择",
						Ishow:true
					},
				},
				filterFields: [
					{name:"项目ID",id:"classify_name"},
					{name:"项目名称",id:"classify_name"},
					{name:"业务类型",id:"classify_name"},
					{name:"领域范围",id:"classify_name"},
					{name:"额外赏金",id:"classify_name"},
					{name:"发布时间",id:"classify_name"},
					{name:"中标时间",id:"classify_name"},
					{name:"截稿时间",id:"classify_name"},
				],
				dialogTableVisible: false,
				textarea: '',
				commonTopData: {
					"pageName": "newprojectrecommende",
					"commonleftbtn": [{
							name: "筛选",
							id: "left1",
							url: ""
						}
					],
					"commonrightbtn": [],
					"commonbottombtn": [],
					"IsShow": true,
				},
				screenConfig: [],
				tableConfig: {
					"pageName": "newprojectrecommende",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'classify_name',lable:'项目类型'},
						{prop:'business_type',lable:'业务类型',type:"keyvalue",child:{"1":"广告模板","2":"广告图","3":"场景锁屏","4":"主题"}},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间'},
						{prop:'bidding_time',lable:'中标时间'},
						{prop:'deadline',lable:'截稿时间'},
						{prop:'signup_num',lable:'报名人数'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					ischeck: false,
					loading:true
				
				},
				tableData: [],
				activitiesrows:{
					
				},
				recommendainfo:{}
			}
		},
		methods: {
			getactivitiesrows(row){
				//console.log(row);
				this.activitiesrows = row;
			},
			getparent() {
				this.$router.go(-1);
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			add(){
				this.loading = true;
				this.api.RecommendProjectadd({
					access_token:localStorage.getItem("access_token"),
					project_id: this.activitiesrows.project_id,
					start_time:this.start_time,
					end_time:this.end_time,
					position:this.position
				}).then(da => {
					if(da.result==0){
						this.$router.go(-1);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				})
			},
			edit(){
				this.loading = true;
				this.api.RecommendProjectedit({
					access_token:localStorage.getItem("access_token"),
					id: this.row.id,
					project_id: this.project_id,
					start_time:this.start_time,
					end_time:this.end_time,
					position:this.position
				}).then(da => {
					//console.log(da)
					if(da.result==0){
						this.$router.go(-1);
					}
					this.loading = false
				}).catch(() => {
					this.loading = false
				})
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
									alert(urldata[item.id])
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
					this.$router.push({ path: '/contentManager/newrecommendedActivities', query: {urlDate: JSON.stringify(urldata)}});
				}
			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize
				}
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
				data.status = 1
				this.api.projectlist(data).then((da) => {
					
					//console.log(da.data)
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
					this.getData({pageCurrent:1,pageSize:50});
					
				})
			},
			recommendactivityinfo(){
				/* this.api.recommendactivityinfo({
					access_token:localStorage.getItem("access_token"),
					id: this.row.id
				}).then(da=>{
					console.log(da)
					this.activity_id = da.id;
					this.activitiesrows = da;
					
					
				}) */
			}
		},
		created() {
			//console.log(this.row)
			if(this.$route.query.row){
				this.row = JSON.parse(this.$route.query.row);
				this.project_id = this.row.project_id;
				this.start_time = this.row.start_time;
				this.end_time = this.row.end_time;
				this.position = this.row.position;
				//this.recommendactivityinfo();
				this.activitiesrows.start_time = this.row.activity_start_time;
				this.activitiesrows.end_time = this.row.activity_end_time;
				this.activitiesrows.name = this.row.name;
			}
			this.screenreach();
			this.getcommonrightbtn();
		},
		mounted() {
			this.getData({pageCurrent:1,pageSize:50});
			this.$parent.tabchange(1);
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

	.detailContent1 {
		height: calc(100% - 194px);
		overflow-y: auto;
	}

	.detailContent1 ul {
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
</style>
