<template>
	<div class="wh Detail" ref="height">
		<div class="detailtitle">
			<span class="fleft">{{ currentpageName }}</span>
			<div class="employment" style="text-align: center;">
				<span>
					<span :class="['number',{'numberactive':!Isnextshow}]">1</span>
					<span :class="{'fontactive':!Isnextshow}">基本信息</span>
				</span>
				<!-- <span :class="['centerline',{'centerlineactive': Isnextshow}]"></span> -->
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
						<span class="fleft detailKey" style="line-height: 40px;">模板名称</span>
						<el-input placeholder="请输入内容" v-model="form['template_name']" style="width:357px;height:40px;" clearable></el-input>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">所属项目类型</span>
						<el-select v-model="form['classify_id']" placeholder="请选择">
							<el-radio-group v-model="form['classify_id']">
								<el-option v-for="(item,index) in tableData1" :key="item.id" :value="item.id" :label="item.classify_name">
									<el-radio :label="item.id">{{ item.classify_name }}</el-radio>
								</el-option>
							</el-radio-group>
						</el-select>
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
						<el-input placeholder="请填写QQ号, 项目顾问将负责解决创作者制作或报名的疑问" v-model="form['qq']" style="width:357px;height:40px;" clearable></el-input>
					</li>
					
					<li class="margint23 ofh">
						<span class="fleft detailKey">状态</span>
						<div class="fleft status">
							<el-radio v-model="form['status']" label="1" class="fleft">启用</el-radio>
							<el-radio v-model="form['status']" label="0" class="fleft">停用</el-radio>
						</div>
					</li>
				</ul>
			</div>
			<div v-show="Isnextshow" class="relative" >
				<div class="detailContent" v-for="(item,index) in detailtext">
					<div class="modeltitle detailKey" style="margin-left: 50px;">说明模块{{ index+1 }}</div>
					<ul style="padding-top: 30px;">
						<li class="margint23 ofh">
							<span class="fleft detailKey" style="line-height: 40px;">模板标题</span>
							<el-input placeholder="请输入内容" v-model="item.title" style="width:357px;height:40px;" clearable></el-input>
						</li>
						<li class="margint23 ofh" >
							<span class="fleft detailKey" style="line-height: 40px;">模板名称</span>
							<div class=" ofh" style="width: 800px;">
								<div class="fleft">
									<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="item.text"></vue-ueditor-wrap>
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
				<!-- <div class="w textcenter">
					<button class="defaultbtn defaultbtnactive" @click="dialogTableVisible=false">确定({{ this.selectData.length }})</button>
				</div> -->
			</div>
			
		</el-dialog>
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap'
	import commonTop from '@/components/commonTop.vue'
	import commonTable from '@/components/commonTable.vue'
	import DataScreen from "@/assets/DataScreen.js"
	
	export default {
		data() {
			return {
				detailData: '',
				input10: '',
				radio2: "1",
				rows: "",
				filename:"",
				form: {
					banner:'',
					access_token: localStorage.getItem("access_token"),
					classify_id:"",
					banner:"",
					fields:"",
					expected_profit:"",
					extra_reward:"",
					business_type:"",
					qq:"",
					file_id:'',
					status:"",
				},
				fileList: [],
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
				ifBjType:0,
				currentpageName:"",
				
				pageName: "newActivity",
				tableAction:DataScreen.screenShow.newActivity.action,
				filterFields: DataScreen.screen.newActivity.filterFields0,
				dialogTableVisible: false,
				textarea: '',
				commonTopData: {
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
						title:'',
						text:'<p style="color:#999"></p>'
					},
				]
			}
		},
		components: {
			VueUeditorWrap,
			commonTable
		},
		methods: {
			addDetailContent(){
				this.detailtext.push({
					title:'',
					text:'<p style="color:#999"></p>'
				})
			},
			swapItems(arr, index1, index2) {
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
			tabsChange(num) {
				this.tabsnum = num;
				this.type = num + 1;
				this.tableConfig.list = DataScreen.screenShow.newActivity["bts" + num];
				//console.log(this.tableConfig.list);
				this.$parent.tabchange(num+1);
				this.$router.push({ path: '/activityManager/activityEmploy/newActivity', query: {urlDate: ''}});
				this.getData({pageCurrent:1,pageSize:50});
			},
			edit() {
				
				this.form.desc = JSON.stringify(this.detailtext);
				if(this.selectData1.template_file_id){
					this.form.template_file_id = this.selectData1.template_file_id
				}
				this.form.id = this.rows.id
				
				this.api.projecttemplateupdate(this.form).then(da => {
					//console.log(da)
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
					//console.log(error);
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
				//const isLt2M = file.size / 300 / 200 < 2;

				/* if (isJPG || ispng) {
					this.$message.error('上传图片只能是 jpg，jpeg，png 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 1MB!');
				} */
				return isJPG;
			},
			nxet() {
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
				
				/* if(this.alertmask() != true){
					this.$message({
						message:this.alertmask(),
					})
					return;
				} */
				
				this.form.template_file_id = this.selectData1.template_file_id;
				this.form.desc = JSON.stringify(this.detailtext);
				this.api.projecttemplateadd(this.form).then(da =>{
					//console.log(da)
					if(da.result == 0){
						this.$router.go(-1);
					}
				}).catch(da =>{
					
				})
			},
			getactivityinfo(){
				this.api.projecttemplatedetail({
					id:this.rows.id,
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
					this.form.file_id = da.file_id;
					this.form.template_name = da.template_name;
					this.selectData1.file_name = da.file_name;
					this.selectData1.file_size_format = da.file_size_format;
					this.detailtext = JSON.parse(da.desc);
					if(this.form.desc){
						this.ifBjType=1;
					}
				})
			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
					type: this.type,
				}
			
				//获取筛选的条件
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					sreenData.type = this.type;
					data = sreenData;
				}
				
				this.api['templateList'+this.type](data).then((da) => {	
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
				}).catch(() => {
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
				this.dialogTableVisible = !this.dialogTableVisible;
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
						localStorage.setItem("newActivity",this.$route.query.row);
						
					}else{
						if(this.currentpageName == "编辑活动"){
							if(localStorage.getItem("newActivity")){
								this.rows = JSON.parse(localStorage.getItem("newActivity"));
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
				eventBus.$emit("screenshow", shownum);
			},
			getclass(id){
				if(id == "4"){
					this.getdemandlist();
				}
			}
		},
		created() {
			
			this.screenreach();
			this.getcommonrightbtn();
			
			this.$parent.tabchange(1);
			if(this.$route.query.row){
				this.rows = JSON.parse(this.$route.query.row);
				this.getactivityinfo();
				this.selectData1.file_name = this.rows.file_name;
				this.selectData1.file_size_format = this.rows.file_size_format;
				this.detailtext = JSON.parse(this.rows.desc);
			}
		},
		mounted(){
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			this.getData1();
			
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
		width: 1100px;
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
