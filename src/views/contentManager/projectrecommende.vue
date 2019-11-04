<template>
	<div class="wh">
		<div class="wh">
			<div class="calc205">
				<common-table :commonTopData="commonTopData" :tableConfig="tableConfig" :tableAction="tableAction" :filterFields="filterFields"
				 ref="Tabledd"></common-table>
			</div>
		</div>
	</div>
</template>

<script>
	import commonTable from '@/components/commonTable2.vue'
	import DataScreen from "@/assets/DataScreen.js"

	export default {
		components: {
			commonTable,
		},
		data() {
			return {
				reason:"",
				comment:"",
				commonTopData: {
					num:false,
					"pageName": "publishWork",
					"commonleftbtn": [{
						name: "筛选",
						fun: "ISshow"
					}],
					"commonrightbtn": [{
						name: "新建干预任务",
						id: "right1",
						fun: "add",
						accessid:"1"
					}],
					"commonbottombtn":[
						
					],
					"tabData":[
						
					],
					'tabnums':0,
					tabDatatitle:"我的收益-推荐项目"
				},
				screenConfig: [],
				tableConfig: {
					url:"RecommendProjectlist",
					title:"项目发布",
					list: [
						{lable:"干预项目",prop:"name"},
						{lable:"干预位置",prop:"position",type:"keyvalue",child:{"1":"第一位","2":"第二位","3":"第三位","4":"第四位"}},
						{prop:'time',type:"merge",lable:'干预时间',child:{id1:"start_time",id2:"end_time"},width:320},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"recommendedActivitiesstatus",child:{"1":"线上展示中","0":" 未开始","-1":"已过期","-2":"已删除"}}
					]
				},
				centerDialogVisible:false,
				centerDialogVisible1:false,
				tableData: [],
				tableAction: {
					morebtns:{
						name:(da)=>{
							return "编辑"
						},
						fun:"edit",
						accessid:"200060",
					},
					links:{
						name:(da)=>{
							return "删除"
						},
						accessid:"200058",
						fun:"delect",
					}
				},
				detailData: "",
				filterFields:[
					{name:"任务ID",id:"id"},
					{name:"活动名称",id:"name"},
					{name:"干预位置",id:"position",child:[
						{name:"第一位",id:"1"},
						{name:"第二位",id:"2"},
						{name:"第三位",id:"3"},
						{name:"第四位",id:"4"}
					]},
					{name:"当前状态",id:"status",child:[{name:"已删除",id:"-2"},{name:"已过期",id:"-1"},{name:"待使用",id:"0"},{name:"线上展示中",id:"1"}]},
					{name:'干预时间',type:"time",child:[{name:'干预时间(开始)',id:'start_time'},{name:'干预时间(开始)',id:'end_time'}]},
					{name:"",type:"display"},
				],
				
				IsDetail:1,
				roles:{},
				top_banner: [],
				crow:{},
				tableData:{},
				contract_id:""
			}
		},
		watch: {},
		computed: {},
		methods: {
			ISshow(){
				this.$refs.Tabledd.reject();
			},
			delect(row){
				this.$confirm('确认删除该任务？', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					this.api.RecommendProjectdelete({
						id:row.id,
						access_token:localStorage.getItem("access_token")
					}).then(da=>{
						if(da.result == 0) {
							this.$refs.Tabledd.getTabData();
						}
					}).catch(da=>{
						
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
				
			},
			add(){
				this.$router.push({
					path:"/contentManager/projectrecommende/newprojectrecommende"
				})
			},
			edit(row){
				this.$router.push({
					path:"/contentManager/projectrecommende/editprojectrecommende",
					query:{
						row: JSON.stringify(row)
					}
				})
				
			},
		},
		created() {
		},
		mounted() {
			
		},
		watch:{
			
		}
	}
</script>
<style>
	
</style>
