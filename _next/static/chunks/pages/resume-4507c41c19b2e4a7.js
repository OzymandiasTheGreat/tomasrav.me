(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[647],{57559:function(e,t,a){var i=a(46594),r=a(57986);e.exports={translations:{en:i,lt:r},defaultLang:"en",useBrowserDefault:!0}},95702:function(e,t,a){"use strict";var i=a(57423),r=a(41664),o=a(37039),n=a(42035),s=a(82898),l=a(86151),u=a(8849),c=a.n(u),m=a(55317),d=a(76315);i.default.createElement;t.Z=function(){var e=(0,o.$G)().t,t=(0,o.cQ)().query;return i.default.createElement(n.$_,{style:{alignItems:"center",justifyContent:"space-around",width:"100%",height:250,backgroundColor:(0,d.b9)(d.QO,.75),paddingVertical:45}},i.default.createElement(s.P,{style:[d.qN,{color:d.ko}]},e("footer.license"),i.default.createElement(l.A,{href:"https://creativecommons.org/licenses/by/4.0/",style:[d.P6]},"CC-BY 4.0")),i.default.createElement(s.P,{style:[d.qN,{color:d.ko}]},i.default.createElement(c(),{path:m.z$U,color:d.ko,size:"24px",title:"Copyright",style:{verticalAlign:"middle",marginRight:15}}),e("footer.copyright")),i.default.createElement(s.P,{style:[d.qN,{color:d.ko}]},i.default.createElement(r.default,{passHref:!0,href:{pathname:"/credits",query:t}},i.default.createElement(l.A,{style:[d.P6]},e("footer.third-party")))))}},12002:function(e,t,a){"use strict";var i=a(59499),r=a(57423),o=a(43745),n=a(13006),s=a(41664),l=a(11163),u=a(37039),c=a(42035),m=a(86151),d=a(8849),h=a.n(d),p=a(55317),y=a(57559),g=a(76315);r.default.createElement;function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(Object(a),!0).forEach((function(t){(0,i.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var k={lt:"\ud83c\uddf1\ud83c\uddf9",en:"\ud83c\uddfa\ud83c\uddf8"},w=o.Z.createAnimatedComponent(c.h4),v=o.Z.createAnimatedComponent(h());t.Z=function(e){var t=e.setter,a=(0,l.useRouter)(),i=(0,u.cQ)().query,c=(0,u.gE)().lang,d=(0,r.useRef)(new o.Z.Value(0)).current,h=d.interpolate({inputRange:[0,1],outputRange:[g.ko,g.tR]}),f=(0,r.useRef)(new o.Z.Value(0)).current,S=f.interpolate({inputRange:[0,1],outputRange:[g.tR+"00",g.ko+"dd"]}),E=(0,r.useCallback)((function(e){(null==e?void 0:e.y)>=0&&(null==e?void 0:e.y)<=512&&(o.Z.timing(d,{toValue:Math.min(e.y,256)/256,duration:50,useNativeDriver:!1}).start(),o.Z.timing(f,{toValue:Math.min(e.y,256)/256,duration:50,useNativeDriver:!1}).start())}),[d,f]);return(0,r.useEffect)((function(){return t(E)}),[t,E]),r.default.createElement(w,{nativeID:"header",style:{backgroundColor:S,flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:20,height:48}},r.default.createElement(n.Z,{style:{flexDirection:"row",alignItems:"center",justifyContent:"space-around",width:32}},"/"!==a.pathname&&r.default.createElement(s.default,{passHref:!0,href:{pathname:"/",query:b(b({},i),{},{lang:c})}},r.default.createElement(m.A,null,r.default.createElement(v,{path:p.J3k,size:"24px",title:"Go back",style:{color:h}})))),r.default.createElement(n.Z,{style:{flexDirection:"row",alignItems:"center",justifyContent:"space-around",width:64}},Object.keys(y.translations).map((function(e){return r.default.createElement(s.default,{key:e,passHref:!0,href:{query:b(b({},i),{},{lang:e})}},r.default.createElement(m.A,{style:{fontSize:24}},k[e]))}))))}},29006:function(e,t,a){"use strict";a.r(t),a.d(t,{__N_SSG:function(){return P}});var i=a(59499),r=a(57423),o=a(86478),n=a(10078),s=a(88241),l=a(90548),u=a(42355),c=a(13006),m=a(74520),d=a(42035),h=a(86151),p=a(87060),y=a(82898),g=a(8849),f=a.n(g),b=a(55317),k=a(37039),w=a(30402),v=a(12002),S=a(95702),E=a(76315);r.default.createElement;function j(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function T(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?j(Object(a),!0).forEach((function(t){(0,i.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):j(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var R=u.Z.create({contactLink:{width:48,height:48,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:E.ko,borderRadius:"50%"}}),P=!0;t.default=function(e){var t=e.body,a=(0,o.Z)().width,i=(0,r.useState)(),u=i[0],g=i[1],j=(0,k.$G)().t,P=(0,k.gE)().lang,O=(0,r.useRef)({offset:{dir:0,x:0,y:0},callback:function(){}});return(0,r.useEffect)((function(){g({container:{width:a<600?"95%":"80%",paddingVertical:a<600?32:64,marginVertical:a<600?50:200},contact:{width:a<600?320:600,right:a<800?"-3%":"-13%"},article:{width:a<600?"95%":"80%",tableWidth:a<600?Math.floor(.9*a):Math.floor(.6*(a-200))},skewX:a<600?"0deg":a<1e3?1.5*Math.floor(a/360)+"deg":2*Math.floor(a/360)+"deg"})}),[a]),r.default.createElement(s.Z,{nativeID:"resume-container",style:{flex:1}},r.default.createElement(l.Z,{stickyHeaderIndices:[0],onScroll:function(e){O.current.offset=T(T({},e.nativeEvent.contentOffset),{},{dir:e.nativeEvent.contentOffset.y-O.current.offset.y}),O.current.callback(O.current.offset)},scrollEventThrottle:100},r.default.createElement(v.Z,{setter:function(e){return O.current.callback=e}}),r.default.createElement(c.Z,{style:{backgroundColor:(0,E.b9)(E.ko,.75),width:null==u?void 0:u.container.width,paddingVertical:null==u?void 0:u.container.paddingVertical,marginVertical:null==u?void 0:u.container.marginVertical,alignSelf:"center",transform:[{perspective:1e3},{skewX:""+(null==u?void 0:u.skewX)}]}},r.default.createElement(d.xN,{nativeID:"display-contact",style:{flexDirection:"row",alignItems:"center",justifyContent:"space-around",width:null==u?void 0:u.contact.width,position:"absolute",top:"-10vw",right:null==u?void 0:u.contact.right,transform:[{perspective:1e3},{skewX:"-"+(null==u?void 0:u.skewX)}]}},r.default.createElement(h.A,{style:R.contactLink,onPress:function(){return(0,m.tg)({})}},r.default.createElement(f(),{path:b.S0t,size:"32px",color:E.tR,title:j("resume.contact.print")})),r.default.createElement(h.A,{href:j("resume.contact.gmail.href"),style:R.contactLink},r.default.createElement(f(),{path:b.yyN,size:"32px",color:E.tR,title:j("resume.contact.gmail.title")})),r.default.createElement(h.A,{href:j("resume.contact.whatsapp.href"),style:R.contactLink},r.default.createElement(f(),{path:b.Sj1,size:"32px",color:E.tR,title:j("resume.contact.whatsapp.title")})),r.default.createElement(h.A,{href:j("resume.contact.fb.href"),style:R.contactLink},r.default.createElement(f(),{path:b.y2L,size:"32px",color:E.tR,title:j("resume.contact.fb.title")})),r.default.createElement(h.A,{href:j("resume.contact.gh.href"),style:R.contactLink},r.default.createElement(f(),{path:b.LcO,size:"32px",color:E.tR,title:j("resume.contact.gh.title")})),r.default.createElement(n.Z,{accessibilityLabel:j("resume.contact.fullname"),source:{uri:"/profile/7.jpg",width:256,height:256},resizeMode:"contain",style:{width:"20vw",height:"20vw",borderRadius:"50%",borderColor:E.ko,borderWidth:8}})),r.default.createElement(d.or,{style:{width:null==u?void 0:u.article.width,maxWidth:800,alignSelf:"center",transform:[{perspective:1e3},{skewX:"-"+(null==u?void 0:u.skewX)}]}},r.default.createElement(d.xN,{nativeID:"print-contact",style:{display:"none",paddingVertical:10,paddingHorizontal:15,borderRadius:3,borderColor:(0,E.b9)(E.tR,.75),borderWidth:1,margin:20}},r.default.createElement(c.Z,null,r.default.createElement("img",{id:"print-avatar",src:"/profile/7.jpg",style:{width:"256px",height:"256px",objectFit:"cover"}}),r.default.createElement(h.A,{style:[E.$9,E.qN,{fontSize:14,marginVertical:5}]},r.default.createElement(f(),{path:b.yyN,size:"24px",color:E.tR,style:{verticalAlign:"middle"}}),j("resume.contact.gmail.mail")),r.default.createElement(h.A,{style:[E.$9,E.qN,{fontSize:14,marginVertical:5}]},r.default.createElement(f(),{path:b.Sj1,size:"24px",color:E.tR,style:{verticalAlign:"middle"}}),j("resume.contact.whatsapp.href")),r.default.createElement(h.A,{style:[E.$9,E.qN,{fontSize:14,marginVertical:5}]},r.default.createElement(f(),{path:b.y2L,size:"24px",color:E.tR,style:{verticalAlign:"middle"}}),j("resume.contact.fb.href")),r.default.createElement(h.A,{style:[E.$9,E.qN,{fontSize:14,marginVertical:5}]},r.default.createElement(f(),{path:b.LcO,size:"24px",color:E.tR,style:{verticalAlign:"middle"}}),j("resume.contact.gh.href")))),r.default.createElement(w.U,{source:{ast:t[P]},fontMap:{normal:E.m7,bold:E.m7,italic:E.m7,monospace:E.T1},pStyle:T({},E.qN),hStyle:{fontFamily:E.JR},tableStyle:{width:null==u?void 0:u.article.tableWidth,color:E.tR,borderWidth:2,paddingVertical:10,paddingHorizontal:15}}),r.default.createElement(p.H2,{style:[E.hm]},j("resume.tech-stack.title")),r.default.createElement(y.P,{style:[E.qN]},j("resume.tech-stack.intro")),r.default.createElement(y.P,{nativeID:"tech-stack",style:{textAlign:"center"}},r.default.createElement(w.U,{source:{ast:t.tech},style:{width:null==u?void 0:u.article.width},fontMap:{normal:E.m7,bold:E.m7,italic:E.m7,monospace:E.T1}})))),r.default.createElement(S.Z,null)))}},47878:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/resume",function(){return a(29006)}])},24654:function(){},46594:function(e){"use strict";e.exports=JSON.parse('{"bubbles":{"greeting":"*Hello, there!* My name is Tomas and I **code**.","location":"I\'m from Kaunas, Lithuania \ud83c\uddf1\ud83c\uddf9, Northern Europe","github":{"releases":"My releases on [Github](https://github.com/OzymandiasTheGreat) have been downloaded over **{{ count }} times**.","stars":"My projects on [Github](https://github.com/OzymandiasTheGreat) collectively have over **{{ count }} stars**"},"packages":{"npm":"My packages on [npm](https://www.npmjs.com/~ozymandiasthegreat) have been downloaded over **{{ count }} times** this month.","pypi":"My packages on [PyPI](https://pypi.org/user/OzymandiasTheGreat/) have been downloaded over **{{ count }} times** this month."},"weather":{"10":"Chilly, **{{ temp }}**, won\'t get out, unless necessary. ","20":"**{{ temp }}**, could be warmer. ","25":"**{{ temp }}** - not too hot, not too cold. ","-10":"**{{ temp }}!** It\'s freezing over here! ","-0":"Pretty cold, **{{ temp }}**. Staying home a long time. ","+25":"Hot! **{{ temp }}** and I\'m melting..."},"weather-0":{"Unknown":"","Cloudy":"And it\'s all gray...","Fog":"There\'s also a gray wall outside my window.","HeavyRain":"So wet outside.","HeavyShowers":"So wet outside.","LightRain":"So wet outside.","LightShowers":"So wet outside.","ThunderyHeavyRain":"So wet outside.","ThunderyShowers":"So wet outside.","HeavySnow":"Pretty outside, unless you drive.","HeavySnowShowers":"Pretty outside, unless you drive.","LightSnow":"Pretty outside, unless you drive.","LightSnowShowers":"Pretty outside, unless you drive.","ThunderySnowShowers":"Pretty outside, unless you drive.","LightSleet":"Rain and snow, I don\'t like this at all","LightSleetShowers":"Rain and snow, I don\'t like this at all","PartlyCloudy":"I can see the sun! Sort of.","Sunny":"At least it\'s dry.","VeryCloudy":"All the clouds make it feel like a polar night..."},"weather10":{"Unknown":"","Cloudy":"Could be brighter as well.","PartlyCloudy":"Could be brighter as well.","VeryCloudy":"Could be brighter as well.","Fog":"Could be brighter as well.","HeavyRain":"All this moisture is annoying.","HeavyShowers":"All this moisture is annoying.","LightRain":"All this moisture is annoying.","LightShowers":"All this moisture is annoying.","ThunderyHeavyRain":"All this moisture is annoying.","ThunderyShowers":"All this moisture is annoying.","HeavySnow":"The snow would be pretty, but it won\'t last.","HeavySnowShowers":"The snow would be pretty, but it won\'t last.","LightSnow":"The snow would be pretty, but it won\'t last.","LightSnowShowers":"The snow would be pretty, but it won\'t last.","ThunderySnowShowers":"The snow would be pretty, but it won\'t last.","LightSleet":"The roads must be so slippery...","LightSleetShowers":"The roads must be so slippery...","Sunny":"It *looks* pretty nice outside, but I ain\'t no fool!"},"weather+25":{"Unknown":"","Cloudy":"Without the sun, it\'s almost bearable.","PartlyCloudy":"Without the sun, it\'s almost bearable.","VeryCloudy":"Without the sun, it\'s almost bearable.","Fog":"I actually like summer fog, but I don\'t drive.","HeavyRain":"Refreshing!","HeavyShowers":"Refreshing!","LightRain":"Refreshing!","LightShowers":"Refreshing!","ThunderyHeavyRain":"Refreshing!","ThunderyShowers":"Refreshing!","Sunny":"The sun is scorching though."},"fun":{"intro":"Fun fact: ","facts":{"cats":"I live with two cats! One white, one black.","flowers":"I grow roses and carnations on my windowsill.","cook":"I *cook*! My Magnum Opus is probably **Cream Puffs**"}},"time":{"0":"**{{ time }}** - Probably sleeping, but I still sometimes get calls at this hour","1":"**{{ time }}** - Sleeping","2":"**{{ time }}** - Sleeping","3":"**{{ time }}** - Sleeping","4":"**{{ time }}** - Good morning! Early bird gets the worm!","5":"**{{ time }}** - Time to start working!","6":"**{{ time }}** - I\'m quite productive in the mornings.","7":"**{{ time }}** - Coffee break","8":"**{{ time }}** - I can still get some work done before the m\xe9nage gets up","9":"**{{ time }}** - Time to wake the m\xe9nage","10":"**{{ time }}** - Back to work","11":"**{{ time }}** - Up up and away he codes","12":"**{{ time }}** - Coffee break","13":"**{{ time }}** - About time to do start test/debug ritual","14":"**{{ time }}** - Yeah, I need more coffee","15":"**{{ time }}** - Working","16":"**{{ time }}** - Working","17":"**{{ time }}** - Getting ready to wrap up for the day","18":"**{{ time }}** - Final cup of Joe","19":"**{{ time }}** - Time to find entertainment","20":"**{{ time }}** - Enough entertainment, let\'s see if there\'s some work I can get done...","21":"**{{ time }}** - Wrapping up for reals this time","22":"**{{ time }}** - Goodnight","23":"**{{ time }}** - Sleeping"}},"home":{"resume":{"title":"R\xe9sum\xe9","blurb":"Read more about me, my skills, and my experience."},"portfolio":{"title":"Portfolio","blurb":"See the things I have made."},"tech":{"title":"Technology Corner","blurb":"My technology-related blog. Tutorials, introduction pieces for my code, and maybe some opinions."},"kitchen":{"title":"Kitchen Escapades","blurb":"My recipe book. I may or may not write about actual escapades that happen in the kitchen."},"support":{"title":"Support Me","blurb":"Open-Source often doesn\'t pay. See how you can support my continued software developments."}},"resume":{"fullname":"Tomas Ravinskas","contact":{"whatsapp":{"href":"https://wa.me/+37064020967","title":"WhatsApp"},"gmail":{"href":"mailto:tomas.rav@gmail.com","mail":"tomas.rav@gmail.com","title":"Email"},"fb":{"href":"https://m.me/OzymandiasTheGreat","title":"Facebook Messenger"},"gh":{"href":"https://github.com/OzymandiasTheGreat","title":"Github"},"print":"Print Version"},"tech-stack":{"title":"Technology Stack","intro":"This is a non-exhaustive list of technologies I have used in the past and would like to use again:"}},"portfolio":{"month":"month","stars":"Github Stars","downloads":"Downloads","action":"See it in Action!"},"support":{"title":"Ways to support me","p1":"I do most of my work unpaid, for the community. That means your support for me is vital.","p2":"Whether you want and issue addressed sooner, or you just want to show your appreciation, you can make a donation and don\'t hesitate to contact me.","patreon":"Become a Patron today! While I currently offer no reward tiers, that may soon change.","donorbox":"If you can\'t, or just don\'t want to use Patreon, or if you\'d rather make a one-time donation, you can use ","p3":"All your donations help cover my living and development expenses for the time I dedicate to Open-Source. Thank You! \u2764\ufe0f"},"footer":{"license":"Content available under ","copyright":"2022 - Tomas Ravinskas","third-party":"Third-party licenses, credits, and mentions."},"credits":{"title":"Credits","byline":" by ","intro":"Here are, in no particular order, credits for assets and graphics used throughout this website:","noattr":"If you see your artwork used on this website without attribution, please ","contact":"contact me","tech":"If, instead, you\'d like to read about technologies and frameworks used to make this website, check out ","repo":"the Github repository"}}')},57986:function(e){"use strict";e.exports=JSON.parse('{"bubbles":{"greeting":"*Sveiki!* Mano vardas Tomas ir a\u0161 **ra\u0161au kod\u0105**.","location":"A\u0161 kil\u0119s i\u0161 Kauno, Lietuvos \ud83c\uddf1\ud83c\uddf9, \u0160iaurin\u0117s Europos","github":{"releases":"Mano leidiniai [Github\'e](https://github.com/OzymandiasTheGreat) buvo parsi\u0173sti vir\u0161 **{{ count }} kart\u0173**.","stars":"Mano projectai [Github\'e](https://github.com/OzymandiasTheGreat) kartu turi vir\u0161 **{{ count }} \u017evaig\u017edu\u010di\u0173**"},"packages":{"npm":"Mano paketai [npm registre](https://www.npmjs.com/~ozymandiasthegreat) buvo parsi\u0173sti vir\u0161 **{{ count }} kart\u0173** \u0161\u012f m\u0117nes\u012f.","pypi":"Mano paketai [PyPI](https://pypi.org/user/OzymandiasTheGreat/) buvo parsi\u0173sti vir\u0161 **{{ count }} kart\u0173** \u0161\u012f m\u0117nes\u012f."},"weather":{"10":"V\u0117su, **{{ temp }}**, lauk nelysiu, jei neb\u016btina. ","20":"**{{ temp }}**, gal\u0117t\u0173 b\u016bti ir \u0161il\u010diau. ","25":"**{{ temp }}** - ne per kar\u0161ta, ne per \u0161alta. ","-10":"**{{ temp }}!** Mes \u010dia baigiam suled\u0117t! ","-0":"Gana \u0161alta, **{{ temp }}**. I\u0161 nam\u0173 nei\u0161eisiu dar ilgai. ","+25":"Kar\u0161ta! **{{ temp }}** ir a\u0161 tirpstu... "},"weather-0":{"Unknown":"","Cloudy":"Ir viskas pilka...","PartlyCloudy":"Beveik matau saul\u0119! Beveik.","VeryCloudy":"Per visus debesis jau\u010dias kaip poliarin\u0117 naktis...","Fog":"U\u017e lango dar ir pilka siena.","HeavyRain":"Taip \u0161lapia u\u017e lango.","HeavyShowers":"Taip \u0161lapia u\u017e lango.","LightRain":"Taip \u0161lapia u\u017e lango.","LightShowers":"Taip \u0161lapia u\u017e lango.","ThunderyHeavyRain":"Taip \u0161lapia u\u017e lango.","ThunderyShowers":"Taip \u0161lapia u\u017e lango.","HeavySnow":"Lauke gra\u017eu. Nebent reikia vairuoti.","HeavySnowShowers":"Lauke gra\u017eu. Nebent reikia vairuoti.","LightSnow":"Lauke gra\u017eu. Nebent reikia vairuoti.","LightSnowShowers":"Lauke gra\u017eu. Nebent reikia vairuoti.","ThunderySnowShowers":"Lauke gra\u017eu. Nebent reikia vairuoti.","LightSleet":"Lietus ir sniegas, man visai nepatinka.","LightSleetShowers":"Lietus ir sniegas, man visai nepatinka.","Sunny":"Bent jau sausa."},"weather10":{"Unknown":"","Cloudy":"Gal\u0117t\u0173 b\u016bti ir \u0161viesiau.","PartlyCloudy":"Gal\u0117t\u0173 b\u016bti ir \u0161viesiau.","VeryCloudy":"Gal\u0117t\u0173 b\u016bti ir \u0161viesiau.","Fog":"Gal\u0117t\u0173 b\u016bti ir \u0161viesiau.","HeavyRain":"Visa \u0161ita dr\u0117gm\u0117 erzina.","HeavyShowers":"Visa \u0161ita dr\u0117gm\u0117 erzina.","LightRain":"Visa \u0161ita dr\u0117gm\u0117 erzina.","LightShowers":"Visa \u0161ita dr\u0117gm\u0117 erzina.","ThunderyHeavyRain":"Visa \u0161ita dr\u0117gm\u0117 erzina.","ThunderyShowers":"Visa \u0161ita dr\u0117gm\u0117 erzina.","HeavySnow":"Sniegas b\u016bt\u0173 gra\u017eus, bet tuoj i\u0161tirps.","HeavySnowShowers":"Sniegas b\u016bt\u0173 gra\u017eus, bet tuoj i\u0161tirps.","LightSnow":"Sniegas b\u016bt\u0173 gra\u017eus, bet tuoj i\u0161tirps.","LightSnowShowers":"Sniegas b\u016bt\u0173 gra\u017eus, bet tuoj i\u0161tirps.","ThunderySnowShowers":"Sniegas b\u016bt\u0173 gra\u017eus, bet tuoj i\u0161tirps.","LightSleet":"Keliai turb\u016bt labai slid\u016bs.","LightSleetShowers":"Keliai turb\u016bt labai slid\u016bs.","Sunny":"Lauke *atrodo* \u0161ilta, bet a\u0161 ne kvailas!"},"weather+25":{"Unknown":"","Cloudy":"Be saul\u0117s, visai pakeliama.","PartlyCloudy":"Be saul\u0117s, visai pakeliama.","VeryCloudy":"Be saul\u0117s, visai pakeliama.","Fog":"Man visai patinka vasaros r\u016bkas, bet a\u0161 nevairuoju.","HeavyRain":"Gaivu!","HeavyShowers":"Gaivu!","LightRain":"Gaivu!","LightShowers":"Gaivu!","ThunderyHeavyRain":"Gaivu!","ThunderyShowers":"Gaivu!","Sunny":"Bet saul\u0117 tai svilina."},"fun":{"intro":"\u012edomus faktas: ","facts":{"cats":"A\u0161 gyvenu su dviem kat\u0117m. Viena balta, kita juoda.","flowers":"A\u0161 auginu ro\u017ees ir gvazdikus ant savo palang\u0117s.","cook":"A\u0161 *gaminu*! Mano Magnum Opus tikriausiai yra **Plikyti Piragai\u010diai**"}},"time":{"0":"**{{ time }}** - Grei\u010diausiai miegu, bet kartais sulaukiu skambu\u010di\u0173 net ir tokiu laiku","1":"**{{ time }}** - Miegu","2":"**{{ time }}** - Miegu","3":"**{{ time }}** - Miegu","4":"**{{ time }}** - Labas rytas! Ankstyvas pauk\u0161tis gauna kirmin\u0105! (Bet Lietuvi\u0161kai neskamba...)","5":"**{{ time }}** - Laikas kibt \u012f darbus!","6":"**{{ time }}** - Rytais a\u0161 gan produktyvus.","7":"**{{ time }}** - Kavos pertrauk\u0117l\u0117","8":"**{{ time }}** - Dar galiu padirb\u0117t prie\u0161 \u0161eimynai pabundant","9":"**{{ time }}** - Laikas \u017eadint \u0161eimyn\u0105","10":"**{{ time }}** - Gr\u012f\u017etam prie darb\u0173","11":"**{{ time }}** - Ra\u0161om, ra\u0161om kod\u0105","12":"**{{ time }}** - Kavos pertrauk\u0117l\u0117","13":"**{{ time }}** - Laikas prad\u0117t \\"test\\"/\\"debug\\" ritual\u0105","14":"**{{ time }}** - Na, man reik dar kavos","15":"**{{ time }}** - Dirbam","16":"**{{ time }}** - Dirbam","17":"**{{ time }}** - Ruo\u0161iam\u0117s u\u017ebaigti darbus \u0161iandienai","18":"**{{ time }}** - Paskutinis puodelis kavos","19":"**{{ time }}** - Laikas rast pramog\u0173","20":"**{{ time }}** - U\u017eteks pramog\u0173, pa\u017ei\u016br\u0117kim ar dar ka\u017ek\u0105 galim nudirbt...","21":"**{{ time }}** - Baigiam darbus i\u0161 tikr\u0173j\u0173","22":"**{{ time }}** - Labos nakties","23":"**{{ time }}** - Miegu"}},"home":{"resume":{"title":"Rezium\u0117","blurb":"Skaitykite daugiau apie mane, mano \u012fg\u016bd\u017eius, ir mano patirt\u012f."},"portfolio":{"title":"Portfolio","blurb":"Per\u017ei\u016br\u0117kite dalykus, kuriuos a\u0161 suk\u016briau."},"tech":{"title":"Technologij\u0173 Kampelis","blurb":"Mano blog\'as visom temom apie technologijas. Mokomoji med\u017eiaga, mano kodo pristatymai, ir gal \u0161iet tiek nuomoni\u0173."},"kitchen":{"title":"Virtuv\u0117s Nuotykiai","blurb":"Mano recept\u0173 knyga. Ar ra\u0161ysiu apie nuotykius vykstan\u010dius virtuv\u0117je dar ne\u017einau."},"support":{"title":"Palaikykit Mane","blurb":"Atviras-Kodas ma\u017eai moka. Pamatykite kaip galite palaikyti mano tolesn\u012f programin\u0117s \u012frangos k\u016brim\u0105."}},"resume":{"fullname":"Tomas Ravinskas","contact":{"whatsapp":{"href":"https://wa.me/+37064020967","title":"WhatsApp"},"gmail":{"href":"mailto:tomas.rav@gmail.com","mail":"tomas.rav@gmail.com","title":"Email"},"fb":{"href":"https://m.me/OzymandiasTheGreat","title":"Facebook Messenger"},"gh":{"href":"https://github.com/OzymandiasTheGreat","title":"Github"},"print":"Print Version"},"tech-stack":{"title":"Technologij\u0173 Stack\'as","intro":"Tai yra nei\u0161samus s\u0105ra\u0161as technologij\u0173 kuriomis man teko naudotis praeityje ir su kuriomis nor\u0117\u010diau v\u0117l dirbti:"}},"portfolio":{"month":"m\u0117nes\u012f","stars":"Github\'o \u017dvaig\u017edut\u0117s","downloads":"Parsiuntimai","action":"Pamatykite Gyvai!"},"support":{"title":"B\u016bdai mane paremti","p1":"A\u0161 atlieku did\u017ei\u0105j\u0105 dal\u012f savo darbo neapmokamai, d\u0117l bendruomen\u0117s. Taigi j\u016bs\u0173 aukos man yra gyvibi\u0161kai svarbios.","p2":"Jei norite, kad programin\u0117 klaida b\u016bt\u0173 i\u0161taisyta grei\u010diau, ar tiesiog norite parodyti savo palaikym\u0105, galite paaukoti, ir nedvejokite su manim susisiekti.","patreon":"Tapkite Mecenatu \u0161iandien! Nors \u0161iuo metu nesi\u016blau atlygio pakop\u0173, tai gali greitai keistis.","donorbox":"Jei negalite, ar tiesiog nenorite, naudotis Patreon sistema, ar tiesiog nor\u0117tum\u0117te atlikti vienkartin\u0119 auk\u0105, galite naudoti ","p3":"Visos J\u016bs\u0173 aukos padeda padengti mano pragyvenimo ir darbo i\u0161laidas u\u017e laik\u0105 kur\u012f skiriu Atviram-Kodui. A\u010di\u016b Jums! \u2764\ufe0f"},"footer":{"license":"Turinys prieinamas pagal ","copyright":"2022 - Tomas Ravinskas","third-party":"Tre\u010di\u0173j\u0173 \u0161ali\u0173 licenzijos, kreditai, ir pamin\u0117jimai."},"credits":{"title":"Kreditai","byline":" sukurta ","intro":"\u010cia yra, atsitiktine tvarka, kreditai k\u016brini\u0173 ir grafikos, naudojamos \u0161iame puslapyje:","noattr":"Jei pamat\u0117te savo k\u016brin\u012f naudojam\u0105 \u0161iame puslapyje be atributikos, pra\u0161au ","contact":"susisiekti","tech":"Jeigu ver\u010diau skaitytum\u0117te apie technologijas ir karkasus naudotus kuriant \u0161\u012f puslap\u012f, per\u017ei\u016br\u0117kite ","repo":"Github repozitorij\u0105"}}')}},function(e){e.O(0,[702,369,402,520,888,774,179],(function(){return t=47878,e(e.s=t);var t}));var t=e.O();_N_E=t}]);