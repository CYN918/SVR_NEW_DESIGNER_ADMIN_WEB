<template>
	<div class="wh">
		<div class="wh">
			<common-top :commonTopData="commonTopData"></common-top>
			<div class="calc205">
				<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
				 ref="Tabledd"></common-table>
			</div>
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
			commonTable,
		},
		props: {},
		data() {
			return {
				centerDialogVisible: false,
				bts: DataScreen.screenShow.activityworks.bts,
				defaultbts: DataScreen.screenShow.activityworks.defaults,
				tableAction: DataScreen.screenShow.activityworks.action,
				filterFields: DataScreen.screen.activityworks.filterFields,
				screenShowDataChange: "",
				IsDetail: false,
				commonTopData: {
					"pageName": "activityworks",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					},
					{
							name: '展示字筛选',
							id: "right2",
							accessid: '200335'
						}, ],
					"commonrightbtn": [
						
					],
					"commonbottombtn": [],
				},
				screenConfig: [],
				tableConfig: {
					"pageName": "activityworks",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: [],

				},
				tableData: [],
				detailData: {},
				selectData: [],
				selectOne: {},
			}
		},
		methods: {
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize
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

				this.api.activitywork(data).then((da) => {
					
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					this.setLoding(false);
				}).catch(() => {
					this.setLoding(false);
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
				this.tableConfig.list = [];
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
					this.getData({pageCurrent:1,pageSize:50});
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
				//this.centerDialogVisible = true;
				this.$confirm('确认删除该条发言内容', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					this.api.deleteComment({
						access_token:localStorage.getItem("access_token"),
						type: this.selectOne.type,
						comment_id: this.selectOne.comment_id,
					}).then(da => {
						this.$message({
							type: 'info',
							message: da
						});
						this.getData({pageCurrent:1,pageSize:50});
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
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
			resetSave(tag) {
				if (this.$route.query.urlDate) {
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					//console.log(tag);
					this.$router.push({ path: '/activityManager/activityworks', query: {urlDate: JSON.stringify(urldata)}});
				}
			},
			
		},
		created() {
			this.getScreenShowData();
			this.screenreach();
			this.getcommonrightbtn();
		},
		mounted() {
			//console.log(this.tableConfig)
			this.getData({pageCurrent:1,pageSize:50});
			
		},
		watch:{
			"$route":function(){
				this.getScreenShowData();
				this.screenreach();
				this.getcommonrightbtn();
				this.getData({pageCurrent:1,pageSize:50});
			}
		}
	}
</script>
<style lang="scss">
	.Dialogkey {
		margin: 0 33px 26px 66px;
		width: 57px;
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

	.el-radio__input.is-checked+.el-radio__label {
		color: #FF5121;
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

	/* .el-button--small, .el-button--small.is-round{
		width: 100px;
		height: 40px;
	} */

	/* .el-button:focus, .el-button:hover{
		border-color: #FF5121;
		color: #FF5121;
	} */
	
	.centerline{
		display: inline-block;
		width: 114px;
		height: 4px;
		border-top: 1px solid #999999;
		//background: #FF5121;
		margin: 0 12px;
		margin-top: -5px;
	}
	
	.employment {
		font-size: 16px;
		color:#999999;
	}
	
	.number {
		display: inline-block;
		width: 27px;
		height: 27px;
		line-height: 27px;
		border: 1px solid #999999; 
		border-radius: 50%;
		margin-right: 10px;
	}
	
	.width406{
		width: 406px;
	}
	
	.numberactive{
		background: #33B3FF;
		color: #FFFFFF;
		border-color: #33B3FF;
	}
	
	.fontactive{
		color: black;
	}
	
	.centerlineactive {
		border-color:#FF5121; 
	}
</style>
