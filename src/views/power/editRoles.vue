<template>
<div>
	<common-top :commonTopData="commonTopData"></common-top>
	<div class="wh Detail">
		<div class="detailtitle">编辑角色</div>
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
						:default-checked-keys="permissions"
						ref="tree"
						:props="defaultProps">
						</el-tree>
						<!-- check-strictly -->
					</div>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn" @click="addrole()">提交</button>
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
		props: ['detailData','roles'],
		data() {
			return {
				test:{},
				text10: this.$route.query.name,
				text30: this.$route.query.description,
				length10: 0,
				length30: 0,
				data2: [{}],
				defaultProps: {
					children: 'child',
					label: 'title'
				},
				permissions:[],
				commonTopData: {
					"pageName": "editRoles",
					"commonleftbtn": [],
					
					"commonrightbtn": [],
					"commonbottombtn":[],
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
				//console.log(rolesString);
				this.api.editRole({
					access_token:localStorage.getItem("access_token"),
					id:this.$route.query.id,
					name:this.text10,
					permissions:rolesString,
					description:this.text30
				}).then(da =>{
					if(da == "修改成功"){
						this.$router.go(-1)
					}
					
					/* this.router.push({
						path:"/power/roleManager"
					}) */
				}).catch(da => {
					
				})
			},
			seeroles(){
				this.api.infoRole({
					access_token:localStorage.getItem("access_token"),
					id:this.$route.query.id
				}).then(da =>{
					
					this.rolename = da.name;
					this.roleintroduce = da.description;
					//console.log(da.permissions.split(","));
					da.permissions.forEach((itme)=>{
						if(parseInt(itme)){
							this.permissions.push(parseInt(itme));
						}
						
					})
					this.getMenu();
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
			this.seeroles();
		},
		created(){
			if(this.$route.query.name){
				this.length10 = this.$route.query.name.length
			}
			if(this.$route.query.description){
				this.length30 = this.$route.query.description.length
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
</style>
