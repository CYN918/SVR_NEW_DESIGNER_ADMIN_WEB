<template>
	<div>
		<div v-for ="(item,index) in info" class="ofh">
			<div v-if="false" class="fleft" style="line-height: 40px;padding-left: 40px;">说明模块-{{ index+1 }}</div>
			<ul style="padding-top: 0px;margin-top: 0px;">
				<li   class="margint13 ofh">
					<span v-if="false" class="fleft detailKey" style="line-height: 40px;">模块标题</span>
					<span class="w" style="height:40px;line-height: 40px;text-align: center;display: block;font-size: 22px;color: #909296;border-bottom: 1px solid rgb(242, 242, 245);margin-top: 20px;">{{ item.module_title }}</span>
				</li>
				<li class="margint13 ofh">
					<span  v-if="false" class="fleft detailKey" style="line-height: 40px;">详细说明</span>
					<span style="width:357px;height:40px;line-height: 40px;" v-html="item.module_content"></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	props:{
		value:Object,
	},
	data(){
		return{
			info:[],
		}
	},
	methods:{
		getworkdetial(){
			this.api.projectdetail({
				project_id:this.$route.query.id,
				access_token:localStorage.getItem("access_token")
			}).then(da => {
				this.info = JSON.parse(da.desc);
				console.log(this.info);
			})
		},
		
	},
	mounted(){
	    this.getworkdetial();
	},
	
}	
</script>

<style>
</style>
