<template>
  <nav>
    <!-- nav bar  -->
    <el-row style="margin-bottom: 10px; margin-top: 10px">
      <!-- total columns is 24 -->
      <el-col :span="24">
        <el-card class="header">
          <div class="card card-frame col-4">
            <div class="card-body">
              <el-row>
                <el-col :span="6" class="path">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item style="color: aliceblue"
                      >Evenements</el-breadcrumb-item
                    ></el-breadcrumb
                  >
                </el-col>
                <el-col :span="12">
                  <!-- <el-input
                    v-model="search"
                    placeholder="Chercher un id,nom ou utilisateur"
                  >
                    <template #prefix>
                      <el-icon class="el-input__icon"
                        ><i class="fa fa-search"></i
                      ></el-icon>
                    </template>
                  </el-input> -->
                </el-col>
                <el-col :span="4">
                  <button type="button" id="add" @click="addEvent()">
                    Ajouter Événement
                  </button></el-col
                >
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-scrollbar max-height="80vh">
          <h1>Événements</h1>
          <br />
          <el-row style="padding-left: 2%">
            <el-col
              v-for="(event, index) in Allevents"
              :key="event"
              :span="5"
              :offset="index % 4 > 0 ? 1 : 0"
            >
              <el-card
                :body-style="{ padding: '0px' }"
                style="margin-bottom: 10%"
                @click="showEvent(index)"
              >
                <template #header>
                  <span v-if="event.name.length < 18">{{ event.name }}</span>
                  <span v-else>{{ event.name.substring(0, 17) }} ..</span>
                </template>
                <img :src="event.eventImage" class="image" />
                <div style="padding: 14px">
                  <div class="bottom">
                    <ul>
                      <li>
                        <time class="time"
                          >{{ event.startDate.split("T")[0] }} &nbsp;{{
                            event.startDate.split("T")[1].substring(0, 5)
                          }}</time
                        >
                      </li>
                      <br />
                      <li>
                        <time class="time"
                          >{{ event.endDate.split("T")[0] }} &nbsp;{{
                            event.endDate.split("T")[1].substring(0, 5)
                          }}</time
                        >
                      </li>
                    </ul>
                    <ul>
                      <li>{{ event.SubCategories[0].Category.name }}</li>
                      <br />
                      <li>
                        <i class="fa-solid fa-ticket"> </i> {{ event.ticketNb }}
                      </li>
                    </ul>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, jumper"
            :total="pages"
            @current-change="handleCurrentChange"
          />
        </el-scrollbar>
        <!-- body cards  -->
      </el-col>
    </el-row>
  </nav>
</template>

<script>
import eventService from "../services/eventService";
import "element-plus/es/components/loading/style/css";
import { ElLoading } from "element-plus";
export default {
  name: "EventDetail",
  data() {
    return {
      currentPage: 1,
      Allevents: [],
      pages: 1,
      pageSize: 12,
    };
  },
  mounted: function () {
    this.handleCurrentChange(1);
  },
  methods: {
    async handleCurrentChange(pageNumber) {
      const loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let events = await eventService.AllEvents({
        page: pageNumber - 1,
        size: this.pageSize,
      });
      this.Allevents = events.data.events;
      this.pages = events.data.totalItems;
      console.log(this.pages);
      loading.close();
    },
    showEvent(event) {
      sessionStorage.setItem(
        "currentEvent",
        JSON.stringify(this.Allevents[JSON.stringify(event)])
      );
      const loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$router.push({
        name: "event",
        params: { id: JSON.stringify(event) },
      });
      loading.close();
    },
    addEvent() {
      this.$router.push("/home/AddEvent");
    },
  },
};
</script>

<style scoped>
.time {
  font-size: 12px;
  color: rgb(170, 125, 125);
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
  font-size: 13px;
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
.header {
  height: 14vh;
  background-color: var(--vt-c-orange);
}
#add {
  padding: 5%;
  border: none;
  border-radius: 5px;
  font-weight: bolder;
  cursor: pointer;
  color: #fd7d1bdc;
  box-shadow: 0px 0px 3px rgb(154, 154, 154);
}
</style>
