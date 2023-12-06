<template>
    <div class="sidebar-body-menu">
        <div v-for="button in buttons">
      <button @click="toggleSection(button.name)">
        {{ button.label }}
      </button>
      <CoursesComp v-if="isActive(button.name)" id="button.name">></CoursesComp>
    </div>
    </div>
  </template>
  
  <script setup>
  import CoursesComp from "./CoursesComp.vue";
  import { useUrlStore } from "./../stores/url";

  import { ref } from "vue";
const urlStore = useUrlStore();

  const buttons = ref([]);
  
  const activeSections = ref([]);
  
  const toggleSection = (section) => {
    if (activeSections.value.includes(section)) {
      activeSections.value = activeSections.value.filter((s) => s !== section);
    } else {
        activeSections.value.push(section);
    }
  };
  
  
  const isActive = (section) => activeSections.value.includes(section);
  
  fetch(urlStore.api + "/subscription/user" , {credentials: 'include'}).then((Response)=>{
    console.log(Response)
    return Response.json()
  }).then((data)=>{
    data.forEach(button => {buttons.value.push({name: button.id_major, label: button.year + "-" + button.major_name})})
    console.log(buttons.value)
  })
  

  </script>
  
  <style>
  .sidebar-menu {
    height: 100%;
    z-index: 100;
    width: 15rem;
    background-color: #ffffff;
  }
  
  .sidebar-header-menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 4rem;
  }
  
  .sidebar-body-menu {
    margin-top: 10px;
  }
  </style>
  