<!-- <template>
    <div class="items-page">
      <h1>Manage Items</h1>
      
      <CreateItem @itemCreated="fetchItems" />
  
      
      <ItemList
        :items="items"
        @updateItem="updateItem"
        @deleteItem="deleteItem"
      />
    </div>
  </template>
  
  <script>
  import CreateItem from "@/components/items/CreateItem.vue";
  import ItemList from "@/components/items/ItemList.vue";
  
  export default {
    data() {
      return {
        items: [], 
      };
    },
    components: {
      CreateItem,
      ItemList,
    },
    methods: {
      fetchItems() {
       
        fetch("https://api.example.com/items")
          .then((res) => res.json())
          .then((data) => {
            this.items = data;
          });
      },
      updateItem(item) {
      
        console.log("Update item:", item);
      },
      deleteItem(itemId) {
       
        this.items = this.items.filter((item) => item.id !== itemId);
      },
    },
    mounted() {
      this.fetchItems();
    },
  };
  </script>
   -->

   <template>
    <div class="items-page">
      <h1>Manage Items</h1>
  
      <!-- Create Item Component -->
      <CreateItem @itemCreated="fetchItems" :categories="categories" :userId="parseInt(userId)"/>
  
      <!-- Item List Component -->
      <ItemList
        :items="items"
        :categories="categories"
        @editItem="selectItemForEdit"
        @deleteItem="handleDeleteItem"
      />
  
      <!-- Edit Item Component -->
      <EditItem
        v-if="selectedItem"
        :item="selectedItem"
        :categories="categories"
        @itemUpdated="fetchItems"
        @closeEdit="clearSelectedItem"
      />
    </div>
  </template>
  
  <script>
  import ItemList from "@/components/itemsController/ItemList.vue";
  import EditItem from "@/components/itemsController/EditItem.vue";
  import CreateItem from "@/components/itemsController/CreateItem.vue";
  
  export default {
    data() {
      return {
        items: [],
        categories: [],
        selectedItem: null,
        userId: 16
      };
    },
    components: {
      ItemList,
      EditItem,
      CreateItem,
    },
    methods: {
      async fetchItems() {
        try {
          const response = await fetch(
            "https://full-stack-pomo.onrender.com/items",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          this.items = await response.json();
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      },
      async fetchCategories() {
        try {
          const response = await fetch(
            "https://full-stack-pomo.onrender.com/category",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          this.categories = await response.json();
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
      async handleDeleteItem(itemId) {
        try {
          await fetch(`https://full-stack-pomo.onrender.com/items/delete/${itemId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          this.fetchItems();
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      },
      
      selectItemForEdit(item) {
        this.selectedItem = item;
      },
      clearSelectedItem() {
        this.selectedItem = null;
      },
   
    },
    mounted() {
      this.fetchItems();
      this.fetchCategories();
    },
  };
  </script>
  