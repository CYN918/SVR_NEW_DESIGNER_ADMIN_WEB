<template>
	<div class="wh Detail">
		<div class="detailtitle">
			<span class="fleft">新建活动</span>
			<div class="employment" style="text-align: center;">
				<span>
					<span :class="['number',{'numberactive':!Isnextshow}]">1</span>
					<span :class="{'fontactive':!Isnextshow}">绑定综合平台需求</span>
				</span>
				<!-- <span :class="['centerline',{'centerlineactive': Isnextshow}]"></span> -->
				<span class="centerline"></span>
				<span>
					<span :class="['number',{'numberactive':Isnextshow}]">2</span>
					<span :class="{'fontactive': Isnextshow}">绑定综合平台需求</span>
				</span>
			</div>
		</div>
		<div class="detailContent ofh" v-if="!Isnextshow">
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
					<img :src="form['banner']" alt="" width="340px" height="110px" style="margin-left: 156px;">
				</li>
				<li class="margint23 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">主题分类</span>
					<el-select v-model="form['category_id']" placeholder="请选择">
						<el-radio-group v-model="form['category_id']">
							<el-option v-for="(item,index) in tableData" :key="item.id" :value="item.id" :label="item.category_name">
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
				<li class="margint23 ofh">
					<span class="fleft detailKey">作品上传和展示</span>
					<el-radio-group v-model="form['setting_type']" style="width:357px;float: left;">
						<el-radio label="1">不支持上传</el-radio>
						<el-radio label="2">支持上传，不支持展示作品</el-radio>
						<el-radio label="3">支持上传，仅展示入围作品</el-radio>
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
				<li class="margint23 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">模板文件</span>
					<el-upload action="http://139.129.221.123/File/File/insert" :on-change="filechange" :show-file-list="false">
						<button class="defaultbtn" style="margin-left: 0;">模板上传</button>
					</el-upload>
					<span class="fontcolorg" style="margin-left: 160px;">{{ form['filename'] }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否关联综合平台需求</span>
					<div class="fleft status">
						<el-radio-group v-model="form['is_related_needs']" style="width:357px;float: left;">
							<el-radio label="1" class="fleft">启用</el-radio>
							<el-radio label="0" class="fleft">停用</el-radio>
						</el-radio-group>
					</div>
				</li>
				<li class="margint23 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">选择关联需求</span>
					<el-input placeholder="请输入内容" v-model="input10" style="width:357px;height:40px;" clearable></el-input>
				</li>
			</ul>
		</div>
		<div class="detailContent ofh relative" v-if="Isnextshow" style="margin-top: 52px;height: calc(100% - 197px);">
			<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="form.content"></vue-ueditor-wrap>
			<div class="ueditoruploadul">
				<div class="fleft">
					<el-upload action="http://139.129.221.123/File/File/insert" :show-file-list="false" :http-request="handleAvatarSuccess" >
						<div class="w textcenter"><img width="20px" height="20px" style="margin-top: 10px;" src="../../assets/img/icon_img.png"
							 alt=""></div>
						<div>上传图片</div>
					</el-upload>
				</div>
				<div class="fleft marginlr30">
					<el-upload action="http://139.129.221.123/File/File/insert" :show-file-list="false"  :http-request="handleAvatarSuccess" >
						<div class="w textcenter"><img width="20px" height="20px" style="margin-top: 10px;" class="" src="../../assets/img/icon_vedio.png"
							 alt=""></div>
						<div>上传视频</div>
					</el-upload>
				</div>
				<div class="fleft" style="margin-right: 10px;">
					<el-upload action="http://139.129.221.123/File/File/insert" :show-file-list="false" :http-request="handleAvatarSuccess" >
						<div class="w textcenter"><img width="20px" height="20px" style="margin-top: 10px;" class="" src="../../assets/img/icon_music.png"
							 alt=""></div>
						<div>上传音频</div>
					</el-upload>
				</div>
			</div>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" v-if="Isnextshow" @click="prev()">上一步</button>
			<button class="defaultbtn">保存草稿</button>
			<button class="defaultbtn" v-if="Isnextshow">预览</button>
			<button class="defaultbtn defaultbtnactive" v-if="Isnextshow" @click="createdactivity">创建</button>
			<button class="defaultbtn defaultbtnactive" v-if="!Isnextshow" @click="nxet()">下一步</button>
		</div>
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap'

	export default {
		data() {
			return {
				detailData: '',
				input10: '',
				radio2: "1",
				id: this.$route.query.id,
				num: this.$route.query.num,
				form: {
					is_provide_template: "0",
					content: '<p style="color:#999">从这里开始编辑作品类容...</p>',
					is_related_needs: "0",
					banner:'',
					filename:""
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
					initialFrameHeight: 200,
					initialFrameWidth: '100%',
					UEDITOR_HOME_URL: '/UEditor/',
					serverUrl:'http://139.129.221.123/File/File/insert'
				},
				imageUrl: "",
				tableData: [],
			}
		},
		components: {
			VueUeditorWrap
		},
		methods: {
			getparent() {
				this.router.push({
					path: "/activityManager/activityClass"
				})
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			add() {
				const id = this.$route.query.open_id;
				this.api.categoryAdd({
					access_token: localStorage.getItem("access_token"),
					category_name: this.input10,
					status: this.radio2
				}).then(da => {
					console.log(da)
				}).catch(() => {

				})
			},
			edit() {
				const id = this.$route.query.open_id;
				this.api.categoryEdit({
					access_token: localStorage.getItem("access_token"),
					category_name: this.input10,
					status: this.radio2,
					id: this.id
				}).then(da => {
					console.log(da)
				}).catch(() => {

				})
			},
			onSubmit() {
				console.log('submit!');
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				//return this.$confirm(`确定移除 ${ file.name }？`);
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
				var _this = this
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					//console.log(response.data.data.url);
					_this.form.content += '<img src="' + response.data.data.url + '" alt="111111">'
					console.log(_this.form.content);
				}).catch(function (error) {
					console.log(error);
				});
				 
			},
			beforeAvatarUpload(file) {
				console.log(file);
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
			},
			prev() {
				this.Isnextshow = false;
			},
			ready(editorInstance) {
				this.uD = editorInstance;

				editorInstance.addListener('focus', (editor) => {
					/* if (this.ifBjType == 0) {
						this.form.content = '';
						this.ifBjType = 1;
					} */
					/* if(this.form.content != '') {
						
					} */
					//this.form.content = '';
				});
				editorInstance.addListener('blur', (editor) => {
					/* if (this.ifBjType == 1 && this.form.content == '') {
						this.form.content = '<p style="color:#999">从这里开始编辑作品类容...</p>';
						this.ifBjType = 0;
					} */
					
					if (this.form.content == '') {
						this.form.content = '<p style="color:#999">从这里开始编辑作品类容...</p>';
						//this.ifBjType = 0;
					}
				});

			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 10000
				}

				this.api.categoryList(data).then((da) => {
					
					this.tableData = da.data;

				}).catch(() => {

				});
			},
			httprequest(params) {
				//console.log("params",params)
				const _file = params.file;
				//const isLt2M = _file.size / 1024 / 1024 < 2;

				/* if (!isLt2M) {
					this.$message.error("请上传2M以下是的文件");
					return false;
				} */

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
				/* console.log("times",times)
				console.log("arr",arr)
				console.log("file",formData.get("file"))
				console.log("app_id",formData.get("app_id"))
				console.log("sign",formData.get("sign"))
				console.log("user",formData.get("user"))
				console.log("relation_type",formData.get("relation_type"))
				console.log("timestamp",formData.get("timestamp")) */
				/* this.api.insertFile(formData).then(da => {
					console.log(da)
				}).catch(da => {

				}) */
			    var _this = this
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					//console.log(response.data.data.url);
					_this.form.banner = response.data.data.url
				}).catch(function (error) {
					console.log(error);
				});
				//console.log(this.form.banner = url)
			},
			filechange(file){
				console.log(file);
				this.form['filename'] = file.name;
				//console.log(this.form['filename']);
			},
			createdactivity(){
				
				this.api.activityadd(this.form).then(da =>{
					console.log(da);
				}).catch(da =>{
					
				})
			}
		},
		created() {
			this.getData();
		}
	}
</script>

<style>
	.Detail {
		background: white;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent {
		height: calc(100% - 18px);
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
