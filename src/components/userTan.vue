<template>
	<div class="userTan">
		<div @mouseover="setType2($event)" @mouseout="setT2(false)">{{value.username}}</div>
		<div :style="dwpsDat" @mouseover="setT2(true)" @mouseout="setT2(false)" class="user_n_01">
			<div>
				<img class="user_n_02" :src="value.avatar">
				<div class="user_n_03">
					<div class="user_n_04">{{value.username}}</div>
					<div class="user_n_05">{{value.vocation}}|{{value.city}}</div>
				</div>
			</div>
			<div class="user_n_06">
				<span>粉丝<i></i>{{value.fans_num}}</span>
				<span>人气<i></i>{{value.popular_num}}</span>
				<span>作品<i></i>{{value.work_num}}</span>
				<span>接单<i></i>{{value.project_hire_num}}</span>
				<span>收益<i></i>{{value.project_income}}</span>
				<span>评级<i></i>{{value.recommend_level}}</span>
			</div>
			<div class="user_n_07">
				工作现状<span class="user_n_08">{{value.situation}}</span>
			</div>
			<div class="user_n_07">
				类型偏好<span class="user_n_08">{{value.preference_classify}}</span>
			</div>
			<div class="user_n_07">
				每周时间<span class="user_n_08">{{value.work_experience}}</span>
			</div>
			<div class="user_n_07">
				擅长风格
				<div class="user_n_09">
					<span v-for="el in arrchange(value.style)">{{el}}</span>
				</div>
			</div>
			<div class="user_n_07">
				擅长领域
				<div class="user_n_09">
					<span v-for="el in arrchange(value.field)">{{el}}</span>
				</div>
			</div>
			<div class="user_n_07 user_n_10">
				<span @click="userdetail(value.open_id)">用户详情</span>
				<span @click="gotoweb(value.open_id)">个人主页</span>
			</div>
		</div>
	</div>
	
</template>

<script>
export default{
	props:{value:Object},
	data(){
		return {
			dwpsDat:'',
			ismv2:false,
		}
	},
	methods:{
		userdetail(open_id){
			const {href} = this.$router.resolve({ 
				path: '/userManager/userBaseInfo/userBaseInfoDetail',
				query:{
					open_id:open_id,
					hide:"hide"
			    }
			})
			window.open(href, '_blank');
		},
		gotoweb(id){
			window.open(localStorage.getItem("URL")+"/#/works?id=" + id);
		},
		arrchange(item){
			return item?item.split(","):[];
		},
		setT2(t){
			this.ismv2 = t;	
			if(!t){
				this.setType();
			}
		},
		setType2(e){
			let bj = e.target.getBoundingClientRect();
			this.dwpsDat = 'display: block;top: '+bj.y+'px;left: '+(bj.x+bj.width-20)+'px;';			
		},
		setType(){
			setTimeout(()=>{
				if(this.ismv2){
					return
				}
				this.dwpsDat = '';
			},50)			
		},
	}
}
</script>

<style>
.userTan{
	display: inline-block;
	position: relative;
}
.userTan:hover>.user_n_01{
	display: block;
}
.user_n_01{
	display: none;
	z-index: 10;
	position: absolute;
	top: 0;
	left: 0;
	padding: 20px;
	width: 301px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(204, 204, 204, 1);
    border-radius: 0px;
    -moz-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
    -webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
}
.user_n_02{
	display: inline-block;
	vertical-align: top;
	width: 50px;
	margin-right: 10px;
}
.user_n_03{
	display: inline-block;
	vertical-align: top;
}
.user_n_04{
	line-height: 28px;
}
.user_n_06{
	margin: 10px auto;
}
.user_n_06>span{
	display: inline-block;
	vertical-align: top;
	width: 33.33%;
	margin-bottom: 10px;
}
.user_n_06>span>i{
	margin-right: 10px;
}
.user_n_07{
	margin-bottom: 10px;
}
.user_n_08{
	margin-left: 20px;
}
.user_n_09{
	display: inline-block;
    vertical-align: top;
    margin-left: 20px;
	width: 179px;
}
.user_n_09>span{
	display: inline-block;
	vertical-align: top;
	padding: 0 7px;
	border-radius: 5px;
	height: 24px;
	background: #000;
	text-align: center;
	line-height: 24px;
	font-size: 12px;
	line-height: 24px;
	margin-right: 5px;
	color: #fff;
	margin-bottom: 5px;
}
.user_n_10{
	text-align: center;
}
.user_n_10>span{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #33b3ff;
    color: #fff;
    border-radius: 5px;
    margin: 0 10px;
	cursor: pointer;
}
</style>
