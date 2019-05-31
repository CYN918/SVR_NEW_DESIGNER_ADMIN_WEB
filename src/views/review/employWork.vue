<template>
	<div class="wh">
		<div class="wh">
			<common-top :commonTopData="commonTopData" ></common-top>
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
					"pageName": "employWork",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					"commonbottombtn":[],
					"tabData":[
						{
							name:"作品发布",
							linkTo:"/review/publishWork",
							publishWorks:"",
						},
						{
							name:"作品入围",
							linkTo:"/review/finalistsWork",
							publishWorks:"",
						},
						{
							name:"作品录用",
							linkTo:"/review/employWork",
							publishWorks:"",
						},
						{
							name:"供稿人申请",
							linkTo:"/review/applyPerson",
							publishWorks:"",
						}
					],
					'tabnums':2,
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					list: DataScreen.screenShow.employWork.bts
				},
				tableData: [],
				tableAction: DataScreen.screenShow.employWork.action,
				detailData: "",
				filterFields:DataScreen.screen.employWork.filterFields,
				IsDetail:1,
				roles:{},
			}
		},
		watch: {},
		computed: {},
		methods: {
			getData(pg) {
				this.tableConfig.currentpage = pg.pageCurrent;
				this.tableConfig.pagesize = pg.pageSize
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
					type:3
				}
				//获取筛选的条件
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					sreenData.type = 3
					data = sreenData;
				}

				this.api.reviewList(data).then((da) => {
					console.log(da.data)
					if (!da) {
						this.$message('数据为空');
					}
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					this.$refs.Tabledd.setLoding(false);	
				}).catch(() => {
					this.$refs.Tabledd.setLoding(false);	
				});
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
					
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
					this.$router.push({path:'/review/employWork',query:{urlDate:JSON.stringify(urldata)}});
					this.getcommonrightbtn();
					this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
				}
			},
			delect(id){
				this.api.deleteRole({
					access_token:localStorage.getItem("access_token"),
					id:id
				}).then(da => {
					console.log(da);
					this.$message({
						type:"waring",
						message:da
					})
					this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
				}).catch()
			},
			
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
