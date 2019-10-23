(function (global) {
    class HereUi {
        constructor (config = {}) {
            this.config = Object.assign({
                baseUrl: '',                        // 基础路由
                requestInterceptors: null,          // 请求之前拦截器
                responseInterceptors: null          // 响应数据返回之前拦截器
            }, config);
            this.init();
            // requestInterceptors: function (config) {
            //     const access_token = 'XXXXXXX';
            //     if(config instanceof FormData){
            //         config.append('access_token',access_token);   //数据为formdata类型(上传)
            //     }else{
            //         config.access_token = access_token;
            //     }
            //     return config;
            // }
            // responseInterceptors: function (res) {
            //     if(res.data.status == 'error' && res.data.data.error == 'access_denied'){
            //         this.toast(res.data.data.error);
            //     }
            //     return res;
            // }
        }
        init () {
            const style = this.createDom('style');
            const head = document.getElementsByTagName('head')[0];
            const cssCode = `
                *{ margin: 0;padding: 0;-webkit-tap-highlight-color:rgba(255,255,255,0); }
                .top{top: 20px;transform: translateX(-50%) scale(0.8); }
                .middle{ top: 50%;left: 50%;transform: translate(-50%,-50%) scale(0.8); }
                .bottom{ bottom: 20px;transform: translateX(-50%) scale(0.8); }
                .dialogOverlay::before{ content: '';position: fixed;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 2019;background-color: rgba(0,0,0,0.4); }
                #toast_2020, #notice_2020, #loading_2020, #modal_2020, #sheet_2020{ position: fixed; }
                #toast_2020, #notice_2020, #loading_2020{ z-index: -2021;border-radius: 5px;background-color: rgba(0,0,0,0.6); }
                #toast_2020, #notice_2020{ opacity: 0;color: #fff;max-width: 70vw;padding: 10px 15px; }
                #modal_2020, #sheet_2020{ z-index: -2020;left: 50%; }
                #modal_title_2020, #modal_content_2020, #modal_action_2020 span, #sheet_title_2020, .sheet_item_2020, #sheet_close_2020{ text-align: center; }
                #modal_title_2020, #sheet_title_2020{ font-size: 14px;font-weight: 600; }
                #toast_2020, #notice_2020, #loading_2020 p, #modal_content_2020, #modal_action_2020 span, #sheet_close_2020, .sheet_item_2020{ font-size: 14px;font-weight: 400; }
                #toast_2020{ left: 50%; }
                #notice_2020{ top: 20px;right: -100%; }
                #loading_2020{ top: 50%;left: 50%;padding: 20px;transform: translate(-50%,-50%); }
                #modal_2020{ top: 50%;opacity: 0;padding: 12px 0;border-radius: 10px;background-color: rgba(255,255,255,0.95);transform: translate(-50%,-50%) scale(1.2); }
                #sheet_2020{ height: 444px;width: calc(100% - 20px);transform: translateX(-50%);bottom: -100%;background-color: rgba(0,0,0,0); }
                #modal_title_2020{ width: calc(100% - 40px);padding: 0 20px 4px 20px; }
                #modal_content_2020{ width: calc(100% - 40px);padding: 0 20px 18px 20px; }
                #modal_action_2020{ padding-top: 12px;display: flex;justify-content: space-around;position: relative; }
                #modal_action_2020 span{ width: 50%;cursor: pointer; }
                #sheet_title_2020{ height: 40px;line-height: 40px;border-radius: 10px 10px 0 0;cursor: pointer;background-color: rgba(255,255,255,0.95); }
                #sheet_items_2020::-webkit-scrollbar { display: none; /* Chrome Safari */ }
                #sheet_items_2020{ width: 100%;height: 336px;scrollbar-width: none; /* firefox */-ms-overflow-style: none; /* IE 10+ */overflow-x: hidden;overflow-y: auto;border-radius: 0 0 10px 10px;background-color: rgba(0,0,0,0); }
                #sheet_close_2020, .sheet_item_2020{ height: 48px;line-height: 48px;cursor: pointer;background-color: rgba(255,255,255,0.95); }
                .sheet_item_2020{ position: relative; }
                #sheet_close_2020{ margin: 10px 0;border-radius: 10px; }
                #modal_action_2020::before, .sheet_item_2020::before, .showCancel::after{ content: '';position: absolute;top: 0;background-color: rgba(0,0,0,0.3); }
                #modal_action_2020::before, .sheet_item_2020::before{ left: 0;width: 100%;height: 1px;transform: scale(1,0.5); }
                .showCancel::after{ left: 50%;width: 1px;height: calc(100% + 12px);transform: translateX(-50%) scale(0.5,1); }
                #loading_2020 i{ position: absolute; }
                #loading_2020 i::before{ content: '';display: block;margin: 0 auto;height: 27%;border-radius: 20px;background-color: #fff;animation: fadeLoadingDelay 1.2s infinite ease-in-out both; }
                #loading_2020 i:nth-child(2){ transform: rotate(30deg); }
                #loading_2020 i:nth-child(2)::before{ animation-delay: -1.1s; }
                #loading_2020 i:nth-child(3){ transform: rotate(60deg); }
                #loading_2020 i:nth-child(3)::before{ animation-delay: -1s; }
                #loading_2020 i:nth-child(4){ transform: rotate(90deg); }
                #loading_2020 i:nth-child(4)::before{ animation-delay: -0.9s; }
                #loading_2020 i:nth-child(5){ transform: rotate(120deg); }
                #loading_2020 i:nth-child(5)::before{ animation-delay: -0.8s; }
                #loading_2020 i:nth-child(6){ transform: rotate(150deg); }
                #loading_2020 i:nth-child(6)::before{ animation-delay: -0.7s; }
                #loading_2020 i:nth-child(7){ transform: rotate(180deg); }
                #loading_2020 i:nth-child(7)::before{ animation-delay: -0.6s; }
                #loading_2020 i:nth-child(8){ transform: rotate(210deg); }
                #loading_2020 i:nth-child(8)::before{ animation-delay: -0.5s; }
                #loading_2020 i:nth-child(9){ transform: rotate(240deg); }
                #loading_2020 i:nth-child(9)::before{ animation-delay: -0.4s; }
                #loading_2020 i:nth-child(10){ transform: rotate(270deg); }
                #loading_2020 i:nth-child(10)::before{ animation-delay: -0.3s; }
                #loading_2020 i:nth-child(11){ transform: rotate(300deg); }
                #loading_2020 i:nth-child(11)::before{ animation-delay: -0.2s; }
                #loading_2020 i:nth-child(12){ transform: rotate(330deg); }
                #loading_2020 i:nth-child(12)::before{ animation-delay: -0.1s; }
                #loading_2020 p{ color: #fff;text-align: center; }
                @keyframes fadeLoadingDelay{
                    0%, 39%, 100%{ opacity: 0.2; }
                    40%{ opacity: 1; }
                }
                .middleFadeToast{ z-index: 2021;animation: middleFadeToast 4000ms forwards; }
                .topFadeToast, .bottomFadeToast{ z-index: 2021;animation: topBottomFadeToast 4000ms forwards; }
                @keyframes topBottomFadeToast{
                    0%, 100%{ opacity: 0;transform: translateX(-50%) scale(0.8);z-index: -2021; }
                    7%, 93%{ opacity: 0.9;transform: translateX(-50%) scale(1.05);z-index: 2021; }
                    10%, 90%{ opacity: 1;transform: translateX(-50%) scale(1);z-index: 2021; }
                }
                @keyframes middleFadeToast{
                    0%, 100%{ opacity: 0;transform: translateX(-50%) translateY(-50%) scale(0.8);z-index: -2021; }
                    7%, 93%{ opacity: 0.9;transform: translateX(-50%) translateY(-50%) scale(1.05);z-index: 2021; }
                    10%, 90%{ opacity: 1;transform: translateX(-50%) translateY(-50%) scale(1);z-index: 2021; }
                }
                .bounceNotice{ animation: bounceNotice 4000ms forwards; }
                @keyframes bounceNotice{
                    0%, 100%{ opacity: 0;right: -100%; }
                    10%, 90%{ opacity: 1;right: 20px; }
                }
                .fadeModel{ animation: fadeModel 300ms forwards; }
                @keyframes fadeModel{
                    from{ opacity: 0;transform: translate(-50%,-50%) scale(1.2); }
                    to{ opacity: 1;transform: translate(-50%,-50%) scale(1); }
                }
                .bounceUpSheet{ animation: bounceUpSheet 300ms forwards; }
                @keyframes bounceUpSheet{
                    0%{ opacity: 0.5;bottom: -100%; }
                    100%{ opacity: 1;bottom: 0; }
                }
                .bounceDownSheet{ animation: bounceDownSheet 300ms forwards; }
                @keyframes bounceDownSheet{
                    0%{ opacity: 1;bottom: 0; }
                    100%{ opacity: 0.5;bottom: -100%; }
                }
                @media screen and (min-width: 960px){   /*电脑*/
                    #modal_2020{ min-width: 400px;max-width: 350px; }
                    #loading_2020{ width: 200px;min-height: 120px; }
                    #loading_2020 i{ width: 60px;height: 60px;top: 50px;left: 90px; }
                    #loading_2020 i::before{ width: 6%; }
                    #loading_2020 p{ width: 200px;margin-top: 105px;padding-bottom: 20px; }
                }
                @media screen and (max-width: 960px){   /*平板 | 手机*/
                    #modal_2020{ min-width: calc(75vw);max-width: calc(85vw); }
                    #loading_2020{ width: 150px;min-height: 100px; }
                    #loading_2020 i{ width: 50px;height: 50px;top: 45px;left: 70px; }
                    #loading_2020 i::before{ width: 5%; }
                    #loading_2020 p{ width: 150px;margin-top: 85px;padding-bottom: 10px; }
                }
                @keyframes flipShow{
                    from{ opacity: 0;
                        transform: perspective(1000px) translate(-50%,-50%) rotateY(-90deg); }
                    to{ opacity: 1;transform: perspective(1000px) translate(-50%,-50%) rotateY(0deg); }
                }
                @keyframes flipHide{
                    from{ opacity: 1;transform: perspective(1000px) translate(-50%,-50%) rotateY(0deg); }
                    to{ opacity: 0;transform: perspective(1000px) translate(-50%,-50%) rotateY(-90deg); }
                }
                .close_2020{ width: 125%;height: 125%;cursor: pointer;transform: scale(0.8);margin: -12.5% 0 0 -12.5%;position: relative; }
                .close_2020 span{ position: absolute;top: 50%;left: 50%;display: inline-block;width: 50%;height: 7.5%;border-radius: 10px; }
                .close_2020 span:first-child{ transform: translate(-50%,-50%) rotate(45deg); }
                .close_2020 span:last-child{ transform: translate(-50%,-50%) rotate(135deg); }
                .switch_2020{ width: 100%;height: 100%;cursor: pointer;position: relative;overflow: hidden;display: flex;align-items: center;justify-content: space-between; }
                .switch_2020 span{width: 50%;height: 100%;font-size: 14px;display: flex;align-items: center;justify-content: center; }
                .switch_2020 span:first-child{ border-radius: 50px 0 0 50px; }
                .switch_2020 span:nth-child(2){ border-radius: 0 50px 50px 0; }
                .switch_2020 span:last-child{ position: absolute;z-index: 1;top: 0;left: -1%;width: 51%;pointer-events: none; }
                .leftRun span:last-child{ animation: leftRun 200ms linear forwards; }
                .rightRun span:last-child{ animation: rightRun 200ms linear forwards; }
                @keyframes leftRun{
                    from{ left: 50%;border-radius: 0 50px 50px 0; }
                    to{ left: -1%;border-radius: 50px 0 0 50px; }
                }
                @keyframes rightRun{
                    from{ left: -1%;border-radius: 50px 0 0 50px; }
                    to{ left: 50%;border-radius: 0 50px 50px 0; }
                }
            `;
            this.setAttDom(style,{type: 'text/css',rel: 'stylesheet'});
            style.appendChild(document.createTextNode(cssCode));
            this.appendDom(style,head);
        }

        ajax (data = {}) {
            const dataType = this.dataType(data);
            if (dataType === 'object' && this.config.baseUrl && data.url && (this.dataType(data.data) === 'object')) {
                /*
                * url: ''
                * data: ''
                * type: 'post'
                * */
                const that = this;
                const xhr = new XMLHttpRequest();
                function dataHandle (url = '',req = {}) {
                    url = `${that.config.baseUrl}${url}`;
                    let dataStr = '';
                    let fd = new FormData();
                    if (Object.keys(req).length) {
                        for (let p in req) {
                            fd.append(p, req[p]);
                            dataStr += `${p}=${req[p]}&`;
                        }
                        dataStr = dataStr.slice(0,dataStr.length - 1);
                    }
                    return {
                        url: url,
                        getReq: `${url}${dataStr ? ('?' + dataStr) : ''}`,
                        postReq: dataStr,
                        formReq: fd
                    };
                }
                function returnData (xhr,resolve) {
                    const data = that.judgeJson(xhr.responseText) ? JSON.parse(xhr.responseText) : xhr.responseText;
                    if (that.config.responseInterceptors && (that.dataType(that.config.responseInterceptors) === 'function')) {
                        data = that.config.requestInterceptors(data);
                    }
                    resolve(data);
                }
                function get (getReq) {
                    return new Promise(resolve => {
                        xhr.open("GET",getReq,true);
                        xhr['onreadystatechange'] = function(){
                            if ( xhr.readyState == 4 && xhr.status == 200) {
                                returnData(xhr,resolve);
                            }
                        }
                        xhr.send(null);
                    })
                }
                function post (url,postReq) {
                    return new Promise((resolve,reject) => {
                        xhr.open( "POST" , url , true );
                        xhr.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
                        xhr['onreadystatechange'] = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                returnData(xhr,resolve);
                            }
                        }
                        xhr.send(postReq);
                    })
                }
                function form (url,formReq) {
                    return new Promise((resolve,reject) => {
                        xhr.open( "POST" , url , true );
                        xhr['onreadystatechange'] = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                returnData(xhr,resolve);
                            }
                        }
                        xhr.send(formReq);
                    })
                }
                if (this.config.requestInterceptors && (this.dataType(this.config.requestInterceptors) === 'function')) {
                    data.data = this.config.requestInterceptors(data.data);
                }
                const {url,getReq,postReq,formReq} = dataHandle(data.url,data.data);
                if (['get','GET'].includes(data.type)) {
                    return get(getReq);
                } else if (['form','FORM'].includes(data.type)) {
                    return form(url,formReq);
                } else {
                    return post(url,postReq);
                }
            } else {
                this.toast('请求参数错误');
            }
        }                             // 通信

        toast (text = '',direction = 'middle') {
            if (text) {
                let dom = this.getDomById('toast_2020');
                direction = ['top','middle','bottom'].includes(direction) ? direction : 'middle';
                const toast = dom ? dom : this.appendDom(this.setAttDom(this.createDom(), {id: 'toast_2020'}));
                this.setAttDom(toast, {'class': ''});
                setTimeout(() => {
                    this.setAttDom(toast, {'class': `${direction} ${direction}FadeToast`}).innerHTML = text;
                }, 200);
            }
        }       // 提示
        sheet (data = {}) {
            /*
            * title: String
            * option: Array
            * cancel: String
            * */
            if (this.dataType(data) === 'object' && data.option && (this.dataType(data.option) === 'array')) {
                if (data.option.length) {
                    const arr = data.option.map(v => {
                        if (['string','number','boolean'].includes(this.dataType(v))) {
                            return {key: v, value: v};
                        } else if (this.dataType(v) === 'object') {
                            return {key: v.key || '', value: v.value || v.key || ''};
                        } else {
                            return {key: '', value: ''};
                        }
                    }).filter(v => v.key && v.value);
                    if (arr.length) {
                        let sheet = this.getDomById('sheet_2020');
                        let title =  this.getDomById('sheet_title_2020');
                        let items =  this.getDomById('sheet_items_2020');
                        let close =  this.getDomById('sheet_close_2020');
                        const that = this;
                        if (sheet === null) {
                            sheet = this.appendDom(this.setAttDom(this.createDom(), {id: 'sheet_2020'}));
                            title = this.appendDom(this.setAttDom(this.createDom(), {id: 'sheet_title_2020'}), sheet);
                            items = this.appendDom(this.setAttDom(this.createDom(), {id: 'sheet_items_2020'}), sheet);
                            close = this.appendDom(this.setAttDom(this.createDom(), {id: 'sheet_close_2020'}), sheet);
                            close.innerHTML = data.cancel || '取消';
                        }
                        for (let p of items.children) {
                            let className = p.getAttribute('class');
                            if (className && className === 'sheet_item_2020') {
                                sheet.removeChild(p);
                            }
                        }
                        arr.forEach((v,i) => {
                            let obj = {'class': 'sheet_item_2020',key: v.key,value: v.value,index: i};
                            let item = this.setAttDom(this.createDom(), obj);
                            item.innerHTML = v.key;
                            this.appendDom(item, items);
                        })
                        if (data.title) {
                            title.innerHTML = data.title;
                            this.setCssDom(title, {'display': 'block'});
                        } else {
                            this.setCssDom(title, {'display': 'none'});
                            this.setCssDom(sheet.children[1], {'borderRadius': '10px 10px 0 0'});
                        }
                        this.setCssDom(sheet, {'zIndex': 2020});
                        this.setAttDom(sheet, {'class': 'bounceUpSheet'});
                        this.setAttDom(document.body, {'class': 'dialogOverlay'});
                        return new Promise((resolve,reject) => {
                            sheet.onclick = function (event) {
                                let {id,className} = event.target;
                                that.setAttDom(sheet, {'class': 'bounceDownSheet'});
                                that.setAttDom(document.body, {'class': ''});
                                that.setCssDom(sheet, {'zIndex': -2020});
                                if (id) {
                                    reject({status: false,text: '关闭弹窗'});
                                }
                                if (className) {
                                    resolve({
                                        status: true,
                                        result: {
                                            key: event.target.getAttribute('key'),
                                            value: event.target.getAttribute('value'),
                                            index: Number(event.target.getAttribute('index'))
                                        }
                                    });
                                }
                            };
                        });
                    }
                }
            }
            return new Promise(reject => reject('没有content'));
        }                            // 菜单
        modal (data = {}) {
            /*
            * title: String
            * content: String
            * sure: String
            * cancel: String
            * */
            if (this.dataType(data) === 'object' && data.content) {
                let modal = this.getDomById('modal_2020');
                let showCancel = false;
                const that = this;
                if (modal === null) {
                    modal = this.appendDom(this.setAttDom(this.createDom(), {id: 'modal_2020'}));
                    this.appendDom(this.setAttDom(this.createDom(), {id: 'modal_title_2020'}), modal);
                    this.appendDom(this.setAttDom(this.createDom(), {id: 'modal_content_2020'}), modal);
                    let action = this.setAttDom(this.createDom(), {id: 'modal_action_2020'});
                    action.innerHTML = `<span>取消</span><span>确定</span>`;
                    this.appendDom(action, modal);
                }
                modal.children[1].innerHTML = data.content;
                modal.children[2].children[0].innerHTML = '取消';
                modal.children[2].children[1].innerHTML = '确定';
                if (data.title) {
                    modal.children[0].innerHTML = data.title;
                } else {
                    this.setCssDom(modal.children[0], {'padding-bottom': 0});
                }
                if ('sure' in data) {
                    modal.children[2].children[1].innerHTML = data.sure;
                }
                if ('cancel' in data) {
                    if (data.cancel === true) {
                        showCancel = true
                    } else if (data.cancel === false) {
                        this.setCssDom(modal.children[2].children[0], {'display': 'none'});
                    } else {
                        showCancel = true
                        modal.children[2].children[0].innerHTML = data.cancel;
                    }
                } else {
                    this.setCssDom(modal.children[2].children[0], {'display': 'none'});
                }
                if (showCancel) {
                    this.setAttDom(modal.children[2], {'class': 'showCancel'});
                    this.setCssDom(modal.children[2].children[0], {'display': 'block'});
                } else {
                    this.setAttDom(modal.children[2], {'class': ''});
                }
                this.setCssDom(modal, {'zIndex': 2021});
                this.setAttDom(modal, {'class': 'fadeModel'});
                this.setAttDom(document.body, {'class': 'dialogOverlay'});
                function closeModel (dom,flag) {
                    that.setCssDom(modal, {'zIndex': -2021});
                    that.setAttDom(modal, {'class': ''});
                    that.setAttDom(document.body, {'class': ''});
                    return {status: flag,text: dom.innerHTML};
                }
                return new Promise((resolve,reject) => {
                    modal.children[2].children[0].onclick = function () {
                        reject(closeModel(this,false));
                    };
                    modal.children[2].children[1].onclick = function () {
                        resolve(closeModel(this,true));
                    };
                });
            } else {
                return new Promise(reject => reject('没有content'));
            }
        }                            // 弹窗
        notice (text = '') {
            if (text) {
                let dom = this.getDomById('notice_2020');
                const notice = dom ? dom : this.appendDom(this.setAttDom(this.createDom(), {id: 'notice_2020'}));
                this.setAttDom(notice, {'class': ''});
                setTimeout(() => {
                    this.setAttDom(notice, {'class': 'bounceNotice'}).innerHTML = text;
                }, 200);
            }
        }                           // 通知
        loading (text = false) {
            let loading = this.getDomById('loading_2020');
            if (loading === null) {
                loading = this.appendDom(this.setAttDom(this.createDom(), {id: 'loading_2020'}));
                for (let i=0;i<12;i++) {
                    this.appendDom(this.createDom('i'),loading);
                }
                this.appendDom(this.createDom('p'),loading);
            }
            if (this.dataType(text) === 'boolean' && (text === false)) {
                this.setCssDom(loading, {'display': 'none'});
                this.setCssDom(loading.children[12], {'display': 'none','zIndex': -2021});
            } else if (this.dataType(text) === 'boolean' && (text === true)) {
                loading.children[12].innerHTML = '';
                this.setCssDom(loading.children[12], {'display': 'none'});
                this.setCssDom(loading, {'display': 'block','zIndex': 2021});
            } else {
                loading.children[12].innerHTML = text;
                this.setCssDom(loading.children[12], {'display': 'block'});
                this.setCssDom(loading, {'display': 'block','zIndex': 2021});
            }
        }                       // 加载

        getDomById (domId = 'app') {
            return document.getElementById(domId);
        }
        getDomByCn (domCn = 'app') {
            return document.getElementsByClassName(domCn)[0];
        }
        createDom (domName = 'div') {
            return document.createElement(domName);
        }
        appendDom (dom,father = document.body) {
            father.appendChild(dom);
            return dom;
        }
        setCssDom (dom,param = {}) {
            if (Object.keys(param).length) {
                for (let p in param) {
                    dom.style[p] = param[p];
                }
            }
            return dom;
        }
        setAttDom (dom,param = {}) {
            if (Object.keys(param).length) {
                for (let p in param) {
                    dom.setAttribute(p, param[p]);
                }
            }
            return dom;
        }

        closeButton (dom, style = {}) {
            /*
            * bgColor: 'rgba(0,0,0,0)'
            * radius: false
            * color: '#000'
            * */
            dom = (typeof dom === 'object') ? dom : (this.getDomById(dom) || this.getDomByCn(dom));
            style = Object.assign({bgColor: 'rgba(0,0,0,0)',radius: false,color: '#000'}, style);
            let close = dom.getElementsByClassName('close_2020')[0];
            if (!close) {
                close = this.createDom();
                this.setAttDom(close, {'class': 'close_2020'});
                this.setCssDom(close, {
                    backgroundColor: style.bgColor,
                    borderRadius: style.radius ? '50%' : 0
                });
                close.innerHTML = `<span></span><span></span>`;
                this.appendDom(close, dom);
                this.setCssDom(close.children[0], {'background-color': style.color});
                this.setCssDom(close.children[1], {'background-color': style.color});
            }
            // hereUi.closeButton('view',{bgColor: 'red',radius: true,color: '#fff'}).onclick= function (event) {
            //     console.log(event);
            // }
            return dom;
        }
        switchButton (dom, value = true, config = {}) {
            config = Object.assign({
                activeText: '是',
                activeColor: '#fff',
                activeBgColor: '#67C23A',
                inactiveText: '否',
                inactiveColor: '#000',
                inactiveBgColor: '#909399',
            }, config);
            dom = (typeof dom === 'object') ? dom : (this.getDomById(dom) || this.getDomByCn(dom));
            let _switch = dom.getElementsByClassName('switch_2020')[0];
            if (!_switch) {
                _switch = this.createDom();
                this.setAttDom(_switch, {'class': 'switch_2020'});
                _switch.innerHTML = `<span>${config.activeText}</span><span>${config.inactiveText}</span><span></span>`;
                this.appendDom(_switch, dom);
            }
            this.setCssDom(_switch, {borderRadius: `${Math.ceil(dom.offsetHeight / 2)}px` });
            _switch.children[0].style.color = config.inactiveColor;
            _switch.children[1].style.color = config.inactiveColor;
            _switch.children[0].style.backgroundColor = config.inactiveBgColor;
            _switch.children[1].style.backgroundColor = config.inactiveBgColor;
            _switch.children[2].style.color = config.activeColor;
            _switch.children[2].style.backgroundColor = config.activeBgColor;
            _switch.children[0].onclick = function () {
                dom['value'] = true;
                _switch.className = 'switch_2020 leftRun';
                _switch.children[2].innerHTML = _switch.children[0].innerHTML;
            }
            _switch.children[1].onclick = function () {
                dom['value'] = false;
                _switch.className = 'switch_2020 rightRun';
                _switch.children[2].innerHTML = _switch.children[1].innerHTML;
            }
            _switch.children[value ? 0 : 1].click();
            // hereUi.switchButton('view',true,{}).onclick = function () {
            //     console.log(this.value);
            // }
            return dom;
        }
        flipAnimate (dom,status = false) {
            this.setAttDom(document.body, {'class': status ? 'dialogOverlay' : ''});
            this.setCssDom(dom, {
                'position': 'fixed',
                'top': '50%',
                'left': '50%',
                'opacity': 0,
                'zIndex': status ? 2020 : -2020,
                'transform': 'translate(-50%,-50%) rotateY(-90deg)',
                'animation': `${status ? 'flipShow' : 'flipHide'} 250ms linear forwards`
            });
        }

        router () {
            const query = {};
            const {href,origin,hostname,pathname} = window.location;
            if (href.indexOf('?') > -1) {
                let params = href.split('?')[1];
                if (params.indexOf('&') > 1) {
                    params = params.split('&');
                } else {
                    params = [params];
                }
                for (let p of params) {
                    if (p.indexOf('=') > -1) {
                        let temp = p.split('=');
                        query[temp[0]] =  temp[1];
                    }
                }
            }
            return {href,query,origin,hostname,pathname};
        }
        timeInfo (time = null) {
            const date = new Date();
            const getLocalTime = (timestamp) => {
                const TIME = new Date(timestamp * 1000);
                let year = TIME.getFullYear();
                let month = TIME.getMonth() + 1;
                let week = TIME.getDay();
                let date = TIME.getDate();
                let hour = TIME.getHours();
                let minute = TIME.getMinutes();
                let second = TIME.getSeconds();
                let m = month < 10 ? `0${month}` : month;
                let d = date < 10 ? `0${date}` : date;
                let h = hour < 10 ? `0${hour}` : hour;
                let mm = minute < 10 ? `0${minute}` : minute;
                let s = second < 10 ? `0${second}` : second;
                return {
                    year,month,date,hour,minute,second,week,timestamp,
                    localtime: `${year}-${m}-${d} ${h}:${mm}:${s}`
                };
            };
            let _timestamp = time || Date.parse(date) / 1000;
            if (this.dataType(_timestamp) === 'string') {
                _timestamp = parseInt(new Date(_timestamp.replace(/\-/g, '/')).getTime()) / 1000;
            }
            return Object.assign(
                getLocalTime(_timestamp), {
                    current: getLocalTime(Date.parse(date) / 1000),
                    weeHour: getLocalTime(date.setHours(0,0,0,0) / 1000)
                });
        }
        judgeJson (str) {
            return (str && typeof JSON.parse(str) == "object");
        }
        dataType (data = null) {
            return Object.prototype.toString.call(data).split(' ')[1].split(']')[0].toLowerCase();
        }
    }
    global.HereUi = HereUi;
})(this)