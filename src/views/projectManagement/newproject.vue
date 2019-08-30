<template>
	<div class="wh Detail" ref="height">
		<div class="detailtitle">
			<span class="fleft">{{ currentpageName }}</span>
			<div class="employment" style="text-align: center;">
				<span>
					<span :class="['number',{'numberactive':!Isnextshow}]">1</span>
					<span :class="{'fontactive':!Isnextshow}">基本信息</span>
				</span>
				<span class="centerline"></span>
				<span>
					<span :class="['number',{'numberactive':Isnextshow}]">2</span>
					<span :class="{'fontactive': Isnextshow}">项目详情</span>
				</span>
			</div>
		</div>
		<div class="detailContent" ref="scroll" style="height: calc(100% - 47px) !important;">
			<div v-show="!Isnextshow">
				<ul>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">项目名称</span>
						
						<el-input type="text" placeholder="请输入内容" :disabled="objstatus > 0" v-model="form['name']" style="width:357px;height:40px;" clearable  maxlength="20" show-word-limit></el-input>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">业务类型</span>
						<el-select v-model="form['business_type']" placeholder="请选择" :disabled="objstatus > 0">
							<el-radio-group v-model="form['business_type']">
								<el-option v-for="(item,index) in tableData2" :key="item.id" :value="item.id" :label="item.name">
									<el-radio :label="item.id">{{ item.name }}</el-radio>
								</el-option>
							</el-radio-group>
						</el-select>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">中标规则</span>
						<el-button-group>
							<el-button :disabled="objstatus > 0" :type="typebtn == 0 ? 'primary' : ''" @click="getrule(0)">全站用户海选</el-button>
							<el-button :disabled="objstatus > 0" :type="typebtn == 1 ? 'primary' : ''" @click="getrule(1)">制定制作人</el-button>
						</el-button-group>
						<div class="ofv" v-if="typebtn == 1" style="margin-top: 20px;">
							<span class="fleft detailKey" style="line-height: 40px;color: white;">1111</span>
							<el-button @click="getruledata()">选择指定创作者</el-button>
						</div>
						<div class="ofv" v-if="typebtn == 1" style="margin-top: 20px;">
							<span class="fleft detailKey" style="line-height: 40px;color: white;">1111</span>
							<ul class="screenContent" style="justify-content:left;flex-wrap:wrap;overflow-y: scroll;margin: 0;padding: 0;">
								<li class="yhlist" v-for="(item,index) in selectelists">
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
					</li>
				</ul>
				<ul style="border-top: 1px solid #E6E6E6;padding-top: 40px;margin-top: 40px;">
					
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">所属项目类型 / 模板</span>
						<el-select v-model="form['classify_id']" placeholder="请选择">
							<el-radio-group v-model="form['classify_id']">
								<el-option v-for="(item,index) in tableData1" :key="item.id" :value="item.id" :label="item.classify_name">
									<el-radio :label="item.id">{{ item.classify_name }}</el-radio>
								</el-option>
							</el-radio-group>
						</el-select>
						<div class="configbtn">
							<span class="fleft detailKey" style="line-height: 40px;color: transparent;">11</span>
							<button @click="reject1" class="defaultbtn" style="width: auto;padding: 0 10px;background: #000000;color: white;margin: 0;margin-top: 10px;">选择模板一建配置</button>
						</div>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">banner</span>
						<el-upload class="upload" action="454535" :http-request="httprequest" :show-file-list="false">
							<button class="defaultbtn" style="margin-left: 0;">上传图片</button>
							<div class="fontcolorg">1920px*620px，格式jpg，jpeg，png，大小不超过10M</div>
						</el-upload>
						<img v-if="form['banner']" :src="form['banner']" alt="" width="340px" height="110px" style="margin-left: 156px;">
					</li>
					
					
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">领域范围</span>
						<el-input placeholder="请输入内容" v-model="form['fields']" style="width:357px;height:40px;" clearable></el-input>
					</li>
					
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;" >模板文件</span>
						<div><button class="defaultbtn" style="margin-left: 0;" @click="dialogTable">选择模板文件</button></div>
						<span class="fontcolorg" style="margin-left: 160px;">{{ (selectData1.file_name ? selectData1.file_name : "--") +"&nbsp;&nbsp;&nbsp;&nbsp;"+ (selectData1.file_size_format ? selectData1.file_size_format : "--") }}</span>
					</li>
					
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">预计收益</span>
						<el-input placeholder="给创作者的收益预期,如: 20.00~30.00/张" v-model="form['expected_profit']" style="width:357px;height:40px;" clearable></el-input>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">额外赏金</span>
						<el-input placeholder="单位, 元; 额外赏金可吸引更多创作者报名" v-model="form['extra_reward']" style="width:357px;height:40px;" clearable></el-input>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">项目顾问QQ</span>
						<el-input placeholder="请填写QQ号, 项目顾问将负责解决创作者的疑问" v-model="form['qq']" style="width:357px;height:40px;" clearable></el-input>
					</li>
				</ul>
				<ul style="border-top: 1px solid #E6E6E6;padding-top: 40px;margin-top: 40px;">
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">发布时间</span>
						<el-date-picker
						  v-model="form['publish_time']"
						  type="datetime"
						  value-format="yyyy-MM-dd HH:mm:ss"
						  :disabled="objstatus > 0"
						  placeholder="选择日期时间" @change="databijiao()">
						</el-date-picker>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">报名截止时间</span>
						<el-date-picker
						  v-model="form['deadline']"
						  type="datetime"
						  :disabled="objstatus > 2 || typebtn == 1"
						  value-format="yyyy-MM-dd HH:mm:ss"
						  :placeholder="typebtn == 1 ? '你已制定制作人，项目发布后即进入制作期':'选择日期时间'" @change="databijiao()">
						</el-date-picker>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">制作周期</span>
						<div class="fleft ofh">
							<div class="fleft">
								<el-input-number v-model="form['production_cycle_d']" :min="0" controls-position="right" ></el-input-number> 天
							</div>
							<div style="margin-left: 40px;" class="fleft">
								<el-input-number v-model="form['production_cycle_h']" controls-position="right" :min="0" :max="23"></el-input-number> 时
							</div>
						</div>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">选择关联需求</span>
						<el-dropdown trigger="click" :hide-on-click="false">
							<el-input class="ipt el-dropdown-link" placeholder="请输入内容" v-model="demand_names.join(',')" suffix-icon="el-icon-arrow-down"
							 clearable></el-input>
						    <el-dropdown-menu slot="dropdown" style="width: 200px;height: 260px;">
								<el-checkbox-group v-model="dids" @change="getdemand_names">
									<el-dropdown-item v-for="(item,index) in demandlist" :key="index" >
										<el-checkbox  :label="item.did" >{{  item.demand_name + " " + item.did }}</el-checkbox>
									</el-dropdown-item>
								</el-checkbox-group>
						    </el-dropdown-menu>
						</el-dropdown>
					</li>
				</ul> 
			</div>
			<div v-show="Isnextshow" class="relative" >
				<div class="detailContent" v-for="(item,index) in detailtext">
					<div class="modeltitle detailKey" style="margin-left: 50px;">说明模块{{ index+1 }}</div>
					<ul style="padding-top: 30px;">
						<li class="margint23 ofh">
							<span class="fleft detailKey" style="line-height: 40px;">模块标题</span>
							<el-input placeholder="请输入内容" v-model="item.module_title" style="width:357px;height:40px;" clearable></el-input>
						</li>
						<li class="margint23 ofh" >
							<span class="fleft detailKey" style="line-height: 40px;">模块说明</span>
							<div class=" ofh" style="width: 800px;">
								<div class="fleft">
									<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="item.module_content"></vue-ueditor-wrap>
								</div>
								<div class="fleft uediterspan h relative pointer">
									<span @click="swapItems(detailtext,index,index-1)">上移</span><span @click="swapItems(detailtext,index,index+1)">下移</span><span @click="swapItems(detailtext,index,index-1)">删除</span>
								</div>
							</div>
						</li>
						
					</ul>
				</div>
				<div class="addDetailContent" @click="addDetailContent()">+</div>
			</div>
			<div class="screenContent detailbtn">
				<button class="defaultbtn" @click="getparent()">返回</button>
				<button class="defaultbtn defaultbtnactive" v-if="Isnextshow" @click="prev()">上一步</button>
				<button class="defaultbtn defaultbtnactive" v-if="!Isnextshow" @click="nxet()">下一步</button>
				<button class="defaultbtn defaultbtnactive" v-if="Isnextshow && !rows" @click="createdactivity">创建</button>
				<button class="defaultbtn defaultbtnactive" v-if="Isnextshow && rows" @click="edit()">保存</button>
			</div>
			<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
		</div>
		
		<el-dialog title="请选择指定用户" :visible.sync="dialogTableVisible1" custom-class="sel-dialog">
			<div style="width:1000px"> 
				<div class="margin40 borderb" style="position: relative;padding-bottom: 22px;">
					<div class="ofh">
						<div class="fleft">
							<el-button class="btnorgle" v-for="(item,index) in commonTopData.commonleftbtn" :key="item.id" @click="screen(item.id)">{{ item.name }}</el-button>
						</div>
					</div>
				</div>
				<div class="margin40" style="height: 60px;">
					<div class="tagbts">
						<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
						 :disable-transitions="false" @close="resetSave(item.id)">
							{{item.btnName + "：" + item.val}}
						</el-tag>
					</div>
				</div>
				<div class="calc205"  style="width:1200px">
					<commonTable3 ref="tabs3" :tableDatas="tableData3" :tableConfig="tableConfig" :tableAction="tableAction"></commonTable3>
				</div>
				<div class="w textcenter">
					<button class="defaultbtn defaultbtnactive" @click="reject()">确定</button>
				</div>
			</div>
		</el-dialog>
		
		<el-dialog title="请选择模板文件" :visible.sync="dialogTableVisible" custom-class="sel-dialog">
			<div class="textcenter">
				<span v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
				 @click="tabsChange(index,item.name)">
					<!-- <el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge> -->
					{{ item.name }}
				</span>
			</div>
			<div>
				<div class="margin40 borderb" style="position: relative;padding-bottom: 22px;">
					<div class="ofh">
						<div class="fleft">
							<el-button class="btnorgle" v-for="(item,index) in commonTopData.commonleftbtn" :key="item.id" @click="screen(item.id)">{{ item.name }}</el-button>
						</div>
					</div>
				</div>
				<div class="margin40" style="height: 60px;">
					<div class="tagbts">
						<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
						 :disable-transitions="false" @close="resetSave(item.id)">
							{{item.btnName + "：" + item.val}}
						</el-tag>
					</div>
				</div>
				<div class="calc205">
					<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
					 ref="Tabledd"></common-table>
				</div>
				
			</div>
		</el-dialog>
		<el-dialog title="请选择模板文件" :visible.sync="dialogTableVisible2" custom-class="sel-dialog">
			
			<div>
				<div class="margin40 borderb" style="position: relative;padding-bottom: 22px;">
					<div class="ofh">
						<div class="fleft">
							<el-button class="btnorgle" v-for="(item,index) in commonTopData.commonleftbtn" :key="item.id" @click="screen(item.id)">{{ item.name }}</el-button>
						</div>
					</div>
				</div>
				<div class="margin40" style="height: 60px;">
					<div class="tagbts">
						<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
						 :disable-transitions="false" @close="resetSave(item.id)">
							{{item.btnName + "：" + item.val}}
						</el-tag>
					</div>
				</div>
				<div class="calc205">
					<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
					 ref="Tabledd"></common-table>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap'
	import commonTop from '@/components/commonTop.vue'
	import commonTable from '@/components/commonTable.vue'
	import commonTable3 from '@/components/commonTable3.vue'
	import DataScreen from "@/assets/DataScreen.js"
	
	export default {
		data() {
			return {
				showWordLimit:true,
				typebtn:0,
				detailData: '',
				input10: '',
				radio2: "1",
				rows: "",
				filename:"",
				form: {
					name:'',
					rule_type : 1,
					banner:'',
					access_token: localStorage.getItem("access_token"),
					business_type:"",
					classify_id:"",
					fields:"",
					desc:'',
					template_file_id:"",
					expected_profit:"",
					extra_reward:"",
					qq:"",
					publish_time:"",
					deadline:"",
					production_cycle_d:"",
					production_cycle_h:"",
					demand_id:"",
					
				},
				Isnextshow: false,
				myConfig: {
					autoHeightEnabled: false,
					initialFrameHeight: 300,
					initialFrameWidth: '99%',
					UEDITOR_HOME_URL: '/UEditor/',
					serverUrl:'http://139.129.221.123/File/File/insert'
				},
				imageUrl: "",
				tableData1: [],
				tableData2:[
					{
						id:"1",
						name:"广告模板"
					},
					{
						id:"2",
						name:"广告图"
					},
					{
						id:"3",
						name:"场景锁屏"
					},
					{
						id:"4",
						name:"主题"
					}
					
				],
				tableData3:[],
				ifBjType:0,
				currentpageName:"11",
				dialogTableVisible1:false,
				dialogTableVisible2:false,
				pageName: "newActivity",
				tableAction: DataScreen.screenShow.newActivity.action,
				filterFields: DataScreen.screen.newActivity.filterFields0,
				dialogTableVisible: false,
				textarea: '',
				commonTopData: {
					num:true,
					"pageName": "newActivity",
					"commonleftbtn": [{
							name: "筛选",
							id: "left1",
							url: ""
						}
					],
					"commonrightbtn": [],
					"commonbottombtn": [],
					"IsShow": true,
				},
				screenConfig: [],
				tableConfig: {
					"pageName": "newActivity",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: DataScreen.screenShow.newActivity.bts0,
					ischeck: false,
					loading:true
				
				},
				tableData: [],
				IsScreen: "Off",
				work_info: {},
				selectData:[],
				tabData: [{
						name: "本地文件"
					},
					{
						name: "网盘链接"
					}
				],
				tabsnum:0,
				type:1,
				uptype:"img",
				dids:[],
				demandlist:[],
				demand_names:[],
				selectData1:{},
				detailtext:[
					{
						module_title:'',
						module_content:'<p style="color:#999"></p>'
					},
				],
				yonghudata:{},
				selectelists3:{},
				selectelists:[],
				objstatus:0
			}
		},
		components: {
			VueUeditorWrap,
			commonTable,
			commonTable3
		},
		methods: {
			databijiao(){
				//console.log(this.form['publish_time'],this.form['deadline'])
				if(this.form['deadline'] && this.form['publish_time']){
					let deadline = new Date(this.form['deadline'].replace(/-/g, "/")).getTime();
					let publish_time = new Date(this.form['publish_time'].replace(/-/g, "/")).getTime();
					console.log(deadline,publish_time);
					if( publish_time > deadline ){
						this.$message({
							message:"截稿时间必须大约发布时间",
							type:"error"
						})
						
					}
				}
			},
			reject(){
				this.selectelists3 = this.$refs.tabs3.selectelistsobj;
				this.selectelists = this.$refs.tabs3.selectelists
				//console.log(this.selectelists);
				this.dialogTableVisible1=false;
			},
			reject1(){
				this.tableConfig.list = [
					{prop:'template_name',lable:'模板名称'},
					{prop:'classify_name',lable:'所属项目分类'},
					{prop:'banner',lable:'banner',type:"img"},
					{prop:'fields',lable:'领域范围'},
					{prop:'expected_profit',lable:'预计收益'},
					{prop:'extra_reward',lable:'额外赏金'},
					{prop:'file_name',lable:'模板文件'},
				],
				this.tableAction={
					morebtns:{
						name:"设置角色",
						Ishow:false,
						page:"newproject",
						
					},
					links:{
						name:"启用",
						Ishow:true,
						accessid:"1"
					}
				}
				
				this.filterFields = [
					{name:"项目名称分类",id:"classify_name"},
					{name:"状态",id:"status",child:[{name:"禁用",id:"0"},{name:"启用",id:"1"}]},
					{type:"display",prop:'t',lable:'额外赏金'},
				]
				
				if(this.currentpageName == "新建项目"){
					this.$router.push({ path: '/projectManagement/projectList/newproject', query: {urlDate: ''}});
				} else{
					this.$router.push({ path: '/projectManagement/projectList/editproject', query: {urlDate: ''}});
				}
				this.dialogTableVisible2=true;
				this.getData({pageCurrent:1,pageSize:50});
				
			},
			addDetailContent(){
				this.detailtext.push({
					module_title:'',
					module_content:'<p style="color:#999"></p>'
				})
			},
			swapItems(arr, index1, index2) {
				if(index2 >= arr.length){
					this.$message({
						message:"到底了"
					});
					return
				}
				
				if(index2 < 0){
					this.$message({
						message:"已经是第一个了"
					});
					return
				}
				arr[index1] = arr.splice(index2, 1, arr[index1])[0];
				this.detailtext = arr; 
			},
			totem(){
				this.$router.push({
					path:"/activityManager/solicitationTemplate"
				})
			},
			getparent() {
				this.$router.go(-1);
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			getactivitiesrows(row){
				//console.log(row);
				this.selectData1=row;
			},
			getactivitiesrows1(row){
				//console.log(row);
				this.form.classify_id = row.classify_id;
				this.form.banner = row.banner;
				this.form.fields = row.fields;
				this.form.expected_profit = row.expected_profit;
				this.form.extra_reward = row.extra_reward;
				this.form.qq = row.qq;
				this.selectData1.template_file_id = row.template_file_id;
				console.log(row);
				this.selectData1.file_name = row.file_name;
				this.selectData1.file_size_format =   row.file_size / 1024 >= 1 ? (row.file_size/1024).toFixed(2) +"M" : row.file_size.toFixed(2) + "KB";
				this.detailtext = JSON.parse(row.desc);
			},
			tabsChange(num) {
				this.tabsnum = num;
				this.type = num + 1;
				this.tableConfig.list = DataScreen.screenShow.newActivity["bts" + num];
				//console.log(this.tableConfig.list);
				this.$parent.tabchange(num+1);
				if(this.currentpageName == "新建项目"){
					this.$router.push({ path: '/projectManagement/projectList/newproject', query: {urlDate: ''}});
				} else{
					this.$router.push({ path: '/projectManagement/projectList/editproject', query: {urlDate: ''}});
				}
				this.getData({pageCurrent:1,pageSize:50});
			},
			getdatachange(){
				
			},
			getrule(n){
				this.typebtn = n;
				if(n== 0){
					this.form['rule_type'] = 1;
				} else {
					this.form['rule_type'] = 2;
				}
			},
			getruledata(){
				this.dialogTableVisible1 = !this.dialogTableVisible1;
				this.getDatay({pageCurrent:1,pageSize:50});
			},
			edit(){
				
				this.form.desc = JSON.stringify(this.detailtext);
				if(this.selectData1.template_file_id){
					this.form.template_file_id = this.selectData1.template_file_id
				}
				if(this.form.rule_type == 1){
					this.form.status = 0;
				} else{
					this.form.status = 3;
				}
				this.form.project_id = this.rows.project_id
				this.form.demand_id = this.dids.join(',');
				this.api.projectupdate(this.form).then(da => {
					
					if(da.result == 0){
						this.$router.go(-1);
					}
				}).catch(() => {

				})
			},
			handleAvatarSuccess(params) {
				//console.log(params);
				const _file = params.file;
				let app_secret = '1Q61s1iP8I376GyMTdsjOzd4hcLpZ4SG';
				let open_id = 7;
				let times = (Date.parse(new Date()) / 1000);
				let arr = [
					1003,
					app_secret,
					open_id,
					times
				];
				
				// 通过 FormData 对象上传文件
				var formData = new FormData();
				formData.append("file", _file);
				formData.append('app_id', 1003);
				formData.append('sign', this.MD5(encodeURIComponent(arr.sort())))
				formData.append('user', open_id)
				formData.append('relation_type', 'activity')
				formData.append('timestamp', times)
				var _this = this;
				this.$parent.setpercentage("start");
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					_this.$parent.setpercentage("end",response.data.data.url,"con");
					_this.uptype = "img"
				}).catch(function (error) {
				});
				 
			},
			setcontent(url,coverurl){
				if (this.ifBjType == 0) {
					this.form.info = "";
					this.ifBjType = 1;
				}
				
				if(this.uptype == "img"){
					this.form.info += '<img src="' + url + '" alt="图片">';
				}
				if(this.uptype == "video"){
					this.form.info += '<video src="'+ url +'" controls="controls"></video>';
				}
				if(this.uptype == "audio"){
					this.form.info += '<audio src="'+ url +'" controls="controls"></audio>';
				}
			},
			handleAvatarSuccessvideo(params) {
				//console.log(params);
				const _file = params.file;
				let app_secret = '1Q61s1iP8I376GyMTdsjOzd4hcLpZ4SG';
				let open_id = 7;
				let times = (Date.parse(new Date()) / 1000);
				let arr = [
					1003,
					app_secret,
					open_id,
					times
				];
				
				// 通过 FormData 对象上传文件
				var formData = new FormData();
				formData.append("file", _file);
				formData.append('app_id', 1003);
				formData.append('sign', this.MD5(encodeURIComponent(arr.sort())))
				formData.append('user', open_id)
				formData.append('relation_type', 'activity')
				formData.append('timestamp', times)
				var _this = this;
				this.$parent.setpercentage("start");
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					_this.uptype = "video";
					_this.$parent.setpercentage("end",response.data.data.url,"con",response.data.data.cover_img);
				}).catch(function (error) {
					console.log(error);
				});
				 
			},
			handleAvatarSuccessaudio(params) {
				//console.log(params);
				const _file = params.file;
				let app_secret = '1Q61s1iP8I376GyMTdsjOzd4hcLpZ4SG';
				let open_id = 7;
				let times = (Date.parse(new Date()) / 1000);
				let arr = [
					1003,
					app_secret,
					open_id,
					times
				];
				
				// 通过 FormData 对象上传文件
				var formData = new FormData();
				formData.append("file", _file);
				formData.append('app_id', 1003);
				formData.append('sign', this.MD5(encodeURIComponent(arr.sort())))
				formData.append('user', open_id);
				formData.append('relation_type', 'activity');
				formData.append('timestamp', times);
				var _this = this;
				this.$parent.setpercentage("start");
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					_this.uptype = "audio";
					_this.$parent.setpercentage("end",response.data.data.url,"con",response.data.data.cover_img);
					
				}).catch(function (error) {
					//console.log(error);
				});
				 
			},
			beforeAvatarUpload(file) {
				//console.log(file);
				const isJPG = file.type === 'image/jpeg';
				const ispng = file.type === 'image/jpeg';
				return isJPG;
			},
			nxet() {
				//console.log(this.form['deadline'],this.form['publish_time']);
				if(this.form['deadline'] && this.form['publish_time']){
					let deadline = new Date(this.form['deadline'].replace(/-/g, "/")).getTime();
					let publish_time = new Date(this.form['publish_time'].replace(/-/g, "/")).getTime();
					console.log(deadline,publish_time);
					if( publish_time > deadline ){
						this.$message({
							message:"截稿时间必须大约发布时间",
							type:"error"
						})
						return;
					}
				}
				
				
				this.Isnextshow = true;
				this.$refs.scroll.scrollTop = 0;
			},
			prev() {
				this.Isnextshow = false;
			},
			ready(editorInstance) {
				this.uD = editorInstance;

				editorInstance.addListener('focus', (editor) => {
					if (this.ifBjType == 0) {
						this.form.info = '';
						this.ifBjType = 1;
					}
				});
				editorInstance.addListener('blur', (editor) => {
					if (this.ifBjType == 1 && this.form.info == '') {
						this.form.info = '<p style="color:#999">从这里开始编辑作品类容...</p>';
						this.ifBjType = 0;
					}
				});

			},
			getData1() {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 10000,
					status:1
				}

				this.api.projectclassifylist(data).then((da) => {
					this.tableData1 = da.data;
					/* da.data.forEach(item =>{
						if(this.rows.category_name == item.category_name){
							this.form.category_id = item.id
						}
					}) */

				}).catch(() => {

				});
			},
			httprequest(params) {
				const _file = params.file;
				let app_secret = '1Q61s1iP8I376GyMTdsjOzd4hcLpZ4SG';
				let open_id = 7;
				let times = (Date.parse(new Date()) / 1000);
				let arr = [
					1003,
					app_secret,
					open_id,
					times
				];

				// 通过 FormData 对象上传文件
				var formData = new FormData();
				formData.append("file", _file);
				formData.append('app_id', 1003);
				formData.append('sign', this.MD5(encodeURIComponent(arr.sort())))
				formData.append('user', open_id)
				formData.append('relation_type', 'activity')
				formData.append('timestamp', times)
			    var _this = this;
				this.$parent.setpercentage("start");
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					_this.uptype = "banner";
					_this.$parent.setpercentage("end",response.data.data.url);
					//_this.form.banner = response.data.data.url
				}).catch(function (error) {
					console.log(error);
				});
				//console.log(this.form.banner = url)
			},
			httprequestcover(params) {
				const _file = params.file;
				let app_secret = '1Q61s1iP8I376GyMTdsjOzd4hcLpZ4SG';
				let open_id = 7;
				let times = (Date.parse(new Date()) / 1000);
				let arr = [
					1003,
					app_secret,
					open_id,
					times
				];
			
				// 通过 FormData 对象上传文件
				var formData = new FormData();
				formData.append("file", _file);
				formData.append('app_id', 1003);
				formData.append('sign', this.MD5(encodeURIComponent(arr.sort())))
				formData.append('user', open_id)
				formData.append('relation_type', 'activity')
				formData.append('timestamp', times)
			    var _this = this;
				this.$parent.setpercentage("start");
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					_this.uptype = "cover";
					_this.$parent.setpercentage("end",response.data.data.url);
					//_this.form.banner = response.data.data.url
				}).catch(function (error) {
					//console.log(error);
				});
				//console.log(this.form.banner = url)
			},
			setimgurl(url){
				if(this.uptype == 'banner'){
					
					this.form.banner = url;
				}
				
				if(this.uptype == 'cover'){
					this.form.cover_img = url;
				}
			},
			createdactivity(){
				
				if(this.form.rule_type == 1){
					this.form.status = 0;
				} else{
					this.form.status = 3;
					let openids = ''
					console.log(this.selectelists3)
					for(let key in this.selectelists3){
						openids+= key;
					}
					this.form.open_id = openids;
				}
				
				this.form.demand_id = this.dids.join(',');
				this.form.template_file_id = this.selectData1.template_file_id;
				this.form.desc = JSON.stringify(this.detailtext);
				this.api.projectadd(this.form).then(da =>{
					//console.log(da)
					if(da.result == 0){
						this.$router.go(-1);
					}
				}).catch(da =>{
					
				})
			},
			getactivityinfo(){
				this.api.projectdetail({
					project_id:this.rows.project_id,
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.form.classify_id = da.classify_id;
					this.form.banner = da.banner;
					this.form.fields = da.fields;
					this.form.expected_profit = da.expected_profit;
					this.form.extra_reward = da.extra_reward;
					this.form.business_type = da.business_type;
					this.form.name = da.name;
					this.form.qq = da.qq;
					this.form.template_file_id = da.template_file_id;
					this.selectData1.file_name = da.template_file_name;
					this.selectData1.file_size_format = da.file_size_format;
					this.detailtext = JSON.parse(da.desc);
					this.form['rule_type'] = da.rule_type;
					if(!this.$route.query.usernameitem){
						if(da.rule_type == "1"){
							this.typebtn = 0;
						} else {
							this.typebtn = 1;
						}
					}
					this.form.production_cycle_d = da.production_cycle_d;
					this.form.production_cycle_h = da.production_cycle_h;
					this.form.deadline = da.deadline;
					this.form.publish_time = da.publish_time;
					
					if(this.form.desc){
						this.ifBjType=1;
					}
					da.demand_id.split(",").forEach(item=>{
						this.demandlist.forEach(ditem =>{
							if(item == ditem.did){
								this.dids.push(item)
							}
						})
					});
					this.getdemand_names();
				})
			},
			
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
				}
			
				//获取筛选的条件
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
				
				if(this.dialogTableVisible){
					data.type = this.type;
					this.api['templateList'+this.type](data).then((da) => {	
						this.tableData = da.data;
						this.tableConfig.total = da.total;
						this.tableConfig.currentpage = da.page;
						this.tableConfig.pagesize = da.page_size;
						
					}).catch(() => {
						
					});
				}
				if(this.dialogTableVisible2){
					data.status = 1;
					console.log(this.form.classify_id);
					data.classify_id = this.form.classify_id;
					this.api.projecttemplatelist(data).then((da) => {	
						this.tableData = da.data;
						this.tableConfig.total = da.total;
						this.tableConfig.currentpage = da.page;
						this.tableConfig.pagesize = da.page_size;
						
					}).catch(() => {
						
					});
				}
				
				
			},
			getDatay(pg) {
				//获取子组件表格数据
				this.tableData = [];
				var data = {
					access_token:localStorage.getItem("access_token"),
					page:pg.pageCurrent,
					limit:pg.pageSize
				}
				//获取筛选的条件
				//console.log(JSON.parse(this.$route.query.urlDate))\
				
				if(this.$route.query.urlDate){
				    const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
				    sreenData.page = pg.pageCurrent;
				    sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
				
				this.api.getUserList(data).then((da)=>{
					//console.log(da.data)
					this.tableData3 = da.data;
					this.tableConfig.total = da.total;
					
				}).catch(()=>{
				});	 
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
					this.getData({
						pageCurrent: 1,
						pageSize: 50
					});
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
				this.centerDialogVisible1 = true;
			},
			getworkids() {
				//console.log(this.selectData);
				var workids = '';
				this.selectData.forEach((item, index) => {
					workids += (index == (this.selectData.length - 1)) ? item.template_file_id : item.template_file_id + ",";
				})
				if (this.centerDialogVisible) {
					workids = workids
				};
			
				if (this.centerDialogVisible1) {
					workids = this.selectOne.work_id;
				}
				return workids;
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
					this.$router.push({path:'/activityManager/activityEmploy/newActivity',query:{urlDate:JSON.stringify(urldata)}});
				}
			},
			dialogTable(){
				this.tableAction=DataScreen.screenShow.newActivity.action,
				this.type = this.tabsnum + 1;
				this.tableConfig.list = DataScreen.screenShow.newActivity["bts" + this.tabsnum];
				//console.log(this.tableConfig.list);
				this.$parent.tabchange(this.tabsnum+1);
				if(this.currentpageName == "新建项目"){
					this.$router.push({ path: '/projectManagement/projectList/newproject', query: {urlDate: ''}});
				} else{
					this.$router.push({ path: '/projectManagement/projectList/editproject', query: {urlDate: ''}});
				}
				
				this.getData({pageCurrent:1,pageSize:50});
				this.dialogTableVisible = !this.dialogTableVisible;
				this.tableData = [];
				this.getData({
					pageCurrent: 1,
					pageSize: 50
				});	
			},
			alertmask(){
				
				if(!this.form['activity_name']){
					
					return "请填写活动名称！！";
				}
				if(!this.form['remark']){
					
					return "请填写活动备注！！";
				}
				if(!this.form['banner']){
					
					return "请上传活动banner！！";
				}
				if(!this.form['category_id']){
					
					return "请选择主题分类！！";
				}
				if(!this.form['start_time']){
					
					return "请填写活动时间！！";
				}
				if(!this.form['end_time']){
					
					return "请填写活动时间！！";
				}
				
				if(!this.form['setting_type']){
					
					return "设置状态！！";
				}
				if(!this.form['is_provide_template']){
					
					return "请选择模板状态！！";
				}
				return true;
			},
			getdemandlist(){
				this.api.demandlist({
					access_token:localStorage.getItem("access_token"),
					is_activity:1
				}).then(da=>{
					//console.log(da);
					this.demandlist = da;
					if(this.$route.query.row){
						this.rows = JSON.parse(this.$route.query.row);
						localStorage.setItem("newproject",this.$route.query.row);
						this.getactivityinfo();
					}else{
						if(this.currentpageName == "编辑活动"){
							if(localStorage.getItem("newproject")){
								this.rows = JSON.parse(localStorage.getItem("newproject"));
							}
						}
						
					};
					
				})
			},
			getdemand_names(){
				//console.log(this.dids);
				this.demand_names = [];
				this.dids.forEach(item =>{
					this.demandlist.forEach(ditem=>{
						if(item == ditem.did){
							if(ditem.demand_name){
								this.demand_names.push(ditem.demand_name)
							} else {
								this.demand_names.push(ditem.did)
							}
						}
						
					})
				})
			},
			screen(){
				const shownum = {
					num: "left1",
					showmask: "No",
					pageName: "newActivity",
				}
				
				if(this.dialogTableVisible2 == true){
					shownum.pageName = "newproject2"
				}
				
				if(this.dialogTableVisible1 == true){
					shownum.pageName = "newproject1"
				}
				
				
				eventBus.$emit("screenshow", shownum);
			},
			getclass(id){
				if(id == "4"){
					this.getdemandlist();
				}
			}
		},
		created() {
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			this.screenreach();
			this.getcommonrightbtn();
			this.$parent.tabchange(1);
			if(this.$route.query.row){
				this.rows = JSON.parse(this.$route.query.row);
				this.selectData1.file_name = this.rows.template_file_name;
				this.selectData1.file_size_format = this.rows.file_size_format;
				this.detailtext = JSON.parse(this.rows.desc);
				this.objstatus = parseInt(this.rows.status);
				localStorage.setItem("editproject",this.$route.query.row)
			} else {
				//console.log(this.currentpageName);
				if(this.currentpageName == "编辑页面"){
					this.rows = JSON.parse(localStorage.getItem("editproject"));
					
				}
			}
			if(this.$route.query.usernameitem){
				this.typebtn =1;
				this.selectelists = []
				this.selectelists.push(JSON.parse(this.$route.query.usernameitem)) 
			}
			
			
		},
		mounted(){
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			this.getData1();
			this.getdemandlist();
			this.myConfig.initialFrameHeight = this.$refs.height.offsetHeight-303;
			
		},
		watch:{
			"$route":function(){
				this.screenreach();
				this.getcommonrightbtn();
				this.getData({pageCurrent:1,pageSize:50});
			}
		}
	}
</script>

<style>
	.el-input-number > span {
		background: transparent !important;
		line-height: 0 !important;
		border: 0 !important;
	}
	.addDetailContent {
		font-size: 40px;
		color: #999999;
		text-align: center;
		line-height: 80px;
		border: 1px dotted #606266;
		cursor: pointer;
		border-radius: 10px;
		margin: 30px;
	}
	.uediterspan span{
		position: position;
		bottom: 0;
		margin:10px;
	}
	.sel-dialog  {
		width: 1200px;
	}
	
	.Detail {
		background: white;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent {
		height: calc(100% - 145px);
		overflow-y: auto;
	}

	.detailContent ul {
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

	.status .el-radio {
		width: auto;
	}

	.margint23 {
		margin-bottom: 23px;
	}

	.upload {
		padding-left: 158px;
		text-align: left;
	}

	#app .el-upload {
		text-align: left;
	}

	.ueditoruploadul {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 999;
	}

	.detailContent .ueditoruploadul ul {
		padding: 10;
	}
</style>
