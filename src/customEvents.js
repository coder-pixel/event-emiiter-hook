export const HeaderEmiiter = {
  events: {},

  subscribe: function (event, cb) {
    console.log({ event, cb });
    // Check if the specified event exists / subscribed by anyone
    if (!this.events?.[event]) {
      // Not subscribed yet, so assign it a null value, so that later some callback can be assigned
      this.events[event] = [];
    }

    // assign the current callback
    this.events[event].push(cb);
  },

  unsubscribe: function (event, cb) {
    this.events[event].delete(cb); // Remove specific callback
  },

  emit(event, args) {
    console.log({ event, args });
    console.log(this.events);
    // Check if the specified event is exist / subscribed by anyone
    if (!this.events[event]) {
      // Doesn't exist, so just return
      return;
    }

    const res = [];

    this.events[event].forEach((cb) => {
      if (Array.isArray(args)) {
        res.push(cb(...args)); // spread if array
      } else {
        res.push(cb(args)); // pass as-is for other types
      }
    });

    return res;
  },
};
