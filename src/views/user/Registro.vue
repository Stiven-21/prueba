<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-3"></div>
      <div class="col-6 text-center border rounded-lg mt-5 bg-light">
        <h1 class="mt-4">Registrarse</h1>
        <form @submit.prevent="Registrar">
            <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                    <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                </svg>
              </div>
            </div>
            <input type="user" v-model="user" id="user" placeholder="Usuario" class=" form-control" required>
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-envelope" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                </svg>
              </div>
            </div>
            <input type="email" v-model="email" id="email" placeholder="E-mail" class=" form-control" required>
          </div>
          <div class="input-group mb-2"> 
            <div class="input-group-prepend">
              <div class="input-group-text">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-key" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </div>
            </div>
            <input type="password" v-model="password" id="password" placeholder="Contraseña" class=" form-control" required>
          </div>
          <div v-if="error">
            <span style="color: red">xd</span>
          </div>
          <button type="submit" class="mt-2 btn btn-success rounded-pill btn-block">Registrarse</button>
          
        </form>
        <div class="text-right text-secondary">
            <h6><small>
              o <a href="/Login" class="text-secondary">Inicia sesión</a>
            </small></h6>
        </div>
        <hr width="75%" align="center"/>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Registro',
  data () {
    return{
        user: "",
        email: "",
        password: "",
        error: false
    }
  },
  methods:{
    Registrar() {
      this.error = false,

      fetch('http://localhost:1337/auth/local/register', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: this.user,
            email: this.email,
            password: this.password
        })
      }).then(async (response)=> {
        if(!response.ok){
          throw await response.json();
        }
        return response.json();
      }).then((data) => {
        localStorage.setItem('token', data.jwt),
        localStorage.setItem('user', JSON.stringify(data.user)),
        this.$router.push("/")
      })
      .catch((err)=> {
        this.error = true
      })
    }
  }
}
</script>