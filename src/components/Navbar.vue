<template>
    <!-- Vertical navbar -->
<div class="vertical-nav bg-dark" id="sidebar">   
    <div class="py-4 px-3 mb-4">
        <div class="media d-flex align-items-center"><img src="../assets/avatar.jpg" alt="..." width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm">
            <div class="media-body">
                <h4 class="m-0 text-light">Sebastian Hidalgo</h4>
                <p class="font-weight-light text-light mb-0">Web developer</p>
            </div>
        </div>
    </div>
  <p class="text-light font-weight-bold text-uppercase px-3 small pb-4 mb-0">Principal</p>
    <ul class="nav flex-column  mb-0">
        <li class="nav-item">
            <router-link   :to="{ name: 'equipo-page'}" class="nav-link text-light font-italic">
                <i class="fa-solid  mr-3 fa-flag-checkered"></i>
                Teams
            </router-link>
        </li>

        <li class="nav-item">
            <router-link  :to="{ name: 'fubtolista-page'}" class="nav-link text-light font-italic">
                <i class="fa-solid mr-3 fa-people-group"></i>
                Players
            </router-link>
        </li>
    </ul>
</div>
<!-- End vertical navbar -->
</template>
<script>
export default {
    
}
</script>
<style lang="css">
    
</style>