const ItemCtrl = (function(){
    
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories
    }

    const data = {
        items: [
        // {id:0, name:'Steak Dinner', calories:445},
        // {id:1, name:'Cookies', calories:467},
        // {id:2, name:'Ice Cream', calories:207}
        ],
        currentItem: null, 
        totalCalories:0
    }
    //PUBLIC
    return {
        getItems: function(){
            return data.items
        },
        addItem: function(name, calories){
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            }
            else{
                ID = 0
            }
            const calorie = parseInt(calories);

            newItem = new Item(ID, name, calorie);
            data.items.push(newItem);
            return newItem;
        },
        getTotalCalories: function(){
            let total = 0;
            data.items.forEach(item => {
                total += item.calories;
            });
            data.totalCalories = total;

            return data.totalCalories;
        },
        getItemById:  function(id){
            let found =0;
            data.items.forEach(item => {
                if(item.id === id)
                    found = item;
            })
            return found;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },

        logData: function(){
            return data;
        } 
    }

})();



const UICtrl = (function(){
    const UISelectors ={
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn:'.update-btn',
        deleteBtn:'.delete-btn',
        backBtn:'.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }
    //PUBLIC
    return{
        populateItemList: function(items){
            let html = '';
            items.forEach(item => {
                html += `<li class="collection-item" id = "item-${item.id}"><span style="font-weight: bold;">${item.name}: </span><em>${item.calories} calories</em>
                <a href="" class = "secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`
            })

            //Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getSelectors: function(){
            return UISelectors;
        },
        
        getItemInput: function(){
            return{
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            document.querySelector(UISelectors.itemList).style.display = 'block'
            const li  = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `<span style="font-weight: bold;">${item.name}: </span><em>${item.calories} calories</em>
            <a href="" class = "secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
       
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
            // console.log(`Total ${totalCalories} calories`)
        },
        
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput) = '';
            document.querySelector(UISelectors.itemCaloriesInput) = '';
        },
        clearEditState: function(){
            // UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        
        },

        showEditState: function(){
            // UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        
        
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none'
        }

    }
})();



const App = (function(ItemCtrl, UICtrl){
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubimit);
    }   
    const itemAddSubmit = function(e){
        // get form input from UI
        const input = UICtrl.getItemInput();
        if(input.name !== '' && input.calories != ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            UICtrl.addListItem(newItem);
            
            const totalCalories = ItemCtrl.getTotalCalories();
            //add to UI
            UICtrl.showTotalCalories(totalCalories);
        }
        e.preventDefault();
    }
    
    const itemUpdateSubimit = function(e){
        if(e.target.classList.contains('edit-item')){
            const listId = e.target.parentNode.parentNode.id;
            const listIdArr = listId.split('-');
            const id = parseInt(listIdArr[1]);
            const itemToEdit = ItemCtrl.getItemById(id);
            ItemCtrl.setCurrentItem(itemToEdit);
            
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    }
    //PUBLIC 
    return{
        init: function(){
            console.log('Initializing App...')
            //clear edit state
            UICtrl.clearEditState();
            // UICtrl.clearInput();
            //Fetch items            
            const items = ItemCtrl.getItems();
            if(items.length === 0){
                UICtrl.hideList();
            }
            else{            
            //Populate list 
            UICtrl.populateItemList(items);}        
            const totalCalories = ItemCtrl.getTotalCalories();
            //add to UI
            loadEventListeners();
            UICtrl.showTotalCalories(totalCalories);

        }
    }
})(ItemCtrl, UICtrl);

App.init();
