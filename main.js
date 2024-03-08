//html elementlerini seç
const form = document.querySelector(".grocery-form")
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

//düzenleme seçenekleri
let editFlag = false; //düzenleme modunda olup olmadığını belirtir
let editElement;
let editID = ""; //düzenleme yapılan öğenin benzersiz kimliği


//!olay izleyicileri
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

//fonksiyonlar
function displayAlert(text,action) {
    console.log(text,action);
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(()=>{
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`);
    }, 2000)
}
function addItem(e) {
e.preventDefault(); //formun otomatik gönderilmesini engeller
const value = grocery.value; //formdaki inputun giriş değerini alma
const id = new Date().getTime().toString(); //benzersiz id oluşturduk

//eğer değer boş değilse ve düzenleme modunda değilse
if(value !== "" && !editFlag){
const element = document.createElement("article"); //yeni article öğesi oluşturur
let attr = document.createAttribute("data-id"); //yeni veri kimliği oluşturur
attr.value = id;
element.setAttributeNode(attr); //oluşturduğummuz id yi elemente ekledik
element.classList.add("grocery-item"); //oluşturduğummuz elemente class ekledik
element.innerHTML = `
                    <p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button type="button" class="delete-btn">
                            <i class="fa-solid fa-trash"></i>
                        </button> 
                    </div>
`;
const deleteBtn = element.querySelector(".delete-btn");
deleteBtn.addEventListener("click", deleteItem);
const editBtn = element.querySelector(".edit-btn");
editBtn.addEventListener("click", editItem);

// kapsayıcıya ekleme yapma 
list.appendChild(element);
displayAlert("Başarıyla Eklendi", "succes");
container.classList.add("show-container");
//içerik kısmını sıfırlama
grocery.value = "";
}else if(value !== "" && editFlag){
    editElement.innerHTML = value;
    displayAlert("Değer değiştirildi", "succes");
  console.log(editElement.innerHTML);
}else{
}
}

//silme fonksiyonu
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    console.log(element);
    const id = element.dataset.id;
    list.removeChild(element);
  
    displayAlert("Öğe Kaldırıldı", "danger");
  }

  function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach((item) => list.removeChild(item));
    } 
    container.classList.remove("show-container");
    displayAlert("Liste Boş","danger");
  }

//düzenleme fonksiyonu
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    //düzenleme yapılan öğeyi seç
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement);
    //form içinde bulunan inputun değerini öğenin metniyle doldur
    grocery.value = editElement.innerHTML;

    editFlag = true;
    editID = element.dataset.id; //düzenlenen öğenin kimliği
    submitBtn.textContent = "Düzenle";

} 