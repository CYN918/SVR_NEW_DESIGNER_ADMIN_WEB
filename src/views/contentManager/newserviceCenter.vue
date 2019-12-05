<template>
	<div class="wh Detail" ref="height">
		<div class="detailtitle">
			<span class="fleft">编辑文档</span>
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
		<div class="detailContent1 ofh" v-show="!Isnextshow">
			<ul>
				<li class="margint23 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">文档备注</span>
					<el-input placeholder="请输入内容" v-model="form['remark']" style="width:357px;height:40px;" clearable></el-input>
				</li>
				<li class="margint23 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">文档类型</span>
					<el-select v-model="form['type']" placeholder="请选择" style="width:357px;">
						<el-option v-for="(item,index) in tableData" :key="item.id" :value="item.id" :label="item.name"></el-option>
					</el-select>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否设为线上展示</span>
					<div class="fleft status">
						<el-radio-group v-model="form['status']" style="width:357px;float: left;">
							<el-radio label="1" class="fleft">是</el-radio>
							<el-radio label="0" class="fleft">否</el-radio>
						</el-radio-group>
					</div>
				</li>
			</ul>
		</div>
		<div class="detailContent1 ofh relative" v-show="Isnextshow" style="margin-top: 52px;height: calc(100% - 197px);">
			<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="form.content"></vue-ueditor-wrap>
			<div class="ueditoruploadul">
				<div class="fleft">
					<el-upload accept=".jpg,.gif,.png" action="http://139.129.221.123/File/File/insert" :show-file-list="false" :http-request="handleAvatarSuccess" >
						<div class="w textcenter"><img width="20px" height="20px" style="margin-top: 10px;" src="../../assets/img/icon_img.png"
							 alt=""></div>
						<div>上传图片</div>
					</el-upload>
				</div>
				<div class="fleft marginlr30">
					<el-upload accept=".mp4" action="http://139.129.221.123/File/File/insert" :show-file-list="false"  :http-request="handleAvatarSuccessvideo" >
						<div class="w textcenter"><img width="20px" height="20px" style="margin-top: 10px;" class="" src="../../assets/img/icon_vedio.png"
							 alt=""></div>
						<div>上传视频</div>
					</el-upload>
				</div>
				<div class="fleft" style="margin-right: 10px;">
					<el-upload accept=".mp3" action="http://139.129.221.123/File/File/insert" :show-file-list="false" :http-request="handleAvatarSuccessaudio" >
						<div class="w textcenter"><img width="20px" height="20px" style="margin-top: 10px;" class="" src="../../assets/img/icon_music.png"
							 alt=""></div>
						<div>上传音频</div>
					</el-upload>
				</div>
			</div>
			<div class="ofv">
				<!-- <div class="fleft" style="margin-top: 5px;margin-right: 20px;">
					<button class="defaultbtn" @click="cent()">添加标签</button>
				</div> -->
				<!-- <div class="fleft" style="margin-top: 5px;margin-right: 20px;">
					<button class="defaultbtn" @click="addc(0)">标签是否展示</button>
				</div> -->
			</div>
		</div>
		<el-dialog title="添加标签ID" :visible.sync="dialogTableVisible" >
			<div class="margin40" style="position: relative;padding-bottom: 22px;">
				<div>
					标签ID <el-input placeholder="请输入标签ID" v-model="contentlabel" style="width:320px;height:40px;"></el-input>
				</div>
				<div class="screenContent">
					<button class="defaultbtn defaultbtnactive" @click="addc()">确定</button>
				</div>
			</div>
		</el-dialog>
		<div class="screenContent detailbtn">
			<button class="defaultbtn"  @click="getparent">返回</button>
			<button class="defaultbtn" v-if="Isnextshow" @click="prev()">上一步</button>
			<button class="defaultbtn defaultbtnactive" v-if="Isnextshow && !rows.id" @click="createdactivity">创建</button>
			<button class="defaultbtn defaultbtnactive" v-if="!Isnextshow" @click="nxet()">下一步</button>
			<button class="defaultbtn defaultbtnactive" v-if="Isnextshow && rows.id" @click="edit()">确 定</button>
		</div>
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap'

	export default {
		data() {
			return {
				dialogTableVisible:false,
				contentlabel:"",
				contentlabel1:"",
				detailData: '',
				input10: '',
				radio2: "1",
				form: {
					remark:"",
					content: '<p style="color:#999"></p>',
					status:"",
					access_token: localStorage.getItem("access_token"),
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
					maximumWords:100000000,
					autoHeightEnabled: false,
					initialFrameHeight: 200,
					initialFrameWidth: '100%',
					UEDITOR_HOME_URL: '/UEditor/',
					serverUrl:'http://139.129.221.123/File/File/insert',
					toolbars:[
						[
								'undo','redo', '|','fontsize', '|','blockquote','horizontal', '|','removeformat','formatmatch','|','link','unlink','emotion'],
								['bold','italic','underline','source','strikethrough','forecolor','backcolor','|','indent','justifyleft','justifycenter',
								'justifyright','justifyjustify','indent','rowspacingtop','rowspacingbottom','lineheight','lineheight','insertorderedlist','insertunorderedlist',
								'imageleft','imageright',"anchor"]
					]
				},
				imageUrl: "",
				tableData: [
					{name:"关于我们",id:"1"},
					{name:"用户协议",id:"2"},
					{name:"授权协议",id:"3"},
					{name:"帮助中心",id:"4"},
				],
				ifBjType:0,
				rows:{},
				uptype:"img"
				
			}
		},
		components: {
			VueUeditorWrap
		},
		methods: {
			cent(){
				this.dialogTableVisible = !this.dialogTableVisible;
			},
			addc(){
				let data = '<q class="hide" id="'+ this.contentlabel +'"> </q>';
				this.ifBjType = 1;
				this.uD.execCommand('insertHtml', data);
				this.cent();
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
			
			edit() {
				this.form.id=this.rows.id;
				this.api.documentedit(this.form).then(da => {
					this.$router.go(-1);
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
				this.$parent.setpercentage("start");
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					_this.$parent.setpercentage("end",response.data.data.url,"con");
					_this.uptype = "img"
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
				formData.append('user', open_id)
				formData.append('relation_type', 'activity')
				formData.append('timestamp', times)
				var _this = this
				this.$parent.setpercentage("start");
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					_this.uptype = "audio";
					_this.$parent.setpercentage("end",response.data.data.url,"con",response.data.data.cover_img);
					
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
					if(da == "添加成功"){
						this.$router.go(-1);
					}
				}).catch(da =>{
					
				})
			},
			setcontent(url,coverurl){
				
				if (this.ifBjType == 0) {
					this.ifBjType = 1;
				}
				let info = "";
				if(this.uptype == "img"){
					
					info = '<p style="max-width:100%;height:auto;"><img style="max-width:100%;height:auto" src="'+url+'"/></p>';
					//console.log(info)
					this.uD.execCommand('insertHtml', info);
					this.uD.execCommand('insertparagraph');
					
				}
				if(this.uptype == "video"){
					/* <img src="' + coverurl + '" alt="视频图片"> */
					info = '<video src="'+ url +'" controls="controls"></video>';
					this.uD.execCommand('insertHtml', info);
					this.uD.execCommand('insertparagraph');
					this.ifBjType = 1;
				}
				if(this.uptype == "audio"){
					/* <img src="' + coverurl + '" alt="音频图片"> */
					info = '<audio src="'+ url +'" controls="controls"></audio>';
					this.uD.execCommand('insertHtml', info);
					this.uD.execCommand('insertparagraph');
					this.ifBjType = 1;
				}
				
				
				
				/* if(this.uptype == "img"){
					this.form.info += '<img src="' + url + '" alt="图片">';
				}
				if(this.uptype == "video"){
					this.form.info += '<video src="'+ url +'" controls="controls"></video>';
				}
				if(this.uptype == "audio"){
					this.form.info += '<audio src="'+ url +'" controls="controls"></audio>';
				}
				
				if (this.ifBjType == 0) {
					this.form.info = "";
					this.ifBjType = 1;
				} */
			},
		},
		mounted() {
			if(this.$route.query.row){
				this.rows = JSON.parse(this.$route.query.row);
				this.form['remark'] = this.rows.remark;
				this.form['type'] = this.rows.type;
				this.form['status'] = this.rows.status;
				this.form['content'] = this.rows.content;
				if(this.form['content']){
					this.ifBjType=1;
				}
			}
			this.myConfig.initialFrameHeight = this.$refs.height.offsetHeight-303;
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

	.detailContent1 {
		height: calc(100% - 194px);
		overflow-y: auto;
	}

	.detailContent1 ul {
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
