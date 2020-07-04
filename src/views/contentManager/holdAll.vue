<template>
	<div>
		<common-top :commonTopData="commonTopData" class="commonbg"></common-top>
		<div style="padding: 20px;background: white;width: calc(100% - 40px);height: 800px;">
			<div>工具箱</div>
			<ul class="screenContent" style="justify-content: flex-start;">
				<li v-for="(item,inde) in operatelist" :key="item.id" class="holdlist textcenter" @click="goto(inde)">
					<div style="margin: 27px auto 13px;width: 80%;color: #FFFFFF;">
						<span  v-for="(citem,index) in item.event_detail" :key="citem.title" v-if="index < (item.event_detail.length - 1)">
							{{ citem.title }} +
						</span> 
						<span v-else-if="index == (item.event_detail.length - 1)" >
							{{ citem.title }}
						</span> 
					</div>
					<div style="width: 80%;margin: auto; color: #FFFFFF;text-align: left;">
						{{ item.desc }} 
					</div>
				</li>
				<li class="holdlist textcenter" @click="goFn()">
					<div style="margin: 27px auto 13px;width: 80%;color: #FFFFFF;">
						<span>批量发送邮件</span> 
					</div>
					<div style="width: 80%;margin: auto; color: #FFFFFF;text-align: left;">
						可以批量导入邮箱，设置html样式发送
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
    import commonTop from '@/components/commonTop.vue'
	export default {
		data(){
			return{
				operatelist:{},
				adminuseraccess:[],
				commonTopData: {
					"pageName": "holdAll",
					"commonleftbtn": [],
					"commonrightbtn": [],
					"commonbottombtn":[],
				},
			}
		},
		components: {
			commonTop
		},
		methods:{
			checkAss(id){
				return this.adminuseraccess.indexOf(id) != -1;
			},
			goFn(){
				this.router.push({path:"/new/email"})
			},
			goto(id){
				if(this.adminuseraccess.indexOf("200396") == -1){
					this.$message({
						message:"没有查看权限"
					})
					return;
				}
				
				
				this.router.push({
					path:"/contentManager/holdAll/holdAlltab",
					query:{
						data:JSON.stringify(this.operatelist[id])
					}
				})
			},
			getoperatelist(){
				this.api.operatelist({
					access_token:localStorage.getItem("access_token	")
				}).then(da=>{
					this.operatelist= da;
					//console.log(this.operatelist)
				})
			}
		},
		created() {
			this.getoperatelist()
		},
		mounted(){
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
		}
	}
</script>

<style>
	.holdlist{
		width: 288px;
		height: 150px;
		margin: 5px;
		color: #FFFFFF;
		background: url(../../../public/img/icons/JL_bg.svg) center center no-repeat;
	}
</style>