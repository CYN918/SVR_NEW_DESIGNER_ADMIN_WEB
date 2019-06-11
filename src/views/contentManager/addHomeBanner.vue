<template>
	<div class="wh Detail">
		<div class="detailtitle">编辑banner素材</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">banner素材活动</span>
					<el-input placeholder="请输入内容" style="width:357px;height:40px;" v-model="banner_name">{{2222 }}</el-input>
				</li>
				<li class="margint23 ofh">
					<span class="fleft detailKey"  style="line-height: 40px;color: #000000;">banner</span>
					<el-upload action="454535" :http-request="httprequest" :show-file-list="false">
						<div style="overflow: hidden;">
							<button class="defaultbtn fleft" style="margin-left: 0;">上传图片</button>
						</div>
						<div class="fontcolorg">1920px*620px，格式jpg，jpeg，png，大小不超过10M</div>
					</el-upload>
					<img :src="banner_pic" alt="" width="340px" height="110px" style="margin-left: 156px;">
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">跳转链接</span>
					<el-input placeholder="请输入内容" v-model="jump_url" style="width:357px;height:40px;"></el-input>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" v-if="!rows" @click="add()">创建</button>
			<button class="defaultbtn defaultbtnactive" v-if="rows"  @click="edit()">确定</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				detailData: '',
				banner_name: "",
				banner_pic:"",
				jump_url:"",
				rows: "",
			}
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
			add(){
				if(!this.banner_name || !this.banner_pic || !this.jump_url){
					this.$message({
						type:"info",
						message:"banner素材活动*banner图片*跳转链接不能为空！！"
					});
					return;
				}
				
				this.api.banneradd({
					access_token:localStorage.getItem("access_token"),
					banner_name: this.banner_name,
					banner_pic:this.banner_pic,
					jump_url:this.jump_url
				}).then(da => {
					//console.log(da)
					if(da = "添加成功"){
						this.$router.go(-1);
					}
				}).catch(() => {
					
				})
			},
			edit(){
				 this.api.banneredit({
					access_token:localStorage.getItem("access_token"),
					banner_name: this.banner_name,
					banner_pic:this.banner_pic,
					jump_url:this.jump_url,
					id:this.rows.id
				}).then(da => {
					//console.log(da)
					if(da = "修改成功"){
						this.$router.go(-1);
					}
				}).catch(() => {
					
				})
			},
			httprequest(params) {
				//console.log("params",params)
				const _file = params.file;
				this.file = params.file
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
					_this.banner_pic = response.data.data.url
				}).catch(function (error) {
					console.log(error);
				});
				//console.log(this.form.banner = url)
			},
		},
		created() {
			if(this.$route.query.row){
				this.rows = JSON.parse(this.$route.query.row);
				this.banner_name = this.rows.banner_name;
				this.banner_pic = this.rows.banner_pic;
				this.jump_url = this.rows.jump_url;
			}
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
		height: calc(100% - 139px);
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
	
	.status .el-radio{
		width: auto;
	}
</style>
