<template>
    <div class="row p-2 shadow-lg bg-white sticky-top border-bottom">
        <div class="col-2 align-self-center">
            <a class="btn  btn-link btn-sm rounded-circle text-danger" href="/" role="button">
                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
            </a>
        </div>
        <div class="col-8 align-self-center text-center">
            <font face = "Forte" size = "6">Mis imagenes</font>
        </div>
        <div class="col-2 align-self-center text-center">
            <font face = "Forte" size = "4">Bienvenido {{ user.username }} </font>&nbsp;
            <a class="btn btn-outline-dark btn-sm rounded-pill" href="/Mis-imagenes/create" role="button">
                <font size = "2">Subir imagen</font>
            </a>
        </div>
    </div>
    <div class="row justify-content-center bg-secondary">
        <div class="col-12 text-center" v-if="alerta === true">
            <div class="alert alert-danger" role="alert">
                <p>No haz publicado ninguna imagen</p>
            </div>
        </div>
        <div class="col-12 col-md-5 col-lg-3 m-2 d-flex align-items-stretch" v-for="(imagen) in imagenes" :key="imagen.id">
            <div class="card" style="width: 18rem; heigth: 20rem;">
                <div v-for="foto in imagen.url" v-bind:key="foto.id">
                <img :src="'http://localhost:1337'+ foto.formats.medium.url" class="card-img-top">
                </div>
                <div class="card-body text-center">
                    <a href="#" class="btn btn-danger" @click="eliminar(imagen.id)">Eliminar</a>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Mis imagenes',
    data(){
    return{
      user: {},
      imagenes: [],
      alerta: false
    }
    },
    mounted(){
        this.misimagenes()
    },
    methods: {
        misimagenes(){
            this.user = JSON.parse(localStorage.getItem('user'))
            const token = localStorage.getItem('token')
            fetch('http://localhost:1337/imagenes/me', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.imagenes = data
                if(this.imagenes.length == 0)
                {
                    this.alerta = true
                }else{
                    this.alerta = false
                }
            })
        },
        eliminar(id){
            axios.delete('http://localhost:1337/imagenes/'+ id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                this.misimagenes()
            })
        }
    }
}
</script>
