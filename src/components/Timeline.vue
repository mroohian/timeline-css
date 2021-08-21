<template>
  <div>
    <ul class="timeline">
      <li
        v-for="timelineItem in timeline.items"
        :key="timelineItem.key"
        class="timeline__item"
        :class="{
          'timeline__item--skip': timelineItem.skip,
          'timeline__item--first': timelineItem.first,
          'timeline__item--complete': timelineItem.complete,
          'timeline__item--active': timelineItem.active,
          'timeline__item--last': timelineItem.last,
        }"
      >
        <div class="timeline__item__progress">
          <div
            v-if="!timelineItem.first && !timelineItem.skip"
            class="
              timeline__item__progress__line
              timeline__item__progress__line--before
            "
            :class="{
              'timeline__item__progress__line--complete':
                timelineItem.complete || timelineItem.active,
            }"
          ></div>
          <div
            v-if="!timelineItem.last && !timelineItem.skip"
            class="
              timeline__item__progress__line
              timeline__item__progress__line--after
            "
            :class="{
              'timeline__item__progress__line--complete': timelineItem.complete,
            }"
          ></div>

          <div class="timeline__item__progress__dot" />
        </div>

        <TimelineCard
          v-if="!timelineItem.skip"
          class="timeline__item__card"
          :timelineItem="timelineItem"
        />
        <div v-else class="timeline__item__card" >...</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { sampleTimeline } from "@/models/Timeline";
import TimelineCard from "@/components/TimelineCard.vue";

export default defineComponent({
  components: {
    TimelineCard,
  },
  setup() {
    return {
      timeline: sampleTimeline,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin absolute-centre-y {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

@mixin size($size) {
  width: $size;
  height: $size;
}

$timeline-width: 20rem;

$progress-width: 4rem;

$dot-padding: 0.5rem;

$line-width: 3px;

$dot-height: 1.4rem;
$item-height: 3rem;
$item-margin: 0.25rem;
$line-height: (($item-height + ($item-margin * 2) - $dot-height) / 2) -
  $dot-padding;
$line-offset: -($item-height + ($item-margin * 2) - $dot-height) / 2;

$active-dot-height: 2rem;
$active-item-height: 8rem;
$active-item-margin: 0.5rem;
$active-line-height: (
    ($active-item-height + ($active-item-margin * 2) - $active-dot-height) / 2
  ) - $dot-padding;
$active-line-offset: -(
    $active-item-height + ($active-item-margin * 2) - $active-dot-height
  ) / 2;

$dark-line: #718394;
$complete-color: #5d8eff;

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: $timeline-width;

  &__item {
    display: flex;
    align-items: center;
    outline: 1px dashed red;

    &__progress {
      flex: 0 0 $progress-width;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      &__line {
        position: absolute;
        width: $line-width;
        height: $line-height;
        background-color: $dark-line;

        &--before {
          top: $line-offset;
        }

        &--after {
          bottom: $line-offset;
        }

        &--complete {
          background-color: $complete-color;
        }
      }

      &__dot {
        background: white;
        width: $dot-height;
        height: $dot-height;
        border-width: $line-width;
        border-style: solid;
        border-color: $dark-line;
        border-radius: $dot-height / 2;
      }
    }

    &__card {
      flex: 1 1;
      margin: $item-margin 0;
    }

    &--complete & {
      &__progress {
        &__dot {
          background-color: $complete-color;
          border-color: $complete-color;
          border-style: none;
        }
      }
    }

    &--active & {
      &__progress {
        &__line {
          height: $active-line-height;

          &--before {
            top: $active-line-offset;
          }

          &--after {
            bottom: $active-line-offset;
          }
        }

        &__dot {
          width: $active-dot-height;
          height: $active-dot-height;
          border-color: $complete-color;
          border-radius: $active-dot-height / 2;
        }
      }

      &__card {
        margin: $active-item-margin 0;
        border: $line-width solid $complete-color;
      }
    }

    &--skip & {
      &__progress {
        &__dot {
          background-color: transparent;
          width: 0;
          border-top: none;
          border-bottom: none;
          border-right: none;
          border-radius: 0;
          border-left-style: dashed;
        }
      }

      &__card {
        height: $dot-height;
        padding-left: 4rem;
      }
    }
  }
}
</style>