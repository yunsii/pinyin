var n=Object.prototype.hasOwnProperty,i=Object.getOwnPropertySymbols,e=Object.prototype.propertyIsEnumerable,a=Object.assign;import{r as t,c as u,u as h,a as o,T as s,b as r,I as c,S as g,B as y,R as l,d as p}from"./vendor.1c7a26e2.js";!function(n=".",i="__import__"){try{self[i]=new Function("u","return import(u)")}catch(e){const a=new URL(n,location),t=n=>{URL.revokeObjectURL(n.src),n.remove()};self[i]=n=>new Promise(((e,u)=>{const h=new URL(n,a);if(self[i].moduleMap[h])return e(self[i].moduleMap[h]);const o=new Blob([`import * as m from '${h}';`,`${i}.moduleMap['${h}']=m;`],{type:"text/javascript"}),s=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){u(new Error(`Failed to import: ${n}`)),t(s)},onload(){e(self[i].moduleMap[h]),t(s)}});document.head.appendChild(s)})),self[i].moduleMap={}}}("/pinyin/assets/");var z,m,d,x;(m=z||(z={})).a="a",m.o="o",m.e="e",m.i="i",m.u="u",m.v="v",m.ai="ai",m.ei="ei",m.ui="ui",m.ao="ao",m.ou="ou",m.iu="iu",m.ie="ie",m.ve="ve",m.er="er",m.an="an",m.en="en",m.in="in",m.un="un",m.vn="vn",m.ang="ang",m.eng="eng",m.ing="ing",m.ong="ong",m.b="b",m.p="p",m.m="m",m.f="f",m.d="d",m.t="t",m.n="n",m.l="l",m.g="g",m.k="k",m.h="h",m.j="j",m.q="q",m.x="x",m.z="z",m.c="c",m.s="s",m.zh="zh",m.ch="ch",m.sh="sh",m.r="r",m.y="y",m.w="w",m.zhi="zhi",m.chi="chi",m.shi="shi",m.ri="ri",m.zi="zi",m.ci="ci",m.si="si",m.yi="yi",m.wu="wu",m.yu="yu",m.ye="ye",m.yue="yue",m.yuan="yuan",m.yin="yin",m.yun="yun",m.ying="ying",(x=d||(d={})).a="a",x.o="o",x.e="e",x.i="i",x.u="u",x.v="v",x.ai="ai",x.ei="ei",x.ui="ui",x.ao="ao",x.ou="ou",x.iu="iu",x.ie="ie",x.ve="ve",x.an="an",x.en="en",x.in="in",x.un="un",x.vn="vn",x.ang="ang",x.eng="eng",x.ing="ing",x.ong="ong",x.b="b",x.p="p",x.m="m",x.f="f",x.d="d",x.t="t",x.n="n",x.l="l",x.g="g",x.k="k",x.h="h",x.j="j",x.q="q",x.x="x",x.z="z",x.c="c",x.s="s",x.zh="zh",x.ch="ch",x.sh="sh",x.r="r",x.y="y",x.w="w",x.ua="ua",x.uai="uai",x.uan="uan",x.uang="uang",x.ue="ue",x.uo="uo",x.ia="ia",x.iao="iao",x.ian="ian",x.iang="iang",x.iong="iong";const _=[d.b,d.p,d.m,d.f,d.d,d.t,d.n,d.l,d.g,d.k,d.h,d.j,d.q,d.x,d.z,d.c,d.s,d.zh,d.ch,d.sh,d.r,d.y,d.w];var b,f;(f=b||(b={})).a="a",f.ai="ai",f.an="an",f.ang="ang",f.ao="ao",f.e="e",f.ei="ei",f.en="en",f.eng="eng",f.er="er",f.o="o",f.ou="ou";var v,j,w={type:"QuanPin",displayName:"全拼",map:z};class k{constructor(){this.quanPinSchema=w,this.shuangPinSchemas=[]}static getShengmu(n){const i=n.slice(0,2);return _.includes(i)?i:_.includes(n.charAt(0))?n.charAt(0):void 0}getPinyin(n,i){if("QuanPin"===n)return i;const e=this.getShuangPinSchema(n),a=k.getShengmu(i);return a?[e.map[a],e.map[i.replace(a,"")]].join(""):e.patchMap[i]}register(n){n&&n.type&&(this.shuangPinSchemas.some((({type:i})=>i===n.type))||this.shuangPinSchemas.push(n))}getQuanPinSchema(){return this.quanPinSchema}getShuangPinSchema(n){return this.shuangPinSchemas.find((({type:i})=>i===n))}getShemaOptions(){return[{type:this.quanPinSchema.type,displayName:this.quanPinSchema.displayName},...this.shuangPinSchemas.map((n=>({type:n.type,displayName:n.displayName})))]}}(j=v||(v={})).Mark="Mark",j.Hanzi="Hanzi";class q{constructor(){this.texts=[]}register(n){this.texts.some((({key:i})=>i===n.key))||this.texts.push(n)}load(n){const i=n.content.replace(/[ \n]/g,"").split("").filter(Boolean),e=n.pinyin.replace(/[\n]/g," ").split(/ /g).filter(Boolean),a=[];e.forEach(((n,e)=>{/^[a-z]+$/.test(n.toLowerCase())?a.push({type:v.Hanzi,char:i[e],quanpin:n}):a.push({type:v.Mark,char:i[e]})})),this.register({key:n.key,title:n.title,text:a})}getTextConfig(n){return this.texts.find((({key:i})=>i===n))}getTextOptions(){return this.texts.map((n=>({key:n.key,title:n.title})))}}const E=class{};let S=E;S.schema=new k,S.text=new q,S.reinitialize=()=>{E.schema=new k,E.text=new q};var N={hero:"_hero_gclx1_1",pinyin:"_pinyin_gclx1_6",error:"_error_gclx1_21",captialized:"_captialized_gclx1_27",line:"_line_gclx1_33",line1:"_line-1_gclx1_37",line4:"_line-4_gclx1_38",line2:"_line-2_gclx1_41",line3:"_line-3_gclx1_42",char:"_char_gclx1_57",charInputed:"_char-inputed_gclx1_60",cursor:"_cursor_gclx1_68",blink:"_blink_gclx1_1",emptyContentCursor:"_empty-content-cursor_gclx1_80"};function H(n){const{original:i="",modified:e="",capitalized:a=!0,cursor:h=!1,style:o,className:s}=n,r=t.useMemo((()=>{const n=e.length-1;if(i)return t.createElement("div",{className:u({[N.pinyin]:!0,[N.captialized]:!!i.charAt(1)&&a})},i.split("").map(((a,o)=>t.createElement("span",{key:o,className:u({[N.char]:!0,[N.charInputed]:o<=n,[N.error]:e[o]&&i[o]!==e[o],[N.cursor]:h&&n===o,[N.emptyContentCursor]:h&&-1===n&&0===o})},a))))}),[i,e,h]);return t.createElement("div",{className:u(N.hero,s),style:o},new Array(4).fill(0).map(((n,i)=>t.createElement("div",{key:i,className:u(N.line,N[`line${i+1}`])}))),r)}var P="_container_kngxs_1",M="_hero_kngxs_5",C="_input-container_kngxs_9",O="_dummy-input_kngxs_25";function L(n){const{original:i,capitalized:e=!0}=n,[a,u]=h(n,{valuePropName:"modified"}),[s,{toggle:r}]=o(!1);return t.createElement("div",{className:P},t.createElement("div",{className:M},t.createElement("div",{className:C},t.createElement("input",{value:a,onChange:n=>((n="")=>{i&&i.length>=n.length&&u(n.toLowerCase())})(n.target.value),onFocus:()=>r(),onBlur:()=>r()})),t.createElement(H,{capitalized:e,original:i,modified:a,cursor:s,className:O})))}var B="_container_zyn3r_1",R="_char_zyn3r_12";function U(u){const{char:h}=u,o=((a,t)=>{var u={};for(var h in a)n.call(a,h)&&t.indexOf(h)<0&&(u[h]=a[h]);if(null!=a&&i)for(var h of i(a))t.indexOf(h)<0&&e.call(a,h)&&(u[h]=a[h]);return u})(u,["char"]);return t.createElement("div",{className:B},t.createElement(s,{className:R},h),t.createElement(L,a({},o)))}S.schema.register({type:"XianHe",displayName:"小鹤双拼",map:{[d.a]:"a",[d.o]:"o",[d.e]:"e",[d.i]:"i",[d.u]:"u",[d.v]:"v",[d.ai]:"d",[d.ei]:"w",[d.ui]:"v",[d.ao]:"c",[d.ou]:"z",[d.iu]:"q",[d.ie]:"p",[d.ve]:"t",[d.an]:"j",[d.en]:"f",[d.in]:"b",[d.un]:"y",[d.vn]:"y",[d.ang]:"h",[d.eng]:"g",[d.ing]:"k",[d.ong]:"s",[d.b]:"b",[d.p]:"p",[d.m]:"m",[d.f]:"f",[d.d]:"d",[d.t]:"t",[d.n]:"n",[d.l]:"l",[d.g]:"g",[d.k]:"k",[d.h]:"h",[d.j]:"j",[d.q]:"q",[d.x]:"x",[d.z]:"z",[d.c]:"c",[d.s]:"s",[d.zh]:"v",[d.ch]:"i",[d.sh]:"u",[d.r]:"r",[d.y]:"y",[d.w]:"w",[d.ua]:"x",[d.uai]:"k",[d.uan]:"r",[d.uang]:"l",[d.ue]:"t",[d.uo]:"o",[d.ia]:"x",[d.iao]:"n",[d.ian]:"m",[d.iang]:"l",[d.iong]:"s"},patchMap:{[b.a]:"aa",[b.ai]:"ai",[b.an]:"an",[b.ang]:"ah",[b.ao]:"ao",[b.e]:"ee",[b.ei]:"ei",[b.en]:"en",[b.eng]:"eg",[b.er]:"er",[b.o]:"oo",[b.ou]:"ou"}}),S.text.load({key:"ChuShiBian",title:"出师表",content:"先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。\n\n  　　宫中府中，俱为一体；陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。\n  \n  　　侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。\n  \n  　　将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。\n  \n  　　亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。\n  \n  　　臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。\n  \n  　　先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。\n  \n  　　愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。今当远离，临表涕零，不知所言。",pinyin:"xian di chuang ye wei ban er zhong dao beng cu ， jin tian xia san fen ， yi zhou pi bi ， ci cheng wei ji cun wang zhi qiu ye 。 ran shi wei zhi chen bu xie yu nei ， zhong zhi zhi shi wang shen yu wai zhe ， gai zhui xian di zhi shu yu ， yu bao zhi yu bi xia ye 。 cheng yi kai zhanɡ sheng ting ， yi guang xian di yi de ， hui hong zhi shi zhi qi ， bu yi wang zi fei bo ， yin yu shi yi ， yi sai zhong jian zhi lu ye 。 \n\n  　 　 gong zhong fu zhong ， ju wei yi ti ； zhi fa zang pi ， bu yi yi tong 。 re you zuo jian fan ke ji wei zhong shan zhe ， yi fu you si lun qi xinɡ shanɡ ， yi zhao bi xia ping ming zhi li ， bu yi pian si ， shi nei wai yi fa ye 。 \n  \n  　 　 shi zhong 、 shi lang guo you zhi 、 fei yi 、 dong yun deng ， ci jie liang shi ， zhi lv zhong chun ， shi yi xian di jian ba yi wei bi xia 。 yu yi wei gong zhong zhi shi ， shi wu da xiao ， xi yi zi zhi ， ran hou shi xing ， bi neng bi bu que lou ， you suo guang yi 。 \n  \n  　 　 jiang jun xiang chong ， xing xing shu jun ， xiao chang jun shi ， shi yong yu xi ri ， xian di chen zhi yue neng ， shi yi zhong yi ju chong wei du 。 yu yi wei ying zhong zhi shi ， xi yi zi zhi ， bi neng shi hang zhen he mu ， you lie de suo 。 \n  \n  　 　 qin xian chen ， yuan xiao ren ， ci xian han suo yi xing long ye ； qin xiao ren ， yuan xian chen ， ci hou han suo yi qing tui ye 。 xian di zai shi ， mei yu chen lun ci shi ， wei chang bu tan xi tong hen yu huan 、 ling ye 。 shi zhong 、 shang shu 、 zhang shi 、 can jun ， ci xi zhen liang si jie zhi chen ， yuan bi xia qin zhi xin zhi ， ze han shi zhi long ， ke ji ri er dai ye 。 \n  \n  　 　 chen ben bu yi ， gong geng yu nan yang ， gou quan xing ming yu luan shi ， bu qiu wen da yu zhu hou 。 xian di bu yi chen bei bi ， wei zi wang qu ， san gu chen yu cao lu zhi zhong ， zi chen yi dang shi zhi shi ， you shi gan ji ， sui xu xian di yi qu chi 。 hou zhi qinɡ fu ， shou ren yu bai jun zhi ji ， feng ming yu wei nan zhi jian ， er lai er shi you yi nian yi 。 \n  \n  　 　 xian di zhi chen jin shen ， gu lin beng ji chen yi da shi ye 。 shou minɡ yi lai ， su ye you tan ， kong tuo fu bu xiao ， yi shang xian di zhi ming ； gu wu yue du lu ， shen ru bu mao 。 jin nan fang yi ding ， bing jia yi zu ， dang jiang lv san jun ， bei ding zhong yuan ， shu jie nu dun ， ranɡ chu jian xionɡ ， xing fu han shi ， hai yu jiu du 。 ci chen suo yi bao xian di er zhong bi xia zhi zhi fen ye 。 zhi yu zhen zhuo sun yi ， jin jin zhong yan ， ze you zhi 、 yi 、 yun zhi ren ye 。 \n  \n  　 　 yuan bi xia tuo chen yi tao zei xing fu zhi xiao ， bu xiao ， ze zhi chen zhi zui ， yi gao xian di zhi ling 。 re mo xing de zhi yan ， ze ze you zhi 、 yi 、 yun deng zhi man ， yi zhang ji jiu ； bi xia yi yi zi mou ， yi zi zou shan dao ， cha na ya yan ， shen zhui xian di yi zhao 。 chen bu sheng shou en gan ji 。 jin dang yuan li ， lin biao ti ling ， bu zhi suo yan 。 "}),S.text.register({key:"HelloWorld",title:"你好，世界！",text:[{type:v.Hanzi,char:"你",quanpin:"ni"},{type:v.Hanzi,char:"好",quanpin:"hao"},{type:v.Mark,char:"，"},{type:v.Hanzi,char:"世",quanpin:"shi"},{type:v.Hanzi,char:"界",quanpin:"jie"},{type:v.Mark,char:"！"}]}),S.text.register({key:"Saying",title:"名人名言",text:[{type:v.Hanzi,char:"天",quanpin:"tian"},{type:v.Hanzi,char:"行",quanpin:"xing"},{type:v.Hanzi,char:"健",quanpin:"jian"},{type:v.Mark,char:"，"},{type:v.Hanzi,char:"君",quanpin:"jun"},{type:v.Hanzi,char:"子",quanpin:"zi"},{type:v.Hanzi,char:"以",quanpin:"yi"},{type:v.Hanzi,char:"自",quanpin:"zi"},{type:v.Hanzi,char:"强",quanpin:"qiang"},{type:v.Hanzi,char:"不",quanpin:"bu"},{type:v.Hanzi,char:"息",quanpin:"xi"},{type:v.Mark,char:"。"}]});var $="_app_1ynn2_1",I="_menu_1ynn2_9";function T(){var n,i;const e=S.schema.getShemaOptions(),a=S.text.getTextOptions(),[u,h]=r("schema-type",null==(n=null==e?void 0:e[0])?void 0:n.type),[o,s]=r("text-key",null==(i=null==a?void 0:a[0])?void 0:i.key),[p,z]=r("current-index",0),[m,d]=t.useState(""),x=t.useMemo((()=>S.text.getTextConfig(o)),[o]),_=t.useMemo((()=>{const n=null==x?void 0:x.text.filter((n=>n.type===v.Hanzi));return null==n?void 0:n[p%(null==n?void 0:n.length)]}),[x,p]),b=t.useMemo((()=>{if(_)return S.schema.getPinyin(u,_.quanpin)}),[_,u]);return t.useEffect((()=>{m&&m===b&&(z((n=>n+1)),d(""))}),[b,m]),t.createElement("div",{className:$},t.createElement("div",null,t.createElement(U,{char:_.char,original:b,modified:m,onChange:n=>d(n)})),t.createElement("div",{className:I},t.createElement(c.Group,{compact:!0},t.createElement(g,{style:{width:100},options:e.map((n=>({value:n.type,label:n.displayName}))),placeholder:"拼写方案",value:u,onChange:n=>h(n)}),t.createElement(g,{style:{width:130},options:a.map((n=>({value:n.key,label:n.title}))),placeholder:"拼写模板",value:o,onChange:n=>{z(0),s(n)}}),t.createElement(y,{onClick:()=>{z(0),d("")},icon:t.createElement(l,null)}))))}p.render(t.createElement(t.StrictMode,null,t.createElement(T,null)),document.getElementById("root"));