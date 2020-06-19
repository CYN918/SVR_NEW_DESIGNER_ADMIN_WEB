<template>
	<div class="wh">
		<div class="wh" ref="elememt" >
			<el-table 
			ref="multipleTable" 
			:reserve-selection="true" 
			:data="tableDatas" 
			tooltip-effect  
			:header-cell-style="cellStyle" 
			:max-height="600" 
			v-loading="loading" 
			@selection-change="handleSelectionChange" 
			
			>
				<el-table-column v-if="value.ischeck" width="27"></el-table-column>
				<el-table-column v-if="value.ischeck" width="55" type="selection" ></el-table-column>
				<el-table-column v-if="!value.ischeck" width="33"></el-table-column>
				<el-table-column 
					v-for="(item,index) in value.tableCg" 
					:key="index" 
					:label="item.lable" 
					:width="item.width">
					<template slot-scope="scope"  >
						<div class="imgs_001" v-if="item.type=='imgs'">
							<img v-for="el in scope.row[item.props]" :src="el[item.imgPo]"/>
						</div>
						
						<div v-if="item.type=='state'">
							{{item.clfn(scope.row)}}
						</div>
						
						<span v-if="!item.type">{{scope.row[item.props]}}</span>
					</template>	
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<span v-if="value.tools.links && gettrue(value.tools.links.accessid) && value.tools.links.checkFn(scope.row)" 
						@click="clicKfn(value.tools.links.fun,scope.row)" 
						class="pointer" style="padding: 0 10px;color:#33B3FF;font-size: 14px;">
							{{ value.tools.links.name?value.tools.links.name:value.tools.links.clfn(scope.row)}}
						</span>	
						<span v-else>
							--
						</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="w" style="text-align: right;background: #FFFFFF;">
				
				<el-pagination v-if="total>50" class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
				 :page-sizes="[50, 100, 200, 500]" :page-size="pagesize" layout="prev, pager, next, sizes,jumper">
				</el-pagination>
			</div>
		</div>
		<div class="maskimg screenContent" v-if="isimgurl" @click="getimgulr">
			<img :src="imgurl" alt="暂无图片" style="max-height: 500px;">
		</div>
	</div>
</template>
<!-- :total="tableConfig.total" -->
<script>
	export default {
		props:{
			value:Object
		},
		data() {
			return {
				loading:false,
				tableHeight: 150,
				currentpage: 1,
				pagesize: 50,
				selected:0,
				loading:true,
				allselect:false,
				sel:true,
				multipleSelectionAll:[],
				multipleSelection:[],
				pageid:"",
				imgurl:"",
				isimgurl:false,
				adminuseraccess: [],
				radio:'',
				row:{},
				btnStatus: true,
				tableDatas:[],
				total:0,
			}
		},
		methods: {
			clicKfn(fn,obj){
				if(this.$parent[fn]){
					this.$parent[fn](obj);
				}			
			},
			climgs(all){
				if(!all){
					return []
				}
				return all.slice(0,3)
			},
			namChck(n,k) {
				if(n.business_type==5){
					return n[k]+'.mp4';
				}
				
			  return  n[k];
			},
			
			gettrue(id){
				if(this.adminuseraccess.indexOf(id) > -1){
					return true;
				} else {
					return false;
				}
			},
			
			rowclick(row){
				this.row = row;
				this.radio = row[this.tableConfig.selectid];
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getTabData();
				this.$nextTick(() => {
					this.$refs.elememt.scrollTo(0,'34px');
				})
			},
			handleCurrentChange(val) {
				this.currentpage = val;
				this.getTabData();
				this.$nextTick(() => {
					this.$refs.elememt.scrollTo(0,'34px');
				})
			},
			handleSelectionChange(val) {
				// console.log(val.length)
				this.selected = val.length;
				if(val.length == '0'){
					this.btnStatus = true;
				}else{
					this.btnStatus = false;
				}
				this.multipleSelectionAll=[];
				if(this.tableConfig.masktable){
					
				} else {
					if(this.sel == false){
						return;
					}
					this.multipleSelection = val
					this.changePageCoreRecordData(this.multipleSelection)
				}	
			},			
			getTabData() {
				let pr = {
					pageCurrent: this.currentpage,
					pageSize: this.pagesize,
					access_token:localStorage.getItem("access_token")
				};
				
				if(this.value.prCl){
					let pd = this.value.prCl();
					pr = Object.assign(pr,pd);
				}
								
				this.api[this.value.ajax.url](pr).then((da)=>{
					this.loading = false;
					if(this.value.dataCl){
						da.data = this.value.dataCl(da.data);
					}
					this.tableDatas = da.data;
					this.total = da.total;					
				}).catch(()=>{
					this.loading = false;
				})
				
			},
			autoTableHeight() {
				// setTimeout(() => {
				// 	this.tableHeight = this.$refs.elememt.offsetHeight / 100 * 88;
				// }, 100)

			},
			init(){
				this.loading = true;
				
				this.getTabData();
			},
			cellStyle() {
			  return 'borderBottom: 5px solid #f0f2f5'
			},
			
		},
		mounted() {},
		created() {
			this.autoTableHeight();
			this.init();
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
		}
	}
</script>
<style scoped="scoped">
	.status-2{
		color: #f72522;
	}
	.status-1{
		color: #f72522;
	}
	.status0{
		color:#fcae00;
	}
	.status1{
		color:#fcae00;
	}
	.status2{
		color:#4dc600;
	}
	.status10{
		color:#4dc600;
	}
	.status11{
		color:#4dc600;
	}
	
	.presetReasonstatus0{
		color:#f72522;
	}
	
	.presetReasonstatus1{
		color:#4dc600;
	}
	
	.newsReleasestatus0{
		color:#bfbfbf;
	}
	
	.newsReleasestatus1{
		color:#008dff;
	}
	
	.newsReleasestatus2{
		color:#4dc600;
	}
	
	.activityEmploystatus-1{
		color:#bfbfbf;
	}
	.activityEmploystatus0{
		color:#bfbfbf;
	}
	.activityEmploystatus1{
		color:#008dff;
	}
	
	.recommendedActivitiesstatus0{
		color:#bfbfbf;
	}
	.recommendedActivitiesstatus1{
		color:#008dff;
	}
	.recommendedActivitiesstatus-1{
		color:#f72522;
	}
	.recommendedActivitiesstatus-2{
		color:#f72522;
	}
	
	.maskimg{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 2005;
	}
	.wh >>> .is-leaf{
		height: 60px;
		line-height: 60px;
		padding: 0;
	}
	.sel-tooltip{
		width: 170px;
		border: 1px solid #E6E6E6;
		position: absolute;	
		background: white;
		margin-top: 9px;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
		border-radius: 2px 2px 2px 2px;
	}
	.sel-tooltip .comonbtn:hover{
		color: #33B3FF !important;
        background: #e5f5ff !important;
	}
	.el-popper{
		position: absolute;
		top: 332px;
	}
	/* #table .el-table th.is-leaf {
		border-bottom: 5px solid #545C64;
	} */
	/* .el-table__fixed {
		margin-left: 27px;
	} */
	.imgs_001{
		width: 270px;
	}
	.imgs_001>img{
		width: 80px;height: 48px;margin: 0 10px 0 0;
		display: inline-block;
		vertical-align: top;
	}

</style>
