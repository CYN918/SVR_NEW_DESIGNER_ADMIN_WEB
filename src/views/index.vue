<template>
	<div class="contBoxx">
		<div class="com-left">
			<comSidebar></comSidebar>
		</div>
		<div class="com-right">
			<!-- <comTop></comTop> -->
			<!-- <comTop2 @clickFn="clickFn" v-model="top2Confg"></comTop2> -->
			<div class="com-cont">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import comSidebar from '@/components/Sidebar.vue'	
import comTop from './top.vue'
import comTop2 from './top2.vue'
import toolsEmail from './contentManager/tools/email.vue'

export default{
	data(){
		return {

		}
	},
	components: {comSidebar,comTop,comTop2,toolsEmail},
	methods:{
		clickFn(n){
			
			console.log(n)
		}
	},

}
</script>

<style>
.contBoxx{
	width: 100%;
	height: 100%;
	display: flex;
}
.com-left{
	width: 60px;
}
.com-right{
	display: flex;
    flex-direction: column;
	flex: 1;
	padding: 0 20px;
	background: #f0f2f5;
	
}
.com-cont{
	display: flex;
	flex: 1;
}
.cont-box{
	display: flex;
	flex-direction: column;
	flex: 1;
}
</style>
