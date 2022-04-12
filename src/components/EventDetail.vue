<template>
  <el-card>
    <button id="delete" @click="deleteEvent(EventDetail.idEvent)">
      <i class="fa-solid fa-trash-can"> </i>
    </button>
    <template #header>
      <div class="card-header">
        <p style="text-align: left">Event ID : {{ EventDetail.idEvent }}</p>
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
              id="categoryId"
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
              v-model="event.tags"
              name="tags"
              :options="optionsTags"
              multiple-limit="10"
              placeholder="ex: #event "
              style="width: 240px; margin-right: 16px; vertical-align: middle"
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
          <div class="images">
            <img id="upload1" src="" alt="" />
          </div>
          <el-upload
            name="upload"
            class="upload-demo uploads"
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
          <div class="images">
            <img id="upload2" src="" alt="" />
          </div>
          <el-upload
            name="upload2"
            class="upload-demo uploads"
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
          <div class="images">
            <img id="upload3" src="" alt="" />
          </div>
          <el-upload
            name="upload3"
            class="upload-demo uploads"
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
        <el-row style="width: 100%; display: inline-block; margin-top: 3%">
          <el-button
            type="primary"
            v-show="!modifying"
            @click="modifying = true"
            round
          >
            <i class="fa-solid fa-pen-to-square"></i> &nbsp; Modifier</el-button
          >
          <el-button
            type="primary"
            v-show="modifying"
            round
            @click="cancel"
            plain
          >
            <i class="fa-solid fa-ban"></i> &nbsp;Annuler</el-button
          >
          <el-button type="primary" v-show="modifying" @click="save" round
            ><i class="fa-solid fa-square-check"></i>&nbsp;
            Sauvegarder</el-button
          >
        </el-row>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import eventService from "../services/eventService";
import { ElNotification } from "element-plus/es";
import("element-plus/es/components/notification/style/css");
import $ from "jquery";
export default {
  name: "EventDetail",
  data() {
    return {
      event: {
        name: "",
        organizer: "",
        desc: "",
        date: [],
        capacity: "",
        addr: "",
        tags: [],
        urls: "",
        category: "",
        subcategory: [],
      },
      eventCopy: {},
      EventDetail: [],
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
      modifying: false,
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
      this.modifying = false;
      let equal = JSON.stringify(this.event) === JSON.stringify(this.eventCopy);
      console.log(equal);
      if (!equal) {
        try {
          let formData = new FormData();
          formData.append("name", this.event.name);
          formData.append("organiser", this.event.organizer);
          formData.append("description", this.event.desc);
          formData.append("startDate", this.event.date[0]);
          formData.append("endDate", this.event.date[1]);
          formData.append("ticketNb", this.event.capacity);
          formData.append("address", this.event.addr);
          formData.append("tags", JSON.stringify(this.event.tags));
          formData.append("category", this.event.category);
          console.log("this.event.category" + this.event.category);
          console.log(this.event.category);
          console.log(this.eventCopy.category);
          formData.append("externalUrls", this.event.urls);
          formData.append(
            "subCategory",
            JSON.stringify(this.event.subcategory)
          );
          if (this.eventList.length) {
            formData.append("eventImage", this.eventList[0].raw);
          }
          if (this.ticketList.length) {
            formData.append("ticketImage", this.ticketList[0].raw);
          }
          if (this.otherList.length) {
            formData.append("outherImage", this.otherList[0].raw);
          }
          const event = await eventService.Update({
            form: formData,
            id: this.EventDetail.idEvent,
          });
          console.log(event.data);
          if (event.data.success == false) {
            ElNotification({
              title: "Error",
              message: "Error to update event:" + event.data.message,
              type: "error",
            });
          } else {
            this.$router.push("/home");
            ElNotification({
              title: "Succes",
              message: "Event updated successfully",
              type: "success",
            });
          }
        } catch (error) {
          ElNotification({
            title: "Failed to update event",
            message: "Server error  " + error,
            type: "warning",
          });
        }
      } else {
        ElNotification({
          title: "Saved Successfully",
          message: "No modification ",
          type: "success",
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
    async deleteEvent(idEvent) {
      try {
        
        let response = await eventService.Delete(idEvent);
        console.log(response.data);
        ElNotification({
          title: "Deleted Successfully",
          message: "Event Deleted ",
          type: "success",
        });
      } catch (error) {
        ElNotification({
          title: "Failed to delete",
          message: "Server Error ",
          type: "error",
        });
      }
    },
    cancel() {
      this.modifying = false;
      this.event = this.eventCopy;
    },
  },
  created() {
    console.log(JSON.parse(sessionStorage.getItem("allEvents")));
    if ($.isEmptyObject(this.$route.params)) {
      this.EventDetail = JSON.parse(sessionStorage.getItem("allEvents"))[0];
    } else {
      this.EventDetail = JSON.parse(sessionStorage.getItem("allEvents"))[
        JSON.parse(this.$route.params.id)
      ];
    }

    console.log(this.EventDetail);
    this.event.name = this.EventDetail.name;
    this.event.organizer = this.EventDetail.organiser;
    this.event.desc = this.EventDetail.description;
    this.event.date[0] = this.EventDetail.startDate;
    this.event.date[1] = this.EventDetail.endDate;
    this.event.capacity = this.EventDetail.ticketNb;
    this.event.addr = this.EventDetail.address;
    this.event.urls = this.EventDetail.externalUrls;
    for (let i = 0; i < this.EventDetail.Tags.length; i++) {
      this.optionsTags.push({
        value: this.EventDetail.Tags[i].name,
        label: "#" + this.EventDetail.Tags[i].name,
      });
      this.event.tags.push(this.EventDetail.Tags[i].name);
    }
    console.log(this.event.tags);
    this.getCategories();
    this.event.category = this.EventDetail.SubCategories[0].CategoryIdCategory;
    this.getSubCategories(this.EventDetail.SubCategories[0].CategoryIdCategory);

    for (let i = 0; i < this.EventDetail.SubCategories.length; i++) {
      this.event.subcategory.push(
        this.EventDetail.SubCategories[i].idSubCategory
      );
    }

    this.eventCopy = JSON.parse(JSON.stringify(this.event));
    let self = this;
    $(document).ready(function () {
      $(".uploads").hide();
      $("#upload1").attr("src", self.EventDetail.eventImage);
      $("#upload2").attr("src", self.EventDetail.ticketImage);
      $("#upload3").attr("src", self.EventDetail.outherImage);
    });
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
#delete {
  border-radius: 50%;
  background-color: rgba(255, 226, 199, 0.575);
  float: right;
  margin-right: 3%;
  padding: 0.5%;
  width: 3.9%;
  border: 1px solid rgba(255, 166, 0, 0.393);
  cursor: pointer;
}
.hide .el-upload,
.hide .el-upload__tip {
  display: none;
}
.images img {
  width: 100%;
  max-height: 20vh;
}
.el-select__tags{
  margin-left: 9%;
  top:35%
}
</style>
