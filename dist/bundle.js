
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if (typeof $$scope.dirty === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.18.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var FileSaver_min = createCommonjsModule(function (module, exports) {
    (function(a,b){b();})(commonjsGlobal,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d);},e.onerror=function(){console.error("could not download file");},e.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal?commonjsGlobal:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null;},j.readAsDataURL(a);}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l);},4E4);}});f.saveAs=a.saveAs=a,(module.exports=a);});

    //# sourceMappingURL=FileSaver.min.js.map
    });

    /* src/components/Image.svelte generated by Svelte v3.18.2 */
    const file = "src/components/Image.svelte";

    function create_fragment(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let span0;
    	let t1;
    	let t2;
    	let span1;
    	let t3;
    	let t4;
    	let span2;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			span0 = element("span");
    			t1 = text("copiar");
    			t2 = space();
    			span1 = element("span");
    			t3 = text("baixar");
    			t4 = space();
    			span2 = element("span");
    			span2.textContent = "copiado!";
    			if (img.src !== (img_src_value = /*placeholder*/ ctx[1] || /*src*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*alt*/ ctx[3]);
    			attr_dev(img, "class", "svelte-uq4efq");
    			add_location(img, file, 97, 1, 1651);
    			attr_dev(span0, "class", "clipboard svelte-uq4efq");
    			attr_dev(span0, "data-clipboard-text", /*src*/ ctx[0]);
    			add_location(span0, file, 99, 1, 1692);
    			attr_dev(span1, "data-target", /*src*/ ctx[0]);
    			attr_dev(span1, "data-filename", /*filename*/ ctx[2]);
    			attr_dev(span1, "class", "svelte-uq4efq");
    			add_location(span1, file, 103, 1, 1762);
    			attr_dev(span2, "class", "copied svelte-uq4efq");
    			add_location(span2, file, 108, 1, 1856);
    			attr_dev(div, "class", "image svelte-uq4efq");
    			add_location(div, file, 96, 0, 1630);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, span0);
    			append_dev(span0, t1);
    			append_dev(div, t2);
    			append_dev(div, span1);
    			append_dev(span1, t3);
    			append_dev(div, t4);
    			append_dev(div, span2);
    			dispose = listen_dev(span1, "click", handleClick, false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*placeholder, src*/ 3 && img.src !== (img_src_value = /*placeholder*/ ctx[1] || /*src*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*alt*/ 8) {
    				attr_dev(img, "alt", /*alt*/ ctx[3]);
    			}

    			if (dirty & /*src*/ 1) {
    				attr_dev(span0, "data-clipboard-text", /*src*/ ctx[0]);
    			}

    			if (dirty & /*src*/ 1) {
    				attr_dev(span1, "data-target", /*src*/ ctx[0]);
    			}

    			if (dirty & /*filename*/ 4) {
    				attr_dev(span1, "data-filename", /*filename*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function handleClick() {
    	const target = this.dataset.target;
    	const filename = this.dataset.filename;

    	if (target) {
    		FileSaver_min.saveAs(target, filename);
    	}

    	
    }

    function instance($$self, $$props, $$invalidate) {
    	let { src } = $$props;
    	let { placeholder = false } = $$props;
    	let { filename } = $$props;
    	let { alt } = $$props;
    	let { classlist } = $$props;
    	const writable_props = ["src", "placeholder", "filename", "alt", "classlist"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Image> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("src" in $$props) $$invalidate(0, src = $$props.src);
    		if ("placeholder" in $$props) $$invalidate(1, placeholder = $$props.placeholder);
    		if ("filename" in $$props) $$invalidate(2, filename = $$props.filename);
    		if ("alt" in $$props) $$invalidate(3, alt = $$props.alt);
    		if ("classlist" in $$props) $$invalidate(4, classlist = $$props.classlist);
    	};

    	$$self.$capture_state = () => {
    		return {
    			src,
    			placeholder,
    			filename,
    			alt,
    			classlist
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("src" in $$props) $$invalidate(0, src = $$props.src);
    		if ("placeholder" in $$props) $$invalidate(1, placeholder = $$props.placeholder);
    		if ("filename" in $$props) $$invalidate(2, filename = $$props.filename);
    		if ("alt" in $$props) $$invalidate(3, alt = $$props.alt);
    		if ("classlist" in $$props) $$invalidate(4, classlist = $$props.classlist);
    	};

    	return [src, placeholder, filename, alt, classlist];
    }

    class Image extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			src: 0,
    			placeholder: 1,
    			filename: 2,
    			alt: 3,
    			classlist: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*src*/ ctx[0] === undefined && !("src" in props)) {
    			console.warn("<Image> was created without expected prop 'src'");
    		}

    		if (/*filename*/ ctx[2] === undefined && !("filename" in props)) {
    			console.warn("<Image> was created without expected prop 'filename'");
    		}

    		if (/*alt*/ ctx[3] === undefined && !("alt" in props)) {
    			console.warn("<Image> was created without expected prop 'alt'");
    		}

    		if (/*classlist*/ ctx[4] === undefined && !("classlist" in props)) {
    			console.warn("<Image> was created without expected prop 'classlist'");
    		}
    	}

    	get src() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get filename() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set filename(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alt() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alt(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classlist() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classlist(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Media.svelte generated by Svelte v3.18.2 */
    const file$1 = "src/components/Media.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (128:1) {#each data as i}
    function create_each_block(ctx) {
    	let div;
    	let t;
    	let div_class_value;
    	let current;
    	const image_spread_levels = [/*i*/ ctx[1]];
    	let image_props = {};

    	for (let i = 0; i < image_spread_levels.length; i += 1) {
    		image_props = assign(image_props, image_spread_levels[i]);
    	}

    	const image = new Image({ props: image_props, $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(image.$$.fragment);
    			t = space();
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(/*i*/ ctx[1].classlist) + " svelte-17vjt5v"));
    			add_location(div, file$1, 128, 2, 2214);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(image, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const image_changes = (dirty & /*data*/ 1)
    			? get_spread_update(image_spread_levels, [get_spread_object(/*i*/ ctx[1])])
    			: {};

    			image.$set(image_changes);

    			if (!current || dirty & /*data*/ 1 && div_class_value !== (div_class_value = "" + (null_to_empty(/*i*/ ctx[1].classlist) + " svelte-17vjt5v"))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(image.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(image.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(image);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(128:1) {#each data as i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let current;
    	let each_value = /*data*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "images svelte-17vjt5v");
    			add_location(div, file$1, 126, 0, 2172);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { data } = $$props;
    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Media> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => {
    		return { data };
    	};

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	return [data];
    }

    class Media extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Media",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
    			console.warn("<Media> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<Media>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Media>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var clipboard = createCommonjsModule(function (module, exports) {
    /*!
     * clipboard.js v2.0.4
     * https://zenorocha.github.io/clipboard.js
     * 
     * Licensed MIT © Zeno Rocha
     */
    (function webpackUniversalModuleDefinition(root, factory) {
    	module.exports = factory();
    })(commonjsGlobal, function() {
    return /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId]) {
    /******/ 			return installedModules[moduleId].exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
    /******/ 			i: moduleId,
    /******/ 			l: false,
    /******/ 			exports: {}
    /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
    /******/ 		if(!__webpack_require__.o(exports, name)) {
    /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
    /******/ 		}
    /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
    /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 		}
    /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function(value, mode) {
    /******/ 		if(mode & 1) value = __webpack_require__(value);
    /******/ 		if(mode & 8) return value;
    /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /******/ 		var ns = Object.create(null);
    /******/ 		__webpack_require__.r(ns);
    /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
    /******/ 		return ns;
    /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
    /******/ 		var getter = module && module.__esModule ?
    /******/ 			function getDefault() { return module['default']; } :
    /******/ 			function getModuleExports() { return module; };
    /******/ 		__webpack_require__.d(getter, 'a', getter);
    /******/ 		return getter;
    /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 0);
    /******/ })
    /************************************************************************/
    /******/ ([
    /* 0 */
    /***/ (function(module, exports, __webpack_require__) {


    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _clipboardAction = __webpack_require__(1);

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter = __webpack_require__(3);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener = __webpack_require__(4);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    /**
     * Base class which takes one or more elements, adds event listeners to them,
     * and instantiates a new `ClipboardAction` on each click.
     */
    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                this.container = _typeof(options.container) === 'object' ? options.container : document.body;
            }

            /**
             * Adds a click event listener to the passed trigger.
             * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
             */

        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }

            /**
             * Defines a new `ClipboardAction` on each click event.
             * @param {Event} e
             */

        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    container: this.container,
                    trigger: trigger,
                    emitter: this
                });
            }

            /**
             * Default `action` lookup function.
             * @param {Element} trigger
             */

        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }

            /**
             * Default `target` lookup function.
             * @param {Element} trigger
             */

        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }

            /**
             * Returns the support of the given action, or all actions if no action is
             * given.
             * @param {String} [action]
             */

        }, {
            key: 'defaultText',


            /**
             * Default `text` lookup function.
             * @param {Element} trigger
             */
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }

            /**
             * Destroy lifecycle.
             */

        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }], [{
            key: 'isSupported',
            value: function isSupported() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

                var actions = typeof action === 'string' ? [action] : action;
                var support = !!document.queryCommandSupported;

                actions.forEach(function (action) {
                    support = support && !!document.queryCommandSupported(action);
                });

                return support;
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */


    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;

    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {


    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _select = __webpack_require__(2);

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Inner class which performs selection from either `text` or `target`
     * properties and then executes copy or cut operations.
     */
    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.container = options.container;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }

            /**
             * Decides which selection strategy is going to be applied based
             * on the existence of `text` and `target` properties.
             */

        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }

            /**
             * Creates a fake textarea element, sets its value from `text` property,
             * and makes a selection on it.
             */

        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                this.container.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }

            /**
             * Only removes the fake element after another click event, that way
             * a user can hit `Ctrl+C` to copy because selection still exists.
             */

        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    this.container.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    this.container.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }

            /**
             * Selects the content from element passed on `target` property.
             */

        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }

            /**
             * Executes the copy operation based on the current selection.
             */

        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }

            /**
             * Fires an event based on the copy operation result.
             * @param {Boolean} succeeded
             */

        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }

            /**
             * Moves focus away from `target` and back to the trigger, removes current selection.
             */

        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.trigger) {
                    this.trigger.focus();
                }

                window.getSelection().removeAllRanges();
            }

            /**
             * Sets the `action` to be performed which can be either 'copy' or 'cut'.
             * @param {String} action
             */

        }, {
            key: 'destroy',


            /**
             * Destroy lifecycle.
             */
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            }

            /**
             * Gets the `action` property.
             * @return {String}
             */
            ,
            get: function get() {
                return this._action;
            }

            /**
             * Sets the `target` property using an element
             * that will be have its content copied.
             * @param {Element} target
             */

        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            }

            /**
             * Gets the `target` property.
             * @return {String|HTMLElement}
             */
            ,
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;

    /***/ }),
    /* 2 */
    /***/ (function(module, exports) {

    function select(element) {
        var selectedText;

        if (element.nodeName === 'SELECT') {
            element.focus();

            selectedText = element.value;
        }
        else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            var isReadOnly = element.hasAttribute('readonly');

            if (!isReadOnly) {
                element.setAttribute('readonly', '');
            }

            element.select();
            element.setSelectionRange(0, element.value.length);

            if (!isReadOnly) {
                element.removeAttribute('readonly');
            }

            selectedText = element.value;
        }
        else {
            if (element.hasAttribute('contenteditable')) {
                element.focus();
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);

            selectedText = selection.toString();
        }

        return selectedText;
    }

    module.exports = select;


    /***/ }),
    /* 3 */
    /***/ (function(module, exports) {

    function E () {
      // Keep this empty so it's easier to inherit from
      // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
    }

    E.prototype = {
      on: function (name, callback, ctx) {
        var e = this.e || (this.e = {});

        (e[name] || (e[name] = [])).push({
          fn: callback,
          ctx: ctx
        });

        return this;
      },

      once: function (name, callback, ctx) {
        var self = this;
        function listener () {
          self.off(name, listener);
          callback.apply(ctx, arguments);
        }
        listener._ = callback;
        return this.on(name, listener, ctx);
      },

      emit: function (name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;

        for (i; i < len; i++) {
          evtArr[i].fn.apply(evtArr[i].ctx, data);
        }

        return this;
      },

      off: function (name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];

        if (evts && callback) {
          for (var i = 0, len = evts.length; i < len; i++) {
            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
              liveEvents.push(evts[i]);
          }
        }

        // Remove event from queue to prevent memory leak
        // Suggested by https://github.com/lazd
        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

        (liveEvents.length)
          ? e[name] = liveEvents
          : delete e[name];

        return this;
      }
    };

    module.exports = E;


    /***/ }),
    /* 4 */
    /***/ (function(module, exports, __webpack_require__) {

    var is = __webpack_require__(5);
    var delegate = __webpack_require__(6);

    /**
     * Validates all params and calls the right
     * listener function based on its target type.
     *
     * @param {String|HTMLElement|HTMLCollection|NodeList} target
     * @param {String} type
     * @param {Function} callback
     * @return {Object}
     */
    function listen(target, type, callback) {
        if (!target && !type && !callback) {
            throw new Error('Missing required arguments');
        }

        if (!is.string(type)) {
            throw new TypeError('Second argument must be a String');
        }

        if (!is.fn(callback)) {
            throw new TypeError('Third argument must be a Function');
        }

        if (is.node(target)) {
            return listenNode(target, type, callback);
        }
        else if (is.nodeList(target)) {
            return listenNodeList(target, type, callback);
        }
        else if (is.string(target)) {
            return listenSelector(target, type, callback);
        }
        else {
            throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
        }
    }

    /**
     * Adds an event listener to a HTML element
     * and returns a remove listener function.
     *
     * @param {HTMLElement} node
     * @param {String} type
     * @param {Function} callback
     * @return {Object}
     */
    function listenNode(node, type, callback) {
        node.addEventListener(type, callback);

        return {
            destroy: function() {
                node.removeEventListener(type, callback);
            }
        }
    }

    /**
     * Add an event listener to a list of HTML elements
     * and returns a remove listener function.
     *
     * @param {NodeList|HTMLCollection} nodeList
     * @param {String} type
     * @param {Function} callback
     * @return {Object}
     */
    function listenNodeList(nodeList, type, callback) {
        Array.prototype.forEach.call(nodeList, function(node) {
            node.addEventListener(type, callback);
        });

        return {
            destroy: function() {
                Array.prototype.forEach.call(nodeList, function(node) {
                    node.removeEventListener(type, callback);
                });
            }
        }
    }

    /**
     * Add an event listener to a selector
     * and returns a remove listener function.
     *
     * @param {String} selector
     * @param {String} type
     * @param {Function} callback
     * @return {Object}
     */
    function listenSelector(selector, type, callback) {
        return delegate(document.body, selector, type, callback);
    }

    module.exports = listen;


    /***/ }),
    /* 5 */
    /***/ (function(module, exports) {

    /**
     * Check if argument is a HTML element.
     *
     * @param {Object} value
     * @return {Boolean}
     */
    exports.node = function(value) {
        return value !== undefined
            && value instanceof HTMLElement
            && value.nodeType === 1;
    };

    /**
     * Check if argument is a list of HTML elements.
     *
     * @param {Object} value
     * @return {Boolean}
     */
    exports.nodeList = function(value) {
        var type = Object.prototype.toString.call(value);

        return value !== undefined
            && (type === '[object NodeList]' || type === '[object HTMLCollection]')
            && ('length' in value)
            && (value.length === 0 || exports.node(value[0]));
    };

    /**
     * Check if argument is a string.
     *
     * @param {Object} value
     * @return {Boolean}
     */
    exports.string = function(value) {
        return typeof value === 'string'
            || value instanceof String;
    };

    /**
     * Check if argument is a function.
     *
     * @param {Object} value
     * @return {Boolean}
     */
    exports.fn = function(value) {
        var type = Object.prototype.toString.call(value);

        return type === '[object Function]';
    };


    /***/ }),
    /* 6 */
    /***/ (function(module, exports, __webpack_require__) {

    var closest = __webpack_require__(7);

    /**
     * Delegates event to a selector.
     *
     * @param {Element} element
     * @param {String} selector
     * @param {String} type
     * @param {Function} callback
     * @param {Boolean} useCapture
     * @return {Object}
     */
    function _delegate(element, selector, type, callback, useCapture) {
        var listenerFn = listener.apply(this, arguments);

        element.addEventListener(type, listenerFn, useCapture);

        return {
            destroy: function() {
                element.removeEventListener(type, listenerFn, useCapture);
            }
        }
    }

    /**
     * Delegates event to a selector.
     *
     * @param {Element|String|Array} [elements]
     * @param {String} selector
     * @param {String} type
     * @param {Function} callback
     * @param {Boolean} useCapture
     * @return {Object}
     */
    function delegate(elements, selector, type, callback, useCapture) {
        // Handle the regular Element usage
        if (typeof elements.addEventListener === 'function') {
            return _delegate.apply(null, arguments);
        }

        // Handle Element-less usage, it defaults to global delegation
        if (typeof type === 'function') {
            // Use `document` as the first parameter, then apply arguments
            // This is a short way to .unshift `arguments` without running into deoptimizations
            return _delegate.bind(null, document).apply(null, arguments);
        }

        // Handle Selector-based usage
        if (typeof elements === 'string') {
            elements = document.querySelectorAll(elements);
        }

        // Handle Array-like based usage
        return Array.prototype.map.call(elements, function (element) {
            return _delegate(element, selector, type, callback, useCapture);
        });
    }

    /**
     * Finds closest match and invokes callback.
     *
     * @param {Element} element
     * @param {String} selector
     * @param {String} type
     * @param {Function} callback
     * @return {Function}
     */
    function listener(element, selector, type, callback) {
        return function(e) {
            e.delegateTarget = closest(e.target, selector);

            if (e.delegateTarget) {
                callback.call(element, e);
            }
        }
    }

    module.exports = delegate;


    /***/ }),
    /* 7 */
    /***/ (function(module, exports) {

    var DOCUMENT_NODE_TYPE = 9;

    /**
     * A polyfill for Element.matches()
     */
    if (typeof Element !== 'undefined' && !Element.prototype.matches) {
        var proto = Element.prototype;

        proto.matches = proto.matchesSelector ||
                        proto.mozMatchesSelector ||
                        proto.msMatchesSelector ||
                        proto.oMatchesSelector ||
                        proto.webkitMatchesSelector;
    }

    /**
     * Finds the closest parent that matches a selector.
     *
     * @param {Element} element
     * @param {String} selector
     * @return {Function}
     */
    function closest (element, selector) {
        while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
            if (typeof element.matches === 'function' &&
                element.matches(selector)) {
              return element;
            }
            element = element.parentNode;
        }
    }

    module.exports = closest;


    /***/ })
    /******/ ]);
    });
    });

    var ClipboardJS = unwrapExports(clipboard);

    const clipboard$1 = new ClipboardJS('.clipboard');

    clipboard$1.on('success', function(e) {
    	const trigger = e.trigger;
    	const parent = trigger.parentNode;

    	parent.classList.add('--copied');

    	setTimeout(() => {
    		parent.classList.remove('--copied');
    	}, 1300);

        e.clearSelection();
    });

    clipboard$1.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    const hexToRgb = hex => {
    	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    		return r + r + g + g + b + b;
    	});

    	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    	return result ? {
    		r: parseInt(result[1], 16),
    		g: parseInt(result[2], 16),
    		b: parseInt(result[3], 16)
    	} : null;
    };

    /* src/components/Color.svelte generated by Svelte v3.18.2 */
    const file$2 = "src/components/Color.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*color*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let span0;
    	let t2;
    	let span0_data_clipboard_text_value;
    	let t3;
    	let span1;
    	let t4;
    	let span1_data_clipboard_text_value;
    	let t5;
    	let span2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			span0 = element("span");
    			t2 = text("hex");
    			t3 = space();
    			span1 = element("span");
    			t4 = text("rgb");
    			t5 = space();
    			span2 = element("span");
    			span2.textContent = "copiado!";
    			attr_dev(div0, "class", "name svelte-1nyit0g");
    			add_location(div0, file$2, 100, 1, 1671);
    			attr_dev(span0, "data-clipboard-text", span0_data_clipboard_text_value = /*color*/ ctx[0].hex);
    			attr_dev(span0, "class", "clipboard svelte-1nyit0g");
    			add_location(span0, file$2, 102, 1, 1712);
    			attr_dev(span1, "data-clipboard-text", span1_data_clipboard_text_value = /*rgb*/ ctx[1](/*color*/ ctx[0].hex));
    			attr_dev(span1, "class", "clipboard svelte-1nyit0g");
    			add_location(span1, file$2, 106, 1, 1785);
    			attr_dev(span2, "class", "copied svelte-1nyit0g");
    			add_location(span2, file$2, 110, 1, 1863);
    			attr_dev(div1, "class", "color svelte-1nyit0g");
    			set_style(div1, "background-color", /*color*/ ctx[0].hex);
    			set_style(div1, "color", /*color*/ ctx[0].color);
    			add_location(div1, file$2, 93, 0, 1579);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			append_dev(div1, span0);
    			append_dev(span0, t2);
    			append_dev(div1, t3);
    			append_dev(div1, span1);
    			append_dev(span1, t4);
    			append_dev(div1, t5);
    			append_dev(div1, span2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color*/ 1 && t0_value !== (t0_value = /*color*/ ctx[0].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*color*/ 1 && span0_data_clipboard_text_value !== (span0_data_clipboard_text_value = /*color*/ ctx[0].hex)) {
    				attr_dev(span0, "data-clipboard-text", span0_data_clipboard_text_value);
    			}

    			if (dirty & /*color*/ 1 && span1_data_clipboard_text_value !== (span1_data_clipboard_text_value = /*rgb*/ ctx[1](/*color*/ ctx[0].hex))) {
    				attr_dev(span1, "data-clipboard-text", span1_data_clipboard_text_value);
    			}

    			if (dirty & /*color*/ 1) {
    				set_style(div1, "background-color", /*color*/ ctx[0].hex);
    			}

    			if (dirty & /*color*/ 1) {
    				set_style(div1, "color", /*color*/ ctx[0].color);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { color } = $$props;

    	const rgb = function (hex) {
    		const { r, g, b } = hexToRgb(hex);
    		const str = `rgb(${[r, g, b].join(",")})`;
    		return str;
    	};

    	const writable_props = ["color"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Color> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("color" in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => {
    		return { color };
    	};

    	$$self.$inject_state = $$props => {
    		if ("color" in $$props) $$invalidate(0, color = $$props.color);
    	};

    	return [color, rgb];
    }

    class Color extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Color",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*color*/ ctx[0] === undefined && !("color" in props)) {
    			console.warn("<Color> was created without expected prop 'color'");
    		}
    	}

    	get color() {
    		throw new Error("<Color>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Color>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Palette.svelte generated by Svelte v3.18.2 */
    const file$3 = "src/components/Palette.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (44:1) {#each data as color}
    function create_each_block$1(ctx) {
    	let div;
    	let t;
    	let current;

    	const color = new Color({
    			props: { color: /*color*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(color.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "item svelte-17e7tvl");
    			add_location(div, file$3, 44, 2, 673);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(color, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const color_changes = {};
    			if (dirty & /*data*/ 1) color_changes.color = /*color*/ ctx[1];
    			color.$set(color_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(color.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(color.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(color);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(44:1) {#each data as color}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let current;
    	let each_value = /*data*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "colors svelte-17e7tvl");
    			add_location(div, file$3, 42, 0, 627);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { data } = $$props;
    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Palette> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => {
    		return { data };
    	};

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	return [data];
    }

    class Palette extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Palette",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
    			console.warn("<Palette> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<Palette>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Palette>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/FontFamily.svelte generated by Svelte v3.18.2 */

    const file$4 = "src/components/FontFamily.svelte";

    function create_fragment$4(ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*family*/ ctx[0].name + "";
    	let t0;
    	let br;
    	let t1;
    	let small;
    	let t2;
    	let t3_value = /*family*/ ctx[0].desc + "";
    	let t3;
    	let t4;
    	let t5;
    	let span0;
    	let t6;
    	let span0_data_clipboard_text_value;
    	let t7;
    	let span1;
    	let a;
    	let t8;
    	let a_href_value;
    	let t9;
    	let span2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			br = element("br");
    			t1 = space();
    			small = element("small");
    			t2 = text("(");
    			t3 = text(t3_value);
    			t4 = text(")");
    			t5 = space();
    			span0 = element("span");
    			t6 = text("copiar");
    			t7 = space();
    			span1 = element("span");
    			a = element("a");
    			t8 = text("ver");
    			t9 = space();
    			span2 = element("span");
    			span2.textContent = "copiado!";
    			attr_dev(br, "class", "svelte-1jqs7fw");
    			add_location(br, file$4, 100, 15, 1632);
    			attr_dev(small, "class", "svelte-1jqs7fw");
    			add_location(small, file$4, 101, 2, 1640);
    			attr_dev(div0, "class", "name svelte-1jqs7fw");
    			add_location(div0, file$4, 99, 1, 1598);
    			attr_dev(span0, "class", "clipboard svelte-1jqs7fw");
    			attr_dev(span0, "data-clipboard-text", span0_data_clipboard_text_value = /*family*/ ctx[0].name);
    			add_location(span0, file$4, 104, 1, 1681);
    			attr_dev(a, "href", a_href_value = /*family*/ ctx[0].href);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "class", "svelte-1jqs7fw");
    			add_location(a, file$4, 109, 2, 1768);
    			attr_dev(span1, "class", "svelte-1jqs7fw");
    			add_location(span1, file$4, 108, 1, 1759);
    			attr_dev(span2, "class", "copied svelte-1jqs7fw");
    			add_location(span2, file$4, 112, 1, 1825);
    			attr_dev(div1, "class", "family svelte-1jqs7fw");
    			add_location(div1, file$4, 98, 0, 1576);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, br);
    			append_dev(div0, t1);
    			append_dev(div0, small);
    			append_dev(small, t2);
    			append_dev(small, t3);
    			append_dev(small, t4);
    			append_dev(div1, t5);
    			append_dev(div1, span0);
    			append_dev(span0, t6);
    			append_dev(div1, t7);
    			append_dev(div1, span1);
    			append_dev(span1, a);
    			append_dev(a, t8);
    			append_dev(div1, t9);
    			append_dev(div1, span2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*family*/ 1 && t0_value !== (t0_value = /*family*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*family*/ 1 && t3_value !== (t3_value = /*family*/ ctx[0].desc + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*family*/ 1 && span0_data_clipboard_text_value !== (span0_data_clipboard_text_value = /*family*/ ctx[0].name)) {
    				attr_dev(span0, "data-clipboard-text", span0_data_clipboard_text_value);
    			}

    			if (dirty & /*family*/ 1 && a_href_value !== (a_href_value = /*family*/ ctx[0].href)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { family } = $$props;
    	const writable_props = ["family"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FontFamily> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("family" in $$props) $$invalidate(0, family = $$props.family);
    	};

    	$$self.$capture_state = () => {
    		return { family };
    	};

    	$$self.$inject_state = $$props => {
    		if ("family" in $$props) $$invalidate(0, family = $$props.family);
    	};

    	return [family];
    }

    class FontFamily extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { family: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FontFamily",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*family*/ ctx[0] === undefined && !("family" in props)) {
    			console.warn("<FontFamily> was created without expected prop 'family'");
    		}
    	}

    	get family() {
    		throw new Error("<FontFamily>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set family(value) {
    		throw new Error("<FontFamily>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Typography.svelte generated by Svelte v3.18.2 */
    const file$5 = "src/components/Typography.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (44:1) {#each data as family}
    function create_each_block$2(ctx) {
    	let div;
    	let t;
    	let current;

    	const fontfamily = new FontFamily({
    			props: { family: /*family*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(fontfamily.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "item svelte-v283h1");
    			add_location(div, file$5, 44, 2, 704);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(fontfamily, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const fontfamily_changes = {};
    			if (dirty & /*data*/ 1) fontfamily_changes.family = /*family*/ ctx[1];
    			fontfamily.$set(fontfamily_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fontfamily.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fontfamily.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(fontfamily);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(44:1) {#each data as family}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let current;
    	let each_value = /*data*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "typography svelte-v283h1");
    			add_location(div, file$5, 42, 0, 653);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { data } = $$props;
    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Typography> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => {
    		return { data };
    	};

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	return [data];
    }

    class Typography extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Typography",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
    			console.warn("<Typography> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<Typography>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Typography>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/UIIcons.svelte generated by Svelte v3.18.2 */

    const file$6 = "src/components/UIIcons.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (22:1) {#each data as icon}
    function create_each_block$3(ctx) {
    	let div2;
    	let div0;
    	let a;
    	let t0_value = /*icon*/ ctx[1].name + "";
    	let t0;
    	let a_href_value;
    	let t1;
    	let div1;
    	let t2_value = /*icon*/ ctx[1].purpose + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(a, "href", a_href_value = /*icon*/ ctx[1].source);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$6, 24, 4, 292);
    			attr_dev(div0, "class", "name svelte-1is479e");
    			add_location(div0, file$6, 23, 3, 269);
    			attr_dev(div1, "class", "purpose svelte-1is479e");
    			add_location(div1, file$6, 28, 3, 370);
    			attr_dev(div2, "class", "item svelte-1is479e");
    			add_location(div2, file$6, 22, 2, 247);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, a);
    			append_dev(a, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);
    			append_dev(div2, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && t0_value !== (t0_value = /*icon*/ ctx[1].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*data*/ 1 && a_href_value !== (a_href_value = /*icon*/ ctx[1].source)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*data*/ 1 && t2_value !== (t2_value = /*icon*/ ctx[1].purpose + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(22:1) {#each data as icon}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let each_value = /*data*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "icons svelte-1is479e");
    			add_location(div, file$6, 20, 0, 203);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { data } = $$props;
    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<UIIcons> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => {
    		return { data };
    	};

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	return [data];
    }

    class UIIcons extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UIIcons",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
    			console.warn("<UIIcons> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<UIIcons>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<UIIcons>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Resources.svelte generated by Svelte v3.18.2 */

    const file$7 = "src/components/Resources.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (59:1) {#each data as domain}
    function create_each_block$4(ctx) {
    	let div2;
    	let div0;
    	let a;
    	let t0_value = /*domain*/ ctx[1].name + "";
    	let t0;
    	let a_href_value;
    	let t1;
    	let small;
    	let small_data_clipboard_text_value;
    	let t2;
    	let div1;
    	let t3_value = /*domain*/ ctx[1].domain + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = text(" | ");
    			small = element("small");
    			t2 = space();
    			div1 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			attr_dev(a, "href", a_href_value = /*domain*/ ctx[1].domain);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$7, 61, 4, 896);
    			attr_dev(small, "data-clipboard-text", small_data_clipboard_text_value = /*domain*/ ctx[1].domain);
    			attr_dev(small, "class", "clipboard svelte-qobutn");
    			add_location(small, file$7, 63, 11, 967);
    			attr_dev(div0, "class", "name svelte-qobutn");
    			add_location(div0, file$7, 60, 3, 873);
    			attr_dev(div1, "class", "details svelte-qobutn");
    			add_location(div1, file$7, 66, 3, 1045);
    			attr_dev(div2, "class", "item svelte-qobutn");
    			add_location(div2, file$7, 59, 2, 851);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, a);
    			append_dev(a, t0);
    			append_dev(div0, t1);
    			append_dev(div0, small);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, t3);
    			append_dev(div2, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && t0_value !== (t0_value = /*domain*/ ctx[1].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*data*/ 1 && a_href_value !== (a_href_value = /*domain*/ ctx[1].domain)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*data*/ 1 && small_data_clipboard_text_value !== (small_data_clipboard_text_value = /*domain*/ ctx[1].domain)) {
    				attr_dev(small, "data-clipboard-text", small_data_clipboard_text_value);
    			}

    			if (dirty & /*data*/ 1 && t3_value !== (t3_value = /*domain*/ ctx[1].domain + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(59:1) {#each data as domain}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div;
    	let each_value = /*data*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "domains svelte-qobutn");
    			add_location(div, file$7, 57, 0, 803);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { data } = $$props;
    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Resources> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => {
    		return { data };
    	};

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	return [data];
    }

    class Resources extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Resources",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
    			console.warn("<Resources> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<Resources>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Resources>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var version = "1.1.0";

    /* src/components/Nav.svelte generated by Svelte v3.18.2 */
    const file$8 = "src/components/Nav.svelte";

    function create_fragment$8(ctx) {
    	let header;
    	let nav;
    	let a;
    	let t0;
    	let t1;
    	let h1;
    	let t2;
    	let small;
    	let t5;
    	let ul;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			header = element("header");
    			nav = element("nav");
    			a = element("a");
    			t0 = text(/*website*/ ctx[1]);
    			t1 = space();
    			h1 = element("h1");
    			t2 = text("Styleguide ");
    			small = element("small");
    			small.textContent = `v${version}`;
    			t5 = space();
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			attr_dev(a, "href", /*website*/ ctx[1]);
    			attr_dev(a, "title", "Website");
    			attr_dev(a, "target", "_blank");
    			set_style(a, "background-image", "url(" + /*logo*/ ctx[0] + ")");
    			attr_dev(a, "class", "svelte-zmmwsk");
    			add_location(a, file$8, 86, 2, 1363);
    			attr_dev(small, "class", "svelte-zmmwsk");
    			add_location(small, file$8, 93, 17, 1501);
    			attr_dev(h1, "class", "svelte-zmmwsk");
    			add_location(h1, file$8, 93, 2, 1486);
    			attr_dev(ul, "class", "svelte-zmmwsk");
    			add_location(ul, file$8, 94, 2, 1534);
    			attr_dev(nav, "class", "svelte-zmmwsk");
    			add_location(nav, file$8, 85, 1, 1355);
    			attr_dev(header, "class", "svelte-zmmwsk");
    			add_location(header, file$8, 84, 0, 1345);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, nav);
    			append_dev(nav, a);
    			append_dev(a, t0);
    			append_dev(nav, t1);
    			append_dev(nav, h1);
    			append_dev(h1, t2);
    			append_dev(h1, small);
    			append_dev(nav, t5);
    			append_dev(nav, ul);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*website*/ 2) set_data_dev(t0, /*website*/ ctx[1]);

    			if (!current || dirty & /*website*/ 2) {
    				attr_dev(a, "href", /*website*/ ctx[1]);
    			}

    			if (!current || dirty & /*logo*/ 1) {
    				set_style(a, "background-image", "url(" + /*logo*/ ctx[0] + ")");
    			}

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 4) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[2], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { logo } = $$props;
    	let { website } = $$props;
    	const writable_props = ["logo", "website"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("logo" in $$props) $$invalidate(0, logo = $$props.logo);
    		if ("website" in $$props) $$invalidate(1, website = $$props.website);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { logo, website };
    	};

    	$$self.$inject_state = $$props => {
    		if ("logo" in $$props) $$invalidate(0, logo = $$props.logo);
    		if ("website" in $$props) $$invalidate(1, website = $$props.website);
    	};

    	return [logo, website, $$scope, $$slots];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { logo: 0, website: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*logo*/ ctx[0] === undefined && !("logo" in props)) {
    			console.warn("<Nav> was created without expected prop 'logo'");
    		}

    		if (/*website*/ ctx[1] === undefined && !("website" in props)) {
    			console.warn("<Nav> was created without expected prop 'website'");
    		}
    	}

    	get logo() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set logo(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get website() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set website(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Navitem.svelte generated by Svelte v3.18.2 */

    const { console: console_1 } = globals;
    const file$9 = "src/components/Navitem.svelte";

    function create_fragment$9(ctx) {
    	let li;
    	let a;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			if (default_slot) default_slot.c();
    			attr_dev(a, "href", /*anchor*/ ctx[0]);
    			attr_dev(a, "class", "svelte-sflwqf");
    			add_location(a, file$9, 52, 1, 721);
    			attr_dev(li, "class", "svelte-sflwqf");
    			add_location(li, file$9, 51, 0, 715);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;
    			dispose = listen_dev(a, "click", /*handle_click*/ ctx[1], { once: true }, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 8) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[3], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (default_slot) default_slot.d(detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { path } = $$props;
    	const anchor = `#${path}`;

    	const handle_click = async function (event) {
    		event.preventDefault();
    		const hash = this.getAttribute("href");
    		const target = document.querySelector(hash);

    		try {
    			await target.scrollIntoView({
    				behavior: "smooth",
    				block: "start",
    				inline: "start"
    			});

    			window.location.hash = hash;
    		} catch(error) {
    			console.log("can't find target: ", hash);
    		}
    	};

    	const writable_props = ["path"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Navitem> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("path" in $$props) $$invalidate(2, path = $$props.path);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { path };
    	};

    	$$self.$inject_state = $$props => {
    		if ("path" in $$props) $$invalidate(2, path = $$props.path);
    	};

    	return [anchor, handle_click, path, $$scope, $$slots];
    }

    class Navitem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { path: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navitem",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*path*/ ctx[2] === undefined && !("path" in props)) {
    			console_1.warn("<Navitem> was created without expected prop 'path'");
    		}
    	}

    	get path() {
    		throw new Error("<Navitem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Navitem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Section.svelte generated by Svelte v3.18.2 */

    const file$a = "src/components/Section.svelte";

    function create_fragment$a(ctx) {
    	let section;
    	let h3;
    	let t0;
    	let t1;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			section = element("section");
    			h3 = element("h3");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(h3, "id", /*target*/ ctx[1]);
    			attr_dev(h3, "class", "svelte-60kwhl");
    			add_location(h3, file$a, 33, 1, 470);
    			attr_dev(section, "class", "svelte-60kwhl");
    			add_location(section, file$a, 32, 0, 459);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h3);
    			append_dev(h3, t0);
    			append_dev(section, t1);

    			if (default_slot) {
    				default_slot.m(section, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (!current || dirty & /*target*/ 2) {
    				attr_dev(h3, "id", /*target*/ ctx[1]);
    			}

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 4) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[2], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { title } = $$props;
    	let { target } = $$props;
    	const writable_props = ["title", "target"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Section> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("target" in $$props) $$invalidate(1, target = $$props.target);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { title, target };
    	};

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("target" in $$props) $$invalidate(1, target = $$props.target);
    	};

    	return [title, target, $$scope, $$slots];
    }

    class Section extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { title: 0, target: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Section",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
    			console.warn("<Section> was created without expected prop 'title'");
    		}

    		if (/*target*/ ctx[1] === undefined && !("target" in props)) {
    			console.warn("<Section> was created without expected prop 'target'");
    		}
    	}

    	get title() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get target() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set target(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.18.2 */
    const file$b = "src/App.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (78:3) <Navitem     path={navitem.target}>
    function create_default_slot_2(ctx) {
    	let t0_value = /*navitem*/ ctx[10].name + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*nav*/ 1 && t0_value !== (t0_value = /*navitem*/ ctx[10].name + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(78:3) <Navitem     path={navitem.target}>",
    		ctx
    	});

    	return block;
    }

    // (77:3) {#each nav as navitem}
    function create_each_block_1(ctx) {
    	let current;

    	const navitem = new Navitem({
    			props: {
    				path: /*navitem*/ ctx[10].target,
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(navitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(navitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const navitem_changes = {};
    			if (dirty & /*nav*/ 1) navitem_changes.path = /*navitem*/ ctx[10].target;

    			if (dirty & /*$$scope, nav*/ 8193) {
    				navitem_changes.$$scope = { dirty, ctx };
    			}

    			navitem.$set(navitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(77:3) {#each nav as navitem}",
    		ctx
    	});

    	return block;
    }

    // (74:2) <Nav    website={resources[0].domain}    logo={media[5].src}>
    function create_default_slot_1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*nav*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*nav*/ 1) {
    				each_value_1 = /*nav*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(74:2) <Nav    website={resources[0].domain}    logo={media[5].src}>",
    		ctx
    	});

    	return block;
    }

    // (86:3) <Section     title={item.title}     target={item.target}>
    function create_default_slot(ctx) {
    	let t;
    	let current;
    	var switch_value = /*item*/ ctx[7].component;

    	function switch_props(ctx) {
    		return {
    			props: { data: /*item*/ ctx[7].data },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*item*/ ctx[7].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, t.parentNode, t);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (switch_instance) destroy_component(switch_instance, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(86:3) <Section     title={item.title}     target={item.target}>",
    		ctx
    	});

    	return block;
    }

    // (85:2) {#each main as item}
    function create_each_block$5(ctx) {
    	let current;

    	const section = new Section({
    			props: {
    				title: /*item*/ ctx[7].title,
    				target: /*item*/ ctx[7].target,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(section.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(section, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const section_changes = {};

    			if (dirty & /*$$scope*/ 8192) {
    				section_changes.$$scope = { dirty, ctx };
    			}

    			section.$set(section_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(section.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(section.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(section, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(85:2) {#each main as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div;
    	let t;
    	let main_1;
    	let current;

    	const nav_1 = new Nav({
    			props: {
    				website: /*resources*/ ctx[2][0].domain,
    				logo: /*media*/ ctx[1][5].src,
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*main*/ ctx[3];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(nav_1.$$.fragment);
    			t = space();
    			main_1 = element("main");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(main_1, "class", "svelte-1liuo1h");
    			add_location(main_1, file$b, 83, 1, 1530);
    			attr_dev(div, "class", "styleguide svelte-1liuo1h");
    			add_location(div, file$b, 72, 0, 1324);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(nav_1, div, null);
    			append_dev(div, t);
    			append_dev(div, main_1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main_1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const nav_1_changes = {};
    			if (dirty & /*resources*/ 4) nav_1_changes.website = /*resources*/ ctx[2][0].domain;
    			if (dirty & /*media*/ 2) nav_1_changes.logo = /*media*/ ctx[1][5].src;

    			if (dirty & /*$$scope, nav*/ 8193) {
    				nav_1_changes.$$scope = { dirty, ctx };
    			}

    			nav_1.$set(nav_1_changes);

    			if (dirty & /*main*/ 8) {
    				each_value = /*main*/ ctx[3];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(main_1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav_1.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav_1.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(nav_1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { nav } = $$props;
    	let { media } = $$props;
    	let { palette } = $$props;
    	let { typography } = $$props;
    	let { ui_icons } = $$props;
    	let { resources } = $$props;

    	const main = [
    		{
    			component: Media,
    			data: media,
    			title: "Media",
    			target: "media"
    		},
    		{
    			component: Palette,
    			data: palette,
    			title: "Palette",
    			target: "palette"
    		},
    		{
    			component: Typography,
    			data: typography,
    			title: "Typography",
    			target: "typography"
    		},
    		{
    			component: UIIcons,
    			data: ui_icons,
    			title: "UI Icons",
    			target: "ui-icons"
    		},
    		{
    			component: Resources,
    			data: resources,
    			title: "Resources",
    			target: "resources"
    		}
    	];

    	const writable_props = ["nav", "media", "palette", "typography", "ui_icons", "resources"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("nav" in $$props) $$invalidate(0, nav = $$props.nav);
    		if ("media" in $$props) $$invalidate(1, media = $$props.media);
    		if ("palette" in $$props) $$invalidate(4, palette = $$props.palette);
    		if ("typography" in $$props) $$invalidate(5, typography = $$props.typography);
    		if ("ui_icons" in $$props) $$invalidate(6, ui_icons = $$props.ui_icons);
    		if ("resources" in $$props) $$invalidate(2, resources = $$props.resources);
    	};

    	$$self.$capture_state = () => {
    		return {
    			nav,
    			media,
    			palette,
    			typography,
    			ui_icons,
    			resources
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("nav" in $$props) $$invalidate(0, nav = $$props.nav);
    		if ("media" in $$props) $$invalidate(1, media = $$props.media);
    		if ("palette" in $$props) $$invalidate(4, palette = $$props.palette);
    		if ("typography" in $$props) $$invalidate(5, typography = $$props.typography);
    		if ("ui_icons" in $$props) $$invalidate(6, ui_icons = $$props.ui_icons);
    		if ("resources" in $$props) $$invalidate(2, resources = $$props.resources);
    	};

    	return [nav, media, resources, main, palette, typography, ui_icons];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			nav: 0,
    			media: 1,
    			palette: 4,
    			typography: 5,
    			ui_icons: 6,
    			resources: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*nav*/ ctx[0] === undefined && !("nav" in props)) {
    			console.warn("<App> was created without expected prop 'nav'");
    		}

    		if (/*media*/ ctx[1] === undefined && !("media" in props)) {
    			console.warn("<App> was created without expected prop 'media'");
    		}

    		if (/*palette*/ ctx[4] === undefined && !("palette" in props)) {
    			console.warn("<App> was created without expected prop 'palette'");
    		}

    		if (/*typography*/ ctx[5] === undefined && !("typography" in props)) {
    			console.warn("<App> was created without expected prop 'typography'");
    		}

    		if (/*ui_icons*/ ctx[6] === undefined && !("ui_icons" in props)) {
    			console.warn("<App> was created without expected prop 'ui_icons'");
    		}

    		if (/*resources*/ ctx[2] === undefined && !("resources" in props)) {
    			console.warn("<App> was created without expected prop 'resources'");
    		}
    	}

    	get nav() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nav(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get media() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set media(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get palette() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set palette(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get typography() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set typography(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ui_icons() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ui_icons(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get resources() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set resources(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const nav = [{
    	target: 'media',
    	name: 'Media'
    }, {
    	target: 'palette',
    	name: 'Palette'
    }, {
    	target: 'typography',
    	name: 'Typography'
    }, {
    	target: 'ui-icons',
    	name: 'UI Icons'
    }, {
    	target: 'resources',
    	name: 'Resources'
    }];

    const media = [{
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/MODELO+APRESENTAC%CC%A7A%CC%83O/A55_Modelo+de+Apresentac%CC%A7a%CC%83o.pptx',
    	placeholder: 'https://via.placeholder.com/400/0096FF/FFFFFF?text=%20',
    	filename: 'a55_presentation.pptx',
    	alt: 'Template de apresentação em powerpoint',
    	classlist: 'item ppt'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/MODELO+APRESENTAC%CC%A7A%CC%83O/A55_Modelo+de+Apresentac%CC%A7a%CC%83o.key',
    	placeholder: 'https://via.placeholder.com/400/0096FF/FFFFFF?text=%20',
    	filename: 'a55_presentation.key',
    	alt: 'Template de apresentação em keynote',
    	classlist: 'item key'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_AZUL.png',
    	filename: 'A55_AZUL.png',
    	alt: 'A55 Logo',
    	classlist: 'item'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_AZUL.svg',
    	filename: 'A55_AZUL.svg',
    	alt: 'A55 Logo (.svg)',
    	classlist: 'item svg'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_BRANCO.png',
    	filename: 'A55_BRANCO.png',
    	alt: 'A55 Logo Branco',
    	classlist: 'item alt'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_BRANCO.svg',
    	filename: 'A55_BRANCO.svg',
    	alt: 'A55 Logo Branco (.svg)',
    	classlist: 'item alt svg'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_PRETO.png',
    	filename: 'A55_PRETO.png',
    	alt: 'A55 Logo Preto',
    	classlist: 'item'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_PRETO.svg',
    	filename: 'A55_PRETO.svg',
    	alt: 'A55 Logo Preto (.svg)',
    	classlist: 'item svg'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_AZUL.png',
    	filename: 'A55_ICONE_AZUL.png',
    	alt: 'A55 Ícone',
    	classlist: 'item'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_AZUL.svg',
    	filename: 'A55_ICONE_AZUL.svg',
    	alt: 'A55 Ícone (.svg)',
    	classlist: 'item svg'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_BRANCO.png',
    	filename: 'A55_ICONE_BRANCO.png',
    	alt: 'A55 Ícone Branco',
    	classlist: 'item alt'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_BRANCO.svg',
    	filename: 'A55_ICONE_BRANCO.svg',
    	alt: 'A55 Ícone Branco (.svg)',
    	classlist: 'item alt svg'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_PRETO.png',
    	filename: 'A55_ICONE_PRETO.png',
    	alt: 'A55 Ícone Preto',
    	classlist: 'item'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_PRETO.svg',
    	filename: 'A55_ICONE_PRETO.svg',
    	alt: 'A55 Ícone Preto (.svg)',
    	classlist: 'item svg'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/favicon.zip',
    	placeholder: 'https://via.placeholder.com/400/0096FF/FFFFFF?text=%20',
    	filename: 'favicon.zip',
    	alt: 'Pacote de favicons',
    	classlist: 'item fav'
    }, {
    	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/e-ui.zip',
    	placeholder: 'https://via.placeholder.com/400/0096FF/FFFFFF?text=%20',
    	filename: 'e-ui.zip',
    	alt: 'Element-UI Kit - XD',
    	classlist: 'item xd'
    }];

    const palette = [
    	{ name: 'primary', hex: '#0096FF', color: 'white' },
    	{ name: 'gradient-1', hex: '#3CCCDA', color: 'white' },
    	{ name: 'gradient-2', hex: '#1262FF', color: 'white' },
    	{ name: 'primary-light-1', hex: '#53a8ff', color: 'white' },
    	{ name: 'primary-light-2', hex: '#66b1ff', color: 'white' },
    	{ name: 'primary-light-3', hex: '#79bbff', color: 'black' },
    	{ name: 'primary-light-4', hex: '#8cc5ff', color: 'black' },
    	{ name: 'primary-light-5', hex: '#a0cfff', color: 'black' },
    	{ name: 'primary-light-6', hex: '#b3d8ff', color: 'black' },
    	{ name: 'primary-light-7', hex: '#c6e2ff', color: 'black' },
    	{ name: 'primary-light-8', hex: '#d9ecff', color: 'black' },
    	{ name: 'primary-light-9', hex: '#ecf5ff', color: 'black' },
    	{ name: 'success', hex: '#67C23A', color: 'white' },
    	{ name: 'warning', hex: '#E6A23C', color: 'black' },
    	{ name: 'danger', hex: '#F56C6C', color: 'black' },
    	{ name: 'info', hex: '#909399', color: 'black' },
    	{ name: 'color-text-primary', hex: '#303133', color: 'white' },
    	{ name: 'color-text-regular', hex: '#606266', color: 'white' },
    	{ name: 'color-text-secondary', hex:'#909399', color: 'black' },
    	{ name: 'color-text-placeholder', hex: '#C0C4CC', color: 'black' },
    	{ name: 'border-color-base', hex: '#DCDFE6', color: 'black' },
    	{ name: 'border-color-light', hex: '#E4E7ED', color: 'black' },
    	{ name: 'border-color-lighter', hex: '#EBEEF5', color: 'black' },
    	{ name: 'border-color-extra-light', hex: '#F2F6FC', color: 'black' },
    	{ name: 'background-color-base', hex: '#F5F7FA', color: 'black' },
    ];

    const typography = [{
    	name: 'Open Sans',
    	href: 'https://fonts.google.com/specimen/Open+Sans',
    	desc: 'titles'
    }, {
        	name: 'Avenir',
    	href: 'https://fonts.google.com/?query=Avenir',
    	desc: 'Business Card Font'
    }];

    const ui_icons = [{
    	name: 'Element UI',
    	purpose: 'general ui use',
    	source: 'https://element.eleme.io/#/en-US/component/icon'
    }, {
    	name: 'Material Design',
    	purpose: 'navigation menu',
    	source: 'https://material.io/resources/icons/?style=baseline'
    }];


    const resources = [{
    	name: 'Site Institucional',
    	gifs: '',
    	domain: 'https://a55.tech'
    }, {
    	name: 'Metabase (Investidor)',
    	gifs: '',
    	domain: 'https://metabase.a55.tech'
    }, {
    	name: 'Apply (Formulário de aplicação)',
    	gifs: '',
    	domain: 'https://apply.a55.tech'
    }, {
    	name: 'App (Cliente)',
    	gifs: '',
    	domain: 'https://app.a55.tech'
    }, {
    	name: 'Midgard (Backoffice)',
    	gifs: '',
    	domain: 'https://midgard.a55.tech'
    }, {
    	name: 'Assinatura de email',
    	gifs: '',
    	domain: 'https://email-signature.a55.tech'
    }];

    const props = {
    	nav,
    	media,
    	palette,
    	typography,
    	ui_icons,
    	resources
    };

    const app = new App({
    	target: document.body,
    	props
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
