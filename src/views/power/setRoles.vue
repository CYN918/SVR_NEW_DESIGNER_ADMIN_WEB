<template>
	<div class="wh Detail">
		<div class="detailtitle">设置角色</div>
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
				<li class="margint13  relative">
					<span class="fleft roles-input" style="margin-right: 20px;width:84px">角色名称</span>
					<div class="el-input__inner roles-input width500 pointer" @click="seloption()">
						<div class="fleft" style="width: 450px;height: 100%;overflow-y: auto;">
							<el-tag :key="item" v-for="item in checkedroles" closable class="tag"
							 :disable-transitions="false" @close="handleClose(item)">
								{{item}}
							</el-tag>
						</div>
						<i class="fright el-icon-arrow-down" style="margin-top: 12px;"></i>
					</div>
					<div class="mask" @click="hide()" v-if="Islist"></div>
					<div class="sel-select-option" v-show="Islist">
						<el-checkbox-group v-model="checkedroles" @change="checkedrole">
							<div  v-for="item in rolesData" :key="item.id" :id = "item.id">
								<el-checkbox :label="item.name">{{item.name}}</el-checkbox>
							</div>
						 </el-checkbox-group>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;width:84px">权限设置</span>
					<div class="roles-input width500 roletree">
						<el-tree :data="data2" 
						ref="tree"
						show-checkbox
						node-key="id"
						:default-checked-keys="permissions"
						:props="defaultProps">
						</el-tree>
					</div>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" @click="setrole()">提交</button>
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
				roleintroduce:{},
				permissions:[],
				checkedroles:[],
				Islist:false,
				rolesData:[],
				role_ids:[],
				rows:JSON.parse(this.$route.query.row),
				checkedKeys:[]
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
				this.api.getAdminUserInfo({
					access_token:localStorage.getItem("access_token"),
					id:this.rows.id
				}).then(da =>{
					//console.log(da)
					this.roleintroduce = da;
					//console.log(da.role);
					for(var itme in da.role){
						this.checkedroles.push(da.role[itme])
					}
					this.checkedrole(this.checkedroles);
					
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
					this.data2 = this.tickMenuIdFilter().filter(da);
				}).catch(da =>{
					
				})
			},
			seloption(){
				this.Islist = !this.Islist;
			},
			handleClose(tag) {
				//console.log(this.checkedroles)
				this.checkedKeys = [];
				this.checkedroles.forEach((item,index)=>{
					if(tag == item){
						this.checkedroles.splice(index,1);
						this.checkedrole(this.checkedroles)
					}
				});
				
			},
			hide(){
				this.Islist = false;
			},
			getData(pg) {
				//获取所有的角色
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 100
				}
				
				this.api.getRoleList(data).then((da) => {
					//console.log(da.data)
					
					this.rolesData = da.data;
					this.seeroles();
					///console.log(this.rolesData);
				}).catch(() => {
			
				});
			},
			setrole(){
				this.api.setRole({
					access_token:localStorage.getItem("access_token"),
					user_id:this.rows.id,
					role_ids:this.role_ids.toString(),
				}).then(da=>{
					//console.log(da);
					this.$router.go(-1);
				}).catch(da=>{
					
				})
			},
			checkedrole(val){
				//console.log(val)
				this.role_ids = []
				this.rolesData.forEach((item,index)=>{
					val.forEach(citem=>{
						if(item.name == citem){
							this.role_ids.push(item.id);
						}
					})
					this.role_ids.forEach(citem=>{
						//console.log(citem,item.id)
						if(item.id == citem){
							let permission = item.permissions.split(",");
							//console.log(item.permissions.split(","))
							for(var i=0;i<permission.length;i++){
								//console.log(this.checkedKeys.indexOf(permission[i]));
								if(this.checkedKeys.indexOf(permission[i]) == -1){
									this.checkedKeys.push(permission[i]);
								}
							}
							//this.permissions.concat(item.permissions.split(","));
						}
					})
					
					//console.log(this.checkedKeys);
					this.$refs.tree.setCheckedKeys(this.checkedKeys);
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
		created(){
			this.getData();
			//this.seeroles();
			//console.log(this.rows);
		},
		mounted() {
			
			
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
	
	.sel-select-option {
		position: absolute;
		background: #FFFFFF;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
		border-radius: 5px;
		z-index: 99999;
		padding: 20px;
		width: 460px;
		left: 104px;
	}
	
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 888;
	}
</style>
