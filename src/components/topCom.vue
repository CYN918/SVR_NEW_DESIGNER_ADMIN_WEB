<template>
	<div class="newTop">
		<span class="newTop_1">
			<img class="newTop_2" src="../assets/img/tabbar_icon_file_24_pressed.svg">
			<span v-for="(item,index) in names">{{item.meta.title}} <i class="newTopFg" v-if="index<names.length-1">/</i></span>			
		</span>
		<div></div>
		<span></span>
	</div>
</template>

<script>
export default{
	data(){
		return{
			names: [],
		}
	},
	methods:{
		getBreadcrumb() {
			this.names = this.$route.matched
		},
	},
	created() {
		this.getBreadcrumb()
	}
}
</script>

<style scoped="scoped">
.newTop{
	display: flex;
	padding: 0 20px;
	background: #fff;
	height: 60px;
	line-height: 60px;
	font-size: 14px;
	color: #606266;
}
.newTopFg{
	margin: 0 9px;
    font-weight: 700;
    color: #C0C4CC;
}
.newTop_1{
	display: inline-block;
	vertical-align: top;
}
.newTop_2{
	display: inline-block;
	vertical-align: top;	
	width: 12px;
	margin: 21px 6px 0 0;
}
</style>
