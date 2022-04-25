<template>
    <div v-if="isLoading" 
        class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor ....
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>
    <div v-else>
        <div class="d-flex flex-row">
            <div class="mr-auto">
                <h1>Teams</h1>
            </div>
            <div class="ms-auto">
                <button class="btn btn-primary"
                    @click="abrirModal('create')"
                    >Create New Team
                </button>
            </div>
        </div>
        <div class="d-flex">
            <div class="col-8 mx-auto">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default"> Búsqueda &nbsp<i class="fa fa-search"></i></span>
                    </div>
                    <input type="text" class="form-control" v-model="term"  aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
            </div>
        </div>
        <div v-if="teams.length > 0"  class="d-flex mt-4">
            <div class="col justify-content-center ">
                <div class="table-responsive card">
                    <table class="table mx-auto container-factura p-0 m-0 text-start">
                        <thead>
                            <tr scope="row">
                                    
                                    <th scope="col">
                                        <a class="pointer" @click="order( name, 'name')">
                                            Name
                                            <template v-if="column=='name'">
                                                <i v-if="asc==true" class="fas fa-arrow-down"></i>
                                                <i v-else class="fas fa-arrow-up"></i>
                                            </template>
                                        </a>
                                    </th>
                                    <th scope="col">
                                        <a class="pointer" @click="order( league, 'league')">
                                            League
                                            <template v-if="column=='league'">
                                                <i v-if="asc==true" class="fas fa-arrow-down"></i>
                                                <i v-else class="fas fa-arrow-up"></i>
                                            </template>
                                        </a>
                                    </th>
                                    <th scope="col">
                                        <a class="pointer" @click="order( country, 'country')">
                                            Country
                                            <template v-if="column=='country'">
                                                <i v-if="asc==true" class="fas fa-arrow-down"></i>
                                                <i v-else class="fas fa-arrow-up"></i>
                                            </template>
                                            
                                        </a>
                                    </th>
                                    
                                    <th scope="col text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="team in teams" :key="team.id_team">
                                <td scope="row">{{ team.name}}</td>
                                <td>{{ team.league}}</td>
                                <td>{{ team.country }}</td>
       
                                <td>
                                    <button  @click="abrirModal('update', team)" class="btn btn-outline-success p-1">
                                       <i class="fa fa-pencil" ></i>
                                    </button>
                                    <button  @click="abrirModalPlayers(team)" class="btn btn-outline-primary ms-2 p-1">
                                       <i class="fa-solid fa-users"></i> Players
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>  
    </div>


            <!-- Modal -->
    <div class="modal fade" id="ModalEquipo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" style="max-width: 50%" >
            <div class="modal-content">
            <div class="modal-header">
                <div class="col-md-12 text-center">
                    <h2 v-if="create">Create Team</h2>
                    <h2 v-else>Update Team</h2>
                </div>
            </div>
            <div class="modal-body align-content-center">
                <div class="mb-4">
                        <label for="name" class="form-label">Name</label>
                        <input class="form-control"  name="name" v-model="name">
                </div>  
                <div class="row">
                        <div class="col-6 mb-4">
                            <label for="league" class="form-label">League</label>
                            <input class="form-control" type="text" name="league" v-model="league">
                        </div> 
                        <div class="col-6 mb-4">
                            <label for="country" class="form-label">Country</label>
                            <input class="form-control" type="text" name="country" v-model="country">
                        </div> 
                </div>
                
                </div>
                
                <div class="modal-footer border-top-0 d-flex justify-content-end">
                    <div v-if="create">
                        <button class="btn btn-success"
                        @click="createTeam">
                            Create
                        </button>
                    </div>
                    <div v-else>
                        <button class="btn btn-success "
                            @click="updateTeam">
                            Update
                        </button>
                    </div>
                    <div>
                        <button class="btn btn-mixed"
                        @click="cerrarModal">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    </div>
    <div class="modal fade" id="ModalPlayers" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document"  >
            <div class="modal-content">
                <div class="modal-header">
                    <div class="col-md-12 text-center">
                        <h2>Players</h2>
                    </div>
                </div>
                <div class="modal-body align-content-center">
                    <div v-if="players.length>0" class="table-responsive card">
                        <table class="table mx-auto container-factura p-0 m-0 text-start">
                            <thead>
                                <tr scope="row">
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Team</th>
                                    <th scope="col">Squad</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Nationality</th>
                                    
                                    <th scope="col text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="player in players" :key="player.id_player">
                                    <td scope="row">{{ player.name}}</td>
                                    <td>{{ player.age}}</td>
                                    <td>{{ player.name }}</td>
                                    <td>{{ player.squad_number }}</td>
                                    <td>{{ player.position }}</td>
                                    <td>{{ player.nationality }}</td>
                                    <td>
                                        <button  @click="deletePlayer( player.id_player)" class="btn btn-outline-danger">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <p class="">There are no players assigned to this team</p>
                    </div>
                </div>
                <div class="modal-footer border-top-0 d-flex justify-content-end">
                    <div>
                        <button class="btn btn-secondary"
                            @click="cerrarModalPlayers">
                                Close
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>
<script>
import axios from 'axios'
import { useToast } from "vue-toastification"
export default {
    setup() {
      const toast = useToast();
      return { toast }
    },
    data() {
        return {
            asc: true,
            isLoading: false,
            term:'',
            column:'name',
            teams: '',
            allTeams: '',
            create: false,
            update:false,
            name: '',
            country: '',
            league:'',
            id_team:'',
            players: [],
        }
    },
    watch:{
        term(){
            this.getTeamByTerm()
        }
    },
    methods: {
        abrirModal( action, team){
            if (action == 'create'){
                // this.limpiarData();
                this.create=true;
                this.update=false;
            } else {
                this.id_team= team.id_team
                this.name = team.name
                this.league= team.league
                this.country= team.country
                this.create=false;
                this.update=true;
            }
            $('#ModalEquipo').modal('show');
        },
       async deletePlayer(id){
             const resp = await axios({ url: 'delete_player', data: { 
               id_player: id

            }, method: 'POST'})
            const { data } = resp
            if( data.error ){
                this.toast.error('Player could not be deleted')
                console.log('sorry')
            } else {
                this.toast.success('Succesfully player deleted')
            }
            $('#ModalPlayers').modal('hide');
            this.getAllTeams()
        },
        getTeamByTerm() {
            if ( this.term.length > 0 ) 
            {
                this.teams = this.allteams.filter( team => 
                team.name.toLowerCase().includes( this.term.toLocaleLowerCase() ) || 
                team.league.toLowerCase().includes( this.term.toLocaleLowerCase() ) || 
                team.country.toLowerCase().includes( this.term.toLocaleLowerCase() )  
                )
            } else {
                this.teams = this.allteams
            }
        },
        cerrarModal(){
            $('#ModalEquipo').modal('hide');
        },
        cerrarModalPlayers(){
            $('#ModalPlayers').modal('hide');
        },
        abrirModalPlayers(team){
            this.players = team.players
            $('#ModalPlayers').modal('show');
        },
        order( term, column ) {
            this.teams.sort((a, b) => (a.term < b.term) ? 1 : -1)   
            this.column = column 
            this.asc = !this.asc
        },
        cleanData(){},
        async getAllTeams(){
           const resp = await axios({ url: 'get_all_teams', data: { 
            }, method: 'GET'})
            this.teams = resp.data
            this.allteams = resp.data
            console.log(this.teams)
        },
        async createTeam(){
            //TODO VALIDATOR
            const resp = await axios({ url: 'create_team', data: { 
               name: this.name,
               league: this.league,
               country: this.country
            }, method: 'POST'})
            const { data } = resp
            this.cerrarModal()
            if( data.error ){
                //todo alert success
                console.log('sorry')
                this.toast.error('Team could not be created')
            } else {
                this.toast.success('Team created Successfully')
            }
            this.getAllTeams()
        },
        async updateTeam(){
            //TODO VALIDATOR
            const resp = await axios({ url: 'update_team', data: { 
               id_team: this.id_team,
               name: this.name,
               league: this.league,
               country: this.country
            }, method: 'POST'})
            const { data } = resp
            this.cerrarModal()
            if( data.error ){
                //todo alert success
                this.toast.error('Team could not be created')
                console.log('sorry')
            } else {
                this.toast.success('Player updated Successfully  ')
            }
            this.getAllTeams()
        },
    }, 
    created() {
        this.getAllTeams()
    },
    
}
</script>
<style lang="css" scoped>
thead tr th a {
    cursor: pointer;
    text-decoration:none;
    color: black;
} 
.modal-body {
  align-items: center;
  justify-content: center;
}
</style>