<template>
<div>
	<common-top :commonTopData="commonTopData"></common-top>
	<div class="wh Detail">
		<div class="detailtitle">{{ currentpageName }}</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margintbt30 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">banner素材名称</span>
					<el-input placeholder="请输入内容" style="width:357px;height:40px;" v-model="banner_name">{{2222 }}</el-input>
				</li>
				<li class="margintbt30 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">banner</span>
					<el-upload action="454535" :http-request="httprequest" accept="image/png,image/jpg,image/jpeg" :show-file-list="false">
						<div style="overflow: hidden;">
							<button class="defaultbtn fleft" style="margin-left: 0;">{{ banner_pic != '' ? '重新上传' : '上传图片' }}</button>
						</div>
						<div style="margin: 10px 0;" class="fontcolorg">1920*600px，格式jpg，jpeg，png，大小不超过10M</div>
					</el-upload>
					<div class="w" style="overflow-x: auto;margin-left: 160px;">
						<!-- style="margin-left: 160px;" -->
						<img v-if="banner_pic" :src="banner_pic" alt="" width="1920px" height="600px">

					</div>

				</li>
				<li class="margintbt30 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">跳转链接</span>
					<el-input placeholder="请输入内容" v-model="jump_url" style="width:357px;height:40px;"></el-input>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" v-if="!rows" @click="add()">创建</button>
			<button class="defaultbtn defaultbtnactive" v-if="rows" @click="edit()">确定</button>
		</div>
	</div>
</div>
</template>

<script>
    import commonTop from '@/components/commonTop.vue'
	export default {
		components: {
			commonTop
		},
		data() {
			return {
				detailData: '',
				banner_name: "",
				banner_pic: "",
				jump_url: "",
				rows: "",
				currentpageName: "",
				commonTopData: {
					"pageName": "addHomeBanner",
					"commonleftbtn": [],
					"commonrightbtn": [],
					"commonbottombtn": [],
				},
			}
		},
		methods: {
			beforeup(file) {
				let _this = this
				const is1M = file.size / 1024 / 1024 < 10; // 限制小于1M
				const isSize = new Promise(function(resolve, reject) {
					let width = 1920; // 限制图片尺寸为654X270
					let height = 720;
					let _URL = window.URL || window.webkitURL;
					let img = new Image();
					img.onload = function() {
						let valid = img.width === width && img.height === height;
						valid ? resolve() : reject();
					}
					img.src = _URL.createObjectURL(file);
				}).then(() => {
					return file;
				}, () => {

					_this.$message.error('图片尺寸限制为1920 x 720，大小不可超过10MB');
					console.log(Promise.reject())
					return false;
				});
				if (!is1M) {
					_this.$message.error('图片尺寸限制为1920 x 720，大小不可超过10MB')
				}
				return isSize & is1M
			},
			getparent() {
				this.router.push({
					path: "/contentManager/homeBanner",
					query: {
						tabsnum: 0
					}
				})
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			checkUrl(urlString) {
				if (urlString != "") {
					var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
					if (!reg.test(urlString)) {
						return true;
					}
				}
			},
			add() {
				if (!this.banner_name ) {
					this.$message({
						type: "info",
						message: "banner素材名称不能为空！！"
					});
					return;
				}
				if (!this.banner_pic) {
					this.$message({
						type: "info",
						message: "banner图片不能为空"
					});
					return;
				}
				if (this.checkUrl(this.jump_url)) {
					this.$message({
						type: "info",
						message: "跳转链接url格式不正确！！"
					});
					return;
				}
				this.api.banneradd({
					access_token: localStorage.getItem("access_token"),
					banner_name: this.banner_name,
					banner_pic: this.banner_pic,
					jump_url: this.jump_url
				}).then(da => {
					//console.log(da)
					if (da = "添加成功") {
						this.$router.go(-1);
					}
				}).catch(() => {

				})
			},
			edit() {
				if (!this.banner_name ) {
					this.$message({
						type: "info",
						message: "banner素材名称不能为空！！"
					});
					return;
				}
				if (!this.banner_pic) {
					this.$message({
						type: "info",
						message: "banner图片不能为空"
					});
					return;
				}
				if (this.checkUrl(this.jump_url)) {
					this.$message({
						type: "info",
						message: "跳转链接url格式不正确！！"
					});
					return;
				}
				this.api.banneredit({
					access_token: localStorage.getItem("access_token"),
					banner_name: this.banner_name,
					banner_pic: this.banner_pic,
					jump_url: this.jump_url,
					id: this.rows.id
				}).then(da => {
					//console.log(da)
					if (da = "修改成功") {
						this.$router.go(-1);
					}
				}).catch(() => {

				})
			},
			httprequest(params) {
				console.log(params)
				const _file = params.file;
				this.file = params.file
				let _this = this
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
				this.$parent.setpercentage("start");
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function(response) {
					//console.log(response.data.data.url);

					_this.$parent.setpercentage("end", response.data.data.url);
				}).catch(function(error) {
					console.log(error);
				});
				//console.log(this.form.banner = url)
			},
			setimgurl(url) {
				this.banner_pic = url;
			}
		},
		created() {
			if (this.$route.query.row) {
				this.rows = JSON.parse(this.$route.query.row);
				this.banner_name = this.rows.banner_name;
				this.banner_pic = this.rows.banner_pic;
				this.jump_url = this.rows.jump_url;
			}
		},
		mounted() {
			this.currentpageName = (this.$route.matched[this.$route.matched.length - 1].meta.title).split("/")[1];
			console.log(this.$route.matched);
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

	.margintbt30 {
		margin-bottom: 30px;
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
</style>
