<template>
  <div class="all">
    <div class="cal_week">
      <div class="cal_week_ops">
        <span class="cal_week_ops_day"
          >{{ data.curYear }}年{{ data.curMonth }}月{{ data.curDay }}日，今日星期{{
            data.weekDay
          }}</span
        >
        <div class="cal_week_ops_btn">
          <img
            class="cal_week_ops_btn_img"
            src="../assets/left.png"
            alt="向左"
            @click="() => getMonth('last')"
          />
          <img
            class="cal_week_ops_btn_img"
            src="../assets/right.png"
            alt="向右"
            @click="() => getMonth('next')"
          />
        </div>
      </div>
      <div class="cal_week_item">
        <template v-for="v in week" :key="v">
          <p class="cal_week_item_item">{{ v }}</p>
        </template>
      </div>
    </div>
    <div class="cal_container">
      <template v-for="(v, i) in calendarData" :key="i">
        <div
          :class="`cal_day ${
            data.selectedIndex == i ? 'active' : v.isCurrent ? '' : 'light_color'
          } ${i > 34 ? 'cal_day_row' : ''}`"
          @click="() => selectDay(i, v.day)"
        >
          {{ v.day }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { calendarOfMonth } from "../utils/calendar";

let date = newDate();
let day = date.getDay();
let calendarData = ref([]);
let data = reactive({
  selectedIndex: void 0,
  week: ["日", "一", "二", "三", "四", "五", "六"],
  weekDay: void 0,
  curDay: date.getDate(),
  curMonth: date.getMonth() + 1,
  curYear: date.getFullYear(),
});

function newDate(date) {
  return date ? new Date(date).getDay() : new Date();
}

/**
 * @param i 所选天数在数组的索引
 */
function selectDay(i) {
  data.selectedIndex = findDayIndex(i);
  let curDay = calendarData.value.find((v, k) => k == data.selectedIndex);
  data.weekDay = week[newDate(`${data.curYear}-${data.curMonth}-${curDay.day}`)];
  data.curDay = curDay.day;
}

/**
 * @param someDay 日
 * @param i   索引
 */
function findDayIndex(i) {
  if (!i) {
    return calendarData.value.findIndex((v) => v.day == date.getDate());
  } else {
    return calendarData.value.findIndex((v, k) => k == i);
  }
}

/**
 * @param type 操作上下月份
 */
function getMonth(type) {
  let month = null;
  if (type == "last") {
    data.curMonth -= 1;
    data.curYear = data.curMonth == 0 ? data.curYear - 1 : data.curYear;
    data.curMonth = data.curMonth == 0 ? 12 : data.curMonth;
    month = data.curMonth;
  } else {
    data.curMonth += 1;
    data.curYear = data.curMonth > 12 ? data.curYear + 1 : data.curYear;
    data.curMonth = data.curMonth > 12 ? 1 : data.curMonth;
    month = data.curMonth == 1 ? 0 : data.curMonth;
  }
  calendarData.value = calendarOfMonth(data.curYear, month);
  selectDay(data.selectedIndex);
}

data.weekDay = data.week[day];

onMounted(() => {
  calendarData.value = calendarOfMonth(data.curYear, data.curMonth);
  data.selectedIndex = findDayIndex(null);
});

onUnmounted(() => {
  date = null;
  day = null;
  data = null;
  calendarData = null;
});
const { week } = data;
</script>

<style lang="less" scoped>
.all {
  min-width: 370px;
  min-height: 350px;
  width: 19%;
  height: 31%;
  // background-color: #f6f8fa;

  .cal_week,
  .cal_container {
    padding: 5px;
    box-sizing: border-box;
  }

  .cal_week_ops,
  .cal_week_ops_btn {
    display: flex;
    justify-content: space-between;
  }
  .cal_week {
    color: #fff;
    .cal_week_ops {
      height: 10%;
      align-items: center;
      font-size: 20px;
      padding-left: 5px;
      box-sizing: border-box;
      &_day {
        width: 80%;
        color: #333;
      }
      .cal_week_ops_btn {
        flex-grow: 1;
        &_img {
          width: 25px;
          height: 25px;
        }
      }
    }
    &_item {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 5px 6px;
      align-items: center;
      justify-items: center;
      &_item {
        width: 40px;
        height: 40px;
        background-color: #71dbee;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
      }
    }
  }
  .cal_container {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 5px 6px;
    align-items: center;
    justify-items: center;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .cal_day {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      box-shadow: 1px 0 10px 0 rgba(0, 0, 0, 0.1);
      margin: 5px 0;
      transition: 0.3s;
      transform: scale(1, 1);
    }

    .cal_day:hover {
      box-shadow: 1px 0 10px 0 rgb(113, 219, 238, 0.5);
      transition: 0.3s;
      transform: scale(1.3, 1.3);
    }

    .cal_day_row {
      margin-bottom: 0;
    }

    .active {
      background-color: #71dbee;
      color: #fff;
    }
    .light_color {
      color: #ccc;
    }
  }
}
</style>
