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
				<el-radio label="A">A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大神级</el-radio>
			</div>
			<div class="w textcenter sel-radio">
				<el-radio label="B">B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专家级</el-radio>
			</div>
			<div class="w textcenter sel-radio">
				<el-radio label="C">C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;普通级</el-radio>
			</div>
			<div class="w textcenter sel-radio">
				<el-radio label="S">D&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业余级</el-radio>
			</div>
		</el-radio-group>
	  </div>
	  <span slot="footer" class="dialog-footer sel-footer">
		<el-button type="primary" @click="contributor">确 定</el-button>
	  </span>
	</el-dialog>
	<el-dialog title="录用订单-筛选" :visible.sync="centerDialogVisible1" width="406px">
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
						<el-radio label="A">A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大神级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="B">B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专家级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="C">C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;普通级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="S">D&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业余级</el-radio>
					</div>
				</el-radio-group>
			</li>
		</ul>
	    
	  </div>
	  <span slot="footer" class="dialog-footer sel-footer">
		<el-button type="primary" @click="contributor">确 定</el-button>
	  </span>
	</el-dialog>
  </div>
</template>

<script>
	import commonTop from '@/components/commonTop.vue'
	import commonTable from '@/components/commonTable.vue'
	import DataScreen from "@/assets/DataScreen.js"

	export default {
		components:{
			commonTop,
			commonTable
		},
		props:{},
		data(){
			return {
				centerDialogVisible:false,
				centerDialogVisible1:false,
				bts:DataScreen.screenShow.employmentorder.bts,
				defaultbts:DataScreen.screenShow.employmentorder.defaults,
				tableAction:DataScreen.screenShow.employmentorder.action,
				filterFields:DataScreen.screen.employmentorder.filterFields,
				screenShowDataChange:"",
				IsDetail:false,
				commonTopData:{
					"pageName":"employmentorder",
					"commonleftbtn":[
						{name:"筛选",id:"left1",url:""},
				    ],
				    "commonrightbtn":[
						{name:'展示字筛选',id:"right2"},
						{name:'导出数据',id:"right3"}
					],
					"commonbottombtn":[],
				},
				screenConfig:[],
				tableConfig:{
					"pageName":"employmentorder",
					total:0,
					currentpage:1,
					pagesize:10,
					list:[],
					ischeck:true,
					
				},
				tableData:[],
				detailData:{},
				radioS:"C",
				selectData:[],
				selectOne:{},
			}
		},
		methods:{
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg){
				//获取子组件表格数据
				var data = {
					access_token:localStorage.getItem("access_token"),
					page:pg.pageCurrent,
					limit:pg.pageSize
				}
				//获取筛选的条件
				//console.log(JSON.parse(this.$route.query.urlDate))
				if(this.$route.query.urlDate){
				    const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
				    sreenData.page = pg.pageCurrent;
				    sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
				
				this.api.orderprofit(data).then((da)=>{
					
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					this.setLoding(false)
				}).catch(()=>{
					this.setLoding(false)
				});	 
					
					/* this.setLoding(false); */
			},
			getScreenShowData(){
			  //获取字段展示-筛选修改
			  eventBus.$on("screenShowDataChange",(data)=> {
				this.tableConfig.list = [];
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
					this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
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
				this.centerDialogVisible1 = true;
			},
			contributor(){
				//console.log(openids)
				//console.log(this.selectData);
				var open_ids = this.getopenids();
			    this.centerDialogVisible = false;
				this.centerDialogVisible1 = false;
			    this.$confirm('有30位用已经是平台推荐创作者</br>是否统一将推荐评级修改为A', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				    dangerouslyUseHTMLString:true,
					type: '',
					center: true
			    }).then(() => {
					//console.log({open_ids:openids,level:this.radioS})
					this.api.setRecommendLevel({open_ids:open_ids,level:this.radioS}).then(da=>{
						this.$message(da)
						//console.log(da)
					})
			    }).catch(() => {
					this.$message({
					  type: 'info',
					  message: '已经取消'
					});
			  });
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
						
						if(urldata[item.id]){
							var val = urldata[item.id];
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
						if(item.type == "two"){
							if(item.child){
								item.child.forEach(citem=>{
									if(urldata[citem.id]){
										this.commonTopData.commonbottombtn.push({btnName:citem.name,val:urldata[citem.id],id:citem.id})
									}
								})
							}
							//this.commonTopData.commonbottombtn.push({btnName:item.child[0].name,val:val,id:item.child[0].id})
							/* this.commonTopData.commonbottombtn.push({btnName:item.child[0].name,val:val,id:item.child[0].id});
							this.commonTopData.commonbottombtn.push({btnName:item.child[1].name,val:val,id:item.child[1].id}); */
						}
					})
				}
				
			},
			resetSave(tag){
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					console.log(tag);
					this.$router.push({path:'/userBaseInfo',query:{urlDate:JSON.stringify(urldata)}});
					this.getcommonrightbtn();
					this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
				}
			}
		},
		mounted(){
			//console.log(this.tableConfig)
			this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
			this.getScreenShowData();
			this.screenreach();
			this.getcommonrightbtn();
		},
		watch:{
			screenShowDataChange(val){
				//console.log(val)
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