<template>
<div>
	<common-top :commonTopData="commonTopData"></common-top>
	<div class="wh Detail">
		<div class="detailContent1 ofh">
			<ul>
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
			<div class="marginlr30">
				<ul class="margint13">
					<li class="margint13 ofh w" style="border-top: 1px solid #f0f2f5;">
						<span class="fleft fontcolorg">选择 “下架作品” 需通知到举报用户</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<div>
							<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;line-height: 40px;">通知举报者</span>
							<button class="defaultbtn" style="margin: 0;" @click="dialogTable">选择通知用户</button>
						</div>
						<div>
							<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;height: 40px;"></span>
							<span class="fleft fontcolorg" style="margin-top: 10px;">已选择的通知用户数：{{ this.selectData.length }}</span>
						</div>
					</li>
					<li class="margint13 ofh w" style="border-top: 1px solid #f0f2f5;">
						<span class="fleft fontcolorg">下架原因说明</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<div>
							<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">下架原因详情</span>
							<div class="fleft defaultbtnworkbg">
								<div>
									<textarea name="" id="" cols="60" rows="10" v-model="textarea" Maxlength="100" class="defaultbtnwork"></textarea>
								</div>
								<span class="fright fontcolorg">{{ textarea.length }}/100</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<el-dialog title="请选择 “作品下架” 需通知到的举报者" :visible.sync="dialogTableVisible" custom-class="sel-dialog">
			<div>
				<div class="margin40 borderb" style="position: relative;padding-bottom: 22px;">
					<div class="ofh">
						<div class="fleft">
							<el-button class="btnorgle" style="margin-left:20px;" v-for="(item,index) in commonTopData.commonleftbtn" :key="item.id" @click="screen(item.id)">{{ item.name }}</el-button>
						</div>
					</div>
				</div>
				<!-- <div class="margin40" style="height: 60px;">
					<div class="tagbts">
						<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
						 :disable-transitions="false" @close="resetSave(item.id)">
							{{item.btnName + "：" + item.val}}
						</el-tag>
					</div>
				</div> -->
				<div class="calc205" style="height:450px;overflow-y:auto;">
					<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
					 ref="Tabledd" style="height:450px;"></common-table>
				</div>
				<div class="w textcenter">
					<button class="defaultbtn defaultbtnactive" @click="dialogTableVisible=false">确定({{ this.selectData.length }})</button>
				</div>
			</div>
			
		</el-dialog>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" @click="shelves()">下架</button>
		</div>
		<div class="workfixed" v-show="IsScreen == 'No'">
			<common-screen :pageName="pageName"></common-screen>
		</div>
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
				pageName: "worksShelves",
				baseInfo: workData.worksShelves,
				tableAction: DataScreen.screenShow.worksShelves.action,
				filterFields: DataScreen.screen.worksShelves.filterFields,
				dialogTableVisible: false,
				textarea: '',
				commonTopData: {
					"pageName": "worksShelves",
					"commonleftbtn": [{
							name: "筛选",
							id: "left1",
							url: ""
						}],
					"commonrightbtn": [],
					"commonbottombtn": [],
				},
				screenConfig: [],
				tableConfig: {
					"pageName": "worksShelves",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: DataScreen.screenShow.worksShelves.bts,
					ischeck: true,
					loading:true

				},
				tableData: [],
				IsScreen: "Off",
				work_info: {},
				selectData:[],
				workid:""
			}
		},
		methods: {
			getparent() {
				this.$router.push({
					path:"/workManager/workInfo",
					query:{
						tabsnum:0
					}
				})

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
					work_id: this.workid,
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
			shelves(){
				
				this.$confirm('确认下架作品?', '', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true,
					customClass:"shelves"
				}).then(() => {
					this.api.offShelve({
						access_token:localStorage.getItem("access_token"),
						work_ids:this.workid,
						reason:this.textarea,
						notice_ids:this.getnoticeids(),
					}).then(da =>{
						console.log(da);
						if(da == "下架成功"){
							this.$router.go(-1);
						}
					})
					//alert(22);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
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
					accused_open_id:this.$route.query.open_id,
				}
				//获取筛选的条件
				// console.log(JSON.parse(this.$route.query.urlDate))
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.open_id = this.open_id;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
			
				this.api.reportlist(data).then((da) => {
					
					this.tableData = da.data;
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
			contributor() {
				//console.log(workids)
				//console.log(this.selectData);
				var work_ids = this.getworkids();
				this.centerDialogVisible = false;
				this.centerDialogVisible1 = false;
				this.api.getLevelCount({
					access_token:localStorage.getItem("access_token"),
					recommend_level:this.radioS,
				}).then(da => {
					console.log(da)
					this.$confirm('有'+ da +'个作品已经是平台推荐作品</br>是否统一将推荐评级修改为'+this.radioS, '确认修改', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						dangerouslyUseHTMLString: true,
						type: '',
						customClass:"",
						center: true
					}).then(() => {
						//console.log({work_ids:workids,level:this.radioS})
						this.api.setRecommendLevelwork({
							work_ids: work_ids,
							recommend_level: this.radioS,
							access_token: localStorage.getItem("access_token"),
						}).then(da => {
							
							this.$message({
								type: 'success',
								message: '修改成功'
							});
							
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已经取消'
						});
					});
				}).catch(da => {
					
				})
				
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
					this.$router.push({path:'/workManager/workInfo/worksShelves',query:{urlDate:JSON.stringify(urldata)}});
				}
			},
			dialogTable(){
				this.dialogTableVisible = !this.dialogTableVisible;
				/* if(this.dialogTableVisible == true){
					this.setLoding(false);
				} */
				//this.$refs.Tabledd.loading = false;	
			}
			

		},
		created() {
			
			this.getData({
				pageCurrent: 1,
				pageSize: 50
			});
			this.screenreach();
			this.getcommonrightbtn();
			
			if(this.$route.query.id){
				this.workid = this.$route.query.id;
				this.getworkdetial();
				localStorage.setItem("worksShelvesid",this.$route.query.id)
			} else {
				if(localStorage.getItem("worksShelvesid")){
					this.getworkdetial();
					this.workid = localStorage.getItem("worksShelvesid");
				}
			}
		},
		mounted() {

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

<style scoped>
.calc205 >>> .el-table__empty-block{
	height: 250px;
}
	
	.el-select-dropdown,.el-picker-panel{
		z-index:2014 !important;
	}
	
	.materiallist .el-checkbox__label {
		display: none;
	}

	.work .el-button--primary {
		background: #FF5121;
		border-color: #FF5121;
	}


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
		z-index: 20999;
		display: fixed;
		background: rgba(0,0,0,0.5);
	}
	
	.sel-dialog  {
		width: 1100px;
	}
	
	.shelves .el-message-box__content{
		border-top:0 !important;
	}
</style>

<style scoped>
	.Detail {
		background: white;
		max-height: 840px;
		overflow-y: scroll;
	}

	.Dialogkey {
		margin: 0 33px 26px 66px;
		width: 84px;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
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
