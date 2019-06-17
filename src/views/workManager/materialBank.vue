<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<div style="margin-bottom: 32px;">
				<span class="fleft worktabs">
					素材库
				</span>
				<div class="textcenter">
					<span v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
					 @click="tabsChange(index,item.id)">
						<!-- <el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge> -->
						{{ item.name }}
					</span>
				</div>
				<div class="materialdownload">
					<button class="defaultbtn" style="width: 87px;height: 32px;" @click="showselectwork()">选择下载</button>
					<button class="defaultbtn" style="width: 87px;height: 32px;" @click="handleCheckAllChange()">全部下载</button>
				</div>
			</div>
			<div>
				<common-top :commonTopData="commonTopData"></common-top>
			</div>
			
		</div>
		<div class="detailContent ofh" style="height: calc(100% - 285px);" v-loading="setLoding">
			<div class="paddinglr40 ofh" v-if="tabsnum == 0">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<div>
						<ul class="materiallist">
							<li v-for="(item,index) in materialdata" :key="item.fid">
								<div class="material relative">
									<el-checkbox class="material-checkbox" :label="item.fid+','+item.file_size" v-if="workselect" @click.stop.native></el-checkbox>
									<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft" @click="gotodetail('附件',item.fid)">{{ item.file_name }}</span>
									<span class="fright">{{ Number(item.file_size) / 1024 >= 1 ? Number(item.file_size/1024).toFixed(2) +"M" : Number(item.file_size).toFixed(2) + "KB"}}</span>
								</div>
							</li>
							
						</ul>
					</div>
				</el-checkbox-group>
			</div>
			<div class="paddinglr40 ofh" v-if="tabsnum == 1">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<ul class="materiallist">
						<li v-for="(item,index) in materialdata" :key="item.fid">
							<div class="material relative" :style="{backgroundImage: 'url(' + item.file_url + ')', backgroundSize:'100% 100%'}">
								<el-checkbox class="material-checkbox" :label="item.fid+','+item.file_size" v-if="workselect" @click.stop.native></el-checkbox>
							</div>
							<div class="color66">
								<span class="fleft" @click="gotodetail('图片',item.fid)">{{ item.file_name }}</span>
								<span class="fright">{{ Number(item.file_size) / 1024 >= 1 ? Number(item.file_size/1024).toFixed(2) +"M" : Number(item.file_size).toFixed(2) + "KB"}}</span>
							</div>
						</li>
					</ul>
				</el-checkbox-group>
			</div>
			<div class="paddinglr40 ofh" v-if="tabsnum == 2">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<div>
						<ul class="materiallist">
							<li v-for="(item,index) in materialdata" :key="item.fid">
								<div class="material relative" :style="{backgroundImage: 'url(' + item.cover_img + ')', backgroundSize:'100% 100%'}">
									<el-checkbox class="material-checkbox" :label="item.fid+','+item.file_size" v-if="workselect" @click.stop.native></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_zt.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft" @click="gotodetail('视频',item.fid)">{{ item.file_name }}</span>
									<span class="fright">{{ Number(item.file_size) / 1024 >= 1 ? Number(item.file_size/1024).toFixed(2) +"M" : Number(item.file_size).toFixed(2) + "KB"}}</span>
								</div>
							</li>
						</ul>
					</div>
				</el-checkbox-group>
			</div>
			<div class="paddinglr40 ofh" v-if="tabsnum == 3">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<div>
						<ul class="materiallist">
							<li v-for="(item,index) in materialdata" :key="item.fid">
								<div class="material relative">
									<el-checkbox class="material-checkbox" :label="item.fid+','+item.file_size" v-if="workselect" @click.stop.native></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_yp.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft" @click="gotodetail('音频',item.fid)">{{ item.file_name }}</span>
									<span class="fright">{{ Number(item.file_size) / 1024 >= 1 ? Number(item.file_size/1024).toFixed(2) +"M" : Number(item.file_size).toFixed(2) + "KB"}}</span>
								</div>
							</li>
						</ul>
					</div>
				</el-checkbox-group>
			</div>
			<div class="w" style="text-align: right;background: #FFFFFF;" v-if="!workselect">
				<div class="fleft" style="line-height: 100px;color: #999999;margin-left: 40px;">
					 <span>已选择{{ selected }}条,</span><span>共{{total}}条数据</span>
				</div>
				<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
				 :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			<div class="screenContent detailbtn"  v-if="workselect">
				<button class="defaultbtn" @click="showselectwork()">取消选项</button>
				<button class="defaultbtn defaultbtnactive" style="width: auto;padding: 0 5px;" @click="downfile">下载 {{ checkList.length }}
					个选项（{{ font_size / 1024 >= 1 ? (font_size/1024).toFixed(2) +"M" : font_size.toFixed(2) + "KB" }}）</button>
			</div>
		</div>
		<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
	</div>
</template>

<script>
	import workData from "../../assets/workData.js"
	import commonTop from '@/components/commonTop.vue'
	import DataScreen from "@/assets/DataScreen.js"
	
	export default {
		components: {
			commonTop
		},
		data() {
			return {
				tabData: [{
						name: "附件",
						id:"zip"
					},
					{
						name: "图片",
						id:"image"
					},
					{
						name: "视频",
						id:"video"
					},
					{
						name: "音频",
						id:"audio"
					}],
				tabsnum: 0,
				detailbtn:true,
				workselect:false,
				checkList: [],
				checkAll: ["1", "2", "3", "4", "5", "6"],
				work_info:{},
				material_list:{},
				hire_info:{},
				font_size:0,
				commonTopData: {
					"pageName": "materialBank",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}, ],
					"commonrightbtn": [],
					"commonbottombtn": [],
					"IsShow":true
				},
				pagesize:10,
				total:0,
				currentpage:1,
				selected:0,
				file_type:"zip",
				setLoding:true,
				materialdata:"",
				filterFields:DataScreen.screen.materialBank.filterFields
			}
		},
		methods: {
			getparent() {
				//alert(parseInt(this.$route.query.type))
				this.$router.push({
					path: "/workManager/workInfo"
				})
				
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			
			getData(currentpage,pagesize) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: currentpage,
					limit: pagesize,
					file_type:this.file_type
				}
				//获取筛选的条件
				//console.log(JSON.parse(this.$route.query.urlDate))
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = currentpage;
					sreenData.limit = pagesize;
					sreenData.file_type = this.file_type;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
			
				this.api.Workmaterial(data).then((da) => {
					if (!da) {
						this.$message('数据为空');
					}
					console.log(da)
					this.materialdata = da.data
					this.total = da.total;
					this.setLoding = false;
				}).catch(() => {
					this.setLoding = false;
				});
			
				/* this.setLoding(false); */
			},
			tabsChange(num,id) {
				this.tabsnum = num;
				this.detailbtn=true;
				this.workselect=false;
				this.file_type = id;
				this.getData(1,10);
				this.checkList=[];
				this.font_size = 0;
			},
			showselectwork() {
				this.detailbtn = !this.detailbtn;
				this.workselect = !this.workselect;
			},
			handleCheckAllChange(val) {
				this.checkList = this.checkAll;
				this.detailbtn = false;
				this.workselect = true;
			},
			handleSizeChange(val) {
				this.getData(this.currentpage,val)
			},
			handleCurrentChange(val) {
				this.getData(val,this.pagesize)
			},
			handleSelectionChange(val) {
				/* this.selected = val.length
				this.$parent.selectData = val; */
			},
			gotodetail(name,fid){
				this.router.push({
					path:"materialBank/materialBankdetail",
					query:{tabsnum:this.tabsnum,name:name,fid:fid}
				})
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
					//console.log(tag);
					this.$router.push({path:'/workManager/materialBank',query:{urlDate:JSON.stringify(urldata)}});
				}
			},
			downfile(){
				var x=new XMLHttpRequest();
				x.open("GET", "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/776cc6d81cabf16305fa9749ac0fdfc8.zip", true);
				x.responseType = 'blob';
				x.onload=function(e){
					var url = window.URL.createObjectURL(x.response)
					var a = document.createElement('a');
					a.href = url
					a.download = ''
					a.click()
				}
				x.send();
			},
			handleCheckedCitiesChange(val){
				//console.log(val
				this.font_size = 0;
				val.forEach((item,index) =>{
					console.log(item.split(",")[1])
					this.font_size += Number(item.split(",")[1])
				});
			},
			
		},
		created() {
			this.getcommonrightbtn();
		},
		mounted() {
			this.getData(1,10);
		},
		watch:{
			"$route":function(){
				this.getcommonrightbtn();
				this.getData(1,10);
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
	
	.sel-pagin ul{
		padding: 0 !important;
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
