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
	font: 14px/150% Arial,"微软雅黑";
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

#app .fontcolorg{
	color: #999999 !important;
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

#app .defaultbtn:hover{
	background: #ff5121;
	color: #ffffff;
	border-color: #ff5121;
}

.borderb{
	border-bottom: #f8f8f8 solid 3px;
}

#app .btntag {
	border-color: #E6E6E6;
	background: #E6E6E6;
	color: #666666;
	height: 40px;
	line-height: 40px;
	margin-right:14px;
}

#app .el-tag .el-icon-close {
	color: #000000;
}

#app .el-tag .el-icon-close:hover{
	color: white;
	background: #222222;
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
	width: 224px;
	height: 40px;
}

#app .el-input.is-active .el-input__inner, #app .el-input__inner:focus,#app .ipt:hover{
	border-color: #ff5121 !important;
}

#app .ipt90 {
	width: 90px;
}

#app .el-submenu [class^=el-icon-]{
	margin-right: 15px;
}

#app .el-menu-item.is-active {
   background-color: #ffede8 !important;
}

#app .el-submenu__title:hover,#app .el-menu-item:focus, #app .el-menu-item:hover{
	background-color: #ffede8 !important;
	color: #FF5121 !important;
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

.screenContent{
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
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
	height: calc(100% - 205px);
}

#app .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
	background-color: #FF5121;
    border-color: #FF5121;
}

@media screen and (max-width: 1400px) {
	.screenMidden{
		height: 220px;
	}
}
</style>
