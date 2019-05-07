<template>
	<div class="wh Detail">
		<div class="detailtitle">创建角色</div>
		<div class="detailContent ofh">
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
					<span class="fleft roles-input" style="margin-right: 20px;">角色介绍</span>
					<div class="roles-input width500 roletree">
						<el-tree 
							:data="data2" 
							show-checkbox 
							node-key="id" 
							:default-expanded-keys="[2, 3]" 
							:default-checked-keys="[5]"
						    :props="defaultProps"
							ref="tree"
						>
						</el-tree>
					</div>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn" @click="addrole()">添加</button>
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
					id: 1,
					label: '一级 1',
					children: [{
						id: 4,
						label: '二级 1-1',
						children: [{
							id: 9,
							label: '三级 1-1-1'
						}, {
							id: 10,
							label: '三级 1-1-2',
							disabled:true,
						}]
					}]
				}, {
					id: 2,
					label: '一级 2',
					children: [{
						id: 5,
						label: '二级 2-1',
						disabled:true
					}, {
						id: 6,
						label: '二级 2-2'
					}]
				}, {
					id: 3,
					label: '一级 3',
					children: [{
						id: 7,
						label: '二级 3-1'
					}, {
						id: 8,
						label: '二级 3-2'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		methods: {
			getparent() {
			    this.router.push({
					path:"/power/roleManager"
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
			addrole(){
				let rolesString = this.$refs.tree.getCheckedKeys().toString();
				//alert(rolesString);
				this.api.addRole({
					access_token:2,
					name:this.text10,
					permissions:rolesString,
					description:this.text30
				}).then(da =>{
					this.$message({
					  type: 'info',
					  message: da ? "添加成功" : "添加失败"
					});
					this.$parent.getData({pageCurrent:1,pageSize:10});
				}).catch(da => {})
			},
			getMenu(){
				const data = {
					_token:1
				}
				this.api.getMenuList(data).then(da => {
					//console.log(da[0])
					this.toTree(da)
				}).catch(da =>{
					
				})
			},
			toTree(data) {
			    // 删除 所有 children,以防止多次调用
			    data.forEach(item => {
			        delete item.children;
			    });
					
			    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
			    var map = {};
			    data.forEach(item => {
			        map[item.level] = item;
			    });
			    //console.log(map)
			    var val = [];
			    data.forEach(item => {
			        // 以当前遍历项的pid,去map对象中找到索引的id
			        var parent = map[item.id];
					//  console.log(parent);
			        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
			        if (parent) {
			            (parent.children || ( parent.children = [] )).push(item);
			        } else {
			            //  如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
			            val.push(item);
			        }
			    });
				//console.log(val);
			    return val;
			},
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
