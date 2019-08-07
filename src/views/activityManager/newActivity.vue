<template>
	<div class="wh Detail" ref="height">
		<div class="detailtitle">
			<span class="fleft">{{ currentpageName }}</span>
			<div class="employment" style="text-align: center;">
				<span>
					<span :class="['number',{'numberactive':!Isnextshow}]">1</span>
					<span :class="{'fontactive':!Isnextshow}">绑定综合平台需求</span>
				</span>
				<!-- <span :class="['centerline',{'centerlineactive': Isnextshow}]"></span> -->
				<span class="centerline"></span>
				<span>
					<span :class="['number',{'numberactive':Isnextshow}]">2</span>
					<span :class="{'fontactive': Isnextshow}">编辑图文内容</span>
				</span>
			</div>
		</div>
		<div class="detailContent" ref="scroll" style="height: calc(100% - 47px) !important;">
			<div v-show="!Isnextshow">
				<ul>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">活动名称</span>
						<el-input placeholder="请输入内容" v-model="form['activity_name']" style="width:357px;height:40px;" clearable></el-input>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">活动备注</span>
						<el-input placeholder="请输入内容" v-model="form['remark']" style="width:357px;height:40px;" clearable></el-input>
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
						<span class="fleft detailKey" style="line-height: 40px;">活动封面</span>
						<el-upload class="upload" action="454535" :http-request="httprequestcover" :show-file-list="false">
							<button class="defaultbtn" style="margin-left: 0;">上传图片</button>
							<div class="fontcolorg">640px*360px，格式jpg，jpeg，png，大小不超过10M</div>
						</el-upload>
						<img v-if="form['cover_img']" :src="form['cover_img']" alt="" width="340px" height="110px" style="margin-left: 156px;">
					</li>
					
					<li class="margint23 ofh">
						<span class="fleft detailKey" style="line-height: 40px;">主题分类</span>
						<el-select v-model="form['category_id']" placeholder="请选择">
							<el-radio-group v-model="form['category_id']">
								<el-option v-for="(item,index) in tableData1" :key="item.id" :value="item.id" :label="item.category_name">
									<el-radio :label="item.id">{{ item.category_name }}</el-radio>
								</el-option>
							</el-radio-group>
						</el-select>
					</li>
					<li class="margint23 ofh">
						<div>
							<span class="fleft detailKey" style="line-height: 40px;">活动时间</span>
							<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="form['start_time']" type="datetime"
							 placeholder="开始时间">
							</el-date-picker>
							<span class="fleft" style="line-height: 40px;">
								&nbsp;至&nbsp;
							</span>
							<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="form['end_time']" type="datetime"
							 placeholder="结束时间">
							</el-date-picker>
						</div>
					</li>
					<!-- <li class="margint23 ofh">
						<span class="fleft detailKey">活动类型</span>
						<el-radio-group v-model="form['type']" style="width:357px;float: left;">
							
							<el-radio label="1">普通活动</el-radio>
							<el-radio label="2">征集活动</el-radio>
						</el-radio-group>
					</li> -->
					<li class="margint23 ofh">
						<span class="fleft detailKey">作品上传和展示</span>
						<el-radio-group v-model="form['setting_type']" @change="getclass(form['setting_type'])" style="width:357px;float: left;">
							<div class="fontcolorg font12" style="line-height: 20px">普通活动</div>
							<el-radio label="1">不支持上传</el-radio>
							<el-radio label="2">支持上传，不支持展示作品</el-radio>
							<el-radio label="3">支持上传，仅展示入围作品</el-radio>
							<div class="fontcolorg font12" style="line-height: 20px">征集活动</div>
							<el-radio label="4">支持上传，并展示入围作品及录用作品</el-radio>
						</el-radio-group>
					</li>
					<li class="margint23 ofh">
						<span class="fleft detailKey">是否提供模板文件</span>
						<el-radio-group v-model="form['is_provide_template']" style="width:357px;float: left;">
							<!-- <el-option v-for="(childitem,index) in item.child" :key="childitem.id" :value="childitem.id" :label="childitem.name">
								<el-radio :label="childitem.name"></el-radio>
							</el-option> -->
							<el-radio label="0">不提供</el-radio>
							<el-radio label="1">提供</el-radio>
						</el-radio-group>
					</li>
					<li class="margint23 ofh" v-if="form['is_provide_template'] == '1'">
						<span class="fleft detailKey" style="line-height: 40px;" >模板文件</span>
						<div><button class="defaultbtn" style="margin-left: 0;" @click="dialogTable">选择模板文件</button><span style="color: #FF5121;" class="pointer" @click="totem"> 前往上传</span></div>
						<span class="fontcolorg" style="margin-left: 160px;">{{ (selectData1.file_name ? selectData1.file_name : "--") +"&nbsp;&nbsp;&nbsp;&nbsp;"+ (selectData1.file_size_format ? selectData1.file_size_format : "--") }}</span>
					</li>
					
					<li class="margint23 ofh" v-if="form['setting_type'] == '4'">
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
				<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="form.info"></vue-ueditor-wrap>
				<div class="ueditoruploadul">
					<div class="fleft">
						<el-upload action="http://139.129.221.123/File/File/insert" :show-file-list="false" :http-request="handleAvatarSuccess" >
							<div class="w textcenter"><img width="20px" height="20px" style="margin-top: 10px;" src="../../assets/img/icon_img.png"
								 alt=""></div>
							<div>上传图片</div>
						</el-upload>
					</div>
					<div class="fleft marginlr30">
						<el-upload action="http://139.129.221.123/File/File/insert" :show-file-list="false"  :http-request="handleAvatarSuccessvideo" >
							<div class="w textcenter"><img width="20px" height="20px" style="margin-top: 10px;" class="" src="../../assets/img/icon_vedio.png"
								 alt=""></div>
							<div>上传视频</div>
						</el-upload>
					</div>
					<div class="fleft" style="margin-right: 10px;">
						<el-upload action="http://139.129.221.123/File/File/insert" :show-file-list="false" :http-request="handleAvatarSuccessaudio" >
							<div class="w textcenter"><img width="20px" height="20px" style="margin-top: 10px;" class="" src="../../assets/img/icon_music.png"
								 alt=""></div>
							<div>上传音频</div>
						</el-upload>
					</div>
				</div>
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
					is_provide_template: "0",
					info: '<p style="color:#999">从这里开始编辑作品类容...</p>',
					banner:'',
					access_token: localStorage.getItem("access_token"),
					type:'1',
					cover_img:""
				},
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
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
				selectData1:{}
			}
		},
		components: {
			VueUeditorWrap,
			commonTable
		},
		methods: {
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
				if(this.alertmask() != true){
					this.$message({
						message:this.alertmask(),
					})
					return;
				}
				
				this.form.access_token = localStorage.getItem("access_token");
				this.form.activity_id = this.rows.id;
				if(this.selectData1.template_file_id){
					this.form.template_file_id = this.selectData1.template_file_id
				}
				if(this.form['setting_type'] == '4'){
					this.form.related_needs_id = this.dids.join(',')
				} else {
					this.form.related_needs_id = "";
				}
				
				this.api.activityedit(this.form).then(da => {
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
					/* <img src="' + coverurl + '" alt="视频图片"> */
					this.form.info += '<video src="'+ url +'" controls="controls"></video>';
				}
				if(this.uptype == "audio"){
					/* <img src="' + coverurl + '" alt="音频图片"> */
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

				this.api.categoryList(data).then((da) => {
					//console.log(da.data)
					
					this.tableData1 = da.data;
					//console.log(da.data)
					da.data.forEach(item =>{
						if(this.rows.category_name == item.category_name){
							this.form.category_id = item.id
						}
					})

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
				
				if(this.alertmask() != true){
					this.$message({
						message:this.alertmask(),
					})
					return;
				}
				
				//this.form.template_file_id=this.getworkids();
				this.form.template_file_id = this.selectData1.template_file_id
				if(this.form['setting_type'] == '4'){
					this.form.related_needs_id = this.dids.join(',')
				} else {
					this.form.related_needs_id = "";
				}	
				this.api.activityadd(this.form).then(da =>{
					//console.log(da)
					if(da.result == 0){
						this.$router.go(-1);
					}
				}).catch(da =>{
					
				})
			},
			getactivityinfo(){
				this.api.activityinfo({
					activity_id:this.rows.id,
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.form = da;
					if(this.form.info){
						this.ifBjType=1;
					}
					console.log(da.related_needs_id)
					
					
					da.related_needs_id.split(",").forEach(item=>{
						this.demandlist.forEach(ditem =>{
							if(item == ditem.did){
								this.dids.push(item)
							}
						})
					});
					
					console.log(this.dids);
					this.getdemand_names()
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
						this.getactivityinfo();
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
