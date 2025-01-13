<!-- <template>
    <form @submit.prevent="handleCreateItem" class="container-md p-4 mt-4 border border-black">
     
      <div class="mb-3">
        <label for="itemName" class="form-label">Item Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="itemName"
          placeholder="Enter item name"
          required
        />
      </div>
  
      
      <div class="mb-3">
        <label for="itemDescription" class="form-label">Item Description</label>
        <textarea
          v-model="description"
          class="form-control"
          id="itemDescription"
          placeholder="Enter item description"
        ></textarea>
      </div>
  
      
      <button type="submit" class="btn btn-primary w-100">Create Item</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        description: "",
      };
    },
    methods: {
      async handleCreateItem() {
        try {
          const response = await fetch("https://api.example.com/items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.name,
              description: this.description,
            }),
          });
  
          if (response.ok) {
            this.$emit("itemCreated");
            this.name = "";
            this.description = "";
          } else {
            console.error("Failed to create item.");
          }
        } catch (error) {
          console.error("Error creating item:", error);
        }
      },
    },
  };
  </script>
   -->



   <template>
    <div>
      
      <form @submit.prevent="handleCreateItem" class="container-md p-4 mt-4 border border-black">
        <div class="mb-3">
          <label for="itemName" class="form-label">Item Title</label>
          <input v-model="title" type="text" class="form-control" id="title" placeholder="Enter item title" required />
        </div>
        <div class="mb-3">
          <label for="itemDescription" class="form-label">Item Description</label>
          <textarea
            v-model="itemDescription"
            class="form-control"
            id="itemDescription"
            placeholder="Enter item description (optional)"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input v-model="price" type="number" class="form-control" id="price" placeholder="Enter item price" required min="0" step="0.01" />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Upload Image</label>
          <input type="file" class="form-control" id="image" @change="handleImageUpload" accept="image/*" />
        </div>
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity</label>
          <input v-model="quantity" type="number" class="form-control" id="quantity" placeholder="Enter item quantity" required min="1" />
        </div>
        <div class="mb-3">
        <label for="itemCategory" class="form-label">Category</label>
        <select
          v-model="categoryId"
          id="itemCategory"
          class="form-control"
          required
        >
          <option value="">Select Category</option>
          <!-- Added this to prompt the user -->
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
        <button type="submit" class="btn btn-primary w-100">Create Item</button>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "CreateItem",
    props: {
    userId: {
      type: Number,
      required: true
    },categories: {
    type: Array,
    required: true,
  },
  },
    data() {
      return {
        user: {},
        title: "",
        itemDescription: "",
        price: 0,
        imageFile: null,
        imageUrl: "",
        quantity: 0,
        categoryId: 0,
      };
    },
    methods: {
    
      async handleCreateItem() {
        const userId =  parseInt(localStorage.getItem('userId'));
        console.log(userId)
        if (!userId) {
        console.error("Användar ID krävs för att skapa ett item.");
        return;
      }
        try {
          const requestBody = {
            title: this.title,
            itemDescription: this.itemDescription || undefined,
            price: this.price,
            imageUrl: this.imageUrl || null,
            quantity: this.quantity,
            categoryId: this.categoryId,
            userId: userId,
          };
  
          const response = await fetch("https://full-stack-pomo.onrender.com/items/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(requestBody),
          });
  
          if (response.ok) {
            this.$emit("itemCreated");
            this.resetForm();
          } else {
            const errorMessage = await response.json();
            console.error("Det gick inte att skapa item:", errorMessage.message || "Unknown error");
          }
        } catch (error) {
          console.error("Det gick inte att skapa item:", error);
        }
      },
      resetForm() {
        this.title = "";
        this.itemDescription = "";
        this.price = 0;
        this.imageUrl = "";
        this.quantity = 0;
        this.categoryId = 0;
      },
    },
  };
  </script>
  