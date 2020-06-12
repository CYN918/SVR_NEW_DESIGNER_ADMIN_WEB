<template>
	<div v-loading="loading">
		<el-table 
			:reserve-selection="true" 
			:data="tableDatas" 
			tooltip-effect  
			:header-cell-style="cellStyle">
			<el-table-column v-for="(item,index) in tConfig" :prop="item.prop" :label="item.lable" :width="item.width">
				<template slot-scope="scope">
					<div>
						<div class="bm_uimg" v-if="item.type=='imgs'">
							<span v-for="el in scope.row[item.prop]" :style="setImg(el)"></span>
						</div>
						<span v-else-if="item.type=='status'">
							{{item.clfn(scope.row)}}
						</span>
						<span v-else>
							{{scope.row[item.prop]}}
						</span>
					</div>
				</template>	
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<span>测试</span>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
			 :page-sizes="[50, 100, 200, 500]" :page-size="limit" layout="sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		
		<div class="user_n_01">
			<div>
				<img src="" alt="">
				<div>
					<div></div>
					<div>职业|所在地</div>
				</div>
			</div>
			<div>
				<span>粉丝<i></i>999</span>
				<span>粉丝<i></i>999</span>
				<span>粉丝<i></i>999</span>
				<span>粉丝<i></i>999</span>
				<span>粉丝<i></i>999</span>
				<span>粉丝<i></i>999</span>
			</div>
			<div>
				工作现状<span>wosasdas</span>
			</div>
			<div>
				类型偏好<span>wosasdas</span>
			</div>
			<div>
				
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			loading:false,
			tableDatas:[],
			page:1,
			limit:50,
			total:0,
			tConfig:[
				{prop:'name',lable:'报名用户',width:200},
				{prop:'imgs',lable:'作品案例',type:'imgs'},
				{prop:'check_status',lable:'当前状态',type:'status',width:120,clfn:(da)=>{
					
					let map = {
						"1":"已通过",
						"0":"待审核",
						"-1":"已驳回",
					};
					return map[da.check_status];
				}},
			],
		}
	},
	mounted(){
		this.init();
	},

	methods:{
		setImg(u){
			return "background-image: url("+u+");"
		},
		init(){
			this.getTabData();
		},
		cellStyle() {
		  return 'borderBottom: 5px solid #f0f2f5'
		},
		handleSizeChange(val){
			this.limit = val;
			this.getTabData();
		},
		handleCurrentChange(val){
			this.page = val;
			this.getTabData();
		},
		getTabData(){
			this.api.signupList({
				project_id:this.$route.query.id,
				page:this.page,
				limit:this.limit,
				access_token: localStorage.getItem("access_token")
			}).then(da => {
				this.loading = false;
				console.log(da);
				let arr = da.data.map((im,index,arr)=>{		
					console.log(11111111);
					let imgs = im.works.map((im,index,arr)=>{
						return im.face_pic;
					})	
					console.log(imgs);
					return {
						name:im.user.username,
						check_status:im.check_status,
						imgs:imgs,
						userData:im.user
					}
				});
				console.log(arr);
				this.tableDatas = arr;
				this.total = da.total;
			}).catch(da =>{
				this.loading = false;
			})
		},
		
	}
}
</script>

<style>
.bm_uimg{
	text-align: left;
}
.bm_uimg>span{
	display: inline-block;
	vertical-align: top;
	width: 120px;
	height: 60px;
	background-size: cover;
	margin-right: 10px;
}
</style>
