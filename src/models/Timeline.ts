import { computed, ComputedRef, ref } from "vue";

export interface TimelineItemAttributes {
  title: string;
  time: Date;
  source: string;
  sink: string;
}

export interface TimelineItem {
  key: string;
  attributes: TimelineItemAttributes,
  skip: boolean;
  first: boolean;
  last: boolean;
  complete: boolean;
  active: boolean;
}

export interface Timeline {
  items: TimelineItem[];
}

interface Event {
  skip?: boolean;
  title: string;
  time: Date;
  source: string;
  sink: string;
}

const SKIPPED_EVENT: Event = {
  skip: true,
  title: "",
  time: new Date(),
  source: "",
  sink: "",
};

const sortedEvents = ref<Event[]>([
  {
    title: "Turn on",
    time: new Date(),
    source: "4234223",
    sink: "812633",
  },
  SKIPPED_EVENT,
  {
    title: "Drive",
    time: new Date(),
    source: "4234223",
    sink: "812633",
  },
  {
    title: "Pickup",
    time: new Date(),
    source: "4234223",
    sink: "812633",
  },
  {
    title: "Move",
    time: new Date(),
    source: "4234223",
    sink: "812633",
  },
  {
    title: "Put down",
    time: new Date(),
    source: "4234223",
    sink: "812633",
  },
  {
    title: "Charge",
    time: new Date(),
    source: "4234223",
    sink: "812633",
  },
  SKIPPED_EVENT,
  {
    title: "Standby",
    time: new Date(),
    source: "4234223",
    sink: "812633",
  },
]);

const activeEventIndex = ref(3);

setTimeout(() => {
  activeEventIndex.value = 4;

  setTimeout(() => {
    sortedEvents.value.push({
      title: "Shutdown",
      time: new Date(),
      source: "4234223",
      sink: "812633",
    });

    setTimeout(() => {
      activeEventIndex.value = 5;
    }, 2000);
  }, 2000);
}, 2000);

export const sampleTimeline: ComputedRef<Timeline> = computed<Timeline>(() => {
  return {
    items: sortedEvents.value.map((data, index) => {
      return {
        key: `${index}`,
        attributes: {
          title: data.title,
          time: data.time,
          source: data.source,
          sink: data.sink,
        },
        skip: data.skip === true,
        first: index === 0,
        last: index === sortedEvents.value.length - 1,
        complete: index < activeEventIndex.value,
        active: index === activeEventIndex.value,
      };
    }),
  };
});
