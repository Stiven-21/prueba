<template>
    <div class="row p-2 shadow-lg bg-white sticky-top border-bottom">
        <div class="col-2 align-self-center text-left">
            <a class="btn  btn-link btn-sm rounded-circle text-danger" href="/Mis-imagenes" role="button">
                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
            </a>
        </div>
        <div class="col-8 align-self-center text-center">
            <font face = "Forte" size = "6">Crear imagen</font>
        </div>
        <div class="col-2 align-self-center text-left">
            <font face = "Forte" size = "4">Usuario: {{ user.username }} </font>
        </div>
    </div>
    <div class="row bg-secondary">
        <div class="col-12 col-md-6 text-center mx-auto">
            <br>
            <form
            @submit.prevent="subirimagen"
            @change="verimagen"
            enctype="multipart/form-data">
                <div class="w-50 custom-file">
                    <input type="file" ref="file" class="custom-file-input" id="file" accept="image/*" required>
                    <label class="custom-file-label text-left" for="file">selecione una imagen</label>
                </div>
                <br><br>
                <button type="submit" class="w-50 btn btn-success btn-sm">subir</button>
            </form>
            <div>
                <span>Categorias: </span>
            </div>
            <div v-if="alerta === true">
                <div class="alert alert-danger" role="alert">
                    Seleccione almenos una categoria
                </div>
            </div>
            <br>
            <div class="h-50 w-50 d-inline-block overflow-auto border rounded bg-light" style="width: 120px;">
                <div v-for="categoria in cat" :key="categoria.id">
                    <input type="checkbox" :id="categoria.nombre" :value="categoria.id" v-model="idCategoria" >
                    <label :for="categoria.nombre" >{{ categoria.nombre }}</label>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 text-center justify-content-center  mx-auto" style="height: 500px;">
            <br>
            <p><b>Previsualizacion:</b></p>
            <br>
            <div v-if="ver === ''">
                <div class="alert alert-danger" role="alert">
                    No a seleccionado ningun archivo
                </div>
            </div>
            <div>
                <img class="card-img-top" :src="ver" alt="" >
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Subir',
    data(){
        return{
            user: {},
            cat: [],
            idCategoria: [],
            ver: "",
            image: "",
            alerta: false
        }
    },
    mounted() {
        axios.get('http://localhost:1337/categorias').then((response) => {
            this.cat = response.data
        })
        this.user = JSON.parse(localStorage.getItem('user'))
    },
    methods:{
        verimagen(e){
            this.ver = URL.createObjectURL(e.target.files[0])
            this.image = e.target.files[0]
        },
        subirimagen(){
            if(this.idCategoria.length == 0)
            {
                this.alerta = true
            }else{
                this.alerta = false
                const token = localStorage.getItem('token')
                var formData = new FormData();
                let data = { categorias: this.idCategoria }

                formData.append("files.url", this.image);
                formData.append("data", JSON.stringify(data));
                
                axios.post("http://localhost:1337/imagenes", formData ,{
                    headers:{
                        'Authorization': 'Bearer ' + token,
                        "Content-Type": 'multipart/form-data',
                    }
                }).then((response) => {
                    this.$router.push("/")
                })
            }
        }
    }
}

</script>