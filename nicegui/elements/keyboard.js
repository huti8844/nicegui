Vue.component("keyboard", {
  template: `<span v-bind:id="jp_props.id" :class="jp_props.classes" :style="jp_props.style"></span>`,
  mounted() {
    for (const event of this.$props.jp_props.options.activeJSEvents) {
      document.addEventListener(event, (evt) => {
        const e = {
          event_type: "keyboardEvent",
          id: this.$props.jp_props.id,
          page_id: page_id,
          websocket_id: websocket_id,
        };
        if (evt instanceof KeyboardEvent) {
          // https://developer.mozilla.org/en-US/docs/Web/Events/keydown   keyup, keypress
          e["key_data"] = {
            action: event,
            altKey: evt.altKey,
            ctrlKey: evt.ctrlKey,
            shiftKey: evt.shiftKey,
            metaKey: evt.metaKey,
            code: evt.code,
            key: evt.key,
            location: evt.location,
            repeat: evt.repeat,
            locale: evt.locale,
          };
        }
        send_to_server(e, "event");
      });
    }
  },
  props: {
    jp_props: Object,
  },
});