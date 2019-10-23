<template>
  <div id="app" class="wh">
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
}

html,body{
	width: 100%;
	height: 100%;
}
body{
	font: 14px/150%  PingFangSC-Regular,Arial,"微软雅黑";
}

a{list-style-type: none}
a:link{text-decoration:none;}
a:visited{text-decoration:none;}
a:hover{text-decoration:none;}
a:active{text-decoration:none;}
@font-face {
  font-family: 'iconfont';
  src: url('/font/iconfont.eot');
  src: url('/font/iconfont.eot?#iefix') format('embedded-opentype'),
      url('/font/iconfont.woff2') format('woff2'),
      url('/font/iconfont.woff') format('woff'),
      url('/font/iconfont.ttf') format('truetype'),
      url('/font/iconfont.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input{
  border:0;
}
.wh{
  width: 100%;
  height: 100%;
}
.h{
  height: 100%;
}
.w{
  width: 100%;
}

.fleft{
  float: left;
}

.fright{
  float: right;
}

.hnav{
  height:60px;
  line-height:60px
}

.textcenter{
  text-align:center;
}

.fontsize24{
  font-size:24px;
}

.marginleft60{
	margin-left: 60px;
}

.marginright60{
	margin-right: 60px;
}

.el-dialog__wrapper {
	z-index: 2030 !important;
}

.el-dialog{
	z-index: 2031 !important;
}

#app .fontcolorg{
	color: #bbbbbb !important;
}

.mainContentMiddenBottom {
	font-size: 14px;
	color: #999999;
	padding: 25px 0 28px;
	text-align: center;
	background: #f0f2f5;
}

.dp{
	display: inline-block;
}

.fontsize18{
	font-size: 18px;
}

.margin40{
	margin:0 40px;
}

.ofh {
	overflow: hidden;
}

#app .btnorgle{
	width: 100px;
	height: 40px;
	background: #ff5121;
	border-color: #ff5121;
	color: white;
}

.el-button--text:focus, .el-button--text:hover{
	color:#ff5121;
}

#app .el-select-dropdown__item.hover,#app .el-select-dropdown__item:hover,#app .btnorgle:hover{
	transition: 0.2;
	background: #fb8b6c;
	border-color: #fb8b6c;
}

#app .defaultbtn {
	width: 100px;
	height: 40px;
	margin-left: 30px;
	border:1px solid #999999;
	background: transparent;
	border-radius: 5px;
	color: #333333;
}

#app .defaultbtnno {
	width: 100px;
	height: 40px;
	margin-left: 30px;
	border:1px solid #999999;
	background: transparent;
	border-radius: 5px;
	color: #333333;
}

#app .defaultbtnactive{
	background: #ff5121;
	color: #ffffff;
	border-color: #ff5121;
}

#app .defaultbtnactive:hover{
	background: #FF6940 !important;
	color: #ffffff !important;
	border-color: #FF6940 !important;
}

#app .defaultbtn:hover{
	background: rgba(255,81,33,0.05);
	color: #FF5121;
	border-color: #FF5121;
}

.borderb{
	border-bottom: #f8f8f8 solid 3px;
}

#app .tag{
	border-color: #E6E6E6;
	background: #E6E6E6;
	color: #666666;
	margin-right:14px;
}

.el-cascader-menus,.el-select-dropdown{
		z-index: 2050 !important;
}

#app .btntag{
	height: 40px;
	line-height: 40px;
}

#app .el-tag .el-icon-close {
	color: #000000;
}

#app .el-tag .el-icon-close:hover{
	color: white;
	background: #222222;
}

#app .el-textarea__inner:focus{
	border-color: #ff5121;
}

.marginlr30{
	margin: 0 30px;
}

.paddinglr30{
	padding: 0 30px;
}

.pointer{
	cursor: pointer;
}

#app .ipt {
	width: 217px;
	height: 40px;
}

#app .el-input.is-active .el-input__inner,#app .el-input.is-active .iconfont , #app .el-input__inner:focus,#app .ipt:hover{
	border-color: #DCDFE6 !important;
}

#app .ipt90 {
	width: 90px;
}

#app .el-submenu [class^=el-icon-]{
	margin-right: 15px;
}

#app .el-menu-item.is-active{
   background-color: #ffede8 !important;
}

#app .is-active i {
	color: #FF5121 !important; 
}

#app .el-submenu__title:hover,#app .el-menu-item:focus, #app .el-menu-item:hover{
	background-color: #ffede8 !important;
	color: #FF5121 !important;
}

#app .is_default .el-submenu__title,#app .is_default .el-menu-item, #app .is_default .el-menu-item{
	background-color: #ffede8 !important;
	color: #FF5121 !important;
}

/* .sel-footer .el-button:focus,.sel-footer .el-button:hover,.sel-footer .el-button:active{
	background: #FFF;
    border: 1px solid #DCDFE6;
    outline: 0;
} */

.hoverload{
	position: absolute;
	top:0;
	left: 0;
	width:40px;
	height: 40px;
	background: url(./assets/img/loading.png) center center no-repeat;
	background-size:50% 50%;
	background-color: rgba(0, 0, 0, 0.6);
	cursor: pointer;
}

.sel-footer .el-button:focus,.sel-footer .el-button:active{
	background: #FFF;
    border: 1px solid #DCDFE6;
    outline: 0;
}

.el-checkbox__input.is-checked+.el-checkbox__label{
	color: #ff5121 !important;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
	background-color: #ff5121 !important;
	border-color: #ff5121 !important;
}

.el-select .el-input.is-focus .el-input__inner{
	border-color: #ff5121 !important;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
	color: transparent !important;
}

.el-dialog__body{
	padding:27px 0 27px !important;
	border-top:1px solid #e6e6e6;
}

.screenContent{
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.prossage .el-progress__text{
	color: white !important;
}

.screenTop {
	height: 75px;
	line-height: 75px;
	border-bottom: 1px #E6E6E6 solid;
}

.screenMidden{
	overflow-y: auto;
}

.screenBottombtn{
	width: 230px;
	margin: 0 auto;
	margin-bottom: 30px;
	margin-top: 50px;
}

#app .screenBottombtn button{
	margin: 0;
}

.sel-tooltip{
	width: 170px;
	border: 1px solid #E6E6E6;
	position: absolute;	
	background: white;
	margin-top: 9px;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 2px 2px 2px 2px;
}
.sel-tooltip .comonbtn:hover{
	background: #ffede8;
	color: #FF5121;
}

.comonbtn{
	height: 40px;
	padding: 0 19px;
	line-height: 40px;
	cursor: pointer;
}

.relative{
	position: relative;
}

.paddinglr40{
	padding: 0 40px;
}

.calc205{
	height: calc(100% - 223px);
}

.detailContent1 {
	height: calc(100% - 194px) !important;
	overflow-y: auto;
}

.detailContent {
	height: calc(100% - 139px) !important;
	overflow-y: auto;
}

.detailContent ul {
	padding-left: 132px;
	padding-top: 64px;
}

.detailContent1 ul {
	padding-left: 132px;
	padding-top: 64px;
}

#app .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
	background-color: #FF5121;
    border-color: #FF5121;
}

.el-radio__input.is-checked+.el-radio__label{
	color: #FF5121 !important;
}

.el-radio__input.is-checked .el-radio__inner{
	background-color: #FF5121 !important;
	border-color: #FF5121 !important;
}

.defaultbtn0,.defaultbtn-2{
	display: block;
	width: calc(100% - 23px);
	height: 40px;
	border:1px solid #999999;
	border-radius: 4px;
	color: #333333;
	background: transparent;
}

.defaultbtn1{
	border-color: #67C239;
	color: #67C239;
}
.defaultbtn-1{
	border-color: #FF1A27;
	color: #FF1A27;
}

.el-radio__inner{
	border-radius: 2px !important;
}

.el-radio__inner::after{
	box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    transform-origin: center;
	border-radius:0;
	background-color:transparent;
}

.el-radio__input.is-checked .el-radio__inner::after{
	transform: rotate(45deg) scaleY(1);
}

.el-radio{
	width: 100%;
} 

.defaultbtnworkbg{
	border: 1px solid #E6E6E6;
	border-radius: 5px;
}
.defaultbtnwork{
	border: 0;	
	resize:none;
	border-radius: 5px;
}

.materiallist .el-checkbox__label {
	display: none;
}

.work .el-button--primary{
	background: #FF5121;
	border-color: #FF5121;
}

.el-button--mini, .el-button--small{
	font-size: 14px
}

.Detail {
		background: white;
	}

	.Dialogkey {
		margin: 0 33px 26px 66px;
		width: 84px;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent1 {
		height: calc(100% - 139px);
		overflow-y: auto;
	}

	.detailContent1>ul {
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
		width: 85% !important;
		color: #606266;
	}

	.roletree {
		height: 460px;
		border: 1px solid #D9D9D9;
		display: inline-block;
		overflow-y: auto;
		border-radius: 5px;
	}

	.account-ipt {
		padding: 10px;
		text-align: center;
		border: 1px solid #999999;
		border-radius: 5px;
	}

	.tabs {
		width: auto !important;
		height: 33px;
		display: inline-block;
		margin-right: 40px !important;
		cursor: pointer;
	}

	.tabactive {
		color: #FF5121;
		border-bottom: 2px solid #FF5121;
	}

	.img-top {
		width: 68px;
		height: 68px;
		border-radius: 50%;
	}
	
	.img-zheng {
		width: 160px;
		height: 100px;
	}

	.img-fengmian {
		width: 200px;
		height: 150px;
	}

	.img-banner {
		width: 341px;
		height: 110px;
	}

	.materiallist {
		display: flex;
		overflow: hidden;
		flex-wrap: wrap;
		justify-content: flex-start
	}

	.materiallist li {
		margin: 0 17px 17px 0;
	}

	.material {
		width: 239px;
		height: 135px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
		border-radius: 5px;
		background: #F9F9F9;
	}

	.material-fu {
		width: 60px;
		height: 68px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -34px;
		margin-left: -30px;
	}
	
	.textover{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}

	.material-bo {
		width: 32px;
		height: 32px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -16px;
		margin-left: -16px;
	}

	.material-checkbox {
		position: absolute;
		top: 6px;
		right: 10px;
	}

	.materialdownload {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.color66 {
		color: #666666;
		margin-top: 3px;
		overflow: hidden;
		font-size: 14px;
	}

	.el-message-box--center .el-message-box__title {
		justify-content: left;
	}

	.sel-alert {
		width: 406px;
	}

	.el-message-box__header,
	.el-dialog__header {
		padding: 27px 30px !important;

	}

	.el-dialog__title {
		font-size: 16px !important;
	}

	.el-dialog__body {
		padding: 27px 0 27px !important;
		border-top: 1px solid #e6e6e6;
	}

	.el-radio-group {
		display: block;
	}

	.el-dialog__headerbtn {
		position: "";
		float: right;
		font-size: 18px;
	}

	.sel-footer {
		display: block;
		text-align: center;
	}

	.el-radio {
		line-height: 28px;
	}

	.el-radio__input.is-checked .el-radio__inner,
	.el-button--primary {
		background: #FF5121;
		border-color: #FF5121;
	}

	.el-button--primary:focus,
	.el-button--primary:hover {
		background: #FF5121;
		border-color: #FF5121;
	}

	[class*=" el-icon-"],
	[class^=el-icon-] {
		line-height: 2;
	}

	.sel-radio-title {
		position: absolute;
		left: 30px;
	}

	.font12 {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #999999;
	}

	.el-message-box--center .el-message-box__content {
		padding: 20px 0 37px;
		border-top: 1px solid #E6E6E6;
	}

	.workbtn {
		width: 70px;
	}
	
	.employipt{
		height: 40px;
		line-height: 40px;
	}
	
	.employmonre {
		width: 300px;
		display: inline-block;
		margin: 0 20px;
	}
	
	.employmonre input {
		width: 200px;
		height: 100%;
		margin-left: 5px;
	}
	
    .block {
		height: 100px;
		line-height: 100px;
		text-align: center;
		background: white;
	}

	.tabtop {
		height: calc(100% - 100px);
		overflow: hidden;
	}	
	
	.el-pagination{
		padding-right: 41px;
	}
	
    #app .el-pagination .number,
	#app .el-pagination button {
		color: #999999;
		margin-left: 8px;
		width:32px;
		height:32px;
		line-height: 33px;
		background:rgba(255,255,255,1);
		border-radius:6px;
		border:1px solid rgba(217,217,217,1);
		margin-top: 33px;
		
	}

	#app .el-pagination .number:hover,
	#app .el-pagination button:hover {
		color: #ff5121;
		background: white;  
	}
	
	#app .el-pagination .el-pager li.active:hover{
		border-color: #ff5121;
		background: #ff5121;
		color: white
	}

	#app .el-pagination .number:active,
	#app .el-pagination button:active {
		border-color: #ff5121;
		color: white;
	}

	#app .el-pagination button,
	.el-pagination span:not([class*=suffix]) {
		line-height: 100px;
	}

	#app .el-input--mini .el-input__inner,
	#app .el-pagination__editor.el-input .el-input__inner {
		height:32px;
		background:rgba(255,255,255,1);
		border-radius:6px;
		border:1px solid rgba(217,217,217,1);
		margin-top: 33px;
	}

	#app .el-pager li.active {
		border-color: #FF5121;
		background-color: #FF5121;
		color: white;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #FF5121;
		padding-left: 20px;
	}

	.el-dropdown-menu__item:focus,
	.el-dropdown-menu__item:not(.is-disabled):hover {
		background: #ffede8;
		color: #FF5121;
	}

	.el-dropdown-menu__item {
		line-height: 40px;
	}

	.el-popper[x-placement^=bottom] {
		margin-top: 0;
	}

	.el-dropdown-menu {
		padding: 0;
	}

	.el-button--text {
		color: #FF5121;
	}

	#app .el-checkbox__inner:hover {
		border-color: #FF5121;
	}
	
	.maskimg{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 2005;
	}

	.el-checkbox__input.is-checked .el-checkbox__inner,
	.el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background-color: #FF5121;
		border-color: #FF5121;
	}
	
	.el-pager li.btn-quicknext, .el-pager li.btn-quickprev{
		line-height: 100px;
	}
	
.centerline{
		display: inline-block;
		width: 114px;
		height: 4px;
		border-top: 1px solid #999999;
		//background: #FF5121;
		margin: 0 12px;
		margin-top: -5px;
	}
	
	.employment {
		font-size: 16px;
		color:#999999;
	}
	
	.number {
		display: inline-block;
		width: 27px;
		height: 27px;
		line-height: 27px;
		border: 1px solid #999999; 
		border-radius: 50%;
		margin-right: 10px;
		text-align: center;
	}
	
	.width610{
		width: 610px;
	}
	
	.numberactive{
		background: #FF5121;
		color: white;
		border-color: #FF5121;
	}
	
	.fontactive{
		color: black;
	}
	
	.centerlineactive {
		border-color:#FF5121; 
	}
	
.masku {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2003;
}

.commonbg > div{
	margin-left:0; 
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
	width:5px;
	border-radius:5px;
	height:5px;
	border: 0;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
	border-radius:5px;
	background: white;
	border: 0;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
	border-radius:5px;
	background:#E6E6E6;
	border-color: transparent;
}

.edui-default .edui-editor-bottomContainer table{
	display: none;
}

input:disabled{
	background-color: #f5f7fa;
	border-color: #E4E7ED;
	color: #C0C4CC;
}

.el-table th>.cell{
	font-weight: 700;
}

@media screen and (max-width: 1500px) {
	.screenMidden{
		height: 220px;
	}
}
</style>
