<template>
  <div
    class="timeline-card"
    :class="{
      'timeline-card--first': timelineItem.first,
      'timeline-card--complete': timelineItem.complete,
      'timeline-card--active': timelineItem.active,
      'timeline-card--last': timelineItem.last,
    }"
  >
    <!-- <span v-if="timelineItem.first">[first]</span> -->

    <div class="timeline-card__row1">
      <div class="timeline-card__row1__time">{{ m(timelineItem.attributes.time) }}</div>
      <div class="timeline-card__row1__title">{{ timelineItem.attributes.title }}</div>
    </div>

    <div class="timeline-card__row2">
      <div class="timeline-card__row2__source">{{ timelineItem.attributes.source }}</div>
      <div class="timeline-card__row2__sink">{{ timelineItem.attributes.sink }}</div>
    </div>

    <!-- <span v-if="timelineItem.last">[last]</span> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { TimelineItem } from "@/models/Timeline";

export default defineComponent({
  props: {
    timelineItem: {
      type: Object as PropType<TimelineItem>,
      required: true,
    },
  },
  setup() {
    function m(date: Date): string {
      return `${date.getHours()}:${date.getMinutes()}`;
    }

    return {
      m,
    };
  },
});
</script>

<style lang="scss" scoped>
.timeline-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 0.5rem;
  height: 3rem;

  &__row1 {
    display: flex;
    flex-direction: row;

    &__time {
      font-size: 1.2rem;

      &::after {
        content: "|";
        margin: 0 0.5rem;
      }
    }

    &__title {
      font-size: 1.2rem;
    }
  }

  &__row2 {
    display: flex;
    font-size: 1.2rem;

    &__source {
      margin-right: 1.2rem;
    }
  }

  &--active {
    height: 8rem;
  }

  &--active & {
    &__row1 {
      flex-direction: column;

      &__time {
        font-size: 1.4rem;

        &::after {
          content: none;
          margin: initial;
        }
      }

      &__title {
        font-size: 3rem;
      }
    }

    &__row2 {
      display: flex;
      font-size: 1.4rem;
      margin-top: 0.5rem;

      &__source {
        margin-right: 1.4rem;
      }
    }
  }
}
</style>