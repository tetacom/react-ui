import{j as e,a,c as ge,T as be,F as ye}from"./index-0585b39b.js";import{a as _e}from"./chunk-KKE3V3AL-2a2f517f.js";import{r as fe}from"./index-56a2eecf.js";import{P as ve,A as Se,a as ke,S as Be}from"./chunk-PCJTTTQV-07aba213.js";import"./chunk-R4NKYYJA-96bb58e6.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-5baba78c.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-356e4a49.js";const C=()=>e("div",{className:"Spinner",children:e("svg",{x:"0px",y:"0px",width:"14",height:"14",viewBox:"0 0 50 50",children:e("path",{fill:"var(--color-text-90)",d:"M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z",children:e("animateTransform",{attributeType:"xml",attributeName:"transform",type:"rotate",from:"0 25 25",to:"360 25 25",dur:"0.6s",repeatCount:"indefinite"})})})});try{C.displayName="Spinner",C.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}const xe="_button_3vidf_1",Ce="_children_3vidf_15",ze="_loading_3vidf_25",Pe="_buttonShapeBrick_3vidf_39",we="_buttonShapeRound_3vidf_42",Ne="_buttonShapeCircle_3vidf_45",qe="_buttonSizeLarge_3vidf_48",Re="_buttonSizeMiddle_3vidf_58",Ge="_buttonSizeSmall_3vidf_68",Te="_buttonBlock_3vidf_80",Ie="_buttonSquare_3vidf_83",Ve="_buttonLoading_3vidf_100",Le="_disabledPrimary_3vidf_114",Me="_disabledOutline_3vidf_117",Oe="_disabledGhost_3vidf_121",r={button:xe,children:Ce,loading:ze,buttonShapeBrick:Pe,buttonShapeRound:we,buttonShapeCircle:Ne,buttonSizeLarge:qe,buttonSizeMiddle:Re,buttonSizeSmall:Ge,buttonBlock:Te,buttonSquare:Ie,buttonLoading:Ve,disabledPrimary:Le,disabledOutline:Me,disabledGhost:Oe},je={small:r.buttonSizeSmall,middle:r.buttonSizeMiddle,large:r.buttonSizeLarge},De={brick:r.buttonShapeBrick,round:r.buttonShapeRound,circle:r.buttonShapeCircle},Ye={primary:r.disabledPrimary,outline:r.disabledOutline,ghost:r.disabledGhost},c=fe.forwardRef(({children:t,type:i,disabled:l,palette:x,shape:le="round",size:se="middle",view:z="primary",square:ce=!1,block:de=!1,loading:P=!1,className:ue,...pe},me)=>{const he=`button_${z} button-${x||"primary"}`;return a("button",{...pe,ref:me,type:i||"button",disabled:P||l,className:ge(he,r.button,je[se],De[le],ce&&r.buttonSquare,de&&r.buttonBlock,P&&r.buttonLoading,l&&Ye[z],ue),children:[e("span",{className:r.children,children:t}),e("span",{className:r.loading,children:e(C,{})})]})});try{c.displayName="Button",c.__docgenInfo={description:"",displayName:"Button",props:{view:{defaultValue:{value:"primary"},description:"",name:"view",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"outline"'},{value:'"ghost"'}]}},size:{defaultValue:{value:"middle"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"middle"'},{value:'"large"'}]}},palette:{defaultValue:null,description:"",name:"palette",required:!1,type:{name:"enum",value:[{value:'"green"'},{value:'"yellow"'},{value:'"red"'}]}},shape:{defaultValue:{value:"round"},description:"",name:"shape",required:!1,type:{name:"enum",value:[{value:'"brick"'},{value:'"round"'},{value:'"circle"'}]}},square:{defaultValue:{value:"false"},description:"",name:"square",required:!1,type:{name:"boolean"}},block:{defaultValue:{value:"false"},description:"",name:"block",required:!1,type:{name:"boolean"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}}}}}catch{}const d=()=>a("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e("rect",{x:"1.9895",y:"13.3033",width:"16",height:"1",rx:"0.5",transform:"rotate(-45 1.9895 13.3033)",fill:"var(--color-text-90)"}),e("rect",{x:"1.28247",y:"9.76782",width:"12",height:"1",rx:"0.5",transform:"rotate(-45 1.28247 9.76782)",fill:"var(--color-text-90)"}),e("rect",{x:"14.7175",y:"6.23218",width:"12",height:"1",rx:"0.5",transform:"rotate(135 14.7175 6.23218)",fill:"var(--color-text-90)"}),e("rect",{x:"0.575439",y:"6.23218",width:"8",height:"1",rx:"0.5",transform:"rotate(-45 0.575439 6.23218)",fill:"var(--color-text-90)"}),e("rect",{x:"15.4246",y:"9.76782",width:"8",height:"1",rx:"0.5",transform:"rotate(135 15.4246 9.76782)",fill:"var(--color-text-90)"})]});try{d.displayName="TmpSvgIcon",d.__docgenInfo={description:"",displayName:"TmpSvgIcon",props:{}}}catch{}const Fe="_root_1jbow_1",Ae="_exampleBlock_1jbow_5",B={root:Fe,exampleBlock:Ae},{Title:S,Paragraph:s,Text:o}=be,He=[{key:"primary",title:"Primary",view:"primary",square:!1},{key:"secondary",title:"Secondary",view:"outline",square:!1},{key:"ghost",title:"Ghost",view:"ghost",square:!1},{key:"primary-icon",title:"Primary Icon",view:"primary",square:!0},{key:"secondary-icon",title:"Secondary Icon",view:"outline",square:!0},{key:"ghost-icon",title:"Ghost Icon",view:"ghost",square:!0}],Ee=[{key:"rest",title:"Rest",disabled:!1},{key:"hover",title:"Hover here",disabled:!1},{key:"press",title:"Press here",disabled:!1},{key:"disable",title:"Disable",disabled:!0},{key:"focus",title:"Focus with keyboard",disabled:!1}],$e=[{key:"s",title:"S",size:"small"},{key:"m",title:"M",size:"middle"},{key:"l",title:"L",size:"large"}],Je=()=>a("div",{className:B.root,children:[e(S,{level:4,style:{marginBottom:0},children:"Кнопка"}),e(s,{fontVariant:"caption",style:{marginTop:0,color:"var(--color-primary-50)"},children:r.button}),e("br",{}),e(s,{children:"Button (кнопка) — компонент, который призывает пользователя к совершению определенного действия в интерфейсе, например: открыть следующую страницу, заказать товар или войти в свой аккаунт."}),e(s,{children:"Основной призыв к действию. Предназначены для выполнения какого-либо действия в системе."}),e(S,{level:6,children:"Как использовать"}),e(s,{children:"Основные правила применения кнопки:"}),a("ul",{children:[e(o,{children:e("li",{children:"Текст кнопки всегда должен быть с заглавной буквы;"})}),e(o,{children:e("li",{children:"Текст на кнопке должен сообщать пользователю, что произойдёт, если он нажмёт на кнопку (например, Сохранить, Добавить и т. п.);"})}),e(o,{children:e("li",{children:"Не перенасыщать страницу большим количеством Primary кнопок. Не распологать их рядом друг с другом."})})]}),e(S,{level:6,children:"Типы кнопок"}),e(s,{children:"В системе существуют всего 6 типов кнопок — это Primary (основная), Secondary (второстепенная) и Ghost (без фона), Primary Icon, Secondary Icon, Ghost Icon кнопки"}),e("div",{className:B.exampleBlock,children:He.map(({key:t,title:i,view:l,square:x})=>a("div",{children:[e(o,{fontVariant:"captionSemi",children:i}),a(c,{view:l,square:x,children:[e(d,{})," Загрузить"]})]},t))}),e(S,{level:6,children:"Состояния кнопок"}),e(s,{children:"Есть 5 состояний каждой кнопки:"}),a("ol",{children:[e(o,{children:e("li",{children:"Rest (покой)"})}),e(o,{children:e("li",{children:"Hover (наведение)"})}),e(o,{children:e("li",{children:"Press (нажатие)"})}),e(o,{children:e("li",{children:"Disable (недоступно)"})}),e(o,{children:e("li",{children:"Focus (в фокусе)"})})]}),e("div",{className:B.exampleBlock,children:Ee.map(({key:t,title:i,disabled:l})=>a("div",{children:[e(o,{fontVariant:"captionSemi",children:i}),a(c,{disabled:l,children:[e(d,{})," Загрузить"]})]},t))}),e(S,{level:6,children:"Размер кнопок"}),e(s,{children:"Есть 3 размера кнопок — S, M и L. В основном в проектах используются кнопки размера M"}),e("div",{className:B.exampleBlock,children:$e.map(({key:t,title:i,size:l})=>a("div",{children:[e(o,{fontVariant:"captionSemi",children:i}),a(c,{size:l,children:[e(d,{})," Загрузить"]})]},t))}),e("br",{}),e("br",{}),e(ve,{}),e(Se,{story:ke}),e(Be,{})]}),or={title:"General/Button",component:c,args:{children:a(ye,{children:[e(d,{}),"Push me",e(d,{})]}),view:"primary",size:"middle",palette:void 0,shape:"round",disabled:!1,square:!1,block:!1,loading:!1},parameters:{docs:{page:Je}}},n=({children:t,...i})=>e(c,{...i,onClick:_e("clicked"),children:t}),k=n.bind({});k.args={};const u=n.bind({});u.storyName="Color: Primary";u.args={size:"large"};const p=n.bind({});p.storyName="Color: Secondary";p.args={view:"outline",size:"large"};const m=n.bind({});m.storyName="Color: Ghost";m.args={view:"ghost",size:"large"};const h=n.bind({});h.storyName="Palette: None";h.args={palette:void 0,size:"large"};const g=n.bind({});g.storyName="Palette: Green";g.args={palette:"green",size:"large"};const b=n.bind({});b.storyName="Palette: Yellow";b.args={palette:"yellow",size:"large"};const y=n.bind({});y.storyName="Palette: Red";y.args={palette:"red",size:"large"};const _=n.bind({});_.storyName="Shape: Brick";_.args={shape:"brick",size:"large"};const f=n.bind({});f.storyName="Shape: Round";f.args={shape:"round",size:"large"};const v=n.bind({});v.storyName="Shape: Circle";v.args={shape:"circle",size:"large"};var w,N,q;k.parameters={...k.parameters,docs:{...(w=k.parameters)==null?void 0:w.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(q=(N=k.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};var R,G,T;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(T=(G=u.parameters)==null?void 0:G.docs)==null?void 0:T.source}}};var I,V,L;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(L=(V=p.parameters)==null?void 0:V.docs)==null?void 0:L.source}}};var M,O,j;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(j=(O=m.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var D,Y,F;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(F=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:F.source}}};var A,H,E;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(E=(H=g.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};var $,J,K;b.parameters={...b.parameters,docs:{...($=b.parameters)==null?void 0:$.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(K=(J=b.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,W;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(W=(U=y.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var X,Z,ee;_.parameters={..._.parameters,docs:{...(X=_.parameters)==null?void 0:X.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(ee=(Z=_.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var re,te,ae;f.parameters={...f.parameters,docs:{...(re=f.parameters)==null?void 0:re.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(ae=(te=f.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var oe,ne,ie;v.parameters={...v.parameters,docs:{...(oe=v.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  children,
  ...args
}) => <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>`,...(ie=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:ie.source}}};const nr=["Default","PrimaryColor","SecondaryColor","GhostColor","BasePalette","GreenPalette","YellowPalette","RedPalette","BrickShape","RoundShape","CircleShape"];export{h as BasePalette,_ as BrickShape,v as CircleShape,k as Default,m as GhostColor,g as GreenPalette,u as PrimaryColor,y as RedPalette,f as RoundShape,p as SecondaryColor,b as YellowPalette,nr as __namedExportsOrder,or as default};
//# sourceMappingURL=Button.stories-4960ddf7.js.map
