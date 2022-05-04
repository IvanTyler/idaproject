console.log('js work')

const $newProductForm = document.forms.newProductForm;
const $nameProduct = document.querySelector('#nameProduct')
const $linkProduct = document.querySelector('#linkProduct')
const $priceProduct = document.querySelector('#priceProduct')
const $aboutProductList = document.querySelector('.about-products-list')

function getDataProducts() {
    let max = 999999999;
    let min = 100000000;
    return Array.from(Array(10)).map((el, i) => {
        return {
            id: Math.floor(Math.random() * (max - min) + min),
            imgSrc: 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg',
            name: `Наименование товара ${i + 1}`,
            description: `Довольно-таки интересное описание товара в несколько строк. ${i + 1}`,
            price: `${(i + 1) * 10000}`,
        }
    })
}

function createDataProductsListHTML(dataProduct) {
    return dataProduct.map(el => {
        return `
        <li class="about-products-list__item" data-id="${el.id}">
            <button data-delete class="delete-product"></button>
            <div class="wrapper-product-img">
                <img src="${el.imgSrc}" alt="${el.name}" class="wrapper-product-img__img">
            </div>
            <div class="about-products-list__description">
                <h3 class="about-product-title">${el.name}</h3>
                <div class="about-product-text">
                    ${el.description}
                </div>
                <div class="about-product-price">${el.price} руб.</div>
            </div>
        </li>
        `
    }).join('');
}

function addDataPostProductHTML(dataProduct) {
    return `
    <li class="about-products-list__item" data-id="${dataProduct.id}">
        <button data-delete class="delete-product"></button>
        <div class="wrapper-product-img">
            <img src="${dataProduct.imgSrc}" alt="${dataProduct.name}" class="wrapper-product-img__img">
        </div>
        <div class="about-products-list__description">
            <h3 class="about-product-title">${dataProduct.name}</h3>
            <div class="about-product-text">
                ${dataProduct.description}
            </div>
            <div class="about-product-price">${dataProduct.price} руб.</div>
        </div>
    </li>
    `
}

function addDataProductHTML() {
    const productList = getDataProducts()
    const DataProductListHTML = createDataProductsListHTML(productList);
    if (productList.length) $aboutProductList.classList.add('preloader')
    setTimeout(() => {
        $aboutProductList.classList.remove('preloader')
        $aboutProductList.insertAdjacentHTML('afterbegin', DataProductListHTML)
    }, 3000)
}
addDataProductHTML()

$newProductForm?.addEventListener('input', (event) => {
    if (event.target.classList.contains('necessarily')) {
        const lengthStringNameProduct = $nameProduct.value.trim().length
        const lengthStringlinkProduct = $linkProduct.value.trim().length
        const lengthStringpriceProduct = $priceProduct.value.trim().length
        if ((lengthStringNameProduct >= 1) && (lengthStringlinkProduct >= 1) && (lengthStringpriceProduct >= 1)) {
            document.querySelector('.form-adding-products__add-product').classList.add('active')
        } else {
            document.querySelector('.form-adding-products__add-product').classList.remove('active')
        }
    }
})

$newProductForm?.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    if (!$nameProduct.value) {
        $nameProduct.classList.add('error')
        document.querySelector('.error-message.nameProduct').style.opacity = '1'
    }
    if (!$linkProduct.value) {
        $linkProduct.classList.add('error')
        document.querySelector('.error-message.linkProduct').style.opacity = '1'
    }
    if (!$priceProduct.value) {
        $priceProduct.classList.add('error')
        document.querySelector('.error-message.priceProduct').style.opacity = '1'
    }

    if (($nameProduct.value) && ($linkProduct.value) && ($priceProduct.value)) {
        document.querySelector('.form-adding-products__add-product').classList.remove('active')
        $nameProduct.classList.remove('error')
        $newProductForm.reset();
        console.log(formData)
        const post = {
            id: Date.now(),
            imgSrc: formData.linkProduct,
            name: formData.nameProduct,
            description: formData.productDescription,
            price: formData.priceProduct,
        }
        const dataPostProductHTML = addDataPostProductHTML(post)
        $aboutProductList.insertAdjacentHTML('afterbegin', dataPostProductHTML)
    }
})

$nameProduct.addEventListener('focus', () => {
    if ($nameProduct.value !== ' ') {
        $nameProduct.classList.remove('error')
        document.querySelector('.error-message.nameProduct').style.opacity = '0'
    }
})
$linkProduct.addEventListener('focus', () => {
    if ($linkProduct.value !== ' ') {
        $linkProduct.classList.remove('error')
        document.querySelector('.error-message.linkProduct').style.opacity = '0'
    }
})
$priceProduct.addEventListener('focus', () => {
    if ($priceProduct.value !== ' ') {
        $priceProduct.classList.remove('error')
        document.querySelector('.error-message.priceProduct').style.opacity = '0'
    }
})

$aboutProductList?.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-delete')) {
        const $currentPost = event.target.closest('[data-id]')
        const postId = $currentPost.dataset.id
        
        if (postId) {
            $currentPost.remove()
        }
    }
})