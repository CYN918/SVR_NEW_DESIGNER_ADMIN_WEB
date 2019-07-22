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
					"pageName": "blackList",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					
					"commonrightbtn": [{
						name: "添加用户",
						id: "right1",
						accessid: "200471"
					}],
					"commonbottombtn":[],
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					list: [
						{lable:"禁用ID",prop:"id"},
						{lable:"用户ID",prop:"open_id"},
						{lable:"用户昵称",prop:"username"},
						{prop:'avatar',lable:'用户头像',type:"imgtou"},
						{lable:"禁用权限",prop:"access_msg"},
						{lable:"禁用到期时间",prop:"end_time"},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"recommendedActivitiesstatus",child:{"1":"生效","0":"失效"}}
					],
				},
				tableData: [],
				tableAction: {
					morebtns:{
						name:"删除",
						Ishow:false,
						page:"blackList",
						accessid:"200075"
					},
					links:{
						name:"编辑",
						Ishow:true,
						accessid:"200472"
					},
				},
				detailData: "",
				filterFields:[
					{name:"禁用ID",id:"id"},
					{name:"用户ID",id:"open_id"},
					{name:"用户昵称",id:"username"},
					{name:"禁用权限",id:"access",child:[{name:"待使用",id:"0"},{name:"线上展示中",id:"1"}]},
					{name:"当前状态",id:"status",child:[{name:"失效",id:"0"},{name:"生效",id:"1"}]},
					{name:"",type:"display"},
				],
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

				this.api.blacklist(data).then((da) => {
					
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
					this.filterFields.forEach(item=>{
						//console.log(urldata[item.id]);
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
					this.$router.push({ path: '/userManager/blackList', query: {urlDate: JSON.stringify(urldata)}});
				}
			},
			delect(val) {
				//this.centerDialogVisible = true;
				this.$confirm('确认删除该任务？', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					 this.api.hotworddelete({
						id: val.id,
						access_token: localStorage.getItem("access_token"),
					}).then(da => {
						this.$message({
							type: 'info',
							message: '删除成功'
						});
						this.getData({pageCurrent:1,pageSize:50})
						this.$refs.Tabledd.currentpage = 1;
					}) 
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			getforbiddenAccess(){
				this.api.forbiddenAccess({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					da.forEach(item=>{
						DataScreen.screen.blackList.filterFields[3].child.push({
							name:item.msg,
							id:item.access
						})
						this.filterFields[3].child.push({
							name:item.msg,
							id:item.access
						})
						//{name:"待使用",id:"0"},{name:"线上展示中",id:"1"}
					})
					
					console.log(da)
				})
			}
		},
		created() {
			this.screenreach();
			this.getcommonrightbtn();
			this.getforbiddenAccess();
		},
		mounted() {
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
