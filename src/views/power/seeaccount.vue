<template>
	<div class="wh Detail">
		<div class="detailtitle">查看页面</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;width: 84px;">用户ID</span>
					<span>{{ rows.id }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;width: 84px;">用户名称</span>
					<span>{{ rows.name }}</span>
				</li>
				
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;width: 84px;">邮箱</span>
					<span>{{ rows.email }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft roles-input" style="margin-right: 20px;width: 84px;">角色名称</span>
					<div class="fleft width500">
						<span v-for="itme in roleintroduce.role" :key="itme" class="fleft account-ipt"> {{ itme }} </span>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;width: 84px;">所持有的权限</span>
					<div class="roles-input width500 roletree">
						<el-tree 
						:data="data2" 
						class="seerole"
						show-checkbox
						node-key="id" 
						:default-checked-keys="permissions"
						:default-expand-all ="true"
						:props="defaultProps">
						</el-tree>
					</div>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
		</div>
		<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
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
				roleintroduce:[],
				permissions:[],
				rows:JSON.parse(this.$route.query.row)
			}
		},
		methods: {
			getparent() {
				this.$router.go(-1)
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
				//console.log(this.permissions)
				this.permissions = [];
				this.api.getAdminUserInfo({
					access_token:localStorage.getItem("access_token"),
					id:this.rows.id
				}).then(da =>{
					//console.log(da)
					this.roleintroduce = da; 
					//console.log(da.permissions.split(","));
					da.permissions.forEach((itme)=>{
						if(parseInt(itme)){
							this.permissions.push(parseInt(itme));
						}
					})
					this.getMenu();
					//console.log(this.permissions);
				}).catch(da => {
					
				})
			},
			getMenu(){
				//alert(2);
				const data = {
					_token:1
				}
				this.api.getMenuList(data).then(da => {
					console.log(da)
					this.data2 = this.tickMenuIdFilter().filter(da);
					
				}).catch(da =>{
					
				})
			},
			tickMenuIdFilter: function() {
				var resultArr = new Array();
				var getTickMenuId = function(obj) {
					if (undefined == obj || null == obj || !obj instanceof Object) {
						return;
					} 
					
					obj.disabled = true;
						
					if (null != obj.child && obj.child instanceof Array) {
						for (let child of obj.child) {
							getTickMenuId(child);
						}
					}
				};
			
				return {
					filter: function(arr) {
						//console.log(arr)
						if (!arr instanceof Array) {
							return false;
						}
						resultArr = new Array();
						for (let rootMenu of arr) {
							getTickMenuId(rootMenu);
						}
						return arr;
					}
				};
			}
		},
		mounted() {
			this.seeroles();
		},
		created() {
			
		}
	}
</script>

<style>
	.seerole .el-checkbox__input.is-checked .el-checkbox__inner{
		background-color: darkgray !important;
		border-color: darkgray !important;
	}
</style>

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

	.width500 {
		width: 500px;
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
