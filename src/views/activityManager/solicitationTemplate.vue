<template>	
		<div class="wh">
			<common-top :commonTopData="commonTopData" class="tags"></common-top>
			<div style="height: calc(100% - 135px);overflow: hidden;">
				<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
				ref="Tabledd"></common-table>
			</div>
			<el-dialog title="文件管理-修改文件名称" :visible.sync="centerDialogVisible" width="406px">
				<div style="position: relative;">
					<ul>
						<li class="w ofh textcenter">
							<span class="fleft marginleft60" style="line-height: 40px;">文件名称</span>
							<input type="text" v-model="file_name" class="fleft defaultbtn defaultbtn0" style="width:200px">
						</li>
					</ul>
				</div>
				<span slot="footer" class="dialog-footer sel-footer">
					<button class="defaultbtn" @click="centerDialogVisible = false">取 消</button>
					<button class="defaultbtn defaultbtnactive" @click="newname">确 定</button>
				</span>
			</el-dialog>
			<el-dialog title="上传模板文件" :visible.sync="showmask">
				<span slot="footer" class="dialog-footer sel-footer">
					<button v-if="gettab('200442')" class="defaultbtn" @click="showmaskload">本地文件</button>
					<button v-if="gettab('200445')" class="defaultbtn" @click="showmaskload1">网盘链接</button>
				</span>
			</el-dialog>
			<el-dialog title="本地文件" :visible.sync="showmask1">
				<div class="dorg textcenter">
					<!-- :http-request="httprequest" -->
					<div>
						<el-upload
						class="upload-demo textcenter"
						drag
						ref="upload"
						:http-request="httprequest"
						action="454535"
						:limit = "1"
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
					<div  style="margin: 20px;">
						<button class="defaultbtn defaultbtnactive " @click="templateadds(1)">确定</button>
					</div>
				</div>
			</el-dialog>
			<el-dialog title="网盘链接" :visible.sync="showmask2">
				<div class="dorg textcenter" style="width: 100%;">
					<div>
						<span style="line-height: 40px;padding-right: 20px;">文件名称</span>
						<el-input style="width: 357px" v-model="filename" placeholder="请输入文件名称"></el-input>
					</div>
					<div style="margin-top: 30px;">
						<span style="line-height: 40px;padding-right: 20px;">网盘链接</span>
						<el-input style="width: 357px" v-model="online_disk_info" placeholder="请输入网盘链接，提取码等"></el-input>
					</div>
					<div style="margin-top: 40px;">
						<button class="defaultbtn defaultbtnactive " @click="templateadds(2)">确定</button>
					</div>
				</div>
			</el-dialog>
			<div class="masku screenContent" style="background: rgba(0,0,0,0.4);z-index: 2060;" v-if="isupload">
				<el-progress type="circle" :percentage="progressnum" class="prossage"></el-progress>
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
				filedata:{
					
				},
				
				tabsnum: 0,
				commonTopData: {
					"pageName": "solicitationTemplate",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					"commonrightbtn": [{
						name: "上传模板文件",
						id: "right1",
						two:{
							id1:'200442',
							id2:'200445'
						}
					}],
					"commonbottombtn": [],
					"tabTopData": [{
						name: "本地文件",
						accessid:"46"
					},
					{
						name: "网盘链接",
						accessid:"47"
					}
				],
				'tabnums':0,
					// "IsShow": true,
					upload: true

				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage: 1,
					pagesize: 10,
					pageName: "solicitationTemplate",
					list: DataScreen.screenShow.solicitationTemplate.bts0,
					ischeck: false
				},
				tableData: [],
				tableAction: DataScreen.screenShow.solicitationTemplate.action0,
				detailData: "",
				IsDetail: false,
				filterFields: DataScreen.screen.solicitationTemplate.filterFields0,
				centerDialogVisible: false,
				showmask: false,
				type: 1,
				rowdata: "",
				file_name: "",
				showmask1: false,
				showmask2:false,
				file_info:{},
				file_url:'',
				typewen:1,
				online_disk_info:"",
				filename:'',
				filetype:"",
				isupload:false,
				progressnum:0
			}
		},
		methods: {
			tabsChange(num) {
				this.tabsnum = num;
				this.type = num + 1;
				this.tableConfig.list = DataScreen.screenShow.solicitationTemplate["bts" + num];
				this.tableAction = DataScreen.screenShow.solicitationTemplate["action" + num],
				this.filterFields = DataScreen.screen.solicitationTemplate["filterFields"+num]
				//console.log(this.tableConfig.list);
				this.$parent.tabchange(num+1);
				this.$router.push({ path: '/otherInformation/solicitationTemplate', query: {urlDate: ''}});
				this.getData({pageCurrent:1,pageSize:50});
			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
					type: this.type,
				}

				//获取筛选的条件
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					sreenData.type = this.type;
					data = sreenData;
				}
				
				this.api['templateList'+this.type](data).then((da) => {	
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					this.setLoding(false);
				}).catch(() => {
					this.setLoding(false);
				});
			},
			setLoding(type){
				//alert(2);
				//console.log(this.$refs);
				this.$refs.Tabledd.setLoding(type);	
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
					contribute_type: 2
				}).then(da => {
					this.detailData = da;
					//console.log(da);
				}).catch(() => {})
			},
			httprequest(params) {
				const _file = params.file;
				this.file_info = params.file;
				let app_secret = '1Q61s1iP8I376GyMTdsjOzd4hcLpZ4SG';
				let open_id = 7;
				let times = (Date.parse(new Date()) / 1000);
				let arr = [
					1003,
					app_secret,
					open_id,
					times
				];
				
				
				// 通过 FormData 对象上传文件
				 var formData = new FormData();
				formData.append("file", _file);
				formData.append('app_id', 1003);
				formData.append('sign', this.MD5(encodeURIComponent(arr.sort())))
				formData.append('user', open_id)
				formData.append('relation_type', 'activity')
				formData.append('timestamp', times) 
				
			     var _this = this;
				 _this.isupload = true;
				this.axios({
					url:'http://139.129.221.123/File/File/insert', 
					data:formData,
					method:"post",
					onUploadProgress:function(progressEvent){
						_this.progressnum = (progressEvent.loaded / progressEvent.total).toFixed(2) * 100
					}
				}).then(function (response) {
			
					response = response.data;
					_this.isupload = false;
					_this.progressnum = 0;
					
					
					if(response.result == 0){
						_this.file_url = response.data.data.url;
						_this.filetype = response.data.data.file_type;												
					}else{
						_this.$message({
							type: 'info',
							message:response.data,
						})
					}					
				}).catch(function (error) {
					console.log(error);
				}); 
			
			},
			getcommonrightbtn(){
				this.commonTopData.commonbottombtn = [];
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate);
					//console.log(urldata);
					this.filterFields.forEach(item=>{
						//console.log(item);
						if(urldata[item.id] && !item.type){
							var val = urldata[item.id];
							//alert(val)
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
						if(item.type == "more"){
							if(urldata[item.id]){
								this.commonTopData.commonbottombtn.push({btnName:item.name,val:urldata[item.id],id:item.id})
							}
								
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
					this.$router.push({ path: '/otherInformation/solicitationTemplate', query: {urlDate: JSON.stringify(urldata)}});
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
					//console.log(val.template_file_id)
					this.api['templateDelete'+this.type]({
						template_file_id: val.template_file_id,
						access_token: localStorage.getItem("access_token"),
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
			newname() {
				this.api['templateedit'+this.type]({
					template_file_id: this.rowdata.template_file_id,
					file_name: this.file_name,
					access_token: localStorage.getItem("access_token"),
				}).then(da => {
					this.getData({pageCurrent:1,pageSize:50});
				}).catch(da => {
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
			templateadds(type){
				
				if(type==1 && !this.file_info.filetype){
					this.$message({
						message:'请先上传正确的文件'
					})
					return
				}
				if(type==2 ){
					if(!this.file_info.name){
						this.$message({
							message:'请输入文件名'
						})
						return
					}
					if(!this.online_disk_info){
						this.$message({
							message:'请输入网盘链接'
						})
						return
					}
				}
				var data = {};
				if(type == 1){
					data = {
						file_name:this.file_info.name,
						file_type:this.filetype,
						file_size:this.file_info.size,
						template_url:this.file_url,
						online_disk_info:this.online_disk_info,
						type:1,
						access_token: localStorage.getItem("access_token"),
					}
					
					/* if(this.isupload == false) {
						this.$message({
							message:"文件未上传完成/没有上传文件"
						})
						return;
					} */
				} else {
					data = {
						file_name:this.filename,
						online_disk_info:this.online_disk_info,
						type:2,
						access_token: localStorage.getItem("access_token"),
					}
				}
				
				
				this.api['templateadd'+type](data).then(da => {
					this.$refs.upload.clearFiles();
					this.showmask1 = false;
					this.showmask2 = false;
					this.getData({pageCurrent:1,pageSize:50});
				}).catch(da => {
					this.$message({
						type: 'info',
						message: "系统网络故障"
					})
				})
				
			},
			gettab(id){
				if(this.adminuseraccess.indexOf(id) > -1){
					return true;
				} else {
					return false;
				}
				
			}
		},
		created() {
			this.screenreach();
			this.getcommonrightbtn();
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
			if(!this.gettab('46') && this.gettab('47')){
				this.$parent.tabchange(2);
				this.tabsChange(1);
			}
			if(!this.gettab('47') && this.gettab('46')){
				this.$parent.tabchange(1);
				this.tabsChange(0);
			}
		},
		mounted() {
			//console.log(this.tableConfig)
			this.getData({pageCurrent:1,pageSize:50});
			if(this.gettab('46') && this.gettab('47')){
				this.$parent.tabchange(1);
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
	.tags .ta{
		margin: 0 !important;
	}
	.materiallist .el-checkbox__label {
		display: none;
	}

	.work .el-button--primary {
		background: #33B3FF;
		border-color: #33B3FF;
	}
	
	.el-upload-list__item-name{
		text-align: left;
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
		background: #33B3FF;
		border-color: #33B3FF;
	}

	.el-button--primary:focus,
	.el-button--primary:hover {
		background: #33B3FF;
		border-color: #33B3FF;
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
		margin:auto;
		border-radius:4px;
	}
</style>
