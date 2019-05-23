<template>
	<div class="wh">
		<div class="tabtop" ref="elememt" id="table">
			<el-table :height="tableHeight" :data="tableDatas" tooltip-effect  :header-cell-style="cellStyle" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column width="27" v-if="tableConfig.ischeck"></el-table-column>
				<el-table-column width="55" type="selection" v-if="tableConfig.ischeck"></el-table-column>
				<el-table-column width="33" v-if="!tableConfig.ischeck"></el-table-column>
				<el-table-column v-for="(item,index) in tableConfig.list" :key="index" :prop="item.prop" :label="item.lable" :width="item.width">
					<template slot-scope="scope">
						<img style="width: 120px;height: 50px;" v-if="item.type == 'img'" :src="scope.row[item.prop]" alt="">
						<div v-else-if="item.type == 'url'" style="color: #FF5121;" >{{ scope.row[item.prop] }}</div>
						<button :class="'defaultbtn0 defaultbtn'+scope.row[item.prop]" v-else-if="item.type == 'btn'">{{ item.child[scope.row[item.prop]] }}</button>
						<div v-else-if="item.type == 'merge'">
							<span>{{ scope.row[item.child.id1] }}</span> 至 <span>{{ scope.row[item.child.id2]}}</span>
						</div>
						<span v-else-if="item.type == 'status'"><span :class="'status'+scope.row[item.prop]">●</span><span>{{ item.child[scope.row[item.prop]] }}</span></span>
						<span v-else-if="!item.type">{{ scope.row[item.prop] }}</span>
					</template>	
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row,'',tableAction.morebtns.page)" type="text" size="small" v-if="tableAction.links.Ishow">{{ tableAction.links.name }}</el-button>
						<el-button @click="handleClick(scope.row,'contributor',tableAction.morebtns.page)" type="text" size="small" v-if="tableAction.morebtns.Ishow && !tableAction.morebtns.child">{{ tableAction.morebtns.name }}</el-button>
						<el-dropdown trigger="click" v-if="tableAction.morebtns.Ishow && tableAction.morebtns.child">
							<span class="el-dropdown-link">{{ tableAction.morebtns.name }}</span>
							<el-dropdown-menu class="sel-tooltip" slot="dropdown">
								<el-dropdown-item v-for="(citem,index) in tableAction.morebtns.child" :key="index" class="comonbtn" @click.native="handleClick(scope.row,'contributor'+ index,tableAction.morebtns.page)">{{ citem.name }}</el-dropdown-item>
								
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="w" style="text-align: right;background: #FFFFFF;">
			<div class="fleft" style="line-height: 100px;color: #999999;margin-left: 40px;">
				<span v-if="tableConfig.ischeck">已选择{{ selected }}条,</span><span>共{{tableConfig.total}}条数据</span>
			</div>
			<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
			 :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="tableConfig.total">
			</el-pagination>
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
				pagesize: 10,
				selected:0
			}
		},
		methods: {
			handleClick(row, setid, page) {
				//return;
				switch(page){
					case "userBaseInfo":
						if (setid == "contributor0") {
							this.$parent.setContributor(row);
						}
						if (!setid) {
							this.router.push({path:"/userBaseInfo/userBaseInfoDetail",query:{open_id:row.open_id}});
							///this.$parent.linkDetail(row.open_id);
						}
					break;
					case "userCompanyInfo":
						if (!setid) {
							this.router.push({path:"userCompanyInfo/userCompanyInfoDetail",query:{open_id:row.open_id}});
							///this.$parent.linkDetail(row.open_id);
						}
					break;
					case "userPersonalInfo":
						if (!setid) {
							this.router.push({path:"userPersonalInfo/userPersonalInfoDetail",query:{open_id:row.open_id}});
							///this.$parent.linkDetail(row.open_id);
						}
					break;
					case "roleManager":
						if (setid == "contributor0") {
							this.router.push({path:"/power/roleManager/editRoles",query:{id:row.id}});
						}
						if (setid == "contributor1") {
							this.$parent.delect(row.id);
							//this.router.push({path:"/power/roleManager/editRoles",query:{id:row.id}});
						}
						if(!setid){
							this.router.push({path:"/power/roleManager/seeRoles",query:{id:row.id}});
						}
					break;
					case "accountManager":
						if (setid == "contributor") {
							this.router.push({path:"/power/accountManager/setRoles",query:{id:row.id}});
						}
						if(!setid){
							this.router.push({path:"/power/accountManager/seeaccount",query:{id:row.id}});
							//this.router.push({path:"/power/accountManager/seeRoles"});
						}
					break;
					case "publishWork":
						if(!setid){
							this.router.push({path:"/review/publishWork/workDetial",query:{id:row.id,type:1,check_status:row.check_status}});
							//this.router.push({path:"/power/accountManager/seeRoles"});
						}
					break;
					case "finalistsWork":
						if(!setid){
							this.router.push({path:"/review/finalistsWork/workDetial",query:{id:row.id,type:2,check_status:row.check_status}});
							//this.router.push({path:"/power/accountManager/seeRoles"});
						}
					break;
					case "employWork":
						if(!setid){
							this.router.push({path:"/review/employWork/workDetial",query:{id:row.id,type:3,check_status:row.check_status}});
							//this.router.push({path:"/power/accountManager/seeRoles"});
						}
					break;
					case "applyPerson":
						if(!setid){
							this.router.push({path:"/review/applyPerson/workDetial",query:{id:row.id,type:4,check_status:row.check_status}});
							//this.router.push({path:"/power/accountManager/seeRoles"});
						}
					case "workInfo":
					break;
						if(!setid){
							this.router.push({path:"/workManager/workInfo/workInfoDetial",query:{id:row.work_id}});
							//this.router.push({path:"/power/accountManager/seeRoles"});
						}
						if(setid == "contributor1"){
							this.router.push({path:"/workManager/workInfo/worksShelves",query:{id:row.work_id}});
						}
						if(setid == "contributor2"){
							this.$parent.centerDialogVisible2 = true;
						}
						if(setid == "contributor3"){
							this.$parent.setContributor(row);
							//this.router.push({path:"/workManager/workInfo/workEmploy",query:{id:row.work_id}});
						}
						if(setid == "contributor4"){
							this.$parent.centerDialogVisible3 = true;
						}
					break;
					case "commentManager":
						if(!setid){
							//this.router.push({path:"/review/applyPerson/workDetial",query:{id:row.id,type:4,check_status:row.check_status}});
							//this.router.push({path:"/power/accountManager/seeRoles"});
							this.$parent.setContributor(row);
						}
					break;
					case "activityClass":
						if(!setid){
							this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}
					break;
					case "activityEmploy":
						if(!setid){
							///this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}

						if(setid == "contributor0"){
							this.$parent.delete(row);
							///this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}
					break;
					case "solicitationTemplate":
						
					
						if(setid == "contributor0"){
							this.$parent.centerDialogVisible = true;
							///this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}
						if(setid == "contributor1"){
							this.$parent.delete(row);
							///this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}
						if(setid == "contributor2"){
							this.$parent.delete(row);
							///this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}
					break;
				};
				
				
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getTabData();
			},
			handleCurrentChange(val) {
				this.currentpage = val;
				this.getTabData();
			},
			handleSelectionChange(val) {
				this.selected = val.length
				this.$parent.selectData = val;
			},
			getTabData() {
				const data = {
					pageCurrent: this.currentpage,
					pageSize: this.pagesize
				};
				this.$parent.getData(data)
			},
			autoTableHeight() {
				//设置table标签
				setTimeout(() => {
					this.tableHeight = this.$refs.elememt.offsetHeight;
				}, 100)
				//此处需要通过延迟方法来设置值，不然会出现值已更新，但页面没更新的问题
				//this.$refs.table.$el.offsetTop：表格距离浏览器的高度
			},
			init(){
				//console.log(this.tableAction)
			},
			cellStyle() {
			  return 'borderBottom: 5px solid #f0f2f5'
			},
			setstatus(){
				return "red"
			}
		
		},
		mounted() {
			this.autoTableHeight();
			//console.log(this.tableConfig)
			this.init()
		}
	}
</script>
<style>
	.status-2{
		color: #F5222D;
	}
	.status-1{
		color: #000000;
	}
	.status0{
		color:#52C41A;
	}
	.status1{
		color:#52C41A;
	}
	.status2{
		color:#52C41A;
	}
	.status10{
		color:#52C41A;
	}
	/* #table .el-table th.is-leaf {
		border-bottom: 5px solid #545C64;
	} */
	/* .el-table__fixed {
		margin-left: 27px;
	} */
</style>
