/**
 * data.js  –  Portfolio project data
 *
 * Edit this file to add/remove/update projects.
 * No DOM logic here. This file only exports window.portfolioData.
 */

window.portfolioData = [
  {
    id: 'smartrecruit',
    name: 'SmartRecruit 简历推荐',
    tags: ['RAG', 'LangGraph', 'Python'],
    desc: '基于 RAG 全链路的智能招聘推荐系统，支持 PDF/图片多格式简历解析、Milvus+ES 混合检索与大模型可解释推荐。',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20AI%20recruitment%20dashboard%20with%20resume%20analysis%2C%20charts%20and%20candidate%20matching%20interface%2C%20clean%20tech%20style&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20CV%20resume%20document%20scanning%20with%20AI%20highlighting%20skills%20and%20experience%2C%20futuristic%20interface&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20talent%20matching%20algorithm%20visualization%2C%20neural%20network%20connections%2C%20blue%20gradient%20tech%20background&image_size=landscape_4_3'
    ],
    links: [
      { label: 'GitHub',  href: 'https://github.com/Agent2026-Li', icon: 'fa-brands fa-github',  primary: false },
      { label: '查看详情', href: 'projects/smartrecruit.html',          icon: 'fa-solid fa-arrow-right', primary: true  }
    ]
  },
  {
    id: 'insightscan',
    name: 'InsightScan 扫智通',
    tags: ['Agent', 'Ollama', 'LangChain'],
    desc: '扫地机器人具身智能服务中枢。ReAct + Agentic RAG 架构，售前售后一体化智能客服，主动生成设备运行报告。',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20robot%20vacuum%20cleaner%20with%20AI%20brain%20and%20smart%20home%20integration%2C%20friendly%20design&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=robot%20assistant%20dashboard%20with%20cleaning%20reports%2C%20maps%20and%20analytics%2C%20modern%20UI&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=embodied%20AI%20robot%20navigation%20system%2C%20sensor%20visualization%2C%203D%20space%20mapping&image_size=landscape_4_3'
    ],
    links: [
      { label: 'GitHub',  href: 'https://github.com/Agent2026-Li', icon: 'fa-brands fa-github',  primary: false },
      { label: '查看详情', href: 'projects/insightscan.html',          icon: 'fa-solid fa-arrow-right', primary: true  }
    ]
  },
  {
    id: 'mateqlu',
    name: 'MateQlu 搭子小程序',
    tags: ['Spring Boot', 'uni-app', 'MySQL'],
    desc: '面向齐鲁工业大学校园的任务匹配微信小程序，Spring Boot + MyBatis 后端，uni-app 前端，支持任务发布与精准匹配。',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=social%20app%20interface%20for%20campus%20students%20finding%20study%20partners%2C%20mobile%20UI%2C%20green%20theme&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=university%20campus%20social%20network%20matching%20platform%2C%20task%20sharing%2C%20community%20building&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=WeChat%20mini%20program%20design%20for%20campus%20life%2C%20chat%20interface%2C%20modern%20Chinese%20style&image_size=landscape_4_3'
    ],
    links: [
      { label: 'GitHub',  href: 'https://github.com/Agent2026-Li', icon: 'fa-brands fa-github',  primary: false },
      { label: '查看详情', href: 'projects/mateqlu.html',          icon: 'fa-solid fa-arrow-right', primary: true  }
    ]
  },
  {
    id: 'fanzhidas',
    name: '反诈大师 AI智能反诈助手',
    tags: ['Spring AI', '阿里云百炼', '多模态'],
    desc: '基于 Spring Boot + Spring AI + 阿里云百炼大模型构建的智能反诈骗助手系统，支持多模态交互（文本、语音、图片、视频），为不同角色群体提供个性化反诈防护服务。',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20anti-fraud%20guardian%20system%20with%20shield%20and%20security%20icons%2C%20police%20blue%20color%2C%20protective%20atmosphere&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=multi-modal%20chat%20interface%20for%20fraud%20detection%2C%20voice%20image%20video%20inputs%2C%20safety%20check&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fraud%20risk%20assessment%20dashboard%2C%20warning%20levels%2C%20scam%20type%20classification%2C%20red%20alert%20design&image_size=landscape_4_3'
    ],
    links: [
      { label: 'GitHub',  href: 'https://github.com/Agent2026-Li', icon: 'fa-brands fa-github',  primary: false },
      { label: '查看详情', href: 'projects/fanzhidas.html',          icon: 'fa-solid fa-arrow-right', primary: true  }
    ]
  }
];
