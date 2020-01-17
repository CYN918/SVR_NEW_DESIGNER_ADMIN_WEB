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
					"pageName": "publishWork",
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
							accessid:"12",
						},
						{
							name:"作品入围",
							linkTo:"/review/finalistsWork",
							accessid:"13",
						},
						{
							name:"作品录用",
							linkTo:"/review/employWork",
							accessid:"14",
						},
						{
							name:"项目验收",
							linkTo:"/review/projectreview",
							accessid:"14",
						},
						{
							name:"供稿人申请",
							linkTo:"/review/applyPerson",
							accessid:"15",
						}
					],
					'tabnums':0,
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					list: DataScreen.screenShow.publishWork.bts
				},
				tableData: [],
				tableAction: DataScreen.screenShow.publishWork.action,
				detailData: "",
				filterFields:DataScreen.screen.publishWork.filterFields,
				IsDetail:1,
				roles:{},
				top_banner: [],
			}
		},
		watch: {},
		computed: {},
		methods: {
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg) {
				this.setLoding(true);
				this.tableConfig.currentpage = pg.pageCurrent;
				this.tableConfig.pagesize = pg.pageSize
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
					type:1
				}
				//获取筛选的条件
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					sreenData.type = 1
					data = sreenData;
				}
				/* this.axios.post(localStorage.getItem("adminURL")+"/admin/Review/list?type=1", data).then(function (response) {
					console.log(response);
				}).catch(function (error) {
					console.log(error);
				}); */
				
				this.api.reviewList1(data).then((da) => {
					//console.log(da.data)
					
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					this.setLoding(false);
				}).catch(() => {
					this.setLoding(false);
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
					//console.log(da);
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
					})
				}
				
			},
			resetSave(tag){
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					this.$router.push({path:'/review/publishWork',query:{urlDate:JSON.stringify(urldata)}});
					
				}
			},
			delect(id){
				this.api.deleteRole({
					access_token:localStorage.getItem("access_token"),
					id:id
				}).then(da => {
					//console.log(da);
					this.$message({
						type:"waring",
						message:da
					})
					this.getData({pageCurrent:1,pageSize:50});
				}).catch()
			},
			
		},
		created() {
			this.screenreach();
			this.getcommonrightbtn();
			///console.log(this.top_banner)
		},
		mounted() {
			this.getData({pageCurrent:1,pageSize:50});
			if(localStorage.getItem("access")){
				this.top_banner = JSON.parse(localStorage.getItem("access")).top_banner
			}
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
<style>
	
</style>
