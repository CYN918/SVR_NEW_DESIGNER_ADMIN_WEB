<template>
<div>
	<common-top :commonTopData="projectDetialTopData"></common-top>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<div class="textcenter">
				<span v-for="(item, idx) in tabData" :key="idx" :class="compData.zj == item.zj ? 'tabs tabactive' : 'tabs'" 
				 @click="tabsChange(item.zj)">
					{{ item.name}}
				</span>				
			</div> 
		</div>	
		<component v-bind:is="compData.zj" v-model="compData"></component>				
		<div class="detailContent ofh">
			<div class="screenContent detailbtn" v-if="detailbtn">
				<button class="defaultbtn" @click="getparent()">返回</button>				
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import commonTable from '@/components/commonTable2.vue'
	import commonTop from '@/components/commonTop.vue'
	import reviewinfocommon from '../../views/review/reviewinfocommon'

	import Cent from './cent'
	import bmList from './longP/bmList'
	import xmInfo from './longP/xmInfo'
	import xmCont from './longP/xmCont'
	import zxm from './longP/zxm'
	export default {
		components:{
			commonTable,
			commonTop,
			reviewinfocommon,
			Cent,
			bmList,
			xmInfo,
			xmCont,
			zxm
		},
		data() {
			return {
				compData:{
					zj:'xmInfo',
					data:''
				},
				
				ywArr:[
					{name:"广告模板",id:"1"},
					{name:"广告图",id:"2"},
					{name:"场景主题",id:"3"},
					{name:"个性化主题",id:"4"},
					{id:"5",name:"来电秀"},
					{id:"7",name:"杂志锁屏"},	
					{id:"8",name:"投稿作品"},
					{id:"9",name:"贴纸花字（华为）"},
					{id:"6",name:"其他"},
				],
				projectDetialTopData: {
					"pageName": "projectDetial",
					"commonleftbtn": [],
					"commonrightbtn": [],
					"commonbottombtn": [],
					upload: true
				},
				type:2,
				tableData2:[
					{
						id:"3",
						name:"场景主题"
					},
					{
						id:"4",
						name:"个性化主题"
					},
					{
						id:"5",
						name:"来电秀"
					},
					{
						id:"6",
						name:"其他"
					},
					{
						id:"7",
						name:"杂志锁屏"
					}	
				],
				tabData: [
					{name: "基本信息",zj:'xmInfo'},
					{name: "详情介绍",zj:'xmCont'},
					{name: "报名列表",zj:'bmList'},
					{name: "子项目",zj:'zxm'},
				],
				tabsnum: 0,
				desc:[],
				baseInfo:[
					{
						name:"项目ID",
						id:"project_id",
						type:"text"
					},
					{
						name:"项目名称",
						id:"name",
						type:"text"
					},
					{
						name:"banner",
						id:"banner",
						type:"imgfeng"
					},
					{
						name:"业务类型",
						id:"business_type",
						type:"keyvalue",
						child:{"3":"场景主题","4":"个性化主题","5":"来电秀","6":"其他","7":"杂志锁屏"}
						
					},
					{
						name:"领域范围",
						id:"fields",
						type:"text"
					},
					{
						name:"预计收益",
						id:"expected_profit",
						type:"text",
					},
					{
						name:"额外赏金",
						id:"extra_reward",
						type:"text"
					},
					{
						name:"发布时间",
						id:"publish_time",
						type:"text"
					},
					{
						name:"报名截止时间",
						id:"deadline",
						type:"text"
					},
					{
						name:"制作周期",
						ids:{
							id0:"production_cycle_d",
							id1:"production_cycle_h"
						},
						type:"two"
					},
					{
						name:"绑定需求",
						id:"demand_id",
						type:"text"
					},
					{
						name:"报名人数",
						id:"signup_num",
						type:"text",
					},
					{
						name:"中标人",
						id:"username",
						type:"text",
						status:'2'
					},
					{
						name:"补充合同",
						id:"contract_id",
						type:"text",
						status:'3'
					},
					{
						name:"终止理由",
						id:"terminate_reason",
						type:"text",
						status:'-1'
					},
					{
						name:"当前状态",
						id:"status",
						type:"keyvalue",
						child:{
							"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"
						}
					}
				],
				yanshou:[
					{
						name:"验收价格",
						id:"acceptance_price",
						type:"text"
					},
					{
						name:"额外赏金",
						id:"extra_reward",
						type:"text"
					},
					{
						name:"延期交稿扣减",
						id:"deduction_price",
						type:"text"
					},
					{
						name:"收益加成",
						id:"gain_share_price",
						type:"text"
					},
					{
						name:"成交价格",
						id:"deal_price",
						type:"text"
					},
					{
						name:"成交方式",
						id:"deal_type",
						type:"keyvalue",
						child:{
							"1":"买断式",
							"2":"分成式"
						}
					},
					{
						name:"需求ID",
						id:"extra_reward",
						type:"text"
					},
					{
						name:"项目评级",
						id:"level",
						type:"text"
					},
					{
						name:"验收时间",
						id:"deadline",
						type:"text"
					},
					{
						name:"验收审核人",
						id:"admin_name",
						type:"text"
					}
				],
				employInfo:[],
				detailbtn:true,
				workselect:false,
				checkList: [],
				checkAll: ["1", "2", "3", "4", "5", "6"],
				work_info:{},
				material_list:{
				},
				hire_info:{},
				font_size:0,
				imgurl:"",
				isimgurl:false,
				openurls:[],
				videofid:"",
				audiofid:"",
				fid:"",
				centerDialogVisible:false,
				centerDialogVisible1:false,
				oneload:{},
				adminuseraccess:[],
				info:{},
				signupLists:[],
				tableConfig: {
					total:0,
					pagesize:50,
					currentpage:1,
				},
				tableConfig1: {
					url:"fileRecord",
					title:"项目发布",
					list: [
						{prop:{prop1:"file_name",prop2:"online_disk_url"},type:"urlfile",filetype:{name:"type",id:'1'},lable:'交稿文件/网盘链接'},
						{prop:{prop1:'file_size',prop2:"access_code"},type:"twokey",filetype:{name:"type",id:'1'},lable:'文件大小/提取密码'},
						{prop:'remark',lable:'备注说明'},
						{prop:'created_at',lable:'交稿时间'},
						{prop:'check_status',lable:'验收结果',type:"keyvalue",child:{"-2":"已撤销","-1":"已驳回","0":"待审核","1":"已验收"}},
						
					],
					project_id:"project_id"
				},
				tableConfig2: {
					num:true,
					url:"projectlist",
					title:"项目发布",
					list0: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'business_type',lable:'项目类型'},
						{prop:'template_num',lable:'业务类型'},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间'},
						{prop:'bidding_time',lable:'中标时间'},
						{prop:'deadline',lable:'截稿时间'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					list1: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'business_type',lable:'项目类型'},
						{prop:'template_num',lable:'业务类型'},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间'},
						{prop:'bidding_time',lable:'中标时间'},
						{prop:'deadline',lable:'截稿时间'},
						{prop:'signup_num',lable:'报名人数'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					list2: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'business_type',lable:'项目类型'},
						{prop:'template_num',lable:'业务类型'},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间'},
						{prop:'bidding_time',lable:'中标时间'},
						{prop:'deadline',lable:'截稿时间'},
						{prop:'signup_num',lable:'报名人数'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					project_id:"project_id",
					data:'status',
				},
				tableAction2: {
					morebtns:{
						
					},
					links:{
						name:(da)=>{
							return "添加"
						},
						accessid:"1",
						fun:"adduser",
					},
					
				},
				tableAction:{
					morebtns:{
						name:(da)=>{
							if(da == "1"){
								return "下载"
							} else {
								return ""
							}
							
						},
						accessid:"1",
						fun:"up",
						filterdata:"type"
					},
					links:{
						name:(da)=>{
							if(da == '0'){
								return "验收审核"
							} else {
								return null
							}
							
						},
						accessid:"1",
						fun:"check",
						filterdata:"check_status"
					},
						
					
				},
				filterFields0:[
					{name:"项目ID",id:"id"},
					{name:"项目名称",id:"name"},
					{name:"业务类型",id:"business_type",child:this.ywArr},
					{name:"领域范围",id:"fields"},
					{name:"额外赏金",id:"extra_reward"},
					{name:'发布时间',id:'publish_time',type:"time",child:[{name:'发布时间(开始)',id:'publish_time_start'},{name:'发布时间(开始)',id:'publish_time_end'}]},
					{name:'中标时间',id:'bidding_time',type:"time",child:[{name:'发布时间(开始)',id:'bidding_time_start'},{name:'发布时间(开始)',id:'bidding_time_end'}]},
					{name:'截稿时间',id:'deadline',type:"time",child:[{name:'发布时间(开始)',id:'deadline_start'},{name:'发布时间(开始)',id:'deadline_end'}]},
					{name:"",id:"project_id",type:"display"},
				],
				filterFields1:[
					{name:"项目ID",id:"id"},
					{name:"项目名称",id:"name"},
					{name:"业务类型",id:"business_type",child:this.ywArr},
					{name:"领域范围",id:"fields"},
					{name:"额外赏金",id:"extra_reward"},
					{name:'发布时间',id:'publish_time',type:"time",child:[{name:'发布时间(开始)',id:'publish_time_start'},{name:'发布时间(开始)',id:'publish_time_end'}]},
					{name:'中标时间',id:'bidding_time',type:"time",child:[{name:'发布时间(开始)',id:'bidding_time_start'},{name:'发布时间(开始)',id:'bidding_time_end'}]},
					{name:'截稿时间',id:'deadline',type:"time",child:[{name:'发布时间(开始)',id:'deadline_start'},{name:'发布时间(开始)',id:'deadline_end'}]},
					{name:"",id:"project_id",type:"display"},
				],
				filterFields2:[
					{name:"项目ID",id:"id"},
					{name:"项目名称",id:"name"},
					{name:"业务类型",id:"business_type",child:this.ywArr},
					{name:"领域范围",id:"fields"},
					{name:"额外赏金",id:"extra_reward"},
					{name:'发布时间',id:'publish_time',type:"time",child:[{name:'发布时间(开始)',id:'publish_time_start'},{name:'发布时间(开始)',id:'publish_time_end'}]},
					{name:'中标时间',id:'bidding_time',type:"time",child:[{name:'发布时间(开始)',id:'bidding_time_start'},{name:'发布时间(开始)',id:'bidding_time_end'}]},
					{name:'截稿时间',id:'deadline',type:"time",child:[{name:'发布时间(开始)',id:'deadline_start'},{name:'发布时间(开始)',id:'deadline_end'}]},
					{name:"",id:"project_id",type:"display"},
				],
				commonTopData1: {
					"pageName": "publishWork",
					"commonleftbtn": [],
					"commonrightbtn": [],
					"commonbottombtn":[
						
					],
					tabDatatitle:"交稿记录",
					is:true
				},
				commonTopData2: {
					"commonleftbtn": [{
						name: "筛选",
						fun: "ISshow"
					}],
					"commonrightbtn": [],
					"commonbottombtn":[],
					"tabData": [
						{name:"待发布"},
						{name:"招募期"},
						{name:"待选标"},
					],
					'tabnums':0,
				},
				status:0,
				project_id:"",
				username:"",
				usernameitem:"",
				form:{},
				dataProjectId: '',
				List:[],
				lisr:[],
				value:'',
				// datad:'',
				postData:{},
				evaluation:'',
				business_type:this.$route.query.business_type,
				dataList: [],
			}
		},
		methods: {
			chekdeal_type(a,b){
				if(!this.postData[a]){
					this.$set(this.postData,a,b);
					return
				}
				this.postData[a] = b;
			},
			ISshow(){
				this.$refs.Tabledd.reject();
			},
			ishide(){
				this.centerDialogVisible = false;
				this.centerDialogVisible1=true;
			},
			openwork(id){
				window.open( localStorage.getItem("baseURLs")+"/work/preview?work_id=" + id+"&access_token="+localStorage.getItem('access_token'));
			},
			arrchange(item){
				if(item){
					
					return item.split(",");
				} else {
					return [];
				}
			},
			gotouser(){
				this.tabsnum = 3
			},
			gotoweb(id){
				window.open(localStorage.getItem("URL")+"/#/works?id=" + id);
			},
			userdetail(open_id){
				const {href} = this.$router.resolve({ 
					path: '/userManager/userBaseInfo/userBaseInfoDetail',
					query:{
						open_id:open_id,
						hide:"hide"
				    }
				})
				window.open(href, '_blank');
			},
			check(row){
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
			up(row){
				window.open(row.download_file_url);
			},
			getselectUser(item){
				this.$confirm('确定将<span style="color:#ff5121">'+ item.user.username +'</span>定为<span style="color:#ff5121">'+ this.info.name +'</span>的中标制作人', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					customClass:"work",
					center: true
				}).then(() => {
					this.api.selectUser({
						access_token: localStorage.getItem("access_token"),
						project_id:item.project_id,
						open_id:item.user.open_id
					}).then(da => {
						if(da.result == 0){
							this.$message({
								message:'选标成功',
								type:"success"
							});
							this.$router.push({
								path:"/projectManagement/projectList",
								query:{
									tabsnum:3
								}
							})
						}
					}).catch(da => {
					
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			adduser(row){
				this.$confirm('确认将【'+ this.username +'】定为【' + row.name+'】的中标人', '', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString:true,
					type: '',
					center: true
				}).then(() => {

					this.api.selectUser({
						access_token:localStorage.getItem('access_token'),
						project_id:row.project_id,
						open_id:this.usernameitem.open_id
					}).then(da => {
						
						if(da.result == 0){
							this.$router.push({
								path:"/projectManagement/projectList",
								query:{
									tabsnum:3
								}
							})
						}
					}).catch(() => {
					
					})
					
				}).catch(() => {
					this.$message({
					  type: 'info',
					  message: '已经取消'
					});
					this.$refs.Tabledd.setinit();
				});
			},
			getAddData(){
				let data = {};
				data = {
					access_token: localStorage.getItem("access_token"),
				}
				this.api.projectgetid(data).then((da) => {
					this.dataProjectId = da;
					// this.dataList.sort(function(a,b){
					//     return b.id - a.id
					// })
				}).catch(() => {
					
				});

			},
			addnewuser(row){
				this.usernameitem['dataProjectId'] = this.dataProjectId;
				this.$router.push({
					path:"/projectManagement/projectList/newproject",
					query:{
						usernameitem: JSON.stringify(this.usernameitem),
						id:this.dataProjectId
					}
				})
			},
			feipei(n,item){
				this.centerDialogVisible = true;
				this.username = n;
				this.usernameitem = item; 
			},
			zhipai(){
				this.api.projectdetail({
					project_id:this.info.project_id,
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.usernameitem['dataProjectId'] = this.dataProjectId;
					this.$router.push({
						path:"/projectManagement/projectList/newproject",
						query:{
							copyData: JSON.stringify(da),
							usernameitem: JSON.stringify(this.usernameitem),
						}
					})

				})	
							
			},
			handleSizeChange(val) {
				this.tableConfig.pagesize = val;
				this.getTabData();
				this.$nextTick(() => {
					this.$refs.elememt.scrollTo(0,'34px');
				})
			},
			handleCurrentChange(val) {
				this.tableConfig.currentpage = val;
				this.getTabData();
				this.$nextTick(() => {
					this.$refs.elememt.scrollTo(0,'34px');
				})
			},
			getimgulr(url){
				this.imgurl = url;
				this.isimgurl = !this.isimgurl
			},
			showvideo(fid){
				if(this.videofid){
					document.getElementById(this.videofid).pause();
				}
				this.videofid = fid;
				document.getElementById(fid).play();
			},
			showaudio(fid){
				if(this.audiofid){
					document.getElementById(this.audiofid).pause();
				}
				this.audiofid = fid;
				document.getElementById(fid).play();
			},
			getparent() {
				this.$router.push({
					path:"/projectManagement/projectList",
					query:{
						tabsnum:localStorage.getItem('projectlist')
					}
				})
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			tabsChange(num) {
				this.compData.zj = num;
				// this.tabsnum = num;
				// if (this.tabsnum == 2) {
				// 	this.fileRecord();
				// 	this.detailbtn = false;
				// } else {
				// 	this.detailbtn = true;
				// }
			},
			fileRecord(num){
				this.api.fileRecord({
					project_id:this.$route.query.id,
					access_token:localStorage.getItem("access_token"),
					limit:this.tableConfig.pagesize,
					page:this.tableConfig.currentpage,
					check_status:num,
				}).then(da => {
					this.dataList = da.data;
				}).catch(da =>{
					
				})

			},
			showselectwork() {
				this.detailbtn = !this.detailbtn;
				this.workselect = !this.workselect;
			},
			getworkdetial(){
				this.api.projectdetail({
					project_id:this.$route.query.id,
					access_token:localStorage.getItem("access_token")
				}).then(da => {
					this.info = da;
					console.log(22222222)
					if(this.compData.zj=='xmInfo'){
						this.compData.data = da;
						console.log(this.compData)
					}
					this.desc = JSON.parse(da.desc);
					if(da.evaluate_result != ''){
						this.evaluation = da.evaluate_result;
						this.postData = JSON.parse(da.evaluate_result);
						this.value = JSON.parse(da.evaluate_result)[7]
					}
					
				}).catch(da =>{
					
				})
			},
			signupList(){
				let data={
					project_id:this.$route.query.id,
					access_token:localStorage.getItem("access_token"),
					limit:this.tableConfig.pagesize,
					page:this.tableConfig.currentpage
				}
				
				this.api.signupList(data).then(da => {
					this.signupLists = da.data;
					this.tableConfig.total = da.total;
				}).catch(da =>{
					
				})
			},
			pr_question(){
				let data={
					access_token:localStorage.getItem("access_token"),
				}
				this.api.pr_question(data).then(da => {
					if(da=='error'){					
						return
					}		
					for(let i=0,n=da.length;i<n;i++){
						this.lisr.push(da[i].id);
					}		
							
					this.List = da;

				}).catch(da => {

				})

			},
			openwindow(url){
				window.open(url)
			},
			gotodetail(name,fid,num){
				this.router.push({
					path:"/workManager/materialBank/materialBankdetail",
					query:{tabsnum:num,name:name,fid:fid}
				})
			},
			hover(fid,url,na){
				this.fid = fid;
				this.oneload = {
					name:na,
					id:url
				}
			},
			handleCheckedCitiesChange(val){
				//console.log(val
				this.font_size = 0;
				this.openurls = [];
				val.forEach((item,index) =>{
					//console.log(item.split(",")[1])
					this.font_size += Number(item.split(",")[2]);
					this.openurls.push({name:item.split(",")[3],id:item.split(",")[0]});
				});
				//console.log(this.openurls);
			},
			
		},
		created() {
			this.pr_question();
			this.getworkdetial();
			this.signupList();
			this.getAddData();
			this.status = parseInt(this.$route.query.status);
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
			this.project_id = this.$route.query.id;
			if(this.$route.query.index){
				this.tabsnum = this.$route.query.index;
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
	#tablebg .el-dialog__wrapper{
		background: rgba(0,0,0,0.5);
	}
	.detailContent .detailContent0 ul {
		padding: 0;
	}
	
	.detailContent .el-carousel__indicators{
		padding: 0;
		bottom: 85px;
	}
	
	.el-carousel__button{
		border-radius: 50%;
		padding: 0;
		width: 6px;
		height: 6px;
	}
	
	.el-carousel__container {
		width: 100%;
		height: 100%;
	}
	.labelbtn{
		padding: 3px 5px;
		background:rgba(244,246,249,1);
		border-radius:5px;
		display: inline-block;
		font-weight:400;
		color:#999999;
		font-size: 12px;
	}
	.signlistwork{
		width: 310px;
		height: 232px;
		border-radius:5px 5px 0px 0px;
	}
	.signlist {
		padding: 20px;
		border-radius:5px;
		border:1px solid rgba(153,153,153,1);
		float: left;
		margin-top: 10px;
		margin-left: 10px;
	}
	
	.signl {
		width:310px;
		height:327px;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 10px 0px rgba(0,0,0,0.06);
		border-radius:5px;
	}
	
	.materiallist .el-checkbox__label {
		display: none;
	}
	
	/* .work .el-button--primary{
		background: #FF5121;
		border-color: #FF5121;
	} */
	
	#bottoms .el-pager{
		padding: 0;
	}
	#projectDetial .el-carousel__arrow{
		top:37%;
	}
</style>

<style scoped>
	.Detail {
		background: white;
	}

	.Dialogkey {
		margin: 0 33px 26px 66px;
		width: 84px;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.margint13 {
		margin-bottom: 13px;
	}

	.detailKey {
		width: 160px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
	}

	.detailValueImg {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		background: red;
	}

	.detailKeyImg {
		line-height: 68px;
	}

	.routerLink {
		color: #FF5121;
	}

	.detailbtn {
		height: 100px;
	}

	.squareImg {
		width: 160px;
		height: 102px;
		background: red;
	}

	.roles-input {
		height: 40px;
		line-height: 40px;
	}

	.width500 {
		width: 500px;
	}

	.roles-input input {
		height: 100%;
		width: 400px;
	}

	.roletree {
		height: 460px;
		border: 1px solid #D9D9D9;
		display: inline-block;
		overflow-y: auto;
		border-radius: 5px;
	}

	.account-ipt {
		padding: 10px;
		text-align: center;
		border: 1px solid #999999;
		border-radius: 5px;
	}

	

	.materiallist {
		display: flex;
		overflow: hidden;
		flex-wrap: wrap;
		justify-content: flex-start
	}

	.materiallist li {
		margin: 0 17px 17px 0;
	}

	.material {
		width: 239px;
		height: 135px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
		border-radius: 5px;
		background: #F9F9F9;
	}

	.material-fu {
		width: 60px;
		height: 68px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -34px;
		margin-left: -30px;
	}

	.material-bo {
		width: 32px;
		height: 32px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -16px;
		margin-left: -16px;
	}

	.material-checkbox {
		position: absolute;
		top: 6px;
		right: 10px;
	}

	.materialdownload {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.color66 {
		color: #666666;
		margin-top: 3px;
		overflow: hidden;
		font-size: 14px;
	}

	.el-message-box--center .el-message-box__title {
		justify-content: left;
	}

	.sel-alert {
		width: 406px;
	}

	.el-message-box__header,
	.el-dialog__header {
		padding: 27px 30px !important;

	}

	.el-dialog__title {
		font-size: 16px !important;
	}

	.el-dialog__body {
		padding: 27px 0 27px !important;
		border-top: 1px solid #e6e6e6;
	}

	.el-radio-group {
		display: block;
	}

	.el-dialog__headerbtn {
		position: "";
		float: right;
		font-size: 18px;
	}

	.sel-footer {
		display: block;
		text-align: center;
	}

	.el-radio {
		line-height: 28px;
	}

	.el-radio__input.is-checked .el-radio__inner,
	.el-button--primary {
		background: #FF5121;
		border-color: #FF5121;
	}

	.el-button--primary:focus,
	.el-button--primary:hover {
		background: #FF5121;
		border-color: #FF5121;
	}

	[class*=" el-icon-"],
	[class^=el-icon-] {
		line-height: 2;
	}

	.sel-radio-title {
		position: absolute;
		left: 30px;
	}

	.font12 {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #999999;
	}

	.el-message-box--center .el-message-box__content {
		padding: 20px 0 37px;
		border-top: 1px solid #E6E6E6;
	}

	.workbtn {
		width: 70px;
	}
	
	.employipt{
		height: 40px;
		line-height: 40px;
		margin: 30px;
	}
	
	.employmonre {
		width: 300px;
		display: inline-block;
		margin: 0 20px;
	}
	
	.employmonre input {
		width: 200px;
		height: 100%;
		margin-left: 5px;
	}
	.question_00{
		/* overflow: hidden; */
		padding: 30px 40px 0;
		width: 750px;
		text-align: left;
	}
	.question_01{
		font-size:16px;
		font-weight:400;
		color:rgba(40,40,40,1);
		line-height:22px;
		margin-bottom: 30px;
		padding-left: 132px;
	}
	.question_02{
		padding-top: 0px !important;
	}
	.question_02>li{
		margin-bottom: 23px;
	}
	.ques_01{
		font-size:14px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:20px;
		margin-bottom: 13px;
	}

	.ques_02 span{
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-right: 8px;
		width:14px;
		height:14px;
		background:rgba(255,255,255,1);
		border-radius:2px;
		border:1px solid rgba(217,217,217,1);
	}
	.ques_02 label{
		cursor: pointer;
		margin-right: 20px;
	}
	.ques_02 span.chekdOn{
		background: #33B3FF;
		border-color: #33B3FF;
	}
	.ques_02 span.chekdOn:after{
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 8px;
		height: 4px;
		border: 1px solid #fff;
		border-top: 0;
		border-right: 0;
		-webkit-transform: rotate(-58deg) translate(-21%,76%);
		transform: rotate(-58deg) translate(-21%,76%);
	}
	.ques_03{
		position: relative;
	}
	.ques_03>textarea{
		box-sizing: border-box;
		padding: 15px 20px;
		width:500px;
		height:150px;
		border-radius:5px;
		border:1px solid rgba(187,187,187,1);
	}
	.ques_03 .maxd_ss{
		position: absolute;
		bottom: 13px;
		left: 444px;
		font-size:14px;
		font-weight:400;
		color:rgba(187,187,187,1);
		line-height:20px;
	}
	.teShu{
		color: #33B3FF;
		font-weight: bold;
	}
	
</style>
