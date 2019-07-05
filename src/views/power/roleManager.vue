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
	import createRoles from '@/views/power/createRoles.vue'

	export default {
		components: {
			commonTop,
			commonTable,
			createRoles,
		},
		props: {},
		data() {
			return {
				commonTopData: {
					"pageName": "roleManager",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					
					"commonrightbtn": [{
						name: "添加角色",
						id: "right1",
						accessid: "200057"
					}],
					"commonbottombtn":[],
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					list: DataScreen.screenShow.roleManager.bts,

				},
				tableData: [],
				tableAction: DataScreen.screenShow.roleManager.action,
				detailData: "",
				filterFields:DataScreen.screen.roleManager.filterFields,
				IsDetail:1,
				roles:{},
				menulist:'',
			}
		},
		watch: {},
		computed: {},
		methods: {
			getDataAll(pg) {
				this.api.getRoleList({
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 100
				}).then((da) => {
					//console.log(da);
					/* DataScreen.screen.roleManager.filterFields.forEach(item =>{
						if(item.id == "role_name"){
							item.child = da.data;
						}
					}) */
				}).catch(() => {
					
				});
			},
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg) {
				this.tableConfig.currentpage = pg.pageCurrent;
				this.tableConfig.pagesize = pg.pageSize
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize
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

				this.api.getRoleList(data).then((da) => {
					//console.log(da.data)
					
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					this.setLoding(false)
				}).catch(() => {
					this.setLoding(false)
				});
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:1,pageSize:50});
					
				})
			},
			linkDetail(id) {
				//alert(id);
				this.IsDetail = 3;
				this.api.getContributorInfo({
					open_id: id,
					contribute_type:2
				}).then(da => {
					this.detailData = da;
					console.log(da);
				}).catch(() => {})
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
					this.$router.push({path:'/power/roleManager',query:{urlDate:JSON.stringify(urldata)}});
				}
			},
			delect(id){
				//this.centerDialogVisible = true;
				this.$confirm('确认删除该角色？', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					this.api.deleteRole({
						access_token:localStorage.getItem("access_token"),
						id:id
					}).then(da => {
						this.getData({pageCurrent:1,pageSize:50});
					}).catch()
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			getadminuseraccess(){
				this.api.adminuseraccess({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					console.log(da);
					localStorage.setItem("adminuseraccess",JSON.stringify(da));
				})
			},
			getaccess() {
				this.api.access({
					access_token:localStorage.getItem("access_token")
				}).then(da => {
					if(da.result == 0){
						//alert(11)
						console.log(da)
						localStorage.setItem("access",JSON.stringify(da.data));
						//this.router.push({path:"/userManager/userBaseInfo"});
					}
				}).catch(da => {})
			}
		},
		created() {
			this.getcommonrightbtn();
			this.getDataAll();
			this.getadminuseraccess();
			this.getaccess();
		},
		mounted() {
			//console.log(this.tableConfig)
			this.getData({pageCurrent:1,pageSize:50});
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
<style lang="scss" scoped>
</style>
