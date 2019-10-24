<template>
	<div class="cen_tiop_01" v-html="tipCent">
	
	</div>
</template>

<script>
export default {
	props:{
		tipCent:String
	}
}	
</script>

<style>
.cen_tiop_01{
	z-index: 10;
	position: fixed;
	max-width:232px;
	transform: translate(-50%,15px);
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	padding: 15px 16px;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
	text-align: left;
}
.cen_tiop_01:after{
    content: "";
    position: absolute;
    left: 50%;
    top: -3px;
    width: 15px;
    height: 15px;
    background: #fff;
    -webkit-transform: rotate(45deg) translateX(-50%);
    transform: rotate(45deg) translateX(-50%);
    border: 1px solid rgba(152, 144, 144, 0.1);
    border-right: 0;
    border-bottom: 0;
}
</style>
