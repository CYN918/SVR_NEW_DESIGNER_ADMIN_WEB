<template>
	<div class="wh Detail" v-loading="IsShow">
		<div class="detailtitle ofh relative">
			<span class="fleft worktabs">
				{{ currentpageName }}
			</span>
		</div>
		<div v-if="!blackid" class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft fontcolorg" style="margin-right: 20px;width: 84px;line-height: 40px;">选择禁用用户</span>
					<button class="defaultbtn" style="margin: 0;" @click="dialogTable(0)">选择添加用户</button>
					<div style="margin-left: 104px;width: 640px;">
						<div v-for="(item,index) in selectData" class="relative fleft blacklist ofh" style="margin-top: 10px;margin-right: 10px;">
							<img class="fleft" :src="item.avatar" alt="" width="48px" height="48px" style="border-radius: 50%;margin-right: 12px;">
							<div>
								<div>
									<span>ID: </span>
									<span>{{ item.open_id }}</span>
								</div>
								<div>
									<span>{{ item.username }}</span>
								</div>
							</div>
							<span class="pointer fontcolorg" style="position: absolute;top:3px;right: 6px;" @click="delectsel(item.open_id)">X</span>
						</div>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft fontcolorg" style="margin-right: 20px;width: 84px;line-height: 40px;">通知举报者</span>
					<button class="fleft defaultbtn" style="margin: 0;" @click="dialogTable(1)">选择通知用户</button>
					<div class="fleft" style="margin-left: 10px;">
						<span>
							<span>已选择的通知用户数：{{ selectData1.length }}</span>
							<span class="fontcolorg" style="display: block;">
								将被举报者的处罚结果通知给举报者
							</span>
						</span>
					</div>
				</li>
				<li>
					<ul style="margin: 0;padding: 0;">
						<li class="margint13 ofh" style="margin-bottom: 47px;" v-for="(fitem,index) in content">
							<span class="fleft fontcolorg" style="margin-right: 20px;width: 84px;">禁用权限{{ index+1 }}</span>
							<div style="margin-left: 104px;">
								<div>
									<div>
										禁用权限 <span style="display: inline-block;margin-left:350px;line-height: 40px;color: #FF5121;" @click="delect(index)"> - 删除 </span>
									</div>
									<div>
										<el-select v-model="content[index].access" placeholder="请选择" style="width: 375px;">
											<el-option value="" label=""></el-option>
											<el-option v-for="(item,index) in forbiddenAccess" :value="item.access" :label="item.msg"></el-option>
										</el-select>
									</div>
								</div>
								<div style="margin-top: 17px;">
									<div>
										禁用到期时间
									</div>
									<div>
										<el-date-picker
										  v-model="content[index].end_time"
										  type="datetime"
										  placeholder="选择日期时间"
										  value-format="yyyy-MM-dd HH:mm:ss"
										  >
										</el-date-picker>
									</div>
								</div>
							</div>
							
						</li>
					</ul>
					<div @click="addaccess" class="pointer" style="color: #FF5121;font-weight: 500;font-size: 16px;margin-left: 104px;">
						+ 添加一项
					</div>
				</li>
				
				
			</ul>
		</div>
		
		<div v-if="blackid" class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft fontcolorg" style="margin-right: 20px;width: 84px;line-height: 40px;">禁用用户</span>
					<div style="margin-left: 104px;width: 640px;">
						<div class="relative fleft blacklist ofh" style="margin-top: 10px;margin-right: 10px;">
							<img class="fleft" :src="info.avatar" alt="" width="48px" height="48px" style="border-radius: 50%;margin-right: 12px;">
							<div>
								<div>
									<span>ID: </span>
									<span>{{ info.open_id }}</span>
								</div>
								<div>
									<span>{{ info.username }}</span>
								</div>
							</div>
						</div>
					</div>
				</li>
				
				<li>
					<ul style="margin: 0;padding: 0;">
						<li class="margint13 ofh" style="margin-bottom: 47px;" v-for="(fitem,index) in content">
							<span class="fleft fontcolorg" style="margin-right: 20px;width: 84px;">禁用权限</span>
							<div style="margin-left: 104px;">
								<div>
									<div>
										禁用权限
									</div>
									<el-input disabled="" v-model="info.access_msg" style="width: 220px;"></el-input>
								</div>
								<div style="margin-top: 17px;">
									<div>
										禁用到期时间
									</div>
									<div>
										<el-date-picker
										  v-model="info.end_time"
										  type="datetime"
										  placeholder="选择日期时间"
										  value-format="yyyy-MM-dd HH:mm:ss"
										  >
										</el-date-picker>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
				
				
			</ul>
		</div>
		
		<el-dialog title="请选择添加人员" :visible.sync="dialogTableVisible" custom-class="sel-dialog">
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
						 :disable-transitions="false" @close="resetSave(item.id)">
							{{item.btnName + "：" + item.val}}
						</el-tag>
					</div>
				</div>
				<div class="calc205" style="max-height: 300px;overflow-y:auto;">
					<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
					 ref="Tabledd"></common-table>
				</div>
				<div class="w textcenter">
					<button class="defaultbtn defaultbtnactive" @click="setchange()">确定({{ this.selectData.length }})</button>
				</div>
			</div>
			
		</el-dialog>
		<el-dialog title="请选择通知人员" :visible.sync="dialogTableVisible1" custom-class="sel-dialog">
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
						 :disable-transitions="false" @close="resetSave(item.id)">
							{{item.btnName + "：" + item.val}}
						</el-tag>
					</div>
				</div>
				<div class="calc205" style="max-height: 300px;overflow-y:auto;">
					<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
					 ref="Tabledd"></common-table>
				</div>
				<div class="w textcenter">
					<button class="defaultbtn defaultbtnactive" @click="setchange()">确定({{ selectData1.length }})</button>
				</div>
			</div>
			
		</el-dialog>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" v-if="!blackid" @click="add()">创建</button>
			<button class="defaultbtn defaultbtnactive" v-if="blackid" @click="edit()">保存</button>
		</div>
		<div class="workfixed" v-show="IsScreen == 'No'">
			<common-screen ref="screen" :pageName="pageName"></common-screen>
		</div>
	</div>
</template>

<script>
	import workData from "../../assets/workData.js"
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
				times:"",
				currentpageName:"",
				pageName: "addblack",
				tableAction: DataScreen.screenShow.addblack.action,
				filterFields: DataScreen.screen.addblack.filterFields0,
				dialogTableVisible: false,
				dialogTableVisible1:false,
				textarea: '',
				commonTopData: {
					"pageName": "addblack",
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
					"pageName": "addblack",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: DataScreen.screenShow.addblack.bts0,
					ischeck: true,
					loading:true

				},
				tableData: [],
				IsScreen: "Off",
				work_info: {},
				selectData:[],
				text10:"",
				text100:"",
				send_time:"",
				rows:{},
				sendnum:0,
				to_open_ids:'',
				notices_ids:"",
				forbiddenAccess:[],
				content:[
					{
						access:1,
						end_time:""
					}
				],
				tabnum:0,
				selectData1:[],
				blackid:"",
				info:{},
				IsShow:false,
				accused_open_id:'',
			}
		},
		methods: {
			delect(index){
				this.content.splice(index,1);
			},
			delectsel(id){
				this.selectData.forEach((item,index)=>{
					if(item.open_id == id) {
						this.selectData.splice(index,1);
					}
				})
			},
			addaccess(){
				this.content.push({
					access:1,
					end_time:""
				})
			},
			tab(n){
				
			},
			getparent() {
				//alert(parseInt(this.$route.query.type))
				this.$router.go(-1);
				// this.$router.push({
				// 	path:"/userManager/blackList"
				// });
			},
			getleng(n) {
				if (n == 10) {
					this.length10 = this.text10.length
				} else if (n == 30) {
					this.length30 = this.text30.length
				}
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			screen(id) {
				if (id = "left1") {
					this.IsScreen = "No";
				}
			},
			screenmask(data, n) {
				switch (n) {
					case "left1":
						this.IsScreen = data;
						break;
					default:
						break;
				}

			},
			getworkdetial() {
				this.api.workInfo({
					work_id: this.$route.query.id,
					access_token: localStorage.getItem("access_token")
				}).then(da => {
					//console.log(da)
					this.work_info = da.work_info;
				}).catch(da => {

				})
			},
			getnoticeids() {
				//console.log(this.selectData);
				var openids = '';
				this.selectData.forEach((item, index) => {
					openids += (index == (this.selectData.length - 1)) ? item.open_id : item.open_id + ",";
				})
				return openids;
			},
			getnoticeids1() {
				//console.log(this.selectData);
				var openids = '';
				this.selectData1.forEach((item, index) => {
					openids += (index == (this.selectData1.length - 1)) ? item.open_id : item.open_id + ",";
				})
				return openids;
			},
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg,n) {
				if(this.selectData.length == '0'){
					this.accused_open_id = '';
				}else{
					this.selectData.forEach(item => {
						this.accused_open_id += item.open_id + ',';
					})
					this.accused_open_id = this.accused_open_id.substring(0,this.accused_open_id.length-1)
				}
				console.log(this.accused_open_id)
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
					accused_open_id: this.accused_open_id,
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
				
				if(this.IsShow == true) return;
				if(this.tabnum == 1){
					this.api.reportlist(data).then((da) => {
						
						this.tableData = da.data;
						this.tableConfig.total = da.total;
						this.tableConfig.currentpage = da.page;
						this.tableConfig.pagesize = da.page_size;
						this.IsShow = false;
						this.dialogTableVisible1 = true;
						if(this.tableConfig.ischeck){
							this.$refs.Tabledd.change(da.data);
						} 
						
					}).catch(() => {
						this.IsShow = false;
					});
				}
				if(this.tabnum == 0){
					this.api.getUserList(data).then((da) => {
						this.tableData = da.data;
						this.tableConfig.total = da.total;
						this.tableConfig.currentpage = da.page;
						this.tableConfig.pagesize = da.page_size;
						this.dialogTableVisible = true;
						if(this.tableConfig.ischeck){
							this.$refs.Tabledd.change(da.data);
						} 
						this.IsShow = false;
						
						
					}).catch((e) => {
						console.log(e)
						this.IsShow = false;
					});
				}
				/* this.setLoding(false); */
			},
			getScreenShowData() {
				//获取字段展示-筛选修改
				eventBus.$on("screenShowDataChange", (data) => {
					this.tableConfig.list = [];
					this.forshowkey(data)
				});
			
				//获取字段展示-筛选初始化
				if (localStorage.getItem("screenShowDataChange")) {
					this.forshowkey(localStorage.getItem("screenShowDataChange").split(','))
				} else {
					this.forshowkey(this.defaultbts);
				}
			},
			forshowkey(data) {
				//筛选展示字段
				this.bts.forEach(item => {
					const val = item;
					data.forEach(item1 => {
						if (val.prop == item1) {
							this.tableConfig.list.push(val)
						}
					})
				})
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({
						pageCurrent: 1,
						pageSize: 50
					});
				})
			},
			linkDetail(id) {
				//alert(id);
				this.IsDetail = true;
				this.api.getUserInfo({
					open_id: id
				}).then(da => {
					this.detailData = da;
				}).catch(() => {
			
				})
			},
			setContributor(val) {
				this.selectOne = val;
				this.centerDialogVisible1 = true;
			},
			getworkids() {
				//console.log(this.selectData);
				var workids = '';
				this.selectData.forEach((item, index) => {
					workids += (index == (this.selectData.length - 1)) ? item.work_id : item.work_id + ",";
				})
				if (this.centerDialogVisible) {
					workids = workids
				};
			
				if (this.centerDialogVisible1) {
					workids = this.selectOne.work_id;
				}
				return workids;
			},
			getcommonrightbtn(){
				this.commonTopData.commonbottombtn = [];
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate);
					//console.log(urldata);
					this.filterFields=DataScreen.screen.addblack["filterFields"+this.tabnum];
					this.filterFields.forEach(item=>{
						//console.log(item);
						if(urldata[item.id] && !item.type){
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
							//console.log(this.commonTopData.commonbottombtn);
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
						if(item.type == "more"){
							if(urldata[item.id]){
								this.commonTopData.commonbottombtn.push({btnName:item.name,val:urldata[item.id],id:item.id})
							}
								
						}
					})
				}
			},
			resetSave(tag){
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					this.$router.push({query:{urlDate:JSON.stringify(urldata)}});
				}
			},
			dialogTable(n){
				console.log(n)
				this.tabnum = n;
				this.$router.push({query:{urlDate:''}});
				this.getData({
					pageCurrent: 1,
					pageSize: 50
				},n)
				/* if(n == 0){
					this.dialogTableVisible = !this.dialogTableVisible;
				} else {
					this.dialogTableVisible1 = !this.dialogTableVisible1;
				} */
				this.$refs.screen.getScreen()
				this.tableConfig.list = DataScreen.screenShow.addblack["bts"+n];
			},
			alertmask(){
				if(!this.to_open_ids){
					return "请选择禁用用户"
				} else if(!this.notices_ids){
					return "请选择通知用户"
				} else if(!this.content){
					return "请填写禁用权限1"
				}
				return false;
					
			},
			add(){
				if(this.alertmask()){
					this.$message({
						type:"warning",
						message:this.alertmask()
					})
					return;
				}
				this.IsShow = true;
				this.api.addBl({
					access_token:localStorage.getItem("access_token"),
					open_ids:this.to_open_ids,
					content:JSON.stringify(this.content),
					report_ids:this.notices_ids
				}).then(da => {
					if(da.result == 0){
						this.getparent();
						this.IsShow = false;
					}
					//this.$router.go(-1);
					this.IsShow = false;
				}).catch(() => {
					this.IsShow = false;		
				})
			},
			edit(){
				let data ={
					id:this.blackid,
					access_token:localStorage.getItem("access_token"),
					end_time:this.info.end_time
				}
				
				this.api.editBl(data).then(da => {
					if(da.result == 0){
						this.getparent();
					}
				}).catch(() => {
							
				})
			},
			setchange(){
				this.dialogTableVisible=false;
				this.dialogTableVisible1=false;
				this.sendnum=this.selectData.length;
				this.to_open_ids = this.getnoticeids();
				this.notices_ids = this.getnoticeids1()
			},
			getforbiddenAccess(){
				this.api.forbiddenAccess({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.forbiddenAccess = da
				})
			},
			BlDetail(){
				this.api.BlDetail({
					access_token:localStorage.getItem("access_token"),
					id:this.blackid
				}).then(da=>{
					this.info = da;
					if(this.$route.query.url){
						this.info.avatar = this.$route.query.url
					}
				})
			}
		},
		created() {
			this.screenreach();
			this.getcommonrightbtn();
			this.getforbiddenAccess();
		},
		mounted(){
			
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			if(this.$route.query.id){
				this.blackid = this.$route.query.id;
				localStorage.setItem("addblack",this.$route.query.row);
				this.BlDetail();
			} else {
				if(this.currentpageName == "编辑用户"){
					if(localStorage.getItem("addblack")){
						this.blackid = localStorage.getItem("addblack");
						this.BlDetail();
					}
				}
				
			}
			
			if(this.$route.query.rows){
				console.log(JSON.parse(this.$route.query.rows))
				let rows = JSON.parse(this.$route.query.rows);
				this.selectData=rows;
			}
			//console.log(this.$route.matched);
		},
		watch:{
			"$route":function(){
				this.screenreach();
				this.getcommonrightbtn();
				this.getData({pageCurrent:1,pageSize:50});
			},
		}
	}
</script>

<style>
	.blacklist{
		width: 268px;
		border: 1px solid #E1E1E8;
		padding: 16px;
	}
	.materiallist .el-checkbox__label {
		display: none;
	}

	.work .el-button--primary {
		background: #FF5121;
		border-color: #FF5121;
	}

	.ctcontent {
		background: white;
		margin-bottom: 20px;
	}

	.paddingb10 {
		padding-bottom: 10px;
	}

	.padding10 {
		padding: 10px 0;
	}

	.cttitle {
		line-height: 60px;
		padding-bottom: 20px;
	}

	.tagbts {
		display: flex;
		align-items: center;
		height: 100%;
		overflow-x: auto;
	}

	.lefttit {
		position: absolute;
		height: 60px;
		line-height: 60px;
		left: 40px;
	}

	.badge .el-badge__content.is-fixed {
		top: 13px
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
	
	.sel-dialog  {
		width: 1000px;
	}
	
	 .el-picker-panel,.el-select-dropdown{
		z-index: 2040 !important;
	}
	
	.shelves .el-message-box__content{
		border-top:0 !important;
	}
</style>

<style scoped>
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

	.employipt {
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
