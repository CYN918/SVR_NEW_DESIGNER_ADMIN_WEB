<template>
	<div class="newContBox">
		<topCom></topCom>
		<topCom2></topCom2>
		<tableCom></tableCom>
	</div>
	
</template>

<script>
import topCom from '@/components/topCom.vue'
import topCom2 from '@/components/topCom2.vue'
import tableCom from '@/components/tableCom.vue'
export default{
	props:{config:Object},
	components: {
		topCom,
		topCom2,
		tableCom
	},
	
}
</script>

<style>
.newContBox{
	display: flex;
	flex-direction:column;
}
</style>
