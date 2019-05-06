<template>
	<div class="wh">
		<div class="tabtop" ref="elememt">
			<el-table :height="tableHeight" :data="tableDatas" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column fixed type="selection" width="55"></el-table-column>
				<el-table-column v-for="(item,index) in tableConfig.list" :key="index" :prop="item.prop" :label="item.lable" :width="item.width">
					<template slot-scope="scope">
						<span v-if="item.type == 'img'" style="width: 120px;height: 50px;background: red;display: inline-block;"></span>
						<span v-else-if="item.type != 'img'">{{ scope.row[item.prop] }}</span>
					</template>	
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="120">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row,'',tableAction.morebtns.page)" type="text" size="small" v-if="tableAction.links.Ishow">{{ tableAction.links.name }}</el-button>
						<el-dropdown trigger="click" v-if="tableAction.morebtns.Ishow">
							<span class="el-dropdown-link">{{ tableAction.morebtns.name }}</span>
							<el-dropdown-menu class="sel-tooltip" slot="dropdown">
								<el-dropdown-item v-for="(citem,index) in tableAction.morebtns.child" :key="index" class="comonbtn" @click.native="handleClick(scope.row,'contributor',tableAction.morebtns.page)">{{ citem.name }}</el-dropdown-item>
								<!-- <el-dropdown-item class="comonbtn" @click.native="handleClick(scope.row,'contributor')">设为平台推荐创作者</el-dropdown-item>
								<el-dropdown-item class="comonbtn">添加至黑名单</el-dropdown-item> -->
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="w block">
			<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
			 :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableConfig.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['tableConfig', 'tableDatas','tableAction'],
		data() {
			return {
				IsMoreShow: false,
				tableHeight: 150,
				currentpage: 1,
				pagesize: 10,
				sdata: [
				{
					"id": "2",
					"open_id": "",
					"code": " 123123",
					"company_name": " 123",
					"business_license": " http://zk-new-designer.oss-cn-beijing.aliyuncs.com/33033edd11524bb6e69856e46b1b0269.png",
					"opening_permit": " http://zk-new-designer.oss-cn-beijing.aliyuncs.com/33033edd11524bb6e69856e46b1b0269.png",
					"tax_rate_type": "1",
					"account_name": "",
					"bank_card_no": " 123213",
					"bank_name": "",
					"branch_bank": " 123123",
					"status": "0",
					"created_at": "2019-04-27 10:56:08",
					"updated_at": "2019-04-27 10:56:08"
				}]
			}
		},
		methods: {
			handleClick(row, setid, page) {
				
				//console.log(row);
				switch(page){
					case "userBaseInfo":
						if (setid == "contributor") {
							this.$parent.setContributor(row);
							return;
						}
						this.$parent.linkDetail(row.open_id);
					break;
					case "roleManager":
						if (setid == "contributor") {
							this.router.push({path:"/power/roleManager/seeRoles"})
						}
						this.$parent.IsDetail = 3;
						this.router.push({path:"/power/roleManager/seeRoles"})
					break;
				}
				
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getTabData();
			},
			handleCurrentChange(val) {
				this.currentpage = val;
				this.getTabData();
			},
			handleSelectionChange(val) {
				//console.log(val);
				this.$parent.selectData = val;
			},
			getTabData() {
				const data = {
					pageCurrent: this.currentpage,
					pageSize: this.pagesize
				};
				this.$parent.getData(data)
			},
			autoTableHeight() {
				//设置table标签
				setTimeout(() => {
					this.tableHeight = this.$refs.elememt.offsetHeight;
				}, 100)
				//此处需要通过延迟方法来设置值，不然会出现值已更新，但页面没更新的问题
				//this.$refs.table.$el.offsetTop：表格距离浏览器的高度
			},
			init(){
				//console.log(this.tableAction)
			}
		},
		mounted() {
			this.autoTableHeight();
			//console.log(this.tableConfig)
			this.init()
		}
	}
</script>
<style>
	.block {
		height: 100px;
		line-height: 100px;
		text-align: center;
		background: white;
	}

	.tabtop {
		height: calc(100% - 100px);
		overflow: hidden;
	}

	#app .el-pagination .number,
	#app .el-pagination button {
		border: 1px #999999 solid;
		color: #999999;
		margin-left: 14px;
		border-radius: 5px;
		width: 40px;
		height: 40px;
		line-height: 40px;
		margin-top: 29px;
	}

	#app .el-pagination .number:hover,
	#app .el-pagination button:hover {
		border-color: #ff5121;
		background-color: #ff5121;
		color: white;
	}

	#app .el-pagination .number:active,
	#app .el-pagination button:active {
		border-color: #ff5121;
		background-color: #ff5121;
		color: white;
	}

	#app .el-pagination button,
	.el-pagination span:not([class*=suffix]) {
		line-height: 100px;
	}

	#app .el-input--mini .el-input__inner,
	#app .el-pagination__editor.el-input .el-input__inner {
		height: 40px;
		border: 1px #999999 solid;
	}

	#app .el-pager li.active {
		border-color: #FF5121;
		background-color: #FF5121 !important;
		color: white;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #FF5121;
		padding-left: 20px;
	}

	.el-dropdown-menu__item:focus,
	.el-dropdown-menu__item:not(.is-disabled):hover {
		background: #ffede8;
		color: #FF5121;
	}

	.el-dropdown-menu__item {
		line-height: 40px;
	}

	.el-popper[x-placement^=bottom] {
		margin-top: 0;
	}

	.el-dropdown-menu {
		padding: 0;
	}

	.el-button--text {
		color: #FF5121;
	}

	#app .el-checkbox__inner:hover {
		border-color: #FF5121;
	}

	.el-checkbox__input.is-checked .el-checkbox__inner,
	.el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background-color: #FF5121;
		border-color: #FF5121;
	}
	
	.el-pager li.btn-quicknext, .el-pager li.btn-quickprev{
		line-height: 100px;
	}
</style>
