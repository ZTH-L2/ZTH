<template>
  <div class="sidebar-body-menu">
    <div v-for="button in buttons" :key="button.name">
      <button @click="toggleSection(button.name)" :class="{ active: isActive(button.name) }">
        {{ button.label }}
      </button>
      <ul v-if="isActive(button.name)">
        <li>
          <router-link :to="{ name: 'voir_post', params: { id_course: button.name, category: 'cm' }}" class="router-link-button">
            CM
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'voir_post', params: { id_course: button.name, category: 'td' }}" class="router-link-button">
            TD
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'voir_post', params: { id_course: button.name, category: 'tp' }}" class="router-link-button">
            TP
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'voir_post', params: { id_course: button.name, category: 'exam' }}" class="router-link-button">
            EXAM
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUrlStore } from "./../stores/url";
const urlStore = useUrlStore();

const props = defineProps(["id"]);
const buttons = ref([]);

const activeSections = ref([]);
const toggleSection = (section) => {
  if (activeSections.value.includes(section)) {
    activeSections.value = activeSections.value.filter((s) => s !== section);
  } else {
    activeSections.value = [...activeSections.value, section];
  }
};

const isActive = (section) => activeSections.value.includes(section);

fetch(urlStore.api + "/majors_courses_link/major/" + props.id, { credentials: "include" }).then((Response) => {
  return Response.json();
}).then((data) => {
  data.forEach((button) => {
    buttons.value.push({ name: button.id_course, label: button.course_name });
  });
});
</script>

<style scoped>
/* Dropdown button */
button {
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  overflow: hidden;
  background-color: #6C757D;
  font-family: Arial;
  width: 100%;
}

button:hover {
  background-color: #ADB5BD;
}

.router-link-button {
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 0px;
  text-decoration: none;
  overflow: hidden;
  background-color: #ADB5BD;
  font-family: Arial;
  width: 100%;
  display: block;
}

.router-link-button:hover {
  background-color: #CED4DA;
}


</style>
