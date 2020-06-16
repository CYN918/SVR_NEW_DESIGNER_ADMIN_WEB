<template>
	<div class="wh">
		<div class="w ctcontent">
			<div style="background: white;">
				<div class="margin40 cttitle" style="height: 60px;line-height: 60px;margin:0px 10px 15px 10px;">
					<div class="fleft hnav marginleft60 fontcolorg" style="width: 18%;float:left;">
						<el-breadcrumb separator="/" class="fontcolorg">
							<img src="../assets/img/tabbar_icon_file_24_pressed.svg" style="margin-right:3px;position: relative;top:22px;float: left;">
							<el-breadcrumb-item v-for="(item,index) in names" :key="item.index">{{item.meta.title}}</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div v-if="commonTopData.tabData" class="textcenter" style="width: 69%;float:left;">
						<span 
						v-for="(item,index) in commonTopData.tabData" 
						:class="['tabs',item.isAc?'tabactive':'']" 
						@click="tabsChange(item.path)"
						>
							<el-badge 
							:value="doCount[(index+1)] == 0 ? '' : doCount[(index+1)]" 
							:max="99" class="badge">{{ item.name }}</el-badge>
						</span>
					</div>
					<div class="fright hnav marginright60" style="position: relative;float:right;width:13%;">
						<router-link v-if="backTO()" :to="backTO()" tag="div" class="fleft pointer">
							<span class="dp fontsize18">审核台</span>
							<span class="dp sel-badge" v-html="reviewnum">99+</span>
						</router-link>
						
						<div class="fright marginleft60 pointer" @click="signOut">{{ this.user.name }}</div>
						<!-- <span  :style="{'background':'url('+userimg+')'}" @click="signOut"></span> -->
						<div class="userinfobtn" v-if="IsSign" style="z-index: 2004;">
							
							<div @click="getuser()"><i class="el-icon-setting" style="margin-right: 8.2px;"></i>账号信息</div>
							<div @click="out()"><i class="iconfont" style="margin-right: 8.2px;padding-left: 0;">&#xe67f;</i>退出登录</div>
						</div>
						<div class="masku" v-if="IsSign" @click="signOut"></div>
					
					</div>
				</div>
			</div>
			<div :class="['borderb','margin40',{marginl0:commonTopData.IsShow}]" style="position: relative;margin-bottom: 15px;" v-if="commonTopData.commonleftbtn.length != '0'">
				<div class="ofh">
				
					<div class="fleft" style="float:right;">
						
						<div class="btnorgle" v-if="item.is != commonTopData.tabnums" v-for="(item,index) in commonTopData.commonleftbtn" @click="getparent(item.fun)"><img src="../assets/img/icon_sx.svg" alt="" style="margin-right:3px;position: relative;top:1px;">{{ item.name }}</div>	
						
					</div>
					<div class="fright" style="float:left;">
						<span :class="['chNbtn',el.v==tableConfig.status?'chNbtncheck':'']" v-for="el in tableAction.chNav" @click="chNav(el.v)">{{el.n}}</span>
						
						<div class="fleft" v-for="(item,index) in commonrightbtn" :key="item.id">
							<div v-if="item.accessid && (adminuseraccess.indexOf(item.accessid) > -1)">
								<button v-if="!commonTopData.upload" class="defaultbtn" @click="getparent(item.fun)">{{ item.name }}</button>
								<div class="sel-tooltip" v-if="item.id == 'right1' && Istooltip" style="z-index: 2004;">
									<div v-for="(item,index) in operations" :key="item.name" class="comonbtn" @click="IsShow(index)">{{ item.name }}</div>
								</div>
								<div class="masku" v-if="item.id == 'right1' && Istooltip" @click="Istooltip = false"></div>
								<button v-if="commonTopData.upload && !item.status" class="defaultbtn defaultbtnactive" @click="getparent(item.fun)">{{ item.name }}</button>
								<button v-if="commonTopData.upload && item.status && (commonTopData.tabnums == item.status)" class="defaultbtn defaultbtnactive" @click="getparent(item.fun)">{{ item.name }}</button>
							</div>
							<div v-if="!item.accessid">
								<button v-if="!commonTopData.upload" class="defaultbtn" @click="getparent(item.fun)">{{ item.name }}</button>
								<div class="sel-tooltip" v-if="item.id == 'right1' && Istooltip" style="z-index: 2004;">
									<div v-for="(item,index) in operations" :key="item.name" class="comonbtn" @click="IsShow(index)">{{ item.name }}</div>
								</div>
								<div class="masku" v-if="item.id == 'right1' && Istooltip" @click="Istooltip = false"></div>
								<button v-if="commonTopData.upload && !item.two" class="defaultbtn defaultbtnactive" @click="getparent(item.fun)">{{ item.name }}</button>
								<button v-if="commonTopData.upload && item.two && settrue(item.two.id1,item.two.id2)" class="defaultbtn defaultbtnactive" @click="getparent()">{{ item.name }}</button>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div class="wh" ref="elememt" id="table" v-loading="loading">
			<el-table ref="multipleTable" :reserve-selection="true" :row-key="getRowKeys" :data="tableDatas" tooltip-effect  :header-cell-style="cellStyle" style="width: 100%" :height="tableHeight" @selection-change="handleSelectionChange">
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
								<span :class="'status'+scope.row['status']">●</span><span>{{item.child.status[scope.row['status']] }}</span>
							</span>
							<span v-else-if="scope.row['is_del'] != '0'">
								<span class="status-1">●</span><span>{{item.child.is_del[scope.row['is_del']] }}</span>
							</span>
						</div>
						<span v-else-if="item.type == 'zq'">
							{{ scope.row.production_cycle_d+'天 '+scope.row.production_cycle_h+'时' }} 
						</span>
						<span v-else-if="item.type == 'keyvalue'"><span>{{ item.child[scope.row[item.prop]] ? item.child[scope.row[item.prop]] : item.child.no }}</span></span>
						<span v-else-if="item.type == 'novalue'"><span>{{ scope.row[item.prop] != "" ? scope.row[item.prop] : item.novalue }}</span></span>
						<span v-else-if="item.type == 'status'"><span :class="item.statusclass+scope.row[item.prop]">●</span><span>{{item.child[scope.row[item.prop]] }}</span></span>
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
							<span v-if="tableActions.links && gettrue(tableActions.links.accessid)" @click="handleClick(tableActions.links.fun,scope.row)" class="pointer" style="padding: 0 10px;color:#33B3FF;font-size: 14px;">{{ tableActions.links.name( tableActions.links.filterdata ?  scope.row[tableActions.links.filterdata] : '') }}</span>
							<el-button @click="handleClick(tableActions.morebtns.fun,scope.row)" type="text" size="small" v-if="tableActions.morebtns && !tableActions.morebtns.child && gettrue(tableActions.morebtns.accessid)">{{ tableActions.morebtns.name(tableActions.morebtns.filterdata ?  scope.row[tableActions.morebtns.filterdata] : '') }}</el-button>
							<el-dropdown trigger="click" v-if="tableActions.morebtns && tableActions.morebtns.child">
								<span class="el-dropdown-link">{{ tableActions.morebtns.name}}</span>
								<el-dropdown-menu class="sel-tooltip" slot="dropdown">
									<el-dropdown-item 
									v-if="gettrue(citem.accessid) && citem.name(citem.filterdata ? scope.row[citem.filterdata] : '')" 
									v-for="(citem,index) in tableActions.morebtns.child" 
									:key="index" class="comonbtn" 
									@click.native="handleClick(citem.fun,scope.row,index)">
									{{citem.name(scope.row)}}</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<span v-if="tableActions.filterbtn && gettrue(tableActions.filterbtn.accessid)" @click="handleClick(tableActions.filterbtn.fun,scope.row)" class="pointer" style="padding: 0 10px;color:#33B3FF;font-size: 14px;">{{ tableActions.filterbtn.name(tableActions.filterbtn.filterdata ? scope.row[tableActions.filterbtn.filterdata] : "") }}</span>
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
					<div class="screenMidden paddinglr30" style="margin-top:35px;">
						<ul class="screenMiddenul ofh w" style="padding-bottom:85px;">
							<li v-for="(item,index) in filterField" :key="item.id">
								<div class="label">
									{{ item.name }}
								</div>
								<!-- form.selct[item.a] -->
								<el-input v-if="item.type=='input'" class="ipt" placeholder="请输入内容" v-model="form[item.id]" clearable></el-input>
								<el-dropdown v-if="item.type == 'more'" trigger="click" :hide-on-click="false">
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
								<el-select v-if="item.type=='selet'" v-model="form[item.id]" placeholder="请选择" >
									<el-option value="" label="全部"></el-option>
									 <el-radio-group v-model="form[item.id]">
										<el-option v-for="(childitem,index) in item.child" :value="childitem.id" :label="childitem.name">
											<el-radio :value="childitem.id" :label="childitem.id">{{ item.vk?childitem[item.vk]:childitem.name }}</el-radio>
										</el-option>
									</el-radio-group>
								</el-select>
								 <el-date-picker
									v-if="item.type == 'time'"
								   @change="timetwo(item.child,index)"
								  class="ipt"
								  v-model="times[index]"
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
								<div v-if="item.type == 'two'">
									<el-input v-model="form[item.child[0].id]" class="ipt90" placeholder="请输入内容" clearable></el-input>
									<span style="padding: 0 9px;">至</span>
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
							<button class="fright defaultbtn defaultbtnactive" @click="cha('reach')">查询</button>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
    import DataScreen from "@/assets/DataScreen.js"
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
				filterField:[],
				dataProjectId: '',
				newtemplateId: '',
				names: [],
				IsSign: false,
				reviewnum:0,
				user:"",
				userimg:'../assets/img/MRTX.svg',
				adminuseraccess: [],
				auditTitle: '',
				firstId:[],
			}
		},
		methods: {
			backTO(){
				if(this.adminuseraccess.indexOf('11')==-1){
					return
				}
				if(this.firstId.indexOf('12')!=-1){
					return '/review/publishWork';
				}
				if(this.firstId.indexOf('13')!=-1){
					return '/review/finalistsWork';					
				}
				if(this.firstId.indexOf('14')!=-1){
					return '/review/employWork';					
				}
				if(this.firstId.indexOf('15')!=-1){
					return '/review/applyPerson';					
				}
				if(this.firstId.indexOf('16')!=-1){
					return '/review/projectreview/projectrepending';					
				}
			},
			handleClose(tag,index) {
				let obj = {}
				let obj1 = {}
				let obj2 = {}
				let obj3 = {}
				let obj4 = {}
				this.commonTopData.commonbottombtn.splice(index, 1);
				this.commonTopData.commonbottombtn.forEach(item => {
					if(this.commonTopData.tabnums == 0){
						if(item.id == "name"){
							let obj = {name: item.val};
						}
						if(item.id == "sort"){
							let obj1 = {sort: item.val};
						}
						if(item.id == "total_work_num_start"){
							let obj2 = {total_work_num_start: item.val};
						}
						if(item.id == "total_work_num_end"){
							let obj3 = {total_work_num_end: item.val};
						}
					}else{
						if(item.id == "program_begin_time"){
							let obj = {program_begin_time: item.val};
						}
						if(item.id == "program_end_time"){
							let obj1 = {program_end_time: item.val};
						}
						if(item.id == "status"){
							let obj2 = {status: item.val};
						}
					}		
				})	
				Object.assign(obj4, obj, obj1, obj2, obj3);
				this.form = obj4;
				this.getTabData()
			},
			getcommonrightbtn(){
				this.commonTopData.commonbottombtn = [];
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate);
					this.tabFilterFields = this.filterFields['filterFields'+ this.commonTopData.tabnums];
					this.tabFilterFields.forEach(item=>{
						if(urldata[item.id]){
							var val = urldata[item.id];
							if(item.child){	
								val = "";
								item.child.forEach(citem=>{
									if(citem.id == urldata[item.id]){
										val = citem.name;
									}
								})
							} 
							this.commonTopData.commonbottombtn.push({btnName:item.name,val:val,id:item.id});
						} 
						if(urldata[item.project_id]){
							var val = urldata[item.project_id];
							if(item.child){	
								val = "";
								item.child.forEach(citem=>{
									if(citem.id == urldata[item.project_id]){
										val = citem.name;
									}
								})
							} 
							this.commonTopData.commonbottombtn.push({btnName:item.name,val:val,id:item.project_id});
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
			gettitle(){
				if(!this.commonTopData.tabDatatitle){
					return this.commonTopData.tabData[this.commonTopData.tabnums].name
				} else {
					return this.commonTopData.tabDatatitle
				}
			},
			timetwo(time,index){
				this.form[time[0].id] = this.times[index][0];
				this.form[time[1].id] = this.times[index][1];
			},
			gettrue(id){
				if(this.adminuseraccess.indexOf(id) > -1){
					return true;
				} else {
					return false;
				}
			},
			getparent(fun){
			
				if(fun == 'add20'){
					this.router.push({
						path:"/projectManagement/projectList/newproject"
					})
				}
				if(fun == 'add21'){
					this.router.push({
						path:"/projectManagement/projectclass/newtemplate",query:{id:this.newtemplateId}
					})
				}
				if(this.$parent[fun]){
					this.$parent[fun]();
				}
				if(this.$parent.$parent[fun]){
					this.$parent.$parent[fun]();
				}		
			},
			getData(){
				let data = {};
				data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 50,
				}
				this.api.projecttemplatelist(data).then((da) => {
					if(da.data.length != '0'){
						this.newtemplateId = da.data[0].id;
					}
					
					// this.dataList.sort(function(a,b){
					//     return b.id - a.id
					// })
				}).catch(() => {
					
				});
			},
			reset(){
				this.form ={};
				this.times = [];
			},
			reject(){
				this.centerDialogVisible = !this.centerDialogVisible;
			},
			tabsChange(path){
				this.router.push({
					path:path,
				});
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
									_this.$refs.multipleTable.toggleRowSelection(data[a],true);
								}, 100);
							}
							f(c)
							
							//_this.$refs.multipleTable.toggleRowSelection(data[i],true);
						}
					}
				}
				
			},
			cha(data){
				if (data == "reach") {
					if(this.vocation != ""){
						this.form['vocation'] = this.vocation.join(',');
					};
					
					if(this.selectedOptions.length != 0){
						this.form['classify_1'] = this.selectedOptions[0];
						this.form['classify_2'] = this.selectedOptions[1];
						this.form['classify_3'] = this.selectedOptions[2];
					}
					
					 this.$router.push({
						query: {
							urlDate: JSON.stringify(this.form)
						}
					});
					eventBus.$emit("sreenData", this.form);
					this.getcommonrightbtn();
					this.reject();
					this.getTabData();
				}
			    
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
				if (this.form) {
					const sreenData = JSON.parse(JSON.stringify(this.form));
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
				if(window.location.host=='120.27.22.130:8082'){
					form1.setAttribute("action", "http://120.27.22.130:8083/admin/project/list")
				}
	
				document.body.appendChild(form1);
				form1.submit();
			},
			getTabData() {
				//获取子组件表格数据
				let data = {};
				data = {
					access_token: localStorage.getItem("access_token"),
					page: this.currentpage,
					limit:this.pagesize,
				}
				//获取筛选的条件
				if (this.form) {
					const sreenData = this.form
					sreenData.page = this.currentpage;
					sreenData.limit = this.pagesize;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
				data.status = this.tableConfig.status;
				let url = "";
				if(this.tableConfig.url) {
					url = this.tableConfig.url;
				} else {
					url = this.tableConfig["url"+ this.commonTopData.tabnums];
				}
				
				if(this.tableConfig.project_id){
					data.project_id = this.$parent.project_id;
				}
				
				if(this.tableConfig.project_id){
					data.project_id = this.$parent.project_id;
				}
				if(this.tableConfig.project_type){
					data.project_type = this.tableConfig.project_type;
				}
				this.api[url](data).then((da) => {
					this.tableDatas = da.data;
					this.total = da.total;
					this.loading = false;
				}).catch(() => {
					this.loading = false;
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
			autoTableHeight() {
				//设置table标签
				setTimeout(() => {
					this.tableHeight = this.$refs.elememt.offsetHeight / 100 * 88;
				}, 100)
				//此处需要通过延迟方法来设置值，不然会出现值已更新，但页面没更新的问题
				//this.$refs.table.$el.offsetTop：表格距离浏览器的高度
			},
			init(){
				this.loading = !this.tableConfig.loading;
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
				} 
				
				if(!this.tableAction.num){
					this.tableActions = this.tableAction;
					this.filterField = this.filterFields;
				} else {
					this.tableActions = this.tableAction['tableAction'+ n];
					this.filterField = this.filterFields['filterFields'+ n];
				}
				
				
				if(!this.commonTopData.num){
					this.commonrightbtn = this.commonTopData.commonrightbtn;
				} else {
					this.commonrightbtn = this.commonTopData['commonrightbtn'+ n];
				}
				
			},
			gettodoCount(str){
				this.api.todoCount({
					access_token:localStorage.getItem("access_token"),
			
				}).then(da =>{
					// this.doCount = da;
					this.reviewnum = da.total;
					// eventBus.$emit("reviewnum",da.total);
					
				}).catch(da=>{
					
				})
			},
			getBreadcrumb() {
				this.names = this.$route.matched
			},
			signOut() {
				this.IsSign = !this.IsSign
			},
			// getbus(){
			// 	eventBus.$on("reviewnum",(data) =>{
			// 		this.reviewnum  = data;
			// 	})
			// },
			getuserinfo(){
				this.api.selfInfo({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.user = da;
					this.userimg = da.avatar? da.avatar : require('../assets/img/MRTX.svg');
				})
			},
			getuser(){
				this.router.push({
					path:"/userinfo/user",
					query:{
						info:JSON.stringify(this.user)
						
					}
				});
				this.signOut();
			},
			out(){
				this.signOut();
				this.$confirm('确认退出？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					this.api.logout({
						access_token:localStorage.getItem("access_token")
					}).then(da=>{
						if(da.result == 0){
							window.location.href = da.data;
						}
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
				
				
			},
			getaccess() {
				this.api.adminuseraccess({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.adminuseraccess = JSON.stringify(da);
				})
			},
			chNav(n){
				this.tableConfig.status = n;
				this.getTabData()
			},
			getaccess_list() {
				this.api.access({
					access_token:localStorage.getItem("access_token")
				}).then((da) => {
					let accessArry = da.data.top_banner;
					for(var i = 0;i < accessArry.length;i++){
						if(accessArry[i].id == '11'){
							var newArr = accessArry[i].child;
							this.firstId = [];
							let arr = [];
							newArr.forEach(element => {		
								this.firstId.push(element.id)
								if(element.id == '12'){
									arr.push(1)
								}
								if(element.id == '13'){
									arr.push(2)
								}	
								if(element.id == '14'){
									arr.push(3)
								}
								if(element.id == '15'){
									arr.push(4)
								}
								if(element.id == '16'){
									arr.push(5)
								}	
							});
							let str = arr.toString();
							this.gettodoCount(str);				
						}
					}

				})
			},
			
			
		},
		mounted() {
			this.autoTableHeight();
			this.init();	
		},
		created() {
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			this.getcommonrightbtn();
			this.getAddData();
			this.getData();
			this.getBreadcrumb();
			this.gettableConfiglist(0)
			// this.getbus();
			this.getuserinfo();
			this.getaccess();
			this.getaccess_list();
			this.getTabData();
	
		},
		watch:{
			"$route":function(){
				this.getcommonrightbtn();
			},
			$route() {
				this.getBreadcrumb();
				// this.gettodoCount();
			}
		}
	}
</script>
<style scoped="scoped">
    .screenborder >>> .ipt,.screenborder >>> .el-select>.el-input{
		width: 329px !important;
	}
	.wh >>> .el-dialog__header{
		position: fixed;
		width: 320px;
		background: #FFFFFF;
		z-index:999999;
		border-bottom: 1px #E6E6E6 solid;
	}
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
	
	.paddingb10 {
		padding-bottom: 10px;
	}
	
	.padding10 {
		padding: 10px 0;
	}
	
	/* .cttitle {
		line-height: 60px;
		padding-bottom: 20px;
	} */
	
	.tagbts {
		display: flex;
		align-items:center;
		height: 100%;
		/* overflow-x: auto; */
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
	
	/* .tabactive{
		color: #FF5121;
		border-bottom: 2px solid #FF5121;
	} */
	
	.badge .el-badge__content.is-fixed{
		top:13px
	}
	.el-badge__content{
		background: #33B3FF;
	}
	
	.marginl0{
		margin-left: 0;
	}
	.wh >>> .el-dialog{
        width: 380px;
		background: #FFFFFF;
		border-radius: 5px;
		right: 26px;
		top: 108px;
        position: absolute;
		overflow-y: scroll;
		height: calc(100% - 127px);
        margin-top: 0vh !important;
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
	.wh >>> .is-leaf{
		height: 60px;
		line-height: 60px;
		padding: 0;
	}
	#app .el-breadcrumb {
		line-height: 60px;
	}

	#app .el-breadcrumb__inner {
		color: #999999 !important;
	}

	.sel-badge {
		width: 38px;
		height: 24px;
		line-height: 24px;
		margin: 0 5px;
		text-align: center;
		border-radius: 24px;
		background: #33B3FF;
		color: white;
	}

	.usertou {
		width: 32px;
		height: 32px;
		margin: 14px 0;
		margin-left: 58px;
		border-radius: 50%;
	}

	.userinfobtn {
		width: 170px;
		border: 1px solid #E6E6E6;
		position: absolute;
		background: white;
		right: 0px;
		top: 50px;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.10);
		border-radius: 2px 2px 2px 2px;
		z-index: 888;
	}

	.userinfobtn div {
		height: 40px;
		padding: 0 19px;
		line-height: 40px;
		cursor: pointer;
	}

	.userinfobtn div:hover {
		background: #ffede8;
		color: #FF5121;
	}
    .label{
        color: #999999;
        font-size: 12px;
    }
	.sel-tooltip{
		width: 170px;
		border: 1px solid #E6E6E6;
		position: absolute;	
		background: white;
		margin-top: 9px;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
		border-radius: 2px 2px 2px 2px;
	}
	.sel-tooltip .comonbtn:hover{
		color: #33B3FF !important;
        background: #e5f5ff !important;
	}
	.el-popper{
		position: absolute;
		top: 332px;
	}
	.fleft > ul > li{
		display: inline-block;
	}
	.screenBottom{
		width: 380px;
		position: fixed;
		bottom: 2%;
		right: 1.33%;
		padding: 0;
		background: #FFFFFF;
		z-index: 999999;
	}
	.fright >>> .defaultbtn {
		border:1px solid #33B3FF !important;
		color: #ffffff !important;
		background: #33B3FF !important;
	}
	.chNbtn{
		
		display: inline-block;
		margin-right: 20px;
		cursor: pointer;
	}
	.chNbtn:hover{
		opacity: .7;
	}
	.chNbtncheck{
		color: #33B3FF;
	}
</style>