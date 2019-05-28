
const screenData = {
	screen:{
		userBaseInfo:{
			filterFields:[
				{name:'用户id',id:'open_id'},
				{name:'性别',id:'sex',child:[{name:"男",id:"1"},{name:"女",id:"2"}]},
				{name:'是否平台供稿人',id:'is_contributor',child:[{name:"否",id:"0"},{name:"是",id:"1"}]},
				{name:'供稿人类型',id:'contributor_type',child:[{name:"个人 ",id:"1"},{name:"企业",id:"2"}]},
				{name:'是否平台推荐创作者',id:'is_recommended',child:[{name:"是 ",id:"1"},{name:"否",id:"0"}]},
				{name:'推荐等级',id:'recommend_level',child:[{name:"A ",id:"A"},{name:"B",id:"B"},{name:"C",id:"C"},{name:"S",id:"S"}]},
				{name:'作品数量', type:'two',child:[{name:'作品数量下限',id:'works_num_min'},{name:'作品数量上限',id:'works_num_max'}]},
				{name:'关注人数', type:'two',child:[{name:'关注人数下限',id:'follow_num_min'},{name:'关注人数上限',id:'follow_num_max'}]},
				{name:'注册时间（开始）',id:'register_time_start',type:"time"},
				{name:'注册时间（结束）',id:'register_time_end',type:"time"},
				{name:'用户名',id:'username'},
				{name:'用户手机号',id:'phone'},
				{name:'邮箱',id:'email'},
				{name:'职业',id:'vocation',type:"more",child:["平面设计师","插画师","三维设计师","网页设计师","UI设计师","动画师","产品设计师","室内设计师","摄影师","学生","设计爱好者","UX设计师","新媒体设计师","概念设计师","特效设计师","建筑师","服装设计师","手工艺人","艺人工作者","教育工作者"]},
				{name:'所在地',id:'address'},
				{name:'非认证微信',id:'weixin_visible'},
				{name:'认证微信',id:'weixin'},
				{name:'非认证QQ',id:'qq_visible'},
				{name:'认证qq',id:'qq'},
				{name:'认证微博',id:'weibo'}
			],
			
		},
		userCompanyInfo:{
			filterFields:[
				{name:"银行卡号",id:"bank_card_no"},
				{name:"开户银行",id:"bank_name"},
				{name:"开户支行",id:"branch_bank"},
				{name:"审核状态",id:"check_status"},
				{name:"邮箱",id:"email"},
				{name:"手机号",id:"phone"},
				{name:"用户昵称",id:"username"},
				{name:"用户ID",id:"open_id"},
				{name:"录用作品（上限）",id:"hire_num_max"},
				{name:"录用作品（下限）",id:"hire_num_min"},
				{name:"收益（上限）",id:"profit_max"},
				{name:"收益（下限）",id:"profit_min"},
				{name:"身份证姓名（个人）",id:"real_name"},
				{name:"身份证号码（个人）",id:"id_card"},
				{name:"账户名称（个人）",id:"account_name"},
				{name:"预留手机号（个人）",id:"reserve_phone"},
				{name:"企业/机构名称",id:"company_name"},
				{name:"统一信用代码（企业）",id:"code"},
				{name:"提供发票税率（企业）",id:"tax_rate_type"}
			]
		},
		userPersonalInfo:{
			filterFields:[
				{name:"银行卡号",id:"bank_card_no"},
				{name:"开户银行",id:"bank_name"},
				{name:"开户支行",id:"branch_bank"},
				{name:"审核状态",id:"check_status"},
				{name:"邮箱",id:"email"},
				{name:"手机号",id:"phone"},
				{name:"用户昵称",id:"username"},
				{name:"用户ID",id:"open_id"},
				{name:"录用作品（上限）",id:"hire_num_max"},
				{name:"录用作品（下限）",id:"hire_num_min"},
				{name:"收益（上限）",id:"profit_max"},
				{name:"收益（下限）",id:"profit_min"},
				{name:"身份证姓名（个人）",id:"real_name"},
				{name:"身份证号码（个人）",id:"id_card"},
				{name:"账户名称（个人）",id:"account_name"},
				{name:"预留手机号（个人）",id:"reserve_phone"},
				{name:"企业/机构名称",id:"company_name"},
				{name:"统一信用代码（企业）",id:"code"},
				{name:"提供发票税率（企业）",id:"tax_rate_type"}
			]
		},
		roleManager:{
			filterFields:[
				{name:"角色ID",id:"id"},
				{name:"角色名称",id:"role_name",child:[]},
				{name:"创建时间（开始）",id:"create_time_start"},
				{name:"创建时间（结束）",id:"create_time_end"}
			]
		},
		accountManager:{
			filterFields:[
				{name:"账号ID",id:"id"},
				{name:"角色ID",id:"role_id"},
				{name:"账户名",id:"name"},
				{name:"邮箱",id:"email"}
			]
		},
		publishWork:{
			filterFields:[
				{name:"审核ID",id:"id"},
				{name:"作品ID",id:"work_id"},
				{name:"作品标题",id:"work_name"},
				{name:"提审用户ID",id:"open_id"},
				{name:"提审用户昵称",id:"username"},
				{name:"提审时间（开始）",id:"create_time_start"},
				{name:"提审时间（结束）",id:"create_time_end"},
				{name:"审核状态",id:"check_status",child:[{name:"待审核",id:"0"},{name:"审核通过",id:"1"},{name:"审核驳回",id:"-1"},{name:"失效或撤回",id:"-2"}]},
				{name:"审核人",id:"reviewer"},
				{name:"审核时间（开始）",id:"review_time_start"},
				{name:"审核时间（结束）",id:"review_time_end"},
			]
		},
		finalistsWork:{
			filterFields:[
				{name:"审核ID",id:"id"},
				{name:"作品ID",id:"work_id"},
				{name:"作品名称",id:"work_name"},
				{name:"活动ID",id:"activity_id"},
				{name:"活动名称",id:"activity_name"},
				{name:"提审用户ID",id:"open_id"},
				{name:"提审用户昵称",id:"username"},
				{name:"提审时间（开始）",id:"create_time_start"},
				{name:"提审时间（结束）",id:"create_time_end"},
				{name:"审核状态",id:"check_status",child:[{name:"待审核",id:"0"},{name:"审核通过",id:"1"},{name:"审核驳回",id:"-1"},{name:"失效或撤回",id:"-2"}]},
				{name:"审核人",id:"reviewer"},
				{name:"审核时间（开始）",id:"review_time_start"},
				{name:"审核时间（结束）",id:"review_time_end"},
			]
		},
		employWork:{
			filterFields:[
				{name:"审核ID",id:"id"},
				{name:"作品ID",id:"work_id"},
				{name:"作品名称",id:"work_name"},
				{name:"活动ID",id:"activity_id"},
				{name:"活动名称",id:"activity_name"},
				{name:"提审用户ID",id:"open_id"},
				{name:"提审用户昵称",id:"username"},
				{name:"提审时间（开始）",id:"create_time_start"},
				{name:"提审时间（结束）",id:"create_time_end"},
				{name:"审核状态",id:"check_status",child:[{name:"待审核",id:"0"},{name:"审核通过",id:"1"},{name:"审核驳回",id:"-1"},{name:"失效或撤回",id:"-2"}]},
				{name:"审核人",id:"reviewer"},
				{name:"审核时间（开始）",id:"review_time_start"},
				{name:"审核时间（结束）",id:"review_time_end"},
			]
		},
		applyPerson:{
			filterFields:[
				{name:"审核ID",id:"id"},
				{name:"账号主体",id:"contributor_type"},
				{name:"提审用户ID",id:"open_id"},
				{name:"提审用户昵称",id:"username"},
				{name:"提审时间（开始）",id:"create_time_start"},
				{name:"提审时间（结束）",id:"create_time_end"},
				{name:"审核状态",id:"check_status",child:[{name:"待审核",id:"0"},{name:"审核通过",id:"1"},{name:"审核驳回",id:"-1"},{name:"失效或撤回",id:"-2"}]},
				{name:"审核人",id:"reviewer"},
				{name:"审核时间（开始）",id:"review_time_start"},
				{name:"审核时间（结束）",id:"review_time_end"},
			]
		},
		workInfo:{
			filterFields:[
				{name:"作品ID",id:"work_id"},
				{name:"作品标题",id:"work_name"},
				{name:"用户ID",id:"open_id"},
				{name:"用户昵称",id:"username"},
				{name:"作品类型",id:"classify_1",type:"cascader"},
				{name:"版权说明",id:"copyright",child:[{name:" 禁止匿名转载；禁止商业使用；禁止个人使用",id:" 禁止匿名转载；禁止商业使用；禁止个人使用"},{name:"禁止匿名转载；禁止商业使用",id:"禁止匿名转载；禁止商业使用"},{name:"不限制作品用途",id:"不限制作品用途"}]},
				{name:"作品标签",id:"labels"},
				{name:"是否为平台投稿作品",id:"is_platform_work",child:[{name:"否",id:"0"},{name:"是",id:"1"}]},
				{name:"是否已被录用",id:"is_hired",child:[{name:"否",id:"2"},{name:"是",id:"1"}]},
				{name:"录用方式",id:"hire_type",child:[{name:"买断式",id:"1"},{name:"分成式",id:"2"}]},
				{name:"录用活动ID",id:"activity_id"},
				{name:"录用订单ID",id:"hire_id"},
				{name:"录用订单名称",id:"hire_order_name"},
				/* {name:"投放状态",id:"ids",child:[{name:"无",id:"1"},{name:"未投放",id:"1"},{name:"上线中",id:"1"},{name:"已下线",id:"1"}]}, */
				{name:"创建时间（开始）",id:"create_time_start",type:"time"},
				{name:"创建时间（结束）",id:"create_time_end",type:"time"},
				{name:"最近更新时间（开始）",id:"update_time_start"},
				{name:"最近更新时间（结束）",id:"update_time_end"},
				/* {name:"作品预览链接",id:"ids"}, */
				{name:"当前状态",id:"status",child:[{name:"草稿",id:"-1"},{name:"待审核",id:"0"},{name:"审核驳回",id:"-2"},{name:" 审核通过",id:"2"},{name:"下架",id:"-3"},{name:" 用户删除",id:"-4"}]},
			]
		},
		worksShelves:{
			filterFields:[
				{name:"举报单ID",id:"report_id"},
				{name:"举报者ID",id:"open_id"},
				{name:"举报者昵称",id:"username"},
				{name:"举报类型",id:"classify_id",child:[{name:"垃圾广告信息",id:"1"},{name:"涉黄涉暴等违法信息",id:"2"},{name:"侮辱、恶意及辱骂等行为",id:"3"},{name:"作品侵犯原作者权益",id:"4"},{name:"其他",id:"5"}]},
				{name:"举报对象ID",id:"accused_open_id"},
				{name:"举报对象昵称",id:"accused_username"},
				{name:"举报位置",id:"position"},
				{name:"详细说明",id:"hire_order_name"},
				{name:"举报时间（开始）",id:"create_time_start"},
				{name:"举报时间（结束）",id:"create_time_end"},
				
			]
		},
		commentManager:{
			filterFields:[
				{name:"评论ID",id:"comment_id"},
				{name:"评论人ID",id:"open_id"},
				{name:"评论人昵称",id:"username"},
				{name:"作品ID",id:"work_id"},
				{name:"作品名称",id:"work_name"},
				{name:"评论类型",id:"type",child:[{name:"评论",id:"1"},{name:"回复",id:"2"}]},
				{name:"评论内容",id:"content"},
				{name:"评论回复对象（用户ID）",id:"to_open_id"},
				{name:"创建时间（开始）",id:"create_time_start"},
				{name:"创建时间（结束）",id:"create_time_end"}
			]
		},
		activityClass:{
			filterFields:[
				{name:"主题分类ID",id:"id"},
				{name:"主题分类名称",id:"category_name"},
				{name:"使用状态",id:"status",child:[{name:"启用",id:"1"},{name:"停用",id:"2"}]},
			]
		},
		activityEmploy:{
			filterFields:[
				{name:"活动ID",id:"activity_id"},
				{name:"活动名称",id:"activity_name"},
				{name:"活动类型",id:"type"},
				{name:"主题分类",id:"category_id"},
				{name:"活动时间",id:"id",type:"time"},
				{name:"当前状态",id:"status",child:[{name:"未开始",id:"0"},{name:"进行中",id:"1"},{name:"已结束",id:"-1"},{name:"已删除",id:"-2"}]},
				{name:"作品上传和展示",id:"setting_type",child:[{name:"不支持上传",id:"1"},{name:"支持上传，不支持展示作品",id:"2"},{name:"支持上传，仅展示入围作品",id:"3"},{name:"支持上传，并展示入围和录用作品",id:"4"}]},
				{name:"入围作品数量",id:"id",type:"two",child:[{id:"shortlisted_num_min"},{id:"shortlisted_num_max"}]},
				{name:"录用作品数量",id:"id",type:"two",child:[{id:"hire_num_min"},{id:"hire_num_max"}]},
			]
		},
		labels:{
			filterFields:[
				{name:"标签词",id:"label"},
				{name:"被搜索次数",id:"count"}
			]
		},
		activityworks:{
			filterFields:[
				{name:"用户ID",id:"open_id"},
				{name:"用户名称",id:"username"},
				{name:"作品ID",id:"work_id"},
				{name:"作品名称",id:"work_name"},
				{name:"活动ID",id:"activity_id"},
				{name:"活动名称",id:"activity_name"},
				{name:"当前状态",id:"status",child:[{name:"入围未录用",id:"-2"},{name:"未入围",id:"-1"},{name:"参与活动",id:"0"},{name:"已入围",id:"1"},{name:"已录用",id:"2"}]},
				{name:"入围时间（开始）",id:"shortlisted_time_start",type:"time"},
				{name:"入围时间（结束）",id:"shortlisted_time_end",type:"time"},
				{name:"录用时间（开始）",id:"hire_time_start",type:"time"},
				{name:"录用时间（结束）",id:"hire_time_end",type:"time"},
			]
		},
		solicitationTemplate:{
			filterFields0:[
				{name:"模板文件ID",id:"work_id"},
				{name:"文件名称",id:"work_name"},
				{name:"文件格式",id:"activity_id",child:[{name:"小于100M",id:"小于100M"}]},
				{name:"文件大小",id:"activity_name"},
				{name:"在用活动数",id:"open_id"},
				{name:"上传人",id:"username"},
				{name:"更新时间",id:"shortlisted_time_start",type:"time"},
				{name:"上传时间",id:"shortlisted_time_end",type:"time"},
			],
			filterFields2:[
				{name:"模板文件ID",id:"work_id"},
				{name:"文件名称",id:"work_name"},
				{name:"文件格式",id:"activity_id"},
				{name:"文件大小",id:"activity_name"},
				{name:"在用活动数",id:"open_id"},
				{name:"上传人",id:"username"},
				{name:"更新时间",id:"shortlisted_time_start",type:"time"},
				{name:"上传时间",id:"shortlisted_time_end",type:"time"},
			]
		},
		homeBanner:{
			filterFields0:[
				{name:"banner素材ID",id:"id"},
				{name:"banner素材名称",id:"banner_name"},
				{name:"创建时间（开始）",id:"create_time_start",type:"time"},
				{name:"创建时间（结束）",id:"create_time_end",type:"time"},
				{name:"当前状态",id:"status",child:[{name:"待使用",id:"1"},{name:" 未使用",id:"0"},{name:"线上展示中",id:"2"}]},
			],
			filterFields1:[
				{name:"banner展示方案ID",id:"id"},
				{name:"banner展示方案名称",id:"banner_program_name"},
				{name:"干预时间（开始）",id:"program_begin_time"},
				{name:"干预时间（结束）",id:"program_end_time"},
				{name:"当前状态",id:"status"},
				{name:"是否为默认展示方案",id:"is_default",child:[{name:"是",id:"1"},{name:" 否",id:"0"}]}
			]
		},
		hotWordSearch:{
			filterFields:[
				{name:"任务ID",id:"open_id"},
				{name:"词文案",id:"username"},
				{name:"干预位置",id:"work_id"},
				{name:"当前状态",id:"status",child:[{name:"入围未录用",id:"-2"},{name:"未入围",id:"-1"},{name:"参与活动",id:"0"},{name:"已入围",id:"1"},{name:"已录用",id:"2"}]},
				{name:"干预时间段（开始）",id:"shortlisted_time_start",type:"time"},
				{name:"干预时间段（结束）",id:"shortlisted_time_end",type:"time"},
			]
		},
		serviceCenter:{
			filterFields:[
				{name:"任务ID",id:"open_id"},
				{name:"词文案",id:"username"},
				{name:"干预位置",id:"work_id"},
				{name:"当前状态",id:"status",child:[{name:"入围未录用",id:"-2"},{name:"未入围",id:"-1"},{name:"参与活动",id:"0"},{name:"已入围",id:"1"},{name:"已录用",id:"2"}]},
				{name:"干预时间段（开始）",id:"shortlisted_time_start",type:"time"},
				{name:"干预时间段（结束）",id:"shortlisted_time_end",type:"time"},
			]
		},
		recommendedActivities:{
			filterFields:[
				{name:"任务ID",id:"open_id"},
				{name:"词文案",id:"username"},
				{name:"干预位置",id:"work_id"},
				{name:"当前状态",id:"status",child:[{name:"入围未录用",id:"-2"},{name:"未入围",id:"-1"},{name:"参与活动",id:"0"},{name:"已入围",id:"1"},{name:"已录用",id:"2"}]},
				{name:"干预时间段（开始）",id:"shortlisted_time_start",type:"time"},
				{name:"干预时间段（结束）",id:"shortlisted_time_end",type:"time"},
			]
		},
	},
	screenShow:{
		//用户基础信心展示字段筛选字段
		userBaseInfo:{
			bts:[
				{prop:'open_id',lable:'用户ID'},
				{prop:'avatar',lable:'用户头像',type:"img"},
				{prop:'username',lable:'用户昵称'},
				{prop:'sex',lable:'性别'},
				{prop:'vocation',lable:'职位'},
				{prop:'address',lable:'所在地'},
				{prop:'personal_sign',lable:'个性签名'},
				{prop:'works_num',lable:'作品数量'},
				{prop:'follow_num',lable:'关注人数'},
				{prop:'fans_num',lable:'粉丝人数'},
				{prop:'education_school',lable:'学校名称'},
				{prop:'weixin_visible',lable:'非认证-微信号',width:150},
				{prop:'qq_visible',lable:'非认证-QQ号',width:150},
				{prop:'home_page',lable:'主页链接'},
				{prop:'weixin',lable:'授权认证-微信',width:150},
				{prop:'qq',lable:'授权认证-QQ',width:150},
				{prop:'create_time',lable:'注册时间'},
				{prop:'contributor_type',lable:'平台供稿人-认证状态',width:200},
				{prop:'is_contributor',lable:'是否为平台推荐创作者',width:200},
				{prop:'recommend_level',lable:'平台推荐等级',width:150},
			],
			defaults:[
				'open_id','username','size','address','works_num','follow_num','fans_num','weixin_visible',
				'qq_visible','create_time','contributor_type','is_contributor','recommend_level'
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:true,
					child:[
						{
							name:"设为平台推荐创作者",
						},
						{
							name:"添加至黑名单",
						}	
					],
					page:'userBaseInfo'
				},
				links:{
					name:"查看",
					Ishow:true
				}
			}
		},
		userCompanyInfo:{
			defaults:[
				'open_id','code','company_name','business_license','opening_permit','tax_rate_type','account_name','bank_card_no',
				'bank_name','branch_bank','status','created_at','updated_at'
			],
			bts:[
				{prop:'open_id',lable:'用户ID'},
				{prop:'name',lable:'用户昵称'},
				{prop:'code',lable:'统一信用代码（企业）',width:200},
				{prop:'company_name',lable:'企业/机构名称',width:150},
				{prop:'business_license',lable:'营业执照',type:"img",width:200},
				{prop:'opening_permit',lable:'身份证正面照片',type:"img",width:200},
				{prop:'tax_rate_type',lable:'提供发票税率（企业）',width:200},
				{prop:'account_name',lable:'账户名称（个人）',width:200},
				{prop:'bank_card_no',lable:'银行卡号'},
				{prop:'bank_name',lable:'开户银行'},
				{prop:'branch_bank',lable:'开户支行'},
				{prop:'check_status',lable:'审核状态'},
				{prop:'created_at',lable:'注册时间'},
				{prop:'updated_at',lable:'最近更新时间',width:200},
				{prop:'reserve_phone',lable:'预留手机号（个人）',width:200},
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:false,
					page:'userCompanyInfo'
				},
				links:{
					name:"查看详情",
					Ishow:true
				},
				
			}
		},
		userPersonalInfo:{
			defaults:[
				'open_id','code','company_name','business_license','opening_permit','tax_rate_type','account_name','bank_card_no',
				'bank_name','branch_bank','status','created_at','updated_at'
			],
			bts:[
				{prop:'open_id',lable:'用户ID'},
				{prop:'name',lable:'用户昵称'},
				{prop:'code',lable:'统一信用代码（企业）'},
				{prop:'company_name',lable:'企业/机构名称'},
				{prop:'business_license',lable:'营业执照',type:"img"},
				{prop:'opening_permit',lable:'身份证正面照片',type:"img"},
				{prop:'tax_rate_type',lable:'提供发票税率（企业）'},
				{prop:'account_name',lable:'账户名称（个人）'},
				{prop:'bank_card_no',lable:'银行卡号'},
				{prop:'bank_name',lable:'开户银行'},
				{prop:'branch_bank',lable:'开户支行'},
				{prop:'check_status',lable:'审核状态'},
				{prop:'created_at',lable:'注册时间'},
				{prop:'updated_at',lable:'最近更新时间'},
				{prop:'reserve_phone',lable:'预留手机号（个人）'},
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:false,
					page:"userPersonalInfo"
				},
				links:{
					name:"查看详情",
					Ishow:true
				},
				
			}
		},
		roleManager:{
			bts:[
				{prop:'id',lable:'角色ID'},
				{prop:'name',lable:'角色名称'},
				{prop:'description',lable:'角色介绍'},
				{prop:'bind_user_num',lable:'绑定账号数'},
				{prop:'created_at',lable:'创建时间'},
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:true,
					child:[
						{
							name:"编辑"
						},
						{
							name:"删除"
						}
					],
					page:"roleManager"
				},
				links:{
					name:"查看",
					Ishow:true
				},
				page:'roleManager'
			}
		},
		accountManager:{
			bts:[
				{prop:'id',lable:'用户ID'},
				{prop:'role_id',lable:'角色ID'},
				{prop:'name',lable:'角色名称'},
				{prop:'sex',lable:'性别'},
				{prop:'email',lable:'邮箱'},
				{prop:'created_at',lable:'注册时间'},
				{prop:'updated_at',lable:'最近登录时间'},
			],
			action:{
				morebtns:{
					name:"设置角色",
					Ishow:true,
					page:"accountManager"
				},
				links:{
					name:"查看",
					Ishow:true
				}
			}
		},
		publishWork:{
			bts:[
				{prop:'id',lable:'审核ID'},
				{prop:'work_id',lable:'作品ID'},
				{prop:'work_name',lable:'作品标题',type:"url"},
				{prop:'open_id',lable:'提审用户ID',width:200},
				{prop:'username',lable:'提审用户昵称',width:200,type:"url"},
				{prop:'check_status',lable:'审核状态',type:"btn",child:{"0":"待审核","1":"审核通过","-1":"审核驳回","-2":"失效或撤回"},width:150},
				{prop:'check_admin_name',lable:'审核人'},
			],
			action:{
				morebtns:{
					name:"设置角色",
					Ishow:false,
					page:"publishWork"
				},
				links:{
					name:"详情",
					Ishow:true
				}
			},
		},
		finalistsWork:{
			bts:[
				{prop:'id',lable:'审核ID'},
				{prop:'work_id',lable:'作品ID'},
				{prop:'work_name',lable:'作品标题'},
				{prop:"activity_id",lable:"活动ID"},
				{prop:"activity_name",lable:"活动标题",type:"url"},
				{prop:'open_id',lable:'提审用户ID',width:200},
				{prop:'username',lable:'提审用户昵称',width:200,type:"url"},
				{prop:'check_status',lable:'审核状态',type:"btn",child:{"0":"待审核","1":"审核通过","-1":"审核驳回","-2":"失效或撤回"},width:150},
				{prop:'check_admin_name',lable:'审核人'},
			],
			action:{
				morebtns:{
					name:"设置角色",
					Ishow:false,
					page:"finalistsWork"
				},
				links:{
					name:"详情",
					Ishow:true
				}
			},
		},
		employWork:{
			bts:[
				{prop:'id',lable:'审核ID'},
				{prop:'work_id',lable:'作品ID'},
				{prop:'work_name',lable:'作品标题'},
				{prop:"activity_id",lable:"活动ID"},
				{prop:"activity_name",lable:"活动标题",type:"url"},
				{prop:'open_id',lable:'提审用户ID',width:200},
				{prop:'username',lable:'提审用户昵称',width:200,type:"url"},
				{prop:'check_status',lable:'审核状态',type:"btn",child:{"0":"待审核","1":"审核通过","-1":"审核驳回","-2":"失效或撤回"},width:150},
				{prop:'check_admin_name',lable:'审核人'},
			],
			action:{
				morebtns:{
					name:"设置角色",
					Ishow:false,
					page:"employWork"
				},
				links:{
					name:"详情",
					Ishow:true
				}
			},
		},
		applyPerson:{
			bts:[
				{prop:'id',lable:'审核ID'},
				{prop:'contributor_type',lable:'账号主体',type:"keyvalue",child:{"1":"个体","2":"企业"}},
				{prop:'check_type',lable:'提交类型',type:"keyvalue",child:{"1":"初次申请","2":"驳回复审申请","3":"修改信息申请"}},
				{prop:'open_id',lable:'提审用户ID',width:200},
				{prop:'username',lable:'提审用户昵称',width:200,type:"url"},
				{prop:'check_status',lable:'审核状态',type:"btn",child:{"0":"待审核","1":"审核通过","-1":"审核驳回","-2":"失效或撤回"},width:150},
				{prop:'check_admin_name',lable:'审核人'},
			],
			action:{
				morebtns:{
					name:"设置角色",
					Ishow:false,
					page:"applyPerson"
				},
				links:{
					name:"详情",
					Ishow:true
				}
			},
		},
		workInfo:{
			defaults:["work_id","work_name","face_pic","username","classify","is_platform_work","is_hired","hire_type","status"],
			bts:[
				{prop:'work_id',lable:'作品ID'},
				{prop:'work_name',lable:'作品标题',width:200},
				{prop:'face_pic',lable:'封面图',type:"img",width:150},
				{prop:'open_id',lable:'用户ID'},
				{prop:'username',lable:'用户昵称',type:"url"},
				{prop:'avatar',lable:'用户头像',type:"img",width:150},
				{prop:'classify',lable:'作品类型',width:200},
				{prop:'copyright',lable:'版权说明'},
				{prop:'labels',lable:'作品标签'},
				{prop:'is_platform_work',lable:'是否为平台投稿作品',width:200},
				{prop:'is_hired',lable:'是否已被录用',width:200},
				{prop:'hire_type',lable:'录用方式'},
				{prop:'activity_id',lable:'录用活动ID'},
				{prop:'ids',lable:'录用活动名称'},
				{prop:'hire_id',lable:'录用订单ID'},
				{prop:'hire_order_name',lable:'录用订单名称',width:200},
				{prop:'ids',lable:'作品预览链接',width:200},
				{prop:'status',lable:'当前状态'}
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:true,
					page:"workInfo",
					child:[
						{
							name:"预览"
						},
						{
							name:"下架"
						},
						{
							name:"录用"
						},
						{
							name:"修改平台推荐等级"
						},
						{
							name:"绑定补充合同"
						}
					],
				},
				links:{
					name:"查看",
					Ishow:true
				}
			},
		},
		worksShelves:{
			defaults:['ids'],
			bts:[
				{prop:'report_id',lable:'举报单ID'},
				{prop:'open_id',lable:'举报者ID',width:200},
				{prop:'classify_id',lable:'举报类型',child:[{name:"垃圾广告信息",id:"1"},{name:"涉黄涉暴等违法信息",id:"2"},{name:"侮辱、恶意及辱骂等行为",id:"3"},{name:"作品侵犯原作者权益",id:"4"},{name:"其他",id:"5"}],width:150},
				{prop:'ids',lable:'举报对象ID'},
				{prop:'ids',lable:'举报对象昵称',type:"url"},
				{prop:'ids',lable:'举报位置',type:"img",width:150},
				{prop:'ids',lable:'详细说明',width:200},
				{prop:'ids',lable:'提交时间'}
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:false,
					page:"workInfo",
					child:[
						{
							name:"预览"
						},
						{
							name:"下架"
						},
						{
							name:"录用"
						},
						{
							name:"修改平台推荐等级"
						},
						
					],
				},
				links:{
					name:"查看",
					Ishow:false
				},
			}
		},
		commentManager:{
			defaults:['comment_id','open_id','username','content','to_open_id','type','create_time'],
			bts:[
				{prop:'comment_id',lable:'评论回复ID'},
				{prop:'open_id',lable:'用户ID',width:200},
				{prop:'username',lable:'用户昵称',width:150},
				{prop:'avatar',lable:'用户头像',width:150},
				{prop:'work_id',lable:'作品ID'},
				{prop:'type',lable:'发言类型',type:"keyvalue",child:{"1":"评论","2":"回复"}},
				{prop:'content',lable:'发言内容',width:150},
				{prop:'to_open_id',lable:'评论/回复 对象（用户ID）',width:200},
				{prop:'create_time',lable:'发言时间'}
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:false,
					page:"commentManager",
					child:[
						{
							name:"预览"
						},
						{
							name:"下架"
						},
						{
							name:"录用"
						},
						{
							name:"修改平台推荐等级"
						},
						
					],
				},
				links:{
					name:"删除",
					Ishow:true
				},
			}
		},
		activityClass:{
			bts:[
				{prop:'id',lable:'主题分类ID',width:200},
				{prop:'category_name',lable:'主题分类名称',width:150},
				{prop:'processing_activity_num',lable:'进行中活动数'},
				{prop:'updated_at',lable:'更新时间'},
				{prop:'status',lable:'当前状态',type:"keyvalue",child:{"1":"启用","0":"停用"}}
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:false,
					page:"activityClass",
					child:[
						
						
					],
				},
				links:{
					name:"修改",
					Ishow:true
				},
			}
		},
		labels:{
			bts:[
				{prop:'label',lable:'标签词',width:150},
				{prop:'count',lable:'作品标注数'}
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:false,
					page:"labels",
					child:[	
						
						
					],
				},
				links:{
					name:"修改",
					Ishow:false
				},
			}
		},
		activityEmploy:{
			bts:[
				{prop:'id',lable:'活动ID'},
				{prop:'activity_name',lable:'活动名称'},
				{prop:'banner',lable:'banner',type:"img",width:150},
				{prop:'category_name',lable:'主题分类'},
				{prop:'time',type:"merge",lable:'活动时间',child:{id1:"start_time",id2:"end_time"},width:320},
				{prop:'status',lable:'当前状态',width:150,type:"status",child:{"0":"未开始","1":"进行中","-1":"已结束","-2":"已删除"}},
				{prop:'setting_type',lable:'作品上传和展示',type:"keyvalue",width:250,child:{"1":"不支持上传","2":"支持上传，不支持展示作品","3":"支持上传，仅展示入围作品","4":"支持上传，并展示入围和录用作品"}},
				{prop:'shortlisted_num',lable:'入围作品数量',width:250},
				{prop:'hire_num',lable:'录用作品数量',width:250},
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:true,
					page:"activityEmploy",
					filterField:["0","1"],
					child:[
						{
							name:"删除",
							filterField:["0"],
							id:"top0"
						},
						{
							name:"编辑",
							filterField:["0","1"],
							id:"top1"
						}
					],
				},
				links:{
					name:"预览",
					Ishow:true
				},
				pagefilterField:true,
			}
		},
		activityworks:{
			defaults:['work_id','work_name','activity_id','activity_name','open_id','username','status'],
			bts:[
				{lable:"作品ID",prop:"work_id"},
				{lable:"作品名称",prop:"work_name"},
				{lable:"活动ID",prop:"activity_id"},
				{lable:"活动名称",prop:"activity_name"},
				{lable:"用户ID",prop:"open_id"},
				{lable:"用户名称",prop:"username",},
				{lable:"用户头像",prop:"avatar",type:"img",width:150},
				{lable:"作品封面图",prop:"face_pic",type:"img",width:150},
				{lable:"活动banner",prop:"banner"},
				{lable:"入围时间",prop:"shortlisted_time"},
				{lable:"录用时间",prop:"hire_time"},
				{lable:"当前状态",prop:"status",type:"status",child:{"-2":"入围未录用","-1":"未入围","0":"参与活动","11":"已入围","2":"已录用","10":"已参加","1":"入围待审核"}},
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:false,
					page:"activityworks",
					child:[
						{
							name:"删除"
						},
						{
							name:"编辑"
						}
					],
				},
				links:{
					name:"预览",
					Ishow:true
				},
			}
		},
		solicitationTemplate:{
			bts1:[
				{lable:"模板文件ID",prop:"template_file_id"},
				{lable:"文件名称",prop:"file_name"},
				{lable:"网盘链接",prop:"activity_id"},
				{lable:"在用活动数",prop:"processing_activity_num"},
				{lable:"上传人",prop:"admin_name"},
				{lable:"入围时间",prop:"shortlisted_time"},
				{lable:"录用时间",prop:"hire_time"}
			],
			bts0:[
				{lable:"模板文件ID",prop:"template_file_id"},
				{lable:"文件名称",prop:"file_name"},
				{lable:"文件格式",prop:"file_type"},
				{lable:"文件大小",prop:"file_size_format"},
				{lable:"在线活动数",prop:"processing_activity_num"},
				{lable:"上传人",prop:"admin_name"},
				{lable:"更新时间",prop:"updated_at"},
				{lable:"上传时间",prop:"created_at"}
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:true,
					page:"solicitationTemplate",
					child:[
						{
							name:"修改文件名"
						},
						{
							name:"下载"
						},
						{
							name:"删除"
						}
					],
				},
				links:{
					name:"预览",
					Ishow:false
				},
			}
		},
		homeBanner:{
			bts:[
				{lable:"banner素材ID",prop:"id"},
				{lable:"banner素材名称",prop:"banner_name"},
				{lable:"banner图片",prop:"banner_pic",type:"img"},
				{lable:"跳转链接",prop:"jump_url",type:"url"},
				{lable:"创建时间",prop:"create_time"},
				{lable:"当前状态",prop:"status",type:"status",child:{"1":"待使用","0":" 未使用","2":"线上展示中"}}
			],
			action:{
				morebtns:{
					name:"删除",
					Ishow:true,
					page:"homeBanner",
				},
				links:{
					name:"修改",
					Ishow:true
				},
			}
		},
		hotWordSearch:{
			bts:[
				{lable:"任务ID",prop:"id"},
				{lable:"调文案",prop:"word"},
				{lable:"干预位置",prop:"position"},
				{prop:'time',type:"merge",lable:'干预时间',child:{id1:"start_time",id2:"end_time"},width:320},
				{lable:"当前状态",prop:"status",type:"status",child:{"1":"线上展示中","0":" 待用方案内","-1":"未使用","2":"已删除"}}
			],
			action:{
				morebtns:{
					name:"删除",
					Ishow:true,
					page:"hotWordSearch",
				},
				links:{
					name:"编辑",
					Ishow:true
				},
			}
		},
		serviceCenter:{
			bts:[
				{lable:"文档ID",prop:"id"},
				{lable:"文档备注",prop:"remark"},
				{lable:"文档类型",prop:"type",type:"keyvalue",child:{"1":"关于我们","2":"用户协议","3":"授权协议","4":"帮助中心"}},
				{lable:'更新时间',prop:"updated_at"},
				{lable:"当前状态",prop:"status",type:"status",child:{"1":"线上展示中","0":" 待使用","-1":"已过期","-2":"已删除"}}
			],
			action:{
				morebtns:{
					name:"更多",
					Ishow:true,
					page:"serviceCenter",
					child:[
						{
							name:"编辑"
						},
						{
							name:"删除"
						},
						{
							name:"设为线上展示"
						}
					]
				},
				links:{
					name:"预览",
					Ishow:true
				},
			}
		},
		recommendedActivities:{
			bts:[
				{lable:"任务ID",prop:"id"},
				{lable:"干预活动",prop:"activity_name"},
				{lable:"干预位置",prop:"position"},
				{prop:'time',type:"merge",lable:'干预时间',child:{id1:"start_time",id2:"end_time"},width:320},
				{lable:"当前状态",prop:"status",type:"status",child:{"1":"线上展示中","0":" 待用方案内","-1":"未使用","2":"已删除"}}
			],
			action:{
				morebtns:{
					name:"删除",
					Ishow:true,
					page:"recommendedActivities",
				},
				links:{
					name:"编辑",
					Ishow:true
				},
			}
		}
	}
}

export default screenData