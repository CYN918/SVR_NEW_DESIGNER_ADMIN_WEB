<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<div style="margin-bottom: 32px;">
				<span class="fleft worktabs">
					素材库
				</span>
				<div class="textcenter">
					<span style="height: 30px;" v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
					 @click="tabsChange(index,item.id)">
						<!-- <el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge> -->
						{{ item.name }}
					</span>
				</div>
				<div class="materialdownload" v-if="adminuseraccess.indexOf('200465') > -1">
					<button class="defaultbtn" style="width: 87px;height: 32px;margin-right: 10px;" @click="showselectwork()">选择下载</button>
					<button class="defaultbtn" style="width: 87px;height: 32px;margin-left: 0;" @click="handleCheckAllChange()">全部下载</button>
				</div>
			</div>
			<div  class="sucia">
				<common-top :commonTopData="commonTopData" class="commontop"></common-top>
			</div>
		</div>
		<div  ref="bgwidth" class="paddinglr40 ofh" style="height: calc(100% - 285px);overflow-y: scroll;width: calc(100% - 80px);" v-loading="setLoding">
			<div class="ofh w" v-show="tabsnum == 0" >
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<ul class="materiallist">
						 <li v-for="(item,index) in materialdata" :key="index">
							<div class="material relative" @mouseover="hover(item.fid,item.file_url,item.file_name)">
								<el-checkbox class="material-checkbox" :label="item.file_url +','+item.fid+','+item.file_size+','+item.file_name" v-if="workselect" @click.stop.native></el-checkbox>
								<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="">
								<div class="hoverload" v-if="item.fid == fid && !workselect && (adminuseraccess.indexOf('200465') > -1)" @click="downWorks('one')" @click.stop></div>
							</div>
							<div class="color66">
								<span :title="item.file_name" style="width: 100px;height: 20px;" class="fleft textover" @click="gotodetail('附件',item.fid)">{{ item.file_name }}</span>
								<span class="fright">{{ Number(item.file_size) / 1024 >= 1 ? Number(item.file_size/1024).toFixed(2) +"M" : Number(item.file_size).toFixed(2) + "KB"}}</span>
							</div>
						</li>
						<li v-for="item in buchu" class="material" style="visibility: hidden;"></li>
					</ul>
				</el-checkbox-group>
			</div>
			<div class="ofh" v-show="tabsnum == 1">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<ul class="materiallist">
						<li v-for="(item,index) in materialdata" :key="index+item.fid">
							<div class="material relative" @mouseover="hover(item.fid,item.file_url,item.file_name)" :style="{backgroundImage: 'url(' + item.file_url + ')', backgroundSize:'100% 100%'}" @click="getimgulr(item.file_url)" @click.stop>
								<el-checkbox class="material-checkbox" :label=" item.file_url +','+item.fid+','+item.file_size+','+item.file_name" v-if="workselect" @click.stop.native></el-checkbox>
								<div class="hoverload" v-if="item.fid == fid && !workselect && (adminuseraccess.indexOf('200465') > -1)" @click="downWorks('one')" @click.stop></div>
							</div>
							<div class="color66">
								<span :title="item.file_name" style="width: 100px;height: 20px;" class="fleft textover" @click="gotodetail('图片',item.fid)">{{ item.file_name }}</span>
								<span class="fright">{{ Number(item.file_size) / 1024 >= 1 ? Number(item.file_size/1024).toFixed(2) +"M" : Number(item.file_size).toFixed(2) + "KB"}}</span>
							</div>
						</li> 
						<li v-for="item in buchu" class="material" style="visibility: hidden;"></li>
					</ul>
				</el-checkbox-group>
			</div>
			<div class="ofh" v-show="tabsnum == 2">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<div>
						<ul class="materiallist">
							<li class="relative" v-for="(item,index) in materialdata" :key="item.fid+index">
								<div class="material relative" @mouseover="hover(item.fid,item.file_url,item.file_name)" :style="{backgroundImage: 'url(' + item.cover_img + ')', backgroundSize:'100% 100%'}" @click="showvideo(item.fid)" @click.stop>
									<el-checkbox class="material-checkbox" :label=" item.file_url +','+item.fid+','+item.file_size+','+item.file_name" v-if="workselect" @click.stop.native></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_zt.png" alt="">
									<div class="hoverload" v-if="item.fid == fid && !workselect && (adminuseraccess.indexOf('200465') > -1)" @click="downWorks('one')" @click.stop></div>
								</div>
								<video v-show="videofid == item.fid" :id="item.fid" :src="item.file_url" class="material" controls="controls" style="position: absolute;top:0;left: 0;border-radius: 5px;"></video>
								<div class="color66">
									<span :title="item.file_name" style="width: 100px;height: 20px;" class="fleft textover" @click="gotodetail('视频',item.fid)">{{ item.file_name }}</span>
									<span class="fright">{{ Number(item.file_size) / 1024 >= 1 ? Number(item.file_size/1024).toFixed(2) +"M" : Number(item.file_size).toFixed(2) + "KB"}}</span>
								</div>
							</li> 
							<li v-for="item in buchu" class="material" style="visibility: hidden;"></li>
						</ul>
					</div>
				</el-checkbox-group>
			</div>
			<div class="ofh" v-show="tabsnum == 3">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<div>
						<ul class="materiallist relative">
							 <li v-for="(item,index) in materialdata" :key="item.fid+index+index">
								<div class="material relative" @mouseover="hover(item.fid,item.file_url,item.file_name)" :style="{backgroundImage: 'url(' + item.cover_img + ')', backgroundSize:'100% 100%'}" @click="showaudio(item.fid)" @click.stop>
									<el-checkbox class="material-checkbox" :label=" item.file_url +','+item.fid+','+item.file_size+','+item.file_name" v-if="workselect" @click.stop.native></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_yp.png" alt="">
									<div class="hoverload" v-if="item.fid == fid && !workselect && (adminuseraccess.indexOf('200465') > -1)" @click="downWorks('one')" @click.stop></div>
								</div>
								<audio v-show="audiofid == item.fid" :id="item.fid" :src="item.file_url" class="material" controls style="position: absolute;top:0;left: 0;border-radius: 5px;"></audio>
								<div class="color66">
									<span :title="item.file_name" style="width: 100px;height: 20px;" class="fleft textover" @click="gotodetail('音频',item.fid)">{{ item.file_name }}</span>
									<span class="fright">{{ Number(item.file_size) / 1024 >= 1 ? Number(item.file_size/1024).toFixed(2) +"M" : Number(item.file_size).toFixed(2) + "KB"}}</span>
								</div>
							</li> 
							<li v-for="item in buchu" class="material" style="visibility: hidden;"></li>
						</ul>
					</div>
				</el-checkbox-group>
			</div>
			<div class="w" style="text-align: right;background: #FFFFFF;" v-if="!workselect">
				<div class="fleft" style="line-height: 100px;color: #999999;margin-left: 40px;">
					 <span>已选择{{ selected }}条,</span><span>共{{total}}条数据</span>
				</div>
				<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
				 :page-sizes="[50, 100, 200, 500]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			<div class="screenContent detailbtn"  v-if="workselect">
				<button class="defaultbtn" @click="showselectwork()">取消选项</button>
				<button class="defaultbtn defaultbtnactive" style="width: auto;padding: 0 5px;" @click="downWorks('')">下载 {{ checkList.length }}
					个选项（{{ font_size / 1024 >= 1 ? (font_size/1024).toFixed(2) +"M" : font_size.toFixed(2) + "KB" }}）</button>
			</div>
		</div>
		<div class="maskimg screenContent" v-if="isimgurl" @click="getimgulr">
			<img :src="imgurl" alt="暂无图片">
		</div>
		<el-dialog title="确定全部下载" :visible.sync="centerDialogVisible5" width="738px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<div class="textcenter employipt">
							<span>
								<span style="width: auto;padding: 0 5px;" @click="downWorks('')">一共 {{ openurls.length }}
									个选项（{{ this.font_size / 1024 >= 1 ? (this.font_size/1024).toFixed(2) +"M" : this.font_size.toFixed(2) + "KB"   }}）</span>
							</span>
						</div>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class="defaultbtn" @click="centerDialogVisible5=false">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="downWorks('')">确定</button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import workData from "../../assets/workData.js"
	import commonTop from '@/components/commonTop.vue'
	import DataScreen from "@/assets/DataScreen.js"
	import downloadImg from "@/views/workManager/downloadImg.js"
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
				pagesize:50,
				total:0,
				currentpage:1,
				selected:0,
				file_type:"zip",
				setLoding:true,
				materialdata:"",
				filterFields:DataScreen.screen.materialBank.filterFields,
				openurls:[],
				isimgurl:"",
				videofid:"",
				audiofid:"",
				fid:"",
				centerDialogVisible5:false,
				oneload:{},
				adminuseraccess:[],
				buchu:0
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
					
					this.materialdata = da.data
					this.total = da.total;
					this.setLoding = false;
					//alert(da.data.length)
					this.setdivnum(da.data.length);
				}).catch(() => {
					this.setLoding = false;
				});
			
				/* this.setLoding(false); */
			},
			tabsChange(num,id) {
				this.tabsnum = num;
				this.detailbtn=true;
				this.workselect = false;
				this.file_type = id;
				this.getData(1,50);
				this.checkList=[];
				this.font_size = 0;
				this.openurls = [];
			},
			showselectwork() {
				this.detailbtn = !this.detailbtn;
				this.workselect = !this.workselect;
				this.font_size = 0;
				this.openurls = [];
				this.checkList=[];
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
				this.openurls = [];
				val.forEach((item,index) =>{
					//console.log(item.split(",")[1])
					this.font_size += Number(item.split(",")[2]);
					this.openurls.push({name:item.split(",")[3],id:item.split(",")[0]});
				});
				console.log(this.openurls);
			},
			downWorks(type) {
				if(type == "one"){
					this.openurls = [
						this.oneload
					]
					
				}
				// console.log(this.openurls)
				
				this.openurls.forEach(item =>{
					
					let src = item.id;
					fetch(item.id).then(res => res.blob()).then(blob => {
						const a = document.createElement('a');
						document.body.appendChild(a)
						a.style.display = 'none'
						// 使用获取到的blob对象创建的url
						const url = window.URL.createObjectURL(blob);
						a.href = url;
						// 指定下载的文件名
						a.download = item.name;
						a.click();
						document.body.removeChild(a)
						// 移除blob对象的url
						window.URL.revokeObjectURL(url);
					});
					
				})
			},
			getimgulr(url){
				this.imgurl = url;
				this.isimgurl = !this.isimgurl
			},
			showvideo(fid){
				if(this.videofid){
					document.getElementById(this.videofid).pause();
				}
				this.videofid = fid;
				document.getElementById(fid).play();
			},
			showaudio(fid){
				if(this.audiofid){
					document.getElementById(this.audiofid).pause();
				}
				this.audiofid = fid;
				document.getElementById(fid).play();
			},
			hover(fid,url,na){
				this.fid = fid;
				this.oneload = {
					name:na,
					id:url
				}
			},
			handleCheckAllChange() {
				//this.checkList = this.checkAll;
				this.font_size = 0;
				console.log(this.materialdata)
				if(this.tabsnum == 2){
					this.materialdata.forEach(item =>{
						this.openurls.push({name:item.file_name,id:item.file_url});
						this.font_size += Number(item.file_size);
					})
				}
				if(this.tabsnum == 3){
					this.materialdata.forEach(item =>{
						this.openurls.push({name:item.file_name,id:item.file_url});
						this.font_size += Number(item.file_size);
					})
				}
				if(this.tabsnum == 0){
					this.materialdata.forEach(item =>{
						this.openurls.push({name:item.file_name,id:item.file_url});
						this.font_size += Number(item.file_size);
					})
				}
				if(this.tabsnum == 1){
					this.materialdata.forEach(item =>{
						this.openurls.push({name:item.file_name,id:item.file_url});
						this.font_size += Number(item.file_size);
					})
				}
				this.centerDialogVisible5 = !this.centerDialogVisible5
			},
			setdivnum(s){
				
				let hangmun = parseInt(this.$refs.bgwidth.offsetWidth / 239);
				let gongnum = parseInt(s);
				let yunum = gongnum%hangmun;
				if( gongnum >= hangmun ){
					this.buchu = parseInt(hangmun - yunum);
				} else {
					this.buchu = parseInt(hangmun - gongnum);
				}
				
				
				console.log(hangmun,gongnum,yunum,this.buchu)
				
			}
		},
		created() {
			this.getcommonrightbtn();
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
		},
		mounted() {
			this.getData(1,50);
			let _this = this
			window.onload=function(){
				
			}
			
		},
		watch:{
			"$route":function(){
				this.getcommonrightbtn();
				this.getData(1,50);
			}
		}
	}
</script>

<style>
	.materiallist .el-checkbox__label {
		display: none;
	}
	
	.commontop > div {
		margin-left: 0;
	}
	
	.work .el-button--primary{
		background: #FF5121;
		border-color: #FF5121;
	}
	
	.sel-pagin ul{
		padding: 0 !important;
	}
	
	.sucia .ctcontent{
		margin-bottom:40px;
	}
	
	.sucia .ta{
		height: auto;
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
		width: 1000x;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between !important;
	}

	.materiallist li {
		margin: 0 0 17px 0;
	}
	
	.materiallist ::after{ 
		flex: auto;
		content: "";
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
