const $newProductForm = document.forms.newProductForm;

const $nameProduct = document.querySelector('#nameProduct')
const $linkProduct = document.querySelector('#linkProduct')
const $priceProduct = document.querySelector('#priceProduct')
const $aboutProductList = document.querySelector('.about-products-list')
const $aboutProductListItem = document.querySelectorAll('.about-products-list__item')

const $sortMaxPrice = document.querySelector('.sortMaxPrice')
const $sortMinPrice = document.querySelector('.sortMinPrice')
const $sortNames = document.querySelector('.sortNames')
const $sortProduct = document.querySelector('.sort-product')
const $productWithdrawal = document.querySelector('.product-withdrawal')

$sortProduct?.addEventListener('click', () => {
    if ($productWithdrawal.classList.contains('show')) {
        $productWithdrawal.classList.remove('show')
    } else {
        $productWithdrawal.classList.add('show')
    }
})

function getDataProducts() {
    let max = 999999999;
    let min = 100000000;
    return Array.from(Array(10)).map((el, i) => {
        return {
            id: Math.floor(Math.random() * (max - min) + min),
            imgSrc: '../img/img-product.png',
            name: `Наименование товара ${i + 1}`,
            description: `Довольно-таки интересное описание товара в несколько строк. ${i + 1}`,
            price: (i + 1) * 10000,
        }
    })
}
let productsList = getDataProducts()

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
                <div class="about-product-price">${el.price.toLocaleString()} руб.</div>
            </div>
        </li>
        `
    }).join('');
}

function addDataProductHTML() {
    const DataProductListHTML = createDataProductsListHTML(productsList);
    if (productsList.length) $aboutProductList.classList.add('preloader')
    setTimeout(() => {
        $aboutProductList.classList.remove('preloader')
        $aboutProductList.insertAdjacentHTML('afterbegin', DataProductListHTML)
    }, 1500)
}
addDataProductHTML()


function sortPostsProduct(flagSortPostsProduct) {
    if ($aboutProductListItem) {
        $aboutProductList.innerHTML = '';

        flagSortPostsProduct ?
            productsList.sort((a, b) => b.price - a.price) :
            productsList.sort((a, b) => a.price - b.price);

        if (productsList.length) {
            const DataProductListHTML = createDataProductsListHTML(productsList);
            $aboutProductList.insertAdjacentHTML('afterbegin', DataProductListHTML)
        } else {
            $aboutProductList.insertAdjacentHTML('afterbegin', '<span>Товара нет</span>')
        }
    }
}

const flagSortPostsProduct = true;
$sortMaxPrice?.addEventListener('click', () => {
    sortPostsProduct(flagSortPostsProduct)
})

$sortMinPrice?.addEventListener('click', () => {
    sortPostsProduct(!flagSortPostsProduct)
})

$sortNames.addEventListener('click', () => {
    $aboutProductList.innerHTML = '';
    productsList.sort((prev, next) => {
        if (prev.name < next.name) return -1;
        if (prev.name < next.name) return 1;
        return 0
    });
    if (productsList.length) {
        const DataProductListHTML = createDataProductsListHTML(productsList);
        $aboutProductList.insertAdjacentHTML('afterbegin', DataProductListHTML)
    } else {
        $aboutProductList.insertAdjacentHTML('afterbegin', '<span>Товара нет</span>')
    }
})


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
        const post = {
            id: Date.now(),
            imgSrc: formData.linkProduct,
            name: formData.nameProduct,
            description: formData.productDescription,
            price: Number(formData.priceProduct.toLocaleString()),
        }
        $aboutProductList.innerHTML = '';
        productsList.push(post)
        const DataProductListHTML = createDataProductsListHTML(productsList);
        $aboutProductList.insertAdjacentHTML('afterbegin', DataProductListHTML)
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
        const numberID = Number(postId)

        if (postId) {
            productsList = productsList.filter(el => el.id !== numberID)
            $currentPost.remove()
            if (productsList.length === 0) $aboutProductList.insertAdjacentHTML('afterbegin', '<span>Товара нет</span>')
        }
    }
})
