<template>
  <div class="wh">
	<div class="wh">
		<common-top :commonTopData="commonTopData"></common-top>
		<div class="calc205">
			<common-table
				:screenConfig="screenConfig" 
				:tableConfig="tableConfig" 
				:tableDatas="tableData"
				:tableAction = "tableAction"
				ref="Tabledd"
			></common-table>
		</div>
	</div>
	<el-dialog title="批量操作-设为平台推荐创作者" :visible.sync="centerDialogVisible" width="406px">
	  <div style="position: relative;">
		<div class="sel-radio-title">
			<div style="color: #1E1E1E;">推荐评级</div>
			<div class="font12">已选择{{ selectData.length }}条数据</div>
		</div>
	    <el-radio-group v-model="radioS" class="sel-dialog-content">
			<div class="w textcenter sel-radio">
				<el-radio label="S">S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大神级</el-radio>
			</div>
			<div class="w textcenter sel-radio">
				<el-radio label="A">A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专家级</el-radio>
			</div>
			<div class="w textcenter sel-radio">
				<el-radio label="B">B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;普通级</el-radio>
			</div>
			<div class="w textcenter sel-radio">
				<el-radio label="C">C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业余级</el-radio>
			</div>
			<div class="w textcenter sel-radio">
				<el-radio label="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不推荐</el-radio>
			</div>
		</el-radio-group>
	  </div>
	  <span slot="footer" class="dialog-footer sel-footer">
		<el-button type="primary" @click="contributor">确 定</el-button>
	  </span>
	</el-dialog>
	<el-dialog title="用户基础信息-设为平台推荐创作者" :visible.sync="centerDialogVisible1" width="406px">
	  <div style="position: relative;">
		<ul>
			<li class="w ofh">
				<span class="fleft Dialogkey">用户ID</span>
				<span class="fleft">{{ selectOne.open_id }}</span>
			</li>
			<li class="w ofh">
				<span class="fleft Dialogkey">用户昵称</span>
				<span>{{ selectOne.username }}</span>
			</li>
			<li class="w ofh">
				<span class="fleft Dialogkey">
					推荐等级
				</span>
				<el-radio-group v-model="radioS" class="sel-dialog-content fleft">
					<div class="w textcenter sel-radio">
						<el-radio label="S">S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大神级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="A">A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专家级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="B">B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;普通级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="C">C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业余级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不推荐</el-radio>
					</div>
				</el-radio-group>
			</li>
		</ul>
	    
	  </div>
	  <span slot="footer" class="dialog-footer sel-footer">
		<el-button type="primary" @click="contributor1">确 定</el-button>
	  </span>
	</el-dialog>
  </div>
</template>

<script>
	import commonTop from '@/components/commonTop.vue'
	import commonTable from '@/components/commonTable.vue'
	import userBaseInfoDetail from '@/views/userManager/userBaseInfoDetail.vue'
	import DataScreen from "@/assets/DataScreen.js"

	export default {
		components:{
			commonTop,
			commonTable,
			userBaseInfoDetail
		},
		props:{},
		data(){
			return {
				centerDialogVisible:false,
				centerDialogVisible1:false,
				bts:DataScreen.screenShow.userBaseInfo.bts,
				defaultbts:DataScreen.screenShow.userBaseInfo.defaults,
				tableAction:DataScreen.screenShow.userBaseInfo.action,
				filterFields:DataScreen.screen.userBaseInfo.filterFields,
				screenShowDataChange:"",
				IsDetail:false,
				commonTopData:{
					"pageName":"userBaseInfo",
					"commonleftbtn":[
						{name:"筛选",id:"left1"},
						{name:'展示字筛选',id:"right2"},
						{name:'导出数据',id:"right3",accessid:"200046"}
				    ],
				    "commonrightbtn":[
						{name:'批量操作',id:"right1",accessid:"200044"},	
					],
					"commonbottombtn":[],
				},
				screenConfig:[],
				tableConfig:{
					"pageName":"userBaseInfo",
					primaryKey: 'open_id',
					total:0,
					currentpage:1,
					pagesize:50,
					list:[],
					ischeck:true,
					
				},
				tableData:[],
				detailData:{},
				radioS:"",
				selectData:[],
				selectOne:{},
				isajax:0,
				seltotal:"",
			}
			
		},
		methods:{
			setLoding(type){
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg){
				//获取子组件表格数据
				this.tableData = [];
				var data = {
					access_token:localStorage.getItem("access_token"),
					page:pg.pageCurrent,
					limit:pg.pageSize
				}
				//获取筛选的条件
				//console.log(JSON.parse(this.$route.query.urlDate))\
				if(this.isajax==1){
					return
				}
				this.isajax=1;
				if(this.$route.query.urlDate){
					const sreenData = JSON.parse(this.$route.query.urlDate);
					console.log(JSON.parse(this.$route.query.urlDate))
				    sreenData.page = pg.pageCurrent;
				    sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
				
				this.api.getUserList(data).then((da)=>{
					this.isajax=0;
					
					//console.log(da.data)
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					
					if(this.tableConfig.ischeck){
						this.$refs.Tabledd.change(da.data);
					}
					this.setLoding(false)
				}).catch(()=>{
					this.isajax=0;
					this.setLoding(false)
				});	 
					
					/* this.setLoding(false); */
			},
			getScreenShowData(){
			  //获取字段展示-筛选修改
			  eventBus.$on("screenShowDataChange",(data)=> {
				this.forshowkey(data)
			  });
			  
			  //获取字段展示-筛选初始化
			  if(localStorage.getItem("screenShowDataChange")){
				this.forshowkey(localStorage.getItem("screenShowDataChange").split(',')) 
			  }else{
				this.forshowkey(this.defaultbts); 
			  }
			},
			forshowkey(data){
				//筛选展示字段
				this.tableConfig.list = [];
				this.bts.forEach(item => {
					const val = item;
					data.forEach(item1 =>{
						if(val.prop == item1){
							this.tableConfig.list.push(val)
						}
					})
				})
			},
			screenreach(){
				eventBus.$on("sreenData",(data) =>{
					this.getcommonrightbtn();
					this.getData({pageCurrent:1,pageSize:50});
				})
			},
			linkDetail(id){
				//alert(id);
				this.IsDetail = true;
				this.api.getUserInfo({open_id:id}).then(da => {
					this.detailData = da;
				}).catch(()=>{
					
				})
			},
			setContributor(val){
				this.selectOne = val;
				this.radioS = val.recommend_level;
				this.centerDialogVisible1 = true;
			},
			contributor1(){
				//console.log(openids)
				//console.log(this.selectData);
				
				var open_ids = this.getopenids();
			    this.centerDialogVisible = false;
				this.centerDialogVisible1 = false;
				
				let data = {
					open_id:open_ids,
					level:this.radioS,
					access_token:localStorage.getItem("access_token")
				};
				this.api.setRecommendLevel(data).then(da=>{
					this.getData({pageCurrent:1,pageSize:50});
				}).catch(da=>{
					
				})
				
			    
			},
			contributor(){
				//console.log(openids)
				//console.log(this.selectData);
				
				var open_ids = this.getopenids();
			    this.centerDialogVisible = false;
				this.centerDialogVisible1 = false;
				
				this.api.getRecommendCount({
					access_token:localStorage.getItem("access_token"),
					open_ids:open_ids
				}).then(da =>{
					//console.log(da);
					this.$confirm('有'+ da +'位用已经是平台推荐创作者</br>是否统一将推荐评级修改为' + this.radioS, '确认修改', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						dangerouslyUseHTMLString:true,
						type: '',
						center: true
					}).then(() => {
						//console.log({open_ids:openids,level:this.radioS})
						let data = {
							open_id:open_ids,
							level:this.radioS,
							access_token:localStorage.getItem("access_token")
						};
						
						if(this.$refs.Tabledd.sel == false) {
							data = {};
							if(this.$route.query.urlDate){
							    data = JSON.parse(this.$route.query.urlDate);
							}
							data.access_token = localStorage.getItem("access_token");
							data.level = this.radioS;
						} 
						
						this.api.setRecommendLevel(data).then(da=>{
							this.$refs.Tabledd.setinit();
						}).catch(da=>{
							this.$refs.Tabledd.setinit();
						})
					}).catch(() => {
						this.$message({
						  type: 'info',
						  message: '已经取消'
						});
						this.$refs.Tabledd.setinit();
					});
				})
			},
			export(){
				this.$confirm('确认导出', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					this.setexport({pageCurrent:1,pageSize:50},1);
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			setexport(pg,is_export){
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
					is_export:is_export
				}
				//获取筛选的条件
				//console.log(JSON.parse(this.$route.query.urlDate))
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.is_export = is_export;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
				let form = document.createElement("form");
				for(let key in data){
					let dom =document.createElement("input");
					dom.setAttribute("name",key);
					dom.setAttribute("value",data[key]);
					form.appendChild(dom);
				};
				form.setAttribute("style", "display:none");
				form.setAttribute("target", "");
				form.setAttribute("method", "post");
				form.setAttribute("action", "http://dev-api-ndesigner-admin.idatachain.cn/admin/User/getUserList")
				if(window.location.host=='shiquaner-admin.zookingsoft.com'){
				   form.setAttribute("action", "http://shiquaner-admin-api.zookingsoft.com/admin/User/getUserList")
				}
				if(window.location.host=='120.27.22.130:8082'){
					form.setAttribute('action', 'http://120.27.22.130:8082/admin/User/getUserList')
				}
				document.body.appendChild(form);
				form.submit();
			},
			getopenids(){
				//console.log(this.selectData);
				var openids = '';
				this.selectData.forEach((item,index)=>{
					openids +=  (index == (this.selectData.length-1)) ?  item.open_id : item.open_id +",";
				})
				if(this.centerDialogVisible) {
					openids = openids
				};
				
				if(this.centerDialogVisible1) {
					openids = this.selectOne.open_id;
				}
				return openids;
			},
			getcommonrightbtn(){
				this.commonTopData.commonbottombtn = [];
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate);
					//console.log(urldata);
					this.filterFields.forEach(item=>{
						//console.log(item);
						if(urldata[item.id] && !item.type){
							var val = urldata[item.id];
							//alert(val)
							if(item.child){	
								val = "";
								item.child.forEach(citem=>{
									//alert(urldata[item.id])
									if(citem.id == urldata[item.id]){
										val = citem.name;
									}
								})
							} 
							this.commonTopData.commonbottombtn.push({btnName:item.name,val:val,id:item.id});
							//console.log(this.commonTopData.commonbottombtn);
						}
						if(item.type == "more"){
							if(urldata[item.id]){
								this.commonTopData.commonbottombtn.push({btnName:item.name,val:urldata[item.id],id:item.id})
							}
								
						}
						if(item.type == "two"){
							if(item.child){
								item.child.forEach(citem=>{
									if(urldata[citem.id]){
										this.commonTopData.commonbottombtn.push({btnName:citem.name,val:urldata[citem.id],id:citem.id})
									}
								})
							}
						}
						if(item.type == "three"){
							if(item.child){
								item.child.forEach(citem=>{
									if(urldata[citem.id]){
										this.commonTopData.commonbottombtn.push({btnName:citem.name,val:urldata[citem.id],id:citem.id})
									}
								})
							}
						}
						if(item.type == "time"){
							if(item.child){
								item.child.forEach(citem=>{
									if(urldata[citem.id]){
										this.commonTopData.commonbottombtn.push({btnName:citem.name,val:urldata[citem.id],id:citem.id})
									}
								})
							}
						}
					})
				}
				
			},
			resetSave(tag){
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					this.$router.push({path:'/userManager/userBaseInfo',query:{urlDate:JSON.stringify(urldata)}});
				}
			}
		},
		created() {
			this.getScreenShowData();
			this.screenreach();
			this.getcommonrightbtn();
		},
		mounted(){
			//console.log(this.tableConfig)
			this.getData({pageCurrent:1,pageSize:50});
		},
		watch:{
			"$route":function(){
				this.screenreach();
				this.getcommonrightbtn();
				this.getData({pageCurrent:1,pageSize:50});
				this.getScreenShowData();
			}
		}
	}
</script>
<style lang="scss">
	.Dialogkey {
		margin: 0 33px 26px 66px;
		width: 57px;
	}
	.el-message-box--center .el-message-box__title{
		justify-content:left;
	}
	.sel-alert{
		width:406px;
	}
	
	.el-message-box__header,.el-dialog__header{
		padding:27px 30px !important;
		
	}
	
	.el-dialog__title{
		font-size:16px !important;
	}
	
	.el-dialog__body{
		padding:27px 0 27px !important;
		border-top:1px solid #e6e6e6;
	}
	
	.el-radio-group{
		display: block;
	}
	
	.el-dialog__headerbtn{
		position: "";
		float: right;
		font-size: 18px;
	}
	
	.sel-footer {
		display:block;
		text-align: center;
	}
	
	.el-radio{
		line-height: 28px;
	}
	
	// .el-radio__input.is-checked .el-radio__inner,.el-button--primary{
	// 	background: #FF5121;
	// 	border-color: #FF5121;
	// }
	
	.el-radio__input.is-checked+.el-radio__label{
		color: #FF5121;
	}
	
	.el-button--primary:focus, .el-button--primary:hover{
		background: #FF5121;
		border-color: #FF5121;
	}
	[class*=" el-icon-"], [class^=el-icon-]{
		line-height: 2;
	}
	
	.sel-radio-title{
		position: absolute;
		left:30px;
	}
	
	.font12{
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #999999;
	}
	.el-message-box--center .el-message-box__content{
		padding: 20px 0 37px;
		border-top: 1px solid #E6E6E6;
	}
	
	
	/* .el-button--small, .el-button--small.is-round{
		width: 100px;
		height: 40px;
	} */
	
	/* .el-button:focus, .el-button:hover{
		border-color: #FF5121;
		color: #FF5121;
	} */
</style>