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
				commonTopData: {
					"pageName": "publishWork",
					"commonleftbtn": [{
						name: "筛选",
						fun: "ISshow"
					}],
					"commonrightbtn0": [{
						name: "新建项目分类",
						id: "right1",
						fun: "add"
					}],
					"commonrightbtn1": [{
						name: "新建预设模板",
						id: "right1",
						fun: "add1"
					}],
					"commonbottombtn":[
						
					],
					"tabData":[
						{name:"项目分类"},
						{name:"模板预设"},
					],
					'tabnums':0,
					num:true
				},
				screenConfig: [],
				tableConfig: {
					url0:"projectclassifylist",
					url1:"projecttemplatelist",
					title:"项目发布",
					list0: [
						{prop:'classify_name',lable:'项目分类名称'},
						{prop:'template_num',lable:'预设模板数量'},
						{prop:'project_num',lable:'当前有效的项目'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"禁用","1":"启用"}},
						
					],
					list1: [
						{prop:'template_name',lable:'模板名称'},
						{prop:'classify_name',lable:'所属项目分类'},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'file_name',lable:'模板文件'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"禁用","1":"启用"}},
						
					],
				},
				tableData: [],
				tableAction:{
					num:true,
					tableAction0: {
						morebtns:{
							
						},
						links:{
							name:(da)=>{
								return "编辑"
							},
							accessid:"1",
							fun:"edit",
						},
						
					},
					tableAction1: {
						morebtns:{
							name:(da)=>{
								return "编辑"
							},
							accessid:"1",
							fun:"edit1",
						},
						links:{
							name:(da)=>{
								return "查看"
							},
							accessid:"1",
							fun:"see",
						},
						filterbtn:{
							name:(da)=>{
								return "删除"
							},
							accessid:"1",
							fun:"delect",
						}
					},
				},
				
				detailData: "",
				filterFields:{
					filterFields0:[
						{name:"项目名称分类",id:"classify_name"},
						{name:"状态",id:"status",child:[{name:"禁用",id:"0"},{name:"启用",id:"1"}]},
						{type:"display",prop:'t',lable:'额外赏金'},
					],
					filterFields1:[
						{name:"模板名称",id:"template_name"},
						{name:"所属项目分类",id:"classify_name"},
						{name:"领域范围",id:"fields"},
						{name:'额外赏金', type:'two',child:[{name:'作品数量下限',id:'extra_reward_start'},{name:'作品数量上限',id:'extra_reward_end'}]},
						{name:"状态",id:"status",child:[{name:"禁用",id:"0"},{name:"启用",id:"1"}]},
						{type:"display",prop:'t',lable:'额外赏金'},
					],
				},
				IsDetail:1,
				roles:{},
				top_banner: [],
			}
		},
		watch: {},
		computed: {},
		methods: {
			ISshow(){
				this.$refs.Tabledd.reject();
			},
			delect(row){
				this.api.projecttemplatedel({
					access_token: localStorage.getItem("access_token"),
					id:row.id
				}).then(da=>{
					if(da.result == 0) {
						this.$refs.Tabledd.getTabData();
					}
				})
			},
			add(){
				this.$router.push({
					path:"/projectManagement/projectclass/newprojectclass"
				})
			},
			add1(row){
				this.$router.push({
					path:"/projectManagement/projectclass/newtemplate",
					query:{
						row: JSON.stringify(row)
					}
				})
			},
			edit(row){
				this.$router.push({
					path:"/projectManagement/projectclass/editprojectclass",
					query:{
						row: JSON.stringify(row)
					}
				})
			},
			edit1(row){
				this.$router.push({
					path:"/projectManagement/projectclass/newtemplate",
					query:{
						row: JSON.stringify(row)
					}
				})
			},
			see(row){
				this.$router.push({
					path:"/projectManagement/projectclass/seetemplate",
					query:{
						id: row.id
					}
				})
			}
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
