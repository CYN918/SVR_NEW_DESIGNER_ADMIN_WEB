<template>
	<div class="wh">
		<div class="wh">
			<common-top :commonTopData="commonTopData"></common-top>
			<div class="calc205">
				<common-table :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
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
					"pageName": "embodyRecord",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					"commonrightbtn": [{
						name: "导出数据",
						id: "right3",
						accessid: "200369"
					}],
					"commonbottombtn":[]
					
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					pageName:"embodyRecord",
					list: DataScreen.screenShow.embodyRecord.bts,
					ischeck:false
				},
				tableData: [],
				tableAction: DataScreen.screenShow.embodyRecord.action,
				detailData: "",
				IsDetail: false,
				filterFields:DataScreen.screen.embodyRecord.filterFields
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

				this.api.applyList(data).then((da) => {
					//console.log(da.data)
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
			export(){
				this.$confirm('确认导出', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					this.setexport({pageCurrent:1,pageSize:50},1);
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			setexport(pg,is_export){
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
					is_export:is_export
				}
				//获取筛选的条件
				//console.log(JSON.parse(this.$route.query.urlDate))
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.is_export = is_export;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
				let form = document.createElement("form");
				for(let key in data){
					let dom =document.createElement("input");
					dom.setAttribute("name",key);
					dom.setAttribute("value",data[key]);
					form.appendChild(dom);
					console.log(key,data[key]);
				};
				
				form.setAttribute("style", "display:none");
				form.setAttribute("target", "");
				form.setAttribute("method", "post");
				form.setAttribute("action", "http://dev-api-ndesigner-admin.idatachain.cn/admin/income/applyList")
				if(window.location.host=='shiquaner-admin.zookingsoft.com'){
				   form.setAttribute("action", "http://shiquaner-admin-api.zookingsoft.com/admin/income/applyList")
				}
				document.body.appendChild(form);
				form.submit();
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
					this.$router.push({path:'/otherInformation/embodyRecord',query:{urlDate:JSON.stringify(urldata)}});
					this.getcommonrightbtn();
					this.getData({pageCurrent:1,pageSize:50});
				}
			}
		},
		created() {},
		mounted() {
			//console.log(this.tableConfig)
			this.getData({pageCurrent:1,pageSize:50});
			this.screenreach();
			this.getcommonrightbtn();
		}
	}
</script>
<style lang="scss" scoped>
</style>
