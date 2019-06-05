<template>
	<div class="wh Detail">
		<div class="detailtitle">查看素材信息-{{ name }}</div>
		<div class="detailContent ofh">
			<ul v-if="tabsnum == 0">
				<li class="margint13 ofh">
					<span class="fleft detailKey">附件ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.fid) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件的名称</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件格式</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_type) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件大小</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_size_format) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">附件可见设置</span>
					<span class="fleft detailValue">{{ 11 }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey ">作品ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.work_id) }}</span>
				</li>
				
				<li class="margint13 ofh">
					<span class="fleft detailKey">作品名称</span>
					<span class="fleft detailValue">{{ getValue(detailData.work_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">作品类型</span>
					<span class="fleft detailValue">{{ detailData.classify_1+"/"+detailData.classify_2+"/"+detailData.classify_3 }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.open_id) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户昵称</span>
					<span class="fleft detailValue">{{ getValue(detailData.username) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">创作者职业</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否为平台推荐作品</span>
					<span class="fleft detailValue">{{ getValue(detailData.is_recommend) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否为平台投稿作品</span>
					<span class="fleft detailValue">{{ getValue(detailData.is_platform_work) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否已被录用</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">作品预览链接</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ 0 }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">创建时间</span>
					<span class="fleft detailValue">{{ getValue(detailData.updated_at) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">当前状态</span>
					<span class="fleft detailValue">{{ getValue(detailData.status)  }}</span>
				</li>
			</ul>
			
			<ul  v-if="tabsnum == 1">
				<li class="margint13 ofh">
					<span class="fleft detailKey">图片ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.fid) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件的名称</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件格式</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_type) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件大小</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_size_format) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">图片尺寸</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_size_format) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey ">用户ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.open_id) }}</span>
				</li>
				
				<li class="margint13 ofh">
					<span class="fleft detailKey">作品名称</span>
					<span class="fleft detailValue">{{ getValue(detailData.work_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">上传时间</span>
					<span class="fleft detailValue">{{ getValue(detailData.bank_card_no) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">当前状态</span>
					<span class="fleft detailValue">{{ getValue(detailData.status) }}</span>
				</li>
			</ul>
			
			<ul  v-if="tabsnum == 2">
				<li class="margint13 ofh">
					<span class="fleft detailKey">视频ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.fid) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件的名称</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件格式</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_type) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件大小</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_size_format) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">视频时长</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_size_format) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey ">用户ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.open_id) }}</span>
				</li>
				
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户昵称</span>
					<span class="fleft detailValue">{{ getValue(detailData.username) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">上传时间</span>
					<span class="fleft detailValue">{{ getValue(detailData.bank_card_no) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">当前状态</span>
					<span class="fleft detailValue">{{ getValue(detailData.status) }}</span>
				</li>
			</ul>
			
			<ul  v-if="tabsnum == 3">
				<li class="margint13 ofh">
					<span class="fleft detailKey">音频ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.fid) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件的名称</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件格式</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_type) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">文件大小</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_size) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">音频时长</span>
					<span class="fleft detailValue">{{ getValue(detailData.file_size_format) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey ">用户ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.open_id) }}</span>
				</li>
				
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户昵称</span>
					<span class="fleft detailValue">{{ getValue(detailData.username) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">上传时间</span>
					<span class="fleft detailValue">{{ getValue(detailData.bank_card_no) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">当前状态</span>
					<span class="fleft detailValue">{{ getValue(detailData.status) }}</span>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn"  @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive"  @click="false">下载</button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				detailData:'',
				name:this.$route.query.name,
				tabsnum:this.$route.query.tabsnum
			}
		},
		methods:{
			getparent(){
				this.$router.go(-1);
			},
			getValue(val){
				if(val) {
					return val
				} else{
					return "--"
				}
			},
			getdata(){
				const fid = this.$route.query.fid;
				this.api.materialDetail({
					fid: fid,
					access_token:localStorage.getItem("access_token")
				}).then(da => {
					this.detailData = da;
					console.log(da)
				}).catch(() => {})
			}
		},
		created() {
			this.getdata();
		}
	}
</script>

<style>
	.Detail{
		background: white;
	}
	.detailtitle{
		padding-left: 40px;
		padding-top: 18px;
	}
	
	.detailContent{
		height: calc(100% - 139px);
		overflow-y: auto;
	}
	
	.detailContent ul{
		padding-left: 132px;
		padding-top: 64px;
	}
	
	.margint13{
		margin-bottom: 13px;
	}
	
	.detailKey{
		width: 160px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
	}
	
	.detailValueImg{
		width: 68px;
		height: 68px;
		border-radius: 50%;
	}
	
	.detailKeyImg{
		line-height: 68px;
	}
	
	.routerLink{
		color: #FF5121;
	}
	
	.detailbtn{
		height: 100px;
	}
	
	.squareImg{
		width: 160px;
		height: 102px;
		background: red;
	}
</style>
