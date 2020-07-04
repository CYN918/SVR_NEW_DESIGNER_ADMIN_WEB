<template>
	<div class="cont-box">
		<div class="cont-box_1">
			<div class="wh" ref="elememt" id="table" v-loading="loading">
				<el-table ref="multipleTable" 
				:reserve-selection="true" 
				:row-key="getRowKeys" 
				:data="tableDatas" 
				tooltip-effect  
				:header-cell-style="cellStyle" style="width: 100%" 
				:height="tableHeight" 
				@selection-change="handleSelectionChange">
					<el-table-column width="27" v-if="value.ischeck"></el-table-column>
					<el-table-column width="55" type="selection" v-if="value.ischeck"></el-table-column>
					<el-table-column width="33" v-if="!value.ischeck"></el-table-column>
					<el-table-column v-for="(item,index) in value.props" :key="index" :prop="item.prop" :label="item.lable" :width="item.width">
						<template slot-scope="scope">
							
						</template>	
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="150">
						<template slot-scope="scope">
							<div></div>
						</template>
					</el-table-column>
				</el-table>
				<div class="w" style="text-align: right;background: #FFFFFF;">
					
					<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
					 :page-sizes="[50, 100, 200, 500]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>
				
		</div>
		<div class="cont-box2"></div>
	</div>
	
</template>

<script>
export default{
	props:{value:Object},
	data(){
		return{
			tableDatas:[],
			tableHeight: 150,
		}
	},
	methods:{
		getData(){
			this.api[this.value.ajax.url](pr).then((da)=>{
				
			}).catch(()=>{
				
			})
		},
		getRowKeys(row) {
			return row.id;
		},
		cellStyle() {
		  return 'borderBottom: 5px solid #f0f2f5'
		},
		handleSelectionChange(val) {			
			this.changePageCoreRecordData(val)
		},
		changePageCoreRecordData (x) {

		},
	}
}
</script>

<style>
.cont-box_1{
	flex: 1;
	background: #fff;
}
.cont-box2{
	height: 40px;

}
</style>
