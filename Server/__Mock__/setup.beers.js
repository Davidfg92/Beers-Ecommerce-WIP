import mongoConnect from '../Config/connect.js';
import Beer from '../Models/beer.model.js';

const beers = [
  {
    name: 'Tripel Karmeliet',
    origin: 'Bélgica',
    description:
      'Cerveza de estilo Belgian Tripel con 8.4% ABV. De color amarillo oro, contiene tres cereales: cebada, avena y trigo. El aroma complejo herbáceo y especiado, cítrico, albaricoque, y notas de especias (clavo). El sabor es herbáceo, especiado y cremoso.',
    style: 'Tripel',
    alcoholContent: 8.4,
    fermentationType: 'Ale (Alta fermentación)',
    color: 'Amarillo pálido',
    malts: ['Cebada', 'Avena', 'Trigo'],
    hops: ['Styrian'],
    ibu: 16,
    website: 'http://www.tripelkarmeliet.com',
    image:
      'https://www.labirratorium.com/81-large_default/tripel-karmeliet33.jpg',
    price: 2.5,
    stock: 17,
  },
  {
    name: 'Lindemans Framboise',
    origin: 'Bélgica',
    description:
      'Cerveza de fermentación espontánea y con frambuesa añadida. De color rojizo, aroma a frambuesa y en boca dulce con un ligero toque asidrado.',
    style: 'Framboise',
    alcoholContent: 2.5,
    fermentationType: 'Lambic (Fermentación espontánea o salvaje)',
    color: 'rosa',
    malts: ['Cebada', 'Trigo'],
    hops: [],
    ibu: 12,
    website: 'http://www.lindemans.be',
    image:
      'https://www.labirratorium.com/62-large_default/lindemans-framboise.jpg',
    price: 3.5,
    stock: 13,
  },
  {
    name: 'Península Golden Lager',
    origin: 'España',
    description:
      'Clásica Lager con cuerpo y carácter, fermentada y madurada durante el tiempo suficiente para extraer lo mejor de sus materias primas. Perfecta para cualquier lugar, desde tu casa al Gran Cañón del Colorado.',
    style: 'Lager',
    alcoholContent: 4.6,
    fermentationType: 'Lager (Baja fermentación)',
    color: 'Amarillo dorado',
    malts: ['Pilsner', 'Vienna', 'Munich', 'Dextrin', 'Melanoidin'],
    hops: ['Magnum', 'Hallertau Mittelfruh'],
    ibu: 30,
    website: 'http://www.cervecerapeninsula.com',
    image:
      'https://www.labirratorium.com/12304-large_default/peninsula-golden-lager-.jpg',
    price: 5.0,
    stock: 0,
  },
  {
    name: 'Peninsula Hop On',
    origin: 'España',
    description:
      'American Pale Ale de 5.5% ABV. Clásica, elaborada con lúpulos de la Costa Oeste (Cascade y Crystal) que brindan tonos cítricos y a pino. Cerveza cobriza y amarga sobre una base maltosa. ¡¡Para beber a cubos!!',
    style: 'APA',
    alcoholContent: 5.5,
    fermentationType: 'Alta (Alta fermentación)',
    color: 'Amarillo dorado',
    malts: ['Best Pale Ale', 'T50', 'Dextrine', 'English CaraMalt'],
    hops: ['Cascade', 'Crystal'],
    ibu: 40,
    website: 'http://www.cervecerapeninsula.com',
    image:
      'https://www.labirratorium.com/22890-large_default/peninsula-hop-on.jpg',
    price: 4.0,
    stock: 8,
  },
  {
    name: 'Peninsula Galactic Sunset',
    origin: 'España',
    description:
      'Doble IPA de 8% ABV elaborada con lúpulos Galaxy, Citra, Cascade y Simcoe, que junto a la malta Maris Otter hacen de esta DIPA el acompañante perfecto para tomar solo o en compañía.',
    style: 'Double IPA',
    alcoholContent: 4.6,
    fermentationType: 'Lager (Baja fermentación)',
    color: 'Amarillo dorado',
    malts: 'Maris Otter',
    hops: ['Galaxy', 'Citra', 'Cascade', 'Simcoe'],
    ibu: 65,
    website: 'http://www.cervecerapeninsula.com',
    image:
      'https://www.labirratorium.com/17629-large_default/peninsul-galactic-sunset.jpg',
    price: 3.9,
    stock: 20,
  },
  {
    name: 'kwak',
    origin: 'Bélgica',
    description:
      'Cerveza belga de 8.4% ABV de color cobrizo y burbuja muy fina. Rica de sabores, destacan los aromas a cereales, fruta, fondo floral y ligeros tostados.',
    style: 'ALE',
    alcoholContent: 8.4,
    fermentationType: 'Ale (Alta fermentación)',
    color: 'Ámbar',
    malts: ['Cebada'],
    hops: [],
    ibu: 20,
    website: 'http://www.bosteelsbrewery.com/',
    image: 'https://www.labirratorium.com/740-large_default/kwak-33cl.jpg',
    price: 2.5,
    stock: 0,
  },
];

mongoConnect();
Beer.deleteMany({});
Beer.create(beers);
