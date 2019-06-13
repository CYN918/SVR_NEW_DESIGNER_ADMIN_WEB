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
				commonTopData: {
					"pageName": "activityEmploy",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					
					"commonrightbtn": [{
						name: "新建活动",
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
					list: DataScreen.screenShow.activityEmploy.bts,
				},
				tableData: [],
				tableAction: DataScreen.screenShow.activityEmploy.action,
				detailData: "",
				filterFields:DataScreen.screen.activityEmploy.filterFields,
				IsDetail:1,
				roles:{},
				menulist:'',
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
				this.tableConfig.currentpage = pg.pageCurrent;
				this.tableConfig.pagesize = pg.pageSize;
				this.setLoding(true);
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

				this.api.activitylist(data).then((da) => {
					console.log(da.data)
					if (!da) {
						this.$message('数据为空');
					}
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
					this.getData({pageCurrent:1,pageSize:10});
					
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
					this.$router.push({path:'/activityManager/activityEmploy',query:{urlDate:JSON.stringify(urldata)}});
				}
			},
			delect(val) {
				//this.centerDialogVisible = true;
				this.$confirm('确认删除该条发言内容', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					 this.api.activitydelete({
						activity_id: val.id,
						access_token: localStorage.getItem("access_token"),
					}).then(da => {
						this.getData({pageCurrent:1,pageSize:10});
					}) 
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			categoryList() {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 10000,
					status:1
				}
			
				this.api.categoryList(data).then((da) => {
					var child=[
						
					];
					console.log(da.data);
					da.data.forEach(item =>{
						child.push({
							name:item.category_name,
							id:item.id
						})
					})
					
					localStorage.setItem("child",JSON.stringify(child))
					console.log(localStorage.getItem("child"))
				}).catch(() => {
			
				});
			},
		},
		created() {
			this.screenreach();
			this.getcommonrightbtn();
			this.categoryList();
		},
		mounted() {
			//console.log(DataScreen.screenShow.activityClass.bts)
			this.getData({pageCurrent:1,pageSize:10});
		},
		watch:{
			"$route":function(){
				this.screenreach();
				this.getcommonrightbtn();
				this.getData({pageCurrent:1,pageSize:10});
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
