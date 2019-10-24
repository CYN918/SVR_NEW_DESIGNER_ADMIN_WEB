<template>
	<div class="ques_03">
		<textarea v-model="value" placeholder="终止项目将会永久降低你的信用分，并影响之后项目中标率，确定要终止项目？"></textarea>
		<div class="maxd_ss">{{value.length}}/140</div>
	</div>
</template>
<script>
export default {
	props:{
		
	},
	data(){
		return{
			value:''			
		}
	},
	watch:{
		value:function(v,oldv){		
			if(v.length>140){			
				this.value = v.substring(0,140);
			}
			this.$emit('input', this.value); 
		}
	},
}		
	
</script>

<style>
.ques_03{
	position: relative;
}
.ques_03>textarea{
	box-sizing: border-box;
	padding: 15px 20px;
	width:500px;
	height:150px;
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
}
.ques_03 .maxd_ss{
	position: absolute;
    bottom: 13px;
    left: 444px;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}
</style>
