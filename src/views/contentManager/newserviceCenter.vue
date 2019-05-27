<template>
	<div class="wh Detail">
		<div class="detailtitle">
			<span class="fleft">新建文档</span>
			<div class="employment" style="text-align: center;">
				<span>
					<span :class="['number',{'numberactive':!Isnextshow}]">1</span>
					<span :class="{'fontactive':!Isnextshow}">文档信息设置</span>
				</span>
				<!-- <span :class="['centerline',{'centerlineactive': Isnextshow}]"></span> -->
				<span class="centerline"></span>
				<span>
					<span :class="['number',{'numberactive':Isnextshow}]">2</span>
					<span :class="{'fontactive': Isnextshow}">编辑图文内容</span>
				</span>
			</div>
		</div>
		<div class="detailContent ofh" v-show="!Isnextshow">
			<ul>
				<li class="margint23 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">文档备注</span>
					<el-input placeholder="请输入内容" v-model="form['remark']" style="width:357px;height:40px;" clearable></el-input>
				</li>
				<li class="margint23 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">文档类型</span>
					<el-select v-model="form['type']" placeholder="请选择">
						<el-radio-group v-model="form['type']">
							<el-option v-for="(item,index) in tableData" :key="item.id" :value="item.id" :label="item.name">
								<el-radio :label="item.id">{{ item.name }}</el-radio>
							</el-option>
						</el-radio-group>
					</el-select>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否设为线上展示</span>
					<div class="fleft status">
						<el-radio-group v-model="form['is']" style="width:357px;float: left;">
							<el-radio label="1" class="fleft">是</el-radio>
							<el-radio label="0" class="fleft">否</el-radio>
						</el-radio-group>
					</div>
				</li>
			</ul>
		</div>
		<div class="detailContent ofh relative" v-show="Isnextshow" style="margin-top: 52px;height: calc(100% - 197px);">
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
			<button class="defaultbtn"  @click="getparent">返回</button>
			<button class="defaultbtn" v-if="Isnextshow" @click="prev()">上一步</button>
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
					filename:"",
					access_token: 2,
					type:'1'
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
				tableData: [
					{name:"关于我们",id:"1"},
					{name:"用户协议",id:"2"},
					{name:"授权协议",id:"3"},
					{name:"帮助中心",id:"4"},
				],
				ifBjType:0,
			}
		},
		components: {
			VueUeditorWrap
		},
		methods: {
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
			add() {
				const id = this.$route.query.open_id;
				this.api.categoryAdd({
					access_token: 2,
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
					access_token: 2,
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
					if (_this.ifBjType == 0) {
						_this.form.content = "";
						_this.ifBjType = 1;
					}
					_this.form.content += '<img src="' + response.data.data.url + '" alt="111111">';
				}).catch(function (error) {
					console.log(error);
				});
				 
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
				var _this = this
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					console.log(response)
					if (_this.ifBjType == 0) {
						_this.form.content = "";
						_this.ifBjType = 1;
					}
					_this.form.content += '<img src="' + response.data.data.cover_img + '" alt="视频图片"><video src="'+ response.data.data.url +'" controls="controls"></video>';
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
				formData.append('user', open_id)
				formData.append('relation_type', 'activity')
				formData.append('timestamp', times)
				var _this = this
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					console.log(response)
					if (_this.ifBjType == 0) {
						_this.form.content = "";
						_this.ifBjType = 1;
					}
					_this.form.content += '<img src="' + response.data.data.cover_img + '" alt="视频图片"><audio src="'+ response.data.data.url +'" controls="controls"></audio>';
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
					if (this.ifBjType == 0) {
						this.form.content = '';
						this.ifBjType = 1;
					}
				});
				editorInstance.addListener('blur', (editor) => {
					if (this.ifBjType == 1 && this.form.content == '') {
						this.form.content = '<p style="color:#999">从这里开始编辑作品类容...</p>';
						this.ifBjType = 0;
					}
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
				this.api.documentadd(this.form).then(da =>{
					console.log(da);
				}).catch(da =>{
					
				})
			}
		},
		created() {
			
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
