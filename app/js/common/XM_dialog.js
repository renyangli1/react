;(function($, window, undefined) {
    var isDialog = null,
        _instance = {},
        _instanceId = 1,
        _cid = 1,
        _zIndex = 999900,
        defaults = {
            type: 'load',
            time: false,
            shade: true,
            shadeClose: false,
            html: '',
            animation: false,
            unload: true,
            align: 'center',
            buttons: [{
                name: '取消',
                callback: function() {}
            }, {
                name: '确认',
                callback: function() {}
            }],
            init: function() {},
            closeFn: function() {}
        };

    function DialogLayer(options) {
        var me = this;
        if (options && options.type !== 'load') {
            for (var i in _instance) {
                if (_instance[i].options.type === options.type) {
                    _instance[i].close();
                }
            }
            me.instanceId = _instanceId++;
            _instance[me.instanceId] = me;

        }
        me.options = $.extend({}, defaults, options ? options : {});

        me.isClosed = false;
        // 销毁存在的对象
        if (isDialog) {
            if (me.options.type === isDialog.options.type) {
                isDialog.close();
            }
        }
        me.view();
    }
    DialogLayer.prototype.view = function() {
        var _self = this,
            opts = _self.options,
            type = opts.type,
            html = opts.html,
            $div = $('<div class="Xmapp-layer ' + (opts.cssClass || '') + '"></div>'),
            content = '',
            tags = '',
            align = opts.align,
            cssStyle = {},
            clientWidth = $('body').width() * 0.85;

        _self.$el = $div;

        // 加载
        if (type == 'load') {
            // 加载，特殊处理成白色
            tags += '<div class="Xmapp-load"> </div>' + '<div class="Xmapp-text">' + html + '</div>';
            content = '<div class="Xmapp-load-box Xmapp-loading-box">' + tags + '</div>';
        }

        // 提示框
        if (type == 'tip') {
            // 加载 图标
            tags += html;
            content = '<div class="Xmapp-load-box">' + tags + '</div>';
        }
        // 询问框 警告框
        if (type == 'confirm' || type == 'alert') {

            if (type == 'alert') {
                // 确认取消
                tags += '<div class="Xmapp-btn blue-color">' + opts.buttons[0].name + '</div>';
            } else {
                // 确认取消
                $.each(opts.buttons, function(i, v) {
                    tags += '<div class="Xmapp-btn">' + v.name + '</div>';
                });
            }

            content = '<div class="Xmapp-box" style="width:' + clientWidth + 'px">' + '<div class="Xmapp-con">' + html + '</div>' + '<div class="Xmapp-btns">' + tags + '</div>' + '</div>';
        }
        $div.html(
            '<div class="Xmapp-main">' + '<div class="Xmapp-section">' + content + '</div>' + '</div>');

        // 遮罩
        if (opts.shade) {
            _self.$shade = $('<div class="Xmapp-shade"></div>');
            _self.$shade.attr('id', 'Xmapp-layer-' + (_cid++));

            if (type == 'load') {
                _self.$shade = $('<div class="Xmapp-shade Xmapp-load-content"></div>');
                $div.addClass('Xmapp-load-layer');
            }
            $('body').append(_self.$shade);
            // 设置遮罩层css
            _self.$shade.css({
                'zIndex': _zIndex++
            });
        }
        // 动画 animation
        opts.animation && $div.addClass(opts.animation + 'in');

        $div.attr('id', 'Xmapp-layer-' + (_cid++));
        $('body').append($div);
        // 绑定事件
        _self.action();

        // 设置弹出层css
        if (align == 'center') {
            cssStyle = {
                marginTop: -(_self.$el.height() / 2),
                marginLeft: -(_self.$el.width() / 2),
                left: '50%',
                top: '50%'
            };
        } else if (align == 'bottom' || align == 'top') {
            cssStyle = {
                marginTop: -(_self.$el.height() / 2),
                marginLeft: -(_self.$el.width() / 2),
                left: '50%',
                bottom: '16%'
            };
        } else if (align == 'left' || align == 'right') {
            cssStyle[align] = 0;
            cssStyle['top'] = 0;
            cssStyle['height'] = '100%';
        }

        cssStyle['zIndex'] = _zIndex++;
        cssStyle['width'] = clientWidth;
        _self.$el.css(cssStyle);
    };
    DialogLayer.prototype.action = function() {
        var _self = this,
            opts = _self.options,
            type = opts.type,
            html = opts.html,
            time = opts.time,
            timer = null;

        // 定时关闭
        if (time !== false) {
            if (time == true) {
                time = 2000;
            }
            timer = setTimeout(function() {
                _self.close();
            }, time);
        }
        // 遮罩关闭
        if (opts.shadeClose && opts.shade) {
            _self.$shade.on('click touchmove', function() {
                var btn = opts.buttons[0];
                if (!_self.isClosed) {
                    timer && clearTimeout(timer);
                    _self.isClosed = true;
                    if (btn) {
                        typeof btn.callback === 'function' && btn.callback();
                    }
                    _self.close();
                }
            });
        }

        // 按钮关闭
        $.btns = $('.Xmapp-btn', _self.$el);
        if ($.btns.length !== 0) {
            // 循环按钮dom
            $('.Xmapp-btn', _self.$el).each(function(i) {
                var $btn = $(this),
                    obj = opts.buttons[i];
                // 绑定按钮事件
                $btn.click(function(e) {
                    var callback = obj.callback ? obj.callback($btn.text(), _self.$el) : null;
                    // 阻止关闭
                    if (callback === false) {
                        return;
                    } else {
                        _self.close();
                    }
                });
            });
        }

        // 自定义初始化
        opts.init();
    };
    DialogLayer.prototype.close = function() {
        var _self = this,
            opts = _self.options;

        if (!opts) {
            return;
        }

        if (opts.unload) {
            if (opts.animation) {
                _self.animate(_self.unload);
            } else {
                _self.unload();
            }
        } else {
            if (opts.animation) {
                _self.animate(_self.hide);
            } else {
                _self.hide();
            }
        }

        isDialog = null;
        if (opts && opts.type !== 'load') {
            delete _instance[_self.instanceId];
        }
        opts.closeFn();
    };
    DialogLayer.prototype.animate = function(callback) {
        var _self = this,
            opts = _self.options;

        _self.$el.removeClass(opts.animation + 'in');
        _self.$el.addClass(opts.animation + 'out');

        _self.$el.on('webkitAnimationEnd', function() {
            _self.$el.removeClass(opts.animation + 'out');

            callback.apply(_self);
            _self.$el.off();
        });
    };
    DialogLayer.prototype.unload = function() {
        var _self = this,
            opts = _self.options;

        // 释放动画
        _self.$el.find('.Xmapp-load').removeClass('Xmapp-load');
        // 移除事件
        $('.Xmapp-btn', _self.$el).off('click');
        // 移除dom
        _self.$el.remove();

        if (opts.shade) {
            _self.$shade.off('click touchmove');
            _self.$shade.remove();
        }
        _self.options = null;
    };
    DialogLayer.prototype.show = function() {
        var _self = this,
            opts = _self.options;

        // 销毁存在的对象
        if (isDialog) {
            isDialog.close();
        }

        _self.$el.show();
        _self.$shade && _self.$shade.show();
        isDialog = _self;
    };
    DialogLayer.prototype.hide = function() {
        var _self = this,
            opts = _self.options;

        _self.$el.hide();
        _self.$shade && _self.$shade.hide();
        _self.isClosed = false;
    };

    var dialog = {
        create: function(options) {
            isDialog = new DialogLayer(options);
            return isDialog;
        },
        load: function() {
            isDialog = new DialogLayer({
                type: 'load',
                html: "",
                time: false,
                shadeClose: false
            });
            return isDialog;
        },
        unload: function() {
            if ($('.Xmapp-load-content').length !== 0) {
                $('.Xmapp-load-content').off('click touchmove').remove();
                $('.Xmapp-load-layer').remove();
            } else {
                return false;
            }
        },
        //销毁所有dialog
        destroy: function() {
            $('.Xmapp-shade').off('click touchmove').remove();
            $('.Xmapp-layer').remove();
        },
        confirm: function(html, buttons, close) {
            isDialog = new DialogLayer({
                type: 'confirm',
                html: html,
                shadeClose: close ? close : false,
                buttons: buttons
            });

            return isDialog;
        },
        alert: function(html, buttons, close) {
            isDialog = new DialogLayer({
                type: 'alert',
                html: html,
                shadeClose: close ? close : false,
                buttons: buttons ? buttons : [{
                    name: '确认'
                }]
            });
            return isDialog;
        },
        tip: function(html, time, shade, close, callback) {
            isDialog = new DialogLayer({
                type: 'tip',
                html: html,
                align: 'bottom',
                time: time !== undefined ? time : 2000,
                shade: close ? close : false,
                shadeClose: typeof close === 'boolean' ? close : true,
                closeFn: callback ? callback : function() {}
            });
            return isDialog;
        },
        config: function(options) {
            defaults = $.extend(defaults, options ? options : {});
        }
    };

    'function' === typeof define ? define(function() {
        return dialog;
    }) : $.XM_dialog = dialog;
})(window.jQuery || window.Zepto, window);
