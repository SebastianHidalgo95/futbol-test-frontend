<template >
    <Navbar />
    <!-- Page content-->
    <div class="page-content p-2" id="btncollapse">
      <button id="sidebarCollapse" type="button" @click="sidebar"
        class="btn btn-dark rounded-pill px-4">
        <i class="fa fa-bars mr-2"></i>
        <small class="text-uppercase font-weight-bold"></small>
    </button>
    </div>
    
    <div class="page-content px-5 " id="content">
    <!-- Toggle button -->
    
    <router-view></router-view>

</div>

</template>
<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { getTokenApi } from '../helpers/getFromApi'
export default {
    components: {
        Navbar: defineAsyncComponent( () => import('../components/Navbar.vue')),
    },
    methods:{
        sidebar(){
            $('#sidebar, #content, #btncollapse').toggleClass('active');
        }
    },
    created() {
      getTokenApi()
    },
}
</script>
<style lang="css">
.vertical-nav {
    min-width: 17rem;
    width: 17rem;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.4s;
  }
  
  .page-content {
    width: calc(100% - 17rem);
    margin-left: 17rem;
    transition: all 0.4s;
  }
  
  /* for toggle behavior */
  #sidebar.active {
    margin-left: -17rem;
  }

  #content.active {
    width: 100%;
    margin: 0;
  }
  #btncollapse.active {
    width: 100%;
    margin: 0;
  }
  @media (max-width: 768px) {
    #sidebar {
      margin-left: -17rem;
    }
    #sidebar.active {
      margin-left: 0;
    }
    #content {
      width: 100%;
      margin: 0;
    }
    #content.active {
      margin-left: 17rem;
      width: calc(100% - 17rem);
    }
  }
</style>