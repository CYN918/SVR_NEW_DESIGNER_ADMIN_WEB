<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<span class="fleft worktabs">
				查看作品
			</span>
			<div class="textcenter">
				<span v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
				 @click="tabsChange(index,item.name)">
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
				<li class="margint13 ofh" v-for="(item,index) in baseInfo" :key="index" :type="item.type">
					<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ work_info[item.id] }}</span>
					<span v-if="!item.type">{{ work_info[item.id] }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="work_info[item.id]" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="work_info[item.id]" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="work_info[item.id]" alt="">
					<span v-else-if="item.type == 'imgbanner'"> {{ work_info[item.id] }} </span>
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="work_info[item.id]" alt="">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ work_info[item.id] }}</span>
					</router-link>
				</li>
			</ul>
			<div class="paddinglr40 ofh" v-if="tabsnum == 1">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<div v-if="material_list['附件']">
						<div  style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">附件</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_list['附件']">
								<div class="material relative">
									<el-checkbox class="material-checkbox" :label="item.file_size" v-if="workselect"></el-checkbox>
									<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_list['图片']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">图片</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_list['图片']">
								<div class="material relative" :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'contain'}">
									<el-checkbox class="material-checkbox" :label="item.file_size" v-if="workselect"></el-checkbox>
								</div>
								<div class="color66">
									<span class="fleft">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_list['视频']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">视频</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_list['视频']">
								<div class="material relative" :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'contain'}">
									<el-checkbox class="material-checkbox" :label="item.file_size" v-if="workselect"></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_zt.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_list['音频']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">音频</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_list['音频']">
								<div class="material relative" :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'contain'}">
									<el-checkbox class="material-checkbox" :label="item.file_size" v-if="workselect"></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_yp.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft">{{ item.file_name }}</span>
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
					<span v-if="item.type == 'text'">{{ 12 }}</span>
					<span v-if="!item.type">{{ 12 }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" src="../../assets/img/scsc_icon_yp.png" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" src="../../assets/img/scsc_icon_yp.png" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" src="../../assets/img/scsc_icon_yp.png" alt="">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" src="../../assets/img/scsc_icon_yp.png" alt="">
					<button :class="'workbtn defaultbtn0 defaultbtn'+1" v-else-if="item.type == 'btn'">
						{{12}}
					</button>
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ 11 }}</span>
					</router-link>
				</li>
			</ul>
			<div v-if="tabsnum == 2" class="marginlr30">
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
		</div>
		<div class="screenContent detailbtn" v-if="detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
		</div>
		<div class="screenContent detailbtn" v-if="!detailbtn">
			<button class="defaultbtn" @click="showselectwork()">取消选项</button>
			<button class="defaultbtn defaultbtnactive" style="width: auto;padding: 0 5px;">下载 {{ checkList.length }}
				个选项（{{ this.font_size / 1024 >= 1 ? (this.font_size/1024).toFixed(2) +"M" : this.font_size.toFixed(2) + "KB" }}）</button>
		</div>
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
					"附件": [
						{
							"file_name": "新建文件夹.zip",
							"url": "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/76502558070e6c7efff0f8d68849ad53.zip",
							"file_size": "127.13",
							"file_size_format": "127.13 KB"
						}
					],
					"图片": [
						{
							"file_name": "xxxxxxxxxf.png",
							"url": "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/a24169b8ef5577ac434b8a2d30e7567e.png",
							"file_size": "67.80",
							"file_size_format": "67.8 KB"
						},
						{
							"file_name": "203850b3-b314-4242-a01e-7611eefebb8a.jpg",
							"url": "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/d9e7113597464f01c75325f811644ab1.jpg",
							"file_size": "60.10",
							"file_size_format": "60.1 KB"
						},
						{
							"file_name": "企业微信截图_e91ed7a9-f58e-4746-b400-33bdff357a29.png",
							"url": "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/33033edd11524bb6e69856e46b1b0269.png",
							"file_size": "88.35",
							"file_size_format": "88.35 KB"
						},
						{
							"file_name": "企业微信截图_e91ed7a9-f58e-4746-b400-33bdff357a29.png",
							"url": "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/33033edd11524bb6e69856e46b1b0269.png",
							"file_size": "88.35",
							"file_size_format": "88.35 KB"
						}
					],
					"视频": [
						{
							"file_name": "首页_上传作品_demo.mp4",
							"url": "http://zk-web-object.oss-cn-qingdao.aliyuncs.com/48d6e3804288a4f177d9f6798141390f.mp4",
							"file_size": "32001.60",
							"file_size_format": "31.25 MB"
						}
					],
					"音频": [
						{
							"file_name": "song.ogg",
							"url": "http://zk-web-object.oss-cn-qingdao.aliyuncs.com/91f251012a3a2778bcb13741c54b411c.ogg",
							"file_size": "233.76",
							"file_size_format": "233.76 KB"
						}
					]
				},
				hire_info:{},
				font_size:0,
			}
		},
		methods: {
			getparent() {
				//alert(parseInt(this.$route.query.type))
				this.router.push({
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
			handleCheckAllChange(val) {
				this.checkList = this.checkAll;
				this.detailbtn = false;
				this.workselect = true;
			},
			getworkdetial(){
				this.api.workInfo({
					work_id:this.$route.query.id,
					access_token:localStorage.getItem("access_token")
				}).then(da => {
					console.log(da)
					this.work_info = da.work_info;
					//this.material_list = da.material_list;
					//this.hire_info = da.hire_info;
				}).catch(da =>{
					
				})
			},
			handleCheckedCitiesChange(val){
				//console.log(val
				this.font_size = 0;
				val.forEach((item,index) =>{
					this.font_size += Number(item)
				});
			},
			
		},
		created() {
			this.getworkdetial();
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
