<template>
	<div class="wh">
		<div class="fleft hnav marginleft60 fontcolorg">
			<el-breadcrumb separator="/" class="fontcolorg">
				<el-breadcrumb-item v-for="(item,index) in names" :key="item.index">{{ item.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="fright hnav marginright60" style="position: relative;">
			<router-link to="/review" tag="div" class="fleft pointer">
				<span class="dp fontsize18">审核台</span>
				<span class="dp sel-badge" v-html="reviewnum">99+</span>
			</router-link>
			<span class="fright marginleft60 usertou pointer" @click="signOut"></span>
			<div class="userinfobtn" v-if="IsSign" style="z-index: 2004;">
				<div>{{ this.user.name }}</div>
				<div @click="getuser()"><i class="el-icon-setting" style="margin-right: 8.2px;"></i>账号信息</div>
				<div @click="out()"><i class="iconfont" style="margin-right: 8.2px;padding-left: 0;">&#xe67f;</i>退出登录</div>
			</div>
			<div class="masku" v-if="IsSign" @click="signOut"></div>
		
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				names: [],
				IsSign: false,
				reviewnum:0,
				user:"",
			}
		},
		watch: {
			$route() {
				this.getBreadcrumb();
			}
		},
		computed: {},
		methods: {
			getBreadcrumb() {
				this.names = this.$route.matched
				//console.log(this.$route.matched)
			},
			signOut() {
				this.IsSign = !this.IsSign
			},
			getbus(){
				eventBus.$on("reviewnum",(data) =>{
					this.reviewnum  = data;
				})
			},
			getuserinfo(){
				this.api.selfInfo({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					//console.log(da)
					this.user = da;
					
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
							this.router.push({
								path:"/"
							})
						}
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
				
				
			}
			
		},
		created() {
			this.getBreadcrumb();
			this.getbus();
			this.getuserinfo()
		},
		mounted() {}
	}
</script>
<style lang="scss">
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
		background: #FF0000;
		color: white;
	}

	.usertou {
		width: 32px;
		height: 32px;
		margin: 14px 0;
		margin-left: 58px;
		border-radius: 50%;
		background: #FF0000;
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
</style>
