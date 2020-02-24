<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<span class="fleft worktabs">
				{{ currentpageName }}
			</span>
		</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft roles-input fontcolorg" style="margin-right: 20px;">通知标题</span>
					<div class="el-input__inner roles-input width500">
						<input type="text" placeholder="请输入内容" class="sel-input fleft" maxlength="10" @input="getleng(10)" v-model="text10">
						<span class="fright">{{ text10.length }}/10</span>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft fontcolorg" style="margin-right: 20px;">通知内容</span>
					<div style="margin-left: 85px;">
						<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="text100"></vue-ueditor-wrap>
					</div>
					
					<!-- <div class="fleft defaultbtnworkbg">
						<div>
							<textarea style="padding: 10px;" name="" id="" cols="69" rows="10" v-model="text100"  class="defaultbtnwork"></textarea>
						</div>
						<span class="fright fontcolorg">{{ text100.length }}/100</span>
					</div> -->
				</li>
				<li class="margint13 ofh">
					<span class="fleft fontcolorg" style="margin-right: 20px;">发送用户</span>
					<button class="defaultbtn" style="margin: 0;" @click="dialogTable">选择通知用户</button>
					<div>
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 56px;height: 40px;"></span>
						<span class="fleft fontcolorg" style="margin-top: 10px;">已选择的通知用户数：{{ sendnum }}</span>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft fontcolorg" style="margin-right: 20px;">发布时间</span>
					<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="send_time" type="datetime"
					 placeholder="开始时间">
					</el-date-picker>
				</li>
			</ul>
		</div>
		<el-dialog title="请选择通知人员" :visible.sync="dialogTableVisible" custom-class="sel-dialog">
			<div style="height: 600px;overflow-y: scroll;" class="relative">	
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
				<div class="calc205 ofv">
					<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
					 ref="Tabledd"></common-table>
				</div>
				<div class="w textcenter" style="position: absolute;bottom: 0;">
					<button class="defaultbtn defaultbtnactive" @click="setchange()">确定({{ this.selectData.length }})</button>
				</div>
			</div>
		</el-dialog>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" v-if="!rows.id" @click="add()">创建</button>
			<button class="defaultbtn defaultbtnactive" v-if="rows.id" @click="edit()">保存</button>
		</div>
		<div class="workfixed" v-show="IsScreen == 'No'">
			<common-screen :pageName="pageName"></common-screen>
		</div>
	</div>
</template>

<script>
    import VueUeditorWrap from 'vue-ueditor-wrap'
	import workData from "../../assets/workData.js"
	import commonTop from '@/components/commonTop.vue'
	import commonTable from '@/components/commonTable.vue'
	import DataScreen from "@/assets/DataScreen.js"
	export default {
		components: {
			commonTop,
			commonTable,
			VueUeditorWrap,
		},
		data() {
			return {
				currentpageName:"",
				pageName: "addrelease",
				tableAction: DataScreen.screenShow.addrelease.action,
				filterFields: DataScreen.screen.addrelease.filterFields,
				dialogTableVisible: false,
				textarea: '',
				commonTopData: {
					"pageName": "addrelease",
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
				myConfig: {
					autoHeightEnabled: false,
					initialFrameHeight: 500,
					initialFrameWidth: 1000,
					UEDITOR_HOME_URL: '/UEditor/'
				},
				screenConfig: [],
				tableConfig: {
					"pageName": "addrelease",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: DataScreen.screenShow.addrelease.bts,
					ischeck: true,
					loading:true,
					masktoast:true

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
			}
		},
		methods: {
			getparent() {
				//alert(parseInt(this.$route.query.type))
				this.$router.go(-1);

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
				this.pageName = "";
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
				console.log(this.selectData);
				var openids = '';
				this.selectData.forEach((item, index) => {
					openids += (index == (this.selectData.length - 1)) ? item.open_id : item.open_id + ",";
				})
				return openids;
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
			
				this.api.getUserList(data).then((da) => {
					
					this.tableData = da.data;
					// console.log(this.tableData)
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					if(this.tableConfig.ischeck){
						this.$refs.Tabledd.change(da.data);
					}
				}).catch(() => {
				});
			
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
					this.filterFields.forEach(item=>{
						//console.log(item);
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
					})
				}
			},
			resetSave(tag){
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					this.$router.push({path:'/noticeManager/newsRelease/editrelease',query:{urlDate:JSON.stringify(urldata)}});
				}
			},
			dialogTable(){
				this.dialogTableVisible = !this.dialogTableVisible;
			},
			add(){
				this.api.addnotice({
					access_token:localStorage.getItem("access_token"),
					title:this.text10,
					content:this.text100,
					to_open_ids:this.to_open_ids,
					send_time:this.send_time,
				}).then(da => {
					if(da.result == 0){
						this.$router.go(-1);
					}
				}).catch(() => {
							
				})
			},
			edit(){
				let data ={
					access_token:localStorage.getItem("access_token"),
					id:this.rows.id
				}
				
				if(this.text10){
					data.title=this.text10;
				}
				if(this.text100){
					data.content=this.text100;
				}
				if(this.to_open_ids){
					data.to_open_ids=this.to_open_ids;
				}
				if(this.send_time){
					data.send_time=this.send_time;
				}
				
				this.api.noticeedit(data).then(da => {
					if(da.result == 0){
						this.$router.go(-1);
					}
				}).catch(() => {
							
				})
			},
			setchange(){
				this.dialogTableVisible=false;
				this.sendnum=this.selectData.length;
				this.to_open_ids = this.getnoticeids();
			},
			ready(editorInstance) {
				this.uD = editorInstance;
				editorInstance.addListener('focus', (editor) => {
					if (this.ifBjType == 0) {
						this.form.info = '';
						this.ifBjType = 1;
					}
				});
				editorInstance.addListener('blur', (editor) => {
					if (this.ifBjType == 1 && this.form.info == '') {
						this.form.info = '';
						this.ifBjType = 0;
					}
				});
			
			},
			

		},
		created() {
			//this.getworkdetial();
			this.getData({
				pageCurrent: 1,
				pageSize: 50
			});
			this.screenreach();
			this.getcommonrightbtn();
			
			
		},
		mounted(){
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			if(this.$route.query.row){
				this.rows = JSON.parse(this.$route.query.row);
				this.text10 = this.rows.title;
				this.text100 = this.rows.content;
				this.send_time=this.rows.send_time;
				this.sendnum = this.rows.send_num;
				this.to_open_ids = this.rows.to_open_ids
				localStorage.setItem("addrelease",this.$route.query.row);
			} else {
				if(this.currentpageName == "新建通知"){
					if(localStorage.getItem("addrelease")){
						this.rows = JSON.parse(localStorage.getItem("addrelease"));
						this.text10 = this.rows.title;
						this.text100 = this.rows.content;
						this.send_time=this.rows.send_time;
						this.sendnum = this.rows.send_num;
						this.to_open_ids = this.rows.to_open_ids
					}
				}
				
			}
			console.log(this.$route.matched);
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
		z-index: 2013;
		display: fixed;
		background: rgba(0,0,0,0.5);
	}
	
	.sel-dialog  {
		width: 1000px;
	}
	
	/* .el-picker-panel,.el-select-dropdown{
		z-index: 2014 !important;
	} */
	
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
