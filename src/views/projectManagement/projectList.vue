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
					num:false,
					"pageName": "publishWork",
					"commonleftbtn": [{
						name: "筛选",
						fun: "ISshow"
					}],
					"commonrightbtn": [{
						name: "新建项目",
						id: "right1",
						fun: "add",
						accessid:"1"
					}],
					"commonbottombtn":[
						
					],
					"tabData":[
						{name:"待发布"},
						{name:"招募期"},
						{name:"待选标"},
						{name:"制作期"},
						{name:"已验收"},
						{name:"已终止"}
					],
					'tabnums':0,
				},
				screenConfig: [],
				tableConfig: {
					url:"projectlist",
					title:"项目发布",
					list0: [
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
					list1: [
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
						{prop:'deadline',lable:'报名人数'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"禁用","1":"启用"}}
					],
					list2: [
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
						{prop:'deadline',lable:'报名人数'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"禁用","1":"启用"}}
					],
					list3: [
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
						{prop:'deadline',lable:'报名人数'},
						{prop:'deadline',lable:'中标人'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"禁用","1":"启用"}}
					],
					list4: [
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
						{prop:'deadline',lable:'验收时间'},
						{prop:'deadline',lable:'报名人数'},
						{prop:'deadline',lable:'中标人'},
						{prop:'deadline',lable:'验收价格'},
						{prop:'deadline',lable:'延迟交稿扣减'},
						{prop:'deadline',lable:'收益加成'},
						{prop:'deadline',lable:'成交价格'},
						{prop:'deadline',lable:'成交方式'},
						{prop:'deadline',lable:'需求ID'},
						{prop:'deadline',lable:'项目评级'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"禁用","1":"启用"}}
					],
					list5: [
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
						{prop:'deadline',lable:'报名人数'},
						{prop:'deadline',lable:'中标人'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"禁用","1":"启用"}},
						{prop:'deadline',lable:'终止理由'},
					],
					data:'status',
				},
				tableData: [],
				tableAction: {
					num:true,
					tableAction0:{
						morebtns:{
							name:"更多",
							child:[
								{
									name:(da)=>{
										return "编辑"
									},
									fun:"edit",
									accessid:"200060",
								},
								{
									name:(da)=>{
										
										return '删除';
										
									},
									fun:"delect",
									accessid:"200062",
								}
							]
						},
						links:{
							name:(da)=>{
								return "查看"
							},
							accessid:"200058",
							fun:"see",
						}
					},
					tableAction1:{
						morebtns:{
							name:"更多",
							child:[
								{
									name:(da)=>{
										return '预览';
									},
									fun:"s",
									accessid:"200062",
								},
								{
									name:(da)=>{
										return "编辑"
									},
									fun:"edit",
									accessid:"200060",
								},
								{
									name:(da)=>{
										return '删除';
									},
									fun:"delect",
									accessid:"200062",
								},
								
							]
						},
						links:{
							name:(da)=>{
								return "查看"
							},
							accessid:"200058",
							fun:"see",
						}
					},
					tableAction2:{
						morebtns:{
							name:"更多",
							child:[
								{
									name:(da)=>{
										return '选标';
									},
								/* 	filterdata:"is_recommend", */
									fun:"confirm",
									accessid:"200062",
								},
								{
									name:(da)=>{
										
										return '预览';
										
									},
									fun:"s",
									accessid:"200062",
								},
								{
									name:(da)=>{
										return "编辑"
									},
									fun:"edit",
									accessid:"200060",
								}
							]
						},
						links:{
							name:(da)=>{
								return "查看"
							},
							accessid:"200058",
							fun:"see",
						}
					},
					tableAction3:{
						morebtns:{
							name:"更多",
							child:[
								{
									name:(da)=>{
										return "编辑"
									},
									fun:"edit",
									accessid:"200060",
								},
								{
									name:(da)=>{
										return '验收审核';
									},
									fun:"a",
									accessid:"200062",
								},
								{
									name:(da)=>{
										return '终止';
									},
									fun:"s",
									accessid:"200062",
								},
								{
									name:(da)=>{
										return '补充合同ID';
									},
								/* 	filterdata:"is_recommend", */
									fun:"confirm",
									accessid:"200062",
								},
							]
						},
						links:{
							name:(da)=>{
								return "查看"
							},
							accessid:"200058",
							fun:"see",
						}
					},
					tableAction4:{
						morebtns:{
							name:"更多",
							child:[
								{
									name:(da)=>{
										return "下载稿件"
									},
									fun:"edit",
									accessid:"200060",
								},
								{
									name:(da)=>{
										
										return '验收报告';
										
									},
									fun:"delect",
									accessid:"200062",
								}
							]
						},
						links:{
							name:(da)=>{
								return "查看"
							},
							accessid:"200058",
							fun:"see",
						}
					},
					tableAction5:{
						morebtns:{
							
						},
						links:{
							name:(da)=>{
								return "查看"
							},
							accessid:"200058",
							fun:"see",
						}
					}
					
					
				},
				detailData: "",
				filterFields:{
					filterFields0:[
						{name:"项目ID",id:"classify_name"},
						{name:"项目名称",id:"classify_name"},
						{name:"业务类型",id:"classify_name"},
						{name:"领域范围",id:"classify_name"},
						{name:"额外赏金",id:"classify_name"},
						{name:"发布时间",id:"classify_name"},
						{name:"中标时间",id:"classify_name"},
						{name:"截稿时间",id:"classify_name"},
					],
					filterFields1:[
						{name:"项目ID",id:"classify_name"},
						{name:"项目名称",id:"classify_name"},
						{name:"业务类型",id:"classify_name"},
						{name:"领域范围",id:"classify_name"},
						{name:"额外赏金",id:"classify_name"},
						{name:"发布时间",id:"classify_name"},
						{name:"中标时间",id:"classify_name"},
						{name:"截稿时间",id:"classify_name"},
					],
					filterFields2:[
						{name:"项目ID",id:"classify_name"},
						{name:"项目名称",id:"classify_name"},
						{name:"业务类型",id:"classify_name"},
						{name:"领域范围",id:"classify_name"},
						{name:"额外赏金",id:"classify_name"},
						{name:"发布时间",id:"classify_name"},
						{name:"中标时间",id:"classify_name"},
						{name:"截稿时间",id:"classify_name"},
					],
					filterFields3:[
						{name:"项目ID",id:"classify_name"},
						{name:"项目名称",id:"classify_name"},
						{name:"业务类型",id:"classify_name"},
						{name:"领域范围",id:"classify_name"},
						{name:"额外赏金",id:"classify_name"},
						{name:"发布时间",id:"classify_name"},
						{name:"中标时间",id:"classify_name"},
						{name:"截稿时间",id:"classify_name"},
						{name:"中标人昵称",id:"classify_name"},
						{name:"中标人手机号",id:"classify_name"},
						{name:"状态",id:"status",child:[{name:"禁用",id:"0"},{name:"启用",id:"1"}]},
					],
					filterFields4:[
						{name:"项目名称分类",id:"classify_name"},
						{name:"状态",id:"status",child:[{name:"禁用",id:"0"},{name:"启用",id:"1"}]},
						{type:"display",prop:'t',lable:'额外赏金'},
					],
					filterFields5:[
						{name:"项目名称分类",id:"classify_name"},
						{name:"状态",id:"status",child:[{name:"禁用",id:"0"},{name:"启用",id:"1"}]},
						{type:"display",prop:'t',lable:'额外赏金'},
					]
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
				this.api.projectdel({
					project_id:row.project_id,
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					if(da.result == 0) {
						this.$refs.Tabledd.getTabData();
					}
				}).catch(da=>{
					
				})
			},
			add(){
				this.$router.push({
					path:"/projectManagement/projectList/newproject"
				})
			},
			edit(row){
				this.$router.push({
					path:"/projectManagement/projectList/editproject",
					query:{
						row: JSON.stringify(row)
					}
				})
			},
			see(row){
				//console.log(row);
				this.$router.push({
					path:"/projectManagement/projectList/projectDetial",
					query:{
						id: row.project_id,
						status:row.status
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
