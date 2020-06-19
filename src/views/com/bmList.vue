<template>
	<div>
		<tabled class="myTbles" v-model="cofig"></tabled>		
	</div>
	
</template>
<script>
import tabled from "./table"
export default{
	components: {
		tabled,
	},
	data(){
		return{
			cofig:{
				tableCg:[
					{props:'username',lable:'报名用户',width:120},
					{props:'works',imgPo:'face_pic',lable:'作品案例',type:'imgs',clckFn:'openWork'},	
					{props:'is_selected',type:'state',lable:'选标状态',width:120,clfn:(da)=>{
						let map = {
							'1':'已选中',
							'0':'待选择'
						};
						return map[da.is_selected];
					}},
				],
				tools:{
					links:{
						checkFn:(da)=>{
							return da.is_selected!=1;
						},
						name:"选为制作人",
						accessid:"200609",
						fun:"sle",
					}
				},
				ajax:{
					url:'signupList'
				},
				prCl:(da)=>{
					return {
						project_id:this.$route.query.id,						
					}
				},
				dataCl:(da)=>{
					if(!da){return}
					let arr = [];
					da.map((em,index)=>{						
						arr.push( {
							is_selected:em.is_selected,
							username:em.user.username,
							works:em.works,
							project_name:em.project_name,
							project_id:em.project_id,
							open_id:em.user.open_id,
						})
					});
					return arr;
				}
			}
			
		}
	},
	methods:{
		
		sle(row){
			
			this.$confirm('确定将<span style="color:#ff5121">'+ row.username +'</span>定为<span style="color:#ff5121">'+ row.project_name +'</span>的中标制作人', '确认修改', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				dangerouslyUseHTMLString: true,
				type: '',
				customClass:"work",
				center: true
			}).then(() => {
				this.api.selectUser({
					access_token: localStorage.getItem("access_token"),
					project_id:row.project_id,
					open_id:row.open_id
				}).then(da => {
					if(da.result == 0){
						this.$message({
							message:'选标成功',
							type:"success"
						});
						this.$router.push({
							path:"/projectManagement/projectList",
							query:{
								tabsnum:3
							}
						})
					}
				}).catch(da => {
					
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已经取消'
				});
			});
		},
		signupList(){
			// let data={
			// 	project_id:this.$route.query.id,
			// 	access_token:localStorage.getItem("access_token"),
			// 	limit:this.tableConfig.pagesize,
			// 	page:this.tableConfig.currentpage
			// }
			
			// this.api.signupList(data).then(da => {
			// 	this.signupLists = da.data;
			// 	this.tableConfig.total = da.total;
			// }).catch(da =>{
				
			// })
		},
	}
}
</script>

<style>
.myTbles{
	width: 100%;
}
</style>
