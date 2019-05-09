<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<span class="fleft worktabs">
				审核详情
			</span>
			<div class="textcenter">
				<span v-for="(item,index) in tabData" :key="item.linkTo" :to="item.linkTo" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'" @click="tabsChange(index)">
					<!-- <el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge> -->
					{{ item.name }}
				</span>
			</div>
			<div class="materialdownload" v-if="tabsnum == 1">
				<button class="defaultbtn" style="width: 87px;height: 32px;" @click="showselectwork()">选择下载</button>
				<button class="defaultbtn" style="width: 87px;height: 32px;" @click="handleCheckAllChange()">全部下载</button>
			</div>
		</div>
		<div class="detailContent1 ofh">
			<ul v-if="tabsnum == 0">
				<li class="margint13 ofh" v-for="(item,index) in workData" :key="index" :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">---</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" src="../../assets/logo.png" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" src="../../assets/logo.png" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" src="../../assets/logo.png" alt="">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">rolename</span>
					</router-link>
				</li>
			</ul>
			<div class="paddinglr40 ofh" v-if="tabsnum == 1">
				<el-checkbox-group v-model="checkList">
				<div>
					<div>附件</div>
					<ul class="materiallist">
						<li class="">
							<div class="material relative">
								<el-checkbox class="material-checkbox"  label="1"  v-if="workselect"></el-checkbox>
								<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="">
							</div>
							<div class="color66">
								<span class="fleft">新概念</span>
								<span class="fright">新概念</span>
							</div>
						</li>
						<li class="">
							<div class="material relative">
								<el-checkbox class="material-checkbox" label="2" v-if="workselect"></el-checkbox>
								<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="">
							</div>
							<div class="color66">
								<span class="fleft">新概念</span>
								<span class="fright">新概念</span>
							</div>
						</li>
					</ul>
				</div>
				<div>
					<div>图片</div>
					<ul class="materiallist">
						<li class="">
							<div class="material relative">
								<el-checkbox class="material-checkbox" label="3"  v-if="workselect"></el-checkbox>
								<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="">
							</div>
							<div class="color66">
								<span class="fleft">新概念</span>
								<span class="fright">新概念</span>
							</div>
						</li>
						<li class="">
							<div class="material relative">
								<el-checkbox class="material-checkbox" label="4"  v-if="workselect"></el-checkbox>
							</div>
							<div class="color66">
								<span class="fleft">新概念</span>
								<span class="fright">新概念</span>
							</div>
						</li>
					</ul>
				</div>
				<div>
					<div>视屏</div>
					<ul class="materiallist">
						<li class="">
							<div class="material relative">
								<el-checkbox class="material-checkbox" label="5"  v-if="workselect"></el-checkbox>
								<img class="material-bo" src="../../assets/img/scsc_icon_zt.png" alt="">
							</div>
							<div class="color66">
								<span class="fleft">新概念</span>
								<span class="fright">新概念</span>
							</div>
						</li>
					</ul>
				</div>
				<div>
					<div>音频</div>
					<ul class="materiallist">
						<li class="">
							<div class="material relative">
								<el-checkbox class="material-checkbox" label="6"  v-if="workselect"></el-checkbox>
								<img class="material-bo" src="../../assets/img/scsc_icon_yp.png" alt="">
							</div>
							<div class="color66">
								<span class="fleft">新概念</span>
								<span class="fright">新概念</span>
							</div>
						</li>
						
					</ul>
				</div>
				</el-checkbox-group>
			</div>
			<ul v-if="tabsnum == 2">
				<li class="margint13 ofh" v-for="(item,index) in reviewinfocommon" :key="index" :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">---</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" src="../../assets/logo.png" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" src="../../assets/logo.png" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" src="../../assets/logo.png" alt="">
					<button class="defaultbtn0 defaultbtn-2" v-else-if="item.type == 'btn'">
						待审
					</button>
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">rolename</span>
					</router-link>
				</li>
				<li class="margint13 ofh" v-for="(item,index) in reviewinfostatus" :key="index" :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">---</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" src="../../assets/logo.png" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" src="../../assets/logo.png" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" src="../../assets/logo.png" alt="">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">rolename</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn" v-if="detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn" @click="reject()">申请驳回</button>
			<button class="defaultbtn defaultbtnactive" @click="agree()">申请通过</button>
			<button class="defaultbtn">预览作品</button>
		</div>
		<div class="screenContent detailbtn" v-if="!detailbtn">
			<button class="defaultbtn" @click="cancel">取消选项</button>
			<button class="defaultbtn defaultbtnactive" style="width: auto;padding: 0 5px;" @click="downWorks">下载 {{ checkList.length }} 个选项（100M）</button>
		</div>
		<el-dialog title="作品发布-审核驳回" :visible.sync="centerDialogVisible" width="738px">
		  <div style="position: relative;">
		  		<ul>
		  			<li class="w ofh">
		  				<span class="fleft Dialogkey">
		  					选择推荐评级
		  				</span>
		  				<el-radio-group v-model="radio1" class="sel-dialog-content fleft">
		  					<div class="w  sel-radio">
		  						<el-radio label="A">存在侵权</el-radio>
		  					</div>
		  					<div class="w sel-radio">
		  						<el-radio label="B">存在负面影响的言语或图片</el-radio>
		  					</div>
		  					<div class="w sel-radio">
		  						<el-radio label="C">作品类型选择与内容不符</el-radio>
		  					</div>
		  					<div class="w sel-radio">
		  						<el-radio label="S">其他理由</el-radio>
		  					</div>
		  				</el-radio-group>
		  			</li>
		  			<li class="w ofh">
		  				<span class="fleft Dialogkey">
		  					选择推荐评级
		  				</span>
						<div class="fleft" style="width:468px;">
							<el-input 
							  type="textarea"
							  :rows="6"
							  placeholder="请输入内容"
							  v-model="text10">
							</el-input>
						</div>
		  			</li>
		  		</ul>
		    
		  </div>
		  <span slot="footer" class="dialog-footer sel-footer">
			    <button class="defaultbtn" @click="reject">取消</button>
		  		<button class="defaultbtn defaultbtnactive" @click="contributor">确定驳回</button>
		  </span>
		</el-dialog>
		<el-dialog title="用户基础信息-设为平台推荐创作者" :visible.sync="centerDialogVisible1" width="406px">
		  <div style="position: relative;">
			<ul>
				<li class="w ofh">
					<span class="fleft Dialogkey">
						推荐等级
					</span>
					<el-radio-group v-model="radio2" class="sel-dialog-content fleft">
						<div class="w textcenter sel-radio">
							<el-radio label="A">A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大神级</el-radio>
						</div>
						<div class="w textcenter sel-radio">
							<el-radio label="B">B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专家级</el-radio>
						</div>
						<div class="w textcenter sel-radio">
							<el-radio label="C">C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;普通级</el-radio>
						</div>
						<div class="w textcenter sel-radio">
							<el-radio label="S">D&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业余级</el-radio>
						</div>
					</el-radio-group>
				</li>
			</ul>
		    
		  </div>
		  <span slot="footer" class="dialog-footer sel-footer">
			<el-button type="primary" @click="contributor1">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import reviewData from "@/assets/reviewData.js"
	export default {
		props: ['detailData','roles'],
		data() {
			return {
				text10: '',
				text30: "",
				length10: 0,
				length30: 0,
				rolename:"--",
				roleintroduce:"--",
				tabData:[
					{
						name:"作品信息",
						linkTo:"/review/publishWork",
						publishWorks:"",
					},
					{
						name:"素材预览",
						linkTo:"/review/finalistsWork",
						publishWorks:"",
					},
					{
						name:"审核信息",
						linkTo:"/review/employWork",
						publishWorks:"",
					}
				],
				tabsnum:0,
				workData:'',
				centerDialogVisible:false,
				centerDialogVisible1:false,
				radio1:'A',
				radio2:"A",
				workselect:false,
				detailbtn:true,
				checkList:[],
				checkAll:["1","2","3","4","5","6"],
				reviewinfocommon:"",
				reviewinfostatus:"",
				status_info:2,
			}
		},
		methods: {
			getparent() {
				this.router.push({
					path: "/review/publishWork"
				})
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			getleng(n) {
				if (n == 10) {
					this.length10 = this.text10.length
				} else if (n == 30) {
					this.length30 = this.text30.length
				}
			},
			tabsChange(num){
				this.tabsnum = num;
				if(num != 1){
					this.detailbtn = true;
					this.workselect = false;
				}
				
			},
			getkey(page){
				switch(page){
					case "publishWork":
						this.workData = reviewData.publishWork.workInfo;
						this.reviewinfocommon = reviewData.publishWork.reviewinfo.common;
						if(this.status_info == 2) {
							this.reviewinfostatus = reviewData.publishWork.reviewinfo.status2;
							console.log(this.reviewinfostatus);
						};
						if(this.status_info == -2) {
							this.reviewinfostatus = reviewData.publishWork.reviewinfo.status_2;
						};
					break;
				}
			},
			reject(){
				this.centerDialogVisible = !this.centerDialogVisible;
			},
			contributor(){
				//console.log(openids)
				//console.log(this.selectData);
				this.reject();
				/* var open_ids = this.getopenids();
			    this.centerDialogVisible = false;
				this.centerDialogVisible1 = false;
			    this.$confirm('有30位用已经是平台推荐创作者</br>是否统一将推荐评级修改为A', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				    dangerouslyUseHTMLString:true,
					type: '',
					center: true
			    }).then(() => {
					//console.log({open_ids:openids,level:this.radioS})
					this.api.setRecommendLevel({open_ids:open_ids,level:this.radioS}).then(da=>{
						this.$message(da)
						//console.log(da)
					})
			    }).catch(() => {
					this.$message({
					  type: 'info',
					  message: '已经取消'
					});
			  }); */
			},
			contributor1(){
				this.agree();
			},
			agree(){
				this.centerDialogVisible1 = !this.centerDialogVisible1
			},
			showselectwork(){
				this.detailbtn = !this.detailbtn;
				this.workselect = !this.workselect;
			},
			downWorks(){
				console.log(this.checkList);
			},
			handleCheckAllChange(val) {
				this.checkList =  this.checkAll;
				this.detailbtn = false;
				this.workselect = true;
			},
			cancel(){
				this.checkList = [];
			}
			
		},
		mounted() {
			this.getkey(this.$route.query.page)
		}
	}
</script>
	
<style>
	.materiallist .el-checkbox__label{
		display: none;
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

	.detailContent1 > ul {
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
	
	.account-ipt{
		padding: 10px;
		text-align: center;
		border: 1px solid #999999;
        border-radius: 5px;
	}
	
	.tabs{
		width: 96px;
		height: 33px;
		display: inline-block;
		margin-right: 71px;
		cursor: pointer;
	}
	
	.tabactive{
		color: #FF5121;
		border-bottom: 2px solid #FF5121;
	}
	.img-top{
		width: 68px;
		height: 68px;
		border-radius: 50%;
		border: 1px solid red;
	}
	
	.img-fengmian{
		width: 200px;
		height: 150px;
		border: 1px solid red;
	}
	
	.img-banner{
		width: 341px;
		height: 110px;
		border: 1px solid red;
	}
	
	.materiallist {
		display: flex;
		overflow: hidden;
		flex-wrap:wrap;
		justify-content: flex-start
	}
	
	.materiallist li {
		margin: 0 17px 17px 0;
	}
	
	.material{
		width: 239px;
		height: 135px;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
        border-radius: 5px;
		background: #F9F9F9;
	}
	
	.material-fu{
		width: 60px;
		height: 68px;
		position: absolute;
		top:50%;
		left:50%;
		margin-top: -34px;
		margin-left: -30px;
	}
	
	.material-bo{
		width: 32px;
		height: 32px;
		position: absolute;
		top:50%;
		left:50%;
		margin-top: -16px;
		margin-left: -16px;
	}
	
	.material-checkbox{
		position: absolute;
		top: 6px;
		right: 10px;
	}
	
	.materialdownload{
		position: absolute;
		top: 10px;
		right: 10px;
	}
	
	.color66{
		color: #666666;
		margin-top: 3px;
		overflow: hidden;
	}
	
	.el-message-box--center .el-message-box__title{
		justify-content:left;
	}
	.sel-alert{
		width:406px;
	}
	
	.el-message-box__header,.el-dialog__header{
		padding:27px 30px !important;
		
	}
	
	.el-dialog__title{
		font-size:16px !important;
	}
	
	.el-dialog__body{
		padding:27px 0 27px !important;
		border-top:1px solid #e6e6e6;
	}
	
	.el-radio-group{
		display: block;
	}
	
	.el-dialog__headerbtn{
		position: "";
		float: right;
		font-size: 18px;
	}
	
	.sel-footer {
		display:block;
		text-align: center;
	}
	
	.el-radio{
		line-height: 28px;
	}
	
	.el-radio__input.is-checked .el-radio__inner,.el-button--primary{
		background: #FF5121;
		border-color: #FF5121;
	}
	.el-button--primary:focus, .el-button--primary:hover{
		background: #FF5121;
		border-color: #FF5121;
	}
	[class*=" el-icon-"], [class^=el-icon-]{
		line-height: 2;
	}
	
	.sel-radio-title{
		position: absolute;
		left:30px;
	}
	
	.font12{
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #999999;
	}
	.el-message-box--center .el-message-box__content{
		padding: 20px 0 37px;
		border-top: 1px solid #E6E6E6;
	}
</style>
