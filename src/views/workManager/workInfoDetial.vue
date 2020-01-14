<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<span class="fleft worktabs">
				查看作品
			</span>
			<div class="textcenter">
				<span v-for="(item,index) in tabData" v-if="index < 2" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
				 @click="tabsChange(index,item.name)">
					<!-- <el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge> -->
					{{ item.name }}
				</span>
				<span v-else-if="index == 2 && work_info.hire_id == 0" tag="span" style="color:rgba(153,153,153,1);">{{ item.name }}</span>
				<span v-else-if="index == 2 && work_info.hire_id != 0" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
				 @click="tabsChange(index,item.name)">{{ item.name }}</span>
			</div>  <!-- && (adminuseraccess.indexOf('200469') > -1-->
			<div class="materialdownload" v-if="tabsnum == 1 && (adminuseraccess.indexOf('200469') > -1)">
				<button class="defaultbtn" style="width: 87px;height: 32px;" @click="showselectwork()">选择下载</button>
				<button class="defaultbtn" style="width: 87px;height: 32px;" @click="handleCheckAllChange()">全部下载</button>
			</div>
		</div>
		<div class="detailContent ofh">
			<ul v-if="tabsnum == 0">
				<li class="margint13 ofh" v-for="(item,index) in baseInfo" :key="index" :type="item.type">
					<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ work_info[item.id] }}</span>
					<span v-if="item.type == 'recommend'">{{ work_info[item.id] ? work_info[item.id] : "不推荐" }}</span>
					<span v-if="!item.type">{{ work_info[item.id] }}</span>
					<span v-else-if="item.type == 'isnum'"> {{ work_info[item.id] > 0 ? item.child[0]:item.child[1] }} </span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="work_info[item.id]" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="work_info[item.id]" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="work_info[item.id]" alt="">
					<span v-else-if="item.type == 'imgbanner'"> {{ work_info[item.id] }} </span>
					<span v-else-if="item.type == 'keyvalue'">{{item.child[work_info[item.id]]}}</span>
					<span v-else-if="item.type == 'urlopen'"><span class="routerLink pointer" @click="openwindow(item.id + work_info.work_id)">{{ item.id + work_info.work_id }}</span></span>
					<span v-else-if="item.type == 'status'"> 
						<span v-if="work_info['is_del'] == '0'">
							{{ item.child.status[work_info['status']] }} 
						</span>
						<span v-else-if="work_info['is_del'] != '0'">
							{{ item.child.is_del[work_info['is_del']] }}
						</span>
					</span>
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="work_info[item.id]" alt="">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ work_info[item.id] }}</span>
					</router-link>
				</li>
			</ul>
			<div class="paddinglr40 ofh" v-if="tabsnum == 1">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<div v-if="material_list['附件']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">附件</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_list['附件']" :key = "item.fid">
								<div class="material relative" @mouseover="hover(item.fid,item.url,item.file_name)">
									<el-checkbox class="material-checkbox" :label=" item.url +','+item.fid+','+item.file_size+','+item.file_name" v-if="workselect" @click.stop.native></el-checkbox>
									<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="没有图片">
									<div class="hoverload" v-if="item.fid == fid && !workselect && (adminuseraccess.indexOf('200469') > -1)" @click="downWorks('one')" @click.stop></div>
								</div>
								<div class="color66">
									<span class="fleft" @click="gotodetail('附件',item.fid,0)">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
							
						</ul>
					</div>
					<div v-if="material_list['图片']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">图片</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_list['图片']" :key="item.fid+index+index+index">
								<div class="material relative" @mouseover="hover(item.fid,item.url,item.file_name)" :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'contain'}" @click="getimgulr(item.url)" @click.stop>
									<el-checkbox class="material-checkbox" :label=" item.url +','+item.fid+','+item.file_size+','+item.file_name" v-if="workselect" @click.stop.native></el-checkbox>
									<div class="hoverload" v-if="item.fid == fid && !workselect && (adminuseraccess.indexOf('200469') > -1)" @click="downWorks('one')" @click.stop></div>
								</div>
								<div class="color66">
									<span class="fleft" @click="gotodetail('图片',item.fid,1)">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_list['视频']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">视频</div>
						<ul class="materiallist">
							<li class="relative" v-for="(item,index) in material_list['视频']" :key = "item.fid+index+index">
								<div class="material relative" @mouseover="hover(item.fid,item.url,item.file_name)" :style="{backgroundImage: 'url(' + item.cover_img + ')', backgroundSize:'contain'}" @click="showvideo(item.fid)" @click.stop>
									<el-checkbox class="material-checkbox" :label=" item.url +','+item.fid+','+item.file_size+','+item.file_name" v-if="workselect" @click.stop.native></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_zt.png" alt="没有图片">
									<div class="hoverload" v-if="item.fid == fid && !workselect && (adminuseraccess.indexOf('200469') > -1)" @click="downWorks('one')" @click.stop></div>
								</div>
								<video v-show="videofid == item.fid" :id="item.fid" :src="item.url" class="material" controls="controls" style="position: absolute;top:0;left: 0;border-radius: 5px;"></video>
								<div class="color66">
									<span class="fleft" @click="gotodetail('视频',item.fid,2)">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_list['音频']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">音频</div>
						<ul class="materiallist">
							<li class="relative" v-for="(item,index) in material_list['音频']" :key = "item.fid+index">
								<div class="material relative" @mouseover="hover(item.fid,item.url,item.file_name)" :style="{backgroundImage: 'url(' + item.cover_img + ')', backgroundSize:'100% 100%'}" @click="showaudio(item.fid)" @click.stop>
									<el-checkbox class="material-checkbox" :label=" item.url +','+item.fid+','+item.file_size+','+item.file_name" v-if="workselect" @click.stop.native></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_yp.png" alt="没有图片">
									<div class="hoverload" v-if="item.fid == fid && !workselect && (adminuseraccess.indexOf('200469') > -1)" @click="downWorks('one')" @click.stop></div>
								</div>
								<audio v-show="audiofid == item.fid" :id="item.fid" :src="item.url" class="material" controls style="position: absolute;top:0;left: 0;border-radius: 5px;"></audio>
								<div class="color66">
									<span class="fleft" @click="gotodetail('音频',item.fid,3)">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
						</ul>
					</div>
					
				</el-checkbox-group>
			</div>
			<ul v-if="tabsnum == 2">
				<li class="margint13 ofh" v-for="(item,index) in employInfo" :key="index" :type="item.type">
					<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ hire_info[item.id] }}</span>
					<span v-if="!item.type">{{ hire_info[item.id] }}</span>
					<button :class="'workbtn defaultbtn0 defaultbtn'+1" v-else-if="item.type == 'btn'">
						{{  item.child[hire_info[item.id]]}}
					</button>
					<span v-else-if="item.type == 'keyvalue'">{{item.child[hire_info[item.id]]}}</span>
					<span v-else-if="item.type == 'isnum'"> {{ work_info[item.id] > 0 ? item.child[0]:item.child[1] }} </span>
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ hire_info[item.id] }}</span>
					</router-link>
				</li>
			</ul>
			<div v-if="false" class="marginlr30">
				<ul class="margint13">
					<li class="margint13 ofh w" style="border-top: 1px solid #f0f2f5;">
						<span class="fleft fontcolorg">渠道1</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">分成渠道ID</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">广告位ID</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">投放渠道</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">分成指标</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">录用价格</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">投放效果数据</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">结算收益</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">当前状态</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">最近更新</span>
						<span>{{ "--" }}</span>
					</li>
				</ul>
			</div>
			<div class="screenContent detailbtn" v-if="detailbtn">
				<button class="defaultbtn" @click="getparent()">返回</button>
			</div>
			<div class="screenContent detailbtn" v-if="!detailbtn">
				<button class="defaultbtn" @click="showselectwork()">取消选项</button>
				<button class="defaultbtn defaultbtnactive" style="width: auto;padding: 0 5px;" @click="downWorks('')">下载 {{ checkList.length }}
					个选项（{{ this.font_size / 1024 >= 1 ? (this.font_size/1024).toFixed(2) +"M" : this.font_size.toFixed(2) + "KB" }}）</button>
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
	export default {
		data() {
			return {
				tabData: [{
						name: "基本信息"
					},
					{
						name: "素材预览"
					},
					{
						name: "录用信息"
					}],
				tabsnum: 0,
				baseInfo:workData.workInfo,
				employInfo:workData.employInfo,
				detailbtn:true,
				workselect:false,
				checkList: [],
				checkAll: ["1", "2", "3", "4", "5", "6"],
				work_info:{},
				material_list:{
				},
				hire_info:{},
				font_size:0,
				imgurl:"",
				isimgurl:false,
				openurls:[],
				videofid:"",
				audiofid:"",
				fid:"",
				centerDialogVisible5:false,
				oneload:{},
				adminuseraccess:[]
			}
		},
		methods: {
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
			getparent() {
				//alert(parseInt(this.$route.query.type))
				this.$router.go(-1)
				
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			handleCheckAllChange() {
				//this.checkList = this.checkAll;
				this.font_size = 0;
				//console.log(this.material_list)
				if(this.material_list['视频']){
					this.material_list['视频'].forEach(item =>{
						this.openurls.push({name:item.file_name,id:item.url});
						this.font_size += Number(item.file_size);
					})
				}
				if(this.material_list['音频']){
					this.material_list['音频'].forEach(item =>{
						this.openurls.push({name:item.file_name,id:item.url});
						this.font_size += Number(item.file_size);
					})
				}
				if(this.material_list['附件']){
					this.material_list['附件'].forEach(item =>{
						this.openurls.push({name:item.file_name,id:item.url});
						this.font_size += Number(item.file_size);
					})
				}
				if(this.material_list['图片']){
					this.material_list['图片'].forEach(item =>{
						this.openurls.push({name:item.file_name,id:item.url});
						this.font_size += Number(item.file_size);
					})
				}
				this.centerDialogVisible5 = !this.centerDialogVisible5
			},
			downWorks(type) {
				if(type == "one"){
					this.openurls = [
						this.oneload
					]
				}
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
				
				this.centerDialogVisible5 = false;
			},
			tabsChange(num) {
				this.tabsnum = num;
				//alert(this.tabsnum)
				if (this.tabsnum != 1) {
					this.detailbtn = true;
					this.workselect = false;
				}
			},
			showselectwork() {
				this.detailbtn = !this.detailbtn;
				this.workselect = !this.workselect;
			},
			getworkdetial(){
				this.api.workInfo({
					work_id:this.$route.query.id,
					access_token:localStorage.getItem("access_token")
				}).then(da => {
					//console.log(da)
					this.work_info = da.work_info;
					this.material_list = da.material_list;
					this.hire_info = da.hire_info;
				}).catch(da =>{
					
				})
			},
			openwindow(url){
				window.open(url)
			},
			gotodetail(name,fid,num){
				this.router.push({
					path:"/workManager/materialBank/materialBankdetail",
					query:{tabsnum:num,name:name,fid:fid}
				})
			},
			hover(fid,url,na){
				this.fid = fid;
				this.oneload = {
					name:na,
					id:url
				}
			},
			handleCheckedCitiesChange(val){
				console.log(val)
				this.font_size = 0;
				this.openurls = [];
				val.forEach((item,index) =>{
					console.log(item.split(",")[1])
					this.font_size += Number(item.split(",")[2]);
					this.openurls.push({name:item.split(",")[3],id:item.split(",")[0]});
				});
				//console.log(this.openurls);
			},
		},
		created() {
			this.getworkdetial();
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
		},
		mounted() {
			
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
		text-align: left;
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
