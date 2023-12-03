<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
</script>

<template>
  <div class="sidebar-me">
    <!-- HEADER -->
    <div class="sidebar-header-me">
      HEADER
      <button @click="$emit('SideBarCloseMe')">Close</button>
    </div>
    <!-- BODY -->
    <div class="sidebar-body-me">
      <nav>
        <ul>
          <li>
            <RouterLink to="/me">Me</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style>
/* ul {
  list-style-type: none;
}

nav {
  width: 14rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

nav ul li {
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;

  background-color: gold;
} */

.sidebar-me {
  height: 100%;
  z-index: 100;
  width: 15rem;
  background-color: #ffffff;
}

.sidebar-header-me {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 4rem;
}

/* .sidebar-body-me {
} */
</style>
