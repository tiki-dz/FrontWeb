<template>
  <nav class="event">
    <!-- nav bar  -->
    <el-row style="margin-bottom: 10px; margin-top: 10px">
      <!-- total columns is 24 -->
      <el-col :span="24">
        <el-card class="header">
          <div class="card card-frame col-4">
            <div class="card-body">
              <el-row>
                <el-col :span="7" class="path">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                      :to="{ path: '/home/EventList' }"
                      style="color: aliceblue"
                      >Evenements</el-breadcrumb-item
                    >
                    <el-breadcrumb-item
                      ><a href="/home/AddEvent" style="color: aliceblue"
                        >Créer un évenement</a
                      ></el-breadcrumb-item
                    ></el-breadcrumb
                  >
                </el-col>
                <template> </template>

                <el-col :span="12">
                  <el-input
                    v-model="search"
                    placeholder="Chercher un id,nom ou utilisateur"
                  >
                    <template #prefix>
                      <el-icon class="el-input__icon"
                        ><i class="fa fa-search"></i
                      ></el-icon>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="4"> </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-scrollbar max-height="80vh">
          <el-card>
            <template #header>
              <div class="card-header">
                <p style="text-align: center; font-size: 30px">
                  Créer un évenemnt
                </p>
              </div>
            </template>
            <br />
            <br />
            <el-form
              ref="ruleForm"
              :size="formSize"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-row>
                <el-col :span="17">
                  <!-- body form  -->
                  <el-row>
                    <label for="name">Nom d'évenement</label>
                    <el-input
                      v-model="event.name"
                      name="name"
                      placeholder="Nom d'évenement"
                      required
                      :disabled="!modifying"
                    ></el-input>
                    <div class="invalid-feedback"></div
                  ></el-row>
                  <el-row>
                    <label for="organizer">Organisateur</label>
                    <el-input
                      name="organizer"
                      v-model="event.organizer"
                      placeholder="Nom d'organisateur"
                      required
                      :disabled="!modifying"
                    ></el-input>
                  </el-row>
                  <el-row>
                    <label for="desc">Description</label>
                    <el-input
                      name="desc"
                      v-model="event.desc"
                      placeholder="Description d'évenement"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      required
                      :disabled="!modifying"
                    ></el-input>
                  </el-row>
                  <el-row>
                    <label for="addr">Adresse</label>

                    <el-input
                      name="addr"
                      v-model="event.addr"
                      placeholder="adresse d'évenement"
                      required
                      :disabled="!modifying"
                    ></el-input>
                  </el-row>
                  <el-row>
                    <label for="url">URL</label>

                    <el-input
                      name="url"
                      v-model="event.urls"
                      placeholder="Lien d'evenement ou de la societé"
                    >
                      <template #prepend>Http://</template>
                    </el-input>
                  </el-row>
                  <el-row>
                    <label for="capacity">Capacité</label>
                    <el-input-number
                      name="capacity"
                      v-model="event.capacity"
                      :min="10"
                      :max="10000000"
                      controls-position="right"
                      size="large"
                      :disabled="!modifying"
                    />
                  </el-row>
                  <el-row style="margin-top: 2%">
                    <label for="datetimerange">Date et Heure</label>
                    <el-date-picker
                      name="datetimerange"
                      v-model="event.date"
                      type="datetimerange"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      start-placeholder="Date de début"
                      end-placeholder="Date de fin"
                      :disabledDate="disabledDateF"
                      :default-time="defaultTime1"
                      :disabled="!modifying"
                    />
                  </el-row>
                  <el-row>
                    <label for="category">Categorie</label>
                    <el-select
                      @click="getCategories"
                      v-model="event.category"
                      name="category"
                      class="m-2"
                      placeholder="Selectionner une catégorie"
                      size="large"
                      :disabled="!modifying"
                    >
                      <el-option
                        v-for="item in optionsCategories"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                  <el-row>
                    <label for="subcategory">Sous Categorie</label>
                    <el-select
                      @click="getSubCategories(event.category)"
                      v-model="event.subcategory"
                      name="subcategory"
                      class="m-2"
                      multiple
                      placeholder="Selectionner une sous catégorie"
                      size="large"
                      :disabled="!modifying"
                    >
                      <el-option
                        v-for="item in optionsSubCategories"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                  <el-row>
                    <label for="tags">HashTags</label>
                    <el-select-v2
                      @click="getTags(event.name)"
                      v-model="event.tags"
                      name="tags"
                      :options="optionsTags"
                      multiple-limit="10"
                      placeholder="ex: #event "
                      style="
                        width: 240px;
                        margin-right: 16px;
                        vertical-align: middle;
                      "
                      :disabled="!modifying"
                      allow-create
                      filterable
                      multiple
                      clearable
                    />
                  </el-row>
                </el-col>
                <el-col :span="7">
                  <label for="upload">Event Image</label>
                  <br /><br />
                  <el-upload
                    name="upload"
                    class="upload-demo"
                    drag
                    :auto-upload="false"
                    v-bind:class="{ hide: eventList.length == 1 }"
                    list-type="picture-card"
                    :file-list="eventList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :disabled="!modifying"
                  >
                    <i class="fa-solid fa-upload"></i>
                    <div class="el-upload__text">
                      faire glisser une image ou <em>cliquer pour choisir</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload>
                  <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                  </el-dialog>
                  <br /><br />
                  <label for="upload2">Ticket Image</label>
                  <br /><br />
                  <el-upload
                    name="upload2"
                    class="upload-demo"
                    drag
                    v-bind:class="{ hide: ticketList.length == 1 }"
                    :auto-upload="false"
                    list-type="picture-card"
                    :file-list="ticketList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :disabled="!modifying"
                  >
                    <i class="fa-solid fa-upload"></i>
                    <div class="el-upload__text">
                      faire glisser une image ou <em>cliquer pour choisir</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload>
                  <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                  </el-dialog>
                  <br /><br />
                  <label for="upload3">Other Image</label>
                  <br /><br />
                  <el-upload
                    name="upload3"
                    class="upload-demo"
                    drag
                    :auto-upload="false"
                    v-bind:class="{ hide: otherList.length == 1 }"
                    list-type="picture-card"
                    :file-list="otherList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :disabled="!modifying"
                  >
                    <i class="fa-solid fa-upload"></i>
                    <div class="el-upload__text">
                      faire glisser une image ou <em>cliquer pour choisir</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload>
                  <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                  </el-dialog>
                </el-col>
                <el-row
                  style="
                    width: 100%;
                    display: flex;
                    margin-top: 3%;
                    justify-content: center;
                  "
                >
                  <br />
                  <el-button
                    type="primary"
                    v-show="!saved"
                    round
                    @click="goToEvents()"
                    plain
                  >
                    <i class="fa-solid fa-ban"></i> &nbsp;Annuler</el-button
                  >
                  <el-button type="primary" v-show="!saved" @click="save" round
                    ><i class="fa-solid fa-square-check"></i>&nbsp; Créer
                  </el-button>
                  <el-button
                    type="primary"
                    v-show="saved"
                    round
                    @click="goToEvents()"
                    plain
                  >
                    <i class="fa-solid fa-ban"></i> &nbsp;Allez aux
                    évenements</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="saved"
                    @click="newOne()"
                    round
                    ><i class="fa-solid fa-square-check"></i>&nbsp; Créer un
                    autre
                  </el-button>
                </el-row>
              </el-row>
            </el-form>
          </el-card>
        </el-scrollbar>
        <!-- body cards  -->
      </el-col>
    </el-row>
  </nav>
</template>

<script>
import eventService from "../services/eventService";
import { ElNotification } from "element-plus/es";
import("element-plus/es/components/notification/style/css");

export default {
  name: "EventDetail",
  data() {
    return {
      event: {
        name: "",
        organizer: "",
        desc: "",
        date: "",
        capacity: "",
        addr: "",
        tags: [],
        urls: "",
        category: "",
        subcategory: [],
      },
      optionsCategories: [],
      optionsSubCategories: [],
      optionsTags: [],
      eventList: [],
      ticketList: [],
      otherList: [],
      defaultTime1: [new Date()],
      disabledDateF: (time) => {
        return time.getTime() <= Date.now();
      },
      dialogImageUrl: "",
      dialogVisible: false,
      modifying: true,
      saved: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async save() {
      try {
        let formData = new FormData();
        formData.append("name", this.event.name);
        formData.append("organiser", this.event.organizer);
        formData.append("description", this.event.desc);
        formData.append("price", 23 + Math.floor(Math.random() * 1000));
        formData.append("justForWomen", false);
        formData.append("startDate", this.event.date[0]);
        formData.append("endDate", this.event.date[1]);
        formData.append("ticketNb", this.event.capacity);
        formData.append("address", this.event.addr);
        formData.append("tags", JSON.stringify(this.event.tags));
        formData.append("category", this.event.category);
        formData.append("externalUrls", this.event.urls);
        formData.append("subCategory", JSON.stringify(this.event.subcategory));
        formData.append("eventImage", this.eventList[0].raw);
        formData.append("ticketImage", this.ticketList[0].raw);
        formData.append("outherImage", this.otherList[0].raw);
        const event = await eventService.Add(formData);
        console.log(this.fileList);

        console.log(event.data);
        if (event.data.success == false) {
          ElNotification({
            title: "Error",
            message: "Error to add event:" + event.data.message,
            type: "error",
          });
        } else {
          this.modifying = false;
          this.saved = true;

          ElNotification({
            title: "Succès",
            message: "Evenement ajouté avec succès",
            type: "success",
          });
        }
      } catch (error) {
        ElNotification({
          title: "Echec",
          message: "Verifier les champs ",
          type: "warning",
        });
      }
    },
    async getCategories() {
      let response = await eventService.getCategories();
      let categories = response.data.data;
      this.optionsCategories = [];
      for (let i = 0; i < categories.totalItems; i++) {
        this.optionsCategories.push({
          value: categories.category[i].idCategory,
          label: categories.category[i].name,
        });
      }
      console.log(response.data);
      console.log(this.optionsCategories);
    },
    async getSubCategories(idCategory) {
      console.log(idCategory);
      if (idCategory == "") {
        ElNotification({
          title: "Category Not selected",
          message: "Please select a category first ! ",
          type: "error",
        });
      } else {
        let response = await eventService.getSubCategories(idCategory);
        console.log(this.optionsSubCategories);
        let subcategories = response.data.data;
        this.optionsSubCategories = [];
        for (let i = 0; i < subcategories.count; i++) {
          this.optionsSubCategories.push({
            value: subcategories.rows[i].idSubCategory,
            label: subcategories.rows[i].name,
          });
        }
        console.log(response.data);
        console.log(this.optionsSubCategories);
      }
    },
    async getTags(eventName) {
      if (eventName !== "") {
        this.optionsTags = [{ value: eventName, label: "#" + eventName }];
      } else {
        ElNotification({
          title: "Name of event is empty",
          message: "Please enter an event name to get suggestions ! ",
          type: "error",
        });
      }
    },
    newOne() {
      location.reload();
    },
    goToEvents() {
      this.$router.push("/home/EventList");
    },
  },
};
</script>

<style>
.el-upload {
  display: table;
}
.el-upload-dragger {
  display: table-cell;
  vertical-align: middle;
  height: 100%;
}
label {
  padding-left: 8%;
  padding-right: 5%;
  padding-bottom: 1%;
  font-size: 11pt;
  width: 100%;
  text-align: start;
}
.el-input,
.el-textarea {
  padding-bottom: 2%;
  width: 80%;
  margin: 0 auto;
}
.el-input-number .el-input,
.el-input-number--large {
  margin-left: 9%;
  width: auto;
  padding-left: 0%;
  padding-bottom: 0%;
}
.el-range-editor {
  margin-left: 10%;
  margin-bottom: 2%;
}
.el-select {
  width: 80%;
  margin-left: 2%;
  padding-bottom: 2%;
}
.el-select-v2 {
  margin-left: 10%;
}
.el-button {
  min-width: 25%;
}
.el-button.is-round {
  padding: 1.7%;
}
.hide .el-upload,
.hide .el-upload__tip {
  display: none;
}
.header {
  height: 14vh;
  background-color: var(--vt-c-orange);
}
.event .el-row .el-button {
  flex: 1;
  max-width: 38%;
}
</style>
