<template>
	<div class="wh">
		<div class="tabtop wh" ref="elememt" id="table" style="overflow-y: scroll;">
			<el-table ref="multipleTable" :reserve-selection="true" :row-key="getRowKeys" :data="tableDatas" tooltip-effect  :header-cell-style="cellStyle" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange">
				<el-table-column width="27" v-if="tableConfig.ischeck"></el-table-column>
				<el-table-column width="55" type="selection" v-if="tableConfig.ischeck"></el-table-column>
				<el-table-column width="33" v-if="!tableConfig.ischeck"></el-table-column>
				<el-table-column v-for="(item,index) in tableConfig.list" :key="index" :prop="item.prop" :label="item.lable" :width="item.width">
					<template slot-scope="scope">
						<img style="width: 50px;height: 50px;border-radius: 50%;margin: auto;display: block;" v-if="item.type == 'imgtou'" :src="scope.row[item.prop]" alt="" @click="getimgulr(scope.row[item.prop])">
						<img style="width: 80px;height: 48px;margin: auto;display: block;" v-if="item.type == 'img'" :src="scope.row[item.prop]" alt="" @click="getimgulr(scope.row[item.prop])">
						<div v-else-if="item.type == 'url'" style="color: #FF5121;" @click="openwindowrouter(item.url)">{{ scope.row[item.prop] }}</div>
						<div v-else-if="item.type == 'urlopen'" style="color: #FF5121;" @click="openwindow(item.prop+scope.row['work_id'])">{{ item.prop+scope.row["work_id"] }}</div>
						<button :class="'defaultbtn0 defaultbtn'+scope.row[item.prop]" v-else-if="item.type == 'btn'">{{ item.child[scope.row[item.prop]] }}</button>
						<div v-else-if="item.type == 'merge'">
							<span>{{ scope.row[item.child.id1] }}</span> 至 <span>{{ scope.row[item.child.id2]}}</span>
						</div>
						<div v-else-if="item.type == 'statustwo'">
							<span v-if="scope.row['is_del'] == '0'">
								<span :class="'status'+scope.row['status']">●</span><span>{{ item.child.status[scope.row['status']] }}</span>
							</span>
							<span v-else-if="scope.row['is_del'] != '0'">
								<!-- <span :class="'status'+scope.row['is_del']">●</span> --><span>{{ item.child.is_del[scope.row['is_del']] }}</span>
							</span>
							<!-- <span>{{ scope.row['is_del'] }}</span> -->
						</div>
						<span v-else-if="item.type == 'keyvalue'"><span>{{ item.child[scope.row[item.prop]] ? item.child[scope.row[item.prop]] : item.child.no }}</span></span>
						<span v-else-if="item.type == 'novalue'"><span>{{ scope.row[item.prop] != "" ? scope.row[item.prop] : item.novalue }}</span></span>
						<span v-else-if="item.type == 'status'"><span :class="'status'+scope.row[item.prop]">●</span><span>{{ item.child[scope.row[item.prop]] }}</span></span>
						<span v-else-if="item.type == 'nocon'">{{ scope.row[item.prop] ? scope.row[item.prop] : item.name }}</span>
						<span v-else-if="item.type == 'price'">{{ "￥" + scope.row[item.prop] }}</span>
						<span v-else-if="!item.type">{{ scope.row[item.prop] }}</span>
					</template>	
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<div v-if="!tableAction.pagefilterField">
							<span @click="handleClick(scope.row,'',tableAction.morebtns.page,$event)" class="pointer" style="padding: 0 10px;color:#FF5121;font-size: 12px;" v-if="tableAction.links.Ishow">{{ tableAction.links.child ? tableAction.links.child[scope.row["status"]]:tableAction.links.name }}</span>
							<el-button @click="handleClick(scope.row,'contributor',tableAction.morebtns.page)" type="text" size="small" v-if="tableAction.morebtns.Ishow && !tableAction.morebtns.child">{{ tableAction.morebtns.name }}</el-button>
							<el-dropdown trigger="click" v-if="tableAction.morebtns.Ishow && tableAction.morebtns.child">
								<span class="el-dropdown-link">{{ tableAction.morebtns.name }}</span>
								<el-dropdown-menu class="sel-tooltip" slot="dropdown">
									<el-dropdown-item v-for="(citem,index) in tableAction.morebtns.child" :key="index" class="comonbtn" @click.native="handleClick(scope.row,'contributor'+ index,tableAction.morebtns.page)">{{ citem.name }}</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
						<div  v-else-if="tableAction.pagefilterField">
							<el-button @click="handleClick(scope.row,'',tableAction.morebtns.page)" type="text" size="small" v-if="tableAction.links.Ishow  && ( tableAction.links.filterField ? (tableAction.links.filterField.indexOf(scope.row[tableAction.pagefilterFieldid]) > -1) : true )">{{ tableAction.links.name }}</el-button>
							<el-button @click="handleClick(scope.row,'contributor',tableAction.morebtns.page)" type="text" size="small" v-if="tableAction.morebtns.Ishow && !tableAction.morebtns.child">{{ tableAction.morebtns.name }}</el-button>
							<el-dropdown trigger="click" v-if="tableAction.morebtns.Ishow && tableAction.morebtns.child && (tableAction.morebtns.filterField.indexOf(scope.row[tableAction.pagefilterFieldid]) > -1)">
								<span class="el-dropdown-link">{{ tableAction.morebtns.name }}</span>
								<el-dropdown-menu class="sel-tooltip" slot="dropdown">
									<el-dropdown-item v-for="(citem,index) in tableAction.morebtns.child" v-if="(citem.filterField.indexOf(scope.row[tableAction.pagefilterFieldid]) > -1)" :key="index" class="comonbtn" @click.native="handleClick(scope.row,citem.id,tableAction.morebtns.page)">{{ citem.name }}</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="w" style="text-align: right;background: #FFFFFF;">
				<div class="fleft" style="line-height: 100px;color: #999999;margin-left: 40px;">
					<span v-if="tableConfig.ischeck">已选择{{ selected }}条,</span><span>共{{tableConfig.total}}条数据</span><button style="width:87px;height: 32px;" class="defaultbtn" @click="setall" v-if="tableConfig.ischeck">选择全部</button>
				</div>
				<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
				 :page-sizes="[50, 100, 200, 500]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="tableConfig.total">
				</el-pagination>
			</div>
		</div>
		<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
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
			}
		},
		methods: {
			handleClick(row, setid, page,event) {
				console.log(page,setid)
				//return;
				switch(page){
					case "userBaseInfo":
						if (setid == "contributor0") {
							this.$parent.setContributor(row);
						}
						if (!setid) {
							this.router.push({path:"/userManager/userBaseInfo/userBaseInfoDetail",query:{open_id:row.open_id}});
							///this.$parent.linkDetail(row.open_id);
						}
					break;
					case "userCompanyInfo":
						if (!setid) {
							this.router.push({path:"/userManager/userCompanyInfo/userCompanyInfoDetail",query:{open_id:row.open_id}});
							///this.$parent.linkDetail(row.open_id);
						}
					break;
					case "userPersonalInfo":
						if (!setid) {
							this.router.push({path:"/userManager/userPersonalInfo/userPersonalInfoDetail",query:{open_id:row.open_id}});
							///this.$parent.linkDetail(row.open_id);
						}
					break;
					case "roleManager":
						if (setid == "contributor0") {
							this.router.push({path:"/power/roleManager/editRoles",query:{id:row.id,name:row.name,description:row.description}});
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
							this.router.push({path:"/power/accountManager/setRoles",query:{row:JSON.stringify(row)}});
						}
						if(!setid){
							this.router.push({path:"/power/accountManager/seeaccount",query:{row:JSON.stringify(row)}});
						}
					break;
					case "publishWork":
						if(!setid){
							this.router.push({path:"/review/publishWork/workDetial",query:{id:row.id,type:1,check_status:row.check_status,work_id:row.work_id}});
							
						}
					break;
					case "finalistsWork":
						if(!setid){
							this.router.push({path:"/review/finalistsWork/workDetial",query:{id:row.id,type:2,check_status:row.check_status,work_id:row.work_id}});
							
						}
					break;
					case "employWork":
						if(!setid){
							this.router.push({path:"/review/employWork/workDetial",query:{id:row.id,type:3,check_status:row.check_status,work_id:row.work_id}});
							
						}
					break;
					case "applyPerson":
					//console.log(row);
						if(!setid){
							this.router.push({path:"/review/applyPerson/workDetial",query:{id:row.id,type:4,check_status:row.check_status,contribute_type:row.contributor_type}});
						}
					break;
					case "workInfo":
						this.pageid = "work_id";
						if(!setid){
							this.router.push({path:"/workManager/workInfo/workInfoDetial",query:{id:row.work_id}});
							
						}
						if(setid == "contributor0"){
							window.open("http://dev-web-ndesigner.idatachain.cn/#/conts?id=" + row.work_id);
						}
						
						if(setid == "contributor1"){
							this.router.push({path:"/workManager/workInfo/worksShelves",query:{id:row.work_id}});
						}
						if(setid == "contributor2"){
							this.$parent.centerDialogVisible2 = true;
							this.$parent.workid = row.work_id;
						}
						if(setid == "contributor3"){
							this.$parent.setContributor(row);
							//this.router.push({path:"/workManager/workInfo/workEmploy",query:{id:row.work_id}});
						}
						if(setid == "contributor4"){
							this.$parent.centerDialogVisible3 = true;
							this.$parent.workid = row.work_id;
						}
					break;
					case "commentManager":
						if(!setid){
							//this.router.push({path:"/review/applyPerson/workDetial",query:{id:row.id,type:4,check_status:row.check_status}});
							
							this.$parent.delect(row);
						}
					break;
					case "activityClass":
						if(!setid){
							this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:row.processing_activity_num,name:row.category_name,status:row.status}});
						}
					break;
					case "activityworks":
						if(!setid){
							window.open("http://dev-web-ndesigner.idatachain.cn/#/conts?id=" + row.work_id);
						}
					break;
					case "activityEmploy":
						if(!setid){
							window.open("http://dev-web-ndesigner.idatachain.cn/#/detailed?id=" + row.id);
						}

						if(setid == "top0"){
							this.$parent.delect(row);
							///this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}
						
						if(setid == "top1"){
							this.router.push({path:"/activityManager/activityEmploy/editActivity",query:{row:JSON.stringify(row)}});
						}
					break;
					case "solicitationTemplate":
						
					
						if(setid == "contributor0"){
							this.$parent.centerDialogVisible = true;
							this.$parent.rowdata = row;
							///this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}
						if(setid == "contributor1"){
							window.open(row.template_url);
						}
						if(setid == "contributor2"){
							this.$parent.delete(row);
							///this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}
					break;
					case "homeBanner":
						if(setid == "contributor"){
							this.$parent.delect(row);
						}
						if(!setid){
							this.router.push({path:"/contentManager/homeBanner/editHomeBanner", query:{row: JSON.stringify(row)}})
							///this.router.push({path:"/activityManager/activityClass/editActivity",query:{id:row.id,num:222}});
						}
						
					break;
					case "hotWordSearch":
						if(!setid){
							this.router.push({path:"/contentManager/hotWordSearch/edithotword", query:{row: JSON.stringify(row)}})
						}
						
						if(setid == "contributor"){
							this.$parent.delect(row);
						}
					break;
					case "serviceCenter":
						if(setid == "contributor0"){
							this.router.push({path:"/contentManager/serviceCenter/editserviceCenter", query:{row: JSON.stringify(row)}})
						}
						
						if(setid == "contributor1"){
							this.$parent.delect(row);
						}
					break;
					case "recommendedActivities":
						if(!setid){
							this.router.push({path:"/contentManager/recommendedActivities/editrecommendedActivities", query:{row: JSON.stringify(row)}})
						}
						
						if(setid == "contributor"){
							this.$parent.delect(row);
						}
					break;
					case "newrecommendedActivities":
						if(!setid){
							this.$parent.$parent.getactivitiesrows(row);
							this.$parent.$parent.dialogTableVisible = false;
						}
					break;
					case "employmentorder":
						if(!setid){
							this.router.push({path:"/employmentManager/employmentorder/orderDetial", query:{id: row.order_id,check_admin_name:row.check_admin_name,hire_time:row.hire_time}})
						}
						if(setid == "contributor"){
							this.$parent.delect(row);
						}
					break;
					case "addbannerScheme":
						if(!setid){
							this.$parent.$parent.getactivitiesrows(row);
							this.$parent.$parent.dialogTableVisible = false;
						}
					break;
					case "presetReason":
						if(!setid){
							if(event.target.innerHTML == "启用"){
								this.$confirm('确认'+ event.target.innerHTML +'该驳回理由', '确认修改', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									dangerouslyUseHTMLString: true,
									type: '',
									center: true
								}).then(() => {
									this.$parent.update(row,1,"启用");
									event.target.innerHTML = "停用"
								}).catch(() => {
									this.$message({
										type: 'info',
										message: '已经取消'
									});
								});
								
								
							} else{
								this.$confirm('确认'+ event.target.innerHTML +'该驳回理由', '确认修改', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									dangerouslyUseHTMLString: true,
									type: '',
									center: true
								}).then(() => {
									this.$parent.update(row,0,"停用");
									event.target.innerHTML = "启用"
								}).catch(() => {
									this.$message({
										type: 'info',
										message: '已经取消'
									});
								});
								
								
							}
						}
						if(setid == "contributor"){
							this.$confirm('确认删除该驳回理由', '确认修改', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								dangerouslyUseHTMLString: true,
								type: '',
								center: true
							}).then(() => {
								this.$parent.update(row,-1,"删除");
							}).catch(() => {
								this.$message({
									type: 'info',
									message: '已经取消'
								});
							});
						}
					break;
					case "feedback":
						if(!setid){
							if(this.$parent.tabsnum == 0){
								this.router.push({path:"/otherInformation/feedback/seefeedback", query:{feedback_id:row.feedback_id}})
							} else {
								if(event.target.innerHTML == "启用"){
									this.$confirm('确认'+ event.target.innerHTML +'该驳回理由', '确认修改', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										dangerouslyUseHTMLString: true,
										type: '',
										center: true
									}).then(() => {
										this.$parent.update(row,1,"启用");
										event.target.innerHTML = "停用"
									}).catch(() => {
										this.$message({
											type: 'info',
											message: '已经取消'
										});
									});
								} else{
									this.$confirm('确认'+ event.target.innerHTML +'该驳回理由', '确认修改', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										dangerouslyUseHTMLString: true,
										type: '',
										center: true
									}).then(() => {
										this.$parent.update(row,0,"停用");
										event.target.innerHTML = "启用"
									}).catch(() => {
										this.$message({
											type: 'info',
											message: '已经取消'
										});
									});
								}
							}
							
							
						}
						if(setid == "contributor"){
							
							this.$confirm('确认删除该驳回理由', '确认修改', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								dangerouslyUseHTMLString: true,
								type: '',
								center: true
							}).then(() => {
								this.$parent.update(row,-1,"删除");
							}).catch(() => {
								this.$message({
									type: 'info',
									message: '已经取消'
								});
							});
							
							
						}
					break;
					case "reportInfo":
						if(!setid){
							if(this.$parent.tabsnum == 0){
								this.router.push({path:"/otherInformation/reportInfo/seereportInfo", query:{report_id:row.report_id}})
							} else {
								this.$parent.update(row,1,"启用");
								if(event.target.innerHTML == "启用"){
									this.$confirm('确认'+ event.target.innerHTML +'该驳回理由', '确认修改', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										dangerouslyUseHTMLString: true,
										type: '',
										center: true
									}).then(() => {
										this.$parent.update(row,1,"启用");
										event.target.innerHTML = "停用"
									}).catch(() => {
										this.$message({
											type: 'info',
											message: '已经取消'
										});
									});
								} else{
									this.$confirm('确认'+ event.target.innerHTML +'该驳回理由', '确认修改', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										dangerouslyUseHTMLString: true,
										type: '',
										center: true
									}).then(() => {
										this.$parent.update(row,0,"停用");
										event.target.innerHTML = "启用"
									}).catch(() => {
										this.$message({
											type: 'info',
											message: '已经取消'
										});
									});
								}
							}
							
							
						}
						if(setid == "contributor"){
							
							this.$confirm('确认删除该驳回理由', '确认修改', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								dangerouslyUseHTMLString: true,
								type: '',
								center: true
							}).then(() => {
								this.$parent.update(row,-1,"删除");
							}).catch(() => {
								this.$message({
									type: 'info',
									message: '已经取消'
								});
							});
							
							
						}
					break;
					case "newsRelease":
						if(!setid){
							this.router.push({path:"/noticeManager/newsRelease/addsRelease", query:{row: JSON.stringify(row)}})
						}
						
						if(setid == "contributor"){
							this.$parent.delect(row);
						}
					break;
					case "embodyRecord":
						if(!setid){
							this.router.push({path:"/otherInformation/embodyRecord/seeembodyRecord", query:{row: JSON.stringify(row)}})
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
				
				if(this.sel == false){
					return;
				}
				this.multipleSelection = val
                this.changePageCoreRecordData (this.multipleSelection)
			},
			changePageCoreRecordData (x) {
                // 总选择里面的key集合
				let selectAllIds = [];
				this.multipleSelectionAll.forEach((row,index)=>{
				    selectAllIds.push(row[this.pageid]);
				})
				
				let selectIds = [];
				// 获取当前页选中的id
				//console.log(this.pageid);
				x.forEach((row,index)=>{
				    selectIds.push(row[this.pageid]);
					if (selectAllIds.indexOf(row[this.pageid]) < 0) {
					    this.multipleSelectionAll.push(row);
					}
				});
				
				let pageids = [];
				let noSelectIds = [];
				this.tableDatas.forEach((row,index)=>{
				    pageids.push(row[this.pageid]);
					if (selectIds.indexOf(row[this.pageid]) < 0) {
					    noSelectIds.push(row[this.pageid]);
					}
				})
				console.log(noSelectIds)
				noSelectIds.forEach(id=>{
				    if (selectAllIds.indexOf(id) >= 0) {
				        for(let i = 0; i< this.multipleSelectionAll.length; i ++) {
				            if (this.multipleSelectionAll[i][this.pageid] == id) {
				                // 如果总选择中有未被选中的，那么就删除这条
				                this.multipleSelectionAll.splice(i, 1);
				            }
				        }
				    }
				})
                console.log(this.multipleSelectionAll);
				
				this.selected = this.multipleSelectionAll.length;
				if(this.$parent.selectData){
					this.$parent.selectData = this.multipleSelectionAll;
				};
				if(this.$parent.$parent){
					this.$parent.$parent.selectData = this.multipleSelectionAll;
				};
				
            },
			change(data){
				let _this = this
                for(let i = 0;i<data.length;i++){
					var c = i
                    for(let x = 0;x<this.multipleSelectionAll.length;x++){     
						if(data[i][this.pageid] == this.multipleSelectionAll[x][this.pageid] ){
							var f = function(a){
								setTimeout(() => {
									console.log(data[a])
									_this.$refs.multipleTable.toggleRowSelection(data[a],true);
								}, 100);
							}
							f(c)
							
							//_this.$refs.multipleTable.toggleRowSelection(data[i],true);
						}
					}
                }
                
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
					//this.tableHeight = this.$refs.elememt.offsetHeight;
				}, 100)
				//此处需要通过延迟方法来设置值，不然会出现值已更新，但页面没更新的问题
				//this.$refs.table.$el.offsetTop：表格距离浏览器的高度
			},
			init(){
				if(this.tableConfig.loading){
					this.loading = false;
				}
			},
			cellStyle() {
			  return 'borderBottom: 5px solid #f0f2f5'
			},
			setLoding(type){
				this.loading = type;
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
			this.init()
		},
		created() {
			switch(this.tableAction.morebtns.page){
				case "userBaseInfo":
					this.pageid = "open_id";
				break;
				case "workInfo":
					this.pageid = "work_id";
				break;
				case "worksShelves":
					this.pageid = "open_id";
				break;
				case "newActivity":
					this.pageid = "template_file_id";
				break;
			}
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
