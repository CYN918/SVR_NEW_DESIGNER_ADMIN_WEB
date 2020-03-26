<template>
	<div class="wh">
		<div class="wh">
			<common-top :commonTopData="commonTopData" v-if="tabsnum == 1"></common-top>
			<common-top :commonTopData="contributeData" v-if="tabsnum == 0"></common-top>
			<div class="detailtitle ofh relative Detail">
				<div style="margin-bottom: 32px;">
					<div class="textcenter">
						<span style="height: 30px;" :class="tabsnum == 1 ? 'tabs tabactive' : 'tabs'"
						@click="tabsChange(1)">全部作品</span>
						<span style="height: 30px;" :class="tabsnum == 0 ? 'tabs tabactive' : 'tabs'"
						@click="tabsChange(0)">投稿作品</span>
					</div>
				</div>
				
			</div>
			<div  style="height: calc(100% - 235px);margin-top: 20px;background-color: white;" v-if="tabsnum == 1">
				<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
				 ref="Tabledd"></common-table>
			</div>
			<div style="height: calc(100% - 205px);margin-top: 20px;" v-if="tabsnum == 0">
				<Contribute :tableDatas="tableData" :tableConfig="tableConfig" ref="Tabledd"></Contribute>
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
		<el-dialog title="请选择录用方式" :visible.sync="centerDialogVisible2" width="520px">
			<div style="position: relative;">
				<div class="textcenter">
					<div class="employment">
						<span>
							<span :class="['number',{'numberactive':!Isnextshow}]">1</span>
							<span :class="{'fontactive':!Isnextshow}">绑定综合平台需求</span>
						</span>
						<span :class="['centerline',{'centerlineactive': Isnextshow}]"></span>
						<span>
							<span :class="['number',{'numberactive':Isnextshow}]">2</span>
							<span :class="{'fontactive': Isnextshow}">选择录用方案</span>
						</span>
					</div>
					<div v-if="Isnextshow" style="padding-top: 30px;">
						<!-- <span style="margin-right:0;height: auto;" v-for="(item,index) in tabData1" :key="item.name" :class="tabsnum1 == index ? 'tabs tabactive' : 'tabs'"
						 @click="tabsChange1(index,item.name)">
							
							{{ item.name }}
						</span> -->
						<!-- <span style="margin-right:0;height: auto;color: gainsboro;" class="tabs">
							分成式
						</span> -->
					</div>
					
					<div class="textcenter employipt" v-if="!Isnextshow">
						<span style="display: inline-block;margin-right: 60px;">选择需求</span>
						<el-select v-model="did" placeholder="请选择">
							 <el-radio-group v-model="did">
								<el-option v-for="(item,index) in demandlist" :key="index" :value="item.did" :label="item.demand_name">
									<el-radio :value="item.did" :label="item.did">{{ item.demand_name }}</el-radio>
								</el-option>
							</el-radio-group>
						</el-select>
					</div>
					<div v-if="tabsnum1 == 0 && Isnextshow">
						<div class="textcenter employipt">
							<span style="display: inline-block;width: 84px;text-align: right;">买断录用价格</span>
							<span class="defaultbtn0 employmonre" style="border-color: #DCDFE6;"><input class="w fleft" type="text" v-model="price"> <span style="color: #DCDFE6;">单位：元</span></span>
						</div>
					</div>
					<div v-if="tabsnum1 == 1 && Isnextshow">
						暂无
						<!-- <div class="textcenter employipt">
							<span style="display: inline-block;width: 84px;text-align: right;">录用价格</span>
							<span class="defaultbtn0 employmonre" style="border-color: #DCDFE6;"><input class="w fleft" style="color: #DCDFE6;" type="text" v-model="price2">单位：元</span>
						</div>
						<div class="textcenter employipt">
							<span style="display: inline-block;width: 84px;text-align: right;">预计投放渠道</span>
							<span class="defaultbtn0 employmonre" style="border-color: #DCDFE6;"><input class="w fleft" style="color: #DCDFE6;" type="text" v-model="channel"><span style="color: transparent;">1</span></span>
							<el-select v-model="value" class="employmonre" placeholder="请选择" multiple>
								<el-option
								  v-for="item in options"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							  </el-select> <span class="defaultbtn0 employmonre"><input class="w fleft" type="text">单位：元</span>
						</div> -->
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class="defaultbtn" @click="prev()" v-show="Isnextshow">上一步</button>
				<button class="defaultbtn" @click="reject2()">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="next()"  v-show="!Isnextshow">下一步</button>
				<button class="defaultbtn defaultbtnactive" v-show="Isnextshow" @click="workhire">确认</button>
			</span>
		</el-dialog>
		<el-dialog title="合同ID" :visible.sync="centerDialogVisible3" custom-class="width610">
			<div style="position: relative;">
				<div class="textcenter">
					<div class="textcenter employipt">
						<span style="display: inline-block;margin-right: 60px;">合同ID</span>
						  <el-input placeholder="请输入内容" style="width: 357px;" v-model="contract_id"></el-input>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				
				<button class="defaultbtn" @click="centerDialogVisible3 = false">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="setcontractid">确认</button>
			</span>
		</el-dialog>
		<el-dialog title="作品信息-设为平台推荐作品" :visible.sync="centerDialogVisible1" width="406px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<span class="fleft Dialogkey">作品ID</span>
						<span class="fleft">{{ selectOne.work_id }}</span>
					</li>
					<li class="w ofh">
						<span class="fleft Dialogkey">作品名称</span>
						<span>{{ selectOne.work_name }}</span>
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
				<button class=""></button>
				<el-button type="primary" @click="contributor('on')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import commonTop from '@/components/commonTop.vue'
	import commonTable from '@/components/commonTable.vue'
	import DataScreen from "@/assets/DataScreen.js"
	import Contribute from "./contribute"

	export default {
		components: {
			commonTop,
			commonTable,
			Contribute,
		},
		props: {},
		data() {
			return {
				centerDialogVisible: false,
				centerDialogVisible1: false,
				centerDialogVisible2:false,
				centerDialogVisible3:false,
				bts: DataScreen.screenShow.workInfo.bts,
				defaultbts: DataScreen.screenShow.workInfo.defaults,
				tableAction: DataScreen.screenShow.workInfo.action,
				filterFields: DataScreen.screen.workInfo.filterFields,
				screenShowDataChange: "",
				IsDetail: false,
				tabsnum1:0,
				tabsnum:1,
				tabData1:[{
					name: "买断式"
				}/* , {
					name: "分成式"
				} */],
				commonTopData: {
					"pageName": "workInfo",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					},
					{
							name: '展示字筛选',
							id: "right2",
						},
						{
							name: '导出数据',
							id: "right3",
							accessid: '200309'
						} ],
					"commonrightbtn": [{
							name: '批量操作',
							id: "right1",
							accessid: '200307'
						},
						
					],
					"commonbottombtn": [],
				},
				contributeData:{
					"pageName": "workInfo",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}, ],
					"commonrightbtn": [],
					"commonbottombtn": [],

				},
				screenConfig: [],
				tableConfig: {
					"pageName": "workInfo",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: [],
					ischeck: true,

				},
				tableData: [],
				detailData: {},
				radioS: "",
				selectData: [],
				selectOne: {},
				Isnextshow:false,
				contract_id:"",
				workid:"",
				price:"",
				seltotal:"",
				isajax:0,
				did:'',
				demandlist:[],
				demand_names:[],
				adminuseraccess:[],
			}
		},
		methods: {
			tabsChange(num) {
				this.tabsnum = num;
				this.getData({pageCurrent:1,pageSize:50});
			},
			setLoding(type){
				// console.log(type)
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg) {
				//获取子组件表格数据
				if(this.tabsnum == '1'){
					var data = {
						access_token: localStorage.getItem("access_token"),
						page: pg.pageCurrent,
						limit: pg.pageSize,	
					}
				}else{
					var data = {
						access_token: localStorage.getItem("access_token"),
						page: pg.pageCurrent,
						limit: pg.pageSize,
						is_platform_work: 1,	
					}

				}
				//获取筛选的条件
				//console.log(JSON.parse(this.$route.query.urlDate))
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					/* sreenData.is_export = is_export; */
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
					// console.log(data)
				}
				
				if(this.isajax==1){
					return
				}
				this.isajax=1;

				/* if(is_export == 1){
					let form = document.createElement('form');
					
					
					
				} */
				this.api.workList(data).then((da) => {
					
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					if(this.tableConfig.ischeck){
						this.$refs.Tabledd.change(da.data);
					}
					this.setLoding(false);
					this.isajax=0;
				}).catch(() => {
					this.isajax=0;
					this.setLoding(false);
				});

				/* this.setLoding(false); */
			},
			getScreenShowData() {
				//获取字段展示-筛选修改
				eventBus.$on("screenShowDataChange", (data) => {
					this.tableConfig.list = [];
					this.forshowkey(data)
				});

				//获取字段展示-筛选初始化
				if (localStorage.getItem("screenShowDataChange")) {
					this.forshowkey(localStorage.getItem("screenShowDataChange").split(','))
				} else {
					this.forshowkey(this.defaultbts);
				}
			},
			forshowkey(data) {
				//筛选展示字段
				this.tableConfig.list = [];
				this.bts.forEach(item => {
					const val = item;
					data.forEach(item1 => {
						if (val.prop == item1) {
							this.tableConfig.list.push(val)
						}
					})
				})
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:1,pageSize:50});
				})
			},
			linkDetail(id) {
				//alert(id);
				this.IsDetail = true;
				this.api.getUserInfo({
					open_id: id
				}).then(da => {
					this.detailData = da;
				}).catch(() => {

				})
			},
			setContributor(val) {
				this.selectOne = val;
				this.radioS = this.selectOne.recommend_level;
				this.centerDialogVisible1 = true;
			},
			contributor(info) {
				// console.log(info)
				//console.log(this.selectData);
				var work_ids = this.getworkids();
				this.centerDialogVisible = false;
				this.centerDialogVisible1 = false;
				this.api.getRecommendCountwork({
					access_token:localStorage.getItem("access_token"),
					work_ids:work_ids,
				}).then(da => {
					if(info == 'on'){
						let data = {
							work_id: work_ids,
							recommend_level: this.radioS,
							access_token: localStorage.getItem("access_token"),
						};
						//alert(this.$refs.Tabledd.sel);
						//return;
						if(this.$refs.Tabledd.sel == false) {
							data = {};
							if(this.$route.query.urlDate){
							    data = JSON.parse(this.$route.query.urlDate);
							}
							data.access_token = localStorage.getItem("access_token");
							data.recommend_level = this.radioS;
						} 
						
						this.api.setRecommendLevelwork(data).then(da => {
							this.getData({pageCurrent:1,pageSize:50});
							this.$refs.Tabledd.setinit();
						}).catch(() => {
							this.$refs.Tabledd.setinit();
					    });

					}else{
						// console.log(da)
						this.$confirm('有'+ da +'个作品已经是平台推荐作品</br>是否统一将推荐评级修改为'+this.radioS, '确认修改', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							dangerouslyUseHTMLString: true,
							type: '',
							center: true
						}).then(() => {
							// console.log(this.radioS)
							let data = {
								work_id: work_ids,
								recommend_level: this.radioS,
								access_token: localStorage.getItem("access_token"),
							};
							//alert(this.$refs.Tabledd.sel);
							//return;
							if(this.$refs.Tabledd.sel == false) {
								data = {};
								if(this.$route.query.urlDate){
									data = JSON.parse(this.$route.query.urlDate);
								}
								data.access_token = localStorage.getItem("access_token");
								data.recommend_level = this.radioS;
							} 
							
							this.api.setRecommendLevelwork(data).then(da => {
								this.getData({pageCurrent:1,pageSize:50});
								this.$refs.Tabledd.setinit();
							}).catch(() => {
								this.$refs.Tabledd.setinit();
							});
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已经取消'
							});
							this.$refs.Tabledd.setinit();
						});

					}
					
				}).catch(da => {
					
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
				form.setAttribute("action", "http://dev-api-ndesigner-admin.idatachain.cn/admin/work/list")
				if(window.location.host=='shiquaner-admin.zookingsoft.com'){
				   form.setAttribute("action", "http://shiquaner-admin-api.zookingsoft.com/admin/work/list")
				}
				document.body.appendChild(form);
				form.submit();
			},
			getworkids() {
				//console.log(this.selectData);
				var workids = '';
				this.selectData.forEach((item, index) => {
					workids += (index == (this.selectData.length - 1)) ? item.work_id : item.work_id + ",";
				})
				if (this.centerDialogVisible) {
					workids = workids
				};

				if (this.centerDialogVisible1) {
					workids = this.selectOne.work_id;
				}
				return workids;
			},
			getcommonrightbtn() {
				this.commonTopData.commonbottombtn = [];
				if (this.$route.query.urlDate) {
					const urldata = JSON.parse(this.$route.query.urlDate);
					
					this.filterFields.forEach(item => {
						// console.log(item);
						if(urldata.classify_1 != undefined){
							if (item.type == "linkage") {
							// console.log(urldata.classify_1)
							if(item.child){
								item.child.forEach(citem => {
									
										if(urldata.classify_1.split(",").indexOf(citem.value) != -1){
											this.commonTopData.commonbottombtn.push({
												btnName: item.name,
												val: citem.label,
												id: citem.value
											})
											citem.children.forEach(element => {	
												
													if(urldata.classify_2.split(",").indexOf(element.value) != -1){
														this.commonTopData.commonbottombtn.push({
															btnName: item.name,
															val: element.label,
															id: element.value
														})
														element.children.forEach(val => {
															
																if(urldata.classify_3.split(",").indexOf(val.value) != -1){
																	this.commonTopData.commonbottombtn.push({
																		btnName: item.name,
																		val: val.label,
																		id: val.value
																	})
																}
																												
														})
													}
																							
											})
										}
												
								})
							}
						};
						
					    }else{
							if (urldata[item.id]) {
								var val = urldata[item.id];
								if (item.child) {
									val = "";
									item.child.forEach(citem => {
										//alert(urldata[item.id])
										if (citem.id == urldata[item.id]) {
											val = citem.name;
										}
									})
								}
								this.commonTopData.commonbottombtn.push({
									btnName: item.name,
									val: val,
									id: item.id
								});
								//console.log(this.commonTopData.commonbottombtn);
							}
							if (item.type == "two") {
								if (item.child) {
									item.child.forEach(citem => {
										if (urldata[citem.id]) {
											this.commonTopData.commonbottombtn.push({
												btnName: citem.name,
												val: urldata[citem.id],
												id: citem.id
											})
										}
									})
								}
								//this.commonTopData.commonbottombtn.push({btnName:item.child[0].name,val:val,id:item.child[0].id})
								/* this.commonTopData.commonbottombtn.push({btnName:item.child[0].name,val:val,id:item.child[0].id});
								this.commonTopData.commonbottombtn.push({btnName:item.child[1].name,val:val,id:item.child[1].id}); */
							};

						}

						
						
					})
				}

			},
			resetSave(tag) {
				if (this.$route.query.urlDate) {
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					//console.log(tag);
					this.$router.push({
						path: '/workManager/workInfo',
						query: {
							urlDate: JSON.stringify(urldata)
						}
					});
				}
			},
			tabsChange1(num){
				this.tabsnum1 = num;
			},
			reject2() {
				this.centerDialogVisible2 = !this.centerDialogVisible2;
			},
			next(){
				this.Isnextshow = true;
			},
			prev(){
				this.Isnextshow = false;
			},
			getLevelworkCount(){
				this.api.getLevelCount({
					access_token:localStorage.getItem("access_token"),
					recommend_level:"",
				}).then(da => {
					
				}).catch(da => {
					
				})
			},
			setcontractid(){
				
				this.api.bindContract({
					access_token:localStorage.getItem("access_token"),
					work_id:this.workid,
					contract_id:this.contract_id
				}).then(da => {
					this.centerDialogVisible3=!this.centerDialogVisible3;
				}).catch(da => {
					this.centerDialogVisible3=!this.centerDialogVisible3;
				})
			},
			workhire(){
				this.centerDialogVisible2=!this.centerDialogVisible2;
				this.$confirm('确定录用该作品', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					this.api.hire({
						work_id: this.workid,
						hire_type: 1,
						price:this.price,
						demand_id:this.did,
						access_token: localStorage.getItem("access_token"),
					}).then(da => {
						
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			getWorkclassify(){
				this.api.Workclassify({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.formatRoutes(da);
					let routers = this.formatRoutes(da);
					// console.log(routers)
					// console.log(da)
					DataScreen.screen.workInfo.filterFields[4].child = routers
					// DataScreen.screen.workInfo.filterFields[4].child = da
				})
			},
			formatRoutes(routerArr){
				const arr = [];
				let obj = {};
				routerArr.forEach(router => {
					const tmp = { ...router };
					if (tmp.sub_data){
						tmp.sub_data = this.formatRoutes(tmp.sub_data);
						obj = {
							value: tmp.id,
							label: tmp.classify_name,
							children: tmp.sub_data,
						}
					}else{
						obj = {
							value: tmp.id,
							label: tmp.classify_name,
						}
					}
					arr.push(obj);
				})
				return arr;
			},
			getval(item,classify){
				var name = "";
				item.forEach(item=>{
					if(item.id == classify){
						name = item.classify_name;
					} else {
						console.log(item)
						item.forEach(item1=>{
							if(item1.id == classify){
								name = item1.classify_name;
							} else {
								item.forEach(item2=>{
									if(item2.id == classify){
										name = item2.classify_name;
									}
								})
							}
						})
					}
				})
				return name;
			},
			getdemandlist(){
				this.api.demandlist({
					access_token:localStorage.getItem("access_token"),
					is_activity:0
				}).then(da=>{
					// console.log(da);
					this.demandlist = da
				})
			},
		},
		created() {
			this.getScreenShowData();
			this.screenreach();
			this.getcommonrightbtn();
			this.getWorkclassify();
			this.getdemandlist();
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"));
			}
		},
		mounted() {
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

	.el-radio__input.is-checked+.el-radio__label {
		color: #FF5121;
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
	/* .el-button--small, .el-button--small.is-round{
		width: 100px;
		height: 40px;
	} */

	/* .el-button:focus, .el-button:hover{
		border-color: #FF5121;
		color: #FF5121;
	} */
	.bannerlistg{
		width:750px;
		height:270px;
		border-radius:5px;
		border: 1px solid #E6E6E6;
		margin-bottom: 20px;
		
	}
	
	.screenContent1{
		display: flex;
		align-items: center;
		overflow: hidden;
		flex-wrap: wrap;
		justify-content:space-between;
		padding:0 20px;
	}
	
	#app .defaultbtn1400{
		margin-right: 20px;
	}
	
	@media screen and (max-width: 1860px) {
		.bannerlistg{
			width:calc(50% - 8px);
			height:270px;
			border-radius:5px;
			border: 1px solid #E6E6E6;
			margin:0 1;
			margin-bottom: 20px;
			
		}
		
		.screenContent1{
			display: flex;
			align-items: center;
			overflow: hidden;
			flex-wrap: wrap;
			justify-content:space-between;
			
		}
		
		#app .defaultbtn1400{
			width: 80px;
			margin-left: 0;
			margin-right: 5px;
		}
	}
	
	
	
	.scrollbar{
		height: calc(100% - 90px);
		background-color: white;
		overflow-y: auto;
	}
	
	/* width:calc(50% - 8px); */
	
	.bannerlisttag0 {
		width:100px;
		height:40px;
		border-radius:0px 5px 0px 5px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:40px;
		text-align: center;
	}
	
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

	.detailContent1 {
		height: calc(100% - 139px);
		overflow-y: auto;
	}

	.detailContent1>ul {
		padding-left: 132px;
		padding-top: 64px;
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
	.wh{
		overflow: hidden;
	}
</style>
