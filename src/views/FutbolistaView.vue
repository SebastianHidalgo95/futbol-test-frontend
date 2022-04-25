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
                    >Create New Player
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
        <div v-if="players.length > 0"  class="d-flex mt-4">
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
                                        <a class="pointer" @click="order( age, 'age')">
                                            Age
                                            <template v-if="column=='age'">
                                                <i v-if="asc==true" class="fas fa-arrow-down"></i>
                                                <i v-else class="fas fa-arrow-up"></i>
                                            </template>
                                        </a>
                                </th>
                                <th scope="col">
                                        <a class="pointer" @click="order( team, 'team')">
                                            Team
                                            <template v-if="column=='team'">
                                                <i v-if="asc==true" class="fas fa-arrow-down"></i>
                                                <i v-else class="fas fa-arrow-up"></i>
                                            </template>
                                            
                                        </a>
                                </th>
                                <th scope="col">
                                        <a class="pointer" @click="order( squad_number, 'squad_number')">
                                            Squad
                                            <template v-if="column=='squad_number'">
                                                <i v-if="asc==true" class="fas fa-arrow-down"></i>
                                                <i v-else class="fas fa-arrow-up"></i>
                                            </template>
                                            
                                        </a>
                                </th>
                                <th scope="col">
                                        <a class="pointer" @click="order( position, 'position')">
                                            position
                                            <template v-if="column=='position'">
                                                <i v-if="asc==true" class="fas fa-arrow-down"></i>
                                                <i v-else class="fas fa-arrow-up"></i>
                                            </template>
                                            
                                        </a>
                                </th>
                                <th scope="col">
                                        <a class="pointer" @click="order( nationality, 'nationality')">
                                            Nationality
                                            <template v-if="column=='nationality'">
                                                <i v-if="asc==true" class="fas fa-arrow-down"></i>
                                                <i v-else class="fas fa-arrow-up"></i>
                                            </template>
                                        </a>
                                </th>
                                <th scope="col text-center">Acciones</th>
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
                                    <button  @click="abrirModal('update', player)" class="btn btn-outline-success px-2">
                                        <i class="fa-solid fa-user-pen"></i>
                                    </button>
                                    <button  @click="deletePlayer( player.id_player)" class="btn ms-2 btn-outline-danger">
                                        <i class="fa-solid fa-trash-can"></i>
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
                    <h2 v-if="create">Create Player</h2>
                    <h2 v-else>Update Team</h2>
                </div>
            </div>
            <div>
                <div class="modal-body align-content-center">
                    <div class="row">
                        <div class="col-6 mb-4">
                            <label for="name" class="form-label">Name</label>
                            <input class="form-control"  name="name" v-model="name">
                        </div>  
                        <div class="col-6 mb-4">
                            <label for="age" class="form-label">Age</label>
                            <input class="form-control"  type="number" name="age" v-model="age">
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col-6 mb-4">
                            <label for="team" class="form-label">Team</label>
                            <input class="form-control" type="text" name="team" v-model="team_id">
                        </div> 
                        <div class="col-6 mb-4">
                            <label for="squad_number" class="form-label">Squad Number</label>
                            <input class="form-control" type="text" name="squad_number" v-model="squad_number">
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col-6 mb-4">
                            <label for="position" class="form-label">Position</label>
                            <input class="form-control" type="text" name="position" v-model="position">
                        </div> 
                        <div class="col-6 mb-4">
                            <label for="nationality" class="form-label">Nationality</label>
                            <input class="form-control" type="text" name="nationality" v-model="nationality">
                        </div> 
                    </div>
                
                </div>
                
                <div class="modal-footer border-top-0 d-flex justify-content-end">
                    <div v-if="create">
                        <button class="btn btn-success"
                        @click="createPlayer">
                            Create
                        </button>
                    </div>
                    <div v-else>
                        <button class="btn btn-success "
                            @click="updatePlayer">
                            Update
                        </button>
                    </div>
                    <div>
                        <button class="btn btn-secondary"
                        @click="cerrarModal">
                            Cancel
                        </button>
                    </div>
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
            players: '',
            allPlayers: [],
            create: false,
            update:false,
            
            name: '',
            age: '',
            team_id:'',
            squad_number:'',
            position:'',
            nationality:'',
        }
    },
    watch:{
        term(){
            this.getTeamByTerm()
        }
    },
    methods: {
        abrirModal( action, player){
            if (action == 'create'){
                // this.limpiarData();
                this.create=true;
                this.update=false;
            } else {
                this.id_player= player.id_player
                this.name = player.name
                this.age= player.age
                this.team_id= player.team_id
                this.squad_number= player.squad_number
                this.position= player.position
                this.nationality= player.nationality
                this.create=false;
                this.update=true;
            }
            $('#ModalEquipo').modal('show');
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
        async  deletePlayer(id){
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
            this.getAllPlayers()
        },
        order( term, column ) {
            this.players.sort((a, b) => (a.term < b.term) ? 1 : -1)   
            this.column = column 
            this.asc = !this.asc
        },
        cleanData(){},
        async getAllTeams(){
           const resp = await axios({ url: 'get_all_teams', data: { 
            }, method: 'GET'})
            this.teams = resp.data
            this.allteams = resp.data
        },
        async getAllPlayers(){
           const resp = await axios({ url: 'get_all_players', data: { 
            }, method: 'GET'})
            this.players = resp.data
            this.allPlayers = resp.data
        },
        async createPlayer(){
            //TODO VALIDATOR
            const resp = await axios({ url: 'create_player', data: { 
               name: this.name,
               age: this.age,
               team_id: this.team_id,
               squad_number : this.squad_number,
               position : this.position,
               nationality : this.nationality
            }, method: 'POST'})
            const { data } = resp
            if( data.error ){
                this.toast.error('Player could not be created')
                console.log('sorry')
            } else {
                this.toast.success('Player Successfully created')
            }
            this.getAllPlayers()
        },
        async updatePlayer(){
            //TODO VALIDATOR
            const resp = await axios({ url: 'update_player', data: { 
               id_player: this.id_player,
               name: this.name,
               age: this.age,
               team_id: this.team_id,
               squad_number : this.squad_number,
               position : this.position,
               nationality : this.nationality
            }, method: 'POST'})
            const { data } = resp
            if( data.error ){
                //todo alert success
                this.cerrarModal()
                this.toast.error('Player could not be updated')
                console.log(data.error)
            } else {
                this.toast.success('Player Successfully updated ')
            }
            this.getAllPlayers()
        },
    }, 
    created() {
        this.getAllTeams()
        this.getAllPlayers()
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