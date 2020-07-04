<template>
	<div class="top2box">
		<span>
			<span @click="clickFn(el.fn)" v-for="el in value.LiftBtns">
				{{el.n}}
			</span>
		</span>
	</div>
</template>

<script>
export default{
	props:{value:Object},
	methods:{
		clickFn(n){
		console.log(n)
			this.$emit('clickFn',n);
		}
	}
}
</script>

<style>
.top2box{
	margin-bottom: 15px;
}
</style>
