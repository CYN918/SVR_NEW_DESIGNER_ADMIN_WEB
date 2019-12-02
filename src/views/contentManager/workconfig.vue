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
				disabled:true,
				centerDialogVisible:false,
				form:{
					status:"1",
					classify_name:""
				},
				commonTopData: {
					"pageName": "publishWork",
					"commonleftbtn": [{
						name: "筛选",
						fun: "ISshow",
						is:2
					}],
					"commonrightbtn0": [{
						name: "新建专题",
						id: "right1",
						fun: "add"
					}],
					"commonrightbtn1": [{
						name: "新建干预任务",
						id: "right1",
						fun: "add1"
					}],
					"commonbottombtn":[
						
					],
					"tabData":[
						{name:"作品专题"},
						{name:"精选推荐"}
					],
					'tabnums':0,
					num:true
				},
				screenConfig: [],
				tableConfig: {
					url0:"worksubjectlist",
					url1:"taskList",
					title:"项目发布",
					list0: [
						/* {prop:'classify_name',lable:'干预作品'},
						{prop:'template_num',lable:"干预类型"},
						{lable:"干预位置",prop:"position",type:"keyvalue",child:{"1":"第一位","2":"第二位","3":"第三位","4":"第四位"}},
						{prop:'time',type:"merge",lable:'干预时间',child:{id1:"start_time",id2:"end_time"},width:320},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"recommendedActivitiesstatus",child:{"1":"线上展示中","0":" 未开始","-1":"已过期","-2":"已删除"}} */
						{prop:'name',lable:'专题名称'},
						{lable:"tab排序",prop:"sort",type:"keyvalue",child:{"1":"第一位","2":"第二位","3":"第三位","4":"第四位"}},
						{lable:"当前作品数量",prop:"total_work_num"},
						
					],
					list1: [
						{lable:"任务ID",prop:"id"},
						{lable:"作品ID",prop:"work_id"},
						{lable:"作品名称",prop:"work_name",type:"url",id:"work_id",url:"/workManager/workInfo/workInfoDetial?id="},
						{lable:"干预位置",prop:"position"},
						{prop:'time',type:"merge",lable:'干预时间',child:{id1:"start_time",id2:"end_time"},width:320},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"recommendedActivitiesstatus",child:{"1":"线上展示中","0":" 未开始","-1":"已过期","-2":"已删除"}}
					]
				},
				tableData: [],
				tableAction:{
					num:true,
					tableAction0: {
						links:{
							name:(da)=>{
								return "编辑"
							},
							accessid:"1",
							fun:"edit",
						},
						morebtns:{
							name:(da)=>{
								return "删除"
							},
							accessid:"1",
							fun:"delect",
						},
					},
					tableAction1: {
						morebtns:{
							name:(da)=>{
								return "删除"
							},
							accessid:"1",
							fun:"delect2",
						},
						links:{
							name:(da)=>{
								return "编辑"
							},
							accessid:"1",
							fun:"edit2",
						}
					}
				},
				
				detailData: "",
				filterFields:{
					filterFields0:[
						
					],
					filterFields1:[
						{name:"干预类型",id:"classify_name"},
						{name:'干预时间',type:"time",child:[{name:'干预时间(开始)',id:'program_begin_time'},{name:'干预时间(开始)',id:'program_end_time'}]},
						{name:"当前状态",id:"status",child:[{name:"待使用",id:"1"},{name:" 未使用",id:"0"},{name:"线上展示中",id:"2"}]},
					]
				},
				IsDetail:1,
				roles:{},
				top_banner: [],
				projectclassid:""
			}
		},
		watch: {},
		computed: {},
		methods: {
			edit2(row){
				this.setpage()
				this.router.push({path:"/contentManager/editlistAd", query:{row: JSON.stringify(row)}})
			},
			add(){
				this.setpage()
				this.$router.push({
					path:"/contentManager/workconfig/newworkconfig"
				})
			},
			add1(){
				this.setpage()
				this.$router.push({
					path:"/contentManager/newlistAd"
				})
			},
			edit(row){
				this.setpage()
				this.$router.push({
					path:"/contentManager/workconfig/editworkconfig",
					query:{
						row:JSON.stringify(row)
					}
				})
			},
			delect2(row) {
				//this.centerDialogVisible = true;
				this.$confirm('确认删除该任务？', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					 this.api.Homerec_delete({
						id: row.id,
						access_token: localStorage.getItem("access_token"),
					}).then(da => {
						this.$refs.Tabledd.getTabData();
					}) 
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			delect(row){
				this.$confirm('确认删除该专题？', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					this.api.worksubjectdel({
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
			setpage(){
				localStorage.setItem("workconfig",this.$refs.Tabledd.tabnums);
			},
			ISshow(){
				this.$refs.Tabledd.reject();
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
