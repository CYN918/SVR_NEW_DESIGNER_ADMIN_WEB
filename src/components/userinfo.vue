<template>
	<div class="wh Detail">
		<div class="detailtitle">查看页面</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;">用户ID</span>
					<span>{{ userinfo.user_id }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;">用户名</span>
					<span>{{ userinfo.name }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;">邮箱</span>
					<span>{{ userinfo.email }}</span>
				</li>
				<!-- <li class="margint13 ofh">
					<span class="fleft" style="margin-right: 20px;">权限角色</span>
					<span>{{ roleintroduce }}</span>
				</li> -->
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['detailData','roles'],
		data() {
			return {
				userinfo:JSON.parse(this.$route.query.info),
				
			}
		},
		methods: {
			getparent() {
				this.$router.go(-1);
			},
			
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.Detail {
		background: white;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent {
		height: calc(100% - 139px);
		overflow-y: auto;
	}

	.detailContent ul {
		padding-left: 132px;
		padding-top: 64px;
	}

	.margint13 {
		margin-bottom: 13px;
	}

	.detailKey {
		width: 160px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
	}

	.detailValueImg {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		background: red;
	}

	.detailKeyImg {
		line-height: 68px;
	}

	.routerLink {
		color: #FF5121;
	}

	.detailbtn {
		height: 100px;
	}

	.squareImg {
		width: 160px;
		height: 102px;
		background: red;
	}

	.roles-input {
		height: 40px;
		line-height: 40px;
	}

	.width500 {
		width: 500px;
	}

	.roles-input input {
		height: 100%;
		width: 400px;
	}

	.roletree {
		height: 460px;
		border: 1px solid #D9D9D9;
		display: inline-block;
		overflow-y: auto;
		border-radius: 5px;
	}
</style>
