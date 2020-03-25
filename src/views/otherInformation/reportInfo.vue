<template>
		<div class="wh">
			<common-top :commonTopData="commonTopData" class="feed"></common-top>
			<div class="detailtitle ofh relative Detail">
				<div style="margin-bottom: 32px;">
					<div class="textcenter">
						<span v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
						@click="tabsChange(index,item.name)" v-if="gettab(item.accessid)">
							<!-- <el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge> -->
							{{ item.name }}
						</span>
					</div>
				</div>
				
			</div>
			<div style="height: calc(100% - 235px);margin-top: 20px;">
				<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
				ref="Tabledd"></common-table>
			</div>
			<el-dialog title="征集模板文件-修改文件名称" :visible.sync="centerDialogVisible" width="406px">
				<div style="position: relative;">
					<ul>
						<li class="w ofh textcenter">
							<span class="fleft marginleft60" style="line-height: 40px;">用户名称</span>
							<input type="text" v-model="file_name" class="fleft defaultbtn defaultbtn0" style="width:200px">
						</li>
					</ul>
				</div>
				<span slot="footer" class="dialog-footer sel-footer">
					<button class="defaultbtn" @click="centerDialogVisible = false">取 消</button>
					<button class="defaultbtn defaultbtnactive" @click="newname">确 定</button>
				</span>
			</el-dialog>
			<el-dialog title="本地文件" :visible.sync="showmask">
				<span slot="footer" class="dialog-footer sel-footer">
					<button class="defaultbtn" @click="showmaskload">本地文件</button>
					<button class="defaultbtn" @click="showmaskload1">网盘链接</button>
				</span>
			</el-dialog>
			<el-dialog title="本地文件" :visible.sync="showmask1">
				<div class="dorg">
					<el-upload
					class="upload-demo"
					drag
					action="https://jsonplaceholder.typicode.com/posts/"
					multiple>
					<div>
						<img src="../../assets/img/icon_unloading.png" style="width:60px;height:60px;display:block;margin:31px auto 14px" alt="">
					</div>
					<div class="w textcenter">
						点击或将文件拖拽到这里上传
					</div>
					<div class="w textcenter fontcolorg">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
					</el-upload>
				</div>
				
				
			</el-dialog>
			<el-dialog title="网盘链接" :visible.sync="showmask2">
				<div class="dorg textcenter" style="width: 100%;">
					<div>
						<span style="line-height: 40px;padding-right: 20px;">文件名称</span>
						<el-input style="width: 357px" placeholder="请输入文件名称"></el-input>
					</div>
					<div style="margin-top: 30px;">
						<span style="line-height: 40px;padding-right: 20px;">网盘链接</span>
						<el-input style="width: 357px" placeholder="请输入网盘链接，提取码等"></el-input>
					</div>
					<div style="margin-top: 40px;">
						<button class="defaultbtn defaultbtnactive " @click="showmaskload1">确定</button>
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
			commonTable
		},
		data() {
			return {
				tabData:[{
						name: "举报内容",
						accessid:"48"
					},
					{
						name: "举报分类预设",
						accessid:"49"
					}
				],
				tabsnum: 0,
				commonTopData: {
					"pageName": "reportInfo",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						accessid: "200381"
					}],
					"commonrightbtn": [],
					"commonbottombtn": [],
					// "IsShow": true,
					upload: true
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage: 1,
					pagesize: 10,
					pageName: "reportInfo",
					list: DataScreen.screenShow.reportInfo.bts0,
					ischeck: false
				},
				tableData: [],
				tableAction: DataScreen.screenShow.reportInfo.action0,
				detailData: "",
				IsDetail: false,
				filterFields: DataScreen.screen.reportInfo.filterFields0,
				centerDialogVisible: false,
				showmask: false,
				type: 1,
				rowdata: "",
				file_name: "",
				showmask1: false,
				showmask2:false,
				adminuseraccess:[]
			}
		},
		methods: {
			gettab(id){
				if(this.adminuseraccess.indexOf(id) > -1){
					return true;
				} else {
					return false;
				}
				
			},
			tabsChange(num) {
				this.tabsnum = num;
				this.tableConfig.list = DataScreen.screenShow.reportInfo["bts" + num];
				/* this.filterFields = DataScreen.screenShow.reportInfo["filterFields" + num]; */
				this.tableAction = DataScreen.screenShow.reportInfo["action"+num];
				//console.log(DataScreen.screenShow.solicitationTemplate["bts" + num])
				this.getData({pageCurrent:1,pageSize:50});
				this.$parent.tabchange(num+1);
				if(num == 0){
					this.commonTopData.commonrightbtn = [];
				} else {
					this.commonTopData.commonrightbtn = [{
						name: "添加举报分类",
						id: "right1",
					}];
				}
			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
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
				
				if(this.tabsnum == 0){
					this.api.reportlist(data).then((da) => {
						
						this.tableData = da.data;
						this.tableConfig.total = da.total;
						this.tableConfig.currentpage = da.page;
						this.tableConfig.pagesize = da.page_size;
						this.setLoding(false);
					}).catch(() => {
						this.setLoding(false);
					});
				} else{
					this.api.reportclassify(data).then((da) => {
						
						this.tableData = da.data;
						this.tableConfig.total = da.total;
						this.tableConfig.currentpage = da.page;
						this.tableConfig.pagesize = da.page_size;
						this.setLoding(false);
					}).catch(() => {
						this.setLoding(false);
					});
				}
			},
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
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
				this.api.getContributorInfo({
					open_id: id,
					contribute_type: 2
				}).then(da => {
					this.detailData = da;
					console.log(da);
				}).catch(() => {})
			},
			getcommonrightbtn() {
				this.commonTopData.commonbottombtn = [];
				if (this.$route.query.urlDate) {
					const urldata = JSON.parse(this.$route.query.urlDate);
					//console.log(urldata);
					this.filterFields.forEach(item => {
						//console.log(item);
						if (urldata[item.id]) {
							var val = urldata[item.id];
							if (item.child) {
								val = "";
								item.child.forEach(citem => {
									//alert(urldata[item.id])
									if (citem.id == urldata[item.id]) {
										val = citem.name;
									}
								})
							}
							this.commonTopData.commonbottombtn.push({
								btnName: item.name,
								val: val,
								id: item.id
							});
							//console.log(this.commonTopData.commonbottombtn);
						}
					})
				}

			},
			resetSave(tag) {
				if (this.$route.query.urlDate) {
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					//console.log(tag);
					this.$router.push({
						path: '/otherInformation/reportInfo',
						query: {
							urlDate: JSON.stringify(urldata)
						}
					});
					this.getcommonrightbtn();
					this.getData({
						pageCurrent: 1,
						pageSize: 50
					});
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
					console.log(val.template_file_id)
					this.api.reportupdateClassify({
						template_file_id: val.template_file_id,
						access_token: localStorage.getItem("access_token"),
					}).then(da => {
						console.log(da)
						this.$message({
							type: 'info',
							message: da
						});
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			newname() {
				this.api.templateedit({
					template_file_id: this.rowdata.template_file_id,
					file_name: this.file_name,
					access_token: localStorage.getItem("access_token"),
				}).then(da => {
					this.$message({
						message: da
					})
				}).catch(()=> {
					this.$message({
						type: 'info',
						message: "系统网络故障"
					})
				})
				this.centerDialogVisible = false;
			},
			showmaskload1(){
				this.showmask = false;
				this.showmask2 = true;
			},
			showmaskload(){
				this.showmask = false;
				this.showmask1 = true;
			},
			update(row,status,name){
				this.api.reportupdateClassify({
					access_token:localStorage.getItem("access_token"),
					classify_id:row.id,
					status:status
				}).then(da => {
					this.getData({pageCurrent:1,pageSize:50});
				}).catch()
			}
		},
		created() {
			
			this.screenreach();
			this.getcommonrightbtn();
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
			if(!this.gettab('48') && this.gettab('49')){
				this.$parent.tabchange(2);
				this.tabsChange(1);
			}
			if(!this.gettab('49') && this.gettab('48')){
				this.$parent.tabchange(1);
				this.tabsChange(0);
			}
		},
		mounted() {
			if(this.$route.query.tabsnum){
				this.$parent.tabchange(2);
				this.tabsChange(1);
			}
			if(this.gettab('48') && this.gettab('49')){
				this.$parent.tabchange(1);
			}
			
			this.getData({
				pageCurrent: 1,
				pageSize:50
			});
		}
	}
</script>

<style>
	.materiallist .el-checkbox__label {
		display: none;
	}

	/* .work .el-button--primary {
		background: #FF5121;
		border-color: #FF5121;
	} */
	
	.feed > div{
		margin-left: 0;
	}
</style>

<style scoped>
	.Detail {
		background: white;
	}
	.wh{
		overflow: hidden;
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
		color: #33B3FF;
		border-bottom: 2px solid #33B3FF;
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
	
	.dorg{
		width:384px;
		height:195px;
		margin:auto;
		border-radius:4px;
	}
</style>
