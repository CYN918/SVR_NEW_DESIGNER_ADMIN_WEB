<template>
	<div class="wh">
		<div class="wh">
			<div class="calc205">
				<common-table :commonTopData="commonTopData" :tableConfig="tableConfig" :tableAction="tableAction" :filterFields="filterFields"
				 ref="Tabledd"></common-table>
			</div>
		</div>
		<el-dialog title="请选择终止理由" :visible.sync="centerDialogVisible" width="738px" custom-class="custom-dialog">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<span class="fleft Dialogkey">
							终止理由
						</span>
						<el-radio-group v-model="reason" class="sel-dialog-content fleft">
							<div class="w  sel-radio" v-for="(item,index) in tableData" :key="item.id">
								<el-radio :label="item.content">{{ item.content }}</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="其他理由（请在详细说明中填写）">其他理由（请在详细说明中填写）</el-radio>
							</div>
						</el-radio-group>
					</li>
					<li class="w ofh">
						<span class="fleft Dialogkey">
							终止详细说明
						</span>
						<div class="fleft defaultbtnworkbg">
							<div>
								<textarea name="" id="" cols="60" rows="10" v-model="comment" Maxlength="100" class="defaultbtnwork"></textarea>
							</div>
							<span class="fright fontcolorg">{{ comment.length }}/100</span>
						</div>
					</li>
				</ul>
		
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class="defaultbtn" @click="reject">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="stop">确定终止</button>
			</span>
		</el-dialog>
		<el-dialog title="补充合同ID" :visible.sync="centerDialogVisible1" width="500px">
			<div>
				<ul>
					<li class="w ofh textcenter contract-item" v-for="(contract, index) in contract_files" :key="index">
						<span>{{contract.name}}</span>
						<i class="el-icon-delete" @click="deleteContract(contract)"></i>
					</li>
					<li class="w ofh textcenter" style="margin-top: 20px">
						<span class="Dialogkey" style="display: inline-block;line-height: 40px;margin: 0;">
							合同ID
						</span>
						<el-input style="width: 300px;" v-model="contract_id" placeholder="请输入内容"></el-input>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class="defaultbtn" @click="reject1">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="supply()">提交</button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import commonTable from '@/components/commonTable4.vue'
	import DataScreen from "@/assets/DataScreen.js"

	export default {
		components: {
			commonTable,
		},
		data() {
			return {
				ffst:false,
				contract_files: [{},{}],
				reason:"",
				comment:"",
				commonTopData: {
					num:false,
					upload:true,
					"pageName": "projectList",
					"commonleftbtn": [{
						name: "筛选",
						fun: "ISshow"
					}],
					"commonrightbtn": [{
						name: "新建长期项目",
						id: "right1",
						fun: "newP",
						accessid:"200520"
					}],
					// newprojectLong
					
					"commonbottombtn":[
						
					],
					"tabData":[
						{name:"长期项目",path:'/projectManagement/projectLongList',isAc:true},
						{name:"子项目",path:'/projectManagement/projectZList'},
					],
					'tabnums':0,
				},
				screenConfig: [],
				tableConfig: {
					project_type:1,
					status:'0,1,-2',
					url:"probjLongpcList",
					title:"项目发布",
					list0: [
						{prop:'project_id',lable:'ID'},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'name',lable:'项目名称'},
						{prop:'classify_name',lable:'项目类型'},
						{prop:'business_type',lable:'业务类型',
						type:"keyvalue",
						child:{"1":"广告模板","2":"广告图","3":"场景主题","4":"个性化主题","5":"来电秀","6":"其他","7":"杂志锁屏"},
						},						
						{prop:'settlement',lable:'结算方式',type:"keyvalue",
							child:{"0":"用户选择","1":"买断","2":"分成"},
						},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'demand_id',lable:'绑定需求'},
						{prop:'signup_num',lable:'累积报名'},
						{prop:'publish_time',lable:'发布时间',width:150},
						{prop:'dismount_time',lable:'下架时间',width:150},
						{prop:'delivery_deadline',type:'zq',lable:'制作周期',width:150},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"projectstatus",child:{"0":"待发布","1":"展示中","-2":"下架"}},
					],
					data:'status',
				},
				centerDialogVisible:false,
				centerDialogVisible1:false,
				tableData: [],
				tableAction: {
					num:true,
					tableAction0:{
						morebtns:{
							name:"更多",
							child:[
								{
									name:(da)=>{return "编辑"},
									fun:"edit",
									accessid:"200611",
								},
								{
									name:(da)=>{return '删除';},
									fun:"delect",
									accessid:"200612",
								},
								{
									name:(da)=>{
										return da.status==-2?'上架':'下架'
									},
									fun:"upJa",
									accessid:"200611",
								},

							]
						},
						links:{
							name:(da)=>{
								return "查看"
							},
							accessid:"200609",
							fun:"see",
						}
					},

				},
				detailData: "",
				filterFields:{
					filterFields0:[
						{name:"项目名称",id:"name",type:'input'},
						{name:"项目类型",id:"classify_name",type:'selet',child:[]},
						{name:"业务类型",id:"business_type",type:'selet',child:[{name:"场景主题",id:"3"},{name:"个性化主题",id:"4"},{name:"来电秀",id:"5"},{name:"其他",id:"6"},{name:"杂志锁屏",id:"7"}]},
						{name:"项目ID",id:"project_id",type:'input'}
					],
					
				},
				
				IsDetail:1,
				roles:{},
				top_banner: [],
				crow:{},
				tableData:{},
				contract_id:"",
				adminuseraccess:"",
				access:"",
				business_title:"",
				
			}
		},
		watch: {},
		computed: {},
		methods: {
			newP(){
				this.router.push({
					path:"/projectManagement/projectList/newprojectLong"
				})
			},
			getProjectclassify(){
				this.api.projectclassifylist({
					page:1,
					limit:200,
					access_token:localStorage.getItem("access_token"),
				}).then((da)=>{
					let arr = [];
					for(let i=0,n = da.data.length;i<n;i++){
						arr.push({
							name:da.data[i].classify_name,
							id:da.data[i].classify_name
						})
					}
					this.filterFields.filterFields0[1].child = arr;						
				})
			},
			loadContractList() {
				let row = this.crow
				if(row && row.project_id){
					this.api.contractList({
						access_token:localStorage.getItem("access_token"),
						project_id:row.project_id
					}).then(da => {
						if(da.result == 0){
							this.contract_files = Object.entries(da.data).map(([name, value]) => {
								return { name }
							})
						}
					})
				}
			},
			deleteContract(contract) {
				let row = this.crow
				if(!row || !row.project_id) return
				this.api.delContract({
					access_token:localStorage.getItem("access_token"),
					project_id:row.project_id,
					archive_id:contract.name
				}).then(da => {
					if(da.result == 0){
						this.contract_files = this.contract_files.filter(f => f.name != contract.name)
					}
				})
			},
			presentation(row){
				this.setpage()
				this.$router.push({
					path:"/projectManagement/projectList/presentation",
					query:{
						project_id:row.project_id
					}
				})
				
			},
			yulan(row){
				window.open(localStorage.getItem("URL")+"/#/prcent?id=" + row.project_id);
			},
			up(row){
				//console.log(row.file_url)
				/* window.open(row.file_url); */
				fetch(row.file_url).then(res => res.blob()).then(blob => {
					const a = document.createElement('a');
					document.body.appendChild(a)
					a.style.display = 'none'
					// 使用获取到的blob对象创建的url
					const url = window.URL.createObjectURL(blob);
					a.href = url;
					// 指定下载的文件名
					a.download = row.template_file_name;
					a.click();
					document.body.removeChild(a);
					// 移除blob对象的url
					window.URL.revokeObjectURL(url);
				});
			},
			reject1(row){
				this.crow = row;
				this.centerDialogVisible1 =!this.centerDialogVisible1;
				this.loadContractList()
			},
			supply(){
				let row = this.crow;
				this.api.addContract({
					access_token:localStorage.getItem("access_token"),
					project_id:row.project_id,
					archive_id:this.contract_id 
				}).then(da=>{
					if(da.result == 0){
						// this.$refs.Tabledd.getTabData();
						// this.centerDialogVisible1=false;
						this.contract_files.push({ name: this.contract_id })
						this.contract_id = '';
					}
				}).catch(da=>{
					
				})
			},
			getData() {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 100,
				}
				this.api.reviewreason(data).then((da) => {
					this.tableData = da.data;
				}).catch(() => {
					
				});
			},
			reject(row){
				this.crow = row;
				this.centerDialogVisible =!this.centerDialogVisible;
			},
			stop(){
				let row = this.crow;
				this.api.terminate({
					access_token:localStorage.getItem("access_token"),
					project_id:row.project_id,
					reason:this.reason,
					comment:this.comment
				}).then(da=>{
					if(da.result == 0){
						this.$refs.Tabledd.getTabData();
						this.centerDialogVisible=false;
					}
				}).catch(da=>{
				})
			},
			review(row){
				this.setpage()
				if(row.check_status == '4'){
					this.$router.push({
						path:"/review/projectreview",
					})
				}
				
			},
			review1(row){
				
				const {href} = this.$router.resolve({ path: "/review/projectreview/projectdetial",query:{
					id:row.bing_id,
					type:5,
					check_status:0,
					project_id:row.project_id,
					business_type:row.business_type,
					blank:'_blank',
				}})
				window.open(href, '_blank')
				
			},
			selectobj(row){
				this.setpage()
				this.$router.push({
					path:"/projectManagement/projectList/projectDetial",
					query:{
						id: row.project_id,
						status:row.status,
						index:3
					}
				})
				
			},
			ISshow(){
				this.$refs.Tabledd.reject();
			},
			upJa(row){
				if(this.ffst){return}
				
				let pr = {
					project_id:row.project_id,
					access_token:localStorage.getItem("access_token"),
					type:row.status==-2?1:2
				};
				this.ffst = true;
				this.api.projectshelve(pr).then((da)=>{
					this.ffst = false;
					if(da.result == 0) {
						this.$message({
							message:'操作成功'
						})
						this.$refs.Tabledd.getTabData();
					}
				}).catch(()=>{
					this.ffst = false;
				})
			},
			delect(row){
				this.$confirm('确认删除该项目？', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					this.api.projectdel({
						project_id:row.project_id,
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
				this.setpage()
				this.$router.push({
					path:"/projectManagement/projectList/newproject"
				})
				
			},
			edit(row){
				this.setpage()
				this.$router.push({
					path:"/projectManagement/projectList/editproject",
					query:{
						row: JSON.stringify(row)
					}
				})
				
			},
			see(row){
				this.setpage()
				//console.log(row);
				this.$router.push({
					path:"/projectManagement/projectList/projectDetialLong",
					query:{
						id: row.project_id,
						status:row.status,
						business_type:row.business_type,
					}
				})
				
			},
			setpage(){
				localStorage.setItem("projectlist",this.$refs.Tabledd.commonTopData.tabnums);
			},
			leadingout(){
				this.$refs.Tabledd.setexport();
			}
		},
		created() {
			this.getProjectclassify();
			this.getData();
			if (localStorage.getItem("adminuseraccess")) {
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
		},
		mounted() {
			
		},
		watch:{
			
		}
	}
</script>
<style>
	.custom-dialog{
		max-height: 500px;
		overflow-x: auto;
	}
	.contract-item{
		height: 40px;
		line-height: 40px;
	}
	.contract-item span{
		display: inline-block;
		width: 357px;
		text-align: left;
	}
	.contract-item i{
		cursor: pointer;
	}
</style>
