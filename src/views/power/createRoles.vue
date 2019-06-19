<template>
	<div class="wh Detail">
		<div class="detailtitle">添加角色</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft roles-input" style="margin-right: 20px;">角色名称</span>
					<div class="el-input__inner roles-input width500">
						<input type="text" placeholder="请输入内容" class="sel-input fleft" maxlength="10" @input="getleng(10)" v-model="text10">
						<span class="fright">{{ length10 }}/10</span>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft roles-input" style="margin-right: 20px;">角色介绍</span>
					<div class="el-input__inner roles-input width500">
						<input type="text" placeholder="请输入内容" class="sel-input fleft" maxlength="30" @input="getleng(30)" v-model="text30">
						<span class="fright">{{ length30 }}/30</span>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft roles-input" style="margin-right: 20px;">权限设置</span>
					<div class="roles-input width500 roletree">
						<el-tree :data="data2" 
						show-checkbox
						node-key="id" 
						ref="tree"
						:props="defaultProps">
						</el-tree>
					</div>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn" @click="addrole()">添加</button>
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
				data2: [{}],
				defaultProps: {
					children: 'child',
					label: 'title'
				},
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
			addrole(){
				let rolesString = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).toString();
				if(!this.text10 || !rolesString){
					this.$message({
					  type: 'warning',
					  message: "请填写角色名称/角色权限"
					});
					return;
				}
				
				//console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
				//alert(rolesString);
				this.api.addRole({
					access_token:localStorage.getItem("access_token"),
					name:this.text10,
					permissions:rolesString,
					description:this.text30
				}).then(da =>{
					this.$router.go(-1)
				}).catch(da => {})
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
</style>
