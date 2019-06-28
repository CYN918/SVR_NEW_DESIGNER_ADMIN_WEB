<template>
	<div :class="['citysbos',opType]">
		<input class="citysbos1" v-model="msgF" type="text" placeholder="请选择">
		<div @click="check" class="citysbos2">
		</div>
		<div class="citysbos3">
			<div class="citysbos3_1">
				<label v-for="(v,k,index) in options" :class="[k==gjd?'onchek':'']" :key="index">
					<span></span>
					<input name="gj" @click="checkgj1(k)" v-model="gjd" :value="k" type="radio">
					{{k}}
				</label>
			</div>
			<div class="citysbos3_2">
				<div class="citysbos3_2_1 citysbos3_2_2c" v-if="options[gjd]">
					<span @click="checksj2(k)" v-for="(v,k,index) in options[gjd]" :class="[gsf==k?'onchek1':'']">{{k}}</span>
				</div>
				<div class="citysbos3_2_2 citysbos3_2_2c" v-if="options[gjd]">
					<span @click="checkcj3(k)" :title="k" v-for="(v,k,index) in options[gjd][gsf]" :class="[k==gss?'onchek1':'']">{{k}}</span>
				</div>
			</div>
		</div>
		<div @click="check" class="fiddf"></div>
	</div>
</template>

<script>
	import citys from "@/assets/cityData.js"
	export default {
		data() {
			return {
				opType: '',
				options: citys,
				gjd: '中国',
				gsf: '北京市',
				gss: '东城区',
				gjOn: 0,
				sjOn: 0,
				cjOn: 0,
				input: '',
			}
		},
		props: {
			valued: Array,
		},
		mounted: function() {
			this.input = this.valued;
			this.setData();

		},
		computed: {
			"msgF"() {
				if (!this.input[1]) {
					return
				}
				return this.input[1].substring(0, 2) + " " + this.input[2].substring(0, 2);
			}
		},
		watch: {
			'input'(val) {

				this.$emit('input', this.input);
			},
			'valued'() {

				this.input = this.valued;

			},
		},
		methods: {

			checkgj1(v) {
				this.gjd = v;
				this.setData();
			},
			checksj2(v) {
				this.gsf = v;
				this.setData();
			},
			checkcj3(v) {
				this.gss = v;
				this.check();
			},
			setData() {
				this.input = [this.gjd, this.gsf, this.gss];
			},
			check() {
				this.opType = this.opType == '' ? 'opType' : '';
				this.setData();
			},


		}
	}
</script>

<style>
	.citysbos {
		position: relative;
		width: 120px;
		height: 40px;
	}

	.citysbos2:visited {
		background: red;
	}

	.citysbos>input,
	.citysbos2 {
		border: none;
		width: 100%;
		height: 100%;
		text-indent: 15px;
		font-size: 14px;
		color: #666666;
	}

	.citysbos2 {
		position: absolute;
		top: 0;
		left: 0;
		border-bottom: 1px solid #ddd;
		cursor: pointer;
		z-index: 10;
	}

	.citysbos2:after {
		content: "";
		position: absolute;
		top: 20px;
		right: 8px;
		width: 8px;
		height: 8px;
		border: 1px solid #ddd;
		border-right: 0;
		border-bottom: 0;
		transform: rotate(-135deg);
		transition: transform .4s;
		transform-origin: 25% 25%;
	}

	.citysbos3 {
		display: none;
		position: absolute;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.10);
		border-radius: 5px;
		width: 292px;
		text-align: left;
		z-index: 10;
		transform: translateY(100%);
	}

	.citysbos3_1 {
		border-bottom: 1px solid #ddd;
	}

	.opType>.citysbos2:after {
		transform: rotate(45deg);
	}

	.opType .citysbos3 {
		display: block;
	}

	.citysbos3 .citysbos3_1 {
		padding: 10px 16px;
		white-space: nowrap;
	}

	.citysbos3_1>label {
		position: relative;
		cursor: pointer;
		display: inline-block;
		vertical-align: middle;

	}

	.citysbos3_1>label>span {
		position: relative;
		display: inline-block;
		vertical-align: initial;
		width: 12px;
		height: 12px;
		margin-left: 37px;
	}

	.citysbos3_1>label>span:after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid #C4C4C4;
		width: 10px;
		height: 10px;
		border-radius: 50%;

	}



	.citysbos3_1>label:hover {
		opacity: .7;
	}

	.citysbos3_1>label:first-child>span {
		margin-left: 0;
	}

	.citysbos3_1>label>input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	.citysbos3_1>.onchek>span:after {
		border: 2px solid #FF5121;
	}

	.citysbos3_2 {
		display: flex;
		height: 195px;
		overflow: hidden;
		padding-bottom: 10px;
	}

	.citysbos3_2_2c::-webkit-scrollbar {
		width: 6px;
		height: 1px;
	}

	.citysbos3_2_2c::-webkit-scrollbar-thumb {
		border-radius: 4px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}

	.citysbos3_2_2c::-webkit-scrollbar-track {
		background: #D8D8D8;
	}

	.citysbos3_2_1 {
		width: 88px;
		padding: 10px 0;
		overflow: hidden;
		overflow-y: auto;
		border-right: 1px solid #ddd;
	}

	.citysbos3_2_1>span {
		display: block;
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin-bottom: 6px;
	}

	.citysbos3_2_1>span:hover {
		background: #D8D8D8;
		cursor: pointer;
		opacity: .7;

	}

	.citysbos3_2_2 {
		flex: 1;
		overflow: hidden;
		overflow-y: auto;
		padding: 10px;

	}

	.citysbos3_2_2>span {
		display: inline-block;
		text-align: center;
		padding: 5.5px 8px;
		width: 44px;
		overflow: hidden;
		height: 20px;
		margin-left: 1px;
	}

	.citysbos3_2_2>span:hover {
		background: #D8D8D8;
		cursor: pointer;
		opacity: .7;
	}

	.onchek1 {
		background: #D8D8D8;
		opacity: .7;
	}

	.fiddf {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
	}

	.opType .fiddf {
		display: block;
	}
</style>
