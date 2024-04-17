<template>
  <div class="landing-page">
    <!-- Banner del juego -->
    <div class="banner">
      <img :src="bannerImage" alt="Banner del juego">
    </div>

    <!-- Nombre del juego y descripción breve -->
    <div class="game-info card">
      <h2 class="game-title">Celestial</h2>
      <p class="game-description">Embárcate en una aventura épica en el misterioso mundo de Celestial. Encarna a una valiente bruja que se aventura en ruinas antiguas y tenebrosas cuevas, enfrentándose a peligrosos enemigos mientras desentrañas los secretos de este universo mágico.</p>
    </div>

    <!-- Información del personaje principal -->
    <div class="character-info card">
      <h3>Personaje principal</h3>
      <div class="character-container">
        <img :src="PersonajeP" alt="Imagen de la bruja">
        <div class="character-description">
          <h4 class="character-name">Rowan la Bruja</h4>
          <p class="character-details">Rowan es una valiente y audaz bruja que se aventura en los oscuros y misteriosos reinos de Celestial. Con su sombrero puntiagudo y su bastón mágico, lleva consigo el poder de la magia ancestral.</p>
        </div>
      </div>
    </div>

  <!-- Información de objetos -->
    <div class="objects-info card">
      <h3>Objetos</h3>
      <div class="objects-container">
        <!-- Bastón -->
        <div class="object-card">
          <img :src="Baston" alt="Imagen del bastón">
          <div class="object-description">
            <h4 class="object-name">Bastón Mágico</h4>
            <p class="object-details">El bastón mágico de Rowan es una reliquia ancestral que canaliza el poder de la magia. Con él, puede lanzar hechizos poderosos y desatar el poder de los elementos.</p>
          </div>
        </div>
        <!-- Sombrero -->
        <div class="object-card">
          <img :src="Sombrero" alt="Imagen del sombrero">
          <div class="object-description">
            <h4 class="object-name">Sombrero Puntiagudo</h4>
            <p class="object-details">El sombrero puntiagudo de Rowan es un símbolo de su estatus como bruja poderosa. Además de protegerla de los elementos, canaliza su energía mágica y le otorga sabiduría ancestral.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Banner Enemigos -->
    <div class="banner-ad">
      <img :src="bannerImage2" alt="Banner adicional">
    </div>

    <!-- Lista de enemigos -->
    <div class="enemies-info card">
      <h3>Enemigos</h3>
      <ul>
        <li>
          <div class="enemy-container goblin">
            <img :src="PersonajeG" alt="Imagen del goblin">
            <div class="enemy-description">
              <h4>Goblin</h4>
              <p>Los goblins son criaturas astutas y traicioneras que habitan en las profundidades de las ruinas antiguas de Celestial. Aunque pequeños en estatura, compensan su falta de tamaño con su astucia y su habilidad para tender emboscadas a los desprevenidos exploradores.</p>
            </div>
          </div>
        </li>
        <li>
          <div class="enemy-container">
            <img src="@images/enemies/orc.png" alt="Imagen del orco">
            <div class="enemy-description">
              <h4>Orco</h4>
              <p>Los orcos son guerreros feroces y brutales que protegen ferozmente las oscuras cuevas de Celestial. Con su imponente estatura y su fuerza descomunal, representan una amenaza formidable para cualquier intruso que se atreva a entrar en su territorio.</p>
            </div>
          </div>
        </li>
        <li>
          <div class="enemy-container">
            <img :src="PersonajeB" alt="Imagen del ojociélago">
            <div class="enemy-description">
              <h4>Ojociélago (Jefe)</h4>
              <p>El Ojociélago es una criatura temible que acecha en las profundidades más oscuras de Celestial. Con su ojo penetrante y sus alas poderosas, observa y controla los oscuros secretos de los reinos mágicos. Es el jefe final que los valientes aventureros deben derrotar para desvelar los misterios más profundos de este universo encantado.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Información de Power Ups -->
    <div class="power-ups-info card">
      <h3>Power Ups</h3>
      <div class="power-ups-container">
        <!-- Power Up 1: Invulnerabilidad (Anillo) -->
        <div class="power-up-card">
          <img :src="PowerUp1" alt="Imagen de Invulnerabilidad">
          <div class="power-up-description">
            <h4 class="power-up-name">Invulnerabilidad</h4>
            <p class="power-up-details">El Anillo de Invulnerabilidad otorga al jugador la capacidad de resistir cualquier daño durante un breve período de tiempo, proporcionando una sensación de seguridad y confianza en batalla.</p>
          </div>
        </div>
        <!-- Power Up 2: Aumento de daño (Collar) -->
        <div class="power-up-card">
          <img :src="PowerUp2" alt="Imagen de Aumento de daño">
          <div class="power-up-description">
            <h4 class="power-up-name">Aumento de daño</h4>
            <p class="power-up-details">El Collar de Aumento de Daño fortalece los ataques del jugador, incrementando significativamente su poder ofensivo. Cada golpe se siente más contundente y devastador, lo que facilita derrotar a los enemigos más desafiantes.</p>
          </div>
        </div>
        <!-- Power Up 3: Aumento de velocidad (Poción) -->
        <div class="power-up-card">
          <img :src="PowerUp3" alt="Imagen de Aumento de velocidad">
          <div class="power-up-description">
            <h4 class="power-up-name">Aumento de velocidad</h4>
            <p class="power-up-details">La Poción de Aumento de Velocidad hace que el jugador se mueva a una velocidad sobrenatural, permitiéndole esquivar ataques con facilidad y explorar el mundo de Celestial con rapidez. Esta velocidad mejorada proporciona una ventaja táctica invaluable en combate.</p>
          </div>
        </div>
      </div>
    </div>

  <!-- Información de Niveles -->
    <div class="levels-info card">
      <h3>Niveles</h3>
      <div class="levels-container">
        <!-- Nivel 1: Ruinas -->
        <div class="level-card">
          <img :src="Nivel1" alt="Imagen de Ruinas">
          <div class="level-description">
            <h4 class="level-name">Nivel 1: Ruinas</h4>
            <p class="level-details"> Rowan se aventura en las antiguas ruinas de Celestial, donde los vestigios de una civilización olvidada yacen entre la maleza y la oscuridad. deberá recorrer diferentes caminos para hallar las preciadas monedas de oro. Sin embargo, no está sola; criaturas malignas acechan en las sombras, listas para defender sus dominios. Rowan deberá enfrentarse a enemigos feroces mientras busca el monumento antiguo donde activar las misteriosas runas.</p>
          </div>
        </div>
        <!-- Nivel 2: Cuevas -->
        <div class="level-card">
          <img :src="Nivel2" alt="Imagen de Cuevas">
          <div class="level-description">
            <h4 class="level-name">Nivel 2: Cuevas</h4>
            <p class="level-details"> En su búsqueda de más riquezas y poder, Rowan se adentra en las profundidades de las cuevas subterráneas de Celestial. Aquí, la oscuridad es aún más densa y los peligros más numerosos. infestado de monstruos que protegen celosamente sus tesoros. Con valentía y astucia, Rowan deberá sortear los desafíos cada vez más peligrosos para alcanzar el monumento sagrado y desentrañar los secretos de las ancestrales runas.</p>
          </div>
        </div>
      </div>
    </div>

        <!-- Contenedor para los videos -->
  <div class="video-container">
    <!-- Video horizontal -->
    <div class="video-section horizontal-video">
      <h3>Video</h3>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
    </div>

    <!-- Video vertical -->
    <div class="video-section vertical-video">
      <h3>Video</h3>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
    </div>

    <!-- Video vertical -->
    <div class="video-section vertical-video">
      <h3>Video</h3>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
    </div>

    <!-- Video horizontal -->
    <div class="video-section horizontal-video">
      <h3>Video</h3>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>

    <!-- Llamada a la acción para descargar el juego 
    <div class="cta">
      <button @click="descargarJuego">Descargar juego</button>
    </div>-->
  </div>
</template>

<script setup>
  import bannerImage from '@images/bannersCelestial/Banner_personaje.png'
  import bannerImage2 from '@images/bannersCelestial/Banner_Enemigos.png'

  import PersonajeP from '@images/Personajes/Bruja.png'
  import PersonajeG from '@images/Personajes/Gobling.png'
  import PersonajeB from '@images/Personajes/OjocielagoBoss.png'

  import Baston from '@images/Objetos/Bastonmagico.png'
  import Sombrero from '@images/Objetos/Sombrero.png'

  import PowerUp1 from '@images/PowerUp/Anillo.png'
  import PowerUp2 from '@images/PowerUp/Collar.png'
  import PowerUp3 from '@images/PowerUp/Pocion.png'

  import Nivel1 from '@images/Niveles/Ruina.png'
  import Nivel2 from '@images/Niveles/Cueva.png'



</script>

<script>
  export default {
    data() {
      return {
        bannerImage: bannerImage,
        PersonajeP: PersonajeP,
        bannerImage2: bannerImage2,
        PersonajeG: PersonajeG,
        PersonajeB: PersonajeB,
        Baston: Baston,
        Sombrero: Sombrero,
        PowerUp1: PowerUp1,
        PowerUp2: PowerUp2,
        PowerUp1: PowerUp3,
        Nivel1: Nivel1,
        Nivel2: Nivel2
      }
    },
    methods: {
      descargarJuego() {
        // Implementa la lógica para descargar el juego
      }
    }
  }
</script>

<style scoped>
/* Estilos específicos para la página de aterrizaje */
.landing-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-image: url(@images/bannersCelestial/pergamino);
  background-size: cover;
  background-position: center;
  color: #111;
  text-align: center; /* Centrar todo el contenido */
}

/* Estilos para la sección de objetos */
.objects-info {
  margin-bottom: 20px;
}

.objects-container {
  display: flex;
  justify-content: space-between;
}

.object-card {
  flex-basis: 45%; /* Para que cada tarjeta ocupe el 45% del contenedor */
  background-color: #ddd0c16b;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.object-card img {
  max-width: 200px;
  height: auto;
}

.object-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.object-details {
  font-size: 14px;
  line-height: 1.5;
}


/* Estilo de las tarjetas */
.card {
  background-color: #fff7ee6b;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  padding: 20px;
  margin-bottom: 20px;
}

.game-title {
  font-size: 36px; /* Tamaño grande para el título del juego */
  margin-bottom: 10px; /* Espaciado inferior */
}

.game-description {
  font-size: 18px; /* Tamaño de la descripción */
  line-height: 1.5; /* Espaciado entre líneas */
}

.banner img {
  max-width: 100%;
  display: block;
  margin-bottom: 20px;
}

.banner-ad img {
  max-width: 100%;
  display: block;
  margin-bottom: 20px;
}

.character-container img,
.enemy-container img {
  max-width: 100%;
  height: auto;
}

.goblin img {
  max-width: 25%; /* Ajusta el tamaño de la imagen del goblin según sea necesario */
  height: auto;
}

.game-info {
  margin-bottom: 20px;
}

.character-info, .enemies-info {
  margin-bottom: 20px;
}

.enemies-info ul {
  list-style-type: none;
  padding: 0;
}

.cta button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #c4965be0;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cta button:hover {
  background-color: #926a36;
}

/* Estilos para la sección de Power Ups */
.power-ups-info {
  margin-bottom: 20px;
}

.power-ups-container {
  display: flex;
  justify-content: space-between;
}

.power-up-card {
  flex-basis: 30%; /* Para que cada tarjeta ocupe el 30% del contenedor */
  background-color: #ddd0c16b;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.power-up-card img {
  max-width: 100px; /* Tamaño máximo de la imagen */
  height: auto;
}

.power-up-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.power-up-details {
  font-size: 14px;
  line-height: 1.5;
}

.levels-info {
  margin-bottom: 20px;
}

.levels-container {
  display: flex;
  justify-content: space-between;
}

.level-card {
  width: 45%; /* Ajusta el ancho de cada tarjeta de nivel */
  background-color: #ddd0c16b;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  padding: 20px;
}

.level-card img {
  max-width: 100%;
  display: block;
  margin-bottom: 10px;
}

.level-name {
  font-size: 20px;
  margin-bottom: 10px;
}

.level-details {
  font-size: 16px;
  line-height: 1.5;
}

/* Estilo para las secciones de video */
.video-section {
  background-color: #ddd0c16b;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  padding: 20px;
  margin-bottom: 20px; /* Espaciado entre secciones de video */
}

/* Ajuste de diseño para los videos */
.video-section iframe {
  width: 100%; /* Ancho completo */
  height: 315px; /* Altura fija */
  margin-bottom: 10px;
}

/* Distribución de los videos */
.video-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Estilo específico para videos horizontales */
.horizontal-video {
  flex: calc(50% - 10px); /* Ajuste del ancho */
  margin-bottom: 10px; /* Espaciado inferior */
  margin-right: 10px; /* Espaciado derecho */
}

/* Estilo específico para videos verticales */
.vertical-video {
  flex: calc(50% - 10px); /* Ajuste del ancho */
  margin-bottom: 10px; /* Espaciado inferior */
}

/* Estilo para separar los card en la segunda fila */
.card:nth-child(n+5) {
  margin-top: 20px; /* Espaciado superior */
}
</style>