<template>
	<div class="wh">
		<div class="tabtop wh" ref="elememt" id="table">
			<div style="margin-left: 10px;">
				<ul class="screenContent" style="justify-content:space-between;flex-wrap:wrap;height: 500px;overflow-y: scroll;">
					<li :class="item.open_id == selectelistsobj[item.open_id] ? 'yhlist yhlistactive' : 'yhlist'" v-for="(item,index) in tableDatas" @click="selectelist(item)">
						<div>
							<div class="ofh">
								<img class="fleft" :src="item.avatar" width="48px" height="48px" style="border-radius: 50%;" alt="">
								<div class="fleft" style="margin-left: 8px;">
									<div>{{ item.username }}</div>
									<div style="color:rgba(187,187,187,1);font-size: 12px;">{{ item.vocation + "|" +item.province }}</div>
								</div>
								<div class="fleft" style="margin-left: 10px;">
									<el-button size="mini" style="background: #000000;color: white;">详情</el-button>
									<el-button size="mini" style="background: #000000;color: white;">主页</el-button>
								</div>
							</div>
							<div class="screenContent" style="margin-top: 10px;">
								<div style="margin-right: 20px;width: 30%;">
									<span style="color:rgba(187,187,187,1);font-size: 12px;">粉丝 </span>
									<span>{{ item.fans_num }}</span>
								</div>
								<div style="margin-right: 20px;width: 30%;">
									<span style="color:rgba(187,187,187,1);font-size: 12px;">人气 </span>
									<span>{{ item.popular_num }}</span>
								</div>
								<div style="width: 30%;">
									<span style="color:rgba(187,187,187,1);font-size: 12px;">创作 </span>
									<span>{{ item.work_num }}</span>
								</div>
							</div>
							<div class="screenContent" style="margin-top: 10px;">
								<div style="margin-right: 20px;width: 30%;">
									<span style="color:rgba(187,187,187,1);font-size: 12px;">接单 </span>
									<span>--</span>
								</div>
								<div style="margin-right: 20px;width: 30%;">
									<span style="color:rgba(187,187,187,1);font-size: 12px;">收益 </span>
									<span>--</span>
								</div>
								<div style="width: 30%;">
									<span style="color:rgba(187,187,187,1);font-size: 12px;">评级 </span>
									<span>{{ item.recommend_level }}</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="w" style="text-align: right;background: #FFFFFF;">
				<div class="fleft" style="line-height: 100px;color: #999999;margin-left: 40px;">
					<span >已选择{{ selected }}条,</span><span>共{{tableConfig.total}}条数据</span><button style="width:87px;height: 32px;" class="defaultbtn" @click="setall">选择全部</button>
				</div>
				<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
				 :page-sizes="[50, 100, 200, 500]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="tableConfig.total">
				</el-pagination>
			</div>
		</div>
		
		<div class="maskimg screenContent" v-if="isimgurl" @click="getimgulr">
			<img :src="imgurl" alt="暂无图片">
		</div>
	</div>
</template>
<!-- :total="tableConfig.total" -->
<script>
	export default {
		props: ['tableConfig', 'tableDatas','tableAction'],
		data() {
			return {
				IsMoreShow: false,
				tableHeight: 150,
				currentpage: 1,
				pagesize: 50,
				selected:0,
				loading:true,
				allselect:false,
				sel:true,
				multipleSelectionAll:[],
				multipleSelection:[],
				pageid:"",
				imgurl:"",
				isimgurl:false,
				adminuseraccess: [],
				selectelistsobj:{},
				selectelists:[],
			}
		},
		methods: {
			handleClick(row, setid, page,event) {
				console.log(page,setid)
				
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getTabData();
				this.$nextTick(() => {
					this.$refs.elememt.scrollTo(0,'34px');
				})
			},
			handleCurrentChange(val) {
				this.currentpage = val;
				this.getTabData();
				this.$nextTick(() => {
					this.$refs.elememt.scrollTo(0,'34px');
				})
			},
			selectelist(it){
				
				/* if(this.selectelistsobj[it.open_id]){
					this.selectelists.forEach((item,index)=>{
						if(it.open_id == item.open_id){
							this.selectelists.splice(index,1);
						}
					})
					this.$delete(this.selectelistsobj,it.open_id);
				} else{
					this.$set(this.selectelistsobj,it.open_id,it.open_id);
					this.selectelists.push(it)
				} */
				this.selectelists = []
				this.selectelistsobj = {};
				this.$set(this.selectelistsobj,it.open_id,it.open_id);
				this.selectelists.push(it);
				
				
			},
			
			getTabData() {
				const data = {
					pageCurrent: this.currentpage,
					pageSize: this.pagesize
				};
				
				if(this.$parent.$parent.getDatay){
					this.$parent.$parent.getDatay(data);
				}
			},
			autoTableHeight() {
				//设置table标签
				setTimeout(() => {
					//this.tableHeight = this.$refs.elememt.offsetHeight;
				}, 100)
				//此处需要通过延迟方法来设置值，不然会出现值已更新，但页面没更新的问题
				//this.$refs.table.$el.offsetTop：表格距离浏览器的高度
			},
			init(){
				
			},
			cellStyle() {
			  return 'borderBottom: 5px solid #f0f2f5'
			},
			
			cheaxz(id){
				/* let on = this.ids.indexOf(id);
				if(on!=-1){
					this.ids.splice(on,1);
				}else{
					this.ids.push(id);
				}
				let pok = [];
				for(let i=0,n=this.ids.length;i<n;i++){
					pok.push({id:this.ids[i]});
				}
				this.multipleSelection = pok;
				this.$parent.xzFn(this.multipleSelection); */
				
			},	
			setall(){
				this.sel = !this.sel;
				if(this.sel == false){
					this.selected = this.tableConfig.total;
					this.$parent.seltotal = this.tableConfig.total;
					this.toggleSelection(this.tableDatas)
				} else {
					this.selected = 0;
					this.$parent.seltotal = 0;
					this.toggleSelection();
				};
			},
			setinit(){
				this.sel = true;
				this.selected = 0;
				this.$parent.seltotal = 0;
				this.toggleSelection();
			},
			toggleSelection(rows) {
				if (rows) {
				  rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				  });
				} else {
				  this.$refs.multipleTable.clearSelection();
				}
			},
			getRowKeys(row) {
				return row.id;
			},
			getimgulr(url){
				this.imgurl = url;
				this.isimgurl = !this.isimgurl
			},
			openwindow(url){
				window.open(url)
			},
			openwindowrouter(url){
				const {href} = this.$router.resolve({ path: url})
				window.open(href, '_blank')
			}
			
		},
		mounted() {
			this.autoTableHeight();
			//console.log(this.tableConfig)
			this.init();
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
		},
		created() {
			
		}
	}
</script>
<style>
	.yhlist{
		width: 345px;
		padding: 16px;
		border-radius:5px;
		border:1px solid rgba(187,187,187,1);
		margin-top: 10px;
		margin-right: 10px;
		cursor: pointer;
	}
	.yhlistactive{
		border-color: #FF5121;
	}
	.status-2{
		color: #f72522;
	}
	.status-1{
		color: #f72522;
	}
	.status0{
		color:#fcae00;
	}
	.status1{
		color:#fcae00;
	}
	.status2{
		color:#4dc600;
	}
	.status10{
		color:#4dc600;
	}
	.status11{
		color:#4dc600;
	}
	
	.presetReasonstatus0{
		color:#f72522;
	}
	
	.presetReasonstatus1{
		color:#4dc600;
	}
	
	.newsReleasestatus0{
		color:#bfbfbf;
	}
	
	.newsReleasestatus1{
		color:#008dff;
	}
	
	.newsReleasestatus2{
		color:#4dc600;
	}
	
	.activityEmploystatus-1{
		color:#bfbfbf;
	}
	.activityEmploystatus0{
		color:#bfbfbf;
	}
	.activityEmploystatus1{
		color:#008dff;
	}
	
	.recommendedActivitiesstatus0{
		color:#bfbfbf;
	}
	.recommendedActivitiesstatus1{
		color:#008dff;
	}
	.recommendedActivitiesstatus-1{
		color:#f72522;
	}
	.recommendedActivitiesstatus-2{
		color:#f72522;
	}
	
	.maskimg{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 2005;
	}
	/* #table .el-table th.is-leaf {
		border-bottom: 5px solid #545C64;
	} */
	/* .el-table__fixed {
		margin-left: 27px;
	} */
</style>
