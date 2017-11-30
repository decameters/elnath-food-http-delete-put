var app = angular.module('RestaurantApp', []);

app.controller('FoodController', ['$http', function ($http){
    console.log('FoodController has been loaded');
    var self = this;
    self.message = 'Howdy!';
    self.foodArray = []
    // this might be redundent with the newest Angular
    // sets empty array

    self.newFood = {is_hot: false}; // sets the default to false on the is_hot
    // and it creates the object for entering the new food

    self.getFood = function(){
        $http({
            method: 'GET',
            url: '/food'
        }).then(function(response){
            console.log('response', response.data); // one of the responses propterites is DATA
            self.foodArray = response.data // foodArray could be anything
            // this just gets the data back
        })
    }; // not a function declaration, its a function expression

    self.getFood();

    self.addNewFood = function(newFood){
        $http({
            method: 'POST',
            url: '/food',
            data: newFood // because you just passed that into the function
        }).then(function(response){
            console.log('response', response);
            self.newFood = {is_hot: false};
            // can't reset by VALUE have to reset by REFERENCE
            self.getFood();
        })
    }

    self.deleteFood = function(foodToDelete){
        $http({
            method: 'DELETE',
            url: '/food/' + foodToDelete.id
        }).then(function(response){
            console.log('response', response);
            self.getFood();
        });
    };

    self.editFood = function(foodToEdit){
        $http({
            method: 'PUT',
            url: '/food',
            data: foodToEdit
        }).then(function(response){
            console.log('response', response);
            self.getFood();
        });
    };

    

    // self.deleteFood = function(foodID){
    //     console.log('delete id clicked is', foodID);
        
    //     $http({
    //         method: 'DELETE',
    //         url: '/food/' + foodID,
    //     }).then(function(response){
    //         self.getFood();
    //     })
    // }

    // self.changeFood = function(foodID){
    //     console.log('change food id clicked is,', foodID);
        
    //     $http({
    //         method: 'PUT',
    //         url: '/food/' + foodID
    //     }).then(function(response){
    //         self.getFood();
    //     })
    // }

}]);