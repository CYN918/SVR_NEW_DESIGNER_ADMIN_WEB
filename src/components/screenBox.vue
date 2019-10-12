<template>
	<div class="w ctcontent">
		<div class="screenTitle">{{topCg.title}}</div>
		<ul>
			<li v-for="(el,index) in topCg.btns" :key="index" @click="clickFn(el.clFn)" :class="el.cls">
				{{el.name}}
			</li>
		</ul>
		
	</div>
</template>
<script>
	export default {
		props: ["topCg"],
		data() {
			return {
			
			};
		},
		methods: {
			clickFn(){
				
			}
			
		},
		created() {
			
		},
		mounted() {
			
			
		},

	}
</script>

<style>
.ctcontent {
	background: white;
	margin-bottom: 20px;
}

	.paddingb10 {
		padding-bottom: 10px;
	}

	.padding10 {
		padding: 10px 0;
	}

	.cttitle {
		line-height: 60px;
		padding-bottom: 20px;
	}
	
	.tagbts {
		display: flex;
		align-items:center;
		height: 100%;
		overflow-x: auto;
	}
	
	.lefttit{
		position: absolute;
		height: 60px;
		line-height: 60px;
		left: 40px;
	}
	.badge .el-badge__content.is-fixed{
		top:13px
	}
	
	.marginl0{
		margin-left: 0;
	}
</style>
