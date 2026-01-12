// Оголошення об'єкта formData поза будь-якими функціями
const formData = {
  email: "",
  message: "",
};

// Отримуємо форму
const form = document.querySelector(".feedback-form");

// Функція для збереження даних у локальне сховище
function saveToLocalStorage() {
  localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}

// Функція для завантаження даних з локального сховища
function loadFromLocalStorage() {
  const savedData = localStorage.getItem("feedback-form-state");
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";
      
      // Заповнюємо поля форми
      if (form.elements.email) {
        form.elements.email.value = formData.email;
      }
      if (form.elements.message) {
        form.elements.message.value = formData.message;
      }
    } catch (error) {
      console.error("Помилка при завантаженні даних:", error);
    }
  }
}

// Завантажуємо дані при завантаженні сторінки
loadFromLocalStorage();

// Використовуємо метод делегування для відстеження змін у формі
form.addEventListener("input", (event) => {
  const { name, value } = event.target;
  
  // Перевіряємо, чи існує поле в formData
  if (formData.hasOwnProperty(name)) {
    // Видаляємо пробіли по краях
    formData[name] = value.trim();
    // Зберігаємо в локальне сховище
    saveToLocalStorage();
  }
});

// Обробка події submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Оновлюємо formData з поточних значень полів форми
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();
  
  // Перевірка, чи всі поля заповнені
  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }
  
  // Виводимо об'єкт у консоль
  console.log(formData);
  
  // Очищаємо локальне сховище
  localStorage.removeItem("feedback-form-state");
  
  // Очищаємо об'єкт formData
  formData.email = "";
  formData.message = "";
  
  // Очищаємо поля форми
  form.reset();
});

