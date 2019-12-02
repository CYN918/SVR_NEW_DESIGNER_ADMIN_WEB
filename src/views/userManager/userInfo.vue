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
					"commonrightbtn0": [],
					"commonrightbtn1": [],
					"commonbottombtn":[
						
					],
					"tabData":[
						{name:"个人"},
						{name:"企业/机构"}
					],
					'tabnums':0,
					num:true
				},
				screenConfig: [],
				tableConfig: {
					url0:"getContributorList",
					data0:{
						name:"contribute_type",
						id:"1"
					},
					data1:{
						name:"contribute_type",
						id:"2"
					},
					url1:"getContributorList",
					title:"项目发布",
					list0: [
						{prop:'open_id',lable:'用户ID',width:200},
						{prop:'username',lable:'用户昵称'},
						{prop:'mobile',lable:'手机号'},
						{prop:'email',lable:'邮箱'},
						{prop:'name',lable:'身份证姓名'},
						{prop:'id_card',lable:'身份证号码'},
						{prop:'front_photo',lable:'身份证照片',type:"img",width:200},
						
					],
					list1: [
						{prop:'open_id',lable:'用户ID',width:200},
						{prop:'username',lable:'用户昵称'},
						{prop:'mobile',lable:'手机号',width:200},
						{prop:'email',lable:'邮箱',width:200},
						{prop:'company_name',lable:'企业/机构名称',width:150},
						{prop:'code',lable:'统一信用代码（企业）',width:200},
						{prop:'business_license',lable:'营业执照',type:"img",width:200},
					]
				},
				tableData: [],
				tableAction:{
					num:true,
					tableAction0: {
						links:{
							name:(da)=>{
								return "查看详情"
							},
							accessid:"200052",
							fun:"see1",
						},
					},
					tableAction1: {
						links:{
							name:(da)=>{
								return "查看详情"
							},
							accessid:"200047",
							fun:"see",
						}
					}
				},
				
				detailData: "",
				filterFields:{
					filterFields0:[
						{name:"用户ID",id:"open_id"},
						{name:"用户昵称",id:"username"},
						{name:"手机号",id:"mobile"},
						{name:"手机号",id:"reserve_phone"},
						{name:"邮箱",id:"email"},
						{name:"身份证姓名",id:"real_name"},
						{name:"身份证号码",id:"id_card"},
						{name:"收款账号名",id:"account_name"},
						{name:"银行卡号",id:"bank_card_no"},
						{name:"银行预留手机号",id:"reserve_phone"},
						{name:"所属开户银行",id:"bank_name"},
						{name:"所属开户支行",id:"branch_bank"},
						{name:'累积收益', type:'two',child:[{id:'profit_min',name:"累积收益下限"},{name:"累积收益上限",id:'profit_max'}]},
						{name:'累积录用作品数量', type:'two',child:[{id:'hire_num_min',name:"累积录用作品数下限"},{id:'hire_num_max',name:"累积录用作品数上限"}]},
					],
					filterFields1:[
						{name:"用户ID",id:"open_id"},
						{name:"用户昵称",id:"username"},
						{name:"手机号",id:"mobile"},
						{name:"邮箱",id:"email"},
						{name:"企业/机构名称",id:"company_name"},
						{name:"统一信用代码",id:"code",}, 
						{name:"提供发票税率",id:"tax_rate_type",child:[{name:"6%或17% ",id:"1"},{name:"3%",id:"2"}]},
						{name:"企业银行卡号",id:"bank_card_no"},
						{name:"所属开户银行",id:"bank_name"},
						{name:"所属开户支行",id:"branch_bank"},
						{name:'累积收益', type:'two',child:[{id:'profit_min',name:"累积收益下限"},{name:"累积收益上限",id:'profit_max'}]},
						{name:'累积录用作品数', type:'two',child:[{id:'hire_num_min',name:"累积录用作品数下限"},{id:'hire_num_max',name:"累积录用作品数上限"}]},
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
			see(row){
				this.setpage()
				this.router.push({
					path:"/userManager/userCompanyInfo/userCompanyInfoDetail",
					query:{
						open_id:row.open_id
					}
				})
			},
			see1(row){
				this.setpage()
				this.router.push({
					path:"/userManager/userPersonalInfo/userPersonalInfoDetail",
					query:{
						open_id:row.open_id
					}
				})
			},
			setpage(){
				localStorage.setItem("userInfo",this.$refs.Tabledd.tabnums);
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
