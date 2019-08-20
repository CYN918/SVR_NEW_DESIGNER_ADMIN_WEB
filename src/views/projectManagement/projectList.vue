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
					"commonrightbtn": [{
						name: "新建项目",
						id: "right1",
						fun: "add"
					}],
					"commonbottombtn":[
						
					],
					"tabData":[
						{name:"招募期"},
						{name:"待选标"},
						{name:"制作器"},
						{name:"已验收"},
						{name:"已终止"}
					],
					'tabnums':0,
				},
				screenConfig: [],
				tableConfig: {
					url:"projectlist",
					title:"项目发布",
					list: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目分类名称'},
						{prop:'business_type',lable:'项目类型'},
						{prop:'template_num',lable:'业务类型'},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间'},
						{prop:'check_time',lable:'中标时间'},
						{prop:'deadline',lable:'截稿时间'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"禁用","1":"启用"}}
					],
					listbu:{
						list0:{
							
						}
					},
					data:'status',
				},
				tableData: [],
				tableAction: {
					morebtns:{
						
					},
					links:{
						name:(da)=>{
							return "编辑"
						},
						accessid:"200058",
						fun:"edit",
					},
					
				},
				detailData: "",
				filterFields:[
					{name:"项目名称分类",id:"classify_name"},
					{name:"状态",id:"status",child:[{name:"禁用",id:"0"},{name:"启用",id:"1"}]},
					{type:"display",prop:'t',lable:'额外赏金'},
				],
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
			delect(){
				
			},
			add(){
				this.$router.push({
					path:"/projectManagement/projectclass/newprojectclass"
				})
			},
			edit(row){
				this.$router.push({
					path:"/projectManagement/projectclass/editprojectclass",
					query:{
						row: JSON.stringify(row)
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
