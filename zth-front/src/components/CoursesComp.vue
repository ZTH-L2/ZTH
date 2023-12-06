<template>
    <div class="sidebar-body-menu">
        <div v-for="button in buttons">
            <button @click="toggleSection(button.name)">
                {{ button.label }}
            </button>
            <ul v-if="isActive(button.name)">
                <li>CM</li>
                <li>TD</li>
                <li>TP</li>
                <li>EXAM</li>

            </ul>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const buttons = ref([
    {name: "1", label: "MATH301"},
    {name: "2", label: "MATH302"}
  ]);
  
  const activeSections = ref([]);
  
  const toggleSection = (section) => {
    if (activeSections.value.includes(section)) {
      activeSections.value = activeSections.value.filter((s) => s !== section);
    } else {
        activeSections.value = [...activeSections.value, section];
    }
  };
  
  
  const isActive = (section) => activeSections.value.includes(section);
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
  