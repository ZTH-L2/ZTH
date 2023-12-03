<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="sidebar-menu">
    <!-- HEADER -->
    <div class="sidebar-header-menu">
      HEADER
      <button @click="$emit('SideBarCloseMenu')">Close</button>
    </div>
    <!-- BODY -->
    <div class="sidebar-body-menu">
      <nav>
        <ul>
          <li>Ex 1</li>
          <li>Ex 2</li>
          <li>Ex 3</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

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

/* .sidebar-body-menu {
} */
</style>
