<template>
	<div class="wh">
		<div class="wh" v-if="IsDetail == 1">
			<common-top :commonTopData="commonTopData"></common-top>
			<div class="calc205">
				<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
				 ref="Tabledd"></common-table>
			</div>
		</div>
		<div class="wh baseInfoDetail" v-if="IsDetail == 2">
			<create-roles :detailData="detailData" :roles="roles"></create-roles>
		</div>
		<div class="wh baseInfoDetail" v-if="IsDetail == 3">
			<router-view/>
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
						url: ""
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
				roleManager: false,
				filterFields:DataScreen.screen.roleManager.filterFields,
				IsDetail:1,
				roles:{}
			}
		},
		watch: {},
		computed: {},
		methods: {
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: 2,
					contribute_type: 2,
					page: pg.pageCurrent,
					limit: pg.pageSize
				}
				//获取筛选的条件
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.contribute_type = 2;
					sreenData.access_token = 2;
					data = sreenData;
				}

				this.api.getRoleList(data).then((da) => {
					//console.log(da.data)
					if (!da) {
						this.$message('数据为空');
					}
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
				}).catch(() => {

				});
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
					
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
							console.log(this.commonTopData.commonbottombtn);
						}
					})
				}
				
			},
			resetSave(tag){
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					//console.log(tag);
					this.$router.push({path:'/userCompanyInfo',query:{urlDate:JSON.stringify(urldata)}});
					this.getcommonrightbtn();
					this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
				}
			}
		},
		created() {},
		mounted() {
			//console.log(this.tableConfig)
			this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
			this.screenreach();
			this.getcommonrightbtn();
		}
	}
</script>
<style lang="scss" scoped>
</style>
