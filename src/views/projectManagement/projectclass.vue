<template>
	<div class="wh">
		<div class="wh">
			<div class="calc205">
				<common-table :commonTopData="commonTopData" :tableConfig="tableConfig" :tableAction="tableAction" :filterFields="filterFields"
				 ref="Tabledd"></common-table>
			</div>
		</div>
		
		<el-dialog title="项目类型" :visible.sync="centerDialogVisible" width="480px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<span class="fleft Dialogkey" style="line-height: 40px;text-align: right;">项目类型名称</span>
						<div class="el-input__inner roles-input width500" :style="{width: '200px',backgroundColor: disabled ? '#f5f7fa' : 'rgba(0,0,0,0)'}">
							<input type="text" placeholder="请输入内容" :disabled="disabled"  class="sel-input fleft" maxlength="6" v-model="form['classify_name']">
							<span class="fright">{{ form['classify_name'].length }}/6</span>
						</div>
					</li>
					<li class="w ofh">
						<span class="fleft Dialogkey" style="line-height: 30px;text-align: right;">状态</span>
						<div class="fleft">
							<el-radio v-model="form.status" label="1" class="fleft" style="width: auto;">启用</el-radio>
							<el-radio v-model="form.status" label="0" class="fleft" style="width: auto;">停用</el-radio>
						</div>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class="defaultbtn" @click="reject">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="sendmessage">确定</button>
			</span>
		</el-dialog>
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
						fun: "ISshow"
					}],
					"commonrightbtn0": [{
						name: "新建项目分类",
						id: "right1",
						fun: "add",
						accessid: "200551"
					}],
					"commonrightbtn1": [{
						name: "新建预设模板",
						id: "right1",
						fun: "add21",
						accessid: "200556"
					}],
					"commonbottombtn":[
						
					],
					"tabData":[
						{name:"项目分类",accessid: "200503"},
						{name:"模板预设",accessid: "200504"},
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
							accessid:"200553",
							fun:"edit",
						},
						
					},
					tableAction1: {
						morebtns:{
							name:(da)=>{
								return "编辑"
							},
							accessid:"200555",
							fun:"edit1",
						},
						links:{
							name:(da)=>{
								return "查看"
							},
							accessid:"200557",
							fun:"see",
						},
						filterbtn:{
							name:(da)=>{
								return "删除"
							},
							accessid:"200554",
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
				projectclassid:""
			}
		},
		watch: {},
		computed: {},
		methods: {
			reject(){
				this.centerDialogVisible = !this.centerDialogVisible;
			},
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
				this.disabled = false;
				this.form = {
					status:"1",
					classify_name:""
				}
				this.reject();
			},
			sendmessage(){
				if(!this.form.classify_name){
					this.$message({
						message:"项目类型名称不能为空"
					})
					return;
				}
				
				if(this.disabled){
					this.api.projectclassifyupdate({
						access_token:localStorage.getItem("access_token"),
						classify_name:this.form.classify_name,
						status:this.form.status,
						id:this.projectclassid
					}).then(da => {
						//console.log(da)
						this.$refs.Tabledd.getTabData();
						this.reject();
					}).catch(() => {
						
					})
				} else {
					this.api.projectclassifyadd({
						access_token:localStorage.getItem("access_token"),
						classify_name:this.form.classify_name,
						status:this.form.status
					}).then(da => {
						//console.log(da)
						this.$refs.Tabledd.getTabData();
						this.reject();
					}).catch(() => {
						
					})
				}
			},
			add1(row){
				this.setpage()
				this.$router.push({
					path:"/projectManagement/projectclass/newtemplate",
					query:{
						row: JSON.stringify(row)
					}
				})
				
			},
			edit(row){
				/* this.setpage()
				this.$router.push({
					path:"/projectManagement/projectclass/editprojectclass",
					query:{
						row: JSON.stringify(row)
					}
				}) */
				this.disabled = true;
				this.form = {
					status:row.status,
					classify_name:row.classify_name
				}
				this.projectclassid = row.id
				this.reject();
			},
			edit1(row){
				this.setpage()
				this.$router.push({
					path:"/projectManagement/projectclass/edittemplate",
					query:{
						row: JSON.stringify(row)
					}
				})
			},
			see(row){
				this.setpage()
				this.$router.push({
					path:"/projectManagement/projectclass/seetemplate",
					query:{
						id: row.id
					}
				})
			},
			setpage(){
				localStorage.setItem("projectclass",this.$refs.Tabledd.commonTopData.tabnums);
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
