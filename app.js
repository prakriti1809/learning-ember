var App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

App.Product = DS.Model.extend({
    title: DS.attr('string'),
    price: DS.attr('number'),
    description: DS.attr('string'),
    isOnSale: DS.attr('boolean'),
    image: DS.attr('string'),
    reviews: DS.hasMany('review', {async: true})
});

App.Review = DS.Model.extend({
    text: DS.attr('string'),
    reviewedAt: DS.attr('date'),
    product: DS.belongsTo('product')
});

App.Product.FIXTURES = [
    {
        id: 1,
        title: 'Flint',
        price: 99,
        description: 'Flint is...',
        isOnSale: true,
        image: 'flint.png',
        reviews: [100, 101]
    },
    {
        id: 1,
        title: 'Birch Bark Shaving',
        price: 99,
        description: 'Birch Bark Shaving is...',
        isOnSale: true,
        image: 'bark.png',
        reviews: [100, 101]
    },
    {
        id: 1,
        title: 'Matchstick',
        price: 99,
        description: 'Matchstick is...',
        isOnSale: false,
        image: 'matchstick.png',
        reviews: [100, 101]
    },
    {
        id: 1,
        title: 'Stone',
        price: 99,
        description: 'Early man',
        isOnSale: false,
        image: 'stone.png',
        reviews: [100, 101]
    },
    {
        id: 1,
        title: 'Tinder',
        price: 99,
        description: 'Tinder is...',
        isOnSale: true,
        image: 'tinder.png',
        reviews: [100, 101]
    },
    {
        id: 2,
        title: 'Kindling',
        price: 249,
        description: 'Easily...',
        isOnSale: false,
        image: 'kindling.png'
    }
];

App.Review.FIXTURES = [
    {
        id: 100,
        product: 1,
        text: 'Started a fire in no time!'
    },
    {
        id: 101,
        product: 1,
        text: 'Not the brightest flame, but warm!'
    }
];

// App.ApplicationAdapter = DS.RESTAdapter.extend();
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function () {
    this.route('about', {
        path: '/aboutus'
    });

    this.resource('products', function () {
        this.resource('product', {path: '/:product_id'});
        this.route('onsale');
    });
});

// App.ProductsController = Ember.ArrayController.extend({
//     sortProperties: ['title']
// });

App.IndexController = Ember.ArrayController.extend({
    productsCount: Ember.computed.alias('length'),
    logo: 'images/logo.jpeg',
    time: function () {
        return (new Date()).toDateString()
    }.property(),
    onSale: function () {
        return this.filter(function (product) {
                return product.get('isOnSale');
            }).slice(0, 3);

        // return this.filterBy('isOnSale', true).slice(0, 3);
    }.property('@each.isOnSale')
});

App.ProductsRoute = Ember.Route.extend({
    model: function () {
        // return App.PRODUCTS;
        return this.store.findAll('product');
    }
});

App.ProductRoute = Ember.Route.extend({
    model: function (params) {
        // return App.PRODUCTS.findBy('title', params.title);
        return this.store.find('product', params.product_id);
    }
});

App.ProductsOnsaleRoute = Ember.Route.extend({
   model: function() {
       return this.modelFor('products').filterBy('isOnSale');
   }
});