<template>
	<div class="wh">
		<common-top :commonTopData="commonTopData"></common-top>
		<div class="wh Detail">
			<div class="detailContent1 ofh">
				<ul>
					<li class="margint13 ofh">
						<span class="fleft roles-input fontcolorg" style="margin-right: 20px;">邮箱标题</span>
						<div class="el-input__inner roles-input width500">
							<input type="text" 
							placeholder="请输入内容" 
							class="sel-input fleft" 
							oninput="if(value.length > 10)value = value.slice(0, 10)"
							maxlength="10" 
					
							v-model="form.title">
							<span class="fright">{{ form.title.length }}/10</span>
						</div>
					</li>
					<li class="margint13 ofh">
						<span class="fleft roles-input fontcolorg" style="margin-right: 20px;">邮箱录入</span>
						<div class="pt_tesxt  width500">
							<textarea
							placeholder="请输入要发送的邮箱,若需发送多个邮箱,请每行输入一个邮箱如\r12345@qq.com\r12345@qq.com" 
							class="sel-input fleft"v-model="form.to_email_idsAll">
								
							
							</textarea>
							
						</div>
					</li>
					<li class="margint13 ofh">
						<span class="fleft fontcolorg" style="margin-right: 20px;"></span>
						<div style="margin-left: 77px;">
							<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="form.content"></vue-ueditor-wrap>
						</div>

					</li>
					
					<li class="margint13 ofh">
						<span class="fleft fontcolorg" style="margin-right: 20px;">发送时间</span>
						<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.send_time" type="datetime"
						 placeholder="发送时间">
						</el-date-picker>
					</li>
				</ul>
			</div>
			
			<div class="screenContent detailbtn">
				<button class="defaultbtn" @click="getparent()">返回</button>
				<button class="defaultbtn defaultbtnactive" v-if="!$route.query.id" @click="add()">创建</button>
				<button class="defaultbtn defaultbtnactive" v-if="$route.query.id" @click="edit()">保存</button>
			</div>

		</div>
	</div>
</template>

<script>
    import VueUeditorWrap from 'vue-ueditor-wrap'
	import workData from "../../../assets/workData.js"
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
				form:{
					title:''
				},
				ajaxType:false,
				currentpageName:"",
				pageName: "addrelease",
				tableAction: DataScreen.screenShow.addrelease.action,
				filterFields: [],
				dialogTableVisible: false,
				textarea: '',
				commonTopData: {
					"pageName": "addrelease",
					"commonleftbtn": [],
					"commonrightbtn": [],
					"commonbottombtn": [],
				},
				myConfig: {
					autoHeightEnabled: false,
					initialFrameHeight: 250,
					initialFrameWidth: 500,
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
				
				adminuseraccess:[],
			}
		},
		methods: {
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
			checkAll(){
				if(this.ajaxType){
					this.$message({
						message:'正在处理请稍后'
					})
					return false
				}
				if(!this.form.title){
					this.$message({
						message:'请输入邮件标题'
					})
					return false
				}
				if(!this.form.to_email_idsAll){
					this.$message({
						message:'请输入邮箱'
					})
					return false
				}
				let eml = this.form.to_email_idsAll.split(/[\n]/);
				let str = '';
				let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
								
				eml.map((el,index)=>{
					if(!reg.test(el)){ 
						str+='第'+(index+1)+'行邮箱格式不正确请删除或修改后提交<br/>';
					}
				})
				if(str){
					this.$message({
						dangerouslyUseHTMLString: true,
						message: str		
					})
					return false
				}
				if(!this.form.content){
					this.$message({
						message:'请输入邮件内容'
					})
					return false
				}
				if(!this.form.send_time){
					this.$message({
						message:'请选择发送时间'
					})
					return false
				}
				return {
					access_token:localStorage.getItem("access_token"),
					title:this.form.title,
					content:this.form.content,
					send_time:this.form.send_time,
					to_email_ids:eml.join(',')
				};				
			},
			add(){
				if(this.adminuseraccess.indexOf('200698')==-1){
					this.$message({
						message:'你没有权限'
					})
					this.$router.push({
						path:"/new/email"
					})
					return
				}
				let pr = this.checkAll();
				if(!pr){return}			
				this.ajaxType = true;	
				this.api.Noticeemailadd(pr).then(da => {
					this.ajaxType = false;
					if(da.result == 0){
						this.$router.push({
							path:"/new/email"
						})
					}
				}).catch(() => {
					this.ajaxType = false;		
				})
			},
			edit(){	
				if(this.adminuseraccess.indexOf('200699')==-1){
					this.$message({
						message:'你没有权限'
					})
					this.$router.push({
						path:"/new/email"
					})
					
					
					return
				}
				let pr = this.checkAll();
				if(!pr){return}		
				pr.id = this.$route.query.id;
				this.ajaxType = true;		
				this.api.Noticeemailedit(pr).then(da => {
					this.ajaxType = false;		
					if(da.result == 0){
						this.$router.push({
							path:"/new/email"
						})
					}
				}).catch(() => {
					this.ajaxType = false;				
				})
			},
			getData(){
				this.api.Noticeemaildetail({
					access_token:localStorage.getItem("access_token"),
					id:this.$route.query.id
				}).then((da)=>{
					this.form = {
						title:da.title,
						content:da.content,
						to_email_ids:da.to_email_ids,
						send_time:da.send_time,
						to_email_idsAll:da.to_email_ids.replace(/[,]/g,"\r\n")
					}
				}).catch(()=>{
					this.$router.push({
						path:"/new/email"
					})
				})
			}
		},
		mounted(){
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
			let ids = '200698';
			if(this.$route.query.id){
				ids = '200699';
				this.getData();
			}
			if(this.adminuseraccess.indexOf(ids)==-1){
				this.$message({
					message:'你没有权限'
				})
				this.$router.push({
					path:"/new/email"
				})
				return
			}
			
			
		},
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

	.paddingb10 {
		padding-bottom: 10px;
	}

	.padding10 {
		padding: 10px 0;
	}

	/* .cttitle {
		line-height: 60px;
		padding-bottom: 20px;
	} */

	.tagbts {
		display: flex;
		align-items: center;
		height: 100%;
		/* overflow-x: auto; */
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
	.pt_tesxt{
		display: inline-block;
		vertical-align: top;
	}
	.pt_tesxt>textarea{
		height: 120px;
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		margin: 0;
		border: 1px solid #DCDFE6;
	}
	
</style>
