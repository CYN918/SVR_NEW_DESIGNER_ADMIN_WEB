<template>
	<div class="wh Detail">
		<div class="detailtitle">查看页面</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;width: 84px;">用户ID</span>
					<span>{{ rolename }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;width: 84px;">用户名称</span>
					<span>{{ roleintroduce }}</span>
				</li>
				
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;width: 84px;">邮箱</span>
					<span>{{ roleintroduce }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft roles-input" style="margin-right: 20px;width: 84px;">角色名称</span>
					<div class="fleft width500">
						<span class="fleft account-ipt"> 超级价额 </span>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;width: 84px;">所持有的权限</span>
					<div class="roles-input width500 roletree">
						<el-tree :data="data2" 
						show-checkbox
						node-key="id" 
						check-strictly
						:default-checked-keys="permissions"
						:props="defaultProps">
						</el-tree>
					</div>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['detailData','roles'],
		data() {
			return {
				text10: '',
				text30: "",
				length10: 0,
				length30: 0,
				data2: [{
					
				}],
				defaultProps: {
					children: 'child',
					label: 'title'
				},
				rolename:"--",
				roleintroduce:"--",
				permissions:[],
			}
		},
		methods: {
			getparent() {
				this.router.push({
					path: "/power/accountManager"
				})
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			getleng(n) {
				if (n == 10) {
					this.length10 = this.text10.length
				} else if (n == 30) {
					this.length30 = this.text30.length
				}
			},
			seeroles(){
				this.api.getAdminUserInfo({
					access_token:2,
					id:this.$route.query.id
				}).then(da =>{
					console.log(da)
					/* this.rolename = da.name;
					this.roleintroduce = da.description; */
					console.log(da.permissions.split(","));
					da.permissions.split(",").forEach((itme)=>{
						if(parseInt(itme)){
							this.permissions.push(parseInt(itme));
						}
						
					})
					
				}).catch(da => {
					
				})
			},
			getMenu(){
				const data = {
					_token:1
				}
				this.api.getMenuList(data).then(da => {
					//console.log(da)
					this.data2 = da;
				}).catch(da =>{
					
				})
			}
		},
		mounted() {
			this.getMenu();
			
		},
		created() {
			this.seeroles();
		}
	}
</script>

<style scoped>
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
	
	.account-ipt{
		padding: 10px;
		text-align: center;
		border: 1px solid #999999;
        border-radius: 5px;
	}
</style>
