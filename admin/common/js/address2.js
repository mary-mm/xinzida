/*
  Province-City-Country selection
  pccs.js
  author:yuanbo
-6-22 16.36
*/

function Dsy() {
    this.Items = {};
}

Dsy.prototype.add = function (id, iArray) {
    this.Items[id] = iArray;
}
Dsy.prototype.Exists = function (id) {
    if (typeof (this.Items[id]) == "undefined") return false;
    return true;
}

function change(v) {
    var str = "0";
    for (i = 0; i < v; i++) {
        str += ("_" + (document.getElementById(s[i]).selectedIndex - 1));
    }
    ;
    var ss = document.getElementById(s[v]);
    with (ss) {
        length = 0;
        options[0] = new Option(opt0[v], opt0[v]);
        if (v && document.getElementById(s[v - 1]).selectedIndex > 0 || !v) {
            if (dsy.Exists(str)) {
                ar = dsy.Items[str];
                for (i = 0; i < ar.length; i++) options[length] = new Option(ar[i], ar[i]);
                if (v) options[1].selected = true;
            }
        }
        if (++v < s.length) {
            change(v);
        }
    }
}

var dsy = new Dsy();

dsy.add("0", ["Anhui", "Beijing", "Fujian", "Gansu", "Guangdong", "Guangdong", "Guangxi", "Guangxi", "Guizhou", "Hainan", "Hebei", "Hebei", "Henan", "Henan", "Heilongjiang", "Hubei", "Hubei", "Hunan", "Hunan", "Hunan", "Jilin", "Jiangsu", "Jiangxi", "Jiangxi", "Liaoning", "Inner Mongolia", "Inner Mongolia", "Ningxia", "Qinghai", "Qinghai", "Qinghai", "Shandong", "Shanxi", "Shaanxi", "Shanxi", "Shanghai", "Sichuan", "Sichuan", "Sichuan", "Sichuan", "Sichuan", "Sichuan", "Sichuan", "Sichuan", "Sichuan", "Xinjiang", "Xinjiang", "Xinjiang", "Yunnan", "Zhejiang", "Chongqing"]);
dsy.add("0", ["Anqing", "Bengbu", "Chaohu", "Chizhou", "Chuzhou", "Fuyang", "Hefei", "Huaibei", "Huainan", "Huangshan", "Luan", "Ma'anshan", "Suzhou", "Tongling", "Wuhu", "Xuancheng", "Bozhou"]);
dsy.add("0_0", ["Anqing City", "Huaining County", "Qianshan County", "Susong County", "Taihu County", "Tongcheng", "Wangjiang County", "Yuexi County", "Zongyang County"]);
dsy.add("0_0_1", ["Bengbu City", "Guzhen County", "Huaiyuan County", "Wuhe County"]);
dsy.add("0_0_2", ["Chaohu City", "Hanshan County", "Hexian County", "Lujiang County", "Wuwei County"]);
dsy.add("0_0_3", ["Chizhou City", "Dongzhi County", "Qingyang County", "Shitai County"]);
dsy.add("0_0_4", ["Chuzhou", "Dingyuan County", "Fengyang County", "Laian County", "Mingguang City", "Quanjiao County", "Tianchang City"]);
dsy.add("0_0_5", ["Funan County", "Fuyang City", "Jieshou City", "Linquan County", "Taihe County", "Yingshang County"]);
dsy.add("0_0_6", ["Changfeng County", "Feidong County", "Feixi County"]);
dsy.add("0_0_7", ["Huaibei City", "Suixi County"]);
dsy.add("0_0_8", ["Fengtai County", "Huainan City"]);
dsy.add("0_0_9", ["Huangshan City", "Qimen County", "Xiuning County", "Shexian County", "Yixian County"]);
dsy.add("0_0_10", ["Huoqiu County", "Huoshan County", "Jinzhai County", "Luan City", "Shouxian", "Shucheng County"]);
dsy.add("0_0_11", ["Dangtu County", "Ma'anshan City"]);
dsy.add("0_12", ["Lingbi County", "Suzhou City", "Xiaoxian", "Sixian", "Dangshan County"]);
dsy.add("0_13", ["Tongling City", "Tongling County"]);
dsy.add("0_0_14", ["Fanchang County", "Nanling County", "Wuhu City", "Wuhu County"]);
dsy.add("0_0_15", ["Guangde County", "Jixi County", "Langxi County", "Ningguo City", "Xuancheng City", "Jingxian", "Peide County"]);
dsy.add("0_0_16", ["Lixin County", "Mengcheng County", "Voyage County", "Bozhou City"]);
dsy.add("0_1", ["Beijing", "Miyun County", "Yanqing County"]);
dsy.add("0_1_0", ["Beijing", "Miyun County", "Yanqing County"]);
dsy.add("0_2", ["Fuzhou", "Longyan", "Nanping", "Ningde", "Putian", "Quanzhou", "Sanming", "Xiamen", "Zhangzhou"]);
dsy.add("0_2_0", ["Changle City", "Fuqing City", "Fuzhou City", "Lianjiang County", "Luoyuan County", "Minhou County", "Minqing County", "Pingtan County", "Yongtai County"]);
dsy.add("0_2_1", ["Changting County", "Liancheng County", "Longyan City", "Shanghang County", "Wuping County", "Yongding County", "Zhangping City"]);
dsy.add("0_2_2", ["Guangze County", "Jianyang City", "Jianou City", "Nanping City", "Pucheng County", "Shaowu City", "Shunchang County", "Songxi County", "Wuyishan City", "Zhenghe County"]);
dsy.add("0_2_3", ["Fuan City", "Fuding City", "Gutian County", "Ningde City", "Pingnan County", "Shouning County", "Xiapu County", "Zhouning County", "Zherong County"]);
dsy.add("0_2_4", ["Putian City", "Xianyou County"]);
dsy.add("0_2_5", ["Anxi County", "Dehua County", "Huian County", "Jinmen County", "Jinjiang City", "Nanan City", "Quanzhou City", "Shishi City", "Yongchun County"]);
dsy.add("0_2_6", ["Datian County", "Jianning County", "Jiangle County", "Mingxi County", "Ninghua County", "Qingliu County", "Sanming City", "Shaxian", "Taining County", "Yongan City", "Youxi County"]);
dsy.add("0_2_7", ["Xiamen City"]);
dsy.add("0_2_8", ["Changtai County", "Dongshan County", "Huaan County", "Longhai City", "Nanjing County", "Pinghe County", "Yunxiao County", "Zhangpu County", "Zhangzhou City", "Zhaoan County"]);
dsy.add("0_3", ["Silver", "Dingxi", "Gannan Tibetan Autonomous Prefecture", "Jiayuguan", "Jinchang", "Jiuquan", "Lanzhou", "Linxia Hui Autonomous Prefecture", "Longnan", "Pingliang", "Qingyang", "Tianshui", "Wuwei", "Zhangye"]);
dsy.add("0_3_0", ["Baiyin City", "Huining County", "Jingtai County", "Jingyuan County"]);
dsy.add("0_3_1", ["Dingxi County", "Lintao County", "Longxi County", "Tongwei County", "Weiyuan County", "Zhangxian", "Minxian County"]);
dsy.add("0_3_2", ["Diebu County", "Cooperative City", "Lintan County", "Luqu County", "Maqu County", "Xiahe County", "Zhouqu County", "Zhuoni County"]);
dsy.add("0_3_3", ["Jiayuguan City"]);
dsy.add("0_3_4", ["Jinchang City", "Yongchang County"]);
dsy.add("0_3_5", ["Aksai Kazakh Autonomous County", "Anxi County", "Dunhuang City", "Jinta County", "Jiuquan City", "Subei Mongolian Autonomous County", "Yumen City"]);
dsy.add("0_3_6", ["Gaolan County", "Lanzhou City", "Yongdeng County", "Yuzhong County"]);
dsy.add("0_3_7", ["Dongxiang Autonomous County", "Guanghe County", "Hexian County", "Jishishan Baoan Dongxiang Salar Autonomous County", "Kangle County", "Linxia City", "Linxia County", "Yongjing County"]);
dsy.add("0_3_8", ["Chengxian", "Huixian", "Kangxian", "Lixian", "Liangdang County", "Wenxian", "Wudu County", "Xihe County", "Duchang County"]);
dsy.add("0_3_9", ["Chongxin County", "Huating County", "Jingning County", "Lingtai County", "Pingliang City", "Zhuanglang County", "Jingchuan County"]);
dsy.add("0_3_10", ["Heshui County", "Huachi County", "Huanxian", "Ningxian", "Qingcheng County", "Qingyang City", "Zhenyuan County", "Zhengning County"]);
dsy.add("0_3_11", ["Gangu County", "Qin'an County", "Qingshui County", "Tianshui City", "Wushan County", "Zhangjiachuan Hui Autonomous County"]);
dsy.add("0_3_12", ["Gulang County", "Minqin County", "Tianzhu Tibetan Autonomous County", "Wuwei City"]);
dsy.add("0_3_13", ["Gaotai County", "Linze County", "Minle County", "Shandan County", "Sunan Yugur Autonomous County", "Zhangye City"]);
dsy.add("0_4", ["Chaozhou", "Dongguan", "Foshan", "Guangzhou", "Heyuan", "Huizhou", "Jiangmen", "Jieyang", "Maoming", "Meizhou", "Qingyuan", "Shantou", "Shanwei", "Shaoguan", "Shenzhen", "Yangjiang", "Yunfu", "Zhanjiang", "Zhaoqing", "Zhongshan", "Zhuhai"]);
dsy.add("0_4_0", ["Chaoan County", "Chaozhou City", "Raoping County"]);
dsy.add("0_4_1", ["Dongguan City"]);
dsy.add("0_4_2", ["Foshan City"]);
dsy.add("0_4_3", ["Conghua City", "Guangzhou City", "Zengcheng City"]);
dsy.add("0_4_4", ["Dongyuan County", "Heping County", "Heyuan City", "Lianping County", "Longchuan County", "Zijin County"]);
dsy.add("0_4_5", ["Boro County", "Huidong County", "Huiyang City", "Huizhou City", "Longmen County"]);
dsy.add("0_4_6", ["Enping City", "Heshan City", "Jiangmen City", "Kaiping City", "Taishan City"]);
dsy.add("0_4_7", ["Huilai County", "Jiedong County", "Jiexi County", "Jieyang City", "Puning City"]);
dsy.add("0_4_8", ["Dianbai County", "Gaozhou City", "Huazhou City", "Maoming City", "Xinyi City"]);
dsy.add("0_4_9", ["Dapu County", "Fengshun County", "Jiaoling County", "Meizhou County", "Meizhou City", "Pingyuan County", "Wuhua County", "Xingning City"]);
dsy.add("0_4_10", ["Fogang County", "Liannan Yao Autonomous County", "Lianshan Zhuang Yao Autonomous County", "Lianzhou City", "Qingxin County", "Qingyuan City", "Yangshan County", "Yingde City"]);
dsy.add("0_4_11", ["Chaoyang City", "Chenghai City", "Nanao County", "Shantou City"]);
dsy.add("0_4_12", ["Haifeng County", "Lufeng City", "Luhe County", "Shanwei City"]);
dsy.add("0_4_13", ["Lechang City", "Nanxiong City", "Qujiang County", "Renhua County", "Ruyuan Yao Autonomous County", "Shaoguan City", "Shixing County", "Wengyuan County", "Xinfeng County"]);
dsy.add("0_4_14", ["Shenzhen"]);
dsy.add("0_4_15", ["Yangchun City", "Yangdong County", "Yangjiang City", "Yangxi County"]);
dsy.add("0_4_16", ["Luoding City", "Xinxing County", "Yunan County", "Yunan County", "Yunfu City"]);
dsy.add("0_4_17", ["Leizhou City", "Lianjiang City", "Suixi County", "Wuchuan City", "Xuwen County", "Zhanjiang City"]);
dsy.add("0_4_18", ["Deqing County", "Fengkai County", "Gaoyao City", "Guangning County", "Huaiji County", "Sihui City", "Zhaoqing City"]);
dsy.add("0_4_19", ["Zhongshan City"]);
dsy.add("0_4_20", ["Zhuhai City"]);
dsy.add("0_5", ["Baise", "Beihai", "Chongzuo", "Fangchenggang", "Guilin", "Guigang", "Hechi", "Hezhou", "Guests", "Liuzhou", "Nanning", "Qinzhou", "Wuzhou", "Yulin"]);
dsy.add("0_5_0", ["Baise City", "Debao County", "Jingxi County", "Leye County", "Lingyun County", "Longlin Autonomous County", "Napo County", "Pingguo County", "Tiandong County", "Tianlin County", "Tianyang County", "Xilin County"]);
dsy.add("0_5_1", ["Beihai City", "Hepu County"]);
dsy.add("0_5_2", ["Chongzuo City", "Daxin County", "Fusui County", "Longzhou County", "Ningming County", "Pingxiang City", "Tianwai County"]);
dsy.add("0_5_3", ["Dongxing", "Fangchenggang City", "Shangsi County"]);
dsy.add("0_5_4", ["Gongcheng Yao Autonomous County", "Guanyang County", "Guilin City", "Lipu County", "Lingui County", "Lingchuan County", "Longsheng Autonomous County", "Pingle County", "Quanzhou County", "Xingan County", "Yangshuo County", "Yongfu County", "Resources County"]);
dsy.add("0_5_5", ["Guiping City", "Guigang City", "Pingnan County"]);
dsy.add("0_5_6", ["Bama Yao Autonomous County", "Dahua Yao Autonomous County", "Donglan County", "Duan Yao Autonomous County", "Fengshan County", "Hechi City", "Huanjiang Maonan Autonomous County", "Luocheng Gelao Autonomous County", "Nandan County", "Tian'e County", "Yizhou City"]);
dsy.add("0_5_7", ["Fuchuan Yao Autonomous County", "Hezhou City", "Zhaoping County", "Zhongshan County"]);
dsy.add("0_5_8", ["Heshan City", "Jinxiu Yao Autonomous County", "Laibin City", "Wuxuan County", "Xiangzhou County", "Xincheng County"]);
dsy.add("0_5_9", ["Liucheng County", "Liujiang County", "Liuzhou City", "Luzhai County", "Rongan County", "Rongshui Miao Autonomous County", "Sanjiang Dong Autonomous County"]);
dsy.add("0_5_10", ["Binyang County", "Hengxian County", "Longan County", "Mashan County", "Nanning City", "Shanglin County", "Wuming County", "Yongning County"]);
dsy.add("0_5_11", ["Lingshan County", "Pubei County", "Qinzhou City"]);
dsy.add("0_5_12", ["Cangwu County", "Mengshan County", "Teng County", "Wuzhou City", "Cenxi City"]);
dsy.add("0_5_13", ["Beiliu City", "Bobai County", "Luchuan County", "Rong County", "Xingye County", "Yulin City"]);
dsy.add("0_6", ["Anshun", "Bijie", "Guiyang", "Liupanshui", "Miao and Dong Autonomous Prefecture in Southeast Guizhou", "Buyi and Miao Autonomous Prefecture in South Guizhou", "Buyi and Miao Autonomous Prefecture in Southwest Guizhou", "Tongren", "Zunyi"]);
dsy.add("0_6_0", ["Anshun City", "Guanling Buyi and Miao Autonomous County", "Pingba County", "Puding County", "Zhenning Buyi and Miao Autonomous County", "Ziyun Buyi and Miao Autonomous County"]);
dsy.add("0_6_1", ["Bijie City", "Dafang County", "Hezhang County", "Jinsha County", "Nayong County", "Qianxi County", "Weining Yi Hui and Miao Autonomous County", "Zhijin County"]);
dsy.add("0_6_2", ["Guiyang City", "Kaiyang County", "Qingzhen City", "Xifeng County", "Xiuwen County"]);
dsy.add("0_6_3", ["Liupanshui City", "Liupanshui Special Zone", "Panxian", "Shuicheng County"]);
dsy.add("0_6_4", ["Congjiang County", "Danzhai County", "Huangping County", "Jianhe County", "Jinping County", "Kaili City", "Leishan County", "Liping County", "Majiang County", "Sansui County", "Shibing County", "Taijiang County", "Tianzhu County", "Zhenyuan County", "Cenggong County", "Rongjiang County"]);
dsy.add("0_6_5", ["Changshun County", "Duyun City", "Dushan County", "Fuquan City", "Guiding County", "Huishui County", "Libo County", "Longli County", "Luodian County", "Pingtang County", "Sandu Shui Autonomous County", "Weng'an County"]);
dsy.add("0_6_6", ["Anlong County", "Ceheng County", "Pu'an County", "Qinglong County", "Wangmo County", "Xingren County", "Xingyi City", "Zhenfeng County"]);
dsy.add("0_6_7", ["Dejiang County", "Jiangkou County", "Shiqian County", "Sinan County", "Songtao Miao Autonomous County", "Tongren City", "Wanshan Special Zone", "Tujia and Miao Autonomous County along the river", "Yinjiang Tujia and Miao Autonomous County", "Yuping Dong Autonomous County"]);
dsy.add("0_6_8", ["Chishui City", "Daozhen Gelao Miao Autonomous County", "Fenggang County", "Renhuai City", "Suiyang County", "Tongzi County", "Wuchuan Gelao Miao Autonomous County", "Xishui County", "Yuqing County", "Zheng'an County", "Zunyi City", "Zunyi County", "Meitan County"]);
dsy.add("0_7", ["Baishali Autonomous County", "Baoting Li and Miao Autonomous County", "Changjiang Li Autonomous County", "Chengmai County", "Dingan County", "Dongfang", "Haikou", "Ledongli Autonomous County", "Linggao County", "Lingshui Li Autonomous County", "Qionghai", "Qiongzhong Li and Miao Autonomous County", "Sanya", "Tunchang County", "Wanning", "Wenchang", "Wuzhishan", "Danzhou"]);
dsy.add("0_7_0", ["Baishali Autonomous County"]);
dsy.add("0_7_1", ["Baoting Li and Miao Autonomous County"]);
dsy.add("0_7_2", ["Changjiang Li Autonomous County"]);
dsy.add("0_7_3", ["Chengmai County"]);
dsy.add("0_7_4", ["Dingan County"]);
dsy.add("0_7_5", ["Dongfang City"]);
dsy.add("0_7_6", ["Haikou City"]);
dsy.add("0_7_7", ["Ledong Li Autonomous County"]);
dsy.add("0_7_8", ["Lingao County"]);
dsy.add("0_7_9", ["Lingshui Li Autonomous County"]);
dsy.add("0_7_10", ["Qionghai City"]);
dsy.add("0_7_11", ["Qiongzhong Li and Miao Autonomous County"]);
dsy.add("0_7_12", ["Sanya City"]);
dsy.add("0_7_13", ["Tunchang County"]);
dsy.add("0_7_14", ["Wanning City"]);
dsy.add("0_7_15", ["Wenchang City"]);
dsy.add("0_7_16", ["Wuzhishan City"]);
dsy.add("0_7_17", ["Danzhou"]);

Sy.add("0_8", ["Baoding", "Cangzhou", "Chengde", "Handan", "Hengshui", "Langfang", "Qinhuangdao", "Shijiazhuang", "Tangshan", "Xingtai", "Zhangjiakou"]);
dsy.add("0_8_0", ["Anguo City", "Anxin County", "Baoding City", "Boye County", "Dingxing County", "Dingxing County", "Baoding City", "Boye County", "Boye County", "Boye County", "Dingxing County", "Dingzhou City", "Fuping County", "Fuping County", "Gaobeidiadian City", "Gaoyang County", "Gaoyang County", "Mancheng County", "Manchenxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxia", "Qingyuan County", "Qingyuan County", "Quyang County", "Quyang County", "Rongchenxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxiaxia", "RongchenchenxiaxiaxiaxiaxiaYongzhou City", "Lixian County"]);
dsy.add("0_8_1", ["Botou City", "Cangxian", "Cangzhou City", "Dongguang County", "Haixing County", "Hejian City", "Huanghua City", "Mengcun Hui Autonomous County", "Nanpi County", "Qingxian", "Renqiu City", "Suning County", "Wuqiao County", "Xianxian County", "Yanshan County"]);
dsy.add("0_8_2", ["Chengde City", "Chengde County", "Fengning Manchu Autonomous County", "Kuancheng Manchu Autonomous County", "Longhua County", "Luanping County", "Pingquan County", "Weichang Manchu Mongolian Autonomous County", "Xinglong County"]);
dsy.add("0_8_3", ["Chengan County", "Cixian", "Daming County", "Feixiang County", "Guantao County", "Guangping County", "Handan City", "Handan County", "Jize County", "Linzhang County", "Qiu County", "Quzhou County", "Shixian County", "Wei County", "Wuan City", "Yongnian County"]);
dsy.add("0_8_4", ["Anping County", "Fucheng County", "Gucheng County", "Hengshui City", "Jizhou City", "Jingxian", "Raoyang County", "Shenzhou City", "Wuqiang County", "Wuyi County", "Zaoqiang County"]);
dsy.add("0_8_5", ["Bazhou City", "Dachang Hui Autonomous County", "Dacheng County", "Gu'an County", "Langfang City", "Sanhe City", "Wen'an County", "Xianghe County", "Yongqing County"]);
dsy.add("0_8_6", ["Changli County", "Funing County", "Lulong County", "Qinhuangdao City", "Qinglong Manchu Autonomous County"]);
dsy.add("0_8_7", ["Gaoyi County", "Jinzhou City", "Jinglong County", "Lingshou County", "Luquan City", "Pingshan County", "Shenze County", "Shijiazhuang City", "Wuji County", "Xinji City", "Xinle City", "Xingtang County", "Yuanshi County", "Zanhuang County", "Zhao County", "Zhengding County", "Gaocheng City", "Luancheng County"]);
dsy.add("0_8_8", ["Leting County", "Luannan County", "Luan County", "Qian'an City", "Qianxi County", "Tanghai County", "Tangshan City", "Yutian County", "Zunhua City"]);
dsy.add("0_8_9", ["Baixiang County", "Guangzong County", "Julu County", "Lincheng County", "Linxi County", "Longyao County", "Nangong City", "Nanhe County", "Neiqiu County", "Ningjin County", "Pingxiang County", "Qinghe County", "Ren County", "Shahe City", "Weixian", "Xinhe County", "Xingtai City", "Xingtai County"]);
dsy.add("0_8_10", ["Chicheng County", "Chongli County", "Guyuan County", "Huaian County", "Huailai County", "Kangbao County", "Shangyi County", "Wanquan County", "Weixian", "Xuanhua County", "Yangyuan County", "Zhangbei County", "Zhangjiakou City", "Zhuolu County"]);


dsy.add("0_9", ["Anyang", "Hebi", "Jiyuan", "Jiaozuo", "Kaifeng", "Luoyang", "Nanyang", "Pingdingshan", "Sanmenxia", "Shangqiu", "Xinxiang", "Xinyang", "Xuchang", "Zhengzhou", "Zhoukou", "Zhumadian", "Luohe", "Puyang"]);
dsy.add("0_9_0", ["Anyang City", "Anyang County", "Slip County", "Linzhou City", "Neihuang County", "Tangyin County"]);
dsy.add("0_9_1", ["", "Hebi City", "Junxian County", "Qixian County"]);
dsy.add("0_9_2", ["Jiyuan City"]);
dsy.add("0_9_3", ["Boai County", "Jiaozuo City", "Mengzhou City", "Qinyang City", "Wenxian County", "Wuzhu County", "Xiuwu County"]);
dsy.add("0_9_4", ["Kaifeng City", "Kaifeng County", "Lankao County", "Tongxu County", "Weishi County", "Qixian County"]);
dsy.add("0_9_5", ["Luoning County", "Luoyang City", "Mengjin County", "Ruyang County", "Xin'an County", "Yichuan County", "Yiyang County", "Yanshi City", "Song County", "Luanchuan County"]);
dsy.add("0_9_6", ["Dengzhou", "Fangcheng County", "Nanyang City", "Nanzhao County", "Neixiang County", "Sheqi County", "Tanghe County", "Tongbai County", "Xixia County", "Xinye County", "Zhenping County", "Xichuan County"]);
dsy.add("0_9_7", ["Baofeng County", "Lushan County", "Pingdingshan City", "Ruzhou City", "Wugang City", "Yexian County", "Jiaxian County"]);
dsy.add("0_9_8", ["Lingbao City", "Lushi County", "Sanmenxia City", "Shaanxi County", "Yima City", "Mianchi County"]);
dsy.add("0_9_9", ["Minquan County", "Ningling County", "Shangqiu City", "Xiayi County", "Yongcheng County", "Yucheng County", "Zhecheng County", "Lixian County"]);
dsy.add("0_9_10", ["Changyuan County", "Fengqiu County", "Huixian City", "Huojia County", "Weihui City", "Xinxiang City", "Xinxiang County", "Yanjin County", "Yuanyang County"]);
dsy.add("0_9_11", ["Gushi County", "Guangshan County", "Huaibin County", "Luoshan County", "Shangcheng County", "Xixian County", "Xinyang City", "Huangchuan County"]);
dsy.add("0_9_12", ["Changge City", "Xiangcheng County", "Xuchang City", "Xuchang County", "Yuzhou City", "Yanling County"]);
dsy.add("0_9_13", ["Dengfeng City", "Gongyi City", "Xinmi City", "Xinzheng City", "Zhengzhou City", "Zhongmou County", "Xingyang City"]);
dsy.add("0_9_14", ["Dancheng County", "Fugou County", "Huaiyang County", "Luyi County", "Shangshui County", "Shenqiu County", "Taikang County", "Xihua County", "Xiang City", "Zhoukou City"]);
dsy.add("0_9_15", ["Biyang County", "Pingyu County", "Qushan County", "Runan County", "Shangcai County", "Suiping County", "Xiping County", "Xincai County", "Zhengyang County", "Zhumadian City"]);
dsy.add("0_9_16", ["Linying County", "Wuyang County", "Nucheng County", "Luohe City"]);
dsy.add("0_9_17", ["Fan County", "Nanle County", "Qingfeng County", "Taiqian County", "Puyang City", "Puyang County"]);


dsy.add("0_10", ["Daqing", "Daxing'an Mountains", "Harbin", "Hegang", "Heihe", "Jixi", "Jiamusi", "Mudan River", "Qitai River", "Qiqihar", "Shuangyashan", "Suihua", "Yichun"]);
dsy.add("0_10_0", ["Daqing City", "Dulbert Mongolian Autonomous County", "Lindian County", "Zhaoyuan County", "Zhaozhou County"]);
dsy.add("0_10_1", ["Huma County", "Mohe County", "Tahe County"]);
dsy.add("0_10_2", ["A Cheng", "Bayan County", "Bin County", "Fangzheng County", "Harbin City", "Hulan County", "Mulan County", "Shangzhi City", "Shuangcheng", "Tonghe County", "Wuchang City", "Yanshou County", "Yilan County"]);
dsy.add("0_10_3", ["Hegang City", "Luobei County", "Suibin County"]);
dsy.add("0_10_4", ["Beian City", "Heihe City", "Nenjiang County", "Sunwu County", "Wudalianchi City", "Sunke County"]);
dsy.add("0_10_5", ["Hulin City", "Jidong County", "Jixi City", "Mishan City"]);
dsy.add("0_10_6", ["Fuyuan County", "Fujin City", "Jiamusi City", "Tangyuan County", "Tongjiang City", "Huachuan County", "Huanan County"]);
dsy.add("0_10_7", ["Dongning County", "Hailin City", "Linkou County", "Mudanjiang City", "Muling City", "Ningan City", "Suifenhe City"]);
dsy.add("0_10_8", ["Boli County", "Qitaihe City"]);
dsy.add("0_10_9", ["Baiquan County", "Fuyu County", "Gannan County", "Kedong County", "Keshan County", "Longjiang County", "Qiqihar City", "Tailai County", "Yian County", "Nehe City"]);
dsy.add("0_10_10", ["Baoqing County", "Jixian County", "Raohe County", "Shuangyashan City", "Friendship County"]);
dsy.add("0_10_11", ["Anda City", "Helen City", "Lanxi County", "Mingshui County", "Qinggang County", "Qingan County", "Suihua City", "Suiling County", "Wangkui County", "Zhaodong City"]);
dsy.add("0_10_12", ["Jiayin County", "Tieli City", "Yichun City"]);

dsy.add("0_11", ["Ezhou", "Enshi Tujia and Miao Autonomous Prefecture", "Huanggang", "Huangshi", "Jingmen", "Jingzhou", "Qianjiang", "Shennongjia Forest Area", "Shiyan", "Suizhou", "Tianmen", "Wuhan", "Xiantao", "Xianning", "Xiangfan", "Xiaogan", "Yichang"]);
dsy.add("0_11_0", ["Ezhou"]);
dsy.add("0_11_1", ["Badong County", "Enshi City", "Hefeng County", "Jianshi County", "Laifeng County", "Lichuan City", "Xianfeng County", "Xuan En County"]);
dsy.add("0_11_2", ["Hongan County", "Huanggang City", "Huangmei County", "Luotian County", "Ma City", "Tuanfeng County", "Wuxue City", "Yingshan County", "Qichun County", "Xishui County"]);
dsy.add("0_11_3", ["Daye City", "Huangshi City", "Yangxin County"]);
dsy.add("0_11_4", ["Jingmen City", "Jingshan County", "Shayang County", "Zhongxiang City"]);
dsy.add("0_11_5", ["Public Security County", "Honghu City", "Jianli County", "Jiangling County", "Jingzhou City", "Shishou City", "Songzi City"]);
dsy.add("0_11_6", ["Qianjiang City"]);
dsy.add("0_11_7", ["Shennongjia Forest Area"]);
dsy.add("0_11_8", ["Danjiangkou City", "Fang County", "Shiyan City", "Yunxi County", "Yunxian County", "Zhushan County", "Zhuxi County"]);
dsy.add("0_11_9", ["Guangshui City", "Suizhou City"]);
dsy.add("0_11_10", ["Tianmen Market"]);
dsy.add("0_11_11", ["Wuhan City"]);
dsy.add("0_11_12", ["Xiantao City"]);
dsy.add("0_11_13", ["Chibi City", "Chongyang County", "Jiayu County", "Tongcheng County", "Tongshan County", "Xianning City"]);
dsy.add("0_11_14", ["Baokang County", "Gucheng County", "Laohekou City", "Nanzhang County", "Xiangfan City", "Yicheng City", "Zaoyang City"]);
dsy.add("0_11_15", ["Anlu City", "Dawu County", "Hanchuan City", "Xiaochang County", "Xiaogan City", "Yingcheng City", "Yunmeng County"]);
dsy.add("0_11_16", ["Changyang Tujia Autonomous County", "Dangyang City", "Wufeng Tujia Autonomous County", "Xingshan County", "Yichang City", "Yicheng City", "Yuanan County", "Zhijiang City", "Zigui County"]);

dsy.add("0_12", ["Changde", "Changsha", "Chenzhou", "Hengyang", "Huaihua", "Loudi", "Shaoyang", "Xiangtan", "Tujia and Miao Autonomous Prefecture in Western Hunan", "Yiyang", "Yongzhou", "Yueyang", "Zhangjiajie", "Zhuzhou"]);
dsy.add("0_12_0", ["Anxiang County", "Changde City", "Hanshou County", "Jinshi City", "Linli County", "Shimen County", "Taoyuan County", "Lixian County"]);
dsy.add("0_12_1", ["Changsha City", "Changsha County", "Ningxiang County", "Wangcheng County", "Liuyang City"]);
dsy.add("0_12_2", ["Anren County", "Chenzhou City", "Guidong County", "Guiyang County", "Jiahe County", "Linwu County", "Rucheng County", "Yizhang County", "Yongxing County", "Zixing City"]);
dsy.add("0_12_3", ["Changning City", "Hengdong County", "Hengnan County", "Hengshan County", "Hengyang City", "Hengyang County", "Qidong County", "Leiyang City"]);
dsy.add("0_12_4", ["Chenxi County", "Hongjiang City", "Huaihua City", "Huitong County", "Jingzhou Miao and Dong Autonomous County", "Mayang Miao Autonomous County", "Tongdong Dong Autonomous County", "Xinhuang Dong Autonomous County", "Zhongfang County", "Yunjiang Dong Autonomous County", "Yuanling County", "Xupu County"]);
dsy.add("0_12_5", ["Lengshuijiang City", "Lianyuan City", "Loudi City", "Shuangfeng County", "Xinhua County"]);
dsy.add("0_12_6", ["Chengbu Miao Autonomous County", "Dongkou County", "Longhui County", "Shaodong County", "Shaoyang City", "Shaoyang County", "Suining County", "Wugang City", "Xinning County", "Xinshao County"]);
dsy.add("0_12_7", ["Shaoshan City", "Xiangtan City", "Xiangtan County", "Xiangxiang City"]);
dsy.add("0_12_8", ["Baojing County", "Fenghuang County", "Guzhang County", "Huayuan County", "Jishou City", "Longshan County", "Yongshun County", "Luxi County"]);
dsy.add("0_12_9", ["Anhua County", "Nanxian County", "Taojiang County", "Yiyang City", "Yuanjiang City"]);
dsy.add("0_12_10", ["Dao County", "Dong'an County", "Jianghua Yao Autonomous County", "Jiangyong County", "Lanshan County", "Ningyuan County", "Qiyang County", "Shuangpai County", "Xintian County", "Yongzhou City"]);
dsy.add("0_12_11", ["Huarong County", "Linxiang City", "Pingjiang County", "Xiangyin County", "Yueyang City", "Yueyang County", "Miluo City"]);
dsy.add("0_12_12", ["Cili County", "Sangzhi County", "Zhangjiajie City"]);
dsy.add("0_12_13", ["Chaling County", "Yanling County", "Zhuzhou City", "Zhuzhou County", "Youxian", "Liling City"]);

dsy.add("0_13", ["Baicheng", "Baishan", "Changchun", "Jilin", "Liaoyuan", "Siping", "Songyuan", "Tonghua", "Yanbian Korean Autonomous Prefecture"]);
dsy.add("0_13_0", ["Baicheng", "Da'an", "Tongyu County", "Zhenlai County", "Taonan City"]);
dsy.add("0_13_1", ["Baishan City", "Changbai Korean Autonomous County", "Fusong County", "Jiangyuan County", "Jingyu County", "Linjiang City"]);
dsy.add("0_13_2", ["Changchun City", "Dehui City", "Jiutai City", "Nong'an County", "Yushu City"]);
dsy.add("0_13_3", ["Jilin City", "Panshi City", "Shulan City", "Yongji County", "Huadian City", "Jiaohe City"]);
dsy.add("0_13_4", ["Dongfeng County", "Dongliao County", "Liaoyuan City"]);
dsy.add("0_13_5", ["Gongzhuling City", "Lishu County", "Shuangliao City", "Siping City", "Yitong Manchu Autonomous County"]);
dsy.add("0_13_6", ["Changling County", "Fuyu County", "Qian'an County", "Qiangoruoros Mongolian Autonomous County", "Songyuan City"]);
dsy.add("0_13_7", ["Huinan County", "Ji'an City", "Liuhe County", "Meihekou City", "Tonghua City", "Tonghua County"]);
dsy.add("0_13_8", ["Antu County", "Dunhua City", "Helong City", "Longjing City", "Tumen City", "Wangqing County", "Yanji City", "Hunchun City"]);


dsy.add("0_14", ["Changzhou", "Huaian", "Lianyungang", "Nanjing", "Nantong", "Suzhou", "Suqian", "Taizhou", "Wuxi", "Xuzhou", "Yancheng", "Yangzhou", "Zhenjiang"]);
dsy.add("0_14_0", ["Changzhou", "Jintan", "Liyang"]);
dsy.add("0_14_1", ["Hongze County", "Huaian City", "Jinhu County", "Lianshui County", "Xuyi County"]);
dsy.add("0_14_2", ["Donghai County", "Ganyu County", "Guannan County", "Guanyun County", "Lianyungang City"]);
dsy.add("0_14_3", ["Gaochun County", "Nanjing City", "Lishui County"]);
dsy.add("0_14_4", ["Haian County", "Haimen City", "Nantong City", "Qidong City", "Rudong County", "Rugao City", "Tongzhou City"]);
dsy.add("0_14_5", ["Changshu City", "Kunshan City", "Suzhou City", "Taicang City", "Wujiang City", "Zhangjiagang City"]);
dsy.add("0_14_6", ["Suqian City", "Suyu County", "Shuyang County", "Sihong County", "Siyang County"]);
dsy.add("0_14_7", ["Jiangyan City", "Jingjiang City", "Taixing City", "Taizhou City", "Xinghua City"]);
dsy.add("0_14_8", ["Jiangyin City", "Wuxi City", "Yixing City"]);
dsy.add("0_14_9", ["Fengxian", "Peixian", "Tongshan County", "Xinyi City", "Xuzhou", "Pizhou City", "Suining County"]);
dsy.add("0_14_10", ["Binhai County", "Dafeng City", "Dongtai City", "Funing County", "Jianhu County", "Sheyang County", "Xiangshui County", "Yancheng City", "Yandu County"]);
dsy.add("0_14_11", ["Baoying County", "Gaoyou City", "Jiangdu", "Yangzhou City", "Yizheng City"]);
dsy.add("0_14_12", ["Danyang City", "Jurong City", "Yangzhong City", "Zhenjiang City"]);
dsy.add("0_15", ["Fuzhou", "Ganzhou", "Ji'an", "Jingdezhen", "Jiujiang", "Nanchang", "Pingxiang", "Shangrao", "Xinyu", "Yichun", "Yingtan"]);
dsy.add("0_15_0", ["Chongren County", "Dongxiang County", "Fuzhou City", "Guangchang County", "Jinxi County", "Le'an County", "Lichuan County", "Nancheng County", "Nanfeng County", "Yihuang County", "Zixi County"]);
dsy.add("0_15_1", ["Anyuan County", "Chongyi County", "Dayu County", "Dingnan County", "Gan County", "Ganzhou City", "Huichang County", "Longnan County", "Nankang City", "Ningdu County", "Quannan County", "Ruijin City", "Shangyu County", "Shicheng County", "Xinfeng County", "Xingguo County", "Xunwu County", "Yudu County"]);
dsy.add("0_15_2", ["Anfu County", "Ji'an City", "Ji'an County", "Jishui County", "Jinggangshan City", "Suichuan County", "Taihe County", "Wan'an County", "Xiajiang County", "Xingan County", "Yongfeng County", "Yongxin County"]);
dsy.add("0_15_3", ["Fuliang County", "Jingdezhen City", "Leping City"]);
dsy.add("0_15_4", ["De'an County", "Duchang County", "Hukou County", "Jiujiang City", "Jiujiang County", "Pengze County", "Ruichang City", "Wuning County", "Xingzi County", "Xiushui County", "Yongxiu County"]);
dsy.add("0_15_5", ["Anyi County", "Jinxian County", "Nanchang City", "Nanchang County", "Xinjian County"]);
dsy.add("0_15_6", ["Lianhua County", "Luxi County", "Pingxiang City", "Shangli County"]);
dsy.add("0_15_7", ["Boyang County", "Dexing City", "Guangfeng County", "Hengfeng County", "Lead Mountain County", "Shangrao City", "Shangrao County", "Wannian County", "Yugan County", "Yushan County", "Yiyang County", "Wuyuan County"]);
dsy.add("0_15_8", ["Fenyi County", "Xinyu City"]);
dsy.add("0_15_9", ["Fengcheng", "Fengxin County", "Gao'an City", "Jing'an County", "Shanggao County", "Tonggu County", "Wanzai County", "Yichun City", "Yifeng County", "Zhangshu City"]);
dsy.add("0_15_10", ["Guixi City", "Yingtan City", "Yujiang County"]);
dsy.add("0_16", ["Anshan", "Benxi", "Chaoyang", "Dalian", "Dandong", "Fushun", "Fuxin", "Huludao", "Jinzhou", "Liaoyang", "Panjin", "Shenyang", "Tieling", "Yingkou"]);
dsy.add("0_16_0", ["Anshan City", "Haicheng City", "Taian County", "Xiuyan Manchu Autonomous County"]);
dsy.add("0_16_1", ["Benxi Manchu Autonomous County", "Benxi City", "Huanren Manchu Autonomous County"]);
dsy.add("0_16_2", ["Beipiao City", "Chaoyang City", "Chaoyang County", "Jianping County", "Karaqin Left-wing Mongolian Autonomous County", "Lingyuan City"]);
dsy.add("0_16_3", ["Changhai County", "Dalian City", "Prandian City", "Wafangdian City", "Zhuanghe City"]);
dsy.add("0_16_4", ["Dandong City", "Donggang City", "Fengcheng City", "Kuandian Manchu Autonomous County"]);
dsy.add("0_16_5", ["Fushun City", "Fushun County", "Qingyuan Manchu Autonomous County", "Xinbin Manchu Autonomous County"]);
dsy.add("0_16_6", ["Fuxin Mongolian Autonomous County", "Fuxin City", "Zhangwu County"]);
dsy.add("0_16_7", ["Huludao City", "Jianchang County", "Suizhong County", "Xingcheng City"]);
dsy.add("0_16_8", ["Beining City", "Heishan County", "Jinzhou City", "Linghai City", "Yixian County"]);
dsy.add("0_16_9", ["Lighthouse City", "Liaoyang City", "Liaoyang County"]);
dsy.add("0_16_10", ["Dawa County", "Panjin City", "Panshan County"]);
dsy.add("0_16_11", ["Faku County", "Kangping County", "Liaozhong County", "Shenyang City", "Xinmin City"]);
dsy.add("0_16_12", ["Changtu County", "Tiaobingshan City", "Kaiyuan City", "Tieling City", "Tieling County", "Xifeng County"]);
dsy.add("0_16_13", ["Dashiqiao City", "Gaizhou City", "Yingkou City"]);


dsy.add("0_17", ["Alashan League", "Bayannaoer League", "Baotou", "Chifeng", "Ordos", "Hohhot", "Hulunbeir", "Tongliao", "Wuhai", "Ulanchabu League", "Xilingol League", "Xingan League"]);
dsy.add("0_17_0", ["Alashan Right Banner", "Alashan Left Banner", "Ejina Banner"]);
dsy.add("0_17_1", ["Hangjin Houqi", "Linhe City", "Urat Houqi", "Urat Front Flag", "Urat Zhongqi", "Wuyuan County", "Dengkou County"]);
dsy.add("0_17_2", ["Baotou City", "Dalhan Maomingan Union Banner", "Guyang County", "Tumote Right Banner"]);
dsy.add("0_17_3", ["Arukhorqin Banner", "Aohan Banner", "Bahrain Right Banner", "Bahrain Left Banner", "Chifeng City", "Karaqin Banner", "Keshketeng Banner", "Linxi County", "Ningcheng County", "Ongniute Banner"]);
dsy.add("0_17_4", ["Dalat Banner", "Ordos City", "Etok Banner", "Etok Front Banner", "Hangjin Banner", "Ushen Banner", "Ijinholuo Banner", "Zhungeer Banner"]);
dsy.add("0_17_5", ["Helinger County", "Hohhot City", "Qingshuihe County", "Tummett Left Banner", "Toketo County", "Wuchuan County"]);
dsy.add("0_17_6", ["Arong Banner", "Chen Baer Hu Banner", "Erguna City", "Oroqen Autonomous Banner", "Ewenki Autonomous Banner", "Genhe City", "Hulunbeir City", "Manzhouli City", "Molidawadaur Autonomous Banner", "New Baer Hu Right Banner", "New Baer Hu Zuo Banner", "Yakeshi City", "Zhalantun City"]);
dsy.add("0_17_7", ["Huolingol City", "Kailu County", "Horqin Left Back Banner", "Horqin Left Mid-Banner", "Kulun Banner", "Naiman Banner", "Tongliao City", "Zalute Banner"]);
dsy.add("0_17_8", ["Wuhai City"]);
dsy.add("0_17_9", ["Chahar Right Back Banner", "Chahar Right Front Banner", "Chahar Right Central Banner", "Fengzhen City", "Huade County", "Jining City", "Liangcheng County", "Shangdu County", "Four Ziwang Banner", "Xinghe County", "Zhuozi County"]);
dsy.add("0_17_10", ["Abaga Banner", "East Uzhumqin Banner", "Duolun County", "Erlianhot City", "Sunite Right Banner", "Sunite Left Banner", "Taipu Temple Banner", "West Uzhumqin Banner", "Xilinhot City", "Xilinhot City", "Insert Yellow Banner", "Zhenglan Banner", "Zhengxiangbai Banner"]);
dsy.add("0_17_11", ["Alshan City", "Horqin Right Front Banner", "Horqin Right Central Banner", "Tuquan County", "Ulanhot City", "Zalaite Banner"]);

dsy.add("0_18", ["Guyuan", "Shizuishan", "Wuzhong", "Yinchuan"]);
dsy.add("0_18_0", ["Guyuan City", "Haiyuan County", "Longde County", "Pengyang County", "Xiji County", "Jingyuan County"]);
dsy.add("0_18_1", ["Huinong County", "Pingluo County", "Shizuishan City", "Taole County"]);
dsy.add("0_18_2", ["Bronze Gorge City", "Tongxin County", "Wuzhong City", "Yanchi County", "Zhongning County", "Zhongwei County"]);
dsy.add("0_18_3", ["Helan County", "Lingwu City", "Yinchuan City", "Yongning County"]);
dsy.add("0_19", ["Guoluo Tibetan Autonomous Prefecture", "Haibei Tibetan Autonomous Prefecture", "Haidong", "Hainan Tibetan Autonomous Prefecture", "Haixi Mongolian Tibetan Autonomous Prefecture", "Huangnan Tibetan Autonomous Prefecture", "Xining", "Yushu Tibetan Autonomous Prefecture"]);
dsy.add("0_19_0", ["Banma County", "Dari County", "Gande County", "Jiuzhi County", "Maduo County", "Maqin County"]);
dsy.add("0_19_1", ["Gangcha County", "Haiyan County", "Menyuan Hui Autonomous County", "Qilian County"]);
dsy.add("0_19_2", ["Mutual Aid Tujia Autonomous County", "Hualong Hui Autonomous County", "Ledu County", "Minhe Hui Tujia Autonomous County", "Ping'an County", "Xunhua Sala Autonomous County"]);
dsy.add("0_19_3", ["Republic County", "Guide County", "Guinan County", "Tongde County", "Xinghai County"]);
dsy.add("0_19_4", ["Delingha City", "Dulan County", "Golmud City", "Tianjun County", "Ulan County"]);
dsy.add("0_19_5", ["Henan Mongolian Autonomous County", "Jianza County", "Tongren County", "Zeku County"]);
dsy.add("0_19_6", ["Datong Hui Tu Autonomous County", "Xining City", "Huangyuan County", "Huangzhong County"]);
dsy.add("0_19_7", ["called many counties", "Baoqian County", "Qumali County", "Yushu County", "Zaduo County", "Zhiduo County"]);

dsy.add("0_20", ["Binzhou", "Dezhou", "Dongying", "Heze", "Jinan", "Jining", "Laiwu", "Liaocheng", "Linyi", "Qingdao", "Rizhao", "Taian", "Weihai", "Weifang", "Yantai", "Zaozhuang", "Zibo"]);
dsy.add("0_20_0", ["Binzhou", "Boxing County", "Huimin County", "Wudi County", "Yangxin County", "Zhanhua County", "Zouping County"]);
dsy.add("0_20_1", ["Dezhou City", "Leling City", "Linyi County", "Lingxian County", "Ningjin County", "Plain County", "Qihe County", "Qingyun County", "Wucheng County", "Xiajin County", "Yucheng City"]);
dsy.add("0_20_2", ["Dongying City", "Guangrao County", "Kenli County", "Lijin County"]);
dsy.add("0_20_3", ["Cao County", "Chengwu County", "Shanxian", "Dingtao County", "Dongming County", "Heze City", "Juye County", "Yuncheng County", "Juancheng County", "Juancheng County"]);
dsy.add("0_20_4", ["Jinan City", "Jiyang County", "Pingyin County", "Shanghe County", "Zhangqiu City"]);
dsy.add("0_20_5", ["Jining City", "Jiaxiang County", "Jinxiang County", "Liangshan County", "Qufu City", "Weishan County", "Yutai County", "Zoucheng", "Yanzhou City", "Wenshang County", "Sishui County"]);
dsy.add("0_20_6", ["Laiwu"]);
dsy.add("0_20_7", ["Donga County", "Gaotang County", "Guanxian", "Liaocheng City", "Linqing City", "Yanggu County", "Chiping County", "Shenxian County"]);
dsy.add("0_20_8", ["Cangshan County", "Fei County", "Linyi City", "Linshu County", "Mengyin County", "Pingyi County", "Yinan County", "Yishui County", "Tancheng County", "Junan County"]);
dsy.add("0_20_9", ["Jimo City", "Jiaonan City", "Jiaozhou City", "Laixi City", "Pingdu City", "Qingdao City"]);
dsy.add("0_20_10", ["Rizhao City", "Wulian County", "Juxian County"]);
dsy.add("0_20_11", ["Dongping County", "Feicheng City", "Ningyang County", "Tai'an City", "Xintai City"]);
dsy.add("0_20_12", ["Rongcheng City", "Rushan City", "Weihai City", "Wendeng City"]);
dsy.add("0_20_13", ["Anqiu City", "Changle County", "Changyi City", "Gaomi City", "Linqu County", "Qingzhou City", "Shouguang City", "Weifang City", "Zhucheng City"]);
dsy.add("0_20_14", ["Changdao County", "Haiyang City", "Laiyang City", "Laizhou City", "Longkou City", "Penglai City", "Qixia City", "Yantai City", "Zhaoyuan City"]);
dsy.add("0_20_15", ["Zaozhuang City", "Tengzhou City"]);
dsy.add("0_20_16", ["Gaoqing County", "Huantai County", "Yiyuan County", "Zibo City"]);
dsy.add("0_21", ["Changzhi", "Datong", "Jincheng", "Jinzhong", "Linfen", "Luliang", "Shuozhou", "Taiyuan", "Xinzhou", "Yangquan", "Yuncheng"]);
dsy.add("0_21_0", ["Changzhi City", "Changzhi County", "Changzi County", "Huguan County", "Licheng County", "Lucheng City", "Pingshun County", "Qinyuan County", "Tunliu County", "Wuxiang County", "Xiangyuan County"]);
dsy.add("0_21_1", ["Datong City", "Datong County", "Guangling County", "Hunyuan County", "Lingqiu County", "Tianzhen County", "Yanggao County", "Zuoyun County"]);
dsy.add("0_21_2", ["Gaoping City", "Jincheng City", "Lingchuan County", "Qinshui County", "Yangcheng County", "Zezhou County"]);
dsy.add("0_21_3", ["Heshun County", "Jiexiu City", "Jinzhong City", "Lingshi County", "Pingyao County", "Qi County", "Shouyang County", "Taigu County", "Xiyang County", "Yushe County", "Zuoquan County"]);
dsy.add("0_21_4", ["Anze County", "Daning County", "Fenxi County", "Fushan County", "Guxian", "Hongdong County", "Houma City", "Huozhou City", "Jixian", "Linfen City", "Puxian", "Quwo County", "Xiangfen County", "Xiangning County", "Yicheng County", "Yonghe County", "Xiangxian County"]);
dsy.add("0_21_5", ["Fangshan County", "Fenyang City", "Jiaocheng County", "Jiaokou County", "Lishi City", "Linxian", "Liulin County", "Shilou County", "Wenshui County", "Xiaoyi City", "Xingxian", "Zhongyang County", "Lanxian County"]);
dsy.add("0_21_6", ["Huairen County", "Shanyin County", "Shuozhou City", "Yingxian", "Youyu County"]);
dsy.add("0_21_7", ["Gujiao City", "Loufan County", "Qingxu County", "Taiyuan City", "Yangqu County"]);
dsy.add("0_21_8", ["Baode County", "Daixian", "Dingxiang County", "Fanshi County", "Hequ County", "Jingle County", "Ningwu County", "Bianguan County", "Shenchi County", "Wutai County", "Wuzhai County", "Xinzhou City", "Yuanping City", "Lan County"]);
dsy.add("0_21_9", ["Pingding County", "Yangquan City", "Yuxian County"]);
dsy.add("0_21_10", ["Hejin City", "Linyi County", "Pinglu County", "Wanrong County", "Wenxi County", "Xia County", "Xinjiang County", "Yongji City", "Yuanqu County", "Yuncheng City", "Ruicheng County", "Jiangxian County", "Jishan County"]);

dsy.add("0_22", ["Ankang", "Baoji", "Hanzhong", "Shangluo", "Tongchuan", "Weinan", "Xi'an", "Xianyang", "Yan'an", "Yulin"]);
dsy.add("0_22_0", ["Ankang City", "Baihe County", "Hanyin County", "Ningshan County", "Pingli County", "Shiquan County", "Xunyang County", "Zhenping County", "Ziyang County", "Langao County"]);
dsy.add("0_22_1", ["Baoji City", "Baoji County", "Fengxian", "Fengxiang County", "Fufeng County", "Longxian", "Meixian", "Qianyang County", "Taibai County", "Qishan County", "Linyou County"]);
dsy.add("0_22_2", ["Chenggu County", "Foping County", "Hanzhong City", "Liuba County", "Lueyang County", "Mian County", "Nanzheng County", "Ningqiang County", "Xixiang County", "Yangxian County", "Zhenba County"]);
dsy.add("0_22_3", ["Danfeng County", "Luonan County", "Shanyang County", "Shangluo City", "Shangnan County", "Zhenan County", "Zhashui County"]);
dsy.add("0_22_4", ["Tongchuan City", "Yijun County"]);
dsy.add("0_22_5", ["Baishui County", "Chengcheng County", "Dali County", "Fuping County", "Han City", "Heyang County", "Huaxian County", "Huayin City", "Pucheng County", "Weinan City", "Tongguan County"]);
dsy.add("0_22_6", ["Gaoling County", "Huxian County", "Lantian County", "Xi'an City", "Zhou Zhixian"]);
dsy.add("0_22_7", ["Bin County", "Changwu County", "Chunhua County", "Liquan County", "Qian County", "Sanyuan County", "Wugong County", "Xianyang City", "Xingping City", "Xunyi County", "Yongshou County", "Jingyang County"]);
dsy.add("0_22_8", ["Ansai County", "Fuxian County", "Ganquan County", "Huangling County", "Huanglong County", "Luochuan County", "Wuqi County", "Yan'an City", "Yanchuan County", "Yichuan County", "Zhidan County", "Zichang County"]);
dsy.add("0_22_9", ["Dingbian County", "Fugu County", "Hengshan County", "Jiaxian County", "Jingbian County", "Mizhi County", "Qingjian County", "Shenmu County", "Suide County", "Wubao County", "Yulin City", "Zizhou County"]);
dsy.add("0_23", ["Chongming County", "Shanghai"]);
dsy.add("0_23_0", ["", "Chongming County", "Shanghai"]);
dsy.add("0_24", ["Aba Tibetan and Qiang Autonomous Prefecture of Aba", "Bazhong", "Bazhong", "Chengdu", "Chengdu", "Dazhou", "Deyang", "Ganzi Tibetan Autonomous Prefecture of Ganzi", "Guangan", "Guangyuan", "Leshan"]);
dsy.add("0_24_0", ["Aba County", "Heishui County", "Hongyuan County", "Jinchuan County", "Jiuzhaigou County", "Lixian", "Malkang County", "Mao County", "Rangtang County", "Zoige County", "Songpan County", "Xiaojin County", "Wenchuan County"]);
dsy.add("0_24_1", ["Bazhong City", "Nanjiang County", "Pingchang County", "Tongjiang County"]);
dsy.add("0_24_2", ["Chengdu City", "Chongzhou City", "Dayi County", "Dujiangyan City", "Jintang County", "Pengzhou City", "Pujiang County", "Shuangliu County", "Xinjin County", "Qionglai City", "Pixian County"]);
dsy.add("0_24_3", ["Daxian", "Dazhou", "Dazhu County", "Kaijiang County", "Quxian", "Wanyuan City", "Xuanhan County"]);
dsy.add("0_24_4", ["Deyang City", "Guanghan City", "Luojiang County", "Mianzhu City", "Shifang City", "Zhongjiang County"]);
dsy.add("0_24_5", ["Batang County", "Baiyu County", "Danba County", "Daocheng County", "Daofu County", "Dege County", "Derong County", "Ganzi County", "Jiulong County", "Kangding County", "Litang County", "Luhuo County", "Seda County", "Shiqu County", "Township County", "Xinlong County", "Yajiang County", "Luding County"]);
dsy.add("0_24_6", ["Guang'an City", "Huaying City", "Linshui County", "Wusheng County", "Yuechi County"]);
dsy.add("0_24_7", ["Cangxi County", "Guangyuan City", "Jiange County", "Qingchuan County", "Wangcang County"]);
dsy.add("0_24_8", ["Ebian Yi Autonomous County", "Emeishan City", "Jiajiang County", "Jingyan County", "Leshan City", "Mabian Yi Autonomous County", "Muchuan County", "Qianwei County"]);
dsy.add("0_24_9", ["Butuo County", "Dechang County", "Ganluo County", "Huidong County", "Huili County", "Jinyang County", "Leibo County", "Meigu County", "Mianning County", "Muli Tibetan Autonomous County", "Ningnan County", "Puge County", "Xichang City", "Xide County", "Yanyuan County", "Yuexi County", "Zhaojue County"]);
dsy.add("0_24_10", ["Danling County", "Hongya County", "Meishan City", "Pengshan County", "Qingshen County", "Renshou County"]);
dsy.add("0_24_11", ["An County", "Beichuan County", "Jiangyou City", "Mianyang City", "Pingwu County", "Santai County", "Yanting County", "Zitong County"]);
dsy.add("0_24_12", ["Nan County", "Nanchong City", "Peng'an County", "Xichong County", "Yilong County", "Yingshan County", "Langzhong City"]);
dsy.add("0_24_13", ["Longchang County", "Neijiang City", "Weiyuan County", "Zizhong County"]);
dsy.add("0_24_14", ["Miyi County", "Panzhihua City", "Yanbian County"]);
dsy.add("0_24_15", ["Daying County", "Pengxi County", "Shehong County", "Suining City"]);
dsy.add("0_24_16", ["Baoxing County", "Hanyuan County", "Lushan County", "Mingshan County", "Asbestos County", "Tianquan County", "Ya'an City", "Xingjing County"]);
dsy.add("0_24_17", ["Changning County", "Gaoxian", "Jiang'an County", "Nanxi County", "Pingshan County", "Xingwen County", "Yibin City", "Yibin County", "Kunxian County", "Yunlian County"]);
dsy.add("0_24_18", ["Anyue County", "Jianyang City", "Lezhi County", "Ziyang City"]);
dsy.add("0_24_19", ["Fushun County", "Rongxian County", "Zigong City"]);
dsy.add("0_24_20", ["Gulin County", "Hejiang County", "Xuyong County", "Luxian County", "Luzhou City"]);

dsy.add("0_25", ["Jixian", "Jinghai County", "Ninghe County", "Tianjin City"]);
dsy.add("0_25_0", ["", "Jixian", "Jinghai County", "Ninghe County", "Tianjin City"]);
dsy.add("0_26", ["Ali", "Changdu", "Lhasa", "Linzhi", "Naqu", "Shigaze", "Shannan"]);
dsy.add("0_26_0", ["Cuoqin County", "Gar County", "Jianze County", "Geji County", "Pulan County", "Ritu County", "Zada County"]);
dsy.add("0_26_1", ["Basu County", "Bianba County", "Chaya County", "Changdu County", "Dingqing County", "Gongjue County", "Jiangda County", "Liwuqi County", "Luolong County", "Mangkang County", "Zuogong County"]);
dsy.add("0_26_2", ["Dazi County", "Dangxiong County", "Duilong Deqing County", "Lhasa City", "Linzhou County", "Mozhu Gongka County", "Nimu County", "Qushui County"]);
dsy.add("0_26_3", ["Bomi County", "Chayu County", "Gongbu Jiangda County", "Lang County", "Linzhi County", "Milin County", "Metto County"]);
dsy.add("0_26_4", ["Ando County", "Baqing County", "Bango County", "such as County", "Jiali County", "Naqu County", "Nima County", "Nie Rong County", "Shenza County", "Soo County"]);
dsy.add("0_26_5", ["Angren County", "Bailang County", "Dingjie County", "Dingri County", "Gangba County", "Jilong County", "Jiangzi County", "Kangma County", "Lazi County", "Nanmulin County", "Nielam County", "Renbu County", "Zhikaze City", "Saga County", "Saga County", "Xietongmen County", "Yadong County", "Zhongba County"]);
dsy.add("0_26_6", ["Cuomei County", "Cuona County", "Gongga County", "Jiacha County", "Langkazi County", "Longzi County", "Luoza County", "Naidong County", "Qiongjie County", "Qusong County", "Sangri County", "Zhagang County"]);
dsy.add("0_27", ["Aksu", "Alar", "Bayinguoling Mongolian Autonomous Prefecture", "Bortala Mongolian Autonomous Prefecture", "Changji Hui Autonomous Prefecture", "Hami", "Hetian", "Kashi", "Karamay", "Kizil Sukherz Autonomous Prefecture", "Shihezi", "Tumushuk", "Turpan", "Urumqi", "Wujiaqu", "Yili Kazakh Autonomous Prefecture"]);
dsy.add("0_27_0", ["Aksu City", "Avati County", "Baicheng County", "Keping County", "Kuqa County", "Shaya County", "Wensu County", "Wushi County", "Xinhe County"]);
dsy.add("0_27_1", ["Alar City"]);
dsy.add("0_27_2", ["Bohu County", "Hejing County", "Heshuo County", "Korla City", "Luntai County", "Qiamen County", "Ruoqiang County", "Qili County", "Yanqi Hui Autonomous County"]);
dsy.add("0_27_3", ["Bole City", "Jinghe County", "Hot Spring County"]);
dsy.add("0_27_4", ["Changji City", "Fukang City", "Hutubi County", "Jimusar County", "Manas County", "Miquan City", "Muli Kazakh Autonomous County", "Qitai County"]);
dsy.add("0_27_5", ["Barikun Kazakh Autonomous County", "Hami City", "Yiwu County"]);
dsy.add("0_27_6", ["Cele County", "Hetian City", "Hetian County", "Luopu County", "Minfeng County", "Moyu County", "Pishan County", "Yutian County"]);
dsy.add("0_27_7", ["Bachu County", "Kashgar City", "Megati County", "Shache County", "Shufu County", "Shule County", "Tashkurgan Tajik Autonomous County", "Yecheng County", "Yingjisha County", "Yuephu County", "Zepu County", "Jiashi County"]);
dsy.add("0_27_8", ["Karamay City"]);
dsy.add("0_27_9", ["Aheqi County", "Aktao County", "Atushi City", "Wuqia County"]);
dsy.add("0_27_10", ["Shihezi City"]);
dsy.add("0_27_11", ["Tumushuke City"]);
dsy.add("0_27_12", ["Turpan City", "Toxon County", "Shanshan County"]);
dsy.add("0_27_13", ["Urumqi City", "Urumqi County"]);
dsy.add("0_27_14", ["Wujiaqu City"]);
dsy.add("0_27_15", ["AlAlAlAlAlta", "BuBuBuBuBuBuBuBuBuBuBuZiCounty", "BuBuBuBuBuBuBuBuBuChaerXiXiboautonomcount", "ErMincounty", "ErErMincounty", "FuHaifuHaicounty", "Fuyucounty", "Fuyucounty", "GoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoGoHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuHuChecounty", "HuHuHuHuHuHuHuHuHuHu", "JimumumuIraqi", " Ningxian", "Yumin County", "Zhaosu County"]);

dsy.add("0_28", ["Baoshan", "Chuxiong Yi Autonomous Prefecture", "Chuxiong Yi Autonomous Prefecture", "Dali Bai Autonomous Prefecture", "Dali Bai AutoAutoAutonomous PrePrefecture", "Dali Bai Autonomous Prefecture", "Dehong Dahong Dahong Jingpo Jingpo AutoAutonomous Prefecture", "Diqing Tibetan AutoAutonoprefecture", "Honghe Hani Yi AutoAutonomous Prefecture", "Kunming", "Kunming","Lijiang", "Lincang","Lincang","NuNujiang Lili Autonomous PrePrePrefecture","Qujing","Simao","Simao","Wenshan Zhuang AutonoDai Autonomous Prefecture", "Yuxi", "Zhaotong"]);
dsy.add("0_28_0", ["Baoshan City", "Changning County", "Longling County", "Shidian County", "Tengchong County"]);
dsy.add("0_28_1", ["Chuxiong City", "Dayao County", "Lufeng County", "Mouding County", "Nanhua County", "Shuangbai County", "Wuding County", "Yao'an County", "Yongren County", "Yuanmou County"]);
dsy.add("0_28_2", ["Binchuan County", "Dali City", "Eryuan County", "Heqing County", "Jianchuan County", "Midu County", "Nanjian Yi Autonomous County", "Weishan Yi Hui Autonomous County", "Xiangyun County", "Yangli Yi Autonomous County", "Yongping County", "Yunlong County"]);
dsy.add("0_28_3", ["Lianghe County", "Longchuan County", "Luxi City", "Ruili City", "Yingjiang County"]);
dsy.add("0_28_4", ["Deqin County", "Weixi Lisu Autonomous County", "Shangri-la County"]);
dsy.add("0_28_5", ["Gejiu City", "Hekou Yao Autonomous County", "Honghe County", "Jianshui County", "Jinping Miao Yao Dai Autonomous County", "Kaiyuan City", "Luchun County", "Mengzi County", "Maile County", "Pingbian Miao Autonomous County", "Shiping County", "Yuanyang County", "Luxi County"]);
dsy.add("0_28_6", ["Anning City", "Chenggong County", "Fumin County", "Jinning County", "Kunming City", "Luquan Yi and Miao Autonomous County", "Shilin Yi Autonomous County", "Xundian Hui Autonomous County", "Yiliang County", "Songming County"]);
dsy.add("0_28_7", ["Huaping County", "Lijiang City", "Ninglang Yi Autonomous County", "Yongsheng County", "Yulong Naxi Autonomous County"]);
dsy.add("0_28_8", ["Cangyuan Wa Autonomous County", "Fengqing County", "Gengma Dai Wa Autonomous County", "Lincang County", "Shuangjiang Lahu Wa Brong Dai Autonomous County", "Yongde County", "Yunxian County", "Zhenkang County"]);
dsy.add("0_28_9", ["Fugong County", "Dulong Nu Autonomous County of Gongshan", "Pumi Autonomous County of Lanping Bai Nationality", "Lushui County"]);
dsy.add("0_28_10", ["Fuyuan County", "Huize County", "Luliang County", "Luoping County", "Malong County", "Qujing City", "Shizong County", "Xuanwei City", "Zhanyi County"]);
dsy.add("0_28_11", ["Jiangcheng Hani Yi Autonomous County of Jiangcheng", "Jingdong Yi Autonomous County", "Jingguyi Yi Autonomous County", "Jingguyi Yi Autonomous County", "Lancanglalalahu Lahu Autonomous County", "Lahu Autonomous County of Hani Nationality"]);
dsy.add("0_28_12", ["Funing County", "Guangnan County", "Malipo County", "Maguan County", "Qiubei County", "Wenshan County", "Xichou County", "Yanshan County"]);
dsy.add("0_28_13", ["Jinghong City", "Menghai County", "Mengla County"]);
dsy.add("0_28_14", ["Chengjiang County", "Emshan Yi Autonomous County", "Huaning County", "Jiangchuan County", "Tonghai County", "Xinping Yi Autonomous County", "Yimen County", "Yuxi City", "Yuanjiang Hani Yi Autonomous County"]);
dsy.add("0_28_15", ["Daguan County", "Ludian County", "Qiaojia County", "Shuifu County", "Suijiang County", "Weixin County", "Yanjin County", "Yi Liang County", "Yongshan County", "Zhaotong City", "Zhenxiong County"]);
dsy.add("0_29", ["Hangzhou", "Huzhou", "Jiaxing", "Jinhua", "Lishui", "Ningbo", "Shaoxing", "Taizhou", "Wenzhou", "Zhoushan", "Quzhou"]);
dsy.add("0_29_0", ["Chun'an County", "Fuyang City", "Hangzhou", "Jiande City", "Lin'an City", "Tonglu County"]);
dsy.add("0_29_1", ["Anji County", "Changxing County", "Deqing County", "Huzhou City"]);
dsy.add("0_29_2", ["Haining City", "Haiyan County", "Jiashan County", "Jiaxing City", "Pinghu City", "Tongxiang City"]);
dsy.add("0_29_3", ["Dongyang City", "Jinhua City", "Lanxi City", "Pan'an County", "Pujiang County", "Wuyi County", "Yiwu City", "Yongkang City"]);
dsy.add("0_29_4", ["Jingning She Autonomous County", "Lishui City", "Longquan City", "Qingtian County", "Qingyuan County", "Songyang County", "Suichang County", "Yunhe County", "Jinyun County"]);
dsy.add("0_29_5", ["Cixi City", "Fenghua City", "Ningbo City", "Ninghai County", "Xiangshan County", "Yuyao City"]);
dsy.add("0_29_6", ["Shangyu City", "Shaoxing City", "Shaoxing County", "Xinchang County", "Zhuji City", "Shengzhou City"]);
dsy.add("0_29_7", ["Linhai City", "Sanmen County", "Taizhou City", "Tiantai County", "Wenling City", "Xianju County", "Yuhuan County"]);
dsy.add("0_29_8", ["Cangnan County", "Dongtou County", "Yueqing City", "Pingyang County", "Ruian City", "Taishun County", "Wenzhou City", "Wencheng County", "Yongjia County"]);
dsy.add("0_29_9", ["Zhoushan City", "Daishan County", "Shengsi County"]);
dsy.add("0_29_10", ["Changshan County", "Jiangshan City", "Kaihua County", "Longyou County", "Quzhou City"]);
dsy.add("0_30", ["Chongqing", "Shapingba", "Yuzhong", "Yuzhong", "Jiangbei", "Jiangbei", "Jiangbei", "South Bank", "Jiulongpo", "Dadukokokou", "Yubei", "Yubei", "Beibei", "Wansheng", "Wansheng", "Wansheng", "Shuangqiao", "Shuangqiao", "Banan", "Wanzhou", "Wanzhou", "Fuling", "Qianjiang", "Qianjiang", "LongShouShou", "Chengkou County", "Chengkou County", "Dazu County", "Yuzhong County", "Yuzhong", "Fengdu County", "Jiangjin City, Kaixian County, Liangping County", "Nanchuan City and Pengshui Miao Tujia Autonomous County", "Rongchang County", "Shizhu Tujia Autonomous County", "Tongliang County", "Wushan County", "Wuxi County", "Wulong County", "Xiushan Tujia and Miao Autonomous County", "Yongchuan City", "Youyang Tujia and Miao Autonomous County", "Yunyang County", "Zhongxian County", "Tongnan County", "Bishan County", "Qijiang County"]);
dsy.add("0_30_0", ["CheCheCheCheCheChemouth County", "DafootCounty", "DaDaDaDaDaDaDaDaDaJiangcounty", "FenFendu County", "FenFenfefefefefefefefecounty", "HeSichuan City", "Jiangjin city", "Kaicounty", "LiaLiaLiangPing county", "NanSichuan City", "NanSichuan City", "PenshshshPenShuMiMiMiTuTuTuMinMinMinMinMinMinAutoAutoAutoAutoAutocounty", "ronronronronronronronronronronronron", "ronronronronronronronronronronronronronronronterterterterterterterterterterterterstone stone TutututututututututututututututututututututututututuEthnic Self", "Governing County", "Yunyang County", "Zhongxian County", "Chongqing City", "Tongnan County", "Bishan County", "Qijiang County"]);
var s = ["province", "city", "county"];
var opt0 = ["please choose provinces", "please choose prefecture-level cities", "please choose city, county-level cities and counties"];

function setup() {
    for (i = 0; i < s.length - 1; i++)
        document.getElementById(s[i]).onchange = new Function("change(" + (i + 1) + ")");
    change(0);
}