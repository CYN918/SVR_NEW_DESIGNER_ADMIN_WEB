<template>
	<div class="wh">
		<div class="w ctcontent">
			<div v-if="!commonTopData.is">
				<div class="margin40 cttitle" v-if="!commonTopData.tabData">{{ currentpageName }}</div>
				<div class="paddinglr40 relative" style="height: 58px;border-bottom: 2px solid #f0f2f5;line-height: 58px;margin-bottom: 20px;" v-else-if="commonTopData.tabData">
					<span class="fleft" style="width: 120px;">
						{{ currentpageName }}
					</span>
					<div class="textcenter">
						<span v-for="(item,index) in commonTopData.tabData"  :class="index == tabnums ? 'tabs tabactive' : 'tabs'" @click="tabsChange(index)">
							<el-badge :value="doCount[(index+1)] == 0 ? '' : doCount[(index+1)]" :max="99" class="badge">{{ item.name }}</el-badge>
						</span>
					</div>
				</div>
			</div>
			<div :class="['borderb','margin40',{marginl0:commonTopData.IsShow}]" style="position: relative;padding-bottom: 22px;">
				<div class="ofh">
					<div class="fleft">
						<el-button class="btnorgle" v-if="item.is != tabnums" v-for="(item,index) in commonTopData.commonleftbtn" @click="getparent(item.fun)">{{ item.name }}</el-button>
					</div>
					<div class="fright">
						<div class="fleft" v-for="(item,index) in commonrightbtn" :key="item.id">
							<div v-if="item.accessid && (adminuseraccess.indexOf(item.accessid) > -1)">	
								<div v-if="tabnums == '4'">
									<button v-if="!commonTopData.upload" class="defaultbtn" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
								</div>
								<div v-else>
									<button v-if="!commonTopData.upload && item.id == 'right1'" class="defaultbtn" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
								</div>
								<div class="sel-tooltip" v-if="item.id == 'right1' && Istooltip" style="z-index: 2004;top: 40px;right: 100px;">
									<div v-for="(item,index) in operations" :key="item.name" class="comonbtn" @click="IsShow(index)">{{ item.name }}</div>
								</div>
								<div class="masku" v-if="item.id == 'right1' && Istooltip" @click="Istooltip = false"></div>
								<div v-if="tabnums == '4'">
									<button v-if="commonTopData.upload" class="defaultbtn defaultbtnactive" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
								</div>
								<div v-else>
									<button v-if="commonTopData.upload && item.id == 'right1'" class="defaultbtn defaultbtnactive" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
								</div>	
							</div>
							<div v-if="!item.accessid">
								<div v-if="tabnums == '4'">
									<button v-if="!commonTopData.upload && item.id == 'right3'" class="defaultbtn" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
								</div>
								<div v-else>
									<button v-if="!commonTopData.upload && item.id == 'right1'" class="defaultbtn" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
								</div>
								<div class="sel-tooltip" v-if="item.id == 'right1' && Istooltip" style="z-index: 2004;top: 40px;right: 100px;">
									<div v-for="(item,index) in operations" :key="item.name" class="comonbtn" @click="IsShow(index)">{{ item.name }}</div>
								</div>
								<div class="masku" v-if="item.id == 'right1' && Istooltip" @click="Istooltip = false"></div>
								<div v-if="tabnums == '4'">
									<button v-if="commonTopData.upload && !item.two" class="defaultbtn defaultbtnactive" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
								    <button v-if="commonTopData.upload && item.two && settrue(item.two.id1,item.two.id2)" class="defaultbtn defaultbtnactive" @click="getparent()">{{ item.name }}</button>
								</div>
								<div v-else>
									<button v-if="commonTopData.upload && !item.two && item.id == 'right1'" class="defaultbtn defaultbtnactive" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
								    <button v-if="commonTopData.upload && item.two && settrue(item.two.id1,item.two.id2) && item.id == 'right1'" class="defaultbtn defaultbtnactive" @click="getparent()">{{ item.name }}</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="margin40" style="height: 60px;" >
				<div class="tagbts">
					<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
					 :disable-transitions="false" @close="handleClose(item.id)">
						{{item.btnName + "：" + item.val}}
					</el-tag>
				</div>
			</div>
		</div>
		<!-- <div class="transparent"></div> -->
		<div class="wh" ref="elememt" id="table">
			<el-table ref="multipleTable" :reserve-selection="true" :row-key="getRowKeys" :data="tableDatas" tooltip-effect  :header-cell-style="cellStyle" style="width: 100%" :height="tableHeight" v-loading="loading" @selection-change="handleSelectionChange">
				<el-table-column width="27" v-if="tableConfig.ischeck"></el-table-column>
				<el-table-column width="55" type="selection" v-if="tableConfig.ischeck"></el-table-column>
				<el-table-column width="33" v-if="!tableConfig.ischeck"></el-table-column>
				<el-table-column v-for="(item,index) in tableConfiglist" :key="index" :prop="item.prop" :label="item.lable" :width="item.width">
					<template slot-scope="scope">
						<img style="width: 50px;height: 50px;border-radius: 50%;margin: auto;display: block;" v-if="item.type == 'imgtou'" :src="scope.row[item.prop]" alt="" @click="getimgulr(scope.row[item.prop])">
						<img style="width: 80px;height: 48px;margin: auto;display: block;" v-if="item.type == 'img'" :src="scope.row[item.prop]" alt="" @click="getimgulr(scope.row[item.prop])">
						<div v-else-if="item.type == 'url'" style="color: #FF5121;" @click="openwindowrouter(item.url,scope.row['work_id'])">{{ scope.row[item.prop] }}</div>
						<div v-else-if="item.type == 'url1'" style="color: #FF5121;" @click="openwindow(scope.row[item.prop])">{{ scope.row[item.prop] }}</div>
						<div v-else-if="item.type == 'urlopen'" style="color: #FF5121;" @click="openwindow(item.prop+scope.row['work_id'])">{{ item.prop+scope.row["work_id"] }}</div>
						<div v-else-if="item.type == 'btn'">
							<button style="width: 100px;" :class="'fleft defaultbtn0 defaultbtn'+scope.row[item.prop]" >{{ item.child[scope.row[item.prop]] }}</button><span style="margin-left:5px;height: 100%;line-height: 2.5;">{{ scope.row['role'] }}</span>
						</div>
						<span v-else-if="item.type == 'urlfile'">
							<span v-if="scope.row[item.filetype.name] == item.filetype.id">
								{{ scope.row[item.prop.prop1] }}
							</span>
							<span v-else>
								<span class="routerLink pointer" @click="openwindow(scope.row[item.prop.prop2])">{{ scope.row[item.prop.prop2] }}</span>
							</span>
						</span>
						<span v-else-if="item.type == 'twokey'">
							<span v-if="scope.row[item.filetype.name] == item.filetype.id">
								{{ scope.row[item.prop.prop1] }}
							</span>
							<span v-else>
								<span>{{ scope.row[item.prop.prop2] }}</span>
							</span>
						</span>
						<div v-else-if="item.type == 'merge'">
							<span>
								<span>{{ scope.row[item.child.id1] }}</span> 至 <span>{{ scope.row[item.child.id2]}}</span>
							</span>
						</div>
						<div v-else-if="item.type == 'statustwo'">
							<span v-if="scope.row['is_del'] == '0'">
								<span :class="'status'+scope.row['status']">●</span><span>{{ item.child.status[scope.row['status']] }}</span>
							</span>
							<span v-else-if="scope.row['is_del'] != '0'">
								<span class="status-1">●</span><span>{{ item.child.is_del[scope.row['is_del']] }}</span>
							</span>
						</div>
						<span v-else-if="item.type == 'keyvalue'"><span>{{ item.child[scope.row[item.prop]] ? item.child[scope.row[item.prop]] : item.child.no }}</span></span>
						<span v-else-if="item.type == 'novalue'"><span>{{ scope.row[item.prop] != "" ? scope.row[item.prop] : item.novalue }}</span></span>
						<span v-else-if="item.type == 'status'"><span :class="item.statusclass+scope.row[item.prop]">●</span><span>{{ item.child[scope.row[item.prop]] }}</span></span>
						<span v-else-if="item.type == 'nocon'">{{ scope.row[item.prop] ? scope.row[item.prop] : item.name }}</span>
						<span v-else-if="item.type == 'price'">{{ "￥" + scope.row[item.prop]  }}</span>
						<div v-else-if="item.type == 'hiretime'">
							<div style="color: #FF5121;" @click="openwindowrouter(item.url)">
								{{ scope.row[item.prop] ? scope.row[item.prop] : "--" }}
							</div>
							<div>
								{{ scope.row[item.time] }} 
							 </div>
						</div>
						<div v-else-if="item.type == 'hiretime1'">
							<div>
								{{ scope.row[item.prop] ? scope.row[item.prop] : "--" }}
							</div>
							<div>
								{{ scope.row[item.time] }} 
							 </div>
						</div>
						<span v-else-if="item.type == 'address'">
							<span>{{
								scope.row[item.child[0]]+scope.row[item.child[1]]+scope.row[item.child[2]]
							}}</span>
						</span>
						<span v-else-if="!item.type">
						    <span>
								<!-- <span v-if="item.is_hidden && scope.row[item.is_hidden.name] == item.is_hidden.value">
									{{ item.is_hidden.namevalue }}
								</span> -->
								<span>
									{{ scope.row[item.prop] }}
								</span>
						    </span>
						</span>
					</template>	
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<div>
							<span v-if="tableActions.links && gettrue(tableActions.links.accessid)" @click="handleClick(tableActions.links.fun,scope.row)" class="pointer" style="padding: 0 10px;color:#FF5121;font-size: 14px;">{{ tableActions.links.name( tableActions.links.filterdata ?  scope.row[tableActions.links.filterdata] : '') }}</span>
							<el-button @click="handleClick(tableActions.morebtns.fun,scope.row)" type="text" size="small" v-if="tableActions.morebtns && !tableActions.morebtns.child && gettrue(tableActions.morebtns.accessid)">{{ tableActions.morebtns.name(tableActions.morebtns.filterdata ?  scope.row[tableActions.morebtns.filterdata] : '') }}</el-button>
							<el-dropdown trigger="click" v-if="tableActions.morebtns && tableActions.morebtns.child">
								<span class="el-dropdown-link">{{ tableActions.morebtns.name }}</span>
								<el-dropdown-menu class="sel-tooltip" slot="dropdown">
									<el-dropdown-item v-if="gettrue(citem.accessid) && citem.name(citem.filterdata ? scope.row[citem.filterdata] : '')" v-for="(citem,index) in tableActions.morebtns.child" :key="index" class="comonbtn" @click.native="handleClick(citem.fun,scope.row,index)">{{ citem.name(citem.filterdata ? scope.row[citem.filterdata] : '') }}</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<span v-if="tableActions.filterbtn && gettrue(tableActions.filterbtn.accessid)" @click="handleClick(tableActions.filterbtn.fun,scope.row)" class="pointer" style="padding: 0 10px;color:#FF5121;font-size: 14px;">{{ tableActions.filterbtn.name(tableActions.filterbtn.filterdata ? scope.row[tableActions.filterbtn.filterdata] : "") }}</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="w" style="text-align: right;background: #FFFFFF;">
				<div class="fleft" style="line-height: 100px;color: #999999;margin-left: 40px;">
					<span v-if="tableConfig.ischeck">已选择{{ selected }}条,</span><span>共{{total}}条数据</span><button style="width:87px;height: 32px;" class="defaultbtn" @click="setall" v-if="tableConfig.ischeck">选择全部</button>
				</div>
				<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
				 :page-sizes="[50, 100, 200, 500]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<div class="maskimg screenContent" v-if="isimgurl" @click="getimgulr">
			<img :src="imgurl" alt="暂无图片" style="max-height:500px;">
		</div>
		
		
		<!-- ///// -->
		<el-dialog :title="gettitle() +'-筛选'" :visible.sync="centerDialogVisible">
			<div>
				<div class="screenborder">
					<div class="screenMidden paddinglr30">
						<ul class="screenMiddenul ofh w">
							<li v-for="(item,index) in filterField" :key="item.id">
								<div>
									{{ item.name }}
								</div>
								<!-- form.selct[item.a] -->
								<el-input class="ipt" placeholder="请输入内容" v-model="form[item.id]" v-if="(!item.child) && (!item.type)"
								 clearable></el-input>
								<el-dropdown trigger="click" v-else-if="item.child && item.type == 'more'" :hide-on-click="false">
									<el-input class="ipt el-dropdown-link" placeholder="请输入内容" v-model="vocation.join(',')" suffix-icon="el-icon-arrow-down"
									 clearable></el-input>
								    <el-dropdown-menu slot="dropdown" style="width: 200px;height: 260px;">
										<el-checkbox-group v-model="vocation">
											<el-dropdown-item v-for="(citem,index) in item.child" :key="index" >
												<el-checkbox  :label="citem" >{{citem}}</el-checkbox>
											</el-dropdown-item>
										</el-checkbox-group>
								    </el-dropdown-menu>
								</el-dropdown>
								<el-select v-model="form[item.id]" placeholder="请选择" v-else-if="item.child && !item.type">
									<el-option value="" label="全部"></el-option>
									 <el-radio-group v-model="form[item.id]">
										<el-option v-for="(childitem,index) in item.child" :value="childitem.id" :label="childitem.name">
											<el-radio :value="childitem.id" :label="childitem.id">{{ childitem.name }}</el-radio>
										</el-option>
									</el-radio-group>
								</el-select>
								 <el-date-picker
								  v-if="item.type == 'time'"
								   @change="timetwo(item.child)"
								  class="ipt"
								  v-model="times"
								  type="daterange"
								  value-format="yyyy-MM-dd HH:mm:ss"
								  start-placeholder="开始日期"
								  end-placeholder="结束日期"
								  >
								</el-date-picker>
								<el-cascader v-if="item.type == 'cascader'"
									expand-trigger="hover"
									:options="item.child"
									:props="item.optionProps"
									v-model="selectedOptions"
									@change="handleChange">
								</el-cascader>
								
								
								<!-- <div v-if="item.type == 'cascader'">
									<el-input class="ipt"  v-popover:popover placeholder="请输入内容" v-model="form[item.id]"></el-input>
									<el-popover
									  ref="popover"
									  placement="right"
									  width="200">
									  <div style="max-height: 400px;min-height: 200px;overflow-y: auto;">
										  <el-tree
										    v-if="item.type == 'cascader'"
										    :data="item.child"
										    show-checkbox
										    node-key="id"
										    :props="defaultProps">
										  </el-tree>
									  </div>
				
									</el-popover>
								</div> -->
								
								
						
								<div v-if="item.type == 'two'">
									<el-input v-model="form[item.child[0].id]" class="ipt90" placeholder="请输入内容" clearable></el-input>
									<span style="padding: 0 14px;">至</span>
									<el-input v-model="form[item.child[1].id]" class="ipt90" placeholder="请输入内容" clearable></el-input>
								</div>
								<div v-if="item.type == 'text'">
									<el-input class="ipt" placeholder="请输入内容" v-model="form[item.id]"  clearable></el-input>
								</div>
								<div v-if="item.type == 'display'" :style="{visibility: (item.type == 'display' ? 'hidden' : '')}">
									<button class="ipt"></button>
								</div>
							</li>
						</ul>
					</div>
					<div class="screenBottom paddinglr30">
						<div class="screenBottombtn ofh">
							<button class="fleft defaultbtn" @click="reset">重置</button>
							<button class="fright defaultbtn defaultbtnactive" @click="cha">查询</button>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		props: ['tableConfig','commonTopData','tableAction','filterFields'],
		data() {
			return {
				tableActions:{},
				IsMoreShow: false,
				tableHeight: 150,
				currentpage: 1,
				pagesize: 50,
				selected:0,
				total:0,
				loading:true,
				allselect:false,
				sel:true,
				multipleSelectionAll:[],
				multipleSelection:[],
				pageid:"",
				imgurl:"",
				isimgurl:false,
				tableDatas:[],
				inputVisible: false,
				inputValue: '',
				Istooltip: false,
				centerDialogVisible: false,
				radio2: 3,
				c:this.commonTopData.commonbottombtn,
				activeName: 'second',
				currentpageName:'',
				doCount:{},
				operations:[],
				adminuseraccess: [],
				tabnums:0,
				/* ///// */
				form: {
					
				},
				vocation:[],
				texts: '',
				options: [],
				value: '',
				value2:[],
				times:[],
				selectedOptions:[],
				citye:["中国","北京市","东城区"],
				defaultProps: {
				  children: 'sub_data',
				  label: 'classify_name'
				},
				tableConfiglist:[],
				commonrightbtn:[],
				filterField:[]
			}
		},
		methods: {
			gettitle(){
				if(!this.commonTopData.tabDatatitle){
					return this.commonTopData.tabData[this.tabnums].name
				} else {
					return this.commonTopData.tabDatatitle
				}
			},
			gettrue(id){
				//console.log(this.adminuseraccess)
				//alert(this.adminuseraccess.hasOwnProperty(id)) 
				if(this.adminuseraccess.indexOf(id) > -1){
					return true;
				} else {
					return false;
				}
			},
			IsShow(index) {
				console.log(index)
				this.Istooltip = false;
				if(this.tableDatas.length == 0){
					this.$message({
						message:"没有数据导出"
					});
				}
				
				if(index == 0) {
					console.log(this.tableDatas);
				}
				if(index == 1) {
					console.log(this.tableDatas);	
				}
			},
			// getparent(fun){
			// 	if(this.$parent[fun]){
			// 		this.$parent[fun]();
			// 	}
			// 	if(this.$parent.$parent[fun]){
			// 		this.$parent.$parent[fun]();
			// 	}
			// },
			getparent(id,name) {
				//alert(name)
				var idIndex = id;
				switch (name)
				{
					case "publishWork":
						if (idIndex == "right3") {
							this.operations = [
								{
									name:"导出订单表",
								},
								{
									name:"导出评价表"
								}
							];
							this.Istooltip = !this.Istooltip;
							return;
						}
					break;											
				}				
				const shownum = {
					num: idIndex,
					showmask: "No",
					pageName: this.commonTopData.pageName,
				}
				eventBus.$emit("screenshow", shownum);
			},
			reset(){
				this.form ={};
			},
			reject(){
				this.centerDialogVisible = !this.centerDialogVisible;
			},
			tabsChange(num){
				this.tabnums = num;
				console.log(this.tabnums)
				this.gettableConfiglist(this.tabnums);
				this.getTabData();
			},
			
			handleClick(fun,row,index) {
				if(this.$parent[fun]){
					this.$parent[fun](row);
				}
				if(this.$parent.$parent[fun]){
					this.$parent.$parent[fun](row);
				}
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
			handleSelectionChange(val) {
				
				if(this.sel == false){
					return;
				}
				this.multipleSelection = val
				this.changePageCoreRecordData(this.multipleSelection)
				
				
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
				//console.log(this.multipleSelectionAll);
				if( this.$parent.$parent.pageName && this.$parent.$parent.pageName == "addblack"){
					if(this.$parent.$parent.tabnum == 0) {
						this.$parent.$parent.selectData = this.multipleSelectionAll;
					} else {
						this.$parent.$parent.selectData1 = this.multipleSelectionAll;
					}
					return;
				}
				
				this.selected = this.multipleSelectionAll.length;
				
				if(this.$parent.selectData){
					this.$parent.selectData = this.multipleSelectionAll;
				};
				if(this.$parent.$parent.selectData){
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
			cha(){
				this.reject();
				this.getTabData()
			},
			setexport(){
				//获取子组件表格数据
				let data1 = {};
				
				data1 = {
					access_token: localStorage.getItem("access_token"),
					page: this.currentpage,
					limit: this.pagesize
				}
				//获取筛选的条件
				//console.log(JSON.parse(this.$route.query.urlDate))
				if (this.form) {
					const sreenData = this.form
					console.log(this.form)
					sreenData.page = this.currentpage;
					sreenData.limit = this.pagesize;
					sreenData.access_token = localStorage.getItem("access_token");
					data1 = sreenData;
				}
				data1.is_export = 1;
				let form1 = document.createElement("form");
				for(let key in data1){
					let dom =document.createElement("input");
					dom.setAttribute("name",key);
					dom.setAttribute("value",data1[key]);
					form1.appendChild(dom);
				};
				form1.setAttribute("style", "display:none");
				form1.setAttribute("target", "");
				form1.setAttribute("method", "post");
				form1.setAttribute("action", "http://dev-api-ndesigner-admin.idatachain.cn/admin/project/list")
				if(window.location.host=='shiquaner-admin.zookingsoft.com'){
				   form1.setAttribute("action", "http://shiquaner-admin-api.zookingsoft.com/admin/project/list")
				}
				document.body.appendChild(form1);
				form1.submit();
				this.form = {};
			},
			getTabData() {
				//获取子组件表格数据
				let data = {};
				data = {
					access_token: localStorage.getItem("access_token"),
					page: this.currentpage,
					limit:this.pagesize,
				}
				
				//console.log(data);
				//console.log(this.form)
				//获取筛选的条件
				if (this.form) {
					const sreenData = this.form
					sreenData.page = this.currentpage;
					sreenData.limit = this.pagesize;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
				if(this.tableConfig.data){
					data[this.tableConfig.data] = this.tabnums;
					if(this.tabnums == 5){
						data[this.tableConfig.data] = -1;
					}
					if(this.tabnums == 3){
						data.status = '3,4';
					}
					if(this.tabnums == 4){
						data.status = '5';
					}
				}
				
				let url = "";
				if(this.tableConfig.url) {
					url = this.tableConfig.url;
				} else {
					url = this.tableConfig["url"+ this.tabnums];
				}
				
				if(this.tableConfig.project_id){
					data.project_id = this.$parent.project_id;
				}
				
				if(this.tableConfig.project_id){
					data.project_id = this.$parent.project_id;
				}
				if(this.tableConfig['data'+this.tabnums]){
					data[this.tableConfig['data'+this.tabnums].name] = this.tableConfig['data'+this.tabnums].id;
				}
				this.api[url](data).then((da) => {
					this.tableDatas = da.data;
					this.total = da.total;
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			},
			autoTableHeight() {
				//设置table标签
				setTimeout(() => {
					this.tableHeight = this.$refs.elememt.offsetHeight / 100 * 88;
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
			openwindowrouter(url,id){
				const {href} = this.$router.resolve({ path: url,query:{
					id:id
				}})
				window.open(href, '_blank')
			},
			gettableConfiglist(n){
				if(this.tableConfig.list){
					this.tableConfiglist = this.tableConfig.list
				} else {
					this.tableConfiglist = this.tableConfig['list'+ n];
					//console.log(this.tableConfiglist)
				} 
				
				if(!this.tableAction.num){
					this.tableActions = this.tableAction;
					//console.log(this.tableActions)
				} else {
					this.tableActions = this.tableAction['tableAction'+ n];
				}
				
				if(!this.tableAction.num){
					this.filterField = this.filterFields;
				} else {
					this.filterField = this.filterFields['filterFields'+ n];
				}
				
				if(!this.commonTopData.num){
					this.commonrightbtn = this.commonTopData.commonrightbtn;
				} else {
					this.commonrightbtn = this.commonTopData['commonrightbtn'+ n];
				}
				
			},
			
		},
		mounted() {
			
			
			this.autoTableHeight();
			//console.log(this.tableConfig)
			this.init();
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
			if(this.$route.query.tabsnum){
				this.tabsChange(parseInt(this.$route.query.tabsnum));
			} else {
				this.tabsChange(parseInt(this.commonTopData.tabnums));
			}
		},
		created() {
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			//console.log(this.$route.matched[this.$route.matched.length-1].meta.title);
		}
	}
</script>
<style>
	.transparent{
		width: 100%;
		height: 20px;
		background: transparent;
	}
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
	
	.projectstatus0{
		color:#bfbfbf;
	}
	.projectstatus1{
		color:#008dff;
	}
	.projectstatus2{
		color:#008dff;
	}
	.projectstatus3{
		color:#008dff;
	}
	.projectstatus4{
		color:#008dff;
	}
	.projectstatus5{
		color:#4dc600;
	}
	.projectstatus-1{
		color: #f72522;
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
	.ctcontent {
		background: white;
		margin-bottom: 20px;
	}
	
	.paddingb10 {
		padding-bottom: 10px;
	}
	
	.padding10 {
		padding: 10px 0;
	}
	
	.cttitle {
		line-height: 60px;
		padding-bottom: 20px;
	}
	
	.tagbts {
		display: flex;
		align-items:center;
		height: 100%;
		overflow-x: auto;
	}
	
	.lefttit{
		position: absolute;
		height: 60px;
		line-height: 60px;
		left: 40px;
	}
	
	.tabs{
		width: auto;
		padding: 0 20px;
		height: 58px;
		display: inline-block;
		cursor: pointer;
	}
	
	.tabactive{
		color: #FF5121;
		border-bottom: 2px solid #FF5121;
	}
	
	.badge .el-badge__content.is-fixed{
		top:13px
	}
	
	.marginl0{
		margin-left: 0;
	}
	
	.screenborder {
		width: 772px;
		background: #FFFFFF;
		border-radius: 5px;
		margin: auto;
	}
	
	.screenMiddenul {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		flex-flow: row wrap;
	}
	
	.screenMiddenul li {
		margin-top: 27px;
	}
	
	.el-select-dropdown .checkboxipt {
		width: 200px;
		height: 32px;
		margin: 7px auto 14px;
		display: block;
	}
	
	.checkboxipt input {
		display: block;
		height: 32px;
		margin: 0 auto;
	}
	
	.el-select-dropdown__item .el-checkbox {
		width: 100%;
	}
	
	.sel-text .screentext{
		width: 200px;
		height: 32px;
		line-height: 32px;
		display: block;
	}
	
	.screentext .el-input__inner {
		height: 32px;
		line-height: 32px;
	}
	
	.screentextbg{
		padding:5px 12px;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
		border-radius: 4px;
		position: relative;
		z-index: 2013;
	}
	#app .el-dropdown-link{
		padding: 0;
	}
</style>
