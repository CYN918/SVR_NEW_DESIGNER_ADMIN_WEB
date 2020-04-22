<template>
<div>
	<common-top :commonTopData="commonTopData"></common-top>
	<div class="wh Detail" v-loading="loading">
		<div class="detailtitle">{{ currentpageName }}</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">专题名称</span>
					<div class="fleft el-input__inner roles-input width500" style="width: 360px;">
						<input type="text" placeholder="请输入内容" class="sel-input fleft" maxlength="6" v-model="name">
						<span class="fright">{{ name.length }}/6</span>
					</div>
				</li>
				
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">tab排序</span>
					<select v-model="sorts" style="width: 217px;height:40px;background-color: #FFF;border-radius: 4px;border: 1px solid #DCDFE6;padding-left:5px;">
						<option
						v-for="item in tableData1"
						:key="item.name"
						:label="item.name"
						:value="item.id"
						style="font-size: 14px;padding: 0 20px;white-space: nowrap;height: 34px;line-height: 34px;cursor: pointer;color: #606266;text-overflow: ellipsis;">
						</option>
					</select>
				</li>
			</ul>
			
			<div class="relative" >
				<div class="detailContent" v-for="(item,index) in detailtext">
					<div style="margin-top: 20px;border-top: 1px solid rgb(240, 242, 245);">
						<div class="margint13 ofh" style="margin-left: 132px;margin-top: 20px">
							<span class="fleft detailKey" style="line-height: 40px;">选择干预作品</span>
							<div class="fleft">	
								<div>
									<button class="defaultbtn fleft" style="margin: 0;" @click="dialogTable(index)">选择作品</button>
									<div class="modeltitle ofh fleft" style="margin-left: 300px;width: 200px;line-height: 40px;">
										<span @click="swapItems(detailtext,index,index-1)">上移</span><span style="padding: 0 20px;" @click="swapItems(detailtext,index,index+1)">下移</span><span @click="delect(index)">删除</span>
									</div>
								</div>
							</div>
						</div>
						<div style="margin-left: 282px;margin-top: 20px" v-if="item.work_name">
							<div class="fleft ofh signl" style="margin: 10px;margin-top: 0;width: 300px;"> 
								<div class="fleft" style="width: 100%;height: 100%;" id="projectDetial">
									<div class="signlistwork">
										<img :src="item.face_pic" width="100%" height="100%">
									</div>
									<div class="ofh" style="margin: 10px 10px 0;color: #333333;">
										<span class="fleft" style="color: #999999;font-size: 12px;">{{ item.work_name }}</span> 
										<span class="fright"><img src="../../assets/img/zs_icon_tj.svg" width="14px" height="14px"></span>
									</div>
									<div class="ofh" style="margin-left: 10px;">
										<span class="labelbtn textcenter">{{  item.classify_1_name +"-"+ item.classify_2_name+"-"+item.classify_3_name}}</span>
									</div>
									<div class="ofh textcenter" style="margin: 10px 10px 0;color: #999999;">
										<div class="fleft ofh" style="width: 33.3%;">
											<img src="../../assets/img/zs_icon_gk.svg" style="vertical-align: middle;width: 15px;">
											{{ item.view_num }}
										</div>
										<div class="fleft" style="width: 33.3%;">
											<img src="../../assets/img/zs_icon_dz.svg" style="vertical-align: middle;width: 15px;">
											{{ item.like_num}}
										</div>
										<div class="fleft" style="width: 33.3%;">
											<img src="../../assets/img/zs_icon_xx.svg" style="vertical-align: middle;width: 15px;">
											{{ item.comment_num }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="addDetailContent" @click="addDetailContent()">+</div>
			</div>
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
							<el-button class="btnorgle" style="margin-left:20px;" v-for="(item,index) in commonTopData.commonleftbtn" :key="item.id" @click="screen(item.id)">{{ item.name }}</el-button>
						</div>
					</div>
				</div>
				<!-- <div class="margin40" style="height: 60px;">
					<div class="tagbts">
						<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
						 :disable-transitions="false" @close="handleClose(item.id)">
							{{item.btnName + "：" + item.val}}
						</el-tag>
					</div>
				</div> -->
				<div class="calc205" style="overflow-y:auto;">
					<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
					 ref="Tabledd" style="height: 450px;"></common-table>
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
				detailtext:[],
				name:"",
				detailData: '',
				activity_id: '',
				sorts:'',
				row: '',
				loading:false,
				pageName: "newlistAd",
				tableAction: DataScreen.screenShow.newlistAd.action,
				filterFields: DataScreen.screen.newlistAd.filterFields,
				dialogTableVisible: false,
				textarea: '',
				commonTopData: {
					"pageName": "newlistAd",
					"commonleftbtn": [
						{
							name: "筛选",
							id: "left1",
							url: ""
						}
					],
					"commonrightbtn": [],
					"commonbottombtn": [],
					
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
				currentpageName:"",
				tableData1:[
					{name:"请选择",id:""},
					{name:"第一位",id:"1"},
					{name:"第二位",id:"2"},
					{name:"第三位",id:"3"},
					{name:"第四位",id:"4"},
					{name:"第五位",id:"5"}
				],
				indexitem:0
			}
		},
		
		
		methods: {
			handleClose(tag) {
				this.resetSave(tag)
			},
			swapItems(arr, index1, index2) {
				
				if(index2 >= arr.length){
					this.$message({
						message:"到底了"
					});
					return
				}
				
				if(index2 < 0){
					this.$message({
						message:"已经是第一个了"
					});
					return
				}
				
				arr[index1] = arr.splice(index2, 1, arr[index1])[0];
				this.detailtext = arr; 
			},
			delect(index){
				this.detailtext.splice(index,1);
			},
			addDetailContent(){
				this.detailtext.push({})
			},
			getactivitiesrows(row){
				
				this.activitiesrows = row;
				this.api.worksinfos({
					access_token:localStorage.getItem("access_token"),
					work_ids:row.work_id
				}).then(da=>{
					this.detailtext.splice(this.indexitem,1,da[0]);
					//console.log(this.detailtext)
					this.dialogTableVisible=false;
				})
				
				
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
			alertmask(){
				
				if(!this.name){
					
					return "请填写名称！！";
				}
				if(!this.sorts){
					
					return "请选择位置！！";
				}
				//console.log(this.detailtext+">>>>>>>>")
				if(this.detailtext.length == 0){
					return "请选择干预的作品！！";
				}
				
				
				return true;
			},
			add(){
				if(this.alertmask() != true){
					this.$message({
						message:this.alertmask(),
					})
					return;
				}
				
				let works = "";
				this.detailtext.forEach((item,index)=>{
					//console.log(item);
					if(item.work_id){
						if(this.detailtext.length == (index+1)){
							works += (item.work_id)
						} else {
							works += (item.work_id + ",")
						}
					}
					
				})
				if(!works){
					this.$message({
						message:"请选择干预的作品",
					})
					return
				}
				
				this.loading = true;
				
				this.api.worksubjectadd({
					access_token:localStorage.getItem("access_token"),
					name: this.name,
					sort: this.sorts,
					work_ids:works,
				}).then(da => {
					console.log(da)
					if(da.result = "0"){
						this.getparent();
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				})
			},
			edit(){
				if(this.alertmask() != true){
					this.$message({
						message:this.alertmask(),
					})
					return;
				}
				
				let works = "";
				this.detailtext.forEach((item,index)=>{
					//console.log(item);
					if(item.work_id){
						if(this.detailtext.length == (index+1)){
							works += (item.work_id)
						} else {
							works += (item.work_id + ",")
						}
					}
				})
				
				if(!works){
					this.$message({
						message:"请选择干预的作品",
					})
					return
				}
				
				this.loading = true;
				this.api.worksubjectupdate({
					access_token:localStorage.getItem("access_token"),
					name: this.name,
					sort: this.sorts,
					work_ids:works,
					id:this.row.id
				}).then(da => {
					console.log(da)
					if(da.result = "0"){
						this.getparent();
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
			dialogTable(index){
				this.dialogTableVisible = !this.dialogTableVisible;
				this.indexitem = index;
				
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
					this.$router.push({ path: '/contentManager/workconfig/newworkconfig', query: {urlDate: JSON.stringify(urldata)}});
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
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			if(this.$route.query.row){
				this.row = JSON.parse(this.$route.query.row)
				this.name = this.row.name;
				this.sorts = this.row.sort;
				localStorage.setItem("newlistAd",this.$route.query.row);
				//console.log(this.row)
				if(this.row.work_ids){
					this.api.worksinfos({
						access_token:localStorage.getItem("access_token"),
						work_ids:this.row.work_ids
					}).then(da=>{
						this.detailtext = da;
					})
				}
				
			} else {
				if(this.currentpageName == "新建干预任务"){
					if(localStorage.getItem("newlistAd")){
						this.rows = JSON.parse(localStorage.getItem("newlistAd"));
						this.row = JSON.parse(this.$route.query.row)
						this.name = this.row.name;
						this.sorts = this.row.sort;
					}
				}
			}
			this.screenreach();
			this.getcommonrightbtn();
			
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
		z-index: 2040;
		display: fixed;
		background: rgba(0,0,0,0.5);
	}
</style>
