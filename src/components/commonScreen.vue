<template>
	<div class="wh screenContent" style="position: relative;z-index: 9999;">
		<div class="screenborder">
			<div class="screenTop paddinglr30">
				<span class="fleft">{{ currentpageName }}-筛选</span>
				<span class="fright fontsize24 screenclose pointer" @click="getparent()">x</span>
			</div>
			<div class="screenMidden paddinglr30">
				<ul class="screenMiddenul ofh w">
					<li v-for="(item,index) in texts" :key="item.id">
						<div>
							{{ item.name }}
						</div>
						<!-- form.selct[item.a] -->
						<el-input class="ipt" placeholder="请输入内容" v-model="form[item.id]" v-if="(!item.child) && (!item.type)"
						 clearable></el-input>
						<el-select v-model="form[item.id]" placeholder="请选择" multiple v-else-if="item.child && item.type == 'more'">
							<el-option value="" label="全部"></el-option>
							<el-option v-for="(childitem,index) in item.child" :key="index" :label="childitem" :value="childitem">
								<el-checkbox>{{ childitem }}</el-checkbox>
							</el-option>
						</el-select>
						<el-select v-model="form[item.id]" placeholder="请选择" v-else-if="item.child && !item.type">
							<el-option value="" label="全部"></el-option>
							 <el-radio-group v-model="form[item.id]">
								<el-option v-for="(childitem,index) in item.child" :value="childitem.id" :label="childitem.name">
									<el-radio :value="childitem.id" :label="childitem.id">{{ childitem.name }}</el-radio>
								</el-option>
							</el-radio-group>
						</el-select>
						 <el-date-picker
						  v-if="item.type == 'time'"
						   @change="timetwo(item.child)"
						  class="ipt"
						  v-model="times"
						  type="daterange"
						  value-format="yyyy-MM-dd HH-mm-ss"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期"
						  >
						</el-date-picker>
						</el-date-picker>
						<div v-if="item.type == 'two'">
							<el-input v-model="form[item.child[0].id]" class="ipt90" placeholder="请输入内容" clearable></el-input>
							<span style="padding: 0 14px;">至</span>
							<el-input v-model="form[item.child[1].id]" class="ipt90" placeholder="请输入内容" clearable></el-input>
						</div>
						<div v-if="item.type == 'text'">
							<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
						</div>
						<div v-if="item.type == 'display'" :style="{visibility: (item.type == 'display' ? 'hidden' : '')}">
							<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
						</div>
					</li>
					<!-- <li>
						<div>用户ID</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>用户名字</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>手机号</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>邮箱</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>性别</div>
						<el-select class="ipt" v-model="value" placeholder="请选择"  multiple>
							<el-option value="12">
								<el-checkbox>备选项1</el-checkbox>
							</el-option>
							<el-option value="13">
								<el-checkbox >备选项2</el-checkbox>
							</el-option>
					    </el-select>
					</li>
					<li>
						<div>职业</div>
						<el-select class="ipt" v-model="value" placeholder="请选择"  multiple>
							<el-input class="checkboxipt" placeholder="请输入内容" clearable></el-input>
							<div>
								<el-option class="sel-zhiye" value="12">
									<el-checkbox>备选项1</el-checkbox>
								</el-option>
								<el-option class="sel-zhiye" value="13">
									<el-checkbox >备选项2</el-checkbox>
								</el-option>
								<el-option class="sel-zhiye" value="12">
									<el-checkbox>备选项1</el-checkbox>
								</el-option>
								<el-option class="sel-zhiye" value="13">
									<el-checkbox >备选项2</el-checkbox>
								</el-option>
								<el-option class="sel-zhiye" value="12">
									<el-checkbox>备选项1</el-checkbox>
								</el-option>
								<el-option class="sel-zhiye" value="13">
									<el-checkbox >备选项2</el-checkbox>
								</el-option>
								<el-option class="sel-zhiye" value="12">
									<el-checkbox>备选项1</el-checkbox>
								</el-option>
								<el-option class="sel-zhiye" value="13">
									<el-checkbox >备选项2</el-checkbox>
								</el-option>
							</div>
						</el-select>
					</li>
					<li>
						<div>所在地</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>作品数量</div>
						<div>
							<el-input class="ipt90" placeholder="请输入内容" clearable></el-input>
							<span style="padding: 0 14px;">至</span>
							<el-input class="ipt90" placeholder="请输入内容" clearable></el-input>
						</div>
					</li>
					<li>
						<div>关注人数</div>
						<div>
							<el-input class="ipt90" placeholder="请输入内容" clearable></el-input>
							<span style="padding: 0 14px;">至</span>
							<el-input class="ipt90" placeholder="请输入内容" clearable></el-input>
						</div>
					</li>
					<li>
						<div>粉丝人数</div>
						<div>
							<el-input class="ipt90" placeholder="请输入内容" clearable></el-input>
							<span style="padding: 0 14px;">至</span>
							<el-input class="ipt90" placeholder="请输入内容" clearable></el-input>
						</div>
					</li>
					<li>
						<div>非认证-微信号</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>非认证-QQ号</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>授权认证-微信号</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>授权认证-QQ号</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>授权认证-微博</div>
						<el-input class="ipt" placeholder="请输入内容" clearable></el-input>
					</li>
					<li>
						<div>平台投稿人</div>
						<el-select class="ipt" v-model="value" placeholder="请选择"  multiple>
							<el-option value="12">
								<el-checkbox>备选项1</el-checkbox>
							</el-option>
							<el-option value="13">
								<el-checkbox >备选项2</el-checkbox>
							</el-option>
						</el-select>
					</li>
					<li>
						<div>供稿人认证账号主体</div>
						<el-select class="ipt" v-model="value" placeholder="请选择"  multiple>
							<el-option value="12">
								<el-checkbox>备选项1</el-checkbox>
							</el-option>
							<el-option value="13">
								<el-checkbox >备选项2</el-checkbox>
							</el-option>
						</el-select>
					</li>
					<li>
						<div>是否为平台推荐创作者</div>
						<el-select class="ipt" v-model="value" placeholder="请选择"  multiple>
							<el-option value="12">
								<el-checkbox>备选项1</el-checkbox>
							</el-option>
							<el-option value="13">
								<el-checkbox >备选项2</el-checkbox>
							</el-option>
						</el-select>
					</li>
					<li>
						<div>平台推荐等级</div>
						<el-select class="ipt" v-model="value" placeholder="请选择"  multiple>
							<el-option value="12">
								<el-checkbox>备选项1</el-checkbox>
							</el-option>
							<el-option value="13">
								<el-checkbox >备选项2</el-checkbox>
							</el-option>
						</el-select>
					</li>
					<li>
						<div>注册时间</div>
						<el-date-picker
						:value="1"
						  type="date"
						  placeholder="选择日期">
						</el-date-picker>
					</li>
					<li>
						<div>上次登录时间</div>
						 <el-date-picker
						 :value="1"
						  type="date"
						  placeholder="选择日期">
						</el-date-picker>
					</li> -->
					<!-- <li>
						<div>上次登录时间</div>
						 <el-date-picker
						   class="ipt"
						   v-model="times"
						   type="daterange"
						   value-format="yyyy-MM-dd HH-mm-ss"
						   start-placeholder="开始日期"
						   end-placeholder="结束日期"
						   default-value="2010-10-01">
						 </el-date-picker>
					</li> -->
					
				</ul>
			</div>
			<div class="screenBottom paddinglr30">
				<div class="screenBottombtn ofh">
					<button class="fleft defaultbtn" @click="reset">重置</button>
					<button class="fright defaultbtn defaultbtnactive" @click="getparent('reach')">查询</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import DataScreen from "@/assets/DataScreen.js"
	export default {
		props: ["pageName","tabnum"],
		data() {
			return {
				form: {},
				texts: '',
				options: [{
					  value: '选项1',
					  label: '黄金糕'
					}, {
					  value: '选项2',
					  label: '双皮奶'
					}, {
					  value: '选项3',
					  label: '蚵仔煎'
					}, {
					  value: '选项4',
					  label: '龙须面'
					}, {
					  value: '选项5',
					  label: '北京烤鸭'
				}],
				value: '',
				value2:[],
				currentpageName:"",
				times:[],
			}
		},
		methods: {
			getparent(data) {
				if (data == "reach") {
					//console.log()
					this.$router.push({
						path: this.$route.matched[this.$route.matched.length - 1].path,
						query: {
							urlDate: JSON.stringify(this.form)
						}
					});
					eventBus.$emit("sreenData", this.form);
				}
				this.$parent.screenmask("Off", "left1");
			},
			init() {
				//alert(typeof this.$route.query.urlDate != "string")
				if(this.$route.query.urlDate){
					this.form = JSON.parse(this.$route.query.urlDate);
				}
			},
			getScreen() {
				
				if(this.tabnum){
					if(this.tabnum == 1){
						this.texts = DataScreen.screen[this.pageName].filterFields0
					};
					if(this.tabnum == 2){
						this.texts = DataScreen.screen[this.pageName].filterFields1
					};
					if(!DataScreen.screen[this.pageName].filterFields1 && !DataScreen.screen[this.pageName].filterFields0){
						this.texts = DataScreen.screen[this.pageName].filterFields
						
					}
				} else {
					this.texts = DataScreen.screen[this.pageName].filterFields
				}
			},
			reset() {
				this.form = {};
			},
			timetwo(time){
				//console.log(time,thistimes)
				this.form[time[0].id] = this.times[0];
				this.form[time[1].id] = this.times[1];
				//console.log(this.form)
			}
		},
		watch: {
			"$route":function(){
				this.form = JSON.parse(this.$route.query.urlDate);
			}
		},
		mounted() {
			this.getScreen();
			this.init();
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			console.log(this.$route.matched);
		},
		
		
	}
</script>

<style>
	.screenborder {
		width: 772px;
		background: #FFFFFF;
		border-radius: 5px;
	}

	.screenMiddenul {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		flex-flow: row wrap;
	}

	.screenMiddenul li {
		margin-top: 27px;
	}

	.el-select-dropdown .checkboxipt {
		width: 200px;
		height: 32px;
		margin: 7px auto 14px;
		display: block;
	}

	.checkboxipt input {
		display: block;
		height: 32px;
		margin: 0 auto;
	}

	.el-select-dropdown__item .el-checkbox {
		width: 100%;
	}
	
	.sel-text .screentext{
		width: 200px;
		height: 32px;
		line-height: 32px;
		display: block;
	}
	
	.screentext .el-input__inner {
		height: 32px;
		line-height: 32px;
	}
	
	.screentextbg{
		padding:5px 12px;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
		border-radius: 4px;
		position: relative;
		z-index: 9999;
	}
</style>
