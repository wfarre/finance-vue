import { ref } from "vue";

export const apiUrl = "http://localhost:3333";
const jsonPath = "../data/data.json";

export const deleteItem = async (path: string, id: number) => {
  try {
    const response = await fetch(`${apiUrl}${path}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Oops! Something went wrong!");
    }

    const result = await response.json();
    console.log("Item deleted successfully:", result);
    return result;
  } catch (err: any) {
    console.error("Error deleting item:", err.message);
    throw err;
  }
};

export const createItem = async (path: string, item: object) => {
  try {
    const response = await fetch(`${apiUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Oops! Something went wrong!");
    }

    const result = await response.json();
    console.log("Item deleted successfully:", result);
    return result;
  } catch (err: any) {
    console.error("Error deleting item:", err.message);
    throw err;
  }
};

export const updateItem = async (path: string, id: number, item: object) => {
  try {
    const response = await fetch(`${apiUrl}${path}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Oops! Something went wrong!");
    }

    const result = await response.json();
    console.log("Item deleted successfully:", result);
    return result;
  } catch (err: any) {
    console.error("Error deleting item:", err.message);
    throw err;
  }
};

// export const getItem = async (path: string, id: number) => {
//   try {
//     const response = await fetch(`${apiUrl}${path}/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Oops! Something went wrong!");
//     }

//     const result = await response.json();
//     console.log("Item deleted successfully:", result);
//     return result;
//   } catch (err: any) {
//     console.error("Error deleting item:", err.message);
//     throw err;
//   }
// };

// export const deleteItemJson = async (path: string, id: number) => {
//   try {
//     const response = await fetch(`${apiUrl}${path}/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Oops! Something went wrong!");
//     }

//     const result = await response.json();
//     console.log("Item deleted successfully:", result);
//     return result;
//   } catch (err: any) {
//     console.error("Error deleting item:", err.message);
//     throw err;
//   }
// };

// export const createItem = async (path: string, item: object) => {
//   try {
//     const response = await fetch(`${apiUrl}${path}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(item),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Oops! Something went wrong!");
//     }

//     const result = await response.json();
//     console.log("Item deleted successfully:", result);
//     return result;
//   } catch (err: any) {
//     console.error("Error deleting item:", err.message);
//     throw err;
//   }
// };

// export const updateItem = async (path: string, id: number, item: object) => {
//   try {
//     const response = await fetch(`${apiUrl}${path}/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(item),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Oops! Something went wrong!");
//     }

//     const result = await response.json();
//     console.log("Item deleted successfully:", result);
//     return result;
//   } catch (err: any) {
//     console.error("Error deleting item:", err.message);
//     throw err;
//   }
// };
