<template>
  <h1>Events List</h1>
  <br />
  <el-row style="padding-left: 2%">
    <el-col
      v-for="(event, index) in Allevents"
      :key="event"
      :span="5"
      :offset="index % 4 > 0 ? 1 : 0"
    >
      <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 10%" @click="showEvent(event)">
        <template #header>
          <span>{{ event.name }}</span>
        </template>
        <img :src="event.eventImage" class="image" />
        <div style="padding: 14px">
          <div class="bottom">
            <ul>
              <li>
                <time class="time"
                  >{{ event.startDate.split("T")[0] }} &nbsp; 10:00</time
                >
              </li>
              <li>
                <time class="time"
                  >{{ event.endDate.split("T")[0] }} &nbsp; 17:00</time
                >
              </li>
            </ul>
            <ul>
              <li>FOOT</li>
              <li>Tennis</li>
            </ul>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-pagination
    v-model:currentPage="currentPage3"
    v-model:page-size="pageSize3"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="prev, pager, next, jumper"
    :total="1000"
    @current-change="handleCurrentChange"
  />
</template>

<script>
import eventService from "../services/eventService";
export default {
  name: "EventDetail",
  data() {
    return {
      currentPage: 1,
      Allevents: [],
    };
  },
  mounted: function () {
    this.handleCurrentChange(1);
  },
  methods: {
    async handleCurrentChange(pageNumber) {
      let events = await eventService.AllEvents(pageNumber);
      this.Allevents = events.data.events;
    },
    showEvent(event){
      this.$router.push({ name: 'event', params: { event: JSON.stringify(event)} })
    }
  },
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: rgb(170, 125, 125);
}
h1 {
  text-align: center;
}
.bottom {
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom ul {
  list-style: none;
  padding-left: 2%;
}
.bottom ul li {
  text-align: center;
}
.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 30vh;
  display: block;
}
.el-pagination {
  margin: auto;
  width: 50%;
}
</style>
