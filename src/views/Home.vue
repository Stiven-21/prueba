<template>
  <div class="row p-2 shadow-lg bg-white sticky-top border-bottom">
    <div class="col-2 align-self-center text-right">
      <a class="btn btn-outline-dark btn-sm rounded-pill" href="/Mis-imagenes" role="button">
        Mis imagenes
      </a>
    </div>

    <div class="col-8 text-center">
      <font face = "Forte" size = "6">free images</font>
    </div>
    <div class="col-2 align-self-center text-left">
      <button @click="salir" class="btn btn-outline-danger btn-sm rounded-pill float-left">
        Cerrar sesion
      </button>
    </div>
  </div>

  <div class="row">
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/1.jpg" class="d-block w-100">
          <div class="carousel-caption">
            <h5 class="text-light 	d-none d-md-block">Encuentra aqui las mejores imagenes gratis</h5>
            <div class="input-group mb-3">
              <div class="input-group-append">
                <span class="input-group-text bg-transparent text-white rounded-left d-none d-sm-block">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                  </svg>
                </span>
              </div>
              <input type="text" class="form-control bg-transparent text-white" v-model="buscar" aria-label="Amount (to the nearest dollar)">
              <div class="input-group-prepend ">
                <select class="input-group-text bg-transparent text-white custom-select rounded-right" v-model="checkedNames">
                  <option class="text-dark" v-for="categoria in categorias" :key="categoria.id" :value="categoria.nombre" >{{ categoria.nombre }}</option>
                  <option class="text-dark" value=""  selected>Todas</option>
                </select>
              </div>
            </div>
            <p class="text-light d-none d-md-block">Imagenes popuares entre la comunidad: Hogar, Animales, Paisajes.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center ">
    <div class="col-12 text-center" v-if="alerta === true">
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Lo sentimos!</h4>
        <p>No hay ninguna imagen con esta categoria</p>
      </div>
    </div>
    <div class="col-12 col-md-5 col-lg-3 m-2 d-flex align-items-stretch" v-for="(imagen) in imagenes" :key="imagen.id">
        <div class="card" style="width: 18rem;">
            <div v-for="foto in imagen.url" v-bind:key="foto.id">
              <a :href="'http://localhost:1337'+ foto.formats.medium.url" target="_blank"  download="image.jpg"><img :src="'http://localhost:1337'+ foto.formats.medium.url" class="card-img-top"></a>
              <div class="card-body">
                <a :href="foto.name" :src="'http://localhost:1337'+ foto.url" target="_blank"  download="image.jpg">descargar</a>
                <li type="disc">Publicada por: {{  imagen.user.username }}</li>
              </div>
            </div>
        </div>
        <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'debounce';

export default {
  name: 'Home',
  data(){
    return{
      imagenes: {},
      categorias: [],
      checkedNames: "",
      buscar: "",
      alerta: false
    }
  },
  mounted(){
    axios.get('http://localhost:1337/imagenes?_sort=id%3ADESC').then((response) => {
      this.imagenes = response.data
    }),
    axios.get('http://localhost:1337/categorias').then((response) => {
      this.categorias = response.data
    }),
    this.Search = debounce(this.Search, 600)
  },
  watch: {
    checkedNames(value){
      this.Search(value)
    },
    buscar(value){
      this.Search(value)
    }
  },
  methods: {
    Search(value){
      axios.get('http://localhost:1337/imagenes?_sort=id%3ADESC', {
        params: {
          'categorias.nombre_contains': value
        }
      }).then((response) => {
        this.imagenes = response.data
        console.log(this.imagenes.length)
        if(this.imagenes.length == 0)
        {
          this.alerta = true
        }else{
          this.alerta = false
        }
        console.log(this.alerta)
      })
    },
    salir(){
      localStorage.removeItem('token'),
      localStorage.removeItem('user'),
      this.$router.push('/login')
    }
  }
};
</script>
