<template>
    <div class="sidebar-body-menu" v-if="buttons.length > 0">
        <div v-for="button in buttons">
          <button @click="toggleSection(button.name)">
            {{ button.label }}
          </button>
          <CoursesComp v-if="isActive(button.name)" :id="button.name">></CoursesComp>
        </div>
    </div>
    <div v-else class="sub">
      <h3>Veulliez vous abonner à une filière</h3>
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
    return Response.json()
  }).then((data)=>{
    data.forEach(button => {buttons.value.push({name: button.id_major, label: button.year + "-" + button.major_name})})
  })
  

</script>
  
<style scoped>

  button {
    font-size: 16px;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    overflow: hidden;
    background-color: #495057;
    font-family: Arial;
    width: 100%   
  }
  button:hover{
    background-color: #6C757D;
  }
  .sub{
    margin-top: 30px;
  }
</style>
  