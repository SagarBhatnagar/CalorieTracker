const ItemCtrl = (function(){
    
    const item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories
    }

    const data = {
        items: [{id:0, name:'Steak Dinner', calories:445},
        {id:0, name:'Cookies', calories:467},
        {id:0, name:'Ice Cream', calories:207}],
        currentItem: null, 
        totalCalories:0
    }
    //PUBLIC
    return {
        getItems: function(){
            return data.items
        },
        logData: function(){
            return data;
        } 
    }

})();



const UICtrl = (function(){
    const UISelectors ={
        itemList: '#item-list'
    }
    //PUBLIC
    return{
        populateItemList: function(items){
            let html = '';
            items.forEach(item => {
                html += `<li class="collection-item" is = "item-${item.id}"><span style="font-weight: bold;">${item.name}: </span><em>${item.calories} calories</em>
                <a href="" class = "secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`
            })

            //Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        }
    }
})();



const App = (function(ItemCtrl, UICtrl){
    
    
    
    //PUBLIC 
    return{
        init: function(){
            console.log('Initializing App...')
            //Fetch items
            const items = ItemCtrl.getItems();
            //Populate list 
            UICtrl.populateItemList(items);        
        
        }
    }
})(ItemCtrl, UICtrl);

App.init();
