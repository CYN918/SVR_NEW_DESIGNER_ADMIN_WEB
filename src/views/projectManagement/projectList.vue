<template>
	<div class="wh">
		<div class="wh">
			<div class="calc205">
				<common-table :commonTopData="commonTopData" :tableConfig="tableConfig" :tableAction="tableAction" :filterFields="filterFields"
				 ref="Tabledd"></common-table>
			</div>
		</div>
		<el-dialog title="请选择终止理由" :visible.sync="centerDialogVisible" width="738px">
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
					<li class="w ofh textcenter">
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
					upload:true,
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
						{prop:'name',lable:'项目名称'},
						{prop:'classify_name',lable:'项目类型'},
						{prop:'business_type',lable:'业务类型',type:"keyvalue",child:{"1":"广告模板","2":"广告图","3":"场景锁屏","4":"主题"}},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间',width:150},
						{prop:'bidding_time',lable:'中标时间',width:150},
						{prop:'deadline',lable:'截稿时间',width:150},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"projectstatus",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					list1: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'classify_name',lable:'项目类型'},
						{prop:'business_type',lable:'业务类型',type:"keyvalue",child:{"1":"广告模板","2":"广告图","3":"场景锁屏","4":"主题"}},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间',width:150},
						{prop:'bidding_time',lable:'中标时间',width:150},
						{prop:'deadline',lable:'截稿时间',width:150},
						{prop:'signup_num',lable:'报名人数'},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"projectstatus",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					list2: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'classify_name',lable:'项目类型'},
						{prop:'business_type',lable:'业务类型',type:"keyvalue",child:{"1":"广告模板","2":"广告图","3":"场景锁屏","4":"主题"}},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间',width:150},
						{prop:'bidding_time',lable:'中标时间',width:150},
						{prop:'deadline',lable:'截稿时间',width:150},
						{prop:'signup_num',lable:'报名人数'},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"projectstatus",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					list3: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'classify_name',lable:'项目类型'},
						{prop:'business_type',lable:'业务类型',type:"keyvalue",child:{"1":"广告模板","2":"广告图","3":"场景锁屏","4":"主题"}},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间',width:150},
						{prop:'bidding_time',lable:'中标时间',width:150},
						{prop:'deadline',lable:'截稿时间',width:150},
						{prop:'signup_num',lable:'报名人数'},
						{prop:'username',lable:'中标人'},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"projectstatus",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					list4: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'classify_name',lable:'项目类型'},
						{prop:'business_type',lable:'业务类型',type:"keyvalue",child:{"1":"广告模板","2":"广告图","3":"场景锁屏","4":"主题"}},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间',width:150},
						{prop:'bidding_time',lable:'中标时间',width:150},
						{prop:'deadline',lable:'截稿时间',width:150},
						{prop:'deadline',lable:'验收时间',width:150},
						{prop:'signup_num',lable:'报名人数'},
						{prop:'username',lable:'中标人'},
						{prop:'acceptance_price',lable:'验收价格'},
						{prop:'deduction_price',lable:'延迟交稿扣减'},
						{prop:'gain_share_price',lable:'收益加成'},
						{prop:'deal_price',lable:'成交价格'},
						{prop:'want_deal_type',lable:'成交方式',type:"keyvalue",child:{"1":"买断式","2":"加成式"}},
						{prop:'demand_id',lable:'需求ID'},
						{prop:'level',lable:'项目评级'},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"projectstatus",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					list5: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'classify_name',lable:'项目类型'},
						{prop:'business_type',lable:'业务类型',type:"keyvalue",child:{"1":"广告模板","2":"广告图","3":"场景锁屏","4":"主题"}},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间',width:150},
						{prop:'bidding_time',lable:'中标时间',width:150},
						{prop:'deadline',lable:'截稿时间',width:150},
						{prop:'signup_num',lable:'报名人数'},
						{prop:'username',lable:'中标人'},
						{lable:"当前状态",prop:"status",type:"status",statusclass:"projectstatus",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
						{prop:'terminate_reason',lable:'终止理由'},
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
									fun:"yulan",
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
									fun:"selectobj",
									accessid:"200062",
								},
								{
									name:(da)=>{
										return '预览';
									},
									fun:"yulan",
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
										return '补充合同ID';
									},
								/* 	filterdata:"is_recommend", */
									fun:"reject1",
									accessid:"200062",
								},
								{
									name:(da)=>{
										return '终止';
									},
									fun:"reject",
									accessid:"200062",
								},
								{
									name:(da)=>{
										if(da == '4'){
											return '验收审核';
										} else {
											return null;
										}
										
									},
									fun:"review",
									filterdata:"check_status", 
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
									fun:"up",
									accessid:"200060",
								},
								{
									name:(da)=>{
										
										return '验收报告';
										
									},
									fun:"presentation",
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
						{name:"项目ID",id:"project_id"},
						{name:"项目名称",id:"name"},
						{name:"业务类型",id:"business_type",child:[{name:"广告模板",id:"1"},{name:"广告图",id:"2"},{name:"场景锁屏",id:"3"},{name:"主题",id:"4"}]},
						{name:"领域范围",id:"fields"},
						{name:"额外赏金",id:"extra_reward"},
						{name:'发布时间',id:'publish_time',type:"time",child:[{name:'发布时间(开始)',id:'publish_time_start'},{name:'发布时间(开始)',id:'publish_time_end'}]},
						{name:'中标时间',id:'bidding_time',type:"time",child:[{name:'发布时间(开始)',id:'bidding_time_start'},{name:'发布时间(开始)',id:'bidding_time_end'}]},
						{name:'截稿时间',id:'deadline',type:"time",child:[{name:'发布时间(开始)',id:'deadline_start'},{name:'发布时间(开始)',id:'deadline_end'}]},
						{name:"",id:"project_id",type:"display"},
					],
					filterFields1:[
						{name:"项目ID",id:"project_id"},
						{name:"项目名称",id:"name"},
						{name:"业务类型",id:"business_type",child:[{name:"广告模板",id:"1"},{name:"广告图",id:"2"},{name:"场景锁屏",id:"3"},{name:"主题",id:"4"}]},
						{name:"领域范围",id:"fields"},
						{name:"额外赏金",id:"extra_reward"},
						{name:'发布时间',id:'publish_time',type:"time",child:[{name:'发布时间(开始)',id:'publish_time_start'},{name:'发布时间(开始)',id:'publish_time_end'}]},
						{name:'中标时间',id:'bidding_time',type:"time",child:[{name:'发布时间(开始)',id:'bidding_time_start'},{name:'发布时间(开始)',id:'bidding_time_end'}]},
						{name:'截稿时间',id:'deadline',type:"time",child:[{name:'发布时间(开始)',id:'deadline_start'},{name:'发布时间(开始)',id:'deadline_end'}]},
						{name:"",id:"project_id",type:"display"},
					],
					filterFields2:[
						{name:"项目ID",id:"project_id"},
						{name:"项目名称",id:"name"},
						{name:"业务类型",id:"business_type",child:[{name:"广告模板",id:"1"},{name:"广告图",id:"2"},{name:"场景锁屏",id:"3"},{name:"主题",id:"4"}]},
						{name:"领域范围",id:"fields"},
						{name:"额外赏金",id:"extra_reward"},
						{name:'发布时间',id:'publish_time',type:"time",child:[{name:'发布时间(开始)',id:'publish_time_start'},{name:'发布时间(开始)',id:'publish_time_end'}]},
						{name:'中标时间',id:'bidding_time',type:"time",child:[{name:'发布时间(开始)',id:'bidding_time_start'},{name:'发布时间(开始)',id:'bidding_time_end'}]},
						{name:'截稿时间',id:'deadline',type:"time",child:[{name:'发布时间(开始)',id:'deadline_start'},{name:'发布时间(开始)',id:'deadline_end'}]},
						{name:"",id:"project_id",type:"display"},
					],
					filterFields3:[
						{name:"项目ID",id:"project_id"},
						{name:"项目名称",id:"name"},
						{name:"业务类型",id:"business_type",child:[{name:"广告模板",id:"1"},{name:"广告图",id:"2"},{name:"场景锁屏",id:"3"},{name:"主题",id:"4"}]},
						{name:"领域范围",id:"fields"},
						{name:"额外赏金",id:"extra_reward"},
						{name:'发布时间',id:'publish_time',type:"time",child:[{name:'发布时间(开始)',id:'publish_time_start'},{name:'发布时间(开始)',id:'publish_time_end'}]},
						{name:'中标时间',id:'bidding_time',type:"time",child:[{name:'发布时间(开始)',id:'bidding_time_start'},{name:'发布时间(开始)',id:'bidding_time_end'}]},
						{name:'截稿时间',id:'deadline',type:"time",child:[{name:'发布时间(开始)',id:'deadline_start'},{name:'发布时间(开始)',id:'deadline_end'}]},
						{name:"中标人昵称",id:"username"},
						{name:"中标人手机号",id:"mobile"},
						{name:"状态",id:"status",child:[{name:"禁用",id:"0"},{name:"启用",id:"1"}]},
						{name:"",id:"project_id",type:"display"},
					],
					filterFields4:[
						{name:"项目ID",id:"project_id"},
						{name:"项目名称",id:"name"},
						{name:"业务类型",id:"business_type",child:[{name:"广告模板",id:"1"},{name:"广告图",id:"2"},{name:"场景锁屏",id:"3"},{name:"主题",id:"4"}]},
						{name:"领域范围",id:"fields"},
						{name:"额外赏金",id:"extra_reward"},
						{name:'发布时间',id:'publish_time',type:"time",child:[{name:'发布时间(开始)',id:'publish_time_start'},{name:'发布时间(开始)',id:'publish_time_end'}]},
						{name:'中标时间',id:'bidding_time',type:"time",child:[{name:'发布时间(开始)',id:'bidding_time_start'},{name:'发布时间(开始)',id:'bidding_time_end'}]},
						{name:'截稿时间',id:'deadline',type:"time",child:[{name:'发布时间(开始)',id:'deadline_start'},{name:'发布时间(开始)',id:'deadline_end'}]},
						{name:"中标人昵称",id:"username"},
						{name:"中标人手机号",id:"mobile"},
						{type:"display",prop:'t',lable:'额外赏金'},
					],
					'filterFields5':[
						{name:"项目ID",id:"project_id"},
						{name:"项目名称",id:"name"},
						{name:"业务类型",id:"business_type",child:[{name:"广告模板",id:"1"},{name:"广告图",id:"2"},{name:"场景锁屏",id:"3"},{name:"主题",id:"4"}]},
						{name:"领域范围",id:"fields"},
						{name:"额外赏金",id:"extra_reward"},
						{name:'发布时间',id:'publish_time',type:"time",child:[{name:'发布时间(开始)',id:'publish_time_start'},{name:'发布时间(开始)',id:'publish_time_end'}]},
						{name:'中标时间',id:'bidding_time',type:"time",child:[{name:'发布时间(开始)',id:'bidding_time_start'},{name:'发布时间(开始)',id:'bidding_time_end'}]},
						{name:'截稿时间',id:'deadline',type:"time",child:[{name:'发布时间(开始)',id:'deadline_start'},{name:'发布时间(开始)',id:'deadline_end'}]},
						/* {name:"中标人昵称",id:"username"},
						{name:"中标人手机号",id:"mobile"}, */
						{type:"display",prop:'t',lable:'额外赏金'},
					]
				},
				
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
			},
			supply(){
				let row = this.crow;
				this.api.bindContract({
					access_token:localStorage.getItem("access_token"),
					project_id:row.project_id,
					contract_id:this.contract_id 
				}).then(da=>{
					if(da.result == 0){
						this.$refs.Tabledd.getTabData();
						this.centerDialogVisible1=false;
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
					path:"/projectManagement/projectList/projectDetial",
					query:{
						id: row.project_id,
						status:row.status
					}
				})
				
			},
			setpage(){
				localStorage.setItem("projectlist",this.$refs.Tabledd.tabnums);
			},
		},
		created() {
			this.getData()
		},
		mounted() {
			
		},
		watch:{
			
		}
	}
</script>
<style>
	
</style>
