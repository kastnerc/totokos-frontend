<template>
  <div id="page-container">
    <main>
      <div class="bienvenue">
        <div>
          <h2>Explorez notre palette de saveurs dans notre</h2>
          <h1>Boulangerie artisanale</h1>
        </div>
      </div>

      <div class="produit_accueil">
        <h2>Nos produits les plus achetés</h2>
        <div class="produit" v-for="product in products" :key="product.name">
          <div class="responsive-image">
            <img :src="product.image" :alt="product.name" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
          </div>
          <div class="responsive-text">
            <h4>{{ product.name }}</h4>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>

      <div class="intro_info">
        <div class="intro_info2">
          <h2>Nos heures d'ouverture</h2>
          <ul>
            <li v-for="hour in hours" :key="hour.day">{{ hour.day }} : {{ hour.time }}</li>
          </ul>
          <p>
            Chez Les Tentations de Totoko, chaque miche de pain, chaque viennoiserie et chaque pâtisserie est
            préparée avec soin et dévotion, en utilisant des ingrédients de la plus haute qualité et
            des méthodes de fabrication artisanales transmises de génération en génération.
          </p>
          <p>
            Nous vous invitons à vous laisser séduire par nos délices fraîchement sortis du four, allant des
            pains rustiques aux croissants dorés, en passant par nos gâteaux exquis et nos desserts
            gourmands. Que vous soyez à la recherche d'un petit plaisir sucré pour accompagner votre café
            du matin ou d'une délicieuse fournée pour une occasion spéciale, Les Tentations de Totoko saura
            combler vos envies les plus gourmandes.
          </p>
        </div>

        <div class="carte">
          <h2>Notre emplacement</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11198.024034032962!2d-75.6268076!3d45.4394585!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0ff104b131ed%3A0x5045d05b7789c105!2zQ29sbMOoZ2UgTGEgQ2l0w6k!5e0!3m2!1sfr!2sca!4v1710124052989!5m2!1sfr!2sca" 
            width="300" height="450" allowfullscreen="" loading="lazy" title="Notre emplacement" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
  { name: 'Chocofolie', image: 'src/assets/Chocofolie.jpg', description: 'Plongez dans l\'univers de la Chocofolie avec notre gâteau éponyme. Chaque tranche est un voyage gustatif exaltant, où le chocolat règne en maître absolu. Ce gâteau irrésistible est une symphonie de textures et de saveurs, avec des couches de génoise chocolatée, une ganache onctueuse et des éclats de chocolat croquant pour une expérience sensorielle inégalée. Laissez-vous envoûter par cette folie chocolatée, parfaite pour satisfaire vos désirs sucrés les plus fous.' },
  { name: 'Jack blanc', image: 'src/assets/Jack blanc.jpg', description: 'Découvrez notre pain Jack Blanc, une expérience de boulangerie qui vous transportera dans un monde de saveurs délicates et de texture exquise. Chaque tranche révèle un équilibre parfait entre la douceur de la mie et la légère croustillance de la croûte, créant une harmonie en bouche incomparable. Confectionné avec soin à partir des meilleurs ingrédients, ce pain est un hommage à la tradition et au savoir-faire artisanal.' },
  { name: 'Croissant aux amandes', image: 'src/assets/Croissant aux amandes.jpg', description: 'Dégustez notre délicieux croissant aux amandes, une collation exquise qui allie la légèreté du croissant feuilleté à la richesse des amandes caramélisées. Chaque bouchée est une symphonie de textures, avec des couches croustillantes de pâte feuilletée enveloppant un cœur fondant et généreusement garni d\'une crème d\'amande onctueuse. Laissez-vous séduire par l\'arôme envoûtant des amandes grillées et le délice sucré qui se fond dans votre palais à chaque instant. Parfait pour accompagner votre pause-café ou pour une indulgence gourmande à tout moment de la journée.' }
]);

const hours = ref([
  { day: 'Lundi', time: '8h-18h' },
  { day: 'Mardi', time: '8h-18h' },
  { day: 'Mercredi', time: '8h-18h' },
  { day: 'Jeudi', time: '8h-18h' },
  { day: 'Vendredi', time: '8h-18h' },
  { day: 'Samedi', time: '10h-17h' },
  { day: 'Dimanche', time: '10h-17h' }
]);

function handleMouseOver(event) {
  event.target.style.transform = 'translateX(-10px) scale(1.1)';
  event.target.style.transition = 'transform 0.5s ease-in-out';
}

function handleMouseOut(event) {
  event.target.style.transform = 'translateX(0px) scale(1)';
  event.target.style.transition = 'transform 0.5s ease-in-out';
}
</script>

<style scoped>
/* Importation des polices Google */
@import url('https://fonts.googleapis.com/css2?family=Cookie:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Réinitialisation des styles par défaut */
html, body {
    font-size: 14px;
    font-family: sans-serif;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.carte {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
}

/* Section bienvenue */
.bienvenue {
    font-family: Cookie;
    text-align: center;
    color: rgb(241, 232, 217);
    padding: 10px;
    font-size: 30px;
    height: 500px;
    width: 100%;
    background-size: cover;
    background-image: url(https://img.freepik.com/free-photo/flat-lay-types-bread-black-copy-space-background_23-2148432256.jpg?w=1800&t=st=1710112744~exp=1710113344~hmac=73c7ae37e7501f824b0de4e71ec7ea2963c8378a750e19d41cca1a723ad7a613);
}

.bienvenue h1 {
    transition: transform 0.5s ease;
}

.bienvenue h1:hover {
    transform: scale(1.1);
}

div.bienvenue{
    width: 100%;
    animation: fadeIn 2s;
}

div.bienvenue div {
    border: 0.125em solid;
    border-color: rgb(241, 232, 217);
    background-color: #f1f1f12f;
    display: inline-block;
    padding: 10px;
}

/* Conteneur de la page et enveloppe du contenu */
#page-container {
    position: relative;
    min-height: 100vh;
}

/* Section produits */
.produit_accueil {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 10px;
}

.produit_accueil img {
    border: 3px solid;
    border-radius: 3%;
    border-color: rgb(39, 26, 2);
}

.produit_accueil > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
}

.produit_accueil img, .intro_info img {
    margin-bottom: 5px;
}

.produit_accueil p{
    background-color: rgba(241, 230, 195, 0.78);
    font-size: 20px;
    text-align: left;
    padding: 10px;
    border-radius: 5%;
    display: inline;
    margin-top: 10px;
    margin-bottom: 0;
}

.produit_accueil > h2 {
    font-family: Cookie;
    font-size: 40px;
    color: rgb(26, 17, 0);
    background-color: rgba(241, 230, 195, 0.678);
    padding: 10px;
    border-radius: 5%;
    display: inline;
}


.produit_accueil h4 {
    font-family: Cookie;
    font-size: 40px;
    color: rgb(26, 17, 0);
    text-align: left;
    background-color: rgb(241, 230, 195);
    padding: 10px;
    border-radius: 5%;
    display: inline;
    margin-top: 10px;
    margin-bottom: 0;
}

/* Informations sur la compagnie */
.intro_info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background-image: url(https://laboulangeriedemarie.com/wp-content/uploads/2019/12/image-patisserie-tartelette_la-boulangerie-de-marie.jpg);
    background-size: cover;
    width: 100%;
}

.intro_info div {
    flex: 1 1 45%;
    align-items: center;
    text-align: center;
    padding-top: 3%;
}

.intro_info h2 {
    font-family: Cookie;
    font-size: 40px;
    color: rgb(26, 17, 0);
    background-color: rgba(241, 230, 195, 0.678);
    padding: 10px;
    border-radius: 5%;
    display: inline;
}

.intro_info li {
    text-align: left;
    font-family: Cookie;
    font-size: 20px;
    font-weight: 700;
    color: rgb(26, 17, 0);
    padding: 5px;
    padding-left: 35%;
    list-style-position: inside;
}

.intro_info ul {
    background-color: rgba(241, 230, 195, 0.78);
    border-radius: 5%;
    margin-left: 20px;
    margin-top: 20px;
}

.intro_info iframe {
    margin-bottom: 50px;
}

.intro_info p {
    background-color: rgba(241, 230, 195, 0.78);
    border-radius: 5%;
    margin-left: 20px;
    margin-top: 20px;
    text-align: left;
    font-family: Cookie;
    font-size: 30px;
    color: rgb(26, 17, 0);
    padding: 5px;
    font-weight: 700;
}

/* Réactivité */
@media (max-width: 768px) {
    .produit_accueil, .intro_info {
        flex-direction: column;
    }

    .produit_accueil > div, .intro_info div {
        flex-basis: 100%;
        flex-direction: column;
    }
}

.responsive-text, .responsive-image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 10px;
    margin: 0 20px;
}

div.responsive-image img {
    max-width:300px; 
    max-height:300px;
}

/* Ajustements pour les médias plus petits */
@media (max-width: 1020px) {
    .responsive-text, .responsive-image {
        font-size: 18px;
        padding: 10px;
        margin: 0 20px;
    }
}

@media (max-width: 800px) {
    .responsive-text, .responsive-image {
        font-size: 16px;
        padding: 8px;
        margin: 0 15px;
    }
}

@media (max-width: 480px) {
    .responsive-text, .responsive-image {
        font-size: 14px;
        padding: 5px;
        margin: 0 10px;
    }
}

@media (max-width: 280px) {
    .responsive-text, .responsive-image {
        font-size: 5px;
        padding: 5px;
        margin: 0 5px;
    }
}
</style>
